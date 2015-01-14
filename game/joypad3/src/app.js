var lf2layer = cc.Layer.extend({
    screen_left: 0,
    screen_right: 0,
    bg_l_limit: 0,
    bg_r_limit: 0,
    bg_width:0,
    bg_speed: 80,
    _char: [],
    _weapon: [],
    _faint_char:[],
    _obj: [],
    _controlchar: null,
    ctor:function() {
        this._super();
        cc.SPRITE_DEBUG_DRAW =  1;
        win_size = cc.director.getWinSize();
        pt_center = cc.p(win_size.width / 2, win_size.height / 2);
        
        this.bandit = Bandit.create();
        this.davis = Davis.create();
        
        
        
        var characters = cc.Node.create();
        
        characters.addChild(this.bandit);
        characters.addChild(this.davis);
        this._char.push(this.bandit);
        this._char.push(this.davis);
        
        for (var i = 0; i < 10; i++) {
            this._weapon.push(Box.create());
            characters.addChild(this._weapon[i]);
        }
        for (var i in this._weapon) {
            this._weapon[i]._type = 'weapon';
            this._obj.push(this._weapon[i]);
        }
        for (var i in this._char) {
            this._char[i]._type = 'char';
            this._obj.push(this._char[i]);
        }
        for (var i in this._obj) {
            this._obj[i]._id = i;
            this._obj[i].setLocalZOrder(i);
        }
        
        
        this._controlchar = this.davis;
    
        // Background loading.
        var bg_m = cc.Sprite.create(bg.bg_tower);
        var bg_l = cc.Sprite.create(bg.bg_tower);
        var bg_r = cc.Sprite.create(bg.bg_tower);
        this.bg_width = bg_m.width;
        this.bg_l_limit = -bg_m.width;
        this.bg_r_limit = bg_m.width * 2;
        this.screen_right = bg_m.width;
        bg_m.setPosition(pt_center);
        bg_l.setPosition(cc.p(0 - bg_l.width / 2, win_size.height / 2));
        var bg_r = cc.Sprite.create(bg.bg_tower);
        bg_r.setPosition(cc.p(bg_r.width + bg_r.width / 2, win_size.height / 2));
        this.bg_group = cc.Node.create();
        this.bg_group.addChild(bg_l);
        this.bg_group.addChild(bg_m);
        this.bg_group.addChild(bg_r);
        this.addChild(this.bg_group, -1);
        
        this.bg_group.addChild(characters);
        
        
        this.mJoypad = Joypad.create();
        this.addChild(this.mJoypad);
        this.mKeymap = KeyMap.create();
        this.mKeymap.setDelegateChar(this._controlchar);
        this.addChild(this.mKeymap);
        this.mJoypad.setDelegateKeymap(this.mKeymap);
        
        this.scheduleUpdate();
    },
	update:function(dt){

        for (var i in this._char) {
            if (this._char[i]._skillrange) {
                for (var k in this._char[i]._skillrange) {
                    for (var j in this._obj) {
                        if (this._obj[j] == this._char[i]) {
                            continue;
                        }
                        
                        if (this._char[i]._skillrange[k].parent._die) {
                            continue;
                        }
                        var direction = !this._char[i]._skillrange[k].parent._flippedX || -1;
                        var ball_x = this._char[i]._skillrange[k].parent.x - this._char[i]._skillrange[k].parent.width /2;
                        var attack_x = ball_x + this._char[i]._skillrange[k].x * direction;
                        
                        var ball_y = this._char[i]._skillrange[k].parent.y - this._char[i]._skillrange[k].parent.height /2;
                        
                        var attack_y = ball_y;
                        
                        
                    
                    // var test = cc.LayerColor.create(cc.color(0, 200, 200, 64), 30, 5);
                    // test.setPosition(attack_x, attack_y);
                    // this.addChild(test);
                    
                    
                        var sprite_hit = this.aacollision(this._obj[j].x - (this._obj[j]._sprite.width / 2), this._obj[j].y - (this._obj[j]._sprite.height / 2), this._obj[j]._sprite.width, this._obj[j]._sprite.height, attack_x, attack_y, this._char[i]._skillrange[k].width, this._char[i]._skillrange[k].height);
                        if (sprite_hit && (Math.abs(this._char[i]._skillrange[k].parent.x - this._obj[j].x) <= 20) && (Math.abs(this._char[i]._skillrange[k].parent.y - this._obj[j].y) <= 20)) {
                            this._char[i].skillend(this._char[i]._skillrange[k].parent,this._char[i]._skillrange[k].tag);
                            if (this._obj[j]._type == 'weapon') {
                                this._obj[j]._throwDirection = direction;
                                this._obj[j].gotAttack();
                            }
                            else {
                                this._obj[j].gotattack(this._char[i]._skillrange[k].parent._flippedX);
                            }
                        }
                    }
                }
            }
        }
    
        for (var i in this._obj) {
        
            if (this._obj[i]._attackrange) {
                for (var j in this._obj) {
                    if (this._obj[j] == this._obj[i]) {
                        continue;
                    }
                    if (this._obj[j]._state == 'recover') {
                        continue;
                    }
                    var direction = this._obj[i]._flippedX || -1;
                    var bandit_attack_x = this._obj[i].x + this._obj[i]._attackrange.x;
                    var bandit_attack_y = this._obj[i].y + this._obj[i]._attackrange.y;
                    // var test = cc.LayerColor.create(cc.color(0, 200, 200, 64), 30, 5);
                    // test.setPosition(bandit_attack_x, bandit_attack_y);
                    // this.addChild(test);
                    var sprite_hit = this.aacollision(this._obj[j].x - (this._obj[j]._sprite.width / 2), this._obj[j].y - (this._obj[j]._sprite.height / 2), this._obj[j]._sprite.width, this._obj[j]._sprite.height, bandit_attack_x, bandit_attack_y, this._obj[i]._attackrange.width, this._obj[i]._attackrange.height);
                    if (sprite_hit && (Math.abs(bandit_attack_x + this._obj[i]._attackrange.width / 2  - this._obj[j].x) <= 30) && (Math.abs(  this._obj[j].y - this._obj[j].height/2 - this._obj[i].y - this._obj[i].height/2) <= 15)) {
                        this._obj[i]._attackSprite = this._obj[j];
                        if (this._obj[j]._type == 'weapon') {
                            this._obj[j]._throwDirection = !this._obj[i]._sprite._flippedX || -1;
                            this._obj[j].gotAttack();
                            this._obj[i].removeAttackRect();
                        }
                        
                        if (this._obj[j]._type == 'char') {
                            this._obj[j].gotattack(this._obj[i]._sprite._flippedX, this._obj[i]._attacklv);
                            if (this._obj[i]._attacklv == 3) {
                                this._obj[j]._state = 'recover';
                                if (this._obj[j]._attack_count == 1) {
                                    this._obj[i].setAttackStar();
                                }
                                if (this._obj[j]._attack_count == 3) {
                                    this._obj[i].removeAttackStar();
                                }
                                if (this._obj[j]._attack_count == 5) {
                                    this._obj[i].setAttackStar();
                                }
                                this.runAction(cc.Sequence.create(cc.DelayTime.create(0.01),cc.CallFunc.create(function() {this._obj[j]._state = 'gotattack'}, this)));
                              // cc.scheduleOnce(function(){this.obj[i.setattackRect('srunattack')}, 0.05);
                            }
                            else {
                               this._obj[i].removeAttackRect();
                            }
                        }
                        break;
                    }
                }
            }
        }
    
        // if (this._controlchar._getbox == 0 && this.box._state == 'idle') {
            // this._controlchar._hitbox = null;
            // if (Math.abs(this.box.x - this._controlchar.x) <= 30) {
                // var box_hit = this.aacollision(this.box.x - (this.box._sprite.width / 2), this.box.y - (this.box._sprite.height / 2), this.box._sprite.width, this.box._sprite.height, this._controlchar.x - (this._controlchar._sprite.width / 2), this._controlchar.y - (this._controlchar._sprite.height / 2), this._controlchar._sprite.width, this._controlchar._sprite.height);
                // if (box_hit) {
                    // this.box._hitfloor = this.box.y;
                    // this._controlchar._hitbox = this.box;
                // }
            // }
        // }
        for (var i in this._obj) {
            this._obj[i].setLocalZOrder (-this._obj[i].y + (this._obj[i]._sprite.height / 2));
        }
        this.bgPosition(dt);
	},
    is_hitWeapon: function(target) {
        for (var i in this._weapon) {
            if (Math.abs(this._weapon[i].x - target.x) <= 40 && Math.abs(this._weapon[i].y - target.y) <= 15) {
                var box_hit = this.aacollision(this._weapon[i].x - (this._weapon[i]._sprite.width / 2), this._weapon[i].y - (this._weapon[i]._sprite.height / 2), this._weapon[i]._sprite.width, this._weapon[i]._sprite.height, target.x - (target._sprite.width / 2), target.y - (target._sprite.height / 2), target._sprite.width, target._sprite.height);
                if (box_hit) {
                    this._weapon[i]._hitfloor = this._weapon[i].y;
                    target._hitbox = this._weapon[i];
                    return true;
                }
            }
        }
        return false;
    },
    //axis-aligned bounding box collision
    aacollision:function(x1,y1,w1,h1, x2,y2,w2,h2) {
        return (x1 <= x2 + w2 &&
                x2 <= x1 + w1 &&
                y1 <= y2 + h2 &&
                y2 <= y1 + h1);
    },
    bbcollision:function(x1,y1,r1, x2,y2,r2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        var magnitude = Math.sqrt(dx * dx + dy * dy);
        return magnitude < r1 + r2;
    },
    getBoundingCircleRadius:function (sprite){
        return Math.sqrt(((sprite._sprite.width/2 * sprite._sprite.width/2)
            + (sprite._sprite.height/2 * sprite._sprite.height/2)));
 
    },
    bgPosition: function(dt) {
        bg_move = 80 *  2;
        if(this._controlchar.getPosition().x - this.screen_left < 20 && this._controlchar.getPosition().x - this.screen_left > 0) {
            if (this.screen_left - bg_move <= this.bg_l_limit) {
                this.screen_left = this.bg_l_limit;
                this.screen_right = 0;
            }
            else {
                this.screen_left -= bg_move;
                this.screen_right -= bg_move;
            }

            var movement = cc.MoveTo.create(10000 / this._controlchar._speed * dt,cc.p(-this.screen_left,this.bg_group.y));
            this.bg_group.stopAllActions();
            this.bg_group.runAction(movement);
        }
        if(this.screen_right - this._controlchar.getPosition().x < 20 && this.screen_right - this._controlchar.getPosition().x > 0) {
            if (this.screen_right + bg_move >= this.bg_r_limit) {
                this.screen_right = this.bg_r_limit;
                this.screen_left = this.bg_width;
            }
            else {
                this.screen_left += bg_move;
                this.screen_right += bg_move;
            }

            var movement = cc.MoveTo.create(10000 / this._controlchar._speed * dt,cc.p(-(this.screen_right - 800),this.bg_group.y));
            this.bg_group.stopAllActions();
            this.bg_group.runAction(movement);
        }
    }
});

var lf2layer2 = cc.Layer.extend({
    ctor:function() {
        this._super();
        console.log('dsfsdf');
        win_size = cc.director.getWinSize();
        var bg_m = cc.Sprite.create(bg.bg_tower);
        var action = cc.OrbitCamera.create( 100, 1, 0, 285, 75, 0, 0);
        var action2 = cc.OrbitCamera.create( 111, 1, 0, 100, 22, 0, 0);
         this.addChild(bg_m);
        this.runAction(cc.RepeatForever.create(cc.Sequence.create(action, action2)));
       
        
        // var bg_l = cc.Sprite.create(bg.bg_tower);
        // var bg_r = cc.Sprite.create(bg.bg_tower);
        // this.bg_width = bg_m.width;
        // this.bg_l_limit = -bg_m.width;
        // this.bg_r_limit = bg_m.width * 2;
        // bg_m.setPosition(cc.p(win_size.width / 2, win_size.height / 2));
        // bg_l.setPosition(cc.p(0 - bg_l.width / 2, win_size.height / 2));
        // bg_r.setPosition(cc.p(bg_r.width + bg_r.width / 2, win_size.height / 2));
        // this.bg_group = cc.Node.create();
        // this.bg_group.addChild(bg_l);
        // this.bg_group.addChild(bg_m);
        // this.bg_group.addChild(bg_r);
        // this.addChild(this.bg_group, -1);
       //this.scheduleUpdate();
        
    },
    update: function(dt){
        this.bg_group.x -= 4;
        if (this.bg_group.x <= this.bg_l_limit) {
            this.bg_group.x = 0;
        }
     
    }
})

var testingScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new lf2layer();
        this.addChild(layer);
    }
});

