/*
* @Author: 苏镇
* @Date:   2016-03-08 17:09:44
* @Last Modified by:  suzhen
* @Last Modified time: 2016-05-27 21:22:41
*/

'use strict';

const cheerio = require("cheerio"); //非核心模块
const request = require("request"); //非核心模块
const iconv = require('iconv-lite');
const fs = require("fs");

const express = require('express'); //引入express模块   非核心模块
const app = express();//支持页面的路由跳转

let urlStr = "http://nba.sports.sina.com.cn/league_order1.php?dpc=1";
let nba_json = {};
request({url:urlStr,encoding:null},function(error,response,body){
	/*if (!error && response.statusCode == 200){*/
		let  html  = iconv.decode(body, 'gb2312'); //解决获取的内容乱码的问题

		let $ = cheerio.load(html,{

        	/*将中文转码后正常展示出来*/
        	decodeEntities:false
    	});

    	let td_text="";
    	let arr=[];
    	let obj_nba={};
    	let arrs = [];
    	for(let i=2;i<36;i++){
    		if(i==17||i==18||i==19||i==20){
    			 continue;
    		}
    		for(let j=0;j<15;j++){
    			 td_text = $("#table980middle tr").eq(i).find("td").eq(j).text();
    			if(j==1){
    				var name = td_text.trim();
    				arrs.push(name);
    			}else{
    				arr.push(td_text.trim());
    			}
    		}
    		//将数据组装存放到一个对象中
    		obj_nba[name] = arr;
    		td_text = "";
    		arr = [];
    	}
    	
    	//A:至此所需要的数据读取完成并封装完成所需的状态；
        nba_json = JSON.stringify(obj_nba);
		
		fs.writeFile("./www/main/data.txt",nba_json);

		//B: 开始搭建页面运用数据
		//app.use(express.static('public'));读取静态资源路径，默认打开静态资源路径的位置；
		app.use('/', express.static(__dirname + '/www'));

		app.get('/', function (req, res) {
		   res.sendFile( __dirname + "/" + "www/main/index.html" );
	    });
	    app.get('/process_get', function (req, res) {
		   res.sendFile( __dirname + "/" + "www/main/comparison.html" );
	    });

	    //开启服务的进程
	   	app.listen(9000,"127.0.0.1");
		console.log("应用实例，访问地址为  127.0.0.1:9000");
		
})