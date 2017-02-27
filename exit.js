/*
* @Author: 苏镇
* @Date:   2016-12-08 15:46:22
* @Last Modified by:   wifiin
* @Last Modified time: 2016-12-23 12:28:35
*/

'use strict';
//引入其他模块的对象的方法 require();包的加载机制；
const add = require("./www/js/01.js");
const minus =require("./www/js/02.js");

function sellhell(){
	console.log("大家好，我是佛祖汤神！")
}




exports.maths = {
	add:add.add,
	minus:minus.minus,
	sh:sellhell
};

console.log(add.add(5,8));
console.log(minus.minus(9,4));