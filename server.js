// npm packages
var express = require('express')
var bodyparser = require('body-parser')
var path = require('path')
var morgan = require('morgan')
var expresshbs = require('express-handlebars')

// new express app
var app = express()

// middleware
app.use(morgan('dev'))
app.engine('hbs', expresshbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// your code here...

app.get('/', function (req, res) {
  res.render('index.html')
})

var PORT = process.env.PORT || 3000

// Set the app to listen on port 3000
app.listen(3000, function(e) {
  console.log("App running on port 3000!");
  if (e) throw e
});



var cheerio = require("cheerio");
var request = require("request");
var app = require('express')
var handlebars = require('express-handlebars')
var bodyParser = require('body-parser')

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from Medium's AI Article Library:" +
            "\n***********************************\n");

// Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
request("https://medium.com/topic/artificial-intelligence", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("h3.ui-h3").each(function(i, element) {

    // Save the text of the element in a "title" variable
    var title = $(element).text();

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link
    });

    
    // Log the results once you've looped through each of the elements found with cheerio
    for (i = 0; i < results.length; i++){
      
      console.log(results[i].title + '\n' + '\n');
      $('.headlineContainer').append(results[i].title)
      // $('.headlineDisplay').text(results[i].title)
      
      
    }
  });
});
