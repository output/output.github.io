/**
 * Created by lingjianfeng on 14-8-31.
 */

var HomeBackgroundLayer = cc.Layer.extend({

    _sptBg: null,
    _sptLogo: null,
    _ship: null,
    ctor: function () {

        this._super()

//        this.initBackground();
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

    initLogo: function () {
        this._sptLogo = new cc.Sprite(res.title);
        this._sptLogo.attr({
            x: GC.w_2,
            y: GC.h * 0.55 + this._sptLogo.getContentSize().height
        });
        this.addChild(this._sptLogo, 1);
    }

});