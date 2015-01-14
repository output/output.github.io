/**
 * Created by lingjianfeng on 14-8-31.
 */

var GOBackgroundLayer = cc.Layer.extend({

    ctor: function () {

        this._super();

        this.initBackground();

//        this.initLogo();

//        this.initScore();

    },

    initBackground: function () {

        this._sptBg = new cc.Sprite(res.go_bg);
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    }
});
