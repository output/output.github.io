var Layer5 = cc.Layer.extend({
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.secondPage_plist);
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

        this.lineLeftUp = new cc.Sprite("#line_left up.png");
        this.lineLeftUp.setPosition(cc.pAdd(cc.visibleRect.topLeft, cc.p(-this.lineLeftUp.width / 2, -this.lineLeftUp.height)));
        this.addChild(this.lineLeftUp);
        this.blockLeftUp = new cc.Sprite("#block_left_up.png");
        this.blockLeftUp.setPosition(cc.pAdd(cc.visibleRect.topLeft, cc.p(-this.blockLeftUp.width / 2, -this.blockLeftUp.height)));
        this.accLayer.addChild(this.blockLeftUp);


        this.lineRightDown = new cc.Sprite("#line_right down.png");
        this.lineRightDown.setPosition(cc.pAdd(cc.visibleRect.bottomRight, cc.p(this.lineRightDown.width / 2, this.lineRightDown.height / 2 * 3)));
        this.addChild(this.lineRightDown);
        this.blockRightDown = new cc.Sprite("#block_right_down.png");
        this.blockRightDown.setPosition(cc.pAdd(cc.visibleRect.bottomRight, cc.p(this.blockRightDown.width / 2, this.blockRightDown.height / 2 * 3)));
        this.accLayer.addChild(this.blockRightDown);

        this.lineLeftDown = new cc.Sprite("#line_left down.png");
        this.lineLeftDown.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(-this.lineLeftDown.width / 2, -this.lineLeftDown.height / 2)));
        this.addChild(this.lineLeftDown);
        this.blockLeftDown = new cc.Sprite("#block_left_down.png");
        this.blockLeftDown.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(-this.blockLeftDown.width / 2, -this.blockLeftDown.height / 2)));
        this.accLayer.addChild(this.blockLeftDown);

        this.lineRightUp = new cc.Sprite("#line_right up.png");
        this.lineRightUp.setPosition(cc.pAdd(cc.visibleRect.topRight, cc.p(this.lineRightUp.width / 2, this.lineRightUp.height / 2)));
        this.addChild(this.lineRightUp);
        this.blockRightUp = new cc.Sprite("#block_right_up.png");
        this.blockRightUp.setPosition(cc.pAdd(cc.visibleRect.topRight, cc.p(this.blockRightUp.width / 2, this.blockRightUp.height / 2)));
        this.accLayer.addChild(this.blockRightUp);


//        this.cars = new cc.Sprite(res.page3_cars);
//        this.cars.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, 0)));
//        this.cars.setScale(0);
//        this.addChild(this.cars);


        this.key1 = new cc.Sprite(res.page5_key1);
        this.key1.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(0, -this.key1.height * 2)));
        this.key1.setScale(1);
        this.key1.setLocalZOrder(2);
        this.key1.setRotation(1);
        this.addChild(this.key1);

        this.key2 = new cc.Sprite(res.page5_key2);
        this.key2.setPosition(cc.pAdd(cc.visibleRect.bottomRight, cc.p(0, -this.key1.height * 2)));
        this.key2.setScale(1);
        this.key2.setLocalZOrder(3);
        this.key1.setRotation(1);
        this.addChild(this.key2);


        this.title1 = new cc.LabelTTF("没玩过N辆车，", "微软雅黑", GC.h * 0.043);
        this.title1.scale = 0;
        this.title1.setPosition(GC.w_2, GC.h * 0.9);
        this.title1.setColor(new cc.Color(255, 255, 0));
        this.title1.setLocalZOrder(3);
        this.addChild(this.title1);


        this.title2 = new cc.LabelTTF("哪知道谁是真爱！", "微软雅黑", GC.h * 0.050);
        this.title2.scale = 0;
        this.title2.setPosition(GC.w_2, GC.h * 0.80);
        this.title2.setColor(new cc.Color(255, 255, 0));
        this.title2.enableStroke(cc.color(255, 0, 0), 1);
        this.title2.setLocalZOrder(10);
        this.addChild(this.title2);

        /*
         // Create the scrollview
         var scrollView = new ccui.ScrollView();
         scrollView.setTouchEnabled(true);
         scrollView.setBounceEnabled(true);
         scrollView.setBackGroundColor(cc.color.GREEN);
         scrollView.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
         scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
         scrollView.setInnerContainerSize(cc.size(780, 920));
         scrollView.setContentSize(cc.size(500, 700));
         var scrollViewSize = scrollView.getContentSize();

         scrollView.x = 10;
         scrollView.y = 10;
         scrollView.scrollToPercentBothDirection(cc.p(50, 50), 1, true);

         scrollView.addChild(this.title1.clone);
         scrollView.addChild(this.title2.clone);

         this.addChild(scrollView);
         */

    },
    accelEvent: function (acc, event) {
        if (this.visible) {
            movArea(acc, this.accLayer);
        }
    },
    appear: function () {

        var logoAction = cc.sequence(

            cc.spawn(
                cc.moveTo(1.2, cc.visibleRect.center),
                cc.rotateBy(1.2, 360).repeatForever()
            ),
//            cc.scaleTo(0.5, 2),
            cc.delayTime(0.8),
            cc.callFunc(function () {
                var self = this;
                this.key2.bigAction = cc.sequence(
                    cc.spawn(
                        cc.moveTo(1, cc.pAdd(cc.visibleRect.center, cc.p(0, -100))),
                        cc.rotateBy(1, 358)
                    ),
                    cc.delayTime(0.5),
                    cc.callFunc(function () {
                        self.title1.bigAction = cc.scaleTo(0.5, 1);
                        self.title1.runAction(self.title1.bigAction);

                        self.title2.bigAction = cc.sequence(cc.delayTime(1.2), cc.scaleTo(0.5, 1));
                        self.title2.runAction(self.title2.bigAction);

                        self.blockLeftUp.leftUpAction = cc.moveTo(0.3, cc.p(self.blockLeftUp.x + self.blockLeftUp.width + 20, self.blockLeftUp.y + self.blockLeftUp.height / 2 - 20));
                        self.blockLeftUp.runAction(self.blockLeftUp.leftUpAction);
                        self.lineLeftUp.leftUpAction = cc.moveTo(0.3, cc.p(self.lineLeftUp.x + self.lineLeftUp.width, self.lineLeftUp.y + self.lineLeftUp.height / 2));
                        self.lineLeftUp.runAction(self.lineLeftUp.leftUpAction);

                        self.blockRightDown.rightDownAction = cc.moveTo(0.3, cc.p(self.blockRightDown.x - self.blockRightDown.width - 20, self.blockRightDown.y - self.blockRightDown.height - 20));
                        self.blockRightDown.runAction(self.blockRightDown.rightDownAction);
                        self.lineRightDown.rightDownAction = cc.moveTo(0.3, cc.p(self.lineRightDown.x - self.lineRightDown.width, self.lineRightDown.y - self.lineRightDown.height));
                        self.lineRightDown.runAction(self.lineRightDown.rightDownAction);

                        self.lineLeftDown.leftDownAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.p(self.lineLeftDown.x + self.lineLeftDown.width + 20, self.lineLeftDown.y + self.lineLeftDown.height + 20)));
                        self.lineLeftDown.runAction(self.lineLeftDown.leftDownAction);
                        self.blockLeftDown.leftDownAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.p(self.blockLeftDown.x + self.blockLeftDown.width, self.blockLeftDown.y + self.blockLeftDown.height)));
                        self.blockLeftDown.runAction(self.blockLeftDown.leftDownAction);

                        self.blockRightUp.rightUpAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.p(self.blockRightUp.x - self.blockRightUp.width - 20, self.blockRightUp.y - self.blockRightUp.height - 20)));
                        self.blockRightUp.runAction(self.blockRightUp.rightUpAction);
                        self.lineRightUp.rightUpAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.p(self.lineRightUp.x - self.lineRightUp.width, self.lineRightUp.y - self.lineRightUp.height)));
                        self.lineRightUp.runAction(self.lineRightUp.rightUpAction);
                    })
                );
                this.key2.runAction(this.key2.bigAction);
            }, this),
            cc.delayTime(0.8),
            cc.callFunc(function () {

                canChangePage = true;
            }, this));

        this.key1.runAction(logoAction);
    },
    disappear: function (callback, target) {

        var logoAction = cc.sequence(
            cc.scaleTo(0.5, 0),
            cc.callFunc(function () {

//            this.cars.bigAction = cc.sequence(cc.delayTime(0.3), cc.scaleTo(0.8, 0));
//            this.cars.runAction(this.cars.bigAction);

                this.key2.bigAction = cc.scaleTo(0.5, 0);
                this.key2.runAction(this.key2.bigAction);

                this.title1.bigAction = cc.sequence(cc.delayTime(0.8), cc.scaleTo(0.5, 0));
                this.title1.runAction(this.title1.bigAction);

                this.title2.bigAction = cc.sequence(cc.delayTime(0.5), cc.scaleTo(0.5, 0));
                this.title2.runAction(this.title2.bigAction);

                this.blockLeftUp.runAction(this.blockLeftUp.leftUpAction.reverse());
                this.lineLeftUp.runAction(this.lineLeftUp.leftUpAction.reverse());

                this.blockRightDown.runAction(this.blockRightDown.rightDownAction.reverse());
                this.lineRightDown.runAction(this.lineRightDown.rightDownAction.reverse());

                this.lineLeftDown.runAction(this.lineLeftDown.leftDownAction.reverse());
                this.blockLeftDown.runAction(this.blockLeftDown.leftDownAction.reverse());

                this.blockRightUp.runAction(this.blockRightUp.rightUpAction.reverse());
                this.lineRightUp.runAction(this.lineRightUp.rightUpAction.reverse());
            }, this), cc.delayTime(1), cc.callFunc(function () {

                this.key1.setScale(1);
                this.key1.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(0, -this.key1.height * 2)));

                this.key2.setScale(1);
                this.key2.setPosition(cc.pAdd(cc.visibleRect.bottomRight, cc.p(0, -this.key1.height * 2)));

                if (target && callback) {
                    callback.call(target);
                }
            }, this));
        this.key1.runAction(logoAction);
    }
});