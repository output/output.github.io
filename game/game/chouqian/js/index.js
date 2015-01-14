new Image().src="decode.png";
new Image().src="234.png";
var start, showDecode, jumpToDecode, lastTime, lastAcc, isStarted = false;

start = function() {
	isStarted = true;
	$('.decode').hide();
	$('.result').show();
	setTimeout(showDecode, 3000);
}

showDecode = function(){
	$('.result').hide();
	$('.decode').show();
	setTimeout(jumpToDecode, 3000);
}

jumpToDecode = function(){
	var urls = [
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249686&idx=1&sn=5f560b1993cd2e8949d6e3f652bf192f#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249686&idx=2&sn=9f8cde32c3164638d88ba3dda15380dd#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249686&idx=3&sn=af5a3f1daf3750be57f104f923159a15#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249686&idx=4&sn=bc77c767025913c34c67cb4ce1bfe784#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249570&idx=1&sn=b27e5745842b2ac9e717411171aeb05f#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249570&idx=2&sn=bc0835170ea2dd313e0c729fc58ba7d5#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249570&idx=3&sn=dc166fac8bb90ba0b7c63f03b39d798c#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249570&idx=4&sn=2af1555d8340e0bad8b0df6b205ffc78#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249570&idx=5&sn=39579f8b6ecfddab2976e043fffa6755#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249570&idx=6&sn=b582c23b769369379223e6d039a3b011#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249570&idx=7&sn=704282f80a075d1e1193a6a4f8c9c461#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249570&idx=8&sn=89d1c1aa483e06cae1bec716ba700c3a#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249355&idx=1&sn=f2f2a7f953040657016ba87843a65370#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249355&idx=2&sn=a17ccad918326f05193578a2a2c91a06#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249355&idx=3&sn=5f9531bfccb72fb82223b7246877dd3e#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249355&idx=4&sn=f8d08e5e97bc5e441f407f635319fce1#rd", 
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249355&idx=5&sn=e3c57b5c59d1f5196ad10127539bab84#rd",
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249355&idx=6&sn=55b9b57466917f31bd6b3ab144a9c7a7#rd",
	"http://mp.weixin.qq.com/s?__biz=MjM5NDExMjIwMA==&mid=202249355&idx=7&sn=7f29d660d7ec9626f5a20553d9d47904#rd"
	];
	var jumpTo = urls[parseInt(Math.random() * urls.length)];
	window.location = jumpTo;
}

$('.do').click(start);

//鎽囦竴鎽�
$(window).on('deviceorientation', function(e) {
	if (isStarted) {
		return true;
	}
	if (!lastAcc) {
		lastAcc = e;
		return true;
	}
	var speed = e.alpha + e.beta + e.gamma - lastAcc.alpha - lastAcc.beta - lastAcc.gamma;
	if (Math.abs(speed) > 50) {
		start();
	}
	lastAcc = e;
});

//寰俊鍒嗕韩

var shareMeta = {
	img_url: "http://bcs.duapp.com/course-ware/qifu/thumbnail.gif",
	image_width: 100,
	image_height: 100,
	link: 'http://www.izaodao.com/topic/2015qifu/',
	title: "2015祈福",
	desc: "早道日语出品",
	appid: ''
};
document.addEventListener('WeixinJSBridgeReady', function () {
	WeixinJSBridge.on('menu:share:appmessage', function(){
		WeixinJSBridge.invoke('sendAppMessage', shareMeta);
	});
	WeixinJSBridge.on('menu:share:timeline', function(){
		WeixinJSBridge.invoke('shareTimeline', shareMeta);
	});
	WeixinJSBridge.on('menu:share:weibo', function(){
		WeixinJSBridge.invoke('shareWeibo', {
			content: shareMeta.title + shareMeta.desc,
			url: shareMeta.link
		});
	});
});