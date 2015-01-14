/**
 * Created by lingjianfeng on 14-8-31.
 */


var ABTouchLayer = cc.Layer.extend({

    ctor : function(){

        this._super();

        this.initTouchAbout();
    },
    initTouchAbout : function(){

        var title = new cc.Sprite(res.st_menuTitle_png, cc.rect(0, 36, 134, 34));
        title.x = GC.w_2;
        title.y = GC.h - 60;
        this.addChild(title);

//        
        var about = new cc.LabelTTF("   This showcase utilizes many features from Cocos2d-html5 engine, including: Parallax background, tilemap, actions, ease, frame animation, schedule, Labels, keyboard Dispatcher, Scene Transition. \n" +
                "    Art and audio is copyrighted by Enigmata Genus Revenge, you may not use any copyrigted material without permission. This showcase is licensed under GPL. \n \n " +
                "Programmer: \n " +
                "Shengxiang Chen (陈升想) \n" +
                " Dingping Lv (吕定平) \n" +
                " Effects animation: Hao Wu(吴昊)\n" +
                " Quality Assurance:  Sean Lin(林顺)",
            "Arial",
            14,
            cc.size(GC.w * 0.85, 320),
            cc.TEXT_ALIGNMENT_LEFT
        );
        about.attr({
            x: GC.w_2,
            y: GC.h_2 -20,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(about);

        var label = new cc.LabelTTF("Go back", "Arial", 14);
        var back = new cc.MenuItemLabel(label, this.onBackCallback);
        var menu = new cc.Menu(back);
        menu.x = GC.w_2;
        menu.y = 40;
        this.addChild(menu);

    },
    onBackCallback : function(){
        cc.log("[STTouchLayer] : onBack");
        cc.director.runScene(new cc.TransitionFade(1.2, new MainMenuScene()));
    }

});