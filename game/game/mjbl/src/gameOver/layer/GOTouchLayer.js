/**
 * Created by lingjianfeng on 14-8-31.
 */


var GOTouchLayer = cc.Layer.extend({

    shareSprite: null,

    ctor: function () {

        this._super();

        this.playMusic();

        this.initTouchAbout();

        this.initTip();

    },
    playMusic: function () {
        if (GC.SOUND_ON) {
            if(GC.isScuess){
                cc.audioEngine.playMusic(res.game_win_mp3, false);
            }else{
                cc.audioEngine.playMusic(res.game_fail_mp3, false);
            }
        }
    },
    initTouchAbout: function () {

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
        menu.y = 260;
        this.addChild(menu);

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

        var menu2 = new cc.Menu(share);
        menu2.x = GC.w_2 - 1;
        menu2.y = 120;
        this.addChild(menu2);


        this.shareSprite = cc.Sprite.create(res.shareMask);
        this.shareSprite.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.shareSprite.visible = false;
        this.shareSprite.ZORDER = 99;
        this.addChild(this.shareSprite , 50);
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (event, touch) {
                if (self.shareSprite.visible == true) {
                    self.shareSprite.setVisible(false);
                }
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);

    },
    onPlayAgain: function () {

        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
//        cc.director.runScene(new cc.TransitionSlideInB(1.2, new PlayScene()));
        cc.director.runScene(new PlayScene());
    },
    onShare: function () {

        this.shareSprite.setVisible(true);
    },
    goHome: function () {
        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
        cc.director.runScene(new HomeScene());
    },

    initTip: function () {

        if(GC.isScuess){

            var tip1 = new cc.LabelTTF("恭喜你在30秒内成功阻击加班"+ GC.SCORE +"次！", "微软雅黑", GC.h * 0.035);
            tip1.x = GC.w_2;
            tip1.y = GC.h * 0.9;
            tip1.color = cc.color(255, 255, 255);
            tip1.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            tip1.enableStroke(cc.color(255, 255, 255), 1);
            this.addChild(tip1);

            var tip2 = new cc.LabelTTF("《造梦者》三大导师为你送上免加班令牌，", "微软雅黑", GC.h * 0.032);
            tip2.x = GC.w_2;
            tip2.y = GC.h * 0.85;
            tip2.color = cc.color(255, 255, 255);
            tip2.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            tip2.enableStroke(cc.color(255, 255, 255), 1);
            this.addChild(tip2);

            var tip3 = new cc.LabelTTF("晒给老板同事！", "微软雅黑", GC.h * 0.034);
            tip3.x = GC.w_2;
            tip3.y = GC.h * 0.8;
            tip3.color = cc.color(255, 255, 255);
            tip3.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            tip3.enableStroke(cc.color(255, 255, 255), 1);
            this.addChild(tip3);

            var token = new cc.Sprite(res.go_token);
            token.x = GC.w_2;
            token.y = GC.h * 0.63;
            this.addChild(token);
            
            
            var tip4 = new cc.LabelTTF("每周五 21:00 北京卫视 准时造梦", "微软雅黑", GC.h * 0.03);
            tip4.x = GC.w_2;
            tip4.y = GC.h * 0.41;
            tip4.color = cc.color(255, 255, 255);
            tip4.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            tip4.enableStroke(cc.color(255, 255, 255), 1);
            this.addChild(tip4);

            //TODO WKL
            window.wxData.desc = "我在30秒内成功阻击加班"+ GC.SCORE +"次！";

        }else{

            var tip1 = new cc.LabelTTF("怎能甘心加班！", "微软雅黑", GC.h * 0.04);
            tip1.x = GC.w_2;
            tip1.y = GC.h * 0.76;
            tip1.color = cc.color(255, 255, 255);
            tip1.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            tip1.enableStroke(cc.color(255, 255, 255), 1);
            this.addChild(tip1);

            var tip2 = new cc.LabelTTF("再玩一次，你离免加班令牌只有一步之遥", "微软雅黑", GC.h * 0.031);
            tip2.x = GC.w_2;
            tip2.y = GC.h * 0.70;
            tip2.color = cc.color(255, 255, 255);
            tip2.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            tip2.enableStroke(cc.color(255, 255, 255), 1);
            this.addChild(tip2);
            
            var tip4 = new cc.LabelTTF("每周五 21:00 北京卫视 准时造梦", "微软雅黑", GC.h * 0.03);
            tip4.x = GC.w_2;
            tip4.y = GC.h * 0.41;
            tip4.color = cc.color(255, 255, 255);
            tip4.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            tip4.enableStroke(cc.color(255, 255, 255), 1);
            this.addChild(tip4);

        }
    }
});