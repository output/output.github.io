    var win=$(window).height();
    $('.activities_hjh, body').css('height',win);  
    if( win < 850 ){
        $('.two_page p').addClass('height_960');
        $('.two_title .bg').css('margin-top','-160px');
        $('.one_page img, .f_bg').css('margin-top','-100px');
    }  

    var changePages = 1;
    var nStartY = null;
    var nChangY = null;
    function mouseMove(ev){ 
        nStartY = ev.targetTouches[0].pageY;
    } 

    function mouseTest(et){
        nChangY = et.changedTouches[0].pageY;
        if(nChangY < nStartY){

            // 向上

            changePages++;

            if(changePages==2){
                if( $('.two_page').hasClass('page_hidden') && $('.float_light').size() == 0 ){
                    $('.two_page').addClass('m-animated').removeClass('page_hidden');
                    $('.one_page').addClass('page_hidden').removeClass('m-animated');
                    $('.one_down').hide();
                }
            }else if(changePages==3){
                if( $('.three_page').hasClass('page_hidden') && $('.float_light').size() == 0 ){
                    $('.three_page').addClass('m-animated').removeClass('page_hidden');
                    $('.two_page').addClass('page_hidden').removeClass('m-animated');
                    $('.one_down').hide();
                }
            }else if(changePages==4){
                if( $('.four_page').hasClass('page_hidden') && $('.float_light').size() == 0 ){
                    $('.four_page').addClass('m-animated').removeClass('page_hidden');
                    $('.three_page').addClass('page_hidden').removeClass('m-animated');
                    $('.one_down').hide();
                }
            }

        }
        if(nChangY > nStartY){

            // 向下

            changePages--;

            if(changePages==1){
                if( $('.one_page').hasClass('page_hidden') && $('.float_light').size() == 0 ){
                    $('.one_page .one_img').addClass('slideInDown');
                    $('.one_page').css('z-index','10').addClass('m-animated').removeClass('page_hidden');
                    setTimeout(function(){
                        $('.two_page').addClass('page_hidden').removeClass('m-animated');
                        $('.one_down').show();
                    },1000);
                }
            }else if(changePages==2){
                alert("222");
                if( $('.two_page').hasClass('page_hidden') && $('.float_light').size() == 0 ){
                    $('.two_page .two_img').removeClass("slideInUp").addClass('slideInDown');
                    $('.two_page').css('z-index','20').addClass('m-animated').removeClass('page_hidden');
                    setTimeout(function(){
                        $('.three_page').addClass('page_hidden').removeClass('m-animated');
                        $('.one_down').show();
                    },1000);
                }
            }

        }


    }

    document.body.addEventListener('touchstart', mouseMove, false);
    document.body.addEventListener('touchend', mouseTest, false);

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    $('.two_title .btn').click(function(){
        var html = '<div class="light_box_fullbg"></div><div class="float_light"><h2>大玩具速度节报名</h2><dl><dd>姓名</dd><dt class="name"><input name="name" type="text" value=""></dt><dd>车型</dd><dt class="car"><input name="car" type="text" value=""></dt><dd>电话</dd><dt class="moblie"><input name="moblie" type="text" value=""></dt></dl><a class="close_btn" href="javascript:;"><img src="http://img.dawanju.com/C0ED62B8-26A1-4C87-B86A-BEA61C95D36B.png"></a><a class="ok_btn" href="javascript:;">提交</a></div>';
        $('body').append(html);

        $('.float_light .ok_btn').click(function(){
            var name = $('.name input').val();
            var phone = $('.moblie input').val();
            var car = $('.car input').val();

            var patrn=/^\d{11}$/;
            if ( name == '' ) {
                alert('姓名不能为空');
                return false;
            }else if ( car == '') {
                alert('车型不能为空');
                return false;
            }else if(!patrn.exec(phone) ){
                $('.page_num input').val('');
                alert('请输入11数字的手机号码');
                return false;
            }else{
                var data = {"data":'{"name":"'+name+'","phone":"'+phone+'","car":"'+car+'"}'};
                $.ajax({
                    url: '/wap/json/apply.json',
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
                                $('.float_light dl, .float_light .ok_btn').remove();
                                $('.float_light').append('<p>报名成功<br/>我们将于1月12日前<br/>与您电话确认</p>');
                                if( win < 850 ){
                                    setTimeout(function(){window.location.reload();},4000);
                                }else{
                                    setTimeout(function(){$('.float_light,.light_box_fullbg').remove();},4000);
                                }
                            }else{
                                alert(msg);
                            }
                        }
                    }
                });
            }            
        });      
    });

    $('.float_light .close_btn').live('click',function(){
        if( win < 850 ){
            window.location.reload();
        }else{
            $('.float_light,.light_box_fullbg').remove();
        }
    });


