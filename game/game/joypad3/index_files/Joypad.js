// Joypad.js

var Joypad = cc.Layer.extend({
	_winSize: null,
	_pCenter: null,
	_pControlSprite: null,
	_pDefaultPoint: null,

	_pDefaultRotation: null,
	_pRotation: null,
	_pDelegate: null,
	_pKeyDown: false,
    keymap: null,
    setDelegateKeymap: function(delegate) {
        this.keymap = delegate;
    },
	ctor:function(){
		this._super();
		_winSize = cc.director.getWinSize();
		_pCenter = cc.p(_winSize.width / 2, _winSize.height / 2);

	},
    getkeycode: function (target, locationInNode) {
        var btna = target.btn_a.getContentSize();
        var btna_rect = cc.rect(target.btn_a.x  ,target.btn_a.y , btna.width, btna.height);
        if (cc.rectContainsPoint(btna_rect, locationInNode)) {
            return cc.KEY.a;
        }
        
        var btnb = target.btn_a.getContentSize();
        var btnb_rect = cc.rect(target.btn_b.x  ,target.btn_b.y , btnb.width, btnb.height);
        if (cc.rectContainsPoint(btnb_rect, locationInNode)) {
            return cc.KEY.s;
        }
        
        var btnd = target.btn_d.getContentSize();
        var btnd_rect = cc.rect(target.btn_d.x  ,target.btn_d.y , btnd.width, btnd.height);
        if (cc.rectContainsPoint(btnd_rect, locationInNode)) {
            return cc.KEY.d;
        }
        
        var btnup = target.btn_up.getContentSize();
        var btnup_rect = cc.rect(target.btn_up.x  ,target.btn_up.y , btnup.width, btnup.height);
        if (cc.rectContainsPoint(btnup_rect, locationInNode)) {
            return cc.KEY.up;
        }
        
        var btndown = target.btn_down.getContentSize();
        var btndown_rect = cc.rect(target.btn_down.x  ,target.btn_down.y , btndown.width, btndown.height);
        if (cc.rectContainsPoint(btndown_rect, locationInNode)) {
            return cc.KEY.down;
        }
        
        var btnleft = target.btn_left.getContentSize();
        var btnleft_rect = cc.rect(target.btn_left.x  ,target.btn_left.y , btnleft.width, btnleft.height);
        if (cc.rectContainsPoint(btnleft_rect, locationInNode)) {
            return cc.KEY.left;
        }
        
        var btnright = target.btn_right.getContentSize();
        var btnright_rect = cc.rect(target.btn_right.x  ,target.btn_right.y , btnright.width, btnright.height);
        if (cc.rectContainsPoint(btnright_rect, locationInNode)) {
            return cc.KEY.right;
        }
        return false;
    },
    keydeletgate_start: function(touch,event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var keycode = target.getkeycode(target, locationInNode);
        if (keycode) {
            event.delegate_target = target.keymap;
            target.keymap.keypressed (keycode, event);
            return true;
        }
        return false;
    },
    keydeletgate_end: function(touch,event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var keycode = target.getkeycode(target, locationInNode);
        if (keycode) {
            event.delegate_target = target.keymap;
            target.keymap.keyreleased (keycode, event);
            return true;
        }
        target.keymap.keyreleased (18, event);
        return false;
    },
	init:function(){
		var bRet = false;
		if (this._super()){
			cc.log("Joypad init ..");
            this._winSize = cc.director.getWinSize();
			// 控制杆所在位置
			this._pDefaultPoint = cc.p(110, 110);
			// 默认旋转角度，以使开口正对右侧
			this._pDefaultRotation = 26;
			// 实际旋转角度
			this._pRotation = 0;

			this.setPosition(this._pDefaultPoint);			

			// this.addChild(cc.Sprite.create(res.s_pad));
			// this.addChild(cc.Sprite.create(res.s_pad));
			// this._pControlSprite = cc.Sprite.create(res.s_pad);
			// this.addChild(this._pControlSprite);
			// this.addChild(cc.Sprite.create(res.s_Joypad4));
			
            // this.btn_a = cc.Sprite.create(res.s_pad_a);
            // this.btn_a.setScale(1.5);
            // this.btn_a.setPosition(cc.p(this._winSize.width - 300, 0));
            // this.addChild(this.btn_a);
            // this.btn_b = cc.Sprite.create(res.s_pad_b);
            // this.btn_b.setScale(1.5);
            // this.btn_b.setPosition(cc.p(this._winSize.width - 200, 0));
            // this.addChild(this.btn_b);

            

            
            this.btn_a = cc.Sprite.create(res.circle);
            this.btn_a.setColor(cc.color(144,112,111));
            this.btn_a.setAnchorPoint(cc.p(0,0));
            this.btn_a._name = 'btn_a';
            var btn_a_label = cc.LabelTTF.create('A');
            btn_a_label.color = cc.color(0, 0, 0, 64);
            btn_a_label.setScale(2);
            btn_a_label.setPosition(this.btn_a.width /2, this.btn_a.height /2);
            this.btn_a.setPosition(cc.p(this._winSize.width - 400, -85));
            this.btn_a.setOpacity(199);
            this.addChild(this.btn_a);
            this.btn_a.addChild(btn_a_label);
            
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.keydeletgate_start,
                onTouchMoved: this.keydeletgate_move,
                onTouchEnded: this.keydeletgate_end,
            }, this);
            
            
            
            
            this.btn_b = cc.Sprite.create(res.circle);
            this.btn_b.setColor(cc.color(144,112,111));
            this.btn_b.setAnchorPoint(cc.p(0,0));
            this.btn_b._name = 'btn_b';
            var btn_b_label = cc.LabelTTF.create('B');
            btn_b_label.color = cc.color(0, 0, 0, 64);
            btn_b_label.setScale(2);
            btn_b_label.setPosition(this.btn_b.width /2, this.btn_b.height /2);
            this.btn_b.setPosition(cc.p(this._winSize.width - 310, -85));
            this.btn_b.setOpacity(199);
            this.addChild(this.btn_b);
            this.btn_b.addChild(btn_b_label);
            
            
            this.btn_d = cc.Sprite.create(res.circle);
            this.btn_d.setColor(cc.color(144,112,111));
            this.btn_d.setAnchorPoint(cc.p(0,0));
            this.btn_d._name = 'btn_d';
            var btn_d_label = cc.LabelTTF.create('D');
            btn_d_label.color = cc.color(0, 0, 0, 64);
            btn_d_label.setScale(2);
            btn_d_label.setPosition(this.btn_d.width /2, this.btn_d.height /2);
            this.btn_d.setPosition(cc.p(this._winSize.width - 220, -85));
            this.btn_d.setOpacity(199);
            this.addChild(this.btn_d);
            this.btn_d.addChild(btn_d_label);
            
            
            
            this.btn_up = cc.Sprite.create(res.s_up);
            this.btn_up.setColor(cc.color(144,112,111));
            this.btn_up.setAnchorPoint(cc.p(0,0));
            this.btn_up._name = 'btn_up';
            var btn_up_label = cc.LabelTTF.create('up');
            btn_up_label.color = cc.color(255, 255, 255, 64);
            btn_up_label.setScale(1.4);
            btn_up_label.setPosition(this.btn_up.width /2, this.btn_up.height /2);
            this.btn_up.setPosition(cc.p(0, -40));
            this.btn_up.setOpacity(199);
            this.addChild(this.btn_up);
            this.btn_up.addChild(btn_up_label);
            
            
            
            this.btn_down = cc.Sprite.create(res.s_up);
            this.btn_down.setColor(cc.color(144,112,111));
            this.btn_down.setAnchorPoint(cc.p(0,0));
            this.btn_down._name = 'btn_down';
            var btn_down_label = cc.LabelTTF.create('down');
            btn_down_label.color = cc.color(255, 255, 255, 64);
            btn_down_label.setScale(1.4);
            btn_down_label.setPosition(this.btn_down.width /2, this.btn_down.height /2);
            this.btn_down.setPosition(cc.p(0, -90));
            this.btn_down.setOpacity(199);
            this.addChild(this.btn_down);
            this.btn_down.addChild(btn_down_label);
            
            
            
            this.btn_left = cc.Sprite.create(res.s_left);
            this.btn_left.setColor(cc.color(144,112,111));
            this.btn_left.setAnchorPoint(cc.p(0,0));
            this.btn_left._name = 'btn_left';
            var btn_left_label = cc.LabelTTF.create('<');
            btn_left_label.color = cc.color(255, 255, 255, 64);
            btn_left_label.setScale(1.4);
            btn_left_label.setPosition(this.btn_left.width /2, this.btn_left.height /2);
            this.btn_left.setPosition(cc.p(-50, -85));
            this.btn_left.setOpacity(199);
            this.addChild(this.btn_left);
            this.btn_left.addChild(btn_left_label);
            
            
            this.btn_right = cc.Sprite.create(res.s_left);
            this.btn_right.setColor(cc.color(144,112,111));
            this.btn_right.setAnchorPoint(cc.p(0,0));
            this.btn_right._name = 'btn_right';
            var btn_right_label = cc.LabelTTF.create('>');
            btn_right_label.color = cc.color(255, 255, 255, 64);
            btn_right_label.setScale(1.4);
            btn_right_label.setPosition(this.btn_right.width /2, this.btn_right.height /2);
            this.btn_right.setPosition(cc.p(110, -85));
            this.btn_right.setOpacity(199);
            this.addChild(this.btn_right);
            this.btn_right.addChild(btn_right_label);
            
            
            
            
            
            
            
            

			//this.updateRotation();

            // cc.eventManager.addListener({
                // event: cc.EventListener.TOUCH_ONE_BY_ONE,
                // swallowTouches: false,
                // onTouchBegan: this.onTouchBegan,
                // onTouchMoved: this.onTouchMoved,
                // onTouchEnded: this.onTouchEnded,
            // }, this);
			bRet = true;
		}
		return bRet;
	},
	onEnter:function(){
		this._super();
	},
	onTouchBegan:function (touch, event){
        // var target = event.getCurrentTarget();
        // console.log(event);
        // var locationInNode = target.convertToNodeSpace(touch.getLocation());
        // var btna = target.btn_a.getContentSize();
        // var rect = cc.rect(target.btn_a.x  ,target.btn_a.y , btna.width, btna.height);
        // if (cc.rectContainsPoint(rect, locationInNode)) {
            // target.btn_a.setOpacity(255);
        // }
        
        
        
		var curPoint = touch.getLocation();
		if (curPoint.x > _winSize.width / 2 || curPoint.y > _winSize.height / 2 ){
			return false;
		}
		
		target.updateTouchRotation(touch, event);
		target.updateRotation();
		if(target._pDelegate)
			target._pDelegate.actionJoypadStart(target._pRotation);
		else
			cc.log('_pDelegate is null ... ');

		return true;
	},
	onTouchMoved:function (touch, event){
        var target = event.getCurrentTarget();
		target.updateTouchRotation(touch, event);
		target.updateRotation();

		if (target._pDelegate)
			target._pDelegate.actionJoypadUpdate(target._pRotation);
		else
			cc.log('_pDelegate is null ... ');
	},
	onTouchEnded:function (touch, event){
        var target = event.getCurrentTarget();
        console.log(target);
        target.btn_a.setOpacity(199);
        
        
        target.updateTouchRotation(touch, event);
        target.updateRotation();
        if (target._pDelegate)
            target._pDelegate.actionJoypadEnded(target._pRotation);
        else
            cc.log('_pDelegate is null ... ');
	},
	updateTouchRotation:function(touch, event){
        var target = event.getCurrentTarget();
		var curPoint = touch.getLocation();
		var sp = cc.pSub(curPoint, target._pDefaultPoint);
		var angle = cc.pToAngle(sp) ;// * -57.29577951;
		var rotation = angle * -57.29577951;
		rotation = rotation < 0 ? 360 + rotation: rotation;
		target._pRotation = rotation;		
	},
	updateRotation:function(){
		//this._pControlSprite.setRotation(this._pDefaultRotation + this._pRotation);
	},
	setDelegate:function(dg){
		this._pDelegate = dg;
	}
});

Joypad.create = function(){
	var joypad = new Joypad();
	if (joypad && joypad.init()){
		return joypad;
	}
	return null;
};



