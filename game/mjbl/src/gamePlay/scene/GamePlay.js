/**
 * Created by lingjianfeng on 14-8-31.
 */

var GamePlayLayer = cc.Layer.extend({

    _backgroundLayer: null,
    _touchLayer: null,
    ctor: function () {
        this._super();

        this.addBackgroundLayer();

        this.addTouchLayer();
    },
    addBackgroundLayer: function () {
        this._backgroundLayer = new GPBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    addTouchLayer: function () {
        this._touchLayer = new GPTouchLayer();
        this.addChild(this._touchLayer);
    }
});

var GamePlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new GamePlayLayer();
        this.addChild(layer);

        var menu = new MMMainMenuLayer();
        this.addChild(menu, 1);
    }
});