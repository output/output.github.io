var Layer4 = cc.Layer.extend({
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.forthPage_plist);
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

        this.map = new cc.Sprite(res.map_png);
        this.accLayer.addChild(this.map);
        this.map.setPosition(cc.pAdd(cc.visibleRect.top, cc.p(0, this.map.height / 2)));

        this.greenDot = new cc.Sprite("#destination_1.png");
        this.map.addChild(this.greenDot);
        this.greenDot.setPosition(cc.p(145, 305));
        var anim = cc.repeatForever(cc.sequence(cc.animate(new cc.Animation([cc.spriteFrameCache.getSpriteFrame("destination_1.png"), cc.spriteFrameCache.getSpriteFrame("destination_2.png")], 0.3)), cc.delayTime(0.5)));
        this.greenDot.runAction(anim);

        this.timeAngle = new cc.Sprite("#light_2.png");
        this.time = new cc.Sprite("#time.png");
        this.time.setPosition(cc.p(this.time.width - 18, this.time.height / 2 - 23));
        this.timeAngle.addChild(this.time);
        this.timeAngle.setPosition(cc.p(this.greenDot.x + this.greenDot.width / 2 + this.timeAngle.width / 2 + 4, this.greenDot.y + 11));
        this.map.addChild(this.timeAngle);
        this.timeAngle.scale = 0;

        this.registerBtn = new cc.MenuItemImage("#button_normal.png", "#button_hover.png", this.registerClick, this);
        this.registerBtn.setPosition(cc.pAdd(cc.visibleRect.bottom, cc.p(0, -this.registerBtn.height / 2)));
        var menu = new cc.Menu(this.registerBtn);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);
    },
    registerClick: function () {
        var item = getById("regPage");
        removeClass(item, "hide");
        removeClass(item, "animOut");
        addClass(item, "anim");
        var game = getById("Cocos2dGameContainer");
        addClass(game,"hide");
        setTimeout(function () {
            removeClass(item, "anim");
        }, 800);
    },
    accelEvent: function (acc, event) {
        if (this.visible) {
            movArea(acc, this.accLayer);
        }
    },
    appear: function () {
        this.map.mapAction = cc.moveTo(0.5, cc.p(this.map.x, this.map.y - this.map.height)).easing(cc.easeIn(0.5));
        this.map.runAction(this.map.mapAction);

        this.registerBtn.inAction = cc.moveTo(0.5, cc.p(this.registerBtn.x, this.registerBtn.y + this.registerBtn.height / 2 + 160)).easing(cc.easeIn(0.5));
        this.registerBtn.runAction(this.registerBtn.inAction);

        this.timeAngle.inAction = cc.sequence(cc.delayTime(0.5), cc.scaleTo(0.3, 1), cc.delayTime(0.3), cc.callFunc(function () {
            canChangePage = true;
        }, this));
        this.timeAngle.runAction(this.timeAngle.inAction);

    },
    disappear: function (callback, target) {
        var timeAngleAction = cc.scaleTo(0.3, 0);
        this.timeAngle.runAction(timeAngleAction);
        var registerAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.5, cc.p(this.registerBtn.x, this.registerBtn.y - this.registerBtn.height / 2 - 160)).easing(cc.easeIn(0.5)));
        this.registerBtn.runAction(registerAction);
        var mapAction = cc.sequence(cc.delayTime(0.3), cc.moveTo(0.5, cc.p(this.map.x, this.map.y + this.map.height)).easing(cc.easeIn(0.5)), cc.delayTime(0.6), cc.callFunc(function () {
            if (target && callback) {
                callback.call(target);
            }
        }, this));
        this.map.runAction(mapAction);
    }
});