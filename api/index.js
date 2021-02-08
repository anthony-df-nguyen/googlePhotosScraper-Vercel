const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

app.post("/api", async (req, res) => {
  let albumURL = req.body.name;
  //console.log("file: index.js ~ line 15 ~ app.post ~ albumURL", albumURL);

  const getPage = await axios
    .get(albumURL)
    .then((data) => {
      let htmldata = data.data;
      //console.log("file: index.js ~ line 15 ~ getPage ~ htmldata", htmldata);
      const $ = cheerio.load(htmldata);
      let images = $("img");
      //console.log("file: index.js ~ line 18 ~ getPage ~ images", images);
      let imgJSON = [];

      for (let i = 0; i < images.length; i++) {
        //console.log(images[i]);
        if (images[i].attribs.class == "hKgQud") {
          let fullSrc = images[i].attribs.src;
          let shortSrc = fullSrc.replace("=w108-h72-no", "");
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
          attemptedURL: albumURL,
        });
      }
    })
    .catch((err) => {
      console.log("Could not connect to Google Photos album", err);
    });
});

app.listen(port, () => {
  console.log("App started on ", port);
});

module.exports = app;
