const request = require('request').defaults({jar: true});
const express = require('express');
const cheerio = require('cheerio');
const charset = require("superagent-charset");
const agent = require("superagent");
const app = express();
const cmd5x = require("./js/cmd5x.js");
charset(agent); // 


/**
 * [getData 获取页面数据]
 * @param  {[type]}   url 	[请求链接]
 * @param  {[type]}   param [请求参数]
 * @return {[type]}       	[description]
 */
async function getData(url,param){

	return await(()=>{

		return new Promise((resolve, reject)=>{

				// 发送请求
			    agent.get(url)
			    .set("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
			    .set("Accept-Language","zh-CN,zh;q=0.9")
			    //.set("User-Agent","Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3236.0 Mobile Safari/537.36")
			    .set("User-Agent","Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3236.0 Safari/537.36")
			    .end((err, res1) => {

			    	resolve(res1&&res1.text);
			    	
			    });

				 
			})
	})()

}

/**
 * [getPageData 获取]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getPageData(req, res){

    var url = req.query.url,

    	cookie="QC006=e756ae955be1807406505993a7252590; QC007=DIRECT; QC008=5cddc87b0a7d74f22e59f4d5e4c7f262; T00404=d4706457e6b7144a6b1a0999491094f4; Hm_lvt_5df871ab99f94347b23ca224fc7d013f=1512106762,1512114660,1512118756,1512123198; __dfp=e1d73ed17bca734e86bf2eab96bd0fa11845f96785210b2f7f7e865c250d7db75a@1514620840256@1512028840256; Hm_lpvt_5df871ab99f94347b23ca224fc7d013f=1512124333",

    	userAgent="Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3236.0 Mobile Safari/537.36";

    getData(url).then((re)=>{

    	try{

		    let $ = cheerio.load(re),

		    	$target=$("#flashbox"),

		    	vid=$target.attr("data-player-videoid"),

		    	tvid=$target.attr("data-player-tvid");

	    	let	qyid=require('crypto').createHash('md5').update(userAgent + cookie + Math.random() + 1 * (new Date).getTime()).digest('hex'),

	    		agenttype1=13,

	    		_now=Date.now(),

	    		_afterNow=(''+_now).slice(0,-3),

	    		//rate 代表清晰度
	    		_param='/jp/tmts/'+tvid+'/'+vid+'/?uid=&cupid=qc_100001_100186&platForm=h5&qyid='+qyid

	    				+'&agenttype='+agenttype1+'&type=mp4&nolimit=&k_ft1=8&rate=2&sgti='+agenttype1+'_'+qyid+'_'+_now

	    			    +'&codeflag=1&preIdAll=&qd_v=1&qdy=a&qds=0&tm='+_afterNow+'&src=02020031010000000000&callback=tmtsCallback',

	    		_urlAttestation='http://cache.m.iqiyi.com'+_param+"&vf="+cmd5x(_param);

	    	//设置Cookie
	    	var cookie = request.jar();
	    	//获取普通视频可不用会员账号登陆  如会员专区的可使用会员登陆后设置cookie 可直接抓取
	    	//cookie.setCookie(request.cookie('P00001=41c7Mfc2TCeC3y5jWLQGcTm3Dm2wQw1qOdGhduJzTbvQe21TJ5j9tBExRXN7ltry17HOp8b'), _urlAttestation);

	    	//获取播放地址 及其他参数
	    	request({url : _urlAttestation , jar: cookie},(error, response, body)=>{

	    			if (!error && response.statusCode == 200) {
	    			   	
	    			   	res.send(body.replace("try{tmtsCallback(","").replace(");}catch(e){};",""));

	    			   	res.end();

	    			 }else{

	    			 	console.log(error);
	    			 }
	    	})

    	}catch(e){

    		console.log(e)

    	}
    	
    },(err)=>{

    	res.send(err);

		res.end();
    })

}

app.get('/',getPageData);

app.listen(3000);


