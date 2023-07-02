// Requiring module
const express = require('express');
const axios = require('axios')
const cors = require('cors');
const { JSDOM } = require('jsdom');
const TelegramBot = require('node-telegram-bot-api');
const puppeteer = require('puppeteer');
const shedule = require('node-schedule');
const Pages = require('./pages')
const mongoose = require('mongoose');

const bot = new TelegramBot('6341924400:AAHPVb8kGy1Asuwy1Gu45763biySzQiVhkI',{polling: true});

const hussein = '245853116';
const saleh = '312877637'
const deaa = '496497144'

const users = [hussein, saleh, deaa]

async function connectDb (){
	try {
			await mongoose.connect(process.env.URI)
			console.log("connected")
			PagesPosts()
	} catch (error) {
			console.log(error)
	}
}



const app = express();

app.use(
	cors({origin: ['https://syria-res.blogspot.com', 'https://www.syr-edu.com']})
);
app.get('/add', async (req, res) => {

	try {
		const name = req.query.id;
		const link = req.query.link;
		const post =  req.query.post;
		const postLink =req.query.postLink;
		let page = await new Pages({name,link,post,postLink}).save();
		console.log(page)
		return res.json(page);
	} catch (error) {
		console.log(error)
		return res.json({message: "error"})
	}
})

app.get('/posts', async (req, res) => {
	try {
		const posts = await Pages.find();
		return res.json(posts);
	} catch (error) {
		console.log(error)
		return res.json({message: "error"})
		}
	}
)
app.get('/update', async (req, res) => {
	try {
		const newPost ={
			"_id": req.query.id,
			"name":req.query.name,
			"link": req.query.link,
			"post": req.query.post,
			"postLink": req.query.postLink,
			"createdAt": "2023-07-02T10:53:09.538Z",
			"updatedAt": "2023-07-02T10:53:09.538Z",
			"__v": 0
		}

		const response = await Pages.findOneAndUpdate({_id: '64a16ea0eaad82d88c8f23b5'} ,  newPost)
		return res.json({message: response});
	} catch (error) {
		console.log(error)
		return res.json({message: "error"})
		}
	}
)



app.get('/result', async (req, res) => {
	const id = req.query.id;
	const city = req.query.city;
	const baseUrl = req.query.baseUrl;

	const numInput = req.query.numInput;
	const cityInput = req.query.cityInput;


try{
	const data = await getResult(baseUrl,numInput,id ,cityInput,city)
	res.json({"marks" : data[0], "user" : data[1]})
}catch(err){
	res.json({"Error" : err.message});
}
})

app.get('/html', async (req, res) => {
	const url = req.query.url;

	try{
		const html = await getHtml(url)
		res.json({"html" : html})
	}catch(err){
		res.json({"Error" : err.message});
	}
})

app.get('/info', async (req, res) => {
	const url = req.query.url;

	try{
		const data = await getInfo(url)
		res.json({"info" : data})
	}catch(err){
		res.json({"Error" : err.message});
	}
})

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, console.log(
	`Server started on port ${PORT}`));


const getInfo = async(url)=>{
	const data = await axios.get(url);
	const html = data.data

	const dom = new JSDOM(html);
	const document = dom.window.document;

	const cityInput = document.querySelector('form select').getAttribute("name");
	const numInput = document.querySelector('form input').getAttribute("name");
	const urlEnd = document.querySelector('form').getAttribute("action")
	return {cityInput, numInput, urlEnd}
}

//Get Html
const getHtml = async (url) =>{
	const data = await axios.get(url);
	const html = data.data
	return html;
};

//Get Result
const getResult = async (baseUrl,numInput,num ,cityInput,city)=>{
	const url = `${baseUrl}?${cityInput}=${city}&${numInput}=${num}`
	const data = await axios.get(url);
	const html = data.data

	const dom = new JSDOM(html);
	const document = dom.window.document;

	const subjects = document.querySelectorAll('.mark-table .a-cell .subject ');
	const marks = document.querySelectorAll('.mark-table .a-cell .mark ');
	const user = document.querySelectorAll('.user-row .user-info .a-cell ');

	const results ={};
	const student ={};

	for (let i = 0; i < marks.length; i++) {
		results[subjects[i].textContent.trim()] = marks[i].textContent;	
	}
	user.forEach((u , i)=>{
		if(u.textContent.includes('الاسم')){
			student[u.textContent] = user[i+1].textContent	
		}
		if(u.textContent.includes('أم')){
			student[u.textContent] = user[i+1].textContent	
		}
		if(u.textContent.includes('مدرس')){
			student[u.textContent] = user[i+1].textContent	
		}
		if(u.textContent.includes('نتيجة')){
			student[u.textContent] = user[i+1].textContent	
		}
	})

	return [results , student];
	
}

async function scrapeFacebookPost(pageUrl) {
	try {
		let time= 0 ;
		const calcTime = setInterval(() => {
			time++;
		}, 1000);
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		await page.goto(pageUrl, { timeout: 60000 });

		const postSelector = await page.waitForSelector('div[data-ad-preview="message"], div[dir="auto"]');
		const linkSelector = await page.waitForSelector(`a[href^="${pageUrl}/posts"] , a[href^="https://www.facebook.com/perm"]`);

		const post = await postSelector.evaluate(el => el.textContent);
		const link = await linkSelector.evaluate(el => el.href);

	// 	if(post.includes('عرض المزيد')){
	// 		await page.evaluate(() => {
	// 			document.querySelectorAll('div[role="button"]')[6].click()
	// });
	// postSelector = await page.waitForSelector('div[data-ad-preview="message"]');
		//}
		await browser.close();
		clearInterval(calcTime);
		console.log(time)
		console.log(post)
		console.log(link)
		return {post,link};
	} catch (error) {
		console.log(error)
		return {post:null,link:null}
	}
	
}


async function PagesPosts(){
	try {
		const posts = await Pages.find();
		
		posts.forEach(async (post,i) => {
		console.log("loop",i+1)
		const pagePost = await scrapeFacebookPost(post.link);
		console.log(pagePost.post ,"Page post");
		console.log(post.post ,"DB");
		if(pagePost.post == null || pagePost.post == post.post ){
			console.log("same",i,pagePost.link)
			return;
		}
		const newPost ={
		"_id": post._id,
		"name": post.name,
		"link": post.link,
		"post": pagePost.post,
		"postLink": pagePost.link,
		"createdAt": "2023-07-02T10:53:09.538Z",
		"updatedAt": "2023-07-02T10:53:09.538Z",
		"__v": 0
	}
		console.log(newPost)
		await Pages.findOneAndUpdate({_id: post._id} ,  newPost)
		//Pages.updateOne({_id: post._id} , {$set: newPost})
	const msg = `<b>اسم الصفحة:</b> ${post.name}\n<b>المنشور:</b> ${pagePost.post}\n<b>رابط المنشور:</b> ${pagePost.link}`
		sendMessageTelegram(msg)
		})
	} catch (error) {
		console.log(error)
		}
}

shedule.scheduleJob("* * * * *", function () {
	connectDb()
})

const sendMessageTelegram = (msg) => {
	users.forEach(user => {
		bot.sendMessage(user, msg , { parse_mode: 'HTML' })
			.then(() => {
				console.log('Message sent successfully');
			})
			.catch((error) => {
				console.error(error);
			});
	});
}
