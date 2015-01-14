/**
 * Created by lingjianfeng on 14-8-31.
 */

var HomeTouchLayer = cc.Layer.extend({

    isSelected: false,

    ctor: function () {

        this._super();

        this.playMusic();

        this.initMenu();

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
    onNewGame: function () {
        cc.audioEngine.stopMusic();

//        场景切换，并且指定切换效果，更多效果，参考引擎包samples/js-tests下的Transitions Test
//        cc.director.runScene(new cc.TransitionFade(1.2, new MainMenuScene()));
//        cc.director.runScene(new cc.TransitionSlideInB(1.2, new MainMenuScene()));
        cc.director.runScene(new MainMenuScene());
    }
});