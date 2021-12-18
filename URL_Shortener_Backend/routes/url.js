const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const nanoid = require('nanoid');
const config = require('config');

const Url = require('../models/Url');

// @route            POST /api/url/shorten
// @description      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  // Check the validity of base url using the valid-url dependency
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base url');
  }

  // Create a random id generated using the shortid dependency
  const urlCode = nanoid(7);

  // Check long url entered by the client using valid-url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      //check if the long url has already been shortened
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        //add the new entry to the database
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
});

module.exports = router;