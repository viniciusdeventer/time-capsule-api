import nodemailer from 'nodemailer';

let transporter;

async function createTransporter() {
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

await createTransporter();

export const sendMail = async (to, subject, html) => {
  if (!transporter) {
    await createTransporter();
  }

  const info = await transporter.sendMail({
    from: '"Time Capsule" <no-reply@timecapsule.com>',
    to,
    subject,
    html,
  });

  console.log('Email sent! Preview it here:', nodemailer.getTestMessageUrl(info));
};
