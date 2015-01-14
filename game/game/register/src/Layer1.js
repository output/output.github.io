var Layer1 = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initUI();
    },
    onEnter: function () {
        this._super();
        this.appear();
    },
    initUI: function () {
        canChangePage = false;
        this.accLayer = new cc.Layer();
        this.accLayer.anchorX = 0;
        this.accLayer.anchorY = 0;
        this.accLayer.x = 0;
        this.accLayer.y = 0;
        this.addChild(this.accLayer);

        this.logo = new cc.Sprite("#logo.png");
        this.logo.scale = 0;
        this.logo.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, this.logo.height / 3 * 2)));
        this.addChild(this.logo);

        this.leftFont = new cc.Sprite("#font_left.png");
        this.leftFont.setPosition(cc.pAdd(cc.visibleRect.left, cc.p(-this.leftFont.width / 2, -this.leftFont.height / 2)));
        this.addChild(this.leftFont);

        this.rightFont = new cc.Sprite("#font_right.png");
        this.rightFont.setPosition(cc.pAdd(cc.visibleRect.right, cc.p(this.rightFont.width / 2, -this.rightFont.height / 2)));
        this.addChild(this.rightFont);

        this.leftUpPic = new cc.Sprite("#block_left up.png");
        this.leftUpPic.anchorX = 0, this.leftUpPic.anchorY = 1;
        this.leftUpPic.setPosition(cc.pAdd(cc.visibleRect.topLeft, cc.p(-this.leftUpPic.width, this.leftUpPic.height)));
        this.accLayer.addChild(this.leftUpPic);


        this.leftDownPic = new cc.Sprite("#block_left down.png");
        this.leftDownPic.anchorX = 0, this.leftDownPic.anchorY = 0;
        this.leftDownPic.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(-this.leftDownPic.width + 20, -this.leftDownPic.height)));
        this.accLayer.addChild(this.leftDownPic);

        this.rightUpPic = new cc.Sprite("#block_right up.png");
        this.rightUpPic.anchorX = 1, this.rightUpPic.anchorY = 1;
        this.rightUpPic.setPosition(cc.pAdd(cc.visibleRect.topRight, cc.p(this.rightUpPic.width, this.rightUpPic.height)));
        this.accLayer.addChild(this.rightUpPic);

        this.rightDownPic = new cc.Sprite("#block_right down.png");
        this.rightDownPic.anchorX = 1, this.rightDownPic.anchorY = 0;
        this.rightDownPic.setPosition(cc.pAdd(cc.visibleRect.bottomRight, cc.p(this.rightDownPic.width, -this.rightDownPic.height)));
        this.accLayer.addChild(this.rightDownPic);
    },
    accelEvent: function (acc, event) {
        if (this.visible) {
            movArea(acc, this.accLayer);
        }
    },
    appear: function () {
        var logoAction = cc.sequence(cc.scaleTo(0.5, 1), cc.callFunc(function () {
            this.leftUpPic.leftUpAction = cc.moveTo(0.5, cc.p(this.leftUpPic.x + this.leftUpPic.width, this.leftUpPic.y - this.leftUpPic.height + 80));
            this.leftUpPic.runAction(this.leftUpPic.leftUpAction);

            this.leftDownPic.leftDownAction = cc.moveTo(0.5, cc.p(this.leftDownPic.x + this.leftDownPic.width, this.leftDownPic.y + this.leftDownPic.height));
            this.leftDownPic.runAction(this.leftDownPic.leftDownAction);

            this.rightUpPic.rightUpAction = cc.moveTo(0.5, cc.p(this.rightUpPic.x - this.rightUpPic.width - 30, this.rightUpPic.y - this.rightUpPic.height - 30));
            this.rightUpPic.runAction(this.rightUpPic.rightUpAction);

            this.rightDownPic.rightDownAction = cc.moveTo(0.5, cc.p(this.rightDownPic.x - this.rightDownPic.width, this.rightDownPic.y + this.rightDownPic.height));
            this.rightDownPic.runAction(this.rightDownPic.rightDownAction);

            this.leftFont.fontLeftAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.5, cc.p(this.leftFont.x + this.leftFont.width, this.leftFont.y)));
            this.leftFont.runAction(this.leftFont.fontLeftAction);

            this.rightFont.fontRightAction = cc.sequence(cc.delayTime(0.4), cc.moveTo(0.4, cc.p(this.rightFont.x - this.rightFont.width, this.rightFont.y)));
            this.rightFont.runAction(this.rightFont.fontRightAction);

        }, this), cc.delayTime(1.3), cc.callFunc(function () {
            canChangePage = true;
        }, this));
        this.logo.runAction(logoAction);

    },
    disappear: function (callback, target) {

        var action = cc.sequence(cc.scaleTo(0.5, 0), cc.callFunc(function () {
            this.leftUpPic.runAction(this.leftUpPic.leftUpAction.reverse());
            this.leftDownPic.runAction(this.leftDownPic.leftDownAction.reverse());
            this.rightUpPic.runAction(this.rightUpPic.rightUpAction.reverse());
            this.rightDownPic.runAction(this.rightDownPic.rightDownAction.reverse());
            this.leftFont.runAction(this.leftFont.fontLeftAction.reverse());
            this.rightFont.runAction(this.rightFont.fontRightAction.reverse());
        }, this), cc.delayTime(0.9), cc.callFunc(function () {

            if (target && callback) {
                callback.call(target);
            }
        }, this));
        this.logo.runAction(action);
    }
});