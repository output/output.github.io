//当前层对外引用，也就是说，可以在其他地方直接通过g_GPTouchLayer指向当前层，从而获取当前层里面的属性和方法等等。
var g_GPTouchLayer;

var GPTouchLayer = cc.Layer.extend({
    bgSprite: null,
    timeout: 30,
    DishuSprites: null,
    score: 0,
    dishuCount: 9,
    showCount: 0,
    life: 3,
    heart1: null,
    heart2: null,
    heart3: null,

    ctor: function () {

        this._super();

        var size = cc.winSize;

        g_GPTouchLayer = this;

        GC.score = 0;

        GC.isScuess = false;

        this.DishuSprites = [];

        cc.spriteFrameCache.addSpriteFrames(res.boss_plist);
        cc.spriteFrameCache.addSpriteFrames(res.dog_plist);
        cc.spriteFrameCache.addSpriteFrames(res.zongjian_plist);
        cc.spriteFrameCache.addSpriteFrames(res.kehu_plist);
        cc.spriteFrameCache.addSpriteFrames(res.chuizi_plist);

        this.scoreLabel = new cc.LabelTTF("0个", "微软雅黑", GC.h * 0.06);
        this.scoreLabel.x = size.width / 2 + 235;
        this.scoreLabel.y = GC.h - 80;
        this.scoreLabel.color = cc.color(255, 0, 0);
        this.scoreLabel.enableStroke(cc.color(255, 0, 0), 1);
        this.addChild(this.scoreLabel, 5);

        // timeout 60
        this.timeoutLabel = new cc.LabelTTF("" + this.timeout + "秒", "微软雅黑", GC.h * 0.06);
        this.timeoutLabel.x = 95;
        this.timeoutLabel.y = GC.h - 80;
        this.timeoutLabel.color = cc.color(255, 0, 0);
        this.timeoutLabel.enableStroke(cc.color(255, 0, 0), 1);
        this.addChild(this.timeoutLabel, 5);

        // lifes
        var lifeLabel = new cc.LabelTTF("生命", "微软雅黑", GC.h * 0.05);
        lifeLabel.x = 217;
        lifeLabel.y = GC.h - 80;
        lifeLabel.color = cc.color(100, 65, 4);
        lifeLabel.enableStroke(cc.color(100, 65, 4), 1);
        this.addChild(lifeLabel);

        this.heart1 = new cc.Sprite(res.heart_red);
        this.heart1.x = 305;
        this.heart1.y = GC.h - 80;
        this.heart1.scale = 1.2;
        this.addChild(this.heart1);

        this.heart2 = new cc.Sprite(res.heart_red);
        this.heart2.x = 365;
        this.heart2.y = GC.h - 80;
        this.heart2.scale = 1.2;
        this.addChild(this.heart2);

        this.heart3 = new cc.Sprite(res.heart_red);
        this.heart3.x = 425;
        this.heart3.y = GC.h - 80;
        this.heart3.scale = 1.2;
        this.addChild(this.heart3);

        this.addTouchEventListenser();

        //开始运行地鼠

//        this.schedule(this.update, 1, 100, 1);

        GC.DishuAnimSeconds = 0.32;
        this.schedule(this.updateDishu1, 1, 15, 1);

        // timer倒计时60
        this.schedule(this.timer, 1, this.timeout, 1);

        cc.audioEngine.playMusic(res.gp_bgMusic, true);
        cc.audioEngine.setMusicVolume(0.8);

        return true;
    },
    update: function () {

        if (this.score <= 10) {
            GC.DishuAnimSeconds = 0.32;
        } else if (this.score > 10 && this.score <= 20) {
            GC.DishuAnimSeconds = 0.30;
        } else if (this.score > 20 && this.score <= 30) {
            GC.DishuAnimSeconds = 0.25;
        } else if (this.score > 30 && this.score <= 40) {
            GC.DishuAnimSeconds = 0.22;
        } else if (this.score > 40 && this.score <= 50) {
            GC.DishuAnimSeconds = 0.18
        } else if (this.score > 50) {
            GC.DishuAnimSeconds = 0.15;
        }

        this.showCount += 1;

        this.addDishu(parseInt(this.showCount));
    },
    updateDishu1: function () {

        cc.log("updateDishu 1 : " + this.showCount);

        if (this.showCount >= 10) {
            cc.log("超过 10 个");

            this.unschedule(this.updateDishu1);

            GC.DishuAnimSeconds = 0.3;
            this.schedule(this.updateDishu2, 0.9, 20, 1);
        } else {
            this.showCount += 1;
            this.addDishu(parseInt(this.showCount));
        }
    },
    updateDishu2: function () {

        cc.log("updateDishu 2 : " + this.showCount);

        if (this.showCount >= 20) {
            cc.log("超过 20 个");
            this.unschedule(this.updateDishu2);

            GC.DishuAnimSeconds = 0.28;
            this.schedule(this.updateDishu21, 0.8, 30, 0.9);
        } else {
            this.showCount += 1;
            this.addDishu(parseInt(this.showCount));
        }
    },
    updateDishu21: function () {

        cc.log("updateDishu 3 : " + this.showCount);

        if (this.showCount >= 40) {
            cc.log("超过 35 个");
            this.unschedule(this.updateDishu3);

            GC.DishuAnimSeconds = 0.25;
            this.schedule(this.updateDishu3, 0.7, 60, 0.7);
        } else {
            this.showCount += 1;
            this.addDishu(parseInt(this.showCount));
        }
    },
    updateDishu3: function () {

        cc.log("updateDishu 3 : " + this.showCount);

        if (this.showCount >= 70) {
            cc.log("超过 50 个");
            this.unschedule(this.updateDishu3);

            GC.DishuAnimSeconds = 0.15;
            this.schedule(this.updateDishu4, 0.6, 70, 0.7);
        } else {
            this.showCount += 1;
            this.addDishu(parseInt(this.showCount));
        }
    },
    updateDishu4: function () {

        cc.log("超过 40 个");

        cc.log("updateDishu 4 : " + this.showCount);

        this.showCount += 1;
        this.addDishu(parseInt(this.showCount));
    },
    addDishu: function (tag) {

        var isShowed = false;

        do {
            var i = parseInt(8 * Math.random());
            if (GC.ZUOBIAO[i].isShowed == false) {
                var scoreValue , comment , dishu;

                var type = parseInt(4 * Math.random());

                switch (type) {
                    case 0:
                        dishu = new LaoshuSprite(i);
                        scoreValue = 10;
                        comment = "老板";
                        break;
                    case 1:
                        dishu = new WenziSprite(i);
                        scoreValue = 20;
                        comment = "客户";
                        break;
                    case 2:
                        dishu = new HuangchongSprite(i);
                        scoreValue = 50;
                        comment = "总监";
                        break;
                    default:
                        dishu = new CangyingSprite(i);
                        scoreValue = 10;
                        comment = "小狗";
                        break;
                }

                GC.ZUOBIAO[i].isShowed = true;
                dishu.x = GC.ZUOBIAO[i].x;
                dishu.y = GC.ZUOBIAO[i].y;
                dishu.scoreValue = scoreValue;
                dishu.comment = comment;
                dishu.type = type;
                dishu.setTag(parseInt(tag));

                cc.log("类型: " + dishu.comment);
                cc.log("tag: " + dishu.getTag(tag));

                this.addChild(dishu);
                this.DishuSprites.push(dishu);

                isShowed = true;
            }
        }while(!isShowed)
    },
    removeDishu: function (begin, end) {

    },
    addScore: function (scoreValue) {
        this.score += scoreValue;
        GC.SCORE = this.score;
        this.scoreLabel.setString(this.score + "个");
    },
    reduceLife: function (lifeValue) {
        this.life -= lifeValue;
        //TODO 爱心动画

        if (this.life == 3) {
            this.heart1.visible = true;
            this.heart2.visible = true;
            this.heart3.visible = true;
        } else if (this.life == 2) {
            this.heart1.visible = true;
            this.heart2.visible = true;
            this.heart3.setTexture(res.heart_black);
        } else if (this.life == 1) {
            this.heart1.visible = true;
            this.heart2.setTexture(res.heart_black);
            this.heart3.setTexture(res.heart_black);
        } else if (this.life == 0) {
            this.heart1.setTexture(res.heart_black);
            this.heart2.setTexture(res.heart_black);
            this.heart3.setTexture(res.heart_black);

            this.unschedule(this.updateDishu1);
            this.unschedule(this.updateDishu2);
            this.unschedule(this.updateDishu21);
            this.unschedule(this.updateDishu3);
            this.unschedule(this.updateDishu4);
            this.unschedule(this.timer);

            cc.log("游戏失败：总共出现了" + this.showCount);

            GC.isScuess = false;
            this.gameOver();
        }
    },
    timer: function () {
        this.timeout -= 1;
        this.timeoutLabel.setString("" + this.timeout + "秒");

        if (this.timeout == 0) {
            this.unschedule(this.updateDishu1);
            this.unschedule(this.updateDishu2);
            this.unschedule(this.updateDishu21);
            this.unschedule(this.updateDishu3);
            this.unschedule(this.updateDishu4);
            this.unschedule(this.timer);

            cc.log("总共出现了" + this.showCount);

            if(GC.SCORE>0){
                GC.isScuess = true;
            }else{
                GC.isScuess = false;
            }

            this.gameOver();
        }
    },
    removeSushiByindex: function (dx) {

        if (isNaN(dx) || dx > this.DishuSprites.length) {
            return false;
        }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this.DishuSprites[i] != this[dx]) {
                this.DishuSprites[n++] = this.DishuSprites[i]
            }
        }
        this.DishuSprites.length -= 1
    },
    addTouchEventListenser: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {

                    //响应精灵点中
                    cc.log("pos.x=" + pos.x + ",pos.y=" + pos.y);

//                    target.stopAllActions();

                    cc.audioEngine.playEffect(res.gp_hit3, false);

                    cc.log(target);

                    var chuizi = new cc.Sprite(res.chuizi_png);
                    chuizi.x = pos.x + 49;
                    chuizi.y = pos.y + 160;
                    chuizi.setScale(0.8);
                    target.addChild(chuizi);

                    var frames = [];
                    for (var i = 1; i <= 3; i++) {
                        var str = "chuizi" + i + ".png";

                        var frame = cc.spriteFrameCache.getSpriteFrame(str);
                        frames.push(frame);
                    }

                    var animation = new cc.Animation(frames, 0.2, 0.6);
                    var ac = new cc.Animate(animation);

                    var seqAc = cc.sequence(ac, cc.CallFunc.create(function () {
                        cc.log("锤子重击！");

                        //TODO WKL 只算个数
                        target.removeChild(chuizi);

                    }, chuizi));

                    chuizi.runAction(seqAc);

                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    },
    removeTouchEventListenser: function () {
        cc.eventManager.removeListener(this.touchListener);
    },
    gameOver: function () {
        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
        cc.director.runScene(new GameOverScene());

        return;
    }

});
