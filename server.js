// // function add(a,b) // function declaration
// // {
// //     return a+b;

// // }
// // var aff = (a,b)=>a+b; // function declration
    
// // let c = add(1,38);
// // let d = aff(1,8);
// // console.log(c);
// // console.log(d);

// // //iife
// // (function(){
// //     console.log('hey there');
// // })();

// // callback
// var a = (a,b,prince) =>
//     {
//         console.log(a+b);
//         prince();
//     }
// a(3,4, ()=>
// {
//     console.log('complete the process');
// });

// fs and os details and use it
// var fs = require('fs');
// var os = require('os');

// console.log(os.userInfo().username);

// // let's sent the msg to the user. (use of fs . file)

// // in this function... callback function is mandatory(complosory)
// fs.appendFile('msg.txt' , 'heyy ' + os.userInfo().username + ' \n', ()=>{
//     console.log('file is created');
// });
// koi file ne link krvi chee,, run aa file thse pn content bijaa file maa hse
const notes = require('./notes.js');
console.log('server file is also available ');

// output is undifined not diirectly to acess the variable 
// avaiable the solution in notes file..s
var age = notes.age;

// function acess..
let res = notes.addnum(age,24);
console.log(res);
console.log(age);

// library is use this node js 
// node init
// nodemon 
// lodash

// use the lodash for the coding...
var lodash = require('lodash');

let arr = ['person', 1,2,3,4,4,4,4,'array0','array'];
// some print the unique value...
var unique = lodash.uniq(arr);
console.log(unique);

console.log(lodash.isString('true'));