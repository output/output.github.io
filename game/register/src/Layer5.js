var Layer5 = cc.Layer.extend({
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.fifPage_plist);
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

        this.leftUp = new cc.Sprite("#left_up.png");
        this.leftUp.setPosition(cc.pAdd(cc.visibleRect.topLeft, cc.p(-this.leftUp.width / 2, -this.leftUp.height * 3 / 2)));
        this.accLayer.addChild(this.leftUp);
        this.leftDown = new cc.Sprite("#left_down.png");
        this.leftDown.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(-this.leftDown.width / 2, -this.leftDown.height / 2)));
        this.accLayer.addChild(this.leftDown);
        this.rightUp = new cc.Sprite("#right_up.png");
        this.rightUp.setPosition(cc.pAdd(cc.visibleRect.topRight, cc.p(this.rightUp.width / 2, this.rightUp.height / 2)));
        this.accLayer.addChild(this.rightUp);
        this.rightDown = new cc.Sprite("#right_down.png");
        this.rightDown.setPosition(cc.pAdd(cc.visibleRect.bottomRight, cc.p(this.rightDown.width / 2, this.rightDown.height * 3 / 2)));
        this.accLayer.addChild(this.rightDown);

        this.code = new cc.Sprite("#code.png");
        this.code.setPosition(cc.pAdd(cc.visibleRect.top, cc.p(0, this.code.height / 2)));
        this.addChild(this.code);

        this.text = new cc.Sprite("#focus.png");
        this.text.setPosition(cc.pAdd(cc.visibleRect.left, cc.p(-this.text.width / 2, -20)));
        this.addChild(this.text);

        this.shareText = new cc.Sprite("#share.png");
        this.shareText.setPosition(cc.pAdd(cc.visibleRect.bottomLeft, cc.p(this.shareText.width / 2 + 30, -this.shareText.height / 2)));
        this.addChild(this.shareText);

    },
    appear: function () {
        this.leftUp.moveAction = cc.moveTo(0.2, cc.p(this.leftUp.x + this.leftUp.width, this.leftUp.y + this.leftUp.height / 2));
        this.leftUp.runAction(this.leftUp.moveAction);
        this.rightDown.moveAction = cc.moveTo(0.2, cc.p(this.rightDown.x - this.rightDown.width, this.rightDown.y - this.rightDown.height));
        this.rightDown.runAction(this.rightDown.moveAction);

        this.leftDown.moveAction = cc.sequence(cc.delayTime(0.2), cc.moveTo(0.2, cc.p(this.leftDown.x + this.leftDown.width, this.leftDown.y + this.leftDown.height + 30)));
        this.leftDown.runAction(this.leftDown.moveAction);
        this.rightUp.moveAction = cc.sequence(cc.delayTime(0.2), cc.moveTo(0.2, cc.p(this.rightUp.x - this.rightUp.width, this.rightUp.y - this.rightUp.height)));
        this.rightUp.runAction(this.rightUp.moveAction);

        this.code.moveAction = cc.sequence(cc.delayTime(0.5), cc.moveTo(0.2, cc.p(this.code.x, this.code.y - this.code.height - 80)));
        this.code.runAction(this.code.moveAction);

        this.shareText.moveAction = cc.sequence(cc.delayTime(0.5), cc.moveTo(0.2, cc.p(this.shareText.x + 40, this.shareText.y + this.shareText.height + 20)));
        this.shareText.runAction(this.shareText.moveAction);

        this.text.moveAction = cc.sequence(cc.delayTime(0.7), cc.moveTo(0.2, cc.p(cc.visibleRect.center.x + 20, this.text.y)).easing(cc.easeIn(0.8)), cc.moveTo(0.05, cc.p(cc.visibleRect.center.x, this.text.y)).easing(cc.easeIn(0.8)), cc.delayTime(0.25), cc.callFunc(function () {
            canChangePage = true;
        }, this));
        this.text.runAction(this.text.moveAction);

    },
    disappear: function (callback, target) {
        var action = cc.sequence(cc.moveTo(0.2, cc.p(cc.visibleRect.left.x - this.text.width / 2, this.text.y)).easing(cc.easeOut(0.8)), cc.delayTime(0.3), cc.callFunc(function () {
            this.leftUp.runAction(this.leftUp.moveAction.reverse());
            this.rightDown.runAction(this.rightDown.moveAction.reverse());
            this.leftDown.runAction(this.leftDown.moveAction.reverse());
            this.rightUp.runAction(this.rightUp.moveAction.reverse());
            this.code.runAction(this.code.moveAction.reverse());
            this.shareText.runAction(this.shareText.moveAction.reverse());
        }, this), cc.delayTime(0.3), cc.callFunc(function () {
            if (target && callback) {
                callback.call(target);
            }
        }, this));
        this.text.runAction(action);
    },
    accelEvent: function (acc, event) {
        if (this.visible) {
            movArea(acc, this.accLayer);
        }
    },
});