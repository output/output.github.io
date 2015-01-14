/**
 * Created by lingjianfeng on 14-8-31.
 */


var GOTouchLayer = cc.Layer.extend({

    ctor : function(){

        this._super();

        this.playMusic();

        this.initTouchAbout();

    },
    playMusic : function(){
        if (GC.SOUND_ON){
            if (cc.audioEngine.isMusicPlaying()){
                return;
            }
            cc.audioEngine.playMusic(res.mm_bgMusic_mp3, true);
        }
    },
    initTouchAbout : function(){

        var playAgainNormal = new cc.Sprite(res.go_continue);
        var playAgainSelected = new cc.Sprite(res.go_continue_selected);
        var playAgainDisabled = new cc.Sprite(res.go_continue_disable);

        var playAgain = new cc.MenuItemSprite(
            playAgainNormal,
            playAgainSelected,
            playAgainDisabled,
            this.onPlayAgain,
            this
        );

        var menu = new cc.Menu(playAgain);
        menu.x = GC.w_2;
        menu.y = 450;
        this.addChild(menu);

        var gohomeNormal = new cc.Sprite(res.go_home);
        var gohomeSelected = new cc.Sprite(res.go_home_selected);
        var gohomeDisabled = new cc.Sprite(res.go_home_disable);

        var gohome = new cc.MenuItemSprite(
            gohomeNormal,
            gohomeSelected,
            gohomeDisabled,
            this.goHome,
            this
        );

        var menu3 = new cc.Menu(gohome);
        menu3.x = GC.w_2 - 2;
        menu3.y = 300;
        this.addChild(menu3);

        var shareNormal = new cc.Sprite(res.go_share);
        var shareSelected = new cc.Sprite(res.go_share_selected);
        var shareDisabled = new cc.Sprite(res.go_share_disable);

        var share = new cc.MenuItemSprite(
            shareNormal,
            shareSelected,
            shareDisabled,
            this.onShare,
            this
        );

        var menu2 = new cc.Menu( share);
        menu2.x = GC.w_2 - 1;
        menu2.y = 150;
        this.addChild(menu2);

    },
    onPlayAgain : function(){

        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
//        cc.director.runScene(new cc.TransitionSlideInB(1.2, new PlayScene()));
        cc.director.runScene( new PlayScene());
    },
    onShare : function(){
/*
        var layer =new  cc.Layer();

        var shareSprite = cc.Sprite.create(res.shareTip);
        shareSprite.setScale(0.8);
        layer.addChild(shareSprite);
        shareSprite.setPosition(cc.pAdd(cc.visibleRect.topRight, cc.p(-shareSprite.width / 4.5, -shareSprite.height / 4)));
        this.addChild(layer, 111);
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (event, touch) {
                if (layer.isVisible()) {
                    layer.visible = false;
                    layer.removeFromParent(true);
                }
                cc.eventManager.removeListener(listener);
                return true;
            }
        });
        cc.eventManager.addListener(listener, layer);
*/


        var layer = cc.LayerColor.create();
        layer.setColor(cc.color(0, 0, 0, 0.4));
        var shareSprite = cc.Sprite.create(res.shareMask);
        shareSprite.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        layer.addChild(shareSprite);
        this.addChild(layer, 111);
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (event, touch) {
                if (layer.isVisible()) {
                    layer.visible = false;
                    layer.removeFromParent(true);
                }
                cc.eventManager.removeListener(listener);
                return true;
            }
        });
        cc.eventManager.addListener(listener, layer);

    },
    goHome : function(){
        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
        cc.director.runScene( new HomeScene());
    }

});