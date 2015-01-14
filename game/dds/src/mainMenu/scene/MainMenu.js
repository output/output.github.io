/**
 * Created by lingjianfeng on 14-8-31.
 */


// 定义一个层，继承自cc.Layer
var MainMenuLayer = cc.Layer.extend({

//    属性声明
    _backgroundLayer : null,
    _touchLayer      : null,
    ctor : function(){

//        调用父类ctor方法。结合下面MainMenuScene中的onEnter 可以得出：this._super() 调用父类当前方法。
        this._super();

        this.addBackgroundLayer();

        this.addTouchLayer();

    },

//    定义方法
    addBackgroundLayer : function(){

//        创建一个背景层，并且添加到当前层中
        this._backgroundLayer = new MMBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    addTouchLayer : function(){
        this._touchLayer = new MMTouchLayer();
        this.addChild(this._touchLayer);
    }
});

// 定义一个场景，继承自cc.Scene
var MainMenuScene  = cc.Scene.extend({
    onEnter:function () {

//        调用父类的onEnter()方法。
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});