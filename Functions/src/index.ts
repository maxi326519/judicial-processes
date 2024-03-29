import { HttpsError, onCall } from "firebase-functions/v1/https";
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

    let newUserData: any = {
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
