var Box = cc.Node.extend({
    _rectsize: 58,
    _sprite: null,
    _state: 'idle',
    _speed: 40,
    _gravity: -400,
    _type: 'weapon',
    _attackrange: null,
    _velocity_x: null,
    _velocity_y: null,
    _attacklv: null,
    _moveDistance: 20,
    _throwDirection: null,
    _moveFrame: ['0', '1', '2', '3', '4'],
    _initFrame: ['5'],
    _hitfloor: 0,
    move_animation: null,
    init:function(){
        this._super();
        this.loadAnime();
        var randomx = - Math.floor((Math.random() * 800) + 1);
        var randomy = - Math.floor((Math.random() * 300) + 1);
        if (Math.abs(randomy) < 80) {
          randomy = -80;
        }
        var randompos = cc.p(randomx, randomy);
        this.setSprite(cc.pSub(this.getPosition(), randompos));
        this.init_box();
        this.scheduleUpdate();
        return true;
    },
    loadAnime: function() {
        var texture = cc.textureCache.addImage(weapon.box);
        var col = 6;
        
        for (var x = 0; x < col; x++) {
            if (x != 0) {
              posx = this._rectsize * x + x + 0.5;
            }
            else {
              posx = 0 ;
            }
            var frame = new cc.SpriteFrame(texture, cc.rect(posx, 0,this._rectsize, this._rectsize -1));
            cc.spriteFrameCache.addSpriteFrame(frame, 'box_' + x);
        }
        
        var moveFrames = [];
        for (var i = 0; i < this._moveFrame.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('box_' + this._moveFrame[i]);
            moveFrames.push(frame);
        }
        var animation = cc.Animation.create(moveFrames, 0.2);
        this.move_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        //idle
        var initFrames = [];
        for (var i = 0; i < this._initFrame.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('box_' + this._initFrame[i]);
            initFrames.push(frame);
        }
        var animation = cc.Animation.create(initFrames, 0.2);
        this.idle_animation = cc.RepeatForever.create(cc.Animate.create(animation));

                
    },
    init_box: function () {
        this._velocity_y = 60;
        this._velocity_x = 240;
        this._hit_velocity_y = 100;
        this._hit_velocity_x = 180;
    },
    update: function(dt){
        if (this._state == 'throwing') {
            var direction = this._throwDirection || -1;
            this._velocity_y = this._velocity_y + this._gravity * dt;
            if (this.y < this._hitfloor) {
                this.x += 1.2 * direction;
                if (this.x - this._moveDistance < 0) {
                    this._state = 'idle';
                    this._sprite.stopAllActions();
                    this._sprite.runAction(this.idle_animation);
                    this.init_box();
                    this.removeAttackRect();
                }
            }
            else {
                this.x += this._velocity_x * dt * direction;
                this.y += this._velocity_y * dt;
                this._moveDistance = this.x + 30 * direction;
            }
        }
        if (this._state == 'gotattack') {
            var direction = this._throwDirection || -1;
            this._hit_velocity_y = this._hit_velocity_y + this._gravity * dt;
            if (this.y < this._hitfloor) {
                this.x += 1.2 * direction;
                if (this.x - this._moveDistance < 0) {
                    this._state = 'idle';
                    this._sprite.stopAllActions();
                    this._sprite.runAction(this.idle_animation);
                    this.init_box();
                }
            }
            else {
                this.x += this._hit_velocity_x * dt * direction;
                this.y += this._hit_velocity_y * dt;
                this._moveDistance = this.x + 30 * direction;
            }
        }
    },
    idle: function() {
        
        this._sprite.stopAllActions();
    },
    gotAttack: function() {
        if (this._state == 'idle') {
            this._sprite.stopAllActions();
            this._hitfloor = this.y;
            var direction = this._throwDirection || -1;
            this._moveDistance = this.x + 150 * direction;
            this._sprite.runAction(this.move_animation);
            this._state = 'gotattack';
        }
    },
    setAttackRect: function(action) {
        if (action == 'throw') {
            this._attackrange = cc.LayerColor.create(cc.color(0, 200, 200, 64), 30, 5);
            this._attacklv = 2;
            if (!this._sprite._flippedX) {
                var p = cc.p(this.x, this.y);
            }
            else {
                var p = cc.p(this.x + this._attackrange.width, this.y);
            }
            this._attackrange.setPosition(cc.pSub(this.getPosition(), p));
            this.addChild(this._attackrange);
        }
    },
    removeAttackRect:function() {
        if (this._attackrange) {
            this.removeChild(this._attackrange);
            this._attackrange = null;
            this._attacklv = null;
        }
    },
    throwAction: function() {
        this._sprite.stopAllActions();
        this.setAttackRect('throw');
        this._sprite.runAction(this.move_animation);
        this._state = 'throwing';
    },
	setSprite:function(pos){
		this._sprite = cc.Sprite.create('#box_' + this._initFrame);
		this.addChild(this._sprite);
		this.setPosition(pos);
	}
});

Box.create = function(){
	var box = new Box();
	if (box && box.init(box)){
		return box;
	}
	return null;
};