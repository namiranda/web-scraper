const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

axios("https://www.tematika.com/libros/")
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const products = []

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
        console.log(products)
    })

app.listen(PORT, () => console.log(`server running in PORT ${PORT}`))