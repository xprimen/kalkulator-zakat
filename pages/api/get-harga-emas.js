const cheerio = require('cheerio');
// const Cors = require('cors');

// Initializing the cors middleware
/* const cors = Cors({
  methods: ['POST'],
}); */

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
/* function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
} */

export default async function handler(req, res) {
  // await runMiddleware(req, res, cors);
  if (req.method === 'POST') {
    try {
      // 4
      const response = await fetch(
        `https://www.logammulia.com/id/harga-emas-hari-ini`
      );
      const htmlString = await response.text();
      const $ = await cheerio.load(htmlString);
      let harga = 0;
      $(
        `body > section.section-padding.n-no-padding-top > div > div:nth-child(5) > div > div.right > div > div:nth-child(1) > span.value > span.text`
      ).each((i, d) => {
        harga = $(d).text();
        harga = harga.split(',')[0];
        harga = harga.replace('.', '');
        harga = parseInt(harga.replace('Rp', ''), 10);
      });
      res.statusCode = 200;
      return res.json({ harga });
    } catch (e) {
      // 5
      res.statusCode = 404;
      return res.json({
        message: `not found`,
      });
    }

    // res.status(200).json({ method: req.method });
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
}

