const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const url = 'https://techyhigher.com/pop-slots-free-chips/';

axios.get(url)
  .then(({ data }) => {
    const $ = cheerio.load(data);
    const links = [];

    $('a[href*="landingpages.popslotscasino.com"], a[href*="popslots.casino"]').each((index, element) => {
      const link = $(element).attr('href');
      const text = $(element).text().trim();
      links.push({ href: link, text: text });
    });

    console.log('Fetched links:', links);

    const dir = 'links-json';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    const filePath = path.join(dir, 'pop-slots.json');
    fs.writeFileSync(filePath, JSON.stringify(links, null, 2), 'utf8');
    console.log(`Links saved to ${filePath}`);
  })
  .catch(err => {
    console.error('Error fetching links:', err);
    process.exit(1);
  });