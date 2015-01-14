/**
 * Created by lingjianfeng on 14-8-31.
 */

var GPBackgroundLayer = cc.Layer.extend({

    _sptBg: null,
    ElmentArrX: null,
    ElmentArrY: null,

    ctor: function () {

        this._super();

        this.initBackground();

        this.ElmentArrX = [GC.w_2 - 200, GC.w_2, GC.w_2 + 200];
        this.ElmentArrY = [GC.h_2 - 250, GC.h_2, GC.h_2 + 250];

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var dishu = new cc.Sprite(res.dong_png);
                dishu.x = this.ElmentArrX[i];
                dishu.y = this.ElmentArrY[j];
                this.addChild(dishu);
            }
        }
    },

    initBackground: function () {
        this._sptBg = new cc.Sprite(res.gp_bg);
        this._sptBg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    }
});
