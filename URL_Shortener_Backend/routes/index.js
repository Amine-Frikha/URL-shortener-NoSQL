const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    //get the url code from the database 
    const url = await Url.findOne({ urlCode: req.params.code });
    //if the url exists then redirect to it, else show error
    if (url) {
      url.clicks++
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});
//return all data
router.get('/',async (req,res)=>{
  Url.find(function(err, url) {
    if (err) {
        console.log(err);
    } else {
        res.json(url);
      }
  });

});

module.exports = router;