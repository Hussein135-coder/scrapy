// Requiring module
const express = require('express');



const { Pool  } = require('pg');

const shedule = require('node-schedule');

const shDate = new Date()
console.log(shDate);
// pool.connect((err, client, done) => {
// 	if (err) {
// 	  console.error('Error connecting to database', err.stack);
// 	} else {
// 	  console.log('Connected to database');

// 		pool.end();
// 	  }});
	


// Creating express object
const app = express();

// Handling GET request
app.get('/', async (req, res) => {
	scrapeAll(res)

	// res.send('test')
	// res.end()
})

// Port Number
const PORT = process.env.PORT ||5000;


// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));


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


function scrapeAll(res){
	const pool  = new Pool ({
		user: 'syr',
		host: 'dpg-cgerkohmbg568r3l7mdg-a.oregon-postgres.render.com',
		database: 'syr',
		password: 'yKoLSyhc5sdoryIptjg7cHq4Hc9T92Tt',
		port: 5432,
		connectionTimeoutMillis: 5000,
		ssl : true
	  });
	pool.connect(async (err, client, done) => {
		if (err) {
		  console.error('Error connecting to database', err.stack);
		} else {
		  console.log('Connected to database');
		const syrEdu = await scrape('https://www.facebook.com/syr.edu1/')
		console.log(syrEdu);
		insertData( client ,"syrEdu2" ,parseFloat(syrEdu.slice(0,-16).replace(/,/g, '')) )
		const bac = await scrape('https://www.facebook.com/bakaloria.syria/')
		console.log(bac);
		insertData( client ,"bac2" , parseFloat(bac.slice(0,-16).replace(/,/g, '')) )
		const syr = await scrape('https://www.facebook.com/syducational/')
		console.log(syr);
		insertData(client ,"syr2" , parseFloat(syr.slice(0,-16).replace(/,/g, '')) )
		selectData(pool,res)
		  }});

}

function insertData(client,name,likes){
	const insertQuery = 'INSERT INTO pages(name, likes) VALUES($1, $2)';
	const values = [name, likes];
	client.query(insertQuery, values, (err, result) => {
	  if (err) {
		console.error('Error executing query', err.stack);
	  } else {
		console.log('Data inserted successfully');
	  }})
}

function selectData(pool,res){

	let data =[]

	pool.connect( (err, client, done) => {
		if (err) {
		  console.error('Error connecting to database', err.stack);
		} else {
		  console.log('Connected to database');
		  const selectQuery = 'SELECT * FROM pages';
	  
		  client.query(selectQuery, (err, result) => {
			if (err) {
			  console.error('Error executing query', err.stack);
			} else {
			  // Display the results
			  result.rows.forEach(row => data.push({"name" : row.name, "likes" : row.likes }));
			  res.send(data)
			  res.end()
			}})
			pool.end()
		  }});
}
