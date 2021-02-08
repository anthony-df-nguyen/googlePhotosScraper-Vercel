const albumURL = {
  name:
    "https://photos.google.com/share/AF1QipNSRG2uEDsznTmc0YW71cQPOR6juREtyxyGPR9ZsfUnSnAA8-Z-KGZsC2NPUMROxw?key=UlV5aXdtc3ZoT1VBdU5IOHhBMm11Y1VrbFVNTllR",
};

let imagesArray;

async function getPhotos() {
  let getIt = await fetch("http://localhost:3000/api/", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(albumURL),
  })
    .then((res) => res.json())
    .then((data) => (imagesArray = data));
  console.log(
    "file: postAPI.js ~ line 20 ~ getPhotos ~ imagesArray",
    imagesArray
  );
}

//getPhotos() to run
