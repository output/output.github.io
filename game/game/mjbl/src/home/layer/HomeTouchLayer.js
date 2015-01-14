/**
 * Created by lingjianfeng on 14-8-31.
 */

var HomeTouchLayer = cc.Layer.extend({

    listener: null,

    isSelected: false,

    ctor: function () {

        this._super();

        this.playMusic();

//        this.initMenu();

        this.initBackground();

        this.addTouch();
    },
    playMusic: function () {

//        播放背景音乐，true代表循环无限次播放，false表示只播放一次。
        if (GC.SOUND_ON) {
            if (cc.audioEngine.isMusicPlaying()) {
                return;
            }
            cc.audioEngine.playMusic(res.mm_bgMusic_mp3, true);
        }
    },
    initMenu: function () {

        var begin = new cc.Sprite(res.home_begin);
        var beginSelected = new cc.Sprite(res.home_begin_selected);
        var beginDisabled = new cc.Sprite(res.home_begin_disable);

        var begin_menu = new cc.MenuItemSprite(
            begin,
            beginSelected,
            beginDisabled,
            this.onNewGame,
            this
        );

        var menu3 = new cc.Menu(begin_menu);
        menu3.alignItemsVerticallyWithPadding(0);
        menu3.alignItemsInColumns(1);
        menu3.x = GC.w * 0.5;
        menu3.y = GC.h * 0.1;
        this.addChild(menu3, 3, 4);
    },
    initBackground: function () {

//        创建一个精灵作为背景，并且设置它的锚点为cc.p(0.5, 0.5)[锚点默认为0.5], 以及坐标定位在屏幕中间
        this._sptBg = new cc.Sprite(res.home_bg);
        this._sptBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    },
    onNewGame: function () {
        cc.audioEngine.stopMusic();

//        场景切换，并且指定切换效果，更多效果，参考引擎包samples/js-tests下的Transitions Test
//        cc.director.runScene(new cc.TransitionFade(1.2, new MainMenuScene()));
//        cc.director.runScene(new cc.TransitionSlideInB(1.2, new MainMenuScene()));
        cc.director.runScene(new MainMenuScene());
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

                var delta = touch.getLocation().y - this.startPosY;
                if (delta > 15) {

                    cc.director.runScene(new cc.TransitionSlideInB(1.2, new MainMenuScene()));

                } else if (delta < -15) {

//                    cc.director.runScene(new cc.TransitionSlideInB(1.2, new MainMenuScene()));
                }
            },
            onTouchCancelled: function (touch, event) {

            }
        });
        cc.eventManager.addListener(self.listener, self);
    }
});