var Share = Share || {};
// WeChat Share
;! function() {
    var WeChat = {
            defaultData: {
                imgUrl : "",
                imgWidth: "640",
                imgHeight: "640",
                link : location.href.split( "#" )[0] || "",
                title: ( document.getElementsByTagName( "title" )[0].innerHTML || "" ).replace( /&nbsp;/g, " " ),
                desc: "",
                appid: ""
            },
            dImg: new Image(),
            customData: {},
            callback: [],
            isInit: false,
            init: function() {
                var _this = this;
                if ( this.isInit ) {
                    return false;
                }
                this.isInit = true;
                navigator.userAgent.match( /micromessenger/gi ) && document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    // to friends
                    WeixinJSBridge.on('menu:share:appmessage', function( argv ){
                        _this.shareToChat( argv );
                    });
                    // to moments
                    WeixinJSBridge.on('menu:share:timeline', function( argv ){
                        _this.shareToMoments( argv );
                    });
                    // to weibo
                    WeixinJSBridge.on('menu:share:weibo', function( argv ){
                        _this.shareToWeiBo( argv );
                    });
                }, false);
            },
            setData: function( key, value ) {
                var customData = this.customData,
                    newData = {};
                if ( typeof key === "object" ) {
                    newData = key
                } else {
                    newData[key] = value;
                }
                for ( i in newData ) {
                    customData[i] = newData[i];
                    switch ( i ) {
                        case "title" :
                            ( document.getElementsByTagName( "title" )[0] || {} ).innerHTML = newData[i];
                            break;
                        case "imgUrl" :
                            var dBody = document.getElementsByTagName( "body" )[0],
                                dImg  = this.dImg;
                            dImg.src = newData[i] || "";
                            dImg.width  = 320;
                            dImg.height = 320;
                            dImg.style.position = "fixed";
                            dImg.style.top = "-500px";
                            dBody && ( dBody.firstChild ? dBody.insertBefore( dImg, dBody.firstChild ) : dBody.appendChild( dImg ) );
                            break;
                        default:;
                    }
                }
            },
            getData: function() {
                var defaultData = this.defaultData,
                    customData  = this.customData,
                    data = {};
                for ( i in defaultData ) {
                    data[i] = defaultData[i];
                }
                for ( i in customData ) {
                    data[i] = customData[i];
                }
                return data;
            },
            addCallback: function( fn ) {
                ( typeof fn === "function" ) && this.callback.push( fn );
            },
            fireCallback: function( shareTo ) {
                var callback = this.callback;
                for ( var i = 0, l = callback.length; i < l; ++ i ) {
                    callback[i].call( this, shareTo );
                }
            },
            shareToChat: function( argv ) {
                var data = this.getData();
                WeixinJSBridge.invoke( "sendAppMessage", {
                    "appid": data.appid || "",
                    "img_url": data.imgUrl || "",
                    "img_width": data.imgWidth || "",
                    "img_height": data.imgHeight || "",
                    "link": data.link || "",
                    "desc": data.desc || "",
                    "title": data.title || ""
                }, function( res ) {
                    // _report( "send_msg", res.err_msg );
                } );
                this.fireCallback( "Chat" );
            },
            shareToMoments: function( argv ) {
                var data = this.getData();
                WeixinJSBridge.invoke( "shareTimeline", {
                    "img_url": data.imgUrl || "",
                    "img_width": data.imgWidth || "",
                    "img_height": data.imgHeight || "",
                    "link": data.link || "",
                    "desc": data.desc || "",
                    "title": data.title || ""
                }, function( res ) {
                    // _report('timeline', res.err_msg);
                } );
                this.fireCallback( "Moments" );
            },
            shareToWeiBo: function( argv ) {
                var data = this.getData();
                WeixinJSBridge.invoke( "shareWeibo", {
                    "content": data.desc || "",
                    "url": data.url || "",
                }, function( res ) {
                    // _report('weibo', res.err_msg);
                } );
                this.fireCallback( "WeiBo" );
            }
        };

    window.Share.WeChat = {
        setData: function( key, value ) {
            WeChat.setData( key, value );
        },
        getData: function() {
            return WeChat.getData();
        },
        addCallback: function( fn ) {
            WeChat.addCallback( fn );
        }
    };

    WeChat.init();
} ();