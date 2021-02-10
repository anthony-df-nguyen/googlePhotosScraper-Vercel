const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

app.use(cors());
let setCache = function (req, res, next) {
  // here you can define period in second, this one is 5 minutes
  const period = 60 * 5;
  //console.log("somthing is happening");
  // you only want to cache for GET requests
  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", `no-store`);
  }

  // remember to call next() to pass on the request
  next();
};
app.use(setCache);

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
          let medResSrc = `${shortSrc}=w1366-h768`;
          let hiResSrc = `${shortSrc}=w2560-h1440`;
          imgJSON.push({
            lowRes: shortSrc,
            medRes: medResSrc,
            hiRes: hiResSrc,
          });
        }
      }
      if (imgJSON.length > 0) {
        res.type("application/json");
        console.log(
          "Succesfully scraped img URLs from ",
          fullAlbumURL,
          " and created JSON file"
        );
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
