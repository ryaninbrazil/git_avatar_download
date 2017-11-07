var request = require('request');
var secret = require('./tokenIgnore')
var fs = require('fs');

var repoOwner =  process.argv[2]
var repoName =  process.argv[3]


function getRepoContributors(repoOwner, repoName, cb) {
  var GITHUB_USER = "ryaninbrazil";
  var GITHUB_TOKEN = "4152db697d53e2f1881b88dd9465c48ecdd9721c";
  var requestURL = 'https:' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project',
      'Authorization': ('token ' + secret.GITHUB_TOKEN)
    }
  };

  //print out avatar url
 request (options, function(err, response, body){
  var contributors = JSON.parse (body);
   contributors.forEach(function(item) {
     downloadImageByURL(item.avatar_url, 'avatar/' + item.login + '.jpg')
  })
})
}

//implement downloadImage function
function downloadImageByURL(url, filePath) {
request.get(url)
      .on('end', function () {
        console.log('Download complete!')
      })
     .pipe(fs.createWriteStream(filePath));
}

// make the required arguments
if (process.argv.length !== 4) {
console.log('You must provide a repo owner and  name.');
console.log('Usage: node download_avatars.js <repoOwner> <repoName>');

} else {
console.log('Welcome to the Github Avatar Downloader!');

getRepoContributors(repoOwner, repoName, function(err, result) {
console.log('Errors:', err);
console.log('Result:', result);
});
}




 
     
