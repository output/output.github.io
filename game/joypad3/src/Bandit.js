var Bandit = cc.Node.extend({
    _bandit: [],
    _rectsize: 80,
    _sprite: null,
    _state: 'stand',
    _queue_state: null,
    _type: 'char',
    _speed: 0,
    _queue: [],
    _attackstar: null,
    _attacklv: null,
    _action_lock: 0,
    _hitbox: null,
    _getbox: 0,
    _moveDistance: 20,
    _gravity: -400,
    _attack_count: 0,
    _throw_velocity_x: 240,
    _throw_velocity_y: 60,
    _velocity_x: 240,
    _velocity_y: 60,
    _rundegrees: 0,
    _attackrange: null,
    _attackSprite: null,
    _standFrame: "0_6",
    _gotthrowFrames: ["3_2"],
    _gotattackFrames: ["5_4", "5_3"],
    _gotattackFrames2: ["3_0", "3_1", "3_2", "3_3", "3_4"],
    _gotattackFrames3: ["4_0", "4_1", "4_2", "4_3", "4_4"],
    _gothangFrames: ["6_1"],
    _faintFrames: ["5_2", "5_1", "5_0"],
    _standFrames: ["0_0", "0_1", "0_2", "0_3"],
    _boxstandFrames: ["2_3"],
    _runFrames: ["0_3", "0_4", "0_5", "0_6", "0_7"],
    _srunFrames: ["2_0", "2_1", "2_2"],
    _jumpFrames: ["1_4"],
    _jumpattackFrames: ["1_5", "1_4"],
    _attackFrames: ["1_0", "1_1", "0_0"],
    _srunattackFrames: ["3_7", "3_8", "3_9"],
    _boxrunFrames: ["2_3", "2_4", "2_5", "2_6"],
    _boxthrowFrames: ["2_7", "2_8"],
    run_animation: null,
    boxrun_animation: null,
    boxthrow_animation: null,
    srun_animation: null,
    boxstand_animation: null,
    stand_animation: null,
    attack_animation: null,
    jump_animation: null,
    jumpattack_animation: null,
    srunattack_animation: null,
    gotattack_animation: null,
    gotattack2_animation: null,
    gotattack3_animation: null,
    gotthrow_animation: null,
    faint_animation: null,
    gothang_animation: null,
    init:function(){
        this._super();
        this.loadAnime();
        var randomx = - Math.floor((Math.random() * 800) + 1);
        var randomy = - Math.floor((Math.random() * 300) + 1);
        if (Math.abs(randomy) < 80) {
          randomy = -80;
        }
        var randompos = cc.p(randomx, randomy);
        //var randompos = cc.p(300, 300);
        //this.setSprite(cc.pSub(this.getPosition(), randompos));
        this.setSprite(cc.p(300, 300));
        this.scheduleUpdate();
        return true;
    },
    init_throw: function() {
        this._hitfloor = 0;
        this._moveDistance = 20,
        this._throw_velocity_y = 60;
        this._throw_velocity_x = 240;
    },
    init_jump: function () {
        this._hitfloor = this.y;
        this._velocity_y = 240;
        this._velocity_x = 0;
    },
    loadAnime: function() {
        var texture = cc.textureCache.addImage(anime.bandit);
        var col = 10;
        var row = 7;
        for (var x = 0; x < row; x++) {
            for (var y = 0; y < col; y++) {
                var frame = new cc.SpriteFrame(texture, cc.rect( y * this._rectsize, x * this._rectsize, this._rectsize, this._rectsize));
                cc.spriteFrameCache.addSpriteFrame(frame, 'bandit_' + x + '_' + y);
            }
        }
        var texture = cc.textureCache.addImage(anime.bandit1);
        var col = 10;
        var row = 7;
        for (var x = 0; x < row; x++) {
            for (var y = 0; y < col; y++) {
                var frame = new cc.SpriteFrame(texture, cc.rect( y * this._rectsize, x * this._rectsize, this._rectsize, this._rectsize));
                cc.spriteFrameCache.addSpriteFrame(frame, 'bandit1_' + x + '_' + y);
            }
        }
        
        
        var runFrames = [];
        for (var i = 0; i < this._runFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._runFrames[i]);
            runFrames.push(frame);
        }
        
        var animation = cc.Animation.create(runFrames, 0.2);
        //animation.setDelayPerUnit(1.2 / 4);
		animation.setRestoreOriginalFrame(true);
        this.run_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // stand
        var standFrames = [];
        for (var i = 0; i < this._standFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._standFrames[i]);
            standFrames.push(frame);
        }
        var animation = cc.Animation.create(standFrames, 0.2);
        this.stand_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // box stand
        var boxstandFrames = [];
        for (var i = 0; i < this._boxstandFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._boxstandFrames[i]);
            boxstandFrames.push(frame);
        }
        var animation = cc.Animation.create(boxstandFrames, 10);
        this.boxstand_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // super run
        var srunFrames = [];
        for (var i = 0; i < this._srunFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._srunFrames[i]);
            srunFrames.push(frame);
        }
        var animation = cc.Animation.create(srunFrames, 0.2);
        this.srun_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // box run
        var boxrunFrames = [];
        for (var i = 0; i < this._boxrunFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._boxrunFrames[i]);
            boxrunFrames.push(frame);
        }
        var animation = cc.Animation.create(boxrunFrames, 0.2);
        this.boxrun_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        
        // jump
        var jumpFrames = [];
        for (var i = 0; i < this._jumpFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._jumpFrames[i]);
            jumpFrames.push(frame);
        }
        var animation = cc.Animation.create(jumpFrames, 0.2);
        this.jump_animation = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // jump attack
        var jumpattackFrames = [];
        for (var i = 0; i < this._jumpattackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._jumpattackFrames[i]);
            jumpattackFrames.push(frame);
        }
        var animation = cc.Animation.create(jumpattackFrames, 0.2);
        this.jumpattack_animation = cc.Animate.create(animation);
        
        // box throw
        var boxthrowFrames = [];
        for (var i = 0; i < this._boxthrowFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._boxthrowFrames[i]);
            boxthrowFrames.push(frame);
        }
        var animation = cc.Animation.create(boxthrowFrames, 0.2);
        this.boxthrow_animation = cc.Animate.create(animation);
        
        // simple attack
        var attackFrames = [];
        for (var i = 0; i < this._attackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._attackFrames[i]);
            attackFrames.push(frame);
        }
        var animation = cc.Animation.create(attackFrames, 0.2);
        this.attack_animation = cc.Animate.create(animation);
        // got throw
        var gotthrowFrames = [];
        for (var i = 0; i < this._gotthrowFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._gotthrowFrames[i]);
            gotthrowFrames.push(frame);
        }
        var animation = cc.Animation.create(gotthrowFrames, 0.2);
        this.gotthrow_animation = cc.Animate.create(animation);
        
        // got attack
        var gotattackFrames = [];
        for (var i = 0; i < this._gotattackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit1_' + this._gotattackFrames[i]);
            gotattackFrames.push(frame);
        }
        var animation = cc.Animation.create(gotattackFrames, 0.2);
        this.gotattack_animation = cc.Animate.create(animation);
         // got attack2
        var gotattackFrames2 = [];
        for (var i = 0; i < this._gotattackFrames2.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._gotattackFrames2[i]);
            gotattackFrames2.push(frame);
        }
        var animation = cc.Animation.create(gotattackFrames2, 0.2);
        this.gotattack2_animation = cc.Animate.create(animation);
         // got attack3
        var gotattackFrames3 = [];
        for (var i = 0; i < this._gotattackFrames3.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._gotattackFrames3[i]);
            gotattackFrames3.push(frame);
        }
        var animation = cc.Animation.create(gotattackFrames3, 0.2);
        this.gotattack3_animation = cc.Animate.create(animation);
        // faint attack
        var faintFrames = [];
        for (var i = 0; i < this._faintFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit1_' + this._faintFrames[i]);
            faintFrames.push(frame);
        }
        var animation = cc.Animation.create(faintFrames, 0.2);
        this.faint_animation = cc.Animate.create(animation);
        // got hang
        var gothangFrames = [];
        for (var i = 0; i < this._gothangFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit1_' + this._gothangFrames[i]);
            gothangFrames.push(frame);
        }
        var animation = cc.Animation.create(gothangFrames, 5);
        this.gothang_animation = cc.Animate.create(animation);
        
        
        // srun attack
        var srunattackFrames = [];
        for (var i = 0; i < this._srunattackFrames.length; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame('bandit_' + this._srunattackFrames[i]);
            srunattackFrames.push(frame);
        }
        var animation = cc.Animation.create(srunattackFrames, 0.2);
        this.srunattack_animation = cc.Animate.create(animation);
    },
    update: function(dt){
        // if (this._state == 'bounce') {
            // if (
            // this.x += 1.2 * direction;
            // if (this.x - this._moveDistance < 0) {
                // this.restoreAction();
                // this.init_throw();
            // }
        // }
        if (this._state == 'jump') {
            var direction = this._sprite._flippedX || -1;
            this._velocity_y = this._velocity_y + this._gravity * dt;
            this.x += this._velocity_x * dt * direction;
            this.y += this._velocity_y * dt;
            if (this.y < this._hitfloor) {
                this.restoreAction();
            }
        }

        if (this._getbox) {
            this._hitbox.setPosition(cc.p(this.x,this.y + this._sprite.height / 2 + this._hitbox._sprite.height /2 - 18));        
        }
        if ((this._state == 'run' || this._state == 'srun' || this._state == 'jump') && this._speed > 0) {
            var x = Math.sin(this._rundegrees * 2 * Math.PI / 360) * this._speed * dt;
            var y = Math.cos(this._rundegrees * 2 * Math.PI / 360) * this._speed * dt;

            var p = cc.p(-y, x);

            if (this._rundegrees > 90 && this._rundegrees < 270) {
                this._sprite._flippedX = true;
            }
            if ((this._rundegrees > 270 && this._rundegrees <= 359) || (this._rundegrees >= 0 && this._rundegrees < 90)) {
                this._sprite._flippedX = false;
            }
            
            this.setPosition(cc.pSub(this.getPosition(), p));
            this.checkLocation();
        
        }
    },
    setSprite:function(pos){
      this._sprite = cc.Sprite.create('#bandit_' + this._standFrame);
      this.addChild(this._sprite);
      this.setPosition(pos);
          this.stand();
    },
    restoreLife:function(y) {
        this._attack_count = 0;
        this._state = 'recover';
        if (y) {
            this.y += y;
        }
        this.removeAttackRect();
        this._sprite.runAction(this.stand_animation);
        var fadeIn = cc.fadeIn(0.1);
        var fadeOut = cc.fadeOut(0.1);
        var recover = cc.Repeat.create(cc.sequence(fadeOut, fadeIn), 6);
        this._sprite.runAction(cc.Sequence.create(recover,  cc.CallFunc.create(function() {this.stand();}, this)));
    },
    gotthrow:function() {
        var direction = this._sprite._flippedX || -1;
        direction *= -1;
        this._sprite.stopAllActions();
        this._sprite.runAction(this.gotthrow_animation);
        this.setAttackRect('throw');
        this.runAction(cc.Sequence.create(cc.jumpTo(0.5, cc.p(this.x + (200) * direction, this.y - this._sprite.height/2), 50, 1), cc.jumpTo(0.2, cc.p(this.x + (250) * direction, this.y - this._sprite.height/2 - 30), 20, 1), cc.DelayTime.create(0.5), cc.CallFunc.create(function() {this.restoreLife(30);}, this))
        );
    },
    faint:function(direction) {
        this._state = 'faint';
        if (direction == this._sprite._flippedX) {
            this._sprite.setFlippedX(!direction);
        }
        this._sprite.stopAllActions(); 
        this._sprite.runAction(cc.Sequence.create(this.faint_animation, cc.CallFunc.create(function() {this.restoreAction();}, this)));
    },
    gothang: function() {
        this._state = 'gothang';
        this._sprite.stopAllActions();
        this._sprite.runAction(cc.Sequence.create(this.gothang_animation, cc.CallFunc.create(function() {this.restoreAction();}, this)));
    },
    gotattack:function(direction, hit_lv) {
        if (this._state == 'recover' ) {
          return ;
        }
        this._state = 'gotattack';
        this._attack_count++;
        if (direction == this._sprite._flippedX) {
            this._sprite.setFlippedX(!direction);
        }
     
        var is_faint = 1;
        if (hit_lv == 2) {
            this.y -= 10;
            this._sprite.runAction(cc.Sequence.create(this.gotattack2_animation, cc.DelayTime.create(0.5), cc.CallFunc.create(function() {this.restoreLife(10);}, this)));
        }
        if (hit_lv == 3) {
            if (this._attack_count == 5) {
                this.stopAllActions();
                this._sprite.stopAllActions();
                var direction = this._sprite._flippedX || -1;
                this._sprite.runAction(this.gotattack3_animation);
                this.runAction(cc.Sequence.create(cc.DelayTime.create(0.2), cc.jumpTo(0.8, cc.p(this.x + (240) * direction, this._hitfloor), 50, 1), cc.DelayTime.create(0.9), cc.CallFunc.create(function() {this.restoreLife();this.parent.removeChild(this._attackstar);}, this)));
            }
            if (this._attack_count == 1) {
                this._hitfloor = this.y;
                this._sprite.stopAllActions();
                var direction = this._sprite._flippedX || -1;
                this.runAction(cc.Sequence.create(cc.DelayTime.create(0.2), cc.jumpTo(0.8, cc.p(this.x + (240) * direction, this.y), 50, 1), cc.DelayTime.create(0.9), cc.CallFunc.create(function() {this.restoreLife();this.removeChild(this._attackstar);}, this)));
                this._sprite.runAction(this.gotattack3_animation);
            }
        }
        else if (this._attack_count > 2 && is_faint) {
            this._attack_count = 0;
            this._state = 'faint';
            var main = this.parent.parent.parent;
            main._faint_char[this._id] = this;
            this._sprite.stopAllActions();
            this._sprite.runAction(cc.Sequence.create(this.faint_animation, cc.CallFunc.create(function() {delete main._faint_char[this._id];this.restoreAction();}, this)));
        }
        else {
            this._sprite.stopAllActions();
            this._sprite.runAction(cc.Sequence.create(this.gotattack_animation, cc.CallFunc.create(function() {this.restoreAction();}, this)));
        }
    },
    move:function(degrees) {
        if (!this._attackrange && this._state != 'jump') {
            this._rundegrees = degrees;
        }
    },
    setAttackStar: function() {
        if (this._attackstar == null) {
            this._attackstar = cc.Sprite.create(res.s_hit);
        }
        console.log(this._attackrange);
        this.removeChild(this._attackstar);
        this.addChild(this._attackstar);
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
            this._sprite.runAction(cc.Sequence.create(this.attack_animation, cc.CallFunc.create(function() {this.removeAttackRect();this.restoreAction();}, this)));
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
            this._sprite.runAction(cc.Sequence.create(this.srunattack_animation, cc.CallFunc.create(function() {this.removeAttackRect();this.restoreAction()}, this)));
        }
        if (action == 'throw') {
            this._attackrange = cc.LayerColor.create(cc.color(0, 200, 200, 64), 30, 5);
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
        }
    },
    attack:function() {
        if (this._attackrange || this._state == 'gothang') {
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
            this.setAttackRect('srunattack');
        }
        else {
            this._sprite.stopAllActions();
            this.setAttackRect('attack');
            this._state = 'attack';
        }
    },
    restoreAction:function() {
        if (this._queue_state) {
            if (this._queue_state == 'run') {
                this._state = 'run';
                this.run();
            }
        }
        else {
            this._state = 'stand';
            this.stand();
        }
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
        this._degree = degrees;
        this._state = 'jump';
    },
    isActionLock: function() {
        if (this.state == 'faint' || this.state == 'gothang' || this._getbox || this._state == 'jump' || this._attackrange) {
            return true;
        }
        return false;
    },
 	srun:function(degrees){
        if (this.isActionLock()) {
            return ;
        }
        this._speed = 140;
        this._sprite.stopAllActions();
        this._sprite.runAction(this.srun_animation);
        this._state = 'srun';
	},
	run:function(degrees){
        this._attack_count = 0;
        if (this._attackrange) {
            return;
        }
        if (this._state == 'jump') {
          return ;
        }
        this._speed = 40;
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
            //return;
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

Bandit.create = function(){
	var bandit = new Bandit();
	if (bandit && bandit.init(bandit)){
		return bandit;
	}
	return null;
};