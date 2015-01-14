var Layer3 = cc.Layer.extend({
    speed: 200,
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.thirdPage_plist);
        this.initUI();
//        this.appear();
    },
    initUI: function () {

        this.accLayer = new cc.Layer();
        this.accLayer.anchorX = 0;
        this.accLayer.anchorY = 0;
        this.accLayer.x = 0;
        this.accLayer.y = 0;
        this.addChild(this.accLayer);

        this.leftUpPic = new cc.Sprite("#block_left_up2.png");
        this.leftUpPic.setPosition(cc.pAdd(cc.visibleRect.topLeft, cc.p(-this.leftUpPic.width / 2, this.leftUpPic.height / 2)));
        this.accLayer.addChild(this.leftUpPic);


        this.leftDownPic = new cc.Sprite("#block_left_down2.png");
        this.leftDownPic.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(-this.leftDownPic.width / 2, -this.leftDownPic.height / 2)));
        this.accLayer.addChild(this.leftDownPic);

        this.rightUpPic = new cc.Sprite("#block_right_up2.png");
        this.rightUpPic.setPosition(cc.pAdd(cc.visibleRect.topRight, cc.p(this.rightUpPic.width / 2, -this.rightUpPic.height / 2)));
        this.accLayer.addChild(this.rightUpPic);

        this.rightDownPic = new cc.Sprite("#block_right_down2.png");
        this.rightDownPic.setPosition(cc.pAdd(cc.visibleRect.bottomRight, cc.p(this.rightDownPic.width / 2, -this.rightDownPic.height / 2)));
        this.accLayer.addChild(this.rightDownPic);

        this.line = new cc.ProgressTimer(new cc.Sprite(res.line_png));
        this.line.type = cc.ProgressTimer.TYPE_BAR;
        this.line.midPoint = cc.p(0, 1);
        this.line.barChangeRate = cc.p(0, 1);
        this.line.percentage = 0;
        this.line.setPosition(cc.p(cc.winSize.width / 2 - 30, cc.winSize.height - this.line.height / 2));
        this.addChild(this.line);

        this.firstPoint = new cc.Sprite("#circle_red.png");
        this.firstPoint.setPosition(cc.p(35, this.line.height - 111));
        this.firstPoint.scale = 0;
        this.line.addChild(this.firstPoint);

        this.firstText = new cc.Sprite("#morning font.png");
        this.firstText.setPosition(cc.p(this.firstPoint.x + this.firstPoint.width / 2 + 20 + this.firstText.width, this.firstPoint.y - 50));
        this.firstText.opacity = 0;
        this.line.addChild(this.firstText);

        this.secondPoint = new cc.Sprite("#circle_org.png");
        this.secondPoint.setPosition(cc.p(395, 395));
        this.secondPoint.scale = 0;
        this.line.addChild(this.secondPoint);

        this.secondText = new cc.Sprite("#Afternoon font.png");
        this.secondText.setPosition(cc.p(this.secondPoint.x - this.firstPoint.width / 2 - 20 - this.secondText.width, this.secondPoint.y - 20));
        this.secondText.opacity = 0;
        this.line.addChild(this.secondText);

        this.thirdPoint = new cc.Sprite("#circle_green.png");
        this.thirdPoint.setPosition(cc.p(15, 168));
        this.thirdPoint.scale = 0;
        this.line.addChild(this.thirdPoint);

        this.thirdText = new cc.Sprite("#all day font.png");
        this.thirdText.setPosition(cc.p(this.thirdPoint.x + this.thirdPoint.width / 2 + 20 + this.thirdText.width, this.thirdPoint.y - 22));
        this.thirdText.opacity = 0;
        this.line.addChild(this.thirdText);

        this.forthPoint = new cc.Sprite("#circle_end.png");
        this.forthPoint.setPosition(cc.p(150, -this.forthPoint.height / 2 + 5));
        this.line.addChild(this.forthPoint);
        this.forthPoint.scale = 0;

    },
    accelEvent: function (acc, event) {
        if (this.visible) {
            movArea(acc, this.accLayer);
        }
    },
    appear: function () {//20,50,80,100
        this.leftUpPic.inAciton = cc.moveTo(0.2, cc.p(this.leftUpPic.x + this.leftUpPic.width + 20, this.leftUpPic.y - this.leftUpPic.height + 20));
        this.leftUpPic.runAction(this.leftUpPic.inAciton);

        this.leftDownPic.inAciton = cc.moveTo(0.2, cc.p(this.leftDownPic.x + this.leftDownPic.width + 20, this.leftDownPic.y + this.leftDownPic.height + 20));
        this.leftDownPic.runAction(this.leftDownPic.inAciton);

        this.rightUpPic.inAciton = cc.moveTo(0.2, cc.p(this.rightUpPic.x - this.rightUpPic.width - 30, this.rightUpPic.y - this.rightUpPic.height - 30));
        this.rightUpPic.runAction(this.rightUpPic.inAciton);

        this.rightDownPic.inAciton = cc.moveTo(0.2, cc.p(this.rightDownPic.x - this.rightDownPic.width - 20, this.rightDownPic.y + this.rightDownPic.height + 80));
        this.rightDownPic.runAction(this.rightDownPic.inAciton);

        var action = cc.sequence(cc.delayTime(0.2), cc.progressTo(0.3, 20), cc.callFunc(function () {
            this.firstPoint.inAction = cc.scaleTo(0.2, 1);
            this.firstPoint.runAction(this.firstPoint.inAction);
            this.firstText.inAction = cc.sequence(cc.delayTime(0.2), cc.spawn(cc.moveTo(0.2, cc.p(this.firstText.x - this.firstText.width / 2, this.firstText.y)), cc.fadeIn(0.5)));
            this.firstText.runAction(this.firstText.inAction);
        }, this), cc.delayTime(0.7), cc.progressTo(0.3, 50), cc.callFunc(function () {
            this.secondPoint.inAction = cc.scaleTo(0.2, 1);
            this.secondPoint.runAction(this.secondPoint.inAction);
            this.secondText.inAction = cc.sequence(cc.delayTime(0.2), cc.spawn(cc.moveTo(0.2, cc.p(this.secondText.x + this.secondText.width / 2, this.secondText.y)), cc.fadeIn(0.5)));
            this.secondText.runAction(this.secondText.inAction);
        }, this), cc.delayTime(0.7), cc.progressTo(0.3, 80), cc.callFunc(function () {
            this.thirdPoint.inAction = cc.scaleTo(0.2, 1);
            this.thirdPoint.runAction(this.thirdPoint.inAction);
            this.thirdText.inAction = cc.sequence(cc.delayTime(0.2), cc.spawn(cc.moveTo(0.2, cc.p(this.thirdText.x - this.thirdText.width / 2, this.thirdText.y)), cc.fadeIn(0.5)));
            this.thirdText.runAction(this.thirdText.inAction);
        }, this), cc.delayTime(0.7), cc.progressTo(0.3, 100), cc.callFunc(function () {
            this.forthPoint.inAction = cc.scaleTo(0.2, 1);
            this.forthPoint.runAction(this.forthPoint.inAction);
            canChangePage = true;
//            this.disappear();
        }, this));
        this.line.runAction(action);
    },
    disappear: function (callback, target) {

        this.leftUpPic.runAction(this.leftUpPic.inAciton.reverse());
        this.leftDownPic.runAction(this.leftDownPic.inAciton.reverse());
        this.rightUpPic.runAction(this.rightUpPic.inAciton.reverse());
        this.rightDownPic.runAction(this.rightDownPic.inAciton.reverse());

        this.forthPoint.inAction = cc.sequence(cc.delayTime(0.2), cc.scaleTo(0.2, 0));
        this.forthPoint.runAction(this.forthPoint.inAction);

        var action = cc.sequence(cc.progressFromTo(0.5, 100, 0), cc.delayTime(0.5), cc.callFunc(function () {

            if (target && callback) {
                callback.call(target);
            }
        }, this));
        this.line.runAction(action);
        this.thirdPoint.inAction = cc.sequence(cc.delayTime(0.2), cc.scaleTo(0.2, 0));
        this.thirdPoint.runAction(this.thirdPoint.inAction);
        this.thirdText.inAction = cc.spawn(cc.moveTo(0.3, cc.p(this.thirdText.x + this.thirdText.width / 2, this.thirdText.y)), cc.fadeOut(0.3));
        this.thirdText.runAction(this.thirdText.inAction);
        this.secondPoint.inAction = cc.sequence(cc.delayTime(0.2), cc.scaleTo(0.2, 0));
        this.secondPoint.runAction(this.secondPoint.inAction);
        this.secondText.inAction = cc.spawn(cc.moveTo(0.5, cc.p(this.secondText.x - this.secondText.width / 2, this.secondText.y)), cc.fadeOut(0.3));
        this.secondText.runAction(this.secondText.inAction);
        this.firstPoint.inAction = cc.sequence(cc.delayTime(0.2), cc.scaleTo(0.2, 0));
        this.firstPoint.runAction(this.firstPoint.inAction);
        this.firstText.inAction = cc.spawn(cc.moveTo(0.3, cc.p(this.firstText.x + this.firstText.width / 2, this.firstText.y)), cc.fadeOut(0.3));
        this.firstText.runAction(this.firstText.inAction);
    }
});