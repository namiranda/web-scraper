import { scrapeTematika } from './scripts/tematika';

const dotenv = require('dotenv');
const cheerio = require('cheerio')
const express = require('express')
const puppeteer = require('puppeteer')
const mongoose = require('mongoose');

dotenv.config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const productSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: String,
  image: String
});

const Product = mongoose.model('Product', productSchema);

  app.listen(process.env.PORT, () => console.log(`server running in PORT ${process.env.PORT}`))
scrapeTematika()