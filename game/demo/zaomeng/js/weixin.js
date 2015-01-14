function weixinjs(data, callbackfunction1, callbackfunction2){
  var dataForWeixin={
      appId: data.appid,
      MsgImg: data.msgimg,
      TLImg: data.tlimg,
      url: data.url,
      title: data.title,
      desc: data.desc,
      fakeid: data.fakeid,
      callback: function(res) {
          if(res.err_msg != 'send_app_msg:cancel'){
            callbackfunction1();
          }
      }
  };

  var dataForWeixin2={
      appId: data.appid,
      MsgImg: data.msgimg,
      TLImg: data.tlimg,
      url: data.url,
      title: data.title,
      desc: data.desc,
      fakeid: data.fakeid,
      callback: function(res) {}
  };
  var onBridgeReady=function(){
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
      WeixinJSBridge.invoke('sendAppMessage',{
        "appid":dataForWeixin.appId,
        "img_url":dataForWeixin.MsgImg,
        "img_width":"120",
        "img_height":"120",
        "link":dataForWeixin.url,
        "desc":dataForWeixin.desc,
        "title":dataForWeixin.title
      }, function(res){(dataForWeixin.callback(res))();});
    });
    WeixinJSBridge.on('menu:share:timeline', function(argv){
      callbackfunction2();
      WeixinJSBridge.invoke('shareTimeline',{
        "appid":dataForWeixin2.appId,
        "img_url":dataForWeixin2.MsgImg,
        "img_width":"120",
        "img_height":"120",
        "link":dataForWeixin2.url,
        "desc":dataForWeixin2.desc,
        "title":dataForWeixin2.title
      }, function(res){(dataForWeixin2.callback(res))();});
    });
  };
  if(document.addEventListener){
     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
  }else if(document.attachEvent){
     document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
     document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
  }
}