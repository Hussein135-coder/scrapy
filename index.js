// Requiring module
const express = require('express');
const axios = require('axios')
const cors = require('cors');
const { JSDOM } = require('jsdom');
// const TelegramBot = require('node-telegram-bot-api');
const puppeteer = require('puppeteer');
const shedule = require('node-schedule');
const Pages = require('./pages')
// const mongoose = require('mongoose');
const fs = require('fs/promises');
// const bot = new TelegramBot('6341924400:AAHPVb8kGy1Asuwy1Gu45763biySzQiVhkI',{polling: true});

const hussein = '245853116';
const saleh = '312877637'
const deaa = '496497144'

const users = [hussein, saleh, deaa]
const filePath = './data.json';
// async function connectDb (){
// 	try {
// 			await mongoose.connect(process.env.URI)
// 			console.log("connected")
// 			PagesPosts()
// 	} catch (error) {
// 			console.log(error)
// 	}
// }

const readJson = async ()=> {
try {
	 const dataFromFile = await fs.readFile(filePath)
		// Parse the JSON data
	 const jsonData = await JSON.parse(dataFromFile);
	  
		// Use the parsed JSON data
		console.log(jsonData);
		return jsonData;
} catch (error) {
	console.log(error)
}
	
}


const writeJson = (dataToWrite)=> {
	try {
		const jsonData = JSON.stringify(dataToWrite, null, 2);

// Write the JSON string to the file
fs.writeFile(filePath, jsonData, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('File has been written successfully.');
});
	} catch (error) {
		console.log(error)
	}
		
	}

const app = express();

app.use(
	// cors({origin: ['https://syria-res.blogspot.com', 'https://www.syr-edu.com']})
	cors()
);
// app.get('/add', async (req, res) => {

// 	try {
// 		const name = req.query.id;
// 		const link = req.query.link;
// 		const post =  req.query.post;
// 		const postLink =req.query.postLink;
// 		let page = await new Pages({name,link,post,postLink}).save();
// 		console.log(page)
// 		return res.json(page);
// 	} catch (error) {
// 		console.log(error)
// 		return res.json({message: "error"})
// 	}
// })

// app.get('/posts', async (req, res) => {
// 	try {
// 		const posts = await Pages.find();
// 		return res.json(posts);
// 	} catch (error) {
// 		console.log(error)
// 		return res.json({message: "error"})
// 		}
// 	}
// )
// app.get('/update', async (req, res) => {
// 	try {
// 		const newPost ={
// 			"_id": req.query.id,
// 			"name":req.query.name,
// 			"link": req.query.link,
// 			"post": req.query.post,
// 			"postLink": req.query.postLink,
// 			"createdAt": "2023-07-02T10:53:09.538Z",
// 			"updatedAt": "2023-07-02T10:53:09.538Z",
// 			"__v": 0
// 		}

// 		const response = await Pages.findOneAndUpdate({_id: '64a16ea0eaad82d88c8f23b5'} ,  newPost)
// 		return res.json({message: response});
// 	} catch (error) {
// 		console.log(error)
// 		return res.json({message: "error"})
// 		}
// 	}
// )



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
function delayExecution() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 10000); // 10 seconds delay
  });
}
async function scrapeFacebookPost(pageUrl) {
	try {
		let time= 0 ;
		const calcTime = setInterval(() => {
			time++;
		}, 1000);
		const browser = await puppeteer.launch();
		console.log('launched')
		const page = await browser.newPage();
		console.log('newPage')

		await page.goto(pageUrl, { timeout: 60000 });
		console.log('opend page')
		// const postSelector = await page.waitForSelector('div[data-ad-preview="message"], div[dir="auto"]');
		console.log('before wait')
		await delayExecution();
		console.log('after wait')
		const postSelector = await page.waitForSelector('div');		
		
		console.log("post selectors")
		//const linkSelector = await page.waitForSelector(`.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.xo1l8bm`);
		
		// const linkSelector = await page.waitForSelector(`a[href^="${pageUrl}/posts"] , a[href^="https://www.facebook.com/perm"]`);
	
		//console.log("link selectors")
		

		const postContent = await postSelector.evaluate(el => el.textContent);
		// const link = await linkSelector.evaluate(el => el.href);

		const post = postContent.slice(postContent.indexOf("with Public") + "with Public".length ,postContent.indexOf("All reactions"))
		console.log(postContent,"Contennnnt")
		console.log(post,"pooost")
		const link = pageUrl;
		await browser.close();
		console.log(time ,"time")
		clearInterval(calcTime);
		return {post,link};
	} catch (error) {
		console.log(error)
		return {post:null,link:null}
	}
	
}


async function PagesPosts(){
	try {
		// const posts = await Pages.find();
		const posts = await readJson()
		// posts.forEach(async (post,i) => {
		// 	await onePost(posts,post)
		
		// })
		for (let i = 0; i < posts.length; i++) {
			await onePost(posts,posts[i])		
		}
	} catch (error) {
		console.log(error)
		}
}

const onePost = async (posts,post)=>{
	const pagePost = await scrapeFacebookPost(post.link);

		if(pagePost.post == null || pagePost.post == post.post ){
			console.log("same",post.name)
			return;
		}
		console.log(post.name,"out")
		post.post = pagePost.post;
		post.postLink = pagePost.link;
	const msg = `<b>اسم الصفحة:</b> ${post.name}\n<b>المنشور:</b> ${pagePost.post}\n<b>رابط المنشور:</b> ${pagePost.link}`
		// sendMessageTelegram(msg)
		writeJson(posts)
}

shedule.scheduleJob("*/5 * * * *", function () {
	// connectDb()
	PagesPosts();
})

// const sendMessageTelegram = (msg) => {
// 	users.forEach(user => {
// 		bot.sendMessage(user, msg , { parse_mode: 'HTML' })
// 			.then(() => {
// 				console.log('Message sent successfully');
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	});
// }
