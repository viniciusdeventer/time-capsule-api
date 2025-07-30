import cron from 'node-cron';
import prisma from '../prisma/client.js';
import { sendMail } from '../utils/mailer.js';

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const capsules = await prisma.capsule.findMany({
    where: { sendAt: { lte: now }, sent: false },
  });

  for (const capsule of capsules) {
    await sendMail(
      capsule.email,
      'Sua Cápsula do Tempo está aqui!',
      `<h1>${capsule.name}</h1><p>${capsule.message}</p>`
    );

    await prisma.capsule.update({
      where: { id: capsule.id },
      data: { sent: true },
    });
  }
});
