var ControlLayer = cc.Layer.extend({
	_delegate: null,
	mJoypad: null,
    mKeymap: null,
	ctor:function(){
		this._super();
		_winSize = cc.director.getWinSize();
		_pCenter = cc.p(_winSize.width / 2, _winSize.height / 2);
	},
	init:function(){
        this.mJoypad = Joypad.create();
        this.addChild(this.mJoypad);

        this.mKeymap = KeyMap.create();
        
        this.mKeymap.setDelegateJoypad(this.mJoypad);
        this.addChild(this.mKeymap);
        this.mJoypad.setDelegateKeymap(this.mKeymap);
        return true;
	},
	setDelegate: function(delegate){
		this._delegate = delegate;
		this.mJoypad.setDelegate(delegate);
	}
});

ControlLayer.create = function(){
	var clayer = new ControlLayer();
	if (clayer && clayer.init()){
		return clayer;
	}
	return null;
};
