/*
* @Author: wifiin
* @Date:   2016-12-08 16:01:20
* @Last Modified by:   wifiin
* @Last Modified time: 2016-12-08 17:09:30
*/

'use strict';
//主模块的引入出口模块的功能方法；
const maths = require("./exit");
//调用各个模块的方法；
console.log("主模块的加法："+maths.maths.add(5,6));
console.log(maths.maths.minus(10,6));
maths.maths.sh();