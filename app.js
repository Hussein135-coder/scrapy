// Requiring module
const express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb"
  });



// Creating express object
const app = express();

// Handling GET request
app.get('/', (req, res) => {
	res.send('test')
	res.end()
})

// Port Number
const PORT = process.env.PORT ||5000;


// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));

function insertData(syrEdu , bac , syr ){
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		var sql = `INSERT INTO customers (test,name, address) VALUES 
		('${parseFloat(syrEdu.slice(0,-16).replace(/,/g, ''))}', 'Highway 31','asdasd'),
		('${parseFloat(bac.slice(0,-16).replace(/,/g, ''))}', 'Highway 32','asdasd'),
		('${parseFloat(syr.slice(0,-16).replace(/,/g, ''))}', 'Highway 33','asdasd')
		`;
		con.query(sql, function (err, result) {
		  if (err) throw err;
		  console.log("1 record inserted");
		});
	  });
}
const puppeteer = require('puppeteer');


async function scrapeFacebookFollowersCount(pageUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(pageUrl);

const textSelector = await page.waitForSelector(
    'text/people like this'
  );
  const fullTitle = await textSelector.evaluate(el => el.textContent);
  await browser.close();

  return fullTitle;
}


async function scrape(url){
	const res = await scrapeFacebookFollowersCount(url)
	return res
}
async function scrapeAll(){
const syrEdu = await scrape('https://www.facebook.com/syr.edu1/')
console.log(syrEdu);
const bac = await scrape('https://www.facebook.com/bakaloria.syria/')
console.log(bac);
const syr = await scrape('https://www.facebook.com/syducational/')
console.log(syr);
insertData(syrEdu , bac , syr )
}
scrapeAll()