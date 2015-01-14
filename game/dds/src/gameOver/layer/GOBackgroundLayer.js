/**
 * Created by lingjianfeng on 14-8-31.
 */

var GOBackgroundLayer = cc.Layer.extend({

    ctor : function(){

        this._super();

        this.initBackground();

//        this.initLogo();

        this.initScore();

    },

    initBackground : function(){

        this._sptBg = new cc.Sprite(res.go_bg);
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    },

    initScore : function(){

        var heroName, tip, shareTip;

        if(GC.HERO ==1){
            heroName = "马仁礼";
        }else if(GC.HERO ==2){
            heroName = "牛大胆";
        }if(GC.HERO ==3){
            heroName = "杨灯儿";
        }if(GC.HERO ==4){
            heroName = "乔月";
        }

        tip = "你帮老农民" + heroName +"除掉了" + GC.SCORE + "个害虫！ \n有了你的帮忙，今年庄稼肯定差不了！";
        shareTip = "我帮老农民" + heroName +"除掉了" + GC.SCORE + "个害虫！";

        window.wxData.desc = shareTip;

        var lbScore = new cc.LabelTTF(tip, "微软雅黑,黑体", GC.h * 0.031);
        lbScore.x = GC.w_2;
        lbScore.y = GC.h * 0.92;
        lbScore.color = cc.color(0, 0, 0);
        lbScore.textAlign = cc.TEXT_ALIGNMENT_CENTER;
        this.addChild(lbScore);
    }
});
