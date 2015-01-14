
//cc.SPRITE_DEBUG_DRAW = 1;
var canChangePage = true;
var curScene = null;


var movArea = function (acc, node) {
    var curx = node.x + 20 * acc.x;
    var cury = node.y + 20 * acc.y;
    node.x = Math.abs(curx) < 7 ? curx : node.x;
    node.y = Math.abs(cury) < 7 ? cury : node.y;

}

/************************************************************************************************************************************/
var reclick = true;
var isSuccess = false;
var musicPlayStatus = true;
var getById = function (id) {
    return document.getElementById(id);
}
var moveIn = function () {
    var obj = getById();
}
function hasClass(ele, cls) {
    var result = ele && ele.className && (ele.className.search(new RegExp('(\\s|^)' + cls + '(\\s|$)')) != -1);
    return !!result;
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls) && ele)
        ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

window["onCloseClick"] = function () {
    removeClass(getById("regPage"), "anim");
    addClass(getById("regPage"), "animOut");
    var game = getById("Cocos2dGameContainer");
    removeClass(game,"hide");
    setTimeout(function () {
        addClass(getById("regPage"), "hide");
    }, 300);
}

window["onSubmitClick"] = function () {
    if (!reclick) {
        window["showAlert"]("申请发送中，请勿重复发送~");
        return false;
    }
    if (checkForm()) {
        reclick = false;
        post({
            "realname": getById("realname").value.trim(),
            "telephone": getById("telephone").value.trim(),
            "email": getById("email").value.trim(),
            "company": getById("company").value.trim(),
            "position": getById("position").value.trim(),
            "extra": getById("extra").value.trim(),
            "from": "mobile"
        }, function (result) {
            var message = "";
            if (result["status"] == 1) {
                isSuccess = true;
                message = "您的报名信息已经成功提交";
                window["showAlert"](message);
            } else {
                if (result["error"]) {
                    if (result["error"]["email_unique"]) {
                        message = result["error"]["email_unique"];
                    } else if (result["error"]["telephone_unique"]) {
                        message = result["error"]["telephone_unique"];
                    } else if (result["error"]["from"]) {
                        message = result["error"]["from"];
                    } else if (result["error"]["realname"]) {
                        message = result["error"]["realname"];
                    } else if (result["error"]["position"]) {
                        message = result["error"]["position"];
                    } else if (result["error"]["email"]) {
                        message = result["error"]["email"];
                    } else if (result["error"]["telephone"]) {
                        message = result["error"]["telephone"];
                    } else if (result["error"]["company"]) {
                        message = result["error"]["company"];
                    } else if (result["error"] && typeof result["error"] == "string") {
                        message = result["error"];
                    } else {
                        message = "未知错误";
                    }
                }
                window["showAlert"](message);
            }
        });
    }
}
window["onOkClick"] = function () {
    var alertItem = getById("alertItem");
    removeClass(alertItem, "alertAnimIn");
    addClass(alertItem, "alertAnimOut");
    setTimeout(function () {
        addClass(alertItem, "hide");
        if (isSuccess) {
            isSuccess = false;
            window["onCloseClick"]();
            if (curScene) {
                curScene.changePage(++curScene.currentIndex, true);
            }
        }
    }, 280);
}
window["showAlert"] = function (msg) {
    if (!msg) msg = "";
    var alertText = getById("alertText");
    var alertItem = getById("alertItem");
    alertText.innerHTML = msg;
    removeClass(alertItem, "alertAnimOut");
    addClass(alertItem, "alertAnimIn");
    removeClass(alertItem, "hide");
    setTimeout(function () {
        removeClass(alertItem, "alertAnimIn");
    }, 300);
}
var checkForm = function () {
    var checkStatus = true;
    var list = ["realname", "telephone", "email", "company", "position"];
    var data = [];
    for (var i = 0; i < list.length; i++) {
        data[i] = getById(list[i]).value.trim();
    }
    for (var i = 0; i < list.length; i++) {
        var item = getById(list[i]);
        if (data[i] == "") {
            removeClass(item, "inputItem_normal");
            addClass(item, "inputItem_error");
            item.placeholder = "此项不能为空";
            checkStatus = false;
        } else {
            removeClass(item, "inputItem_error");
            addClass(item, "inputItem_normal");
        }
    }
    var phoneReg = /^[0-9]*[1-9][0-9]*$/;
    if (data[1].length != 11 || !phoneReg.test(data[1])) {
        var item = getById(list[1]);
        data[1] = "";
        item.value = "";
        item.placeholder = "请输入正确的手机号码";
        removeClass(item, "inputItem_normal");
        addClass(item, "inputItem_error");
        checkStatus = false;
    } else {
        addClass(getById(list[2]), "inputItem_normal");
    }
    var emailReg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1,4}$/gi;
    if (!emailReg.test(data[2])) {
        var item = getById(list[2]);
        data[2] = "";
        item.value = "";
        item.placeholder = "请输入正确的邮箱";
        removeClass(item, "inputItem_normal");
        addClass(item, "inputItem_error");
        checkStatus = false;
    } else {
        addClass(getById(list[2]), "inputItem_normal");
    }
    return checkStatus;
}
var post = function (data, callfunc) {
    var self = this;
    var xhr = cc.loader.getXMLHttpRequest();
    var oUrl = window.location.host;
    oUrl = encodeURIComponent(oUrl);
    xhr.open("POST", "YOUR URL", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xhr.timeout = 10000;
    xhr.ontimeout = function () {
        reclick = true;
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            reclick = true;
        }
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);
            callfunc(result);
        }
    };
    var param = "";
    for (var key in data) {
        param = param + key + "=" + data[key] + "&";
    }
    param = encodeURI(param);
    xhr.send(param);
};
var initMusic = function () {
    var audio = getById("myAudio");
    audio.src = "res/bg.mp3";
}
var playMusic = function (status) {
    var audio = getById("myAudio");
    if (status) {
        if (audio.paused) {
            audio.play();
            musicPlayStatus = true;
        }
    } else {
        if (!audio.paused) {
            audio.pause();
            musicPlayStatus = false;
        }
    }
}