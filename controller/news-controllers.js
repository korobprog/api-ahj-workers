const { prisma } = require('../prisma/prisma-client');

const NewsController = {
  news: async (req, res) => {
    try {
      const post = await prisma.post.findMany();

      const allPast = post.map((post) => ({
        ...post,
      }));
      res.json(allPast);
    } catch (error) {
      console.error('get all post error', error);
      res.status(500).json({ error: 'Произошла ошибка при получении постов' });
    }
  },
};

module.exports = NewsController;
