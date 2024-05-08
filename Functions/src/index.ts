import {
  HttpsError,
  onCall,
  onRequest,
  Request,
} from "firebase-functions/v1/https";
import { Response } from "firebase-functions/lib/v1/cloud-functions";
import admin = require("firebase-admin");

admin.initializeApp();

exports.setNewUser = onCall(async (data, context) => {
  try {
    // Validate if the user is loggued in
    const userUid = context.auth?.token.uid;
    if (!userUid)
      throw new HttpsError("unauthenticated", "user unauthenticated");

    // Validate if the user exist
    const firestore = admin.firestore();
    const requestUser = await firestore.collection("Users").doc(userUid).get();
    if (!requestUser.exists)
      throw new HttpsError("not-found", "user not found");

    // Validate if the user is 'Admin'
    if (requestUser.data()!.rol !== "Admin")
      throw new HttpsError("permission-denied", "must have admin rol");

    // Validate parameters
    const { rol, name, email, password, permissions } = data;
    if (!rol)
      throw new HttpsError("invalid-argument", "missing parameter: rol");
    if (!name)
      throw new HttpsError("invalid-argument", "missing parameter: name");
    if (!email)
      throw new HttpsError("invalid-argument", "missing parameter: email");
    if (!password)
      throw new HttpsError("invalid-argument", "missing parameter: password");
    if (
      !permissions ||
      typeof permissions.processes != "boolean" ||
      typeof permissions.tutelas != "boolean" ||
      typeof permissions.requirements != "boolean"
    )
      throw new HttpsError(
        "invalid-argument",
        "invalid parameters: permissions"
      );

    // Create user
    const newUser = await admin
      .auth()
      .createUser({ email, password })
      .catch(() => {
        throw new HttpsError("internal", "Error to create user");
      });

    // Add user to database
    await firestore
      .collection("Users")
      .doc(newUser.uid)
      .set({
        rol,
        name,
        email,
        permissions,
      })
      .catch(() => {
        throw new HttpsError("internal", "Error to create user in database");
      });

    return {
      uid: newUser.uid,
    };
  } catch (error: any) {
    throw new HttpsError("internal", error.message);
  }
});

exports.updateUser = onCall(async (data, context) => {
  try {
    // Validate if the user is loggued in
    const userUid = context.auth?.token.uid;
    if (!userUid)
      throw new HttpsError("unauthenticated", "user unauthenticated");

    // Validate if the user exist
    const firestore = admin.firestore();
    const requestUser = await firestore.collection("Users").doc(userUid).get();
    if (!requestUser.exists)
      throw new HttpsError("not-found", "user not found");

    // Validate if the user is 'Admin'
    if (requestUser.data()!.rol !== "Admin")
      throw new HttpsError("permission-denied", "must have admin rol");

    // Validate parameters
    const { id, rol, name, email, password, available, permissions } = data;
    if (!id) throw new HttpsError("invalid-argument", "missing parameter: rol");
    if (!rol)
      throw new HttpsError("invalid-argument", "missing parameter: rol");
    if (!name)
      throw new HttpsError("invalid-argument", "missing parameter: name");
    if (!email)
      throw new HttpsError("invalid-argument", "missing parameter: email");
    if (
      !permissions ||
      typeof permissions.processes != "boolean" ||
      typeof permissions.tutelas != "boolean" ||
      typeof permissions.requirements != "boolean"
    )
      throw new HttpsError(
        "invalid-argument",
        "invalid parameters: permissions"
      );

    // Update user
    const newUser = await admin
      .auth()
      .updateUser(id, { email, password })
      .catch(() => {
        throw new HttpsError("internal", "Error to update user");
      });

    const newUserData: any = {
      rol,
      name,
      email,
      permissions,
    };

    // If available exist add them
    if (available) {
      newUserData.available = {
        startDate: new Date(available.startDate),
        endDate: new Date(available.endDate),
      };
    } else {
      newUserData.available = false;
    }

    // Update user to database
    await firestore
      .collection("Users")
      .doc(newUser.uid)
      .update(newUserData)
      .catch(() => {
        throw new HttpsError("internal", "Error to update user in database");
      });
  } catch (error: any) {
    throw new HttpsError("internal", error.message);
  }
});

exports.deleteUser = onCall(async (data, context) => {
  try {
    // Validate if the user is loggued in
    const userUid = context.auth?.token.uid;
    if (!userUid)
      throw new HttpsError("unauthenticated", "user unauthenticated");

    // Validate if the user exist
    const firestore = admin.firestore();
    const requestUser = await firestore.collection("Users").doc(userUid).get();
    if (!requestUser.exists)
      throw new HttpsError("not-found", "user not found");

    // Validate if the user is 'Admin'
    if (requestUser.data()!.rol !== "Admin")
      throw new HttpsError("permission-denied", "must have admin rol");

    // Validate parameters
    const uid = data.uid;
    if (!uid)
      throw new HttpsError("invalid-argument", "missing parameter: uid");

    // Delete user
    await admin
      .auth()
      .deleteUser(uid)
      .catch(() => {
        throw new HttpsError("internal", "Error to delete user");
      });

    // Delete user to database
    await firestore
      .collection("Users")
      .doc(uid)
      .delete()
      .catch(() => {
        throw new HttpsError("internal", "Error to delete user in database");
      });
  } catch (error: any) {
    throw new HttpsError("internal", error.message);
  }
});

exports.backupFirestore = onRequest(async (req: Request, res: Response) => {
  try {
    const firestore = admin.firestore();
    const storage = admin.storage();

    // Collection lvl 1
    const collData = "Data";

    const docProcessesData = firestore
      .collection("Data")
      .doc("Processes")
      .get();
    const docTutelasData = firestore.collection("Data").doc("Tutelas").get();
    const docRequirementsData = firestore
      .collection("Data")
      .doc("Requirements")
      .get();
    const docPoderesData = firestore.collection("Data").doc("Poderes").get();
    const docConciliacionesData = firestore
      .collection("Data")
      .doc("Conciliaciones")
      .get();

    // Collection lvl 2
    const docProcesses = "Processes";
    const docTutelas = "Tutelas";
    const docRequirements = "Requirements";
    const docPoderes = "Poderes";
    const docConciliaciones = "Conciliaciones";

    const docsDetailsProcesses = await firestore
      .collection(collData)
      .doc(docProcesses)
      .collection("Details")
      .get();
    const docsHeadProcesses = await firestore
      .collection(collData)
      .doc(docProcesses)
      .collection("Head")
      .get();
    const docsIframesProcesses = await firestore
      .collection(collData)
      .doc(docProcesses)
      .collection("Iframes")
      .get();
    const docsDetailsTutelas = await firestore
      .collection(collData)
      .doc(docTutelas)
      .collection("Details")
      .get();
    const docsHeadTutelas = await firestore
      .collection(collData)
      .doc(docTutelas)
      .collection("Head")
      .get();
    const docsIframesTutelas = await firestore
      .collection(collData)
      .doc(docTutelas)
      .collection("Iframes")
      .get();
    const docsDetailsRequirements = await firestore
      .collection(collData)
      .doc(docRequirements)
      .collection("Details")
      .get();
    const docsHeadRequirements = await firestore
      .collection(collData)
      .doc(docRequirements)
      .collection("Head")
      .get();
    const docsIframesRequirements = await firestore
      .collection(collData)
      .doc(docRequirements)
      .collection("Iframes")
      .get();
    const docsDetailsPoderes = await firestore
      .collection(collData)
      .doc(docPoderes)
      .collection("Details")
      .get();
    const docsHeadPoderes = await firestore
      .collection(collData)
      .doc(docPoderes)
      .collection("Head")
      .get();
    const docsIframesPoderes = await firestore
      .collection(collData)
      .doc(docPoderes)
      .collection("Iframes")
      .get();
    const docsDetailsConciliaciones = await firestore
      .collection(collData)
      .doc(docConciliaciones)
      .collection("Details")
      .get();
    const docsHeadConciliaciones = await firestore
      .collection(collData)
      .doc(docConciliaciones)
      .collection("Head")
      .get();
    const docsIframesConciliaciones = await firestore
      .collection(collData)
      .doc(docConciliaciones)
      .collection("Iframes")
      .get();

    const docsDetailsProcessesData: any[] = [];
    const docsDetailsTutelasData: any[] = [];
    const docsDetailsRequirementsData: any[] = [];
    const docsDetailsPoderesData: any[] = [];
    const docsDetailsConciliacionesData: any[] = [];
    const docsHeadProcessesData: any[] = [];
    const docsHeadTutelasData: any[] = [];
    const docsHeadRequirementsData: any[] = [];
    const docsHeadPoderesData: any[] = [];
    const docsHeadConciliacionesData: any[] = [];
    const docsIframesProcessesData: any[] = [];
    const docsIframesTutelasData: any[] = [];
    const docsIframesRequirementsData: any[] = [];
    const docsIframesPoderesData: any[] = [];
    const docsIframesConciliacionesData: any[] = [];

    docsDetailsProcesses.forEach((doc) =>
      docsDetailsProcessesData.push(doc.data())
    );
    docsDetailsTutelas.forEach((doc) =>
      docsDetailsTutelasData.push(doc.data())
    );
    docsDetailsRequirements.forEach((doc) =>
      docsDetailsRequirementsData.push(doc.data())
    );
    docsDetailsPoderes.forEach((doc) =>
      docsDetailsPoderesData.push(doc.data())
    );
    docsDetailsConciliaciones.forEach((doc) =>
      docsDetailsConciliacionesData.push(doc.data())
    );

    docsHeadProcesses.forEach((doc) => docsHeadProcessesData.push(doc.data()));
    docsHeadTutelas.forEach((doc) => docsHeadTutelasData.push(doc.data()));
    docsHeadRequirements.forEach((doc) =>
      docsHeadRequirementsData.push(doc.data())
    );
    docsHeadPoderes.forEach((doc) => docsHeadPoderesData.push(doc.data()));
    docsHeadConciliaciones.forEach((doc) =>
      docsHeadConciliacionesData.push(doc.data())
    );

    docsIframesProcesses.forEach((doc) =>
      docsIframesProcessesData.push(doc.data())
    );
    docsIframesTutelas.forEach((doc) =>
      docsIframesTutelasData.push(doc.data())
    );
    docsIframesRequirements.forEach((doc) =>
      docsIframesRequirementsData.push(doc.data())
    );
    docsIframesPoderes.forEach((doc) =>
      docsIframesPoderesData.push(doc.data())
    );
    docsIframesConciliaciones.forEach((doc) =>
      docsIframesConciliacionesData.push(doc.data())
    );

    type FirestoreDB = Collection[];
    type Collection = {
      id: string;
      data: Document[];
    };
    type Document = {
      id: string;
      data: unknown;
      colls?: Collection[];
    };

    const dbData: FirestoreDB = [
      {
        id: "Data",
        data: [
          {
            id: docProcesses,
            data: docProcessesData,
            colls: [
              {
                id: "Details",
                data: docsDetailsProcessesData,
              },
              {
                id: "Head",
                data: docsHeadProcessesData,
              },
              {
                id: "Iframe",
                data: docsIframesProcessesData,
              },
            ],
          },
          {
            id: docTutelas,
            data: docTutelasData,
            colls: [
              {
                id: "Details",
                data: docsDetailsTutelasData,
              },
              {
                id: "Head",
                data: docsHeadTutelasData,
              },
              {
                id: "Iframe",
                data: docsIframesTutelasData,
              },
            ],
          },
          {
            id: docRequirements,
            data: docRequirementsData,
            colls: [
              {
                id: "Details",
                data: docsDetailsRequirementsData,
              },
              {
                id: "Head",
                data: docsHeadRequirementsData,
              },
              {
                id: "Iframe",
                data: docsIframesRequirementsData,
              },
            ],
          },
          {
            id: docPoderes,
            data: docPoderesData,
            colls: [
              {
                id: "Details",
                data: docsDetailsPoderesData,
              },
              {
                id: "Head",
                data: docsHeadPoderesData,
              },
              {
                id: "Iframe",
                data: docsIframesPoderesData,
              },
            ],
          },
          {
            id: docConciliaciones,
            data: docConciliacionesData,
            colls: [
              {
                id: "Details",
                data: docsDetailsConciliacionesData,
              },
              {
                id: "Head",
                data: docsHeadConciliacionesData,
              },
              {
                id: "Iframe",
                data: docsIframesConciliacionesData,
              },
            ],
          },
        ],
      },
    ];

    const date = new Date();
    const day = `0${date.getDate() + 1}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    const formatDate = `${day}-${month}-${year}`;

    const file = storage
      .bucket("gs://procesos-judiciales-83343.appspot.com/")
      .file(`backups/${formatDate}.json`);

    await file.save(JSON.stringify(dbData, null, 2), {
      contentType: "application/json",
    });

    // Save data
    const backUpDoc = await firestore
      .collection("Configuration")
      .doc("Backup")
      .get();

    // Get next buckup date
    const todayDay = date.getDay();
    let daysUntilSunday = (7 - todayDay) % 7;
    if (todayDay === 0) daysUntilSunday = 7;
    const nextSunday = new Date(date);
    nextSunday.setDate(date.getDate() + daysUntilSunday);

    if (backUpDoc.exists) {
      const backUpData = backUpDoc.data();
      firestore
        .collection("Configuration")
        .doc("Backup")
        .set({
          data: backUpData?.data
            ? [...backUpData.data, `${formatDate}.json`]
            : [`${formatDate}.json`],
          lastBackUp: date,
          nextBackUp: nextSunday,
        });
    } else {
      firestore
        .collection("Configuration")
        .doc("Backup")
        .set({
          data: [`${formatDate}.json`],
          lastBackUp: date,
          nextBackUp: nextSunday,
        });
    }

    res.status(200).send("Backup created successfully");
  } catch (error) {
    res.status(500).json({ error });
  }
});
