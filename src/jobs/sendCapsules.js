import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import prisma from '../prisma/client.js';
import { sendMail } from '../utils/mailer.js';

// Carrega e compila o template HTML
const templatePath = path.resolve('src/template/capsuleTemplate.html');
const templateSource = fs.readFileSync(templatePath, 'utf-8');
const compileTemplate = Handlebars.compile(templateSource);

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const capsules = await prisma.capsule.findMany({
    where: { sendAt: { lte: now }, sent: false },
  });

  for (const capsule of capsules) {
    const html = compileTemplate({
      name: capsule.name,
      message: capsule.message,
      imageUrl: capsule.image || null, 
    });

    await sendMail(
      capsule.email,
      'Sua Cápsula do Tempo está aqui!',
      html
    );

    // await prisma.capsule.update({
    //   where: { id: capsule.id },
    //   data: { sent: true },
    // });

    await prisma.capsule.delete({
      where: { id: capsule.id }
    });
  }
});
