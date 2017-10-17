const Xray = require('x-ray');
const x = Xray(); // const xray = new Xray();   //not using at the moment
const fs = require('fs');
const osmosis = require('osmosis');
const CSV = require('csv-string');
const del = require('del');
const createCSVFile = require('csv-file-creator');
const entryPoint = 'div.button a@href'; // I think I put this here at some point to make the entry point requirement easier, but I think what I have may be ok
var dl = require('datalib');
var jsonexport = require('jsonexport');
var scrape = require('website-scraper');




// console.log(CSV.stringify(['a','b', 'c']));

// var psv = d3.dsvFormat("|");  //This one is probalby a good api, but i probalby dont have the time to get to know it.
// console.log(psv.parse("foo|bar\n1|2")); // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]


//un comment to run....
// let directory = fs.existsSync('data'); //Checks if there is a directory named data, makes one if not.
// if (directory === false){
//   fs.mkdirSync('data');
// } else {
//   // fs.unlinkSync('data');
//   del.sync(['data']);
// }

// Order should be Title, Price, ImageURL, URL and Time...Actually not doing time due to confilcting info in the instructions/graded secion
x('http://www.shirts4mike.com/shirts.php', {
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
})(function(err, someObj){
  // console.log(someObj.price1 + someObj.price2 + someObj.price3);
  // fs.writeFileSync('results.js', someObj.title);       //writes to file, but each time
  // fs.writeFileSync('results.js', array); 

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
  jsonexport(data, function(err, csv) {
    console.log(csv);
  });
});




// x('http://www.shirts4mike.com/shirts.php', {
//   price: x('ul.products li:nth-of-type(8) a@href', '.price')
// })(function(err,data){
//   // console.log(data);
//   // console.log(test);
// });



                     
                     
osmosis.get('http://shirts4mike.com')
  .find('div.button a')
  .follow('@href')
    .set({
      title: ['img@alt'],
      image: ['img@src']
    })
  .find('ul.products a')
  .follow('@href')
  // .find('.price')
    .set({
      price: '.price'
    })

  // .find('div.button a')
  // .follow('@href')
  // .set({
  //   title: ['img@alt'],
  //   image: ['img@src']
  // })

  .data(function(results){
    // console.log(results);   Made the most progress with this one today? But trying something else momentarily
    // fs.writeFileSync('results.js', results);  //writes to file
    // fs.writeFile('results.js', JSON.stringify(results), (err) => {
    //   if (err) {
    //     console.log('hi');
    //   }
    // });
    // JSON.stringify(results);
  }); // This one sort of worked trying something else below 


osmosis.get('http://shirts4mike.com')
  .find('div.button a')
  .follow('@href')
  .set({
    title: ['img@alt'],
    image: ['img@src']
  })

  // .find('ul.products a')
  .follow('@href')
  .find('.price')
  .set({
    price:'.price',
  })

  // .set({
  //   price: '.price',
  // })
  
  .data(function(results){
    // console.log(results.title);
    // let test= [results.title, results.image];
    // let test= ['Title: ' + results.title , results.image];
    // console.log(test);
    // console.log(results.image); //was working here//
    // console.log(results.price);


    // console.log(CSV.stringify(results.image[1]));  ///THIS WORKS, BUT I CANT REMEMBER IF I WAS USING THIS A WEEK OR SO AGO....

    // var test = JSON.stringify(results);
    // console.log(test);
    // fs.writeFileSync('results.js', results);  //writes to file
    // fs.writeFile('results.js', JSON.stringify(results), (err) => {
    //   if (err) {
    //     console.log('hi');
    //   }
    // });
    // JSON.stringify(results);
  });

 


//WAS WORKING following code YESTERDAY...
osmosis.get('http://shirts4mike.com')
  .find('div.button a')
  .follow('@href')
    .set({
      url: '.products a@href',
    })
  .find('ul.products a')
  .follow('@href')
    .set({
      title: 'img@alt',
      price: '.price',
      imageUrl: 'img@src',
    })
  .data(function(results){
    // console.log(`'${results.imageUrl}'`);
    let items = results;
    // let newstring = test2.substr(0,22); //not sure if I am going to need the use of the method, leaving it here just in case...
    // let array;
    // let array += items;
    // array.join();
    // console.log(items);
    // console.log(Object.entries(results));
    items.length;
    // console.log(items);      //WAS LAST HERE YESTERDAY...BOOOOOO

    // console.log(results.title + results.price);






    // var data = [{                //this is what utilizing that new api will look like...
    //   test: results.title,     
    //   test2: results.price
    // }];

    // jsonexport(data,function(err, csv) {
    //   console.log(csv);
    // });

    // fs.writeFileSync('results.js', results);  //writes to file
    // fs.writeFile('results.js', JSON.stringify(results), (err) => {
    //   if (err) {
    //     console.log('hi');
    //   }
    // });
    // JSON.stringify(results);
  }); 

