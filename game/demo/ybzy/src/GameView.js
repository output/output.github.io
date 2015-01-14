/**
 * Created by litengfei on 14-8-10.
 */
var bgSize;
var sbSize;
var npcNormal=null;
//游戏背景X轴偏移量
var gameViewXOffset = 0;
//前一个黑块信息
var preBlackXOffset = 0;
//生成黑块信息
var currBlackXOffset = 0;
//两块间距
var betweenXOffset = 0;

//前一个黑块
//后一个黑块

var guideTextPic = null;

//增长黑块对象
var upBlackObject;
//初始分数
var Score  = 0;
var ScoreText;

var npcController = 
{
	sfCache:null,
	initNPC:function(layer)
	{
		sfCache = cc.spriteFrameCache;
		sfCache.addSpriteFrames(res.ShakePlist, res.ShakePng);
		sfCache.addSpriteFrames(res.KickPlist, res.KickPng);
		sfCache.addSpriteFrames(res.WalkPlist, res.WalkPng);
		sfCache.addSpriteFrames(res.YaoPlist, res.YaoPng);

		npcNormal = new cc.Sprite('#dou0001.png');
		var npcSize = npcNormal.getContentSize();
		npcNormal.setScale(1, 1);
		npcNormal.x = bgSize.width/2;
		npcNormal.y = sbSize.height+npcSize.height/2;
		layer.addChild(npcNormal);
	},
	walk:function(flag)
	{
		npcNormal.stopAllActions();
		var animFrames = [];
		var str = "";
		var frame;
		for (var i = 1; i < 5; i++) {
			str = "zou000" + i + ".png";
			frame = sfCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
//		var animation = new cc.Animation(animFrames, 0.1);
		var animation = new cc.Animation(animFrames, flag);
		npcNormal.runAction(cc.animate(animation).repeatForever());
	},
	shake:function()
	{
		npcNormal.stopAllActions();
		var animFrames = [];
		var str = "";
		var frame;
		for (var i = 1; i < 3; i++) {
			str = "dou000" + i + ".png";
			frame = sfCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = new cc.Animation(animFrames, 0.1);
		npcNormal.runAction(cc.animate(animation).repeatForever());
	},
	kick:function()
	{
		npcNormal.stopAllActions();
		var animFrames = [];
		var str = "";
		var frame;
		for (var i = 1; i < 6; i++) {
			str = "ti000" + i + ".png";
			frame = sfCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = new cc.Animation(animFrames, 0.05);
		npcNormal.runAction(cc.animate(animation));
	},
	yao:function()
	{
		npcNormal.stopAllActions();
		var animFrames = [];
		var str = "";
		var frame;
		for (var i = 1; i < 7; i++) {
			str = "yao00" + (i < 10 ? ("0" + i) : i) + ".png";
			frame = sfCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = new cc.Animation(animFrames, 0.1);
		npcNormal.runAction(cc.animate(animation).repeatForever());
	}
}

var GameViewBackground = cc.Layer.extend
(
	{
		ctor: function()
		{
			this._super();

			bgSize = cc.director.getWinSize();
			var flag = cc.random0To1()+0.5;
			var flagInt = parseInt(flag);
			var backgroundIndex = null;
			switch (flagInt)
			{
			case 0:
			{
				backgroundIndex = res.StartBackground_png0;
			}
			break;
			case 1:
			{
				backgroundIndex = res.StartBackground_png1;
			}
			break;
			default:
			{
				backgroundIndex = res.StartBackground_png0;
			}
			break;
			}
			var background = new cc.Sprite(backgroundIndex);
			background.attr({
				x: bgSize.width / 2,
				y: bgSize.height / 2,
				scale: 1.0,
				rotation: 0
			});
			this.addChild(background);
			
			
			guideTextPic = null;
			
			ScoreText = new cc.LabelTTF("","宋体",46);
			ScoreText.setPosition(cc.p(bgSize.width/2,bgSize.height/2+300));
			ScoreText.setColor(cc.color(255,255,255));
			this.addChild(ScoreText,2);

			return true;
		},
		scoreBg:function(){
			var scoreBg = new cc.Sprite(res.ScoreBg);
			scoreBg.x = bgSize.width/2;
			scoreBg.y = bgSize.height/2+300;
			this.addChild(scoreBg,1);
		},
		drawGuidtext:function(){

//			var isFirst = cc.sys.localStorage.getItem("is_newUser");
//			if (isFirst) {
//
//			}else{
				guideTextPic = new cc.Sprite(res.guideText);
				guideTextPic.setPosition(bgSize.width/2, bgSize.height/2+180);
				this.addChild(guideTextPic,2);
				guideTextPic.setVisible(false);
				//cc.sys.localStorage.setItem("is_newUser",true);
			//}
		}
	}
);

var GameView = cc.Layer.extend
(
	{
        _this:null,
        _start:false,
		ctor: function()
		{
			this._super();
			
			_this = this;
			var stickBlack = new cc.Sprite(res.StickBlack_png);
			sbSize = stickBlack.getContentSize();
			stickBlack.setScale(180/sbSize.width, 387/sbSize.height);
			stickBlack.x = bgSize.width/2;
			stickBlack.y = sbSize.height/2-50;
			this.addChild(stickBlack);
			
			npcController.initNPC(this);
			npcController.yao();
			
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: this.onTouchBegan,
				onTouchEnded: this.onTouchEnded
			}, this);
			
			return true;
		},
		startGame:function(){
			Score = 0;
			ScoreText.setString(Score);
	
			var _width = 180;
			gameViewXOffset = -_width/2+bgSize.width/2;
			preBlackXOffset = _width;
			this.runAction(cc.sequence(cc.moveBy(0.2, cc.p(-gameViewXOffset, 100))));
			this.npcRun(0.1);
			npcNormal.runAction
			(
				cc.sequence
				(
					cc.moveBy(0.2, cc.p(_width/2-28, 0)),
					cc.callFunc(this.npcYao, this),
					cc.callFunc(this.addBlock, this)
				)
			);

			if (guideTextPic != null) {
				guideTextPic.setVisible(true);
			}
		},
		addBlock:function(){

			_this._start = true;
			upBlackObject =  new cc.Sprite(res.StickBlack_png);
			upBlackObject.setAnchorPoint(cc.p(0.5, 0));
			var upSize = upBlackObject.getContentSize();
			upBlackObject.x = gameViewXOffset+preBlackXOffset-2.5;
			upBlackObject.y = sbSize.height;
			upBlackObject.setScaleY(0);
			this.addChild(upBlackObject);
			//增加黑条方法
			//生成随机的宽度10～50
			//位置，屏幕右侧
			//动作结束可以可以触发手指按下动作
			//var flag = (cc.random0To1()*2.5+0.4)*20;
			var flag = cc.random0To1()*120+40;
			var stickBlack = new cc.Sprite(res.StickBlack_png);
			var tSize = stickBlack.getContentSize();
			stickBlack.setScale(flag/sbSize.width, 387/sbSize.height);
			stickBlack.x = gameViewXOffset+bgSize.width+flag/2;
			stickBlack.y = tSize.height/2-50;
			this.addChild(stickBlack);

			var _offset = bgSize.width - preBlackXOffset;
//			var flag1 = (cc.random0To1()+1)/4;
			var flag1 = (cc.random0To1()+0.6)/2;
			currBlackXOffset = flag;
			betweenXOffset = flag1*_offset;

			stickBlack.runAction
			(
				cc.sequence(cc.moveBy(0.05, cc.p(-betweenXOffset, 0)))
			);
		},
		npcRun:function(flag){
			//NPC移动
			npcController.walk(flag);
		},
		npcKick:function(){
			//NPC踢
			npcController.kick();
		},
		npcShake:function(){
			//NPC抖
			npcController.shake();
		},
		npcYao:function(){
			//NPC摇
			npcController.yao();
		},
		onTouchBegan:function (touch, event) {
			//
			if (guideTextPic != null) {
//				this.removeChild(guideTextPic, true);
				guideTextPic.setVisible(false);
			}
			if (_this._start) {
				_this.startSchedule();
				return true;
			}
			return false;
		},
	    onTouchEnded:function (touch, event) {
			//
			_this.stopSchedule();
	    },
	    startSchedule:function(){
	    	this.schedule(this.upBlack, 0.02);
	    	this.npcShake();
	    },
	    stopSchedule:function(){
	    	this.unschedule(this.upBlack);
	    	this.npcKick();
	    	_this._start = false;
	    	upBlackObject.runAction
	    	(
	    		cc.sequence
	    		(
	    			cc.delayTime(0.3),
	    			cc.rotateBy(0.1, 90),
	    			cc.callFunc(this.rotateEnd, this)
	    		)
	    	);
	    },
	    upBlack:function(dt){
	    	var scaleY = upBlackObject.getScaleY();
	    	upBlackObject.setScaleY(scaleY+0.07);
	    },
	    rotateEnd:function(){
	    	var uSize = upBlackObject.getContentSize();
	    	var finalHeight = upBlackObject.getScaleY()*uSize.height;
	    	//判断是否可以通过,
	    	var offsetll = (betweenXOffset+preBlackXOffset);
	    	var result = bgSize.width - offsetll;
	    	if (result+5<=finalHeight && (result+currBlackXOffset>=finalHeight)) {
	    		//成功
//	    		preBlackXOffset = currBlackXOffset;
	    		this.next(result+currBlackXOffset);
	    	} else {
	    		//失败
	    		if(result+currBlackXOffset < finalHeight){
	    			this.gameOver(result+currBlackXOffset+50);
	    		}else{
	    			this.gameOver(finalHeight+30);
	    		}
	    	}
	    },
	    next:function(offset){
	    	var flag = offset/500;
	    	this.npcRun(flag/30);
	    	npcNormal.runAction
	    	(
    			cc.sequence
    			(
					cc.moveBy(flag, cc.p(offset, 0)),
					cc.callFunc(this.nextBlack, this)
    			)
	    	);
	    	
	    },
	    gameOver:function(offset){
	    	var flag = offset/500;
	    	this.npcRun(flag/30);
	    	npcNormal.runAction
	    	(
    			cc.sequence
    			(
					cc.moveBy(flag, cc.p(offset, 0)),
					cc.callFunc(this.gameFaile, this)
    			)
	    	);
	    },
	    nextBlack:function(){
	    	Score++;
	    	ScoreText.setString(Score);
	    	
//	    	cc.sys.
	    	if (Score>cc.sys.localStorage.getItem("zxhcg_best_score")) {
	    		cc.sys.localStorage.setItem("zxhcg_best_score", Score);  
			}	 
//	    	var u_score = cc.sys.localStorage.getItem("u_score");
//	    	cc.log("u_score = "+u_score);
	    	
	    	this.npcYao();
    		preBlackXOffset = currBlackXOffset+40;
	    	var result = bgSize.width - (betweenXOffset)-40;
	    	gameViewXOffset += result;
	    	this.runAction
	    	(
	    		cc.sequence
	    		(
	    			cc.moveBy(0.3, cc.p(-result, 0)),
					cc.callFunc(this.addBlock, this)
	    		)
	    	);
	    },
	    gameFaile:function(){
	    	//
	    	this.npcYao();
	    	npcNormal.runAction
	    	(
    			cc.sequence
    			(
					cc.moveTo(0.3, cc.p(npcNormal.getPositionX(), -200)),
					cc.callFunc(this.addGameFailView, this)
    			)
	    	);
	    	upBlackObject.runAction
	    	(
	    		cc.sequence(cc.rotateBy(0.1, 90))
	    	);
	    },
	    addGameFailView:function(){
	    	//添加重新开始界面
	    	var gameOverLayer = new GameOver();
	    	gameOverLayer.x = gameViewXOffset;
	    	gameOverLayer.y = -100;
	    	gameOverLayer.showScore(Score);
	    	this.addChild(gameOverLayer);
	    }
	}
);