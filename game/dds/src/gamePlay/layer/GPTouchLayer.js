
//当前层对外引用，也就是说，可以在其他地方直接通过g_GPTouchLayer指向当前层，从而获取当前层里面的属性和方法等等。
var g_GPTouchLayer;

var GPTouchLayer = cc.Layer.extend({
    bgSprite: null,
    timeout: 60,
    DishuSprites: null,
    score: 0,
    dishuCount: 9,
    showCount:0,

    ElmentArrX: null,
    ElmentArrY: null,
    Ex: null,
    Ey: null,
    lastx: null,
    lasty: null,

    ctor: function () {

        this._super();

        var size = cc.winSize;

        g_GPTouchLayer = this;

        this.DishuSprites = [];

        this.ElmentArrX = [GC.w_2 - 200, GC.w_2, GC.w_2 + 200];
        this.ElmentArrY = [GC.h_2 - 300, GC.h_2, GC.h_2 + 300];
        this.Ex = this.Ey = this.lastx = this.lasty = 0;

        cc.spriteFrameCache.addSpriteFrames(res.cangying_plist);
        cc.spriteFrameCache.addSpriteFrames(res.wenzi_plist);
        cc.spriteFrameCache.addSpriteFrames(res.huangchong_plist);
        cc.spriteFrameCache.addSpriteFrames(res.laoshu_plist);
        cc.spriteFrameCache.addSpriteFrames(res.chuizi_plist);

        this.scoreLabel = new cc.LabelTTF("0个", "Arial", GC.h * 0.06);
        this.scoreLabel.attr({
            x: size.width / 2 + 200,
            y: size.height - GC.h * 0.04
        });
        this.scoreLabel.color = cc.color(255, 0, 0);
        this.addChild(this.scoreLabel, 5);

        // timeout 60
        this.timeoutLabel = new cc.LabelTTF("" + this.timeout, "Arial", GC.h * 0.06);
        this.timeoutLabel.x = 125;
        this.timeoutLabel.y = size.height - GC.h * 0.04;
        this.timeoutLabel.color = cc.color(255, 0, 0);
        this.addChild(this.timeoutLabel, 5);


        this.addTouchEventListenser();

        //开始运行地鼠

        GC.DishuAnimSeconds=0.35;
        this.schedule(this.updateDishu1, 1.1, 10, 1);

        // timer倒计时60
        this.schedule(this.timer, 1, this.timeout, 1);

        cc.audioEngine.playMusic(res.gp_bgMusic,  true);
        cc.audioEngine.setMusicVolume(0.8);

        return true;
    },
    update: function () {

        var type = parseInt(cc.random0To1() * 6);

        cc.log("类型" + type);

        this.adddishu(type);

        this.removedishu();

    },
    updateDishu1: function () {

        cc.log("updateDishu 1 : " + this.showCount);

        if(this.showCount >= 10){
            cc.log("超过 10 个");

            this.unschedule(this.updateDishu1);

            GC.DishuAnimSeconds=0.3;
            this.schedule(this.updateDishu2, 0.9, 20, 1);
        }

        this.showCount += 1;



        var type = parseInt(cc.random0To1() * 6);

        cc.log("类型" + type);

        this.adddishu(type);

        this.removedishu();

    },
    updateDishu2: function () {

        cc.log("updateDishu 2 : " + this.showCount);

        if(this.showCount >= 20){
            cc.log("超过 20 个");
            this.unschedule(this.updateDishu2);

            GC.DishuAnimSeconds=0.28;
            this.schedule(this.updateDishu21, 0.8, 30, 0.9);
        }

        this.showCount+=1;


        var type = parseInt(cc.random0To1() * 6);

        cc.log("类型" + type);

        this.adddishu(type);

        this.removedishu();

    },
    updateDishu21: function () {

        cc.log("updateDishu 3 : " + this.showCount);

        if(this.showCount >= 40){
            cc.log("超过 35 个");
            this.unschedule(this.updateDishu3);

            GC.DishuAnimSeconds=0.25;
            this.schedule(this.updateDishu3, 0.7, 70, 0.7);
        }

        this.showCount+=1;



        var type = parseInt(cc.random0To1() * 6);

        cc.log("类型" + type);

        this.adddishu(type);

        this.removedishu();

    },
    updateDishu3: function () {

        cc.log("updateDishu 3 : " + this.showCount);

        if(this.showCount >= 70){
            cc.log("超过 50 个");
            this.unschedule(this.updateDishu3);

            GC.DishuAnimSeconds=0.15;
            this.schedule(this.updateDishu4, 0.6, 70, 0.7);
        }

        this.showCount+=1;



        var type = parseInt(cc.random0To1() * 6);

        cc.log("类型" + type);

        this.adddishu(type);

        this.removedishu();

    },
    updateDishu4: function () {

        cc.log("超过 40 个");

        cc.log("updateDishu 4 : " + this.showCount);

        this.showCount+=1;



        var type = parseInt(cc.random0To1() * 3);

        if(type>3){
            type = type % 3;
        }

        cc.log("类型" + type);

        this.adddishu(type);

        this.removedishu();

    },
    adddishu: function (type) {

        var  scoreValue , comment , dishu;

        switch (type) {
            case 0:

                dishu = new LaoshuSprite();

                scoreValue = 10;
                comment = "老鼠";
                break;

            case 1:

                dishu = new WenziSprite();

                scoreValue = 20;
                comment = "蚊子";
                break;

            case 2:

                dishu = new HuangchongSprite();

                scoreValue = 50;
                comment = "蝗虫";
                break;
            /*
            case 3:

                dishu = new LaoshuSprite();

                scoreValue = 100;
                comment = "老鼠";
                break;
            */

            default:

                dishu = new CangyingSprite();

                scoreValue = 10;
                comment = "苍蝇";
                break;
        }

        this.Ex = parseInt(Math.random() * 3);
        this.Ey = parseInt(Math.random() * 3);
        if (this.lastx != this.Ex && this.lasty != this.Ey) {
            // 不在相同位置连续出现

//            dishu = new DishuSprite(spriteImg);

            dishu.x = this.ElmentArrX[this.Ex];
            dishu.y = this.ElmentArrY[this.Ey];
            dishu.scoreValue = scoreValue;
            dishu.comment = comment;
            dishu.type = type;

            cc.log(dishu.comment);

            this.addChild(dishu);
            this.lastx = this.Ex;
            this.lasty = this.Ey;

            this.DishuSprites.push(dishu);

            GC.showCount += 1;
        } else {
            this.adddishu();
        }
    },
    removedishu: function () {

    },
    addScore: function (scoreValue) {
        this.score += scoreValue;
        GC.SCORE = this.score;
        this.scoreLabel.setString(this.score + "个");
    },
    timer: function () {
        if (this.timeout == 0) {
            this.unschedule(this.update);
            this.unschedule(this.timer);

            cc.log("总共出现了"+GC.showCount);

            cc.audioEngine.stopMusic();
            cc.audioEngine.stopAllEffects();

//            cc.director.runScene(new cc.TransitionSlideInT(1.2, new GameOverScene()));
            cc.director.runScene(new GameOverScene());

            return;
        }
        this.timeout -= 1;
        this.timeoutLabel.setString("" + this.timeout);
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
//
//                   target.removeTouchEventListenser();

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

                    var animation = new cc.Animation(frames, 0.2, 1);
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
    }

});

GPTouchLayer.prototype.addBullet = function (bullet, zOrder, mode) {
    this._texOpaqueBatch.addChild(bullet, zOrder, mode);
};

GPTouchLayer.prototype.addEnemy = function (enemy, z, tag) {
    this._texTransparentBatch.addChild(enemy, z, tag);
};

GPTouchLayer.prototype.addExplosions = function (explosion) {
    this._explosions.addChild(explosion);
};

GPTouchLayer.prototype.addSpark = function (spark) {
    this._texOpaqueBatch.addChild(spark);
};
