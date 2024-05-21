import { NextFunction, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { ResponseCodes } from '../types/constants';

export const postContact = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlBody = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Contact</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          text-align: center;
        }
        p {
          color: #666;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 10px;
        }
        .message {
          background-color: #f9f9f9;
          border-left: 6px solid #007bff;
          padding: 10px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Contact</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <div class="message">
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      </div>
    </body>
  </html>
  `;

  let mailOptions = {
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send(ResponseCodes.EMAIL_SENT_SUCCESSFULLY);
  } catch (e: any) {
    res.status(500).send(ResponseCodes.EMAIL_NOT_SENT);
  }
};
