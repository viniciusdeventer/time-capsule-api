import prisma from '../prisma/client.js';

export default {
  create: async ({ email, name, message, image, sendAt }) => {
    if (!email || !name || !message || !sendAt) {
      throw new Error('Required fields missing');
    }

    return await prisma.capsule.create({
      data: { email, name, message, image: image || null, sendAt: new Date(sendAt) },
    });
  },

  getAll: async (query) => {
    if (query.email) {
      return await prisma.capsule.findMany({ where: { email: query.email } });
    }
    return await prisma.capsule.findMany();
  },

  update: async (id, data) => {
    return await prisma.capsule.update({
      where: { id },
      data: {
        ...data,
        sendAt: new Date(data.sendAt),
      },
    });
  },

  delete: async (id) => {
    return await prisma.capsule.delete({ where: { id } });
  },
};
