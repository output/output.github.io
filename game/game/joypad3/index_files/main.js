cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.cusLoading.preload(g_resources, function () {
       cc.director.runScene(new testingScene());
    }, this);
};
cc.game.run();