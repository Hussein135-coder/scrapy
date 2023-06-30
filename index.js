// Requiring module
const express = require('express');
const axios = require('axios')
const cors = require('cors');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');


// const { Pool } = require('pg');

// const puppeteer = require('puppeteer');
// const shedule = require('node-schedule');


// const pool = new Pool({
// 	user: 'syr',
// 	host: 'dpg-cgerkohmbg568r3l7mdg-a.oregon-postgres.render.com',
// 	database: 'syr',
// 	password: 'yKoLSyhc5sdoryIptjg7cHq4Hc9T92Tt',
// 	port: 5432,
// 	connectionTimeoutMillis: 5000,
// 	max: 20,
// 	ssl: true
// });

// Set up variables
//test bot
// const TOKEN = '6050511857:AAFfF5q2EflHpuSbKvhGD-FLNzrSosdeIXM';
// const TOKEN = '5588149760:AAH3L-JFkrrL6-at7c-j-1uQx2VtThBOESU';
// const hussein = '245853116';
// const saleh = '312877637'
// const deaa = '496497144'

// const users = [hussein, saleh, deaa]

// Create a new bot instance
// const bot = new TelegramBot(TOKEN, { polling: true });

// Creating express object
const app = express();

app.use(
	cors()
);

// Handling GET request
// app.get('/now', async (req, res) => {
// 	selectData(res, 'pages')
// })
app.get('/', async (req, res) => {
	res.send('Hello')
})
// app.get('/syredu', async (req, res) => {
// 	selectData(res, 'syr_edu')
// })
// app.get('/bac', async (req, res) => {
// 	selectData(res, 'bac')
// })
// app.get('/syr', async (req, res) => {
// 	selectData(res, 'syr')
// })

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, console.log(
	`Server started on port ${PORT}`));


// async function scrapeFacebookFollowersCount(pageUrl) {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();

// 	await page.goto(pageUrl, { timeout: 60000 });

// 	const textSelector = await page.waitForSelector(
// 		'text/people like this'
// 	);
// 	const fullTitle = await textSelector.evaluate(el => el.textContent);
// 	await browser.close();

// 	return fullTitle;
// }

// async function scrape(url) {
// 	const res = await scrapeFacebookFollowersCount(url)
// 	return res
// }


// function scrapeAll() {
// 	const d = new Date();
// 	const tomorrow = new Date(d)
// 	tomorrow.setDate(tomorrow.getDate() + 1)
	
// 	const year = tomorrow.getFullYear().toString();
// 	const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
// 	const day = (tomorrow.getDate()).toString().padStart(2, '0');

// 	const date = `${year}/${month}/${day}`;

// 	pool.connect(async (err, client, done) => {
// 		if (err) {
// 			console.error('Error connecting to database', err.stack);
// 		} else {
// 			console.log('Connected to database');
// 			console.log(date);
// 			const syrEdu = await scrape('https://www.facebook.com/syr.edu1/')
// 			const syrEduMembers = await getChannelMembers('syr_edu')
// 			console.log(syrEdu);
// 			console.log(syrEduMembers);
// 			updateData(client, "سوريانا التعليمية", parseFloat(syrEdu.slice(0, -16).replace(/,/g, '')), date, 1, 'syr_edu',syrEduMembers)
// 			const bac = await scrape('https://www.facebook.com/bakaloria.syria/')
// 			const bacMembers = await getChannelMembers('Bacaloria')
// 			console.log(bac);
// 			console.log(bacMembers);
// 			updateData(client, "بكالوريا سوريا", parseFloat(bac.slice(0, -16).replace(/,/g, '')), date, 2, 'bac',bacMembers)
// 			const syr = await scrape('https://www.facebook.com/syducational/')
// 			const syrMembers = await getChannelMembers('syriaST')
// 			console.log(syr);
// 			console.log(syrMembers);
// 			updateData(client, "سوريا التعليمية", parseFloat(syr.slice(0, -16).replace(/,/g, '')), date, 3, 'syr',syrMembers)
// 			client.release();
// 		}
// 	});
// }

// function updateData(client, name, likes, date, id, table,members) {
// 	const updateQuery = `UPDATE public.pages SET name='${name}', likes=${likes}, date='${date}' WHERE id=${id};`;
// 	const insertQuery = `INSERT INTO public.${table} (name, likes, date,members) VALUES ('${name}', ${likes}, '${date}',${members});`
// 	client.query(updateQuery, (err, result) => {
// 		if (err) {
// 			console.error('Error executing query', err.stack);
// 		} else {
// 			console.log('Data updated successfully');
// 		}
// 	})
// 	client.query(insertQuery, (err, result) => {
// 		if (err) {
// 			console.error('Error executing query', err.stack);
// 		} else {
// 			console.log('Data inserted successfully');
// 		}
// 	})
// }

// function selectData(res, table) {
// 	let data = []

// 	pool.connect((err, client, done) => {
// 		if (err) {
// 			console.error('Error connecting to database', err.stack);
// 		} else {
// 			console.log('Connected to database');

// 			const selectQuery = `SELECT * FROM ${table} ORDER BY id`;

// 			client.query(selectQuery, (err, result) => {
// 				if (err) {
// 					console.error('Error executing query', err.stack);
// 				} else {
// 					// Display the results
// 					result.rows.forEach(row => data.push({ "id": row.id, "name": row.name, "likes": row.likes,"members" : row.members ,"date": row.date }));
// 					res.send(data)
// 					res.end()
// 				}
// 			})
// 			client.release();
// 		}
// 	});
// }

// shedule.scheduleJob("0 21 * * *", function () {
// 	scrapeAll()
// })

// const takeScreen = async () => {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();

// 	await page.goto('https://souriana.ml/login', { timeout: 60000 });
// console.log(1);
// await new Promise(resolve => setTimeout(resolve, 5000));

// await page.evaluate(() => {
// 	document.querySelector("#name").value = 'Hussein';
// 	document.querySelector("#password").value = '6292';
// 	document.querySelector('#login-btn').click()
	
// });

// console.log(2);
// await page.setViewport({ width: 1920, height: 1080 });

// await new Promise(resolve => setTimeout(resolve, 35000));

// 	const [element1] = await page.$$('.relative.overflow-hidden.shadow-card');
// 	const boundingBox1 = await element1.boundingBox();
// 	console.log(3);
// 	await page.screenshot({
// 		path: 'syr.png',
// 		clip: {
// 		  x: boundingBox1.x,
// 		  y: boundingBox1.y,
// 		  width: boundingBox1.width,
// 		  height: boundingBox1.height * 2 + 80,
// 		},
// 	  });

// 	await browser.close();
// 	console.log('screenshot taken');
// }

// shedule.scheduleJob("5 21 * * *", function () {
// 	takeScreen()
// })


// const sendTelegram = () => {

// 	bot.on('message', (msg) => {
// 		if (msg['text'] == "احصائيات") {
// 			bot.sendMessage(msg['chat']['id'], 'يتم الان جلب الصورة...')
// 			takeScreen()
// 			setTimeout(() => {
// 				bot.sendPhoto(msg['chat']['id'], 'syr.png')
// 					.then(() => {
// 						console.log('Photo sent successfully');
// 					})
// 					.catch((error) => {
// 						console.error(error);
// 					});
// 			}, 60000);

// 		} else{
// 			bot.sendMessage(msg['chat']['id'], 'ارسل كلمة احصائيات')
// 		}

// 	});
//}
// sendTelegram();

// const sendPhotoTelegram = () => {
// 	users.forEach(user => {
// 		bot.sendPhoto(user, 'syr.png')
// 			.then(() => {
// 				console.log('Photo sent successfully');
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	});

// }

// shedule.scheduleJob("10 21 * * *", function () {
// 	sendPhotoTelegram()
// })


// const getChannelMembers = async (page)=>{
// 	const data = await axios.get(`https://t.me/${page}/?pagehidden=false`);
// 	const html = data.data
// 	const $ = cheerio.load(html);
// 	const count =$('.tgme_page_extra').text();
// 	const members = Number(count.replace(' ','').slice(0,-12));
// 	return members
// }

// const sendDollar = (damas , msg) => {
// 	users.forEach(user => {
// 		bot.sendMessage(user, damas + ' ' + msg)
// 	});

// }

// const fetchDollar =async ()=>{
// 	let lastDamas = '';
// 	const {data} = await axios.get(`https://sp-today.com/app_api/cur_damascus.json`);
// 	const damas = data[0].bid
// 	if(damas == lastDamas){
// 		return
// 	}
// 	if(damas > lastDamas){
// 		lastDamas = damas;
// 		sendDollar(damas , 'ارتفاااع')
// 		return
// 	}
// 	if(damas < lastDamas){
// 		lastDamas = damas;
// 		sendDollar(damas , 'هبووط')
// 		return
// 	}
// }


// setInterval(fetchDollar, 60000)




const getResult = async (num , count)=>{
	const data = await axios.get(`http://assasy2022.moed.gov.sy/asasy/rslt.php?gove=1&stunum=${num}&Submit=`);
	const html = data.data
	const $ = cheerio.load(html);
	const mark =$('.mark').text();
	// const members = Number(count.replace(' ','').slice(0,-12));
	if(!mark){
		console.log('not found')
		return;
	}
	console.log(mark , count);
	// return new Promise((res,rej)=> {
	// 	setTimeout(res,1000);
	// }) 
}

async function start(){

	for (let i = 0; i < 1000; i++) {
	       await getResult(i+1 , i+1);
		}
		
}
start()
