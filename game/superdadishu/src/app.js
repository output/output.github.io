var PeiZhi={
    zongshu:100,
    fenshu:0,
    shengming:10,
    level:1,
    layer:null,
    fenshuLabel:null,
    showSeconds:2,
    setFenShu:function(){
    this.fenshuLabel.setString('得分：'+this.fenshu+'分');
}};

var Listener=cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE, //TOUCH_ONE_BY_ONE 为单次触摸事件监听器
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();                              //获取当前触摸点;
        //target.visible=false;
        var locationInNode = target.convertToNodeSpace(touch.getLocation());//将touch的父坐标系转换为target坐标系，，将全局坐标转换为局部坐标 ，还回一个cc.p()对象
        var s = target.getContentSize();                                    //获取对象的面积（宽高）
        var rect = cc.rect(0,0,s.width,s.height);
        if(cc.rectContainsPoint(rect, locationInNode))                      //确保触摸点在对象之上
        {
            target.hit();
            return true;                                               //这里必须要return不然onToucheMoved无法识别
        }
        return false;
    }
});



var LaoShu=cc.Sprite.extend({
    HP:1,
    allowClick:true,
    listener:null,
    isHidden:true,
    j:0,
    ctor:function (i) {
        this._super(res.laoshu_png);
        this.x=PeiZhi.layer.zuobiao[i].x;
        this.y=PeiZhi.layer.zuobiao[i].y;
        PeiZhi.layer.zuobiao[i].isLaoshu=true;
        this.j=i;
        this.addListener();

        this.scheduleOnce(this.destroy,PeiZhi.showSeconds);
    },
    hit:function(){
        cc.audioEngine.playMusic(res.da_wav);
        this.HP--;
        if(this.HP<=0)
        {   PeiZhi.fenshu++;
            PeiZhi.setFenShu();
            this.destroy();
        }
    },
    destroy:function(){
        this.removeListener();
        PeiZhi.layer.zuobiao[this.j].isLaoshu=false;
        //this.destroy();
        PeiZhi.layer.removeChild(this);
        this.release();
    },
    removeListener:function(){
        cc.eventManager.removeListener(this.listener);
    },
    addListener:function(){
        this.listener=Listener.clone();
        cc.eventManager.addListener(this.listener,this);
    }
});


var DaDiShuLayer = cc.Layer.extend({
    sprite:null,
    menu:null,
    zuobiao:[
        {x:50,y:78,isLaoshu:false},
        {x:135,y:78,isLaoshu:false},
        {x:220,y:78,isLaoshu:false},
        {x:50,y:162,isLaoshu:false},
        {x:135,y:162,isLaoshu:false},
        {x:220,y:162,isLaoshu:false},
        {x:50,y:246,isLaoshu:false},
        {x:135,y:246,isLaoshu:false},
        {x:220,y:246,isLaoshu:false},
        {x:50,y:330,isLaoshu:false},
        {x:130,y:330,isLaoshu:false},
        {x:220,y:330,isLaoshu:false}
    ],
    ctor:function () {
        this._super();
        this.init();
        //this.startGame();
        return true;
    },
    init:function(){
        PeiZhi.fenshuLabel=new cc.LabelTTF('得分：0分','Arial','18');
        PeiZhi.fenshuLabel.x=240;
        PeiZhi.fenshuLabel.y=385;
        this.addChild(PeiZhi.fenshuLabel);

        //cc.MenuItemFont.setFontName("Arial");
        var btnStart = cc.MenuItemImage.create(res.btn_StartGame_png, res.btn_StartGame_png, this.startGame, this);
        //cc.MenuItemFont.create("开始游戏", this.startGame, this);
        this.menu = cc.Menu.create(btnStart);
        this.addChild(this.menu,10,4);
    },
    showLaoShu:function(HP){
        var i=parseInt(11*Math.random());
        if(!this.zuobiao[i].isLaoshu)
        {

            if(PeiZhi.zongshu>0)
            {
                var laoshu=new LaoShu(i);
                laoshu.HP=HP;
                cc.audioEngine.playMusic(res.laoshu_wav);
                this.addChild(laoshu);
                PeiZhi.zongshu--;
            }
            else
                this.menu.visible=true;
        }
        else
            this.showLaoShu();
    },
    showLaoShuLevel1:function(){
        this.showLaoShu(1);
        //this.scheduleOnce(this.showLaoShu(1),1);
    },
    showLaoShuLevel2:function(){
        this.showLaoShu(1);
        this.showLaoShu(1);
    },
    showLaoShuLevel3:function(){
        this.showLaoShu(1);
        this.showLaoShu(1);
    },
    showLaoShuLevel4:function(){
        this.showLaoShu(1);
        this.showLaoShu(1);
    },
    showLaoShuLevel5:function(){
        this.showLaoShu(1);
        this.showLaoShu(1);
        this.showLaoShu(1);
    },
    startGame:function(){
        this.menu.visible=false;
        //初始化数据
        PeiZhi.zongshu=100;
        PeiZhi.fenshu=0;
        PeiZhi.setFenShu();

        //开始运行地鼠
        PeiZhi.showSeconds=3;
        this.schedule(this.showLaoShuLevel1, 2, 10, 2);
        PeiZhi.showSeconds=2;
        this.schedule(this.showLaoShuLevel2, 2, 10, 124);
        PeiZhi.showSeconds=2;
        this.schedule(this.showLaoShuLevel3, 2, 10, 246);
        PeiZhi.showSeconds=1;
        this.schedule(this.showLaoShuLevel4, 1, 10, 368);
        PeiZhi.showSeconds=1;
        this.schedule(this.showLaoShuLevel5, 1, 10, 480);
    },
    endGame:function(){
        for(var i=0;i<this.laoshu.length;i++)
            this.laoshu[i].hidden();
    }
});

var DaDiShuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer1=new cc.Layer();
        var bg = new cc.Sprite(res.bg_png);
        bg.anchorX = 0;
        bg.anchorY = 0;
        layer1.addChild(bg, 0, 1);
        this.addChild(layer1);
        //layer1.bake();
        PeiZhi.layer = new DaDiShuLayer();
        this.addChild(PeiZhi.layer);
        cc.audioEngine.playMusic(res.bg_wav, true);
    }
});

