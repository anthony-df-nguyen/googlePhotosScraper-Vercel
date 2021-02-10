# GooglePhotosScraper Using Express on Vercel/Zeit

This is an Express server that is configured to run on a Vercel environment, which uses any JS files in the /api folder to serve as endpoints to run serverless functions.

<h3>Making Calls to the API</h3>

<ol>
   <li>Get the link of the Google Photos public album you want to scrape. It should be a public share link, which should look something like this:
  <ul>
    <li>https://photos.google.com/share/<b>lots-of-random-letters-and-numbers?key=keyIsHere</b></li>
    </ul>
      <li>Copy the part of the link in bold text ( the stuff after /share/ )</li>

  <li>Make a GET request to {yourverceldomainhere}/api/{paste-the-link-here}</li>
 <li>If you do it correctly, the application should return a JSON response that displays a small, medium, and hi-res URL for each of the pictures</li>

</ol>
Example:
<li><b>My Vercel Domain</b>: anthonys-scraper.vercel.app
<li><b>Album Link</b>: https://photos.google.com/share/IasN8weNUsJk80sk9a8s8djs?key=1z39skdjYsj
<li><b>Call the API</b>: anthonys-scraper.vercel.app/api/IasN8weNUsJk80sk9a8s8djs?key=1z39skdjYsj

<h3>Host Your Own API on Vercel</h3>
<ol>
<li>Fork the repo</li>

<li>Connect the repo to be a new [https://vercel.com/](Vercel) project with whatever name you want</li>
<li>Extra: Vercel.json file: this file has some parameters established for the Vercel environment to redirect traffic to the /api root (to run the sole index.js app) as well as set up caching for the response. You can ignore this if you don't want to change anything
</li>
<li>Your API endpoint should be live and working

</ol>

<h3>Dependencies</h3>
<ul>
    <li>Express: for server and managing API routes</li>
    <li>Axios: Scrapes the public google photos album</li>
    <li>Cheerio: Parses the Axios response HTML and returns the src URLs from each image found</li>
    <li>CORS: To allow responses to the client-side</li>

  </ul>
