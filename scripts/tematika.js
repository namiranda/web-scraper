export async function scrapeTematika() {
    let currentPage = 1;
    let finished = false;
    const baseURL = 'https://www.tematika.com/libros?limit=30'

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    while (!finished) {
      await page.goto(`${baseURL}&p=${currentPage}`);
      const html = await page.content();
      const $ = cheerio.load(html);
      
      // Check if there's a next page link
      if (currentPage == 5) {
        finished = true;
      } else {
        currentPage++;
      }
      
      // Scrape the data on the current page

      $('.product-information', html).each(async function() {
          const title = $(this).find('.product-name').text()
          const author = $(this).find('.author').text()
          const price = $(this).find('.price').text()
          const image = $(this).prev('.product-image').find('img').attr('src');

          const product = new Product({
            title,
            author,
            price,
            image
        });
          await product.save()
      })
    }
    await browser.close();
  }