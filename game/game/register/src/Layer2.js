var Layer2 = cc.Layer.extend({
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


        this.fontLogo = new cc.Sprite("#font.png");
        this.fontLogo.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, 0)));
        this.fontLogo.setScale(0);
        this.addChild(this.fontLogo);

    },
    accelEvent: function (acc, event) {
        if (this.visible) {
            movArea(acc, this.accLayer);
        }
    },
    appear: function () {

        var logoAction = cc.sequence(cc.scaleTo(0.5, 0.8), cc.callFunc(function () {
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

        }, this), cc.delayTime(0.8), cc.callFunc(function () {

            canChangePage = true;
        }, this));
        this.fontLogo.runAction(logoAction);
    },
    disappear: function (callback, target) {

        var logoAction = cc.sequence(cc.scaleTo(0.5, 0), cc.callFunc(function () {
            this.blockLeftUp.runAction(this.blockLeftUp.leftUpAction.reverse());
            this.lineLeftUp.runAction(this.lineLeftUp.leftUpAction.reverse());

            this.blockRightDown.runAction(this.blockRightDown.rightDownAction.reverse());
            this.lineRightDown.runAction(this.lineRightDown.rightDownAction.reverse());

            this.lineLeftDown.runAction(this.lineLeftDown.leftDownAction.reverse());
            this.blockLeftDown.runAction(this.blockLeftDown.leftDownAction.reverse());

            this.blockRightUp.runAction(this.blockRightUp.rightUpAction.reverse());
            this.lineRightUp.runAction(this.lineRightUp.rightUpAction.reverse());
        }, this), cc.delayTime(0.8), cc.callFunc(function () {

            if (target && callback) {
                callback.call(target);
            }
        }, this));
        this.fontLogo.runAction(logoAction);
    }
});