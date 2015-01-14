var CangyingSprite = cc.Sprite.extend({

    touchListener: null,
    disappearAction: null,
    appearAction: null,
    index: null,//在数组中的索引
    type: null, // 类型
    comment: null, // 类型名称
    scoreValue: 0, // 分值

    onEnter: function () {

        this._super();

        this.disappearAction = this.createDisapperAction();
        this.disappearAction.retain();

        this.appearAction = this.createApperAction();
        this.appearAction.retain();

        this.addTouchEventListenser();

        this.runApperAction();
    },
    onExit: function () {

        this.disappearAction.release();
        this._super();
    },
    addTouchEventListenser: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    target.removeTouchEventListenser();
                    //响应精灵点中
//                    cc.log("pos.x=" + pos.x + ",pos.y=" + pos.y);

                    target.stopAllActions();

//                    cc.audioEngine.playEffect(res.gp_hit2, false);

                    var ac = target.disappearAction;
                    var seqAc = cc.Sequence.create(ac, cc.CallFunc.create(function () {
                        cc.log("消灭了！");
//                        target.getParent().addScore(this.scoreValue);
                        //TODO WKL 只算个数
                        target.getParent().addScore(1);
                        target.getParent().removeSushiByindex(target.index - 1);
                        target.removeFromParent();
                    }, target));

                    target.runAction(seqAc);

                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    },
    removeTouchEventListenser: function () {
        cc.eventManager.removeListener(this.touchListener);
    },
    createDisapperAction: function () {

        //TODO 增加TYPE 多种类型

        var frames = [];
        for (var i = 7; i <= 12; i++) {
            var str = "cy" + i + ".png";

            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        //TODO 全局变量控制地鼠出现时间
        var animation = new cc.Animation(frames, GC.DishuAnimSeconds);
        var action = new cc.Animate(animation);

        return action;
    },
    createApperAction: function () {

        //TODO 增加TYPE 多种类型

        var frames = [];
        for (var i = 0; i <= 6; i++) {
            var str = "cy" + i + ".png";

            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
        }

        //TODO 全局变量控制地鼠出现时间
        var animation = new cc.Animation(frames, GC.DishuAnimSeconds);
        var action = new cc.Animate(animation);

        return action;
    },
    runApperAction: function () {
        var ac = this.appearAction;
        var seqAc = cc.Sequence.create(ac, cc.CallFunc.create(function () {
            cc.log("哈哈，没打到！");

            this.getParent().removeSushiByindex(this.index - 1);
            this.removeFromParent();

        }, this));

        this.runAction(seqAc);
    }

});