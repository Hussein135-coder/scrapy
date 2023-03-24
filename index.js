// Requiring module
const express = require('express');
var mysql = require('mysql');

// var con = mysql.createConnection({
// 	host: "souriana.ml",
// 	user: "u186033309_test",
// 	password: "Test1234",
// 	database: "u186033309_test"
//   });

// const { Client } = require('pg');

// const client = new Client({
//   user: 'syr',
//   host: 'dpg-cgerkohmbg568r3l7mdg-a',
//   database: 'syr',
//   password: 'yKoLSyhc5sdoryIptjg7cHq4Hc9T92Tt',
//   port: 5432,
// });
const { Pool } = require('pg');

const pool = new Pool({
	user: 'syr',
	host: 'dpg-cgerkohmbg568r3l7mdg-a',
	database: 'syr',
	password: 'yKoLSyhc5sdoryIptjg7cHq4Hc9T92Tt',
	port: 5432,
  });



// Creating express object
const app = express();

// Handling GET request
app.get('/', async (req, res) => {
	// insert()
	pool.query('SELECT NOW()', (err, res) => {
		if (err) throw err;
		console.log('PostgreSQL connected:', res.rows[0]);
		res.send('test connect')
	  });
	
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

function insert(){
	client.connect();
	client.query('SELECT NOW()', (err, res) => {
		console.log(err, res);
		client.end();
	  });
}

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


// async function scrape(url){
// 	const res = await scrapeFacebookFollowersCount(url)
// 	return res
// }
// async function scrapeAll(){
// const syrEdu = await scrape('https://www.facebook.com/syr.edu1/')
// console.log(syrEdu);
// const bac = await scrape('https://www.facebook.com/bakaloria.syria/')
// console.log(bac);
// const syr = await scrape('https://www.facebook.com/syducational/')
// console.log(syr);
// insertData(syrEdu , bac , syr )
// }
