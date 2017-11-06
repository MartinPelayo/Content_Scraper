const Xray = require('x-ray'); 
const x = Xray(); //GitHub page is updated info about package
const fs = require('fs');
const jsonexport = require('jsonexport');

let directory = fs.existsSync('data'); //Checks if there is a directory named data, makes one if not.
if (directory === false){
  fs.mkdirSync('data');
}

x('http://www.shirts4mike.com/shirts.php', {  //Xray visits entry point and pulls pertinent data from website
  title: x (['.products img@alt']),            
  price1: x('ul.products li:nth-of-type(1) a@href', '.price'),
  price2: x('ul.products li:nth-of-type(2) a@href', '.price'),
  price3: x('ul.products li:nth-of-type(3) a@href', '.price'),
  price4: x('ul.products li:nth-of-type(4) a@href', '.price'),
  price5: x('ul.products li:nth-of-type(5) a@href', '.price'),
  price6: x('ul.products li:nth-of-type(6) a@href', '.price'),
  price7: x('ul.products li:nth-of-type(7) a@href', '.price'),
  price8: x('ul.products li:nth-of-type(8) a@href', '.price'),
  imageUrl: x(['.products img@src']),
  url: x(['.products a@href']),
})(function(err, someObj){                    //If connection error, run log messege. Otherwise, prep data for formatting
  if(err){
    console.log('looks like have a connection error'); 
  } else {
    let date = new Date();
    let time = date.getTime();
    let data = [{
      title: someObj.title[0],
      price: someObj.price1,
      imageUrl: someObj.imageUrl[0],
      url: someObj.url[0],
      timeStamp: time,
    }, {
      title: someObj.title[1],
      price: someObj.price2,
      imageUrl: someObj.imageUrl[1],
      url: someObj.url[1],
      timeStamp: time,   
    }, {
      title: someObj.title[2],
      price: someObj.price3,
      imageUrl: someObj.imageUrl[2],
      url: someObj.url[2],   
      timeStamp: time,  
    }, {
      title: someObj.title[3],
      price: someObj.price4,
      imageUrl: someObj.imageUrl[3],
      url: someObj.url[3],  
      timeStamp: time,
    }, {
      title: someObj.title[4],
      price: someObj.price5,
      imageUrl: someObj.imageUrl[4],
      url: someObj.url[4],
      timeStamp: time,
    }, {
      title: someObj.title[5],
      price: someObj.price6,
      imageUrl: someObj.imageUrl[5],
      url: someObj.url[5],
      timeStamp: time,
    }, {
      title: someObj.title[6],
      price: someObj.price7,
      imageUrl: someObj.imageUrl[6],
      url: someObj.url[6],     
      timeStamp: time,
    }, {
      title: someObj.title[7],
      price: someObj.price8,
      imageUrl: someObj.imageUrl[7],
      url: someObj.url[7],
      timeStamp: time,
    }];
    jsonexport(data, function(err, csv) { //format data with API
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();

      fs.writeFileSync(`data/${year}-${month}-${day}.csv`, csv);  //finish writing file
    });
  }
});



