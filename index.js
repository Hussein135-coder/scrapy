// Requiring module
const express = require('express');
const axios = require('axios')
const cors = require('cors');
const { JSDOM } = require('jsdom');

const app = express();

app.use(
	cors({origin: ['https://syria-res.blogspot.com', 'https://www.syr-edu.com']})
);

app.get('/result', async (req, res) => {
	const id = req.query.id;
	const city = req.query.city;
	const baseUrl = req.query.baseUrl;
	const category = req.query.category;
	const numInput = req.query.numInput;
	const cityInput = req.query.cityInput;
	const urlEnd = req.query.urlEnd;

try{
	const data = await getResult(baseUrl,category,numInput,id ,cityInput,city,urlEnd)
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
const getResult = async (baseUrl,category,numInput,num ,cityInput,city,urlEnd)=>{
	const url = `${baseUrl}/${category}/${urlEnd}.php?${cityInput}=${city}&${numInput}=${num}`
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

