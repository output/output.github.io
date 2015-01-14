var MainScene = cc.Scene.extend({
    listener: null,
    accelListener: null,
    currentIndex: 0,
    sceneList: [],

    togglemenu: null ,

    musicAction: null,

    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.firstPage_plist);
    },
    onEnter: function () {
        this._super();
        this.initUI();
        this.addTouch();
        this.initHideEvent();
        curScene = this;
        initMusic();

        this.musicAction = cc.rotateBy(1, 360).repeatForever();

        playMusic(true);
        this.addAccel();
    },
    initUI: function () {
//        var bg = new cc.Sprite(res.background_png);
        var bg = new cc.LayerColor(cc.color(0,0,0));
        bg.anchorX = 0;
        bg.anchorY = 0;
        bg.scaleX = cc.winSize.width / bg.width;
        bg.scaleY = cc.winSize.height / bg.height;
        this.addChild(bg, 0);

        this.arrow = new cc.Sprite("#arrow.png");
        this.arrow.setPosition(cc.pAdd(cc.visibleRect.bottom, cc.p(0, 50)));
        var posY = this.arrow.y;
        var arrowAction = cc.repeatForever(cc.sequence(cc.spawn(cc.moveTo(0.8, cc.p(this.arrow.x, posY + 30)).easing(cc.easeIn(0.5)), cc.fadeOut(1)), cc.delayTime(0.8), cc.callFunc(function () {
            this.arrow.y = this.arrow.y - 30;
            this.arrow.opacity = 255;
        }, this)));
        this.arrow.runAction(arrowAction);
        this.addChild(this.arrow, 1);

        this.menuItemToggle = new cc.MenuItemToggle(
            new cc.MenuItemImage("#music.png"),
            new cc.MenuItemImage("#music_sel.png"),
            this.toggleMusicCallback, this);
//        this.menuItemToggle.setPosition(
//            cc.pAdd(cc.visibleRect.left,
//                cc.p(-this.menuItemToggle.width / 2 + 30, 140)).x,
//                cc.visibleRect.top.y -this.menuItemToggle.height / 2 - 30);
        this.menuItemToggle.x = cc.visibleRect.left.x + 30;
        this.menuItemToggle.y = cc.visibleRect.top.y - 30;

        this.togglemenu = new cc.Menu(this.menuItemToggle);
        this.togglemenu.anchorX = 0;
        this.togglemenu.anchorY = 0;
        this.togglemenu.x = 0;
        this.togglemenu.y = 0;
        this.addChild(this.togglemenu, 1);

        this.animLayer = new cc.Layer();
        this.addChild(this.animLayer);
        this.sceneList.push(new Layer1());
        this.sceneList.push(new Layer2());
        this.sceneList.push(new Layer3());
        this.sceneList.push(new Layer4());
        this.sceneList.push(new Layer5());
        this.sceneList.push(new Layer6());
        for (var i = 0; i < this.sceneList.length; i++) {
            var scene = this.sceneList[i];
            scene.anchorX = 0;
            scene.anchorY = 0;
            scene.x = 0;
            scene.y = 0;
            if (this.currentIndex != i) {
                scene.setVisible(false);
            }
            this.animLayer.addChild(scene, this.sceneList.length - i);
        }

        cc.MenuItemFont.setFontSize(GC.h * 0.050);
        cc.MenuItemFont.setFontName("微软雅黑");
        var makeoneMenu = new cc.MenuItemFont("制作我的“换车”心愿",
            this.makeOneClick);
        var menuLabel = new cc.Menu(makeoneMenu);
        menuLabel.x = 0;
        menuLabel.y = 0;
        makeoneMenu.attr({
            x: GC.w_2 - makeoneMenu.width/2,
            y: 10,
            anchorX: 0,
            anchorY: 0
        });
        makeoneMenu.setColor(cc.color(255,170,30));
        this.addChild(menuLabel, 1, 2);


//        this.registerBtn = new cc.MenuItemImage("#button_normal.png", "#button_hover.png", this.makeOneClick, this);
//        this.registerBtn.setPosition(cc.pAdd(cc.visibleRect.bottom, cc.p(0, -this.registerBtn.height / 2)));
//        var menu = new cc.Menu(this.registerBtn);
//        menu.x = 0;
//        menu.y = 0;
//        this.addChild(menu);

    },
    initHideEvent: function () {
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
            playMusic(true);

//            this.togglemenu.rotateAction = cc.moveTo(0.5, cc.p(this.togglemenu.x + this.togglemenu.width, this.togglemenu.y - this.togglemenu.height + 80));
//            this.togglemenu.runAction(this.togglemenu.rotateAction);

//            var rotateAction =  cc.moveTo(cc.visibleRect.bottom+200) ;
//            this.togglemenu.runAction(rotateAction);

        });
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
            playMusic(false);

//            var rotateAction =  cc.moveTo(cc.visibleRect.top-200);
//            this.togglemenu.runAction(rotateAction);
        });

    },
    toggleMusicCallback: function (sender) {
        if (sender.getSelectedIndex() == 0) {
            playMusic(true);

            this.menuItemToggle.runAction(this.musicAction);

        } else {
            playMusic(false);

//            this.menuItemToggle.stopAction(this.musicAction);
        }
    },
    togleArrow: function (status) {
        if (status) {
            this.arrow.visible = true;
        }
        else {
            this.arrow.visible = false;
        }
    },
    addTouch: function () {
        var self = this;
        self.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            startPosY: 0,
            onTouchBegan: function (touch, event) {
                this.startPosY = touch.getLocation().y;
                return true;
            },
            onTouchMoved: function (touch, event) {

            },
            onTouchEnded: function (touch, event) {
                if (musicPlayStatus) {
                    playMusic(true);
                }
                if (canChangePage) {
                    var delta = touch.getLocation().y - this.startPosY;
                    if (delta > 15 && self.currentIndex < self.sceneList.length - 1) {
                        self.changePage(++self.currentIndex, true);
                    } else if (delta < -15 && self.currentIndex > 0) {
                        self.changePage(--self.currentIndex, false);
                    }
                }
            },
            onTouchCancelled: function (touch, event) {

            }
        });
        cc.eventManager.addListener(self.listener, self);
    },
    addAccel: function () {
        var self = this;
        cc.inputManager.setAccelerometerInterval(1 / 30);
        cc.inputManager.setAccelerometerEnabled(true);
        this.accelListener = {
            event: cc.EventListener.ACCELERATION,
            callback: function (acc, event) {
                for (var i = 0; i < self.sceneList.length; ++i) {
                    self.sceneList[i].accelEvent(acc, event);
                }
            }
        }
        cc.eventManager.addListener(this.accelListener, self);
    },
    changePage: function (index, next) {
        canChangePage = false;
        var scene = next ? this.sceneList[index - 1] : this.sceneList[index + 1];
        if (index == 4) { // 最后一页
            this.togleArrow(false);
        } else {
            this.togleArrow(true);
        }
        var nextPage = function () {
            scene.visible = false;
            this.sceneList[index].visible = true;
            this.sceneList[index].appear();
        };
        if (scene) {
            scene.disappear(nextPage, this);
        }
    },
    makeOneClick: function () {
        var item = getById("regPage");
        removeClass(item, "hide");
        removeClass(item, "animOut");
        addClass(item, "anim");
        var game = getById("Cocos2dGameContainer");
        addClass(game,"hide");
        setTimeout(function () {
            removeClass(item, "anim");
        }, 800);
    }
});