import * as admin from 'firebase-admin';
admin.initializeApp();

// Función para actualizar los datos de un usuario
export const actualizarDatosUsuario = functions.https.onCall(async (data, context) => {
  // Verificar que el administrador está realizando la llamada
  if (!context.auth?.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Acceso denegado.');
  }

  // Obtener los parámetros de la llamada
  const { uid, nuevosDatos } = data;

  try {
    // Actualizar los datos del usuario
    await admin.auth().updateUser(uid, nuevosDatos);

    // Devolver una respuesta exitosa
    return { message: 'Los datos del usuario han sido actualizados correctamente.' };
  } catch (error) {
    // Devolver un error si ocurre algún problema
    throw new functions.https.HttpsError('internal', 'Ha ocurrido un error al actualizar los datos del usuario.');
  }
});
