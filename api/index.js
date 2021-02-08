const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const bodyParser = require("body-parser");
const { html } = require("cheerio");

app.use(cors());
app.use(bodyParser.json());

app.get("/api/:url", async (req, res) => {
  const googleFront = "https://photos.google.com/share/";
  let albumlink = req.params.url;
  let albumkey = req.query.key;
  let fullAlbumURL = googleFront + albumlink + "?key=" + albumkey;
  const getPage = await axios
    .get(fullAlbumURL)
    .then((data) => {
      let htmldata = data.data;
      const $ = cheerio.load(htmldata);
      let images = $("img");
      let imgJSON = [];

      for (let i = 0; i < images.length; i++) {
        if (images[i].attribs.class == "hKgQud") {
          let fullSrc = images[i].attribs.src;
          let shortSrc = fullSrc.split("=")[0];
          imgJSON.push({
            src: shortSrc,
          });
        }
      }
      if (imgJSON.length > 0) {
        res.type("application/json");
        res.json(imgJSON);
      } else {
        return res.status(500).send({
          message:
            "Could not connect to Google Photos album. Please check that the Google Photos Album is public and shared",
          attemptedURL: fullAlbumURL,
        });
      }
    })
    .catch((err) => {
      console.log("Could not connect to Google Photos album", err);
    });
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App started on ", port);
});

module.exports = app;
