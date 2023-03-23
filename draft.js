async function scrapeFacebookFollowersCount(pageUrl) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto(pageUrl);
  
  //   const followersCountSelector = 'div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.x1nhvcw1.x1cy8zhl.xozqiw3.x1q0g3np.x1pi30zi.x1swvt13.xexx8yu.xykv574.xbmpl8g.x4cne27.xifccgj div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k.xamitd3.xsyo7zv.x16hj40l.x10b6aqq.x1yrsyyn div.x78zum5.xdt5ytf.xz62fqu.x16ldp7u div.xu06os2.x1ok221b span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x6prxxf.xvq8zen.xo1l8bm.xzsf02u';
  //  const followersCountSelector = 'div.xu06os2.x1ok221b span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xzsf02u.x1yc453h span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x6prxxf.xvq8zen.xo1l8bm.xzsf02u';
  //   await page.waitForSelector(followersCountSelector);
  
  //   const followersCount = await page.$eval(followersCountSelector, el => el.innerText);
  
  const textSelector = await page.waitForSelector(
      'text/people like this'
    );
    const fullTitle = await textSelector.evaluate(el => el.textContent);
    await browser.close();
  
    return fullTitle;
  }


  // scrapeFacebookFollowersCount('https://www.facebook.com/facebook/')
//   .then(followersCount => {con.connect(function(err) {
// 	if (err) throw err;
// 	console.log("Connected!");
// 	var sql = `INSERT INTO customers (test,name, address) VALUES ('${parseFloat(followersCount.slice(0,-16).replace(/,/g, '')) - 9999}', 'Highway 37','asdasd')`;
// 	con.query(sql, function (err, result) {
// 	  if (err) throw err;
// 	  console.log("1 record inserted");
// 	});
//   });})
//   .catch(error => console.error(error,'asdasd'));
