/**
 * Created by lingjianfeng on 14-8-31.
 */


var ShipSprite = cc.Sprite.extend({

    _rect : null,
    _canBeAttack : true,
    _hurtColorLife:0,
    HP : 5,
    active : true,
    ctor : function(aTexture){
        this._super(aTexture);
        this._rect = cc.rect(0, 0, this.getContentSize().width, this.getContentSize().height);

//        事件穿透
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled : this.onTouchCancelled
        }, this);

        // set frame
        var frame0 = cc.spriteFrameCache.getSpriteFrame("ship01.png");
        var frame1 = cc.spriteFrameCache.getSpriteFrame("ship02.png");

        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);

        // ship animate
        var animation = new cc.Animation(animFrames, 0.1);
        var animate = cc.animate(animation);
        var action = animate.repeatForever();
        this.runAction(action);

        this.schedule(this.shoot, 1 / 6);

        this.initBornSprite();
        this.born();

    },
    isTouchInRect:function (touch) {
        var getPoint = touch.getLocation();
        var myRect = this.getRect();
        myRect.x += this.x;
        myRect.y += this.y;
        return cc.rectContainsPoint(myRect, getPoint);
    },
    getRect:function () {
        return cc.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
    },

    onTouchBegan : function (touch, event) {
        var target = event.getCurrentTarget();
        if (!target.isTouchInRect(touch)){
            return false;
        }

        return true;
    },
    onTouchMoved : function (touch, event) {
        var target = event.getCurrentTarget();
        target.setPosition(touch.getLocation());

    },
    onTouchEnded : function (touch, event) {
        var target = event.getCurrentTarget();

    },
    onTouchCancelled : function (touch, event) {
        var target = event.getCurrentTarget();

    },

    update:function (dt) {

        if (this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
    },

    destroy:function () {
        GC.LIFE--;

        var explosion = ExplosionSprite.getOrCreateExplosion();
        explosion.x = this.x;
        explosion.y = this.y;

        if (GC.SOUND_ON) {
            cc.audioEngine.playEffect(res.gp_shipDestroyEffect_mp3);
            cc.log("[TODO] : .... ShipSprite ");
        }
    },


    shoot : function(dt){

        var leftBullet = BulletSprite.getOrCreateBullet(GC.BULLET_SPEED.SHIP, "W1.png", GC.ENEMY_ATTACK_MODE.NORMAL, 3000, GC.UNIT_TAG.PLAYER_BULLET);
        leftBullet.x = this.x - 13;
        leftBullet.y = this.y + 3 + this.height * 0.3;

        var rightBullet = BulletSprite.getOrCreateBullet(GC.BULLET_SPEED.SHIP, "W1.png", GC.ENEMY_ATTACK_MODE.NORMAL, 3000, GC.UNIT_TAG.PLAYER_BULLET);
        rightBullet.x = this.x + 13;
        rightBullet.y = this.y + 3 + this.height * 0.3;

    },
    hurt:function () {

        cc.log("ship hurt...." + this._canBeAttack);
        if (this._canBeAttack) {
            this._hurtColorLife = 2;
            this.HP--;
        }
    },
    collideRect:function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h / 2);
    },
    initBornSprite:function () {
        this._bornSprite = new cc.Sprite("#ship03.png");
        this._bornSprite.setBlendFunc(cc.SRC_ALPHA, cc.ONE);

        this._bornSprite.x = this.width / 2;
        this._bornSprite.y = this.height / 2;
        this._bornSprite.visible = false;
        this.addChild(this._bornSprite, 3000, 99999);
    },
    born:function () {
        //revive effect
        this._canBeAttack = false;
        this._bornSprite.scale = 8;
        this._bornSprite.runAction(cc.scaleTo(0.5, 1, 1));
        this._bornSprite.visible = true;
        var blinks = cc.blink(3, 9);
        var makeBeAttack = cc.callFunc(function (t) {
            t._canBeAttack = true;
            t.visible = true;
            t._bornSprite.visible = false;
        }.bind(this));
        this.runAction(cc.sequence(cc.delayTime(0.5), blinks, makeBeAttack));

        this.HP = 5;
        this._hurtColorLife = 0;
        this.active = true;
    }

});