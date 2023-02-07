const PORT = 8000
const cheerio = require('cheerio')
const express = require('express')
const puppeteer = require('puppeteer')

const app = express()

async function scrapeMultiplePages(baseURL) {
    let currentPage = 1;
    let finished = false;
    const products = []


    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    while (!finished) {
      await page.goto(`${baseURL}&p=${currentPage}`);
      const html = await page.content();
      const $ = cheerio.load(html);
      
      // Check if there's a next page link
      if ($('.next.i-next').length === 0) {
        finished = true;
      } else {
        currentPage++;
      }
      
      // Scrape the data on the current page

      $('.product-information', html).each(function() {
          const title = $(this).find('.product-name').text()
          const author = $(this).find('.author').text()
          const price = $(this).find('.price').text()
          const image = $(this).prev('.product-image').find('img').attr('src');

          products.push({
              title,
              author,
              price,
              image
          })
      })
    }
    console.log(products)
    await browser.close();
  }

  app.listen(PORT, () => console.log(`server running in PORT ${PORT}`))
  scrapeMultiplePages('https://www.tematika.com/libros?limit=30');
