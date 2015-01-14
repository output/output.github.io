	var _csrf_token = $('.jsonToken').val();
	// 转码
	ToUnicode = function(str) { 
		var temp,
		r = '',
		len = str.length;
		for (i = 0; i < len; i++) {
			temp = str.charCodeAt(i).toString(16);
			while ( temp.length < 4 )
			temp = '0' + temp;
			r += '\\u' + temp;
		};
		return r;
	}
	//------------------------------ 单条feed  ------------------------------
	$('.good_btn').click(function(){
		var self = $(this);
		if( self.find('i').hasClass('z') ){
			var like = true;
		}else{
			var like = false;
		}
		var id = $('.user_feeddetail').attr('feedId');
		var data = {"data":'{"type":0,"id":'+id+',"like":'+like+'}',"_csrf_token":_csrf_token};
		$.ajax({
	        url: '/wap/json/like.json',
	        type: "POST",
	        timeout:60000,
	        data:data,
	        dataType: 'json',
	        success: function(json){
	            if (json == null) {
	                alert(MGLANG.msgTimeout);
	            } else {
	                var code = json.status.code;
	                var msg = json.status.msg;
	                if(code == 1001) {
	                	if( self.find('i').hasClass('z') ){
							self.find('i').addClass('z_red').removeClass('z');
						}else{
							self.find('i').addClass('z').removeClass('z_red');
						}
	                }else if(code == 1003){
	                	window.location.href = 'http://dawanju.com/login/Loginsina.htm';
	                }else{
	                	alert(msg);
	                }
	            }
	        }
	    });
	});

	$('.call_good_btn').click(function(){
		var self = $(this);
		var num = parseInt(self.find('span').text());
		if( self.find('i').hasClass('plz') ){
			var like = true;
		}else{
			var like = false;
		}
		var id = $(this).parents('li').attr('commentId');
		var data = {"data":'{"type":1,"id":'+id+',"like":'+like+'}',"_csrf_token":_csrf_token};
		$.ajax({
	        url: '/wap/json/like.json',
	        type: "POST",
	        timeout:60000,
	        data:data,
	        dataType: 'json',
	        success: function(json){
	            if (json == null) {
	                alert(MGLANG.msgTimeout);
	            } else {
	                var code = json.status.code;
	                var msg = json.status.msg;
	                if(code == 1001) {
	                	if( self.find('i').hasClass('plz') ){
	                		self.find('span').text(num+1);
							self.find('i').addClass('plz_red').removeClass('plz');
						}else{
							self.find('span').text(num-1);
							self.find('i').addClass('plz').removeClass('plz_red');
						}
	                }else if(code == 1003){
	                	window.location.href = 'http://dawanju.com/login/Loginsina.htm';
	                }else{
	                	alert(msg);
	                }
	            }
	        }
	    });
	});

	//查看更多评论
	$('.moreabout').click(function(){
		var feed_id = $('.user_feeddetail').attr('feedId');
		var last_id = $('.feed_usertalk_box ul li:last').attr('commentId');
		var data = {"data":'{"feed_id":'+feed_id+',"last_id":'+last_id+'}',"_csrf_token":_csrf_token};
		$.ajax({
	        url: '/wap/json/get_comment.json',
	        type: "POST",
	        timeout:60000,
	        data:data,
	        dataType: 'json',
	        success: function(json){
	            if (json == null) {
	                alert(MGLANG.msgTimeout);
	            } else {
	                var code = json.status.code;
	                var count = json.result.count;
	                if(code == 1001) {
	                	var html = json.result.html;
	                	$('.feed_usertalk_box ul').append(html);
	                	rel();
	                	if(count < 10 ){
	                		$('.moreabout').remove();
	                	}
	                }
	            }
	        }
	    });
	});

	//评论和回复接口
	$('.comment_box .comment_btn').click(function(){
		var self = $(this);
		var to_user_id = self.attr('userId');

		var str = self.prev().val();
		if( str.indexOf(':') != -1 ){
			var content = ToUnicode(str.substr(str.indexOf(':')+1));
		}else{
			var content = ToUnicode($('.comment_box textarea').val());
		}
		
		var feed_id = $('.user_feeddetail').attr('feedId');
		var owner_id = $('header span').attr('userId');
		if( self.attr('type') == 1 ){
			var data = {"data":'{"content":"'+content+'","feed_id":'+feed_id+',"to_user_id":'+to_user_id+',"owner_id":'+owner_id+'}',"_csrf_token":_csrf_token};
		}else{
			var data = {"data":'{"content":"'+content+'","feed_id":'+feed_id+',"owner_id":'+owner_id+'}',"_csrf_token":_csrf_token};
		}
		$.ajax({
	        url: '/wap/json/comment.json',
	        type: "POST",
	        timeout:60000,
	        data:data,
	        dataType: 'json',
	        success: function(json){
	            if (json == null) {
	                alert(MGLANG.msgTimeout);
	            } else {
	                var code = json.status.code;
	                var msg = json.status.msg;
	                if(code == 1001) {
	                	var html = json.result.html;
	                	$('.feed_usertalk_box ul').prepend(html);
	                	self.attr('type',0);
	                	self.prev().val('');
	                }else if(code == 1003){
	                	window.location.href = 'http://dawanju.com/login/Loginsina.htm';
	                }else{
	                	alert(msg);
	                }
	            }
	        }
	    });
	});

	var rel = function(){
		$('.cmt_info .des a').click(function(){
			var name = '回复'+$(this).parents('.cmt_info').find('.buyer_call p a').text()+':';
			var userid = $(this).parents('.cmt_info').find('.buyer_call p').attr('userId');
			$('.comment_box textarea').val(name);
			$('.comment_box .comment_btn').attr({'userId':userid,'type':1});
		});
	}
	rel();

	$('.wb_login_btn a').click(function(){
		var feed_id = $('.user_feeddetail').attr('feedId');
		window.location.href = 'http://dawanju.com/login/Loginsina.htm';
	});


	//--------------------------  个人中心  ---------------------------------
	$('#topic').click(function(){
		var self = $(this);
		var user_id = $('.userpic span').attr('userid');
		if( $('.share_box').size() != 0 ){
			self.addClass('c');
		    $('#share').removeClass('c');
		    $('.share_box').show();
			$('.talk_box').hide();
		}else{
			var last_topic_id = 0;
			var data = {"data":'{"scene":2,"user_id":'+user_id+',"last_topic_id":'+last_topic_id+'}',"_csrf_token":_csrf_token};
			losdNewdata(data);
		}
	});

	$('#share').click(function(){
		$(this).addClass('c');
        $('#topic').removeClass('c');
		$('.talk_box').show();
		$('.share_box').hide();
	});

	var sharelock = 1;
	var talklock = 1;
	// 滚动加载
    var initScrollLoad = function() {
        $(window).on('scroll', function() {
            var dh, st, ch;

            dh = document.body.scrollHeight;
            st = document.body.scrollTop || document.documentElement.scrollTop;
            ch = document.documentElement.clientHeight;

            var user_id = $('.userpic span').attr('userid');
            
            if (dh - st - ch <= 0) {
            	ushopLoading = true;
            	var lastId = $('.talk_box .talk_list:last').attr('feedid');
            	if( $('.tab_wrap a.c').html() == '分享' ){
            		if(sharelock != 1){
			            return;
			        }
			        sharelock = 2;
			        var Swipe = parseInt($('.talk_list').index());
            		var data = {"data":'{"userId":"'+user_id+'","lastId":'+lastId+',"swipe":'+Swipe+'}',"_csrf_token":_csrf_token};
            		$.ajax({
				        url: '/wap/json/get_feed.json',
				        type: "POST",
				        timeout:60000,
				        data:data,
				        dataType: 'json',
				        success: function(json){
				            if (json == null) {
				                alert(MGLANG.msgTimeout);
				            } else {
				                var code = json.status.code;
				                var msg = json.status.msg;
				                if(code == 1001) {
				                	var html = json.result.html;
				                	$('.talk_box').append(html);
				                	var num = Swipe + 1;
				                	for (var i = num; i < $('.talk_list').length; i++) {
								        usershare('mySwipe' + i);
								    }
				                }else{
				                	alert(msg);
				                }
				            }
				        },
			            complete:function(XHR, TS) {
			                sharelock = 1;
			            }
				    });
            	}else{
            		var last_topic_id = $('.share_box li:last').attr('tag_id');
            		var data = {"data":'{"scene":2,"user_id":'+user_id+',"last_topic_id":'+last_topic_id+'}',"_csrf_token":_csrf_token};
            		losdNewdata(data);
            	}
            }
        });
    };
    if( $('.share_talk').size() != 0 ){
    	initScrollLoad();	
    }

    var losdNewdata = function(data){
    	if(talklock != 1){
	        return;
	    }
	    talklock = 2;
    	$.ajax({
	        url: '/wap/json/get_topic.json',
	        type: "POST",
	        timeout:60000,
	        data:data,
	        dataType: 'json',
	        success: function(json){
	            if (json == null) {
	                alert(MGLANG.msgTimeout);
	            } else {
	                var code = json.status.code;
	                if(code == 1001) {
	                	var topicsData = json.result.topics;
		                var html = '';
	                	if( $('.share_box').size() == 0 ){
	                		if ( topicsData == undefined ){
	                			html += '<div class="share_box"><div class="empty"><img src="http://img.dawanju.com/0CD10559-4E70-418B-B705-F77B9A4C0561.png"></div></div>';
	                		}else{
	                			html += '<div class="share_box"><ul>';
			                	for (var i = 0; i < topicsData.length; i++) {
			                		html += '<li tag_id="'+topicsData[i].tag_id+'"><a href="http://dawanju.com/wap/topic.htm?topicId='+topicsData[i].tag_id+'"><img src="'+topicsData[i].cover+'?imageView2/1/w/640/h/480"><span>#'+topicsData[i].name+'</span></a></li>';
			                	}
			                	html += ' </ul></div>';
	                		}
		                	$('#topic').addClass('c');
		                	$('#share').removeClass('c');
		                	$('.talk_box').after(html).hide();
						}else{
		                	for (var i = 0; i < topicsData.length; i++) {
		                		html += '<li tag_id="'+topicsData[i].tag_id+'"><a href="http://dawanju.com/wap/topic.htm?topicId='+topicsData[i].tag_id+'"><img src="'+topicsData[i].cover+'?imageView2/1/w/640/h/480"><span>#'+topicsData[i].name+'</span></a></li>';
		                	}
		                	$('.share_box ul').append(html);
						}
	                }
	            }
	        },
            complete:function(XHR, TS) {
            	talklock = 1;
            }
	    });
    }

    for (var i = 0; i < $('.talk_list').length; i++) {
        usershare('mySwipe' + i);
    }
    function usershare(idname){
    	if( $('body').width() > 700 & $('body').width() < 800 ){
	    	$('.talk_box').addClass('width_700');
	    	$('.mySwipe').css('width', $('.img_list').width());
	    }else if( $('body').width() > 800 ){
	    	$('.talk_box').addClass('width_800');
	    	$('.mySwipe').css('width', $('.img_list').width());
	    }
        var elem = document.getElementById(idname);
        window.mySwipe = Swipe(elem, {
          startSlide: 0,
          auto: 0,
          continuous: false,
          disableScroll: false,
          callback: function(index, element) {
          },
          transitionEnd: function(index, element) {}
        });
    }

    // ------------------------------  活动页面  ---------------------------------
    $('.head_text p a').click(function(){
        $(this).next().show();
        $(this).remove();
    });

    // -------------------------------  底部加更多热门话题  ---------------------------      
    function moretopic(){
        var elem = document.getElementById('m_topic');
        window.mySwipe = Swipe(elem, {
          startSlide: 0,
          auto: 0,
          continuous: false,
          disableScroll: false,
          callback: function(index, element) {
          	$('.spot_box span').removeClass('active').eq(index).addClass('active');
          },
          transitionEnd: function(index, element) {}
        });
    }
    moretopic(); 
    setTimeout(function(){
    	var num = $('.topic_list_detail').height();
    	if( num < 200 ){
    		num = '220px';
    	}
    	$('.more_topic .topic_list').css('height',num);
    },300); 

    window.ua = detectUA();

    function detectUA() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息 
            weixin: u.match(/MicroMessenger/i) || window.WeixinJSBridge != undefined,
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        }
    }

	if (ua.android){
		$('.download').html('<img src="http://img.dawanju.com/2549E511-2511-44CB-AD76-6DE68FA4515E.png">');
	};
	if( $('.app_down a').size() != 0 || $('.app_download').size() != 0 ){
		document.getElementById('openApp').onclick = function(e){
	        // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
	        // 否则打开a标签的href链接
	        if( ua.weixin == 'MicroMessenger' ){
	        	window.location.href='/wap/app_download.htm';
	        }else{
	        	var ifr = document.createElement('iframe');
		        ifr.src = 'dwjapp://';
		        ifr.style.display = 'none';
		        document.body.appendChild(ifr);
		        window.setTimeout(function(){
		            document.body.removeChild(ifr);
		            window.location.href='https://itunes.apple.com/app/id932231137';
		        },3000)
	        }
	    };
	}
    
    if( $('#app_download').size() != 0 || $('.wap_login').size() != 0 ){
    	var h = $(window).height();
	    if( h < 850 ){
	        h = '960px';
	    }
	    $('.app_download').css('height',h);
	    $('.wap_login').css('height',h);
    	if( !ua.weixin ){
    		$('.app_download .tip').hide();
    		$('#openApp').click();
        }
    }

    if( $('.imgUrl').size() != 0 ){
	    var imgUrl = $('.imgUrl').val();
	    var lineLink = window.location.href;
	    var descContent = $('.descContent').val();
	    var shareTitle = $('.shareTitle').val();
	    var appid = 'wxf4bf68af326a5702';

	    if(descContent != '' && imgUrl != '' && shareTitle != '' ){
		    function shareFriend() {
		        WeixinJSBridge.invoke('sendAppMessage',{
		            "appid": appid,
		            "img_url": imgUrl,
		            "img_width": "200",
		            "img_height": "200",
		            "link": lineLink,
		            "desc": descContent,
		            "title": shareTitle
		        }, function(res) {
		            //_report('send_msg', res.err_msg);
		        })
		    }
		    function shareTimeline() {
		        WeixinJSBridge.invoke('shareTimeline',{
		            "img_url": imgUrl,
		            "img_width": "200",
		            "img_height": "200",
		            "link": lineLink,
		            "desc": shareTitle,
		            "title": descContent
		        }, function(res) {
		               //_report('timeline', res.err_msg);
		        });
		    }
		    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
		    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		        // 发送给好友
		        WeixinJSBridge.on('menu:share:appmessage', function(argv){
		            shareFriend();
		        });
		        // 分享到朋友圈
		        WeixinJSBridge.on('menu:share:timeline', function(argv){
		            shareTimeline();
		        });
		    }, false);
	    }
    }

