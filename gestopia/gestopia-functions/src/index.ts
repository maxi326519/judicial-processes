/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as nodemailer from "nodemailer";
import { Request, Response } from "express";
import { onRequest } from "firebase-functions/v1/https";

interface Consult {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "maxi.326519@gmail.com",
    pass: "eyjtxmtyeelweiva",
  },
});

exports.sendEmail = onRequest(async (req: Request, res: Response) => {
  const { name, email, subject, message }: Consult = req.body;

  try {
    await transporter.sendMail({
      from: "maxi.326519@gmail.com",
      to: email,
      subject: subject,
      text: `${name} - ${email}: ${message}`,
    });
  } catch (error) {
    res.status(400).json({ msg: "Error al enviar el mail", error: error });
  }

  res.status(200).json({ msg: "Correo enviado exitosamente" });
});
