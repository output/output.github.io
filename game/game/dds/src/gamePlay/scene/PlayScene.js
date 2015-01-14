
// 定义一个层，继承自cc.Layer
var PlayLayer = cc.Layer.extend({

//    属性声明
    _backgroundLayer : null,
    _touchLayer      : null,
    ctor : function(){

//        调用父类ctor方法。结合下面HomeScene中的onEnter 可以得出：this._super() 调用父类当前方法。
        this._super();

        this.addBackgroundLayer();

        this.addTouchLayer();

    },

//    定义方法
    addBackgroundLayer : function(){

//        创建一个背景层，并且添加到当前层中
        this._backgroundLayer = new GPBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    addTouchLayer : function(){
        this._touchLayer = new GPTouchLayer();
        this.addChild(this._touchLayer);
    }
});


var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new PlayLayer();
        this.addChild(layer, 0);
    }
});
