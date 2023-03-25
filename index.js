// Requiring module
const express = require('express');



const { Pool  } = require('pg');

const shedule = require('node-schedule');



// Creating express object
const app = express();

// Handling GET request
app.get('/', async (req, res) => {
	res.send('test')
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


function scrapeAll(){
	const d = new Date();
	const year = d.getFullYear().toString();
	const month = (d.getMonth() + 1).toString().padStart(2, '0');
	const day = d.getDate().toString().padStart(2, '0');
	const date = `${year}/${month}/${day}`;

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
		  console.log(date);
		const syrEdu = await scrape('https://www.facebook.com/syr.edu1/')
		console.log(syrEdu);
		updateData( client ,"سوريانا التعليمية" ,parseFloat(syrEdu.slice(0,-16).replace(/,/g, '')),date,1 )
		const bac = await scrape('https://www.facebook.com/bakaloria.syria/')
		console.log(bac);
		updateData( client ,"بكالوريا سوريا" , parseFloat(bac.slice(0,-16).replace(/,/g, '')),date,2 )
		const syr = await scrape('https://www.facebook.com/syducational/')
		console.log(syr);
		updateData(client ,"سوريا التعليمية" , parseFloat(syr.slice(0,-16).replace(/,/g, '')),date,3 )
		  }});
}

function updateData(client,name,likes,date,id){
	const updateQuery = `UPDATE public.pages SET name='${name}', likes=${likes}, date='${date}' WHERE id=${id};`;
	// const values = [name, likes , date, id];
	client.query(updateQuery, (err, result) => {
	  if (err) {
		console.error('Error executing query', err.stack);
	  } else {
		console.log('Data updated successfully');
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

// shedule.scheduleJob("0 0 * * *",function () {
// 	scrapeAll()
// })
let count = 0 ;
shedule.scheduleJob("0 * * * *",function () {
	console.log(count++);
})
const d =new Date();
const date = d.toISOString().slice(0, 10).replace('T', ' ').replace(/-/g,'/')

console.log(typeof date);
// scrapeAll()