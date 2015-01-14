var KeyMap = cc.Layer.extend({
    _winsize: null,
	_delegateJoypad: null,
    _pressed_keys: [],
    _saved_keys: [],
    _time: null,
    _start: null,
    _controlchar: null,
    keyreleased: function(key,event) {
        if (event.delegate_target) {
            var target = event.delegate_target;
        }        
        else {
            var target = event.getCurrentTarget();
        }
        delete target._pressed_keys[key];
        
        if (Object.keys(target._pressed_keys).length == 0) {
            target._start = 1;
            target._controlchar.idle();	
        }
        else {
            target.getNewDegrees(target);
        }
        target.printAllkeys();
    },
    keypressed: function(key, event) {
        if (event.delegate_target) {
            var target = event.delegate_target;
        }        
        else {
            var target = event.getCurrentTarget();
        }
        if (target._time == null) {
          target._time = new Date().getTime();
        }
        var current_time = new Date().getTime();
        if (current_time - target._time < 200) {
            var pass = 1;
            if (target._pressed_keys[key]) {
                pass = 0;
            }
            if (pass) {
                target._saved_keys.push(key);
            }
        }
        else {
            target._saved_keys = [];
            target._saved_keys.push(key);
        }
        target._time = current_time;
        // escape alt key
        if (key != 18) {
          target._pressed_keys[key] = true;
        }
        var newdegree = target.getNewDegrees(target);
        target.printAllkeys();
        target.printSavedkeys(newdegree);
    },
	init:function(){
		this._super();
        this._winsize = cc.director.getWinSize();
        this.keylist = cc.LabelTTF.create('j => 跳, p => 拳, 方向 x 2 => 加速', 'Tahoma', 20);
        this.keylist.color= cc.color(255, 255, 0, 64)
		this.keylist.setPosition(cc.p(200, this._winsize.height - 20));
		this.addChild(this.keylist);
        
        
        this._start = 1;
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased:this.keyreleased,
            onKeyPressed:this.keypressed,
        }, this);
		return true;
	},
    printSavedkeys: function(moving) {
        var str = '';
        for (var i in this._saved_keys) {
            for (var ii in cc.KEY) {
                if (cc.KEY.hasOwnProperty(ii)) {
                    if (cc.KEY[ii] == this._saved_keys[i]) {
                        if (str == '') {
                            str += ii;
                        }
                        else {
                            str += '+' + ii;
                        }
                    }
                }
            }
        }
       
        if (str == 'd') {
            this._controlchar.defend();
        }
        else if (str == 's') {
            this._controlchar.jump();
        }
        else if (str == 'down+left+a' || str == 'down+right+a') {
            this._controlchar.ballattack();
        
        }
        else if (str == 'right+right' || str == 'left+left') {
            this._controlchar.srun();
        }
        else if (this._pressed_keys[cc.KEY.a]) {
            this._controlchar.attack();
        }
        // else if (str == 'a') {
            // this._controlchar.attack();
        // }
        else {
            if (moving < 0) {
                this._controlchar.stand();
            }
        }
 
        
        this.removeChild(this.skeystatus);
        this.skeystatus = cc.LabelTTF.create('連技' + str, 'Tahoma', 20);
		this.skeystatus.setPosition(cc.p(this._winsize.width - 100, this._winsize.height - 40));
		this.addChild(this.skeystatus);
    
    },
    printAllkeys: function() {
        var str = '';
        for (var i in this._pressed_keys) {
            for (var ii in cc.KEY) {
                if (cc.KEY.hasOwnProperty(ii)) {
                    if (cc.KEY[ii] == i) {
                        if (str == '') {
                            str += ii;
                        }
                        else {
                            str += '+' + ii;
                        }
                    }
                }
            }
        }
        this.removeChild(this.keystatus);
        this.keystatus = cc.LabelTTF.create('實時鍵' + str, 'Tahoma', 20);
		this.keystatus.setPosition(cc.p(this._winsize.width - 100, this._winsize.height - 20));
		this.addChild(this.keystatus);
    },
    getNewDegrees:function(target) {
        var au = false;
        var al = false;
        var ad = false;
        var ar = false;
        if (target._pressed_keys[cc.KEY.up]){
            au = true;
        }
        if (target._pressed_keys[cc.KEY.left]){
          al = true;
        }
        if (target._pressed_keys[cc.KEY.down]){
            ad = true;
        }
        if (target._pressed_keys[cc.KEY.right]){
          ar = true;
        }

        var newDegrees = -1;
        if (au && !al && !ad && !ar)
          newDegrees = 270;
        if (!au && al && !ad && !ar)
          newDegrees = 180;
        if (!au && !al && ad && !ar)
          newDegrees = 90;
        if (!au && !al && !ad && ar)
          newDegrees = 0;

        if (au && al && !ad && !ar)
          newDegrees = 225;
        if (!au && al && ad && !ar)
          newDegrees = 135;
        if (!au && !al && ad && ar)
          newDegrees = 45;
        if (au && !al && !ad && ar)
          newDegrees = 315;
          
 
        if (au || al || ad || ar){
            if (target._start) {
                target._controlchar.run();
                target._controlchar.move(newDegrees);
                target._start = 0;
            }
            else {
                if (newDegrees >= 0) {
                    target._controlchar._queue_state = 'run';
                }
                target._controlchar.move(newDegrees);
            }
        }	
        
        return newDegrees;
    },
	setDelegateChar:function(delegate){
		this._controlchar = delegate;
	}
});

KeyMap.create = function(){
	var km = new KeyMap();
	if (km && km.init())
		return km;
	return null;
};

