
var Davis = cc.Node.extend({
    _rectsize: 80,
    _sprite: null,
    _state: 'stand',
    _queue_state: null,
    _speed: 0,
    _queue: [],
    _action_lock: 0,
    _hitbox: null,
    _type: 'char',
    _getbox: 0,
    _gravity: -400,
    _velocity_x: 240,
    _velocity_y: 60,
    _gotcha:null,
    _ball_x: 400,
    _attack_count: 0,
    _rundegrees: 0,
    _attackrange: null,
    _skillrange: [],
    _attackSprite: null,
    _ball: [],
    _attacklv: null,
    _standFrame: "0_6",
    _standFrames: ["0_0", "0_1", "0_2", "0_3"],
    _boxstandFrames: ["2_3"],
    _runFrames: ["0_3", "0_4", "0_5", "0_6", "0_7"],
    _srunFrames: ["2_0", "2_1", "2_2"],
    _defendFrames: ["0_9"],
    _dieFrames: ["0_9"],
    _jumpFrames: ["6_3"],
    _grabFrames: ["1_7"],
    _jumpattackFrames: ["1_5", "1_4"],
    _attackFrames: ["1_0", "1_1", "1_2"],
    _attack2Frames: ["1_3", "1_4", "1_5"],
    _srunattackFrames: ["3_0","3_1","3_2","3_3","3_4"],
    _boxrunFrames: ["2_3", "2_4", "2_5", "2_6"],
    _boxthrowFrames: ["2_7", "2_8"],
    _ballFrames: ["0_0", "0_1", "0_2", "0_3"],
    _ball1Frames: ["0_3"],
    _ballendFrames: ["1_0", "1_1", "1_2", "1_3"],
    _ballattackFrames: ["0_0", "0_1", "0_2", "0_3", "0_4", "0_5", "0_6", "0_7", "0_8", "0_9"],
    run_animation: null,
    boxrun_animation: null,
    boxthrow_animation: null,
    srun_animation: null,
    boxstand_animation: null,
    stand_animation: null,
    _gotattackFrames: ["5_4", "5_3"],
    attack_animation: null,
    defend_animation: null,
    grab_animation: null,
    die_animation: null,
    jump_animation: null,
    jumpattack_animation: null,
    srunattack_animation: null,
    gotattack_animation: null,
    ball_animation: null,
    ball1_animation: null,
    ballend_animation: null,
    ballattack_animation: null,
    init:function(){
        this._super();
        this.loadAnime();
        this.loadAnime2();
        this.loadSpecial();
        var randomx = - Math.floor((Math.random() * 800) + 1);
        var randomy = - Math.floor((Math.random() * 300) + 1);
        if (Math.abs(randomy) < 80) {
          randomy = -80;
        }
        var randompos = cc.p(randomx, randomy);
        this.setSprite(cc.pSub(this.getPosition(), randompos));
        this.scheduleUpdate();
        return true;
    },
    init_jump: function () {
        this._hitfloor = this.y;
        this._velocity_y = 240;
        this._velocity_x = 0;
    },
    loadSpecial: function() {
        var texture = cc.textureCache.addImage(anime.davis_ball);
        var col = 4;
        var row = 3;
        for (var x = 0; x < row; x++) {
            for (var y = 0; y < col; y++) {
                var error = 1 * x;
                var frame = new cc.SpriteFrame(texture, cc.rect(y * 81 + error, x * 46, 81, 46));
                cc.spriteFrameCache.addSpriteFrame(frame, 'davis_ball_' + x + '_' + y);
            }
        }
        var ballFrames = [];
        for (var i = 0; i < this._ballFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_ball_' + this._ballFrames[i]);
            ballFrames.push(frame);
        }
        var animation = cc.Animation.create(ballFrames, 0.2);
        this.ball_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        
        //ball end
        var ballendFrames = [];
        for (var i = 0; i < this._ballendFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_ball_' + this._ballendFrames[i]);
            ballendFrames.push(frame);
        }
        var animation = cc.Animation.create(ballendFrames, 0.1);
        this.ballend_animation = cc.Animate.create(animation);
        
        
    },
    loadAnime: function() {
        var texture = cc.textureCache.addImage(anime.davis);
        var col = 10;
        var row = 7;
        for (var x = 0; x < row; x++) {
            for (var y = 0; y < col; y++) {
                var frame = new cc.SpriteFrame(texture, cc.rect( y * this._rectsize, x * this._rectsize, this._rectsize, this._rectsize));
                cc.spriteFrameCache.addSpriteFrame(frame, 'davis_' + x + '_' + y);
            }
        }
        var texture = cc.textureCache.addImage(anime.davis1);
        var col = 10;
        var row = 7;
        for (var x = 0; x < row; x++) {
            for (var y = 0; y < col; y++) {
                var frame = new cc.SpriteFrame(texture, cc.rect( y * this._rectsize, x * this._rectsize, this._rectsize, this._rectsize));
                cc.spriteFrameCache.addSpriteFrame(frame, 'davis1_' + x + '_' + y);
            }
        }
        
        var runFrames = [];
        for (var i = 0; i < this._runFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._runFrames[i]);
            runFrames.push(frame);
        }
        
        var animation = cc.Animation.create(runFrames, 0.2);
        //animation.setDelayPerUnit(1.2 / 4);
		animation.setRestoreOriginalFrame(true);
        this.run_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // stand
        var standFrames = [];
        for (var i = 0; i < this._standFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._standFrames[i]);
            standFrames.push(frame);
        }
        var animation = cc.Animation.create(standFrames, 0.2);
        this.stand_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // box stand
        var boxstandFrames = [];
        for (var i = 0; i < this._boxstandFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._boxstandFrames[i]);
            boxstandFrames.push(frame);
        }
        var animation = cc.Animation.create(boxstandFrames, 10);
        this.boxstand_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // super run
        var srunFrames = [];
        for (var i = 0; i < this._srunFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._srunFrames[i]);
            srunFrames.push(frame);
        }
        var animation = cc.Animation.create(srunFrames, 0.2);
        this.srun_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // box run
        var boxrunFrames = [];
        for (var i = 0; i < this._boxrunFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._boxrunFrames[i]);
            boxrunFrames.push(frame);
        }
        var animation = cc.Animation.create(boxrunFrames, 0.2);
        this.boxrun_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // got attack
        var gotattackFrames = [];
        for (var i = 0; i < this._gotattackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis1_' + this._gotattackFrames[i]);
            gotattackFrames.push(frame);
        }
        var animation = cc.Animation.create(gotattackFrames, 0.2);
        this.gotattack_animation = cc.Animate.create(animation);
        // jump
        var jumpFrames = [];
        for (var i = 0; i < this._jumpFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._jumpFrames[i]);
            jumpFrames.push(frame);
        }
        var animation = cc.Animation.create(jumpFrames, 0.2);
        this.jump_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // jump attack
        var jumpattackFrames = [];
        for (var i = 0; i < this._jumpattackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._jumpattackFrames[i]);
            jumpattackFrames.push(frame);
        }
        var animation = cc.Animation.create(jumpattackFrames, 0.2);
        this.jumpattack_animation = cc.Animate.create(animation);
        
        // box throw
        var boxthrowFrames = [];
        for (var i = 0; i < this._boxthrowFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._boxthrowFrames[i]);
            boxthrowFrames.push(frame);
        }
        var animation = cc.Animation.create(boxthrowFrames, 0.2);
        this.boxthrow_animation = cc.Animate.create(animation);
        
        // simple attack
        var attackFrames = [];
        for (var i = 0; i < this._attackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._attackFrames[i]);
            attackFrames.push(frame);
        }
        var animation = cc.Animation.create(attackFrames, 0.1);
        this.attack_animation = cc.Animate.create(animation);
        
        // simple attack2
        var attack2Frames = [];
        for (var i = 0; i < this._attack2Frames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._attack2Frames[i]);
            attack2Frames.push(frame);
        }
        var animation = cc.Animation.create(attack2Frames, 0.1);
        this.attack2_animation = cc.Animate.create(animation);
        
        //  defend
        var defendFrames = [];
        for (var i = 0; i < this._defendFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._defendFrames[i]);
            defendFrames.push(frame);
        }
        var animation = cc.Animation.create(defendFrames, 0.6);
        this.defend_animation = cc.Animate.create(animation);
        
        
        // grab
        var grabFrames = [];
        for (var i = 0; i < this._grabFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_' + this._grabFrames[i]);
            grabFrames.push(frame);
        }
        var animation = cc.Animation.create(grabFrames, 5);
        this.grab_animation = cc.Animate.create(animation);
        
        // srun attack
        var srunattackFrames = [];
        for (var i = 0; i < this._srunattackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis1_' + this._srunattackFrames[i]);
            srunattackFrames.push(frame);
        }
        var animation = cc.Animation.create(srunattackFrames, 0.1);
        this.srunattack_animation = cc.Animate.create(animation);
    },
    loadAnime2:function() {
        var texture = cc.textureCache.addImage(anime.davis2);
        var col = 10;
        var row = 4;
        for (var x = 0; x < row; x++) {
            for (var y = 0; y < col; y++) {
                var frame = new cc.SpriteFrame(texture, cc.rect( y * this._rectsize, x * this._rectsize, this._rectsize, this._rectsize));
                cc.spriteFrameCache.addSpriteFrame(frame, 'davis2_' + x + '_' + y);
            }
        }
        // ballattack
        var ballattackFrames = [];
        for (var i = 0; i < this._ballattackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis2_' + this._ballattackFrames[i]);
            ballattackFrames.push(frame);
        }
        var animation = cc.Animation.create(ballattackFrames, 0.1);
        this.ballattack_animation = cc.Animate.create(animation);
        
        
    },
    skillend: function(target, tag) {
        if (tag == 'ball') {
            target.stopAllActions();
            target._die = 1;
            target.runAction(cc.Sequence.create(this.ballend_animation, cc.CallFunc.create(function() {
                target.removeChild(this._skillrange['ball' + target._index]);
                this.parent.removeChild(this._ball['ball' + target._index]);
                delete this._skillrange['ball' + target._index];
                delete this._ball['ball' + target._index];
            }, this)));
        }
    },
    update: function(dt){
        var ballcount = 0;
        for (var i in this._ball) {
            if (this._ball[i]._die) {
                continue;
            }
            var direction = this._ball[i].direction;
            this._ball[i].x += this._ball_x * dt * direction;
            if (ballcount % 2 == 0) {
                this._ball[i].y += dt * Math.random() * 30;
            }
            if (ballcount % 1 == 0) {
                this._ball[i].y -= dt * Math.random() * 30;
            }
            if (this._ball[i].x > 2000 || this._ball[i].x < -2000) {
                this._ball[i].removeChild(this._skillrange[i]);
                //this._ball[i].removeChildByTag('ball' + i);
                this.parent.removeChild(this._ball[i]);
                delete this._skillrange[i];
                delete this._ball[i];
            }
            ballcount++;
        }

        if (this._state == 'jump') {
            var direction = this._sprite._flippedX || -1;
            this._velocity_y = this._velocity_y + this._gravity * dt;
            //this.x += this._velocity_x * dt * direction;
            this.y += this._velocity_y * dt;
            if (this.y < this._hitfloor) {
                this.restoreAction();
            }
        }

        if (this._getbox) {
            this._hitbox.setPosition(cc.p(this.x,this.y + this._sprite.height / 2 + this._hitbox._sprite.height /2 - 18));        
        }
        
        if (this._state == 'attack' && !this._skillattack) {
            var direction = this._sprite._flippedX || -1;
            var p = cc.p (this._sprite.x + (0.2 * direction), this._sprite.y);
            this.setPosition(cc.pSub(this.getPosition(), p));
        }
        if (this._state == 'run') {
            var faint_char = this.parent.parent.parent._faint_char;
            for(var i in faint_char) {
                if (Math.abs(faint_char[i].x - this.x) < 20 && Math.abs(faint_char[i].y - this.y < 10)) {
                    this._gotcha = faint_char[i];
                    var gotcha_direction = this._gotcha._sprite._flippedX || -1;
                    var direction = this._sprite._flippedX || -1
                    if (gotcha_direction != direction) {
                        faint_char[i].gothang();
                        this._gotcha.x = this.x - (this._sprite.width / 2 -5) * direction;
                        this._gotcha.y = this.y;
                        this.grab();
                        delete faint_char[i];
                    }
                }
            }
        }
        if ((this._state == 'run' || this._state == 'srun' || this._state == 'jump') && this._speed > 0) {
            var x = Math.sin(this._rundegrees * 2 * Math.PI / 360) * this._speed * dt;
            var y = Math.cos(this._rundegrees * 2 * Math.PI / 360) * this._speed * dt;

            var p = cc.p(-y, x);

            if (this._rundegrees > 90 && this._rundegrees < 270) {
                this._sprite.setFlippedX(true);
            }
            if ((this._rundegrees > 270 && this._rundegrees <= 359) || (this._rundegrees >= 0 && this._rundegrees < 90)) {
                this._sprite.setFlippedX(false);
            }
            
            this.setPosition(cc.pSub(this.getPosition(), p));
            this.checkLocation();
        
        }
    },
	setSprite:function(pos){
		this._sprite = cc.Sprite.create('#davis_' + this._standFrame);
		this.addChild(this._sprite);
		this.setPosition(pos);
        this.stand();
	},
    gotattack:function(direction) {
        if (this._state == 'recover') {
          return ;
        }
        this._state = 'gotattack';
        this._attack_count++;
        if (direction == this._sprite._flippedX) {
            this._sprite.setFlippedX(!direction);
        }
      
        this._sprite.stopAllActions(); 
        var is_faint = 1;
        if (this._attack_count > 2 && is_faint) {
            // this._attack_count = 0;
            // this._state = 'faint';
            // var main = this.parent.parent.parent;
            // main._faint_char[this._id] = this;
            // this._sprite.runAction(cc.Sequence.create(this.faint_animation, cc.CallFunc.create(function() {delete main._faint_char[this._id];this.restoreAction();}, this)));
        }
        else {
            
            this._sprite.runAction(cc.Sequence.create(this.gotattack_animation, cc.CallFunc.create(function() {this.restoreAction();}, this)));
        }
    },
    move:function(degrees) {
        if (!this._attackrange && this._state != 'jump') {
            this._rundegrees = degrees;
        }
    },
    ballattack: function() {
        if (this.isActionLock()) {
            return ;
        }
        this._state = 'attack';
        this._skillattack = 'ball';
        this._sprite.stopAllActions();
        this._sprite.runAction(cc.Sequence.create(this.ballattack_animation, cc.CallFunc.create(function() {this.restoreAction();}, this)));
        
        
        var ballFrames = [];
        for (var i = 0; i < this._ballFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('davis_ball_' + this._ballFrames[i]);
            ballFrames.push(frame);
        }
        var animation = cc.Animation.create(ballFrames, 0.1);

        this.schedule(function() {
            var i = 0;

            while (this._ball['ball' + i]) {
                i++;
            }
            this._ball['ball' + i] = cc.Sprite.create('#davis_ball_0_0');
            this._ball['ball' + i].direction = !this._sprite._flippedX || -1;
            this._ball['ball' + i].setFlippedX(this._sprite._flippedX);
            this._ball['ball' + i].setPosition(cc.pSub(this.getPosition(), cc.p(this._sprite.x + 20, this._sprite.y)));
            this._ball['ball' + i]._index = i;
            
            var si = this._skillrange.length;

            this._skillrange['ball' + i] = cc.LayerColor.create(cc.color(0, 200, 200, 64), 1, 5);
            this._skillrange['ball' + i].tag = 'ball';
            
            if (!this._sprite._flippedX) {
                var p = cc.p(this.x - this._ball['ball' + i].width , this.y - this._ball['ball' + i].height / 2);
            }
            else {
                var p = cc.p(this.x - this._skillrange['ball' + i].width  , this.y - this._ball['ball' + i].height / 2);
            }
            this._skillrange['ball' + i].setPosition(cc.pSub(this._ball['ball' + i].getPosition(), p));
            this._ball['ball' + i].addChild(this._skillrange['ball' + i]);
            
            this._ball['ball' + i].runAction(cc.RepeatForever.create(cc.Animate.create(animation)), 0.2);
            this._ball['ball' + i].setLocalZOrder(100);
            this.parent.addChild(this._ball['ball' + i]);
        }, 0.4, 1, 0.5);
    
    
    },
    setAttackRect: function(action) {
        if (action == 'jumpattack') {
            this._attackrange = cc.LayerColor.create(cc.color(0, 200, 200, 64), 30, 5);
            if (!this._sprite._flippedX) {
                var p = cc.p(this.x, this.y);
            }
            else {
                var p = cc.p(this.x + this._attackrange.width, this.y);
            }
            this._attackrange.setPosition(cc.pSub(this.getPosition(), p));
            this.addChild(this._attackrange);
            this._sprite.runAction(cc.Sequence.create(this.jumpattack_animation, cc.CallFunc.create(function() {this.removeAttackRect();}, this)));
        }
        if (action == 'attack') {
            this._attackrange = cc.LayerColor.create(cc.color(0, 200, 200, 64), 30, 5);
            if (!this._sprite._flippedX) {
                var p = cc.p(this.x, this.y);
            }
            else {
                var p = cc.p(this.x + this._attackrange.width, this.y);
            }
            this._attackrange.setPosition(cc.pSub(this.getPosition(), p));
            this.addChild(this._attackrange);
            if (this._attack_count >= 3) {
                 this._attack_count = 0;
                 var animation = this.attack2_animation;
            } else {
                var animation = this.attack_animation;
            }
            this._attack_count++;
            this._sprite.runAction(cc.Sequence.create(animation, cc.CallFunc.create(function() {this.removeAttackRect();this.restoreAction();}, this)));
                 
        }
        if (action == 'srunattack') {
            this._attackrange = cc.LayerColor.create(cc.color(0, 200, 200, 64), 30, 5);
            if (!this._sprite._flippedX) {
                var p = cc.p(this.x, this.y);
            }
            else {
                var p = cc.p(this.x + this._attackrange.width, this.y);
            }
            this._attackrange.setPosition(cc.pSub(this.getPosition(), p));
            this.addChild(this._attackrange);
            this._attacklv = 3;
            this._sprite.runAction(cc.Sequence.create(this.srunattack_animation, cc.CallFunc.create(function() {this.removeAttackRect();this.removeAttackStar();this.restoreAction()}, this)));
        }
    },
    removeAttackRect:function() {
        if (this._attackrange) {
            this.removeChild(this._attackrange);
            this._attackrange = null;
            this._attacklv = null;
        }
    },
    grab:function() {
        this._state = 'grab';
        this._sprite.stopAllActions();
        this._sprite.runAction(cc.Sequence.create(this.grab_animation, cc.CallFunc.create(function() {this.restoreAction()}, this)));
    },
    defend:function() {
        if (this.isActionLock()) {
            return ;
        }
        this._state = 'defend';
        this._sprite.stopAllActions();
        this._sprite.runAction(cc.Sequence.create(this.defend_animation, cc.CallFunc.create(function() {this.restoreAction()}, this)));
    },
    attack:function() {
        if (this._state == 'grab') {
            this._state = 'grabthrow';
            this._gotcha.y = this.y + this._sprite.height /2;
            this._gotcha.x = this.x ;
            this._gotcha.gotthrow();
            this._gotcha = null;
            this._sprite.stopAllActions();
            this._sprite.setFlippedX(!this._sprite._flippedX);
            this._sprite.runAction(cc.Sequence.create(this.boxthrow_animation, cc.CallFunc.create(function() {this.restoreAction()}, this)));
            return;
        }
        if (this._attackrange) {
            return;
        }
        if (this._state == 'jump') {
            this._sprite.stopAllActions();
            this._sprite.runAction(this.jumpattack_animation);
            this.setAttackRect('jumpattack');
            return ;
        }
   
        if (this._getbox) {
            this._state = 'throwbox';
            this._hitbox._throwDirection = !this._sprite._flippedX;
            this._hitbox.throwAction();
            this._hitbox._hitfloor = this.y - this._sprite.height/2 + this._hitbox._sprite.height/2;
            this._getbox = 0;
            this._sprite.stopAllActions();
            this._sprite.runAction(cc.Sequence.create(this.boxthrow_animation, cc.CallFunc.create(function() {this.stand()}, this)));
        }
        else if (this.parent.parent.parent.is_hitWeapon(this)){
            this._getbox = 1;
            this.stand();
        }
        
        else if (this._state == 'srun') {
            this._sprite.stopAllActions();
            this._attacklv = 2;
            this.setAttackRect('srunattack');
        }
        else {
            if (this._skillattack == 'ball') {
                this._queue_state = 'ballattack';
            }
            else {
                this._sprite.stopAllActions();
                this.setAttackRect('attack');
                this._state = 'attack';
            }
        }
    },
    restoreAction:function() {
        this._skillattack = null;
        if (this._queue_state) {
            if (this._queue_state == 'run') {
                this._state = 'run';
                this.run();
            }
            if (this._queue_state == 'ballattack') {
                this._queue_state = '';
                this.ballattack();
            }
        }
        else {
            this._state = 'stand';
            this.stand();
        }
    },
    setAttackStar: function() {
        if (this._attackstar == null) {
            this._attackstar = cc.Sprite.create(res.s_hit);
        }
        this.parent.removeChild(this._attackstar);
        this.parent.addChild(this._attackstar);
        var direction = this._sprite._flippedX || -1;
        var p = cc.p(this.parent.x + this._attackrange.width * direction , this.parent.y);
        this._attackstar.setPosition(cc.pSub(this.getPosition(), p));
    },
    removeAttackStar: function() {
        this.parent.removeChild(this._attackstar);
    
    },
    getbox:function(){
        this._getbox = 1;
    },
    jump:function(degrees){
        if (this.isActionLock()) {
            return ;
        }
        this._sprite.stopAllActions();
        this._sprite.runAction(this.jump_animation);
        this.init_jump();
        if (this._state == 'srun') {
            this._speed = 300;
            this._velocity_y = 150;
        }
        this._degree = degrees;
        this._state = 'jump';
    },
    isActionLock: function() {
        if (this._state == 'grab' || this._getbox || this._state == 'jump' || this._attackrange) {
            return true;
        }
        return false;
    },
 	srun:function(degrees){
        if (this.isActionLock()) {
            return ;
        }
        this._speed = 300;
        this._sprite.stopAllActions();
        this._sprite.runAction(this.srun_animation);
        this._state = 'srun';
	},
	run:function(degrees){
        this._attack_count = 0;
        if (this._attackrange || this._state == 'attack' || this._state == 'grab') {
            return;
        }
        if (this._state == 'jump') {
          return ;
        }
        this._speed = 80;
        this._sprite.stopAllActions();        
        if (this._getbox) {
            this._sprite.runAction(this.boxrun_animation);
        }
        else {
            this._sprite.runAction(this.run_animation);
        }
        this._state = 'run';
	},
    stand:function() {
        this._rundegrees = 0;
        this._speed = 0;
        if (this._attackrange) {
            return;
        }
        if (this._state == 'jump') {
            return ;
        }
        this._sprite.stopAllActions(); 
        if (this._getbox) {
            this._sprite.runAction(this.boxstand_animation);
        }
        else {
            this._sprite.runAction(this.stand_animation);
        }
        this._state = 'stand'; 
    },
	idle:function(){
        if (this._queue_state == 'ballattack') {
            return;
        }
        this._queue_state = null;
        if (this._attackrange) {
            return;
        }
        if (this._state == 'run') {
            this._sprite.stopAllActions(); 
            if (this._getbox) {
                this._sprite.runAction(this.boxstand_animation);
            }
            else {
                this._sprite.runAction(this.stand_animation);
            }
            this._speed = 0;
            this._state = 'stand'; 
        }
	},
	checkLocation:function(){
        var main_scene = this.parent.parent.parent;
        if (this.x <= main_scene.bg_l_limit) {
            this.setPosition(cc.p(main_scene.bg_l_limit, this.y));
        }
        if (this.x >= main_scene.bg_r_limit) {
            this.setPosition(cc.p(main_scene.bg_r_limit, this.y));
        }
        if (this.y >= 350) {
            this.setPosition(cc.p(this.x, 350)); 
        }
	}
    
});

Davis.create = function(){
	var davis = new Davis();
	if (davis && davis.init(davis)){
		return davis;
	}
	return null;
};