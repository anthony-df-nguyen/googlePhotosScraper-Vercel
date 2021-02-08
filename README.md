# googlephotosscraper/vercel

This is an Express node.js server built to be hosted on Vercel to act as an serverless function/API that scrapes a public google photos album and return all image urls back as json data. Vercel serverless function requires the entry point JS files to be located in the '/api' folder.

<h3>Upload/build the server on Vercel</h3>
<ol>
<li>Clone the repo</li>
<li>Upload the repo to be a new vercel project</li>

</ol>
<h3>Make Calls to the API</h3>
<ol>
  <li>Make a GET request to {yourverceldomainhere}/api/{shortAlbumURL}</li>
  <li>The shortAlbumURL is obtained as follows:</li>
  <ul>
    <li>Your full public google photos album should have a long url that looks like this: https://photos.google.com/share/lotsoflettersandnumbers123123?key=keyhere
</li>
<li>Cut out only the the stuff after the 'share/' part. Use this as the endpoint of the /api/ path </li>
  </ul>
  <li>If you do it correctly, the application should return a json that displays the URLs of all the pictures</li>
</ol>

<h3>Dependencies</h3>
<ul>
<li>node.js</li>
      <li>Express</li>
      <li>Axios</li>
    
    <li>Cheerio</li>
    <li>CORS</li>

  </ul>
