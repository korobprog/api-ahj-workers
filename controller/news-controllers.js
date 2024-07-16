const Jdenticon = require('jdenticon');
const path = require('path');
const { prisma } = require('../prisma/prisma-client');
const fs = require('fs');
const Generator = require('id-generator');

const NewsController = {
  post: async (req, res) => {
    const { content, created_at, logoUrl } = req.body;
    if (!content || created_at || logoUrl) {
      return res.status(400).json({ error: 'Нет новостей' });
    }

    try {
      let generator = new Generator();
      let img = generator.newId();
      const png = Jdenticon.toPng(`${img}${Date.now()}`, 200);
      const logoName = `${img}_${Date.now()}.png`;
      const logoPath = path.join(__dirname, '/../uploads', logoName);
      fs.writeFileSync(logoPath, png);

      const news = await prisma.post.create({
        data: {
          logoUrl: `/uploads/${logoName}`,
          created_at,
          content,
          id: `${img}`,
        },
      });
      res.json(news);
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = NewsController;
