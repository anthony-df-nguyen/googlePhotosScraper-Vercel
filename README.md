# googlephotosscraper/vercel
This is an Express node.js server built to be hosted on Vercel to act as an API that scrapes a public google photos album and return all image urls back as json data. 

<h3>Upload/build the server on Vercel</h3>
<ol>
<li>Clone the repo</li>
<li>Upload the repo to be a new vercel project</li>

</ol>
<h3>Make Calls to the API from the client-side</h3>
<p>The postAPI.js file contains the template code to use on a client side JS file to make a POST request to the vercel API.</p>
<ol>
<li>  In the 'albumURL' object, paste your desired googlephoto album URL (must be a public/shared album) for the 'name' field.  Then change the fetch URL from localhost:3000 to your vercel domain name with /api at the end </li>
<li>If successful, the API will provide a json response of all image urls</li>
</ol>

<h3>Dependencies</h3>
<ul>      <li>node.js</li>
        <li>Express</li>
  <li>Axios</li>
    <li>Body Parser</li>
    <li>Cheerio</li>
    <li>CORS</li>

  </ul>
