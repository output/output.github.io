var Layer4 = cc.Layer.extend({
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


        this.meinv1 = new cc.Sprite(res.page4_meinv1);
//        this.meinv1.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(0, -this.meinv1.height * 2)));
        this.meinv1.setPosition(cc.visibleRect.center);
        this.meinv1.setScale(20);
        this.meinv1.setLocalZOrder(2);
        this.meinv1.setRotation(1);
        this.addChild(this.meinv1);

        this.meinv2 = new cc.Sprite(res.page4_meinv2);
        this.meinv2.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, -50)));
        this.meinv2.setScale(0);
        this.meinv2.setLocalZOrder(3);
        this.addChild(this.meinv2);

        this.meinv3 = new cc.Sprite(res.page4_meinv3);
        this.meinv3.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, -50)));
        this.meinv3.setScale(0);
        this.meinv3.setLocalZOrder(4);
        this.addChild(this.meinv3);


        this.title1 = new cc.LabelTTF("隔壁老王的车总是载着不同的妹子", "微软雅黑", GC.h * 0.043);
        this.title1.scale = 0;
        this.title1.setPosition(GC.w_2, GC.h * 0.9);
        this.title1.setColor(new cc.Color(255, 255, 0));
        this.title1.setLocalZOrder(3);
        this.addChild(this.title1);


        this.title2 = new cc.LabelTTF("又或只是图一时新鲜……", "微软雅黑", GC.h * 0.050);
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

//            cc.spawn(
//                cc.moveTo(1, cc.visibleRect.center),
//                cc.rotateBy(1, 360)
//            ),
            cc.scaleTo(0.5, 1),
            cc.delayTime(0.5),
            cc.callFunc(function () {

//                this.meinv1.bigAction = cc.sequence(cc.delayTime(0.3), cc.scaleTo(0.8, 2));
//                this.meinv1.runAction(this.meinv1.bigAction);

                this.title1.bigAction = cc.scaleTo(0.5, 1);
                this.title1.runAction(this.title1.bigAction);

                this.title2.bigAction = cc.sequence(cc.delayTime(0.5), cc.scaleTo(0.5, 1));
                this.title2.runAction(this.title2.bigAction);

                this.blockLeftUp.leftUpAction = cc.moveTo(0.3, cc.p(this.blockLeftUp.x + this.blockLeftUp.width + 20, this.blockLeftUp.y + this.blockLeftUp.height / 2 - 20));
                this.blockLeftUp.runAction(this.blockLeftUp.leftUpAction);
                this.lineLeftUp.leftUpAction = cc.moveTo(0.3, cc.p(this.lineLeftUp.x + this.lineLeftUp.width, this.lineLeftUp.y + this.lineLeftUp.height / 2));
                this.lineLeftUp.runAction(this.lineLeftUp.leftUpAction);

                this.blockRightDown.rightDownAction = cc.moveTo(0.3, cc.p(this.blockRightDown.x - this.blockRightDown.width - 20, this.blockRightDown.y - this.blockRightDown.height - 20));
                this.blockRightDown.runAction(this.blockRightDown.rightDownAction);
                this.lineRightDown.rightDownAction = cc.moveTo(0.3, cc.p(this.lineRightDown.x - this.lineRightDown.width, this.lineRightDown.y - this.lineRightDown.height));
                this.lineRightDown.runAction(this.lineRightDown.rightDownAction);

                this.lineLeftDown.leftDownAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.p(this.lineLeftDown.x + this.lineLeftDown.width + 20, this.lineLeftDown.y + this.lineLeftDown.height + 20)));
                this.lineLeftDown.runAction(this.lineLeftDown.leftDownAction);
                this.blockLeftDown.leftDownAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.p(this.blockLeftDown.x + this.blockLeftDown.width, this.blockLeftDown.y + this.blockLeftDown.height)));
                this.blockLeftDown.runAction(this.blockLeftDown.leftDownAction);

                this.blockRightUp.rightUpAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.p(this.blockRightUp.x - this.blockRightUp.width - 20, this.blockRightUp.y - this.blockRightUp.height - 20)));
                this.blockRightUp.runAction(this.blockRightUp.rightUpAction);
                this.lineRightUp.rightUpAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.3, cc.p(this.lineRightUp.x - this.lineRightUp.width, this.lineRightUp.y - this.lineRightUp.height)));
                this.lineRightUp.runAction(this.lineRightUp.rightUpAction);

            }, this),
            cc.delayTime(0.8),

            new cc.Repeat(
                cc.sequence(
                    cc.actionEase(cc.rotateBy(0.2, 10)),
                    cc.delayTime(0.2),
                    cc.actionEase(cc.rotateBy(0.2, -10))
                ),
                100
            ),
//            cc.actionEase(cc.rotateBy(0.2, 10)),

            cc.callFunc(function () {

                canChangePage = true;
            }, this));

        this.meinv1.runAction(logoAction);
    },
    disappear: function (callback, target) {

        var logoAction = cc.sequence(
            cc.scaleTo(0.5, 0),
//            cc.spawn(
//                cc.moveTo(1, cc.pAdd(cc.visibleRect.bottomLeft, cc.p(0, -this.meinv1.height * 2))),
//                cc.rotateBy(1, 360)
//            ),
            cc.callFunc(function () {

//            this.cars.bigAction = cc.sequence(cc.delayTime(0.3), cc.scaleTo(0.8, 0));
//            this.cars.runAction(this.cars.bigAction);

//            this.meinv1.bigAction = cc.scaleTo(0.5, 0);
//            this.meinv1.runAction(this.meinv1.bigAction);

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

                this.meinv1.runAction(cc.scaleTo(0.5, 20));
                this.meinv1.runAction(cc.rotateTo(0.2, 0));

                if (target && callback) {
                    callback.call(target);
                }
            }, this));
        this.meinv1.runAction(logoAction);
    }
});