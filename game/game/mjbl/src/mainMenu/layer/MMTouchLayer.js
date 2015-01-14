/**
 * Created by lingjianfeng on 14-8-31.
 */

var MMTouchLayer = cc.Layer.extend({

    isSelected: false,
    menu_begin: null,

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
/*
        var mm_hero1 = new cc.Sprite(res.mm_hero1);
        mm_hero1.x = GC.w_2 - 145;
        mm_hero1.y = GC.h - 250;
        this.addChild(mm_hero1);

        var mm_hero2 = new cc.Sprite(res.mm_hero2);
        mm_hero2.x = GC.w_2 + 145;
        mm_hero2.y = GC.h - 255;
        this.addChild(mm_hero2);

        var mm_hero3 = new cc.Sprite(res.mm_hero3);
        mm_hero3.x = GC.w_2 - 115;
        mm_hero3.y = GC.h - 710;
        this.addChild(mm_hero3);

        var mm_hero4 = new cc.Sprite(res.mm_hero4);
        mm_hero4.x = GC.w_2 + 145;
        mm_hero4.y = GC.h - 700;
        this.addChild(mm_hero4);

        var mm_hero1_title = new cc.Sprite(res.mm_hero1_title);
        mm_hero1_title.x = GC.w_2 - 165;
        mm_hero1_title.y = GC.h - 415;
        mm_hero1_title.setVisible(false);
        this.addChild(mm_hero1_title);

        var mm_hero2_title = new cc.Sprite(res.mm_hero2_title);
        mm_hero2_title.x = GC.w_2 + 165;
        mm_hero2_title.y = GC.h - 415;
        mm_hero2_title.setVisible(false);
        this.addChild(mm_hero2_title);

        var mm_hero3_title = new cc.Sprite(res.mm_hero3_title);
        mm_hero3_title.x = GC.w_2 - 165;
        mm_hero3_title.y = GC.h - 835;
        mm_hero3_title.setVisible(false);
        this.addChild(mm_hero3_title);

        var mm_hero4_title = new cc.Sprite(res.mm_hero4_title);
        mm_hero4_title.x = GC.w_2 + 165;
        mm_hero4_title.y = GC.h - 835;
        mm_hero4_title.setVisible(false);
        this.addChild(mm_hero4_title);


        var hero_listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
                if (target == mm_hero1) {

                    mm_hero1_title.setVisible(true);
                    mm_hero2_title.setVisible(false);
                    mm_hero3_title.setVisible(false);
                    mm_hero4_title.setVisible(false);
                    this.isSelected = true;
                    target.parent.menu_begin.setEnabled(true);
                    GC.HERO = 1;
                } else if (target == mm_hero2) {

                    mm_hero1_title.setVisible(false);
                    mm_hero2_title.setVisible(true);
                    mm_hero3_title.setVisible(false);
                    mm_hero4_title.setVisible(false);
                    this.isSelected = true;
                    target.parent.menu_begin.setEnabled(true);
                    GC.HERO = 2;
                } else if (target == mm_hero3) {

                    mm_hero1_title.setVisible(false);
                    mm_hero2_title.setVisible(false);
                    mm_hero3_title.setVisible(true);
                    mm_hero4_title.setVisible(false);
                    this.isSelected = true;
                    target.parent.menu_begin.setEnabled(true);
                    GC.HERO = 3;
                } else if (target == mm_hero4) {

                    mm_hero1_title.setVisible(false);
                    mm_hero2_title.setVisible(false);
                    mm_hero3_title.setVisible(false);
                    mm_hero4_title.setVisible(true);
                    this.isSelected = true;
                    target.parent.menu_begin.setEnabled(true);
                    GC.HERO = 4;
                }
            }
        });

        cc.eventManager.addListener(hero_listener, mm_hero1);
        cc.eventManager.addListener(hero_listener.clone(), mm_hero2);
        cc.eventManager.addListener(hero_listener.clone(), mm_hero3);
        cc.eventManager.addListener(hero_listener.clone(), mm_hero4);
*/

        var mm_begin = new cc.Sprite(res.mm_begin);
        var mm_beginSelected = new cc.Sprite(res.mm_begin_selected);
        var mm_beginDisabled = new cc.Sprite(res.mm_begin_disable);

        this.menu_begin = new cc.MenuItemSprite(
            mm_begin,
            mm_beginSelected,
            mm_beginDisabled,
            function () {
                this.onNewGame();
            }.bind(this)
        );

//        this.menu_begin.setEnabled(false);

        var menu3 = new cc.Menu(this.menu_begin);
        menu3.x = GC.w_2;
        menu3.y = 150;
        this.addChild(menu3);
/*
        var mm_begin_tip = new cc.Sprite(res.mm_begin_tip);
        mm_begin_tip.x = GC.w_2;
        mm_begin_tip.y = 50;
        this.addChild(mm_begin_tip);
*/
    },
    onNewGame: function () {
        cc.audioEngine.stopMusic();

//        cc.audioEngine.playEffect(res.mm_btnEffect, false);

//        场景切换，并且指定切换效果，更多效果，参考引擎包samples/js-tests下的Transitions Test
        cc.director.runScene(new PlayScene());
    }

});