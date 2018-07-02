q_seq_count = 0;
vdoFlagv = 1;
var v1p1 = new Date();
var v1p = v1p1.getMilliseconds();

/**************************** Swipe Js End *************************************************/

window.addEventListener("message", receiveIframeMessage, false);
function receiveIframeMessage(event) {
    var origin = event.origin || event.originalEvent.origin;
    if (event.data.budget == true) {
        document.getElementById('budget_2018_entry').height = event.data.height + 30;
    }
}

function appDownload() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (navigator.userAgent.match(/Windows Phone 8.1/i)) {
        window.open('https://goo.gl/Gu85Uj', '_blank');
    } else if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
        window.open('https://goo.gl/bAahg6', '_blank');
    } else if (navigator.userAgent.match(/Windows Phone/i)) {
        window.open('https://goo.gl/Gu85Uj', '_blank');
    } else if (navigator.appVersion.indexOf("Windows Phone") != -1) {
        window.open('https://goo.gl/Gu85Uj', '_blank');
    } else if (navigator.userAgent.match(/Windows Phone 8.1/i)) {
        window.open('https://goo.gl/Gu85Uj', '_blank');
    } else if (navigator.userAgent.match(/WPDesktop/i)) {
        window.open('https://goo.gl/Gu85Uj', '_blank');
    } else {
        window.open('https://f87kg.app.goo.gl/HTmU', '_blank');
    }
}

var pollFeedData = '';
var vittFlag = true;

function menudown() {
    $('.jeevanlist').slideToggle();
    $('.jeevanhead h3').toggleClass('active');
}


var scroll = $(document).scrollTop();
var headerHeight = $('.navbar').outerHeight();
$(window).scroll(function () {
    if (isPageCheck != 'home' && isPageCheck != 'list') {
        var scrolled = $(document).scrollTop();
        if (scrolled > headerHeight) {
            $('.navbar').addClass('navbar-hidden');
        } else {
            $('.navbar').removeClass('navbar-hidden');
        }

        if (scrolled > scroll) {
            $('.navbar').removeClass('fixed');
        } else {

            $('.navbar').addClass('fixed');
        }
        scroll = $(document).scrollTop();
    }
});
/****************coccies ********************/
function readCookieRealTime(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function createCookieRealTime(name, value, days) {
    if (isGdprCnt == 'YES') {
        return false;
    }
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else
        var expires = "";
    var full = window.location.host
    var parts = full.split('.');
    var sub = parts[0];
    var domain = parts[1];
    var type = parts[2];

    var newDomain = '.' + domain + '.' + type;
    document.cookie = name + "=" + value + expires + "; path=/;domain=" + newDomain;
}
var generateUid = function (separator) {
    var delim = separator || "-";
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
};
/********************coccies ****************/
function setUrl(url, title) {

    if (typeof (history.pushState) != "undefined") {
        var obj = { Title: title, Url: url };
        history.pushState(obj, obj.Title, obj.Url);
    } else {
        /*alert("Browser does not support HTML5.");*/
    }
}
function comscoreAjaxCall() {
    if (isGdprCnt == 'YES') { return; }
    $.ajax({
        type: "GET",
        url: '/comscore_ajax.php',
        dataType: "json",
        data: { ca: '' },
        success: function (rdata) {
        }
    });

}

function createlandingPageUrl() {
    var landingPage = readCookieRealTime('landingPage');
    if (!landingPage) {
        landingPage = window.location.href;
        createSessionCookie('landingPage', landingPage, 30);
    } else {
        createSessionCookie('landingPage', landingPage, 30);
    }
    return landingPage;
}

function getFirstRefrer() {
    var firstRefrerSess = readCookieRealTime('firstRefrerSess');
    var firstRefrer = document.referrer;
    var locHost = document.location.host;
    var locHArr = locHost.split('.');
    var checkHArr = locHArr.slice(Math.max(locHArr.length - 2, 0));
    locHost = '.' + checkHArr[0] + '.' + checkHArr[1];
    var checkH = firstRefrer.includes(locHost);
    if (firstRefrer == '' || checkH) { var chkSameHost = true; } else {
        var chkSameHost = false;
    }
    if (firstRefrerSess == null || (firstRefrerSess != firstRefrer && !chkSameHost)) {
        createSessionCookie('firstRefrerSess', firstRefrer, 30);
        return firstRefrer;
    } else {
        createSessionCookie('firstRefrerSess', firstRefrerSess, 30);
        return firstRefrerSess;
    }
}

function realtimeHome(metadata) {
    if (isGdprCnt == 'YES') { return; }
    var bhaskarUID = '';
    bhaskarUID = readCookieRealTime('bhaskarUUID');
    if (!bhaskarUID) {
        bhaskarUID = generateUid();
        createCookieRealTime('bhaskarUUID', bhaskarUID, 365);
    }
    var metaurl = $(location).attr('href');
    if (metadata != '') {
        var title = metadata['title'];
        var description = metadata['description'];
        if (typeof metadata['metaurl'] == 'undefined' || metadata['metaurl'] == '') {
            var metaurl = $(location).attr('href')
        } else {
            var metaurl = metadata['metaurl'];
        }
    } else {
        var title = "Hindi News, Hindi Newspaper, Latest Hindi News, Hindi News online.";
        var description = 'Read India leading Hindi newspaper online.Bhaskar.com brings you breaking news in Hindi on Politics,National,International,Sports,Bollywood,Lifestyle,Religion,Gadgets and State';
    }

    var sessId = readCookieRealTime('si');
    var ref = document.referrer;
    if (!sessId) {
        sessId = uniqueSESSID();
        createSessionCookie('si', sessId, 30);
    } else {
        createSessionCookie('si', sessId, 30);
    }

    var data = {
        "title": title,
        "description": description,
        "http_referer": getFirstRefrer(),
        "p_sessionID": bhaskarUID,
        "url": metaurl,
        "domaintype": "M",
        "ss": sessId,
        "landingPage": createlandingPageUrl()
    };
    $.ajax({
        url: 'https://realtime.bhaskar.com/article_data.php',
        data: data,
        crossDomain: true,
        type: "GET",
        contentType: "application/json; charset=utf-8;",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonp',
        cache: false,
        success: function (dataObj) {

        }
    });

}

var uniqueSESSID = function (separator) {
    var delim = separator || "-";
    var current_date = (new Date()).valueOf().toString();
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + delim + S4() + delim + S4() + delim + current_date + delim + S4() + S4() + S4());
};
function createSessionCookie(name, value, mins) {
    if (isGdprCnt == 'YES') { return; }
    var date = new Date();
    date.setTime(date.getTime() + (mins * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    var full = window.location.host
    var parts = full.split('.');
    var domain = parts[1];
    var type = parts[2];
    if (type == 'co') {
        type = type + '.' + parts[3];
    }
    var newDomain = '.' + domain + '.' + type;
    document.cookie = name + "=" + value + expires + "; path=/;domain=" + newDomain;
}

var SartData = '';
function ajaxCall(artData, pgno, ajxCallFlag) {
    if (isGdprCnt == 'YES') { return; }


    SartData = artData;
    /*console.log("artData==="+artData+"ajxCallFlag==="+ajxCallFlag); */
    var urlL = window.location.href;
    if (typeof artData.url !== 'undefined') {
        var urlL = artData.url.replace('http://', 'https://').replace('https://www.bhaskar.com', 'https://m.bhaskar.com').replace('https://bollywood.bhaskar.com', 'https://m.bhaskar.com').replace('https://religion.bhaskar.com', 'https://m.bhaskar.com');
    }
    if (typeof artData.url != 'undefined' && artData.url.indexOf('bollywood.bhaskar.com') > -1) {
        artData.channel_slno = '3849';
    }
    var bhaskarEmail = '';
    var articleWdata = '';

    var filenameKey = document.referrer;
    if (filenameKey == '' || filenameKey == null) {
        filenameKey = "https://m.bhaskar.com/";
    }
    var bhaskarUID = '';
    var bhaskarUID = readCookieRealTime('bhaskarUUID');
    if (!bhaskarUID) {
        bhaskarUID = generateUid();
        createCookieRealTime('bhaskarUUID', bhaskarUID, 365);
    }

    var sessId = readCookieRealTime('si');
    var ref = document.referrer;
    if (!sessId) {
        sessId = uniqueSESSID();
        createSessionCookie('si', sessId, 30);
    } else {
        createSessionCookie('si', sessId, 30);
    }

    if (ajxCallFlag == 1) {

        if (artData.photoCount == 1) {
            pgno = 1;
        }
        try {

            articleWdata = {
                "storyid": artData.storyid,
                "title": artData.title,
                "catid": artData.cat_id,
                "super_cat_id": artData.super_cat_id,
                "super_cat_name": artData.super_cat_name,
                "template_type": artData.template_type,
                "http_referer": getFirstRefrer(),
                "p_sessionID": bhaskarUID,
                "classificationid": artData.pehchan_classification_id,
                "section": artData.cat_name,
                "author": artData.editor_name,
                "uid": artData.user_id,
                "url": urlL,
                "channel_slno": artData.channel_slno,
                "pgno": pgno,
                "pgtotal": artData.photoCount,
                "storydate": artData.created_on,
                "image": artData.image,
                "datetime": artData.datetime,
                "field2": artData.field2,
                "dimension": "301x147",
                "domaintype": "M",
                "mobile4567": artData.mobile4567,
                "pcat_id": artData.pcat_id,
                "email": bhaskarEmail,
                "people": artData.people,
                "location": artData.location,
                "organization": artData.organization,
                "event": artData.event,
                "other": artData.other,
                "news_type": artData.news_type,
                "meta_title": artData.browser_title,
                "meta_keywords": artData.keywords,
                "meta_description": artData.description,
                "ga_section": artData.ga_section,
                "ga_section1": artData.ga_section1,
                "a_event": artData.a_event,
                "flag_v": artData.video_flag,
                "ss": sessId,
                "landingPage": createlandingPageUrl(),
                "bhaskartv": artData.bhaskartv,
                "abbreviation": artData.abbrv
            };

        } catch (err) {
            /*console.log("relatime==="+err); */
        }
    } else {
        artData.url = window.location.href;
        articleWdata = artData;
    }




    articleWdata.pgno = pgno ? pgno : articleWdata.pgno;
    $.ajax({
        url: 'https://realtime0.bhaskar.com/article_data.php',
        data: articleWdata,
        crossDomain: true,
        type: "GET",
        contentType: "application/json; charset=utf-8;",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonp',
        cache: false,
        success: function (dataObj) {
            if (dbbrowserTest != 1) {
                createCookieRealTime('dbbrowserTest', 1, 10);
            }
            if (dbgeoTest != 1) {
                createCookieRealTime('dbgeoTest', 1, 10);
            }
            if (dataObj) {
                dbbrowser = dataObj.html.dbbrowser;
                dbgeo = dataObj.html.dbgeo;
                if (dbbrowser) {
                    createCookieRealTime('dbbrowser', dbbrowser, 10);
                }
                if (dbgeo) {
                    createCookieRealTime('dbgeo', dbgeo, 10);
                }
            }
        }
    });

};


function realtimeQuiz(metadata) {
    if (isGdprCnt == 'YES') { return; }


    var bhaskarUID = '';
    bhaskarUID = readCookieRealTime('bhaskarUUID');
    if (!bhaskarUID) {
        bhaskarUID = generateUid();
        createCookieRealTime('bhaskarUUID', bhaskarUID, 365);
    }
    var tUrl = '';
    if (metadata != '') {
        var title = metadata['title'];
        var description = metadata['description'];
        tUrl = metadata['tUrl'];
    } else {
        var title = "Hindi News, Hindi Newspaper, Latest Hindi News, Hindi News online.";
        var description = 'Read India leading Hindi newspaper online.Bhaskar.com brings you breaking news in Hindi on Politics,National,International,Sports,Bollywood,Lifestyle,Religion,Gadgets and State';
    }

    if (tUrl == '') {
        tUrl = 'https://' + window.location.host + '/quiz/';
    }

    var data = {
        "title": title,
        "description": description,
        "http_referer": getFirstRefrer(),
        "session_id": bhaskarUID,
        "landingPage": createlandingPageUrl(),
        "url": tUrl,
        "domaintype": "M"

    };
    $.ajax({
        url: 'https://realtime.bhaskar.com/quiz_data.php',
        data: data,
        crossDomain: true,
        type: "GET",
        contentType: "application/json; charset=utf-8;",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonp',
        cache: false,
        success: function (dataObj) {

        }
    });

}

function ajaxCallQuiz(artData, pgno, ajxCallFlag) {
    if (isGdprCnt == 'YES') { return; }


    SartData = artData;
    /*console.log("artData==="+artData+"ajxCallFlag==="+ajxCallFlag); */
    var urlL = window.location.href;
    var bhaskarEmail = '';
    var articleWdata = '';

    var filenameKey = document.referrer;
    if (filenameKey == '' || filenameKey == null) {
        filenameKey = "https://m.bhaskar.com/";
    }
    var bhaskarUID = '';
    var bhaskarUID = readCookieRealTime('bhaskarUUID');
    if (!bhaskarUID) {
        bhaskarUID = generateUid();
        createCookieRealTime('bhaskarUUID', bhaskarUID, 365);
    }

    var sessId = readCookieRealTime('si');
    var ref = document.referrer;
    if (!sessId) {
        sessId = uniqueSESSID();
        createSessionCookie('si', sessId, 30);
    } else {
        createSessionCookie('si', sessId, 30);
    }

    if (ajxCallFlag == 1) {

        if (artData.photoCount == 1) {
            pgno = 1;
        }
        try {



            articleWdata = {
                "channel_slno": 10003,
                "current_question": pgno,
                "total_questions": artData.photoCount,
                "quiz_id": artData.storyid,
                "cat_id": artData.cat_id,
                "pcat_id": artData.pcat_id,
                "created_datetime": artData.created_on,
                "referrer": getFirstRefrer(),
                "session_id": bhaskarUID,
                "author_id": artData.user_id,
                "author": artData.editor_name,
                "title": artData.title,
                "ss": sessId,
                "landingPage": createlandingPageUrl(),
                "url": artData.urlL
            };

        } catch (err) {
            /*console.log("relatime==="+err); */
        }
    } else {
        artData.url = window.location.href;
        articleWdata = artData;
    }

    articleWdata.current_question = pgno ? pgno : articleWdata.current_question;
    $.ajax({
        url: 'https://realtime.bhaskar.com/quiz_data.php',
        data: articleWdata,
        crossDomain: true,
        type: "GET",
        contentType: "application/json; charset=utf-8;",
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonp',
        cache: false,
        success: function (dataObj) {
            if (dbbrowserTest != 1) {
                createCookieRealTime('dbbrowserTest', 1, 10);
            }
            if (dbgeoTest != 1) {
                createCookieRealTime('dbgeoTest', 1, 10);
            }
            if (dataObj) {
                dbbrowser = dataObj.html.dbbrowser;
                dbgeo = dataObj.html.dbgeo;
                if (dbbrowser) {
                    createCookieRealTime('dbbrowser', dbbrowser, 10);
                }
                if (dbgeo) {
                    createCookieRealTime('dbgeo', dbgeo, 10);
                }
            }
        }
    });

};


function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


var sliderpopupEnable = false;
function nextsld(obj) {

    window.mySwipe.slide($(obj).index(), 200);
    if (sliderpopupEnable == false) {
        $('html,body').animate({ scrollTop: $('#art_swipper').offset().top - 82 }, 500
            , function () {
                $(".navbar").addClass('navbar-hidden');
                $(".navbar").removeClass('fixed');
            });
    }
    $('.swipe-wrap').css('overflow', 'hidden');

}



/****************************************Top Menu***********************************/

$(document).on('click', '#nav li', function () {
    $(".navbar").css('opacity', 0);
    setTimeout(function () {
        $(".navbar").css('opacity', 1);
    }, 1500);
});

$(document).on('click', 'body', function () {
    $('#cityMenu').hide();
});

$("#showAllCity").click(function (ev) {
    ev.stopPropagation();
});
$(document).on('click', '.mainmenu li a', function () {
    if ($(this).text() !== 'à¤°à¤¾à¤œà¥à¤¯') {
        myoverlayfun();
        $('.overlayClose').hide();
    }
});
function menuPosition() {
    var togWinH = $(window).height();
    var togHeight = $('#tpnav').outerHeight();
    var togTop = $('#tpnav').position().top + togHeight;
    //$('#smb_menu').css({'top':togTop,'height':(togWinH-togTop)});
}
$('body').append('<div class="overlayClose" onclick="closeMenu();" ></div>');
$('.ba_menu').on('click', function () {
    getmenu();
    $('#smb_citymenu').slideUp();
    $('body').find('.overlay').remove();
    $('#smb_menu').slideToggle();
    $('.overlayClose').slideToggle();
    $('.menu_select').removeClass('toggleShow');
    $('.topSearchBotton').removeClass('searchClose');
    $('.topSearchContainer, #search_result').hide();
    closePopup();
    menuPosition();
    setTimeout(function () {
        if ($('#smb_menu').is(':visible')) {
            $('body').append('<div class="overlay" onclick="myoverlayfun();"></div>');
            $('.mb_topstrip_list').append('<div class="menuoverlay"></div>');

            $('body').addClass('fixheight');
        } else {
            $('body').find('.overlay').remove();
            $('.mb_topstrip_list').find('.menuoverlay').remove();
            $('body').removeClass('fixheight');
        }
    }, 500);

});

function closeMenu() {
    $('#smb_menu').slideToggle();
    $('body').removeClass('fixheight');
    $('.overlayClose').hide();
}
/*End of city menu*/
function myoverlayfun() {
    $('body').find('.overlay').remove();
    $('.mb_topstrip_list').find('.menuoverlay').remove();
    $('#smb_menu,#smb_citymenu').slideUp();
    $('body').removeClass('fixheight');

}

function submenushow(obj) {
    $(this).toggleClass("active");
    $(this).find('ul').slideToggle();

}

$(document).on("click", ".dropdown", function () {
    $(this).toggleClass("active")
    $(this).find('ul').slideToggle()
});

menustatus = '1';
var mlm = 1;
var BASE_URL = 'https://m.bhaskar.com/';
function getmenu() {
    if (menustatus == '1') {
        if (galleryFlag == 0) {
            galleryFlag = 2;
            $.getScript("/public/nbhaskarpwa/js/custom_gallery_v2.js?p" + v1p);
        }
        menustatus = '2';

        var lbtrack = "";

        var lbtrack_art = "";
        if (typeof iscancel !== 'undefined' && iscancel == 1) {
            lbtrack = "?lb";
            lbtrack_art = "-lb";
        }

        var leftmenu = "";
        if (window.location.hostname.indexOf("m0beta") > -1 || window.location.hostname.indexOf("m1beta") > -1) {
            feedUrl = "https://appfeedlight0.bhaskar.com/webfeed";
        } else {
            feedUrl = "https://appfeedlight.bhaskar.com/webfeed";
        }

        $.getJSON(feedUrl + "/mainMenu/521/", function (data) {
            var limenu = '';
            leftmenu = data.data.mainmenu;
            $.each(leftmenu, function (key, item) {
                /******* start set mmax in url *******/
                var addext = '';
                if (mmaxkey != '') {
                    if (item['url'].indexOf('?') > -1) {
                        addext = "&ref=" + mmaxkey + mmaxval;
                    } else {
                        addext = "?ref=" + mmaxkey + mmaxval;
                    }
                }
                /******* end set mmax in url ******/
                var catId = item.cat_id;
                var catUrl = item['url'] + lbtrack + addext;
                var catTitle = item.title;
                chId = 521;
                if (catId == 3322) {
                    chId = 3322;
                }
                var jsonCat = { 'catID': catId, 'catName': catTitle, 'setUrl': catUrl, 'onLoad': 0, 'chId': chId };
                if (typeof (item['cat_id']) !== 'undefined' && item['cat_id'].length > 1) {
                    try {
                        var sindex = findIndex2D(hSlider, "url", item['swipeUrl']);
                        if (sindex !== false) {
                            var onClick = "onclick='swipeTo(\"" + item['swipeUrl'] + "\");return false;'";
                        } else {
                            var onClick = "onclick='return listData(" + JSON.stringify(jsonCat) + ");'";
                        }
                        onClick = "";

                    } catch (e) { }
                } else {
                    var onClick = "";
                    if (catTitle == 'à¤°à¤¾à¤¶à¤¿à¤«à¤²') {
                        onClick = "onclick ='loadRashifalTpl(event)'";
                    }
                }
                if (typeof (item['submenu']) !== 'undefined' && item['submenu'].length > 1) {
                    limenu += '<li class="' + item['class'] + ' dropdown" onclick="submenushow(this)"><a id="TRACKLMENU_' + mlm + '" onclick=trackMenuClickPvs(this.id,' + mlm + ',' + mlm + '); title="' + item['title'] + '">' + item['title'] + '</a><span></span>';
                } else {
                    if (item['title'] == 'ePaper' || item['title'] == 'à¤­à¤¾à¤¸à¥à¤•à¤° à¤²à¤¾à¤‡à¤µ' || item['title'] == 'à¤¬à¤¿à¤œà¤¼à¤¨à¥‡à¤¸' || item['url'] == 'https://m.money.bhaskar.com/' || item['title'] == 'à¤¹à¥‹à¤® à¤‘à¤¨à¤²à¤¾à¤‡à¤¨' || item['title'] == 'à¤µà¥€à¤¡à¤¿à¤¯à¥‹') {
                        var newMenu = ''; if (item['title'] == 'à¤•à¥à¤°à¤¿à¤•à¥‡à¤Ÿ à¤²à¥€à¤—') { var newMenu = '<span class="menuNew">à¤–à¥‡à¤²à¥‡à¤‚</span>' }
                        limenu += '<li class="' + item['class'] + '"><a id="TRACKLMENU_' + mlm + '" onclick="trackMenuClickPvs(this.id,' + mlm + ',' + mlm + ')"; target="_blank" href="' + item['url'] + '" title="' + item['title'] + '">' + item['title'] + newMenu + '</a>';
                    } else {
                        /*if (item['title'] == 'à¤µà¥€à¤¡à¤¿à¤¯à¥‹') {
                            var sindex1 = findIndex2D(hSlider,"url",'videos');
                            limenu += '<li class="' + item['class'] + '"><a id="TRACKMENU_' + mlm + '" onclick="swipeTo(\'videos\');return false;"; href="' + item['url'] + lbtrack + addext + '" title="' + item['title'] + '">' + item['title'] + '</a>';
                        } else*/ if (item['cat_id'] == '6791') {
                            var jsonCat = { 'catTitle': 'à¤«à¥€à¤šà¤°à¥à¤¡', 'catName': 'photo', 'setUrl': '/photo/', 'isMenu': 1 };
                            var onClick = "onclick='return albumList(" + JSON.stringify(jsonCat) + ");'";
                            limenu += '<li class="' + item['class'] + '"><a id="TRACKMENU_' + mlm + '" ' + onClick + '"; href="' + BASE_URL + item['url'] + lbtrack + addext + '" title="' + item['title'] + '">' + item['title'] + '</a>';
                            /*limenu += '<li class="' + item['class'] + '"><a id="TRACKMENU_'+mlm+ '" onclick="trackMenuClickPvs(this.id,'+mlm+','+mlm+')"; href="/' + item['url']+lbtrack + addext+'" title="' + item['title'] + '">' + item['title'] + '</a>'; */
                        } else if (item['title'] == 'à¤°à¤¾à¤¶à¤¿à¤«à¤² 2018') {
                            var newMenu = '<span class="menuNew">à¤¨à¤¯à¤¾</span>';
                            newMenu = '';
                            limenu += '<li class="' + item['class'] + '"><a href="/jeevan-mantra/rashifal-2018/?ref=ham" title="' + item['title'] + '">' + item['title'] + newMenu + '</a>';
                        } else if (item['title'] == 'à¤•à¥à¤µà¤¿à¤œà¤¼' || (item['url'] == 'quiz/')) {
                            /*var redirectdata = JSON.stringify({'catID':'','catName':'DB Quiz','setUrl':'quiz/','chId':'521'});
                            var onClickLogo = "onclick='return dbquizlist("+redirectdata+");'";*/

                            var sindex = findIndex2D(hSlider, "url", item['swipeUrl']);
                            var onClick = "onclick='swipeTo(\"" + item['swipeUrl'] + "\");return false;'";
                            onClick = "";

                            var newMenu = '<span class="menuNew">à¤¨à¤¯à¤¾</span>';
                            limenu += '<li class="' + item['class'] + '"><a id="TRACKMENU_' + mlm + '" ' + onClick + ' href="javascript:void(0);" title="' + item['title'] + '">' + item['title'] + '</a>';
                        } else if (item['title'] == 'à¤—à¥‡à¤®à¥à¤¸' || (item['url'] == 'games/')) {
                            var sindex = findIndex2D(hSlider, "url", item['swipeUrl']);
                            onClick = "";
                            var onClick = "onclick='swipeTo(\"" + item['swipeUrl'] + "\");return false;'";
                            var newMenu = '<span class="menuNew">à¤¨à¤¯à¤¾</span>';
                            limenu += '<li class="' + item['class'] + '"><a id="TRACKMENU_' + mlm + '" ' + onClick + ' href="javascript:void(0);" title="' + item['title'] + '">' + item['title'] + '</a>';
                        } else if (item['class'] == 'festquiz') {
                            var newMenu = '<span class="menuNew">à¤¨à¤¯à¤¾</span>';
                            limenu += '<li class="' + item['class'] + '"><a href="' + item['url'] + lbtrack + addext + '" title="' + item['title'] + '">' + item['title'] + newMenu + '</a>';
                        } else if (item['title'] == 'à¤à¤¸à¥à¤Ÿà¥à¤°à¥‹ à¤­à¤¾à¤¸à¥à¤•à¤°') {
                            var newMenu = '<span class="menuNew">New</span>';
                            limenu += '<li class="' + item['class'] + '"><a target="_blank" id="TRACKMENU_' + mlm + '" ' + onClick + '"; href="' + item['url'] + '?ref=ast-m1" target="_blank" title="' + item['title'] + '">' + item['title'] + newMenu + '</a>';
                        } else {
                            limenu += '<li class="' + item['class'] + '"><a id="TRACKMENU_' + mlm + '" ' + onClick + '"; href="' + BASE_URL + item['url'] + lbtrack + addext + '" title="' + item['title'] + '">' + item['title'] + '</a>';
                        }
                    }
                }
                if (typeof (item['submenu']) !== 'undefined' && item['submenu'].length > 1) {
                    var child = 1
                    limenu += '<ul class="mbs_menu">';
                    $.each(item['submenu'], function (skey, sitem) {

                        var catId = sitem.cat_id;
                        var catUrl = sitem['url'];
                        var catTitle = sitem.title;

                        var jsonCat = { 'catID': catId, 'catName': catTitle, 'setUrl': catUrl, 'onLoad': 0 };
                        var sindex = findIndex2D(hSlider, "url", sitem['swipeUrl']);
                        try {
                            if (sindex !== false) {
                                var onClick = "onclick='swipeTo(\"" + sitem['swipeUrl'] + "\");return false;'";
                            } else {
                                var onClick = "onclick='return listData(" + JSON.stringify(jsonCat) + ");'";
                            }
                            onClick = "";
                        } catch (e) { }

                        if (catId == 2052) {
                            var onClick = '';
                        }
                        limenu += '<li class="' + sitem['class'] + '"><a id="TRACKLCMENU_' + child + '" ' + onClick + ' href="' + BASE_URL + sitem['url'] + lbtrack + '" title="' + sitem['title'] + '">' + sitem['title'] + '</a>';
                        child++;
                    });
                    limenu += '</ul></li>';
                } else {
                    limenu += '</li>';
                }
                mlm++;
            });

            $(".mainmenu").append(limenu);


        });


    }
}

/** search **/
$(document).on("keyup", '#findnews', function (e) {
    if ($(this).val().length < 3) {
        $('#searchedstory').html("");
    }
    clearTimeout($.data(this, 'timer'));
    if (e.keyCode == 13) {
        findstory(true);
    } else {
        $(this).data('timer', setTimeout(findstory, 500));

    }
    if ($(this).val() < 3) {
        $('#search_result').hide();
        $('.topSearchContainer').css({ 'display': 'none', 'height': 'auto' });
        //$('body').removeClass('fixheight');
    } else {
        $('#search_result').show();
        $('.topSearchContainer').css({ 'display': 'block', 'height': $(window).height() - 81 });
        $(window).resize(function () {
            $('.topSearchContainer').css({ 'height': $(window).height() - 81 });

        });
        //$('body').addClass('fixheight');
    }
});


function findstory(force) {
    $('#search_result').html('<div class="search_load"></div>');
    var keystr = $("#findnews").val();
    var tcode = '';
    tcode = $("#tcode").val();
    if (!force && keystr.length < 3) {
        $('#search_result').html('');
        return;
    }
    var searchFeed = 'https://appfeedlight.bhaskar.com/webfeed/searchkeyword/521/1/' + keystr + '/20/';
    $.ajax({
        type: "get",
        url: searchFeed,
        dataType: "json",
        cache: true,
        data: '',
        success: function (response) {
            $('#searchedstory').html("");
            var obj = response;
            if (obj.length > 0) {
                try {
                    var items = [];
                    $.each(obj, function (i, val) {
                        items.push('<li><a href="' + val.url + '?ref=srh">' + val.title + '</a></li>');
                    });
                    $('#search_result').html('');
                    $('#search_result').append.apply($('#search_result'), items);
                } catch (e) {
                    $('#search_result').html('');
                }
            } else {
                $('#search_result').html($('<li/>').text("No Result Found"));
                $('#searchedstory').html($('<li/>').text("No Data Found"));
            }
        }
    });
}

/**for city search **/
function filterSources(myVal, felem, target) {
    var myFilter = $.trim(myVal).replace(/ +/g, ' ').toLowerCase();
    var dataSources = $(felem);


    var arr = [];
    for (var i = 0, n; n = dataSources[i]; ++i)
        arr.push(n);


    var finalData = [];
    arr.filter(function (element, index) {
        var elval = $.trim($(element).text()).replace(/ +/g, ' ').toLowerCase();
        if (!(elval.indexOf(myFilter))) {

            finalData.push($(element).html());

        }
    });
    var newStr = '';
    $.each(finalData, function (index, value) {
        newStr += "<li>" + value + "</li>"
    });
    if (newStr == '') {
        newStr += "<li><a href='javascript:void(0);'>No Result Found</a></li>"
    }
    $(target).html('<ul id="filter-data">' + newStr + '</ul>');
}
$('#newsfind').on('click', function () {
    $('#target-cities').hide();
    $('#cityMenu').slideToggle();
    $('#newsfind').focus();
    $('#smb_menu').slideUp();
    setTimeout(function () {
        if ($('#smb_menu').is(':visible')) {
            $('body').append('<div class="overlay"></div>');
            $('.mb_topstrip_list').append('<div class="menuoverlay"></div>');

            $('body').addClass('fixheight');
        } else {
            $('body').find('.overlay').remove();
            $('.mb_topstrip_list').find('.menuoverlay').remove();
            $('body').removeClass('fixheight');
        }
    }, 500);
});

function setCityData(city_id) {
    $('#target-cities').hide();
    $('#cityMenu').hide();
    /*SetCookie('citybaseddata', city_id, 5);*/
}

if ($('.menu_select').is(':visible')) {
    $('.smb_logobar .logo_m').css('margin-left', '44');
} else {
    $('.smb_logobar .logo_m').css('margin-left', '0');
}

$(document).on("keyup", '#newsfind', function () {
    filterSources($(this).val(), 'ul#cityMenu li', '#target-cities');
    /* filterSources($(this).val(), 'ul#cityMenu li > ul > li', '#target-cities');*/
    if ($(this).val() <= 0) {
        $('#target-cities').hide();
    } else {
        $('#cityMenu').hide();
        $('#target-cities').show();
    }
});

/**for city search **/

function liveEvent_new() {
    if (!$('#live_event_home').length > 0) {
        $("#home_widget").prepend('<div id="live_event_home"></div>');
    }
    setTimeout(function () {
        $.ajax({
            type: "GET",
            url: "https://" + location.hostname + "/live-video-events/live-event/?v3",
            success: function (data) {
                if (data === '') {
                    $(".videoBanner").hide();
                }
                $('#live_event_home').html(data);
            }
        });
    }, 500);
}


/********************************Top Menu*******************************************/





/********************************Load Home *****************************************/
var whatsapptxt = ' Online DB Poll/Survey: Click to see your sense of voting. ';
var hload = 1;
var liveE = '1';
var ispollflag = true;
var pollTrFlag = true;
var pollImpFlag = true;
var isCallHome = true;
var responsiveVoiceFlag = false;
var loadlocation = true;
if (isPageCheck == 'home') {
    loadlocationscript();
}



function loadlocationscript() {
    if (loadlocation == true) {
        $.getScript("https://i9.dainikbhaskar.com/notification/mbhaskar/_userLocationSDK.js?q" + v1p, function (jd) {
            loadlocation = false;
            return true;
        });
    }
}

// function loadHome(vc) {
//     loadlocationscript();
//     if(responsiveVoiceFlag == true){
//         responsiveVoice.cancel();
//     }
//     pauseVideoUltima(2); 
//     vc = vc || 0;
//     pollImpFlag = true;
//     pollTrFlag = true;
//     ispollflag = true;
//     onSchrol = 2;
//     flagP = 1;
//     if ($("#el_cubespinner").length > 0) {unsetElcCube();}
//     $("html, body").scrollTop(0);
//     $('#liveEvent_article').hide();
//     $('#liveEvent_home').show();
//     $('.logoBolly').hide();
//     $('#homeIcn').show();
//     $(".hindi_diwas_title").hide();
//     $("#tpnav").removeClass('bollywoodLogo');
//     $("body").removeClass('newfont');
//     $("#tpnav").removeClass('smb_header_ent');
//     $("#tpnav").removeClass("smb_header_sticky");
//     $("#main_wrapper").removeClass("jeevan-mantra");
//     $("#main_wrapper").removeClass("jeevan-mantra1");
//     $("#smb_menu").removeClass("jeevan-mantra");
//     $(".dynamic_nab").show();
//     $("#no-fake-news").hide();
//     isPageCheck = 'home';
//     $(".mymenu_slide li").removeClass("swiper-pagination-bullet-active");
//     $("#homeIcn").addClass("swiper-pagination-bullet-active");
//     /*$("#main_wrapper").addClass('homePadding');*/
//     $(".db_pollWD").hide();
//     $(".loader").show();
//     $('.keyword-density').hide();
//     $('.rightArrow').hide();
//     $("img.hmimg").each(function () {
//         $(this).attr("src", $(this).attr("src1"));
//     });
//     var homeMetaArr = hWidget['homeMetaArr']['home'];
//     setSliderHeight('idx_0');
//     /*console.log("isPageCheck==="+isPageCheck+"==hload==="+hload);*/
//     var xyz = 0;
//     if ((onLoadpage == 1 || hload == 2) && xyz != 0) {

//         $("#da_mainwrapper").hide();
//         setUrl("/", "Latest News");
//         $("#home_widget").show();
//         $("#recommend").hide();$("#bhaskar-cric-entry-widget").hide();$('.add_vitt_mantri_comment').remove();
//         $(".loader").hide();
//         $("#lcontainerlist").hide();
//         /**home tracking code on ajex**/
//         document.title = homeMetaArr['title'];
//         var currentArtTitle = homeMetaArr['title'];
//         homeMetaArr.metaurl = 'https://m.bhasakar.com/';
//         var Artflag_v = 1;
//         var tracknumArtSlides = '';
//         var item = 0;
//         var ArtlUpdated = '';
//         ga('set', 'dimension16', "Other");
//         ga('set', 'dimension17', "Home"); 
//         analytics_func_ajax('/', 'down', currentArtTitle, ArtlUpdated, Artflag_v, tracknumArtSlides, 0, item, 0);
//         realtimeHome(homeMetaArr);
//         comscore(1);
//         comscoreAjaxCall();
//         var abcDegitalUrl1 = abcarr['p_home'];
//         traceabcAjex(abcDegitalUrl1);
//         /**home tracking code on ajex**/
//         /*console.log('1');*/
//     } else {
//         hload = 2;
//         /*$("#home_slider").show();*/
//         $("#da_mainwrapper").hide();
//         $(".aap-download-icon").show();
//         $("html, body").scrollTop(0);
//         $("body").removeClass('headerMove');
//         viewFlag = 1;
//         var fkflag = vflag = yflag = nflag = eflag = jflag = sflag = wflag = mflag = aflag = 1;

//         $("#recommend").hide();$("#bhaskar-cric-entry-widget").hide();$('.add_vitt_mantri_comment').remove();
//         $("#home_widget").empty();

//         checkAssets('bhaskarcss').then(homePageCall(1));

//         setUrl("/", "Latest News");
//         document.title = homeMetaArr['title'];
//         var currentArtTitle = homeMetaArr['title'];
//         homeMetaArr.metaurl = 'https://m.bhasakar.com/';
//         var Artflag_v = 1;
//         var tracknumArtSlides = '';
//         var item = 0;
//         var ArtlUpdated = '';
//         ga('set', 'dimension16', "Other");
//         ga('set', 'dimension17', "Home");
//         analytics_func_ajax('/', 'down', currentArtTitle, ArtlUpdated, Artflag_v, tracknumArtSlides, 0, item, 0);
//         realtimeHome(homeMetaArr);
//         comscore(1);
//         comscoreAjaxCall();
//         var abcDegitalUrl1 = abcarr['p_home'];
//         traceabcAjex(abcDegitalUrl1);
//         reIntHomeSlider(0);
//         hsliderFlag = false;
//         isCallHome = false;
//         homeSwipe.slide(0);
//         iframeId="dataIframe";

//     }
//      if(vc == null){
//          var np = window.location.pathname;
//         histroydata['url'].push(np);
//         xz=2;
//      }



//     loadAds('fromhome');
//     return false;
// }

/**************************************** Load Home *****************************************/

function trackGaFWRec(position) {
    event.preventDefault();
    if (isGdprCnt == 'YES') {
        return;
    }
    var recIdA = "rec_" + position;
    var li = $("#" + recIdA).attr('class');
    var liId = li.split("_");
    var liId1 = liId[2].split(" ");
    var urlRec = $("#" + recIdA + " a ").attr('href');
    if (urlRec.indexOf('firstwall') > -1) {
        var type = "Recommendation_FW";
    } else {
        var type = "Recommendation";
    }
    ga('send', 'event', type, urlRec, liId1[0], { nonInteraction: true });

    window.open(urlRec, '_blank');
}

/*for last slide*/
function trackGaFWRecLS(position, urlRec) {
    event.preventDefault();
    if (isGdprCnt == 'YES') {
        return;
    }
    ga('send', 'event', 'Recommendation_FW_ls', urlRec, position, { nonInteraction: true });
    window.open(urlRec, '_blank');
}
function trackGaRecLS(position) {

    var recIdA = "rec_" + position;
    var li = $("#" + recIdA).attr('class');
    var liId = li.split("_");
    var liId1 = liId[2].split(" ");
    var urlRec = $("#" + recIdA + " a ").attr('href');
    ga('send', 'event', 'Recommendation_ls', urlRec, liId1[0], { nonInteraction: true });

}
/*for last slide*/

function trackGaRec(position) {
    var recIdA = "rec_" + position;
    var li = $("#" + recIdA).attr('class');
    var liId = li.split("_");
    var liId1 = liId[2].split(" ");
    var urlRec = $("#" + recIdA + " a ").attr('href');
    ga('send', 'event', 'Recommendation', urlRec, liId1[0], { nonInteraction: true });

}



function loadCricketEntryArticle() {
    if (typeof (loadWidget) == "function") {
        var pageCheckCric = isPageCheck;
        setTimeout(function () {
            if (isPageCheck == 'article') {
                if (window.location.href.indexOf('news/SPO') > -1) {
                    pageCheckCric = 'sports_article';
                }
            }
            if (widget_visible.indexOf(pageCheckCric) > -1 && $('#bhaskar-cric-score-widget').length < 1) {
                $('#bhaskar-cric-entry-widget').show();
                loadWidget("bhaskar-cric-entry-widget", isPageCheck, currentmatchid);
            } else {
                $('#bhaskar-cric-entry-widget').hide();
            }
        }, 500);
    } else {
        checkLiveMatch();
    }
}

/************************OnLoad recommdation load **************************************/
var p = 1;
if (isPageCheck == 'article' && p == 1) {
    p = 2;
    var art_cat_id = art_cat_id;
    var art_cat_id1 = art_cat_id1;
    var catIdsArray = ['11080', '11081', '11082', '11083', '11084', '11085'];
    //console.log(art_cat_id+" CHK-Data: "+$.inArray(art_cat_id,catIdsArray));
    if ($.inArray(art_cat_id, catIdsArray) > -1 || $.inArray(art_cat_id1, catIdsArray) > -1) {
        displayArtRecYearEnder(art_cat_id, art_cat_id1, storyid, browser_title);
    }
    displayArtRec(storyid, browser_title);
    setTimeout(function () {
        loadCricketEntryArticle();
    }, 1000);

    /**viewRecomdation**/
    var story_id = storyid;
    var readstory = readCookieRealTime('viewedRecomm');

    if (readstory != 'null' && readstory != null && readstory != '') {
        var stories_ids = readstory.split("^");
        var isExists = stories_ids.indexOf(story_id);
        if (isExists < 0) {
            readstory = readstory + '^' + parseInt(story_id);
        }
    } else {
        readstory = story_id;
    }
    createCookieRealTime('viewedRecomm', readstory, 1);

    /**viewRecomdation**/
}
/*******OnLoad recommdation load **********/

/************Home page onSchrol start****************/
/* DBVIDEO Widget for Home page */
var clone = "";
/* Ultima Plyaer code Start */
function videoUlPlay(ultimaSrc, noId, catURL, detailUrl, index) {
    if (navigator.userAgent.indexOf('Opera Mini') != -1) {
        window.location.href = detailUrl;
    } else {
        $('#activeplay').val(index);
        var data = '<iframe width="100%" height="310px" align="middle" scrolling="no" src="' + ultimaSrc + '?autoplayFlag=1" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" msallowfullscreen="true" class="ifvideo" id="ifvideo_' + index + '" style="background-color:#000000"></iframe>';
        clone = $('#DBTV_total_' + noId).html();
        $('#DBTV_total_' + noId).empty();
        $('#DBTV_total_' + noId).add().html(data);
        return false;
    }
}
/* Ultima Plyaer code end */
function dbtvwidget(catitem, catname) {
    dbtvHtml = '<ul class="swiper-wrapper">';
    var x = 0;
    $.each(catitem, function (key, item) {
        var j = key + 1;
        var ultimaUrl = item.full_video_url.replace("/videos-m/", "/videos-m-hws/");
        if (key < 40) {
            if (key == 0 || key == 1) {
                var srcType = "data-pagespeed-lazy-src";
            } else {
                var srcType = "data-src";
            }
            dbtvHtml += '<li class="swiper-slide" lang="' + j + '" id="DBTV_total_' + j + '"><a class="fullimg clickTrackWidget" data-position="1" lang="' + j + '" id="DBTV_img_' + j + '" href="javascript:void();" onclick="return videoUlPlay(\'' + ultimaUrl + '\',' + j + ',\'' + item.catURL + '\',\'' + item['detailsURL'] + '\',' + x + ');"><span class="overlaybox"></span><img class="swiper-lazy dbvideos_' + key + '" src="/pagespeed_static/1.JiBnMqyl6S.gif" ' + srcType + '="' + item.image + '" ' + item.image_attr + ' alt="' + item.title + '" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);" /></a><a class="onpgtitle" href="javascript:void();" onclick="return videoUlPlay(\'' + ultimaUrl + '\',' + j + ',\'' + item.catURL + '\',\'' + item.detailsURL + '\',' + x + ');" data-position="2" lang="' + j + '" id="DBTV_text_' + j + '" class="clickTrackWidget"><span class="title">' + item.title + '</span></a><span class="views"> ' + item.views + '</span><span class="duration"> ' + item.duration + '</span></li>';
            x++;
        }
    });
    dbtvHtml += '</ul>  <input type="hidden" id="activeplay" /><span class="lhsArrow" onclick="mySwipe2.prev()" id="previous"></span><span class="rhsArrow" onclick="mySwipe2.next()" id="next"></span><input type="hidden" id="ultimaHid" value="" />';
    return dbtvHtml;

}

function pauseVideoUltima(check, noId) {

    try {

        if (check == 1) {
            if (document.getElementById("newDiv")) {
                var video_iframes = document.getElementById("newDiv");
                var iframeWin = video_iframes.contentWindow;
                iframeWin.postMessage('1', "https://ultimaold0.bhaskar.com");
            }

        } else if (check == 2) {
            if (document.getElementById(iframeId)) {
                var video_iframes = document.getElementById(iframeId);
                var iframeWin = video_iframes.contentWindow;
                iframeWin.postMessage('1', "https://ultima.bhaskar.com");
                iframeWin.postMessage('5', "https://ultima.bhaskar.com");
            }
        } else {
            /*var preid = $('#activeplay').val();     
             var iframeWin = document.getElementById("ifvideo_"+preid).contentWindow;
             iframeWin.postMessage('1', "https://ultima.bhaskar.com");*/

            var video_iframes = document.getElementsByClassName("ifvideo");



            var l = video_iframes.length;
            if (l > 0) {
                for (var i = 0; i < l; i++) {
                    var iframeWin = video_iframes[i].contentWindow;
                    iframeWin.postMessage('1', "https://ultimaold0.bhaskar.com");
                }
            }

        }

    } catch (e) {
        console.log(e.message);
    }

}

/* DBVIDEO Widget for Home page */

var bigImgfirstLi = '';
var hFlag = 0;
pFlag = 0;
var liveE = '1';

$.fn.isOnScreen = function () {
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    if (bounds) {
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    }
};

/**********************************Home page onSchrol End************************************/





/**********************************article page start **************************************/

function add_poll_after_rec(pollResultData) {

    /*prepare main entry point HTML*/
    if (pollResultData.total_question > 0) {
        var pollCookieStatus = readCookieRealTime('poll_' + pollResultData.poll_id);
        if (pollCookieStatus != "1") {

            /*$('#quizAds').css('min-height', $('.four-btn-container').height());*/

            /*submit option*/
            var bigimg = '';
            var pollImgPath = 'https://i9.dainikbhaskar.com/dainikbhaskar2010/quiz/dbpoll/';

            var pollHeading = 'à¤†à¤ª à¤•à¥€ à¤°à¤¾à¤¯';
            if (pollResultData.poll_label != '') {
                pollHeading = pollResultData.poll_label;
            }

            if (pollResultData.poll_image != '' && isPageCheck == 'home') {
                pollImgPath = 'https://i9.dainikbhaskar.com/thumbnails/320x160/dainikbhaskar2010/quiz/dbpoll/';
                bigimg = '<div class="image"> <img class="swiper-lazy" src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + pollImgPath + pollResultData.poll_image + '" alt="" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"/> </div>';
            }


            var pollData = pollResultData.poll_data[0];

            var actionStr = 'result';
            var actionIndex = 0;
            /*prepare option HTML*/
            var optionHTML = '<div class="db-poll-heading">' + pollHeading + '</div><div class="four-btn-container poll-animated zoomIn poll-showItem"><h1>' + pollData.poll_question + '</h1>' + bigimg + '<div class="btn-container">';

            optionHTML += (pollData.opt_1 != "") ? '<span class="db-poll-button" onClick="Javascript:exchangeContent(1,' + "'" + pollData.opt_1 + "'" + ');"><input type="radio" />' + pollData.opt_1 + '</span>' : "";
            optionHTML += (pollData.opt_2 != "") ? '<span class="db-poll-button" onClick="Javascript:exchangeContent(2,' + "'" + pollData.opt_2 + "'" + ');"><input type="radio" />' + pollData.opt_2 + '</span><div class="clear"></div>' : "";
            optionHTML += (pollData.opt_3 != "") ? '<span class="db-poll-button" onClick="Javascript:exchangeContent(3,' + "'" + pollData.opt_3 + "'" + ');"><input type="radio" />' + pollData.opt_3 + '</span>' : "";
            optionHTML += (pollData.opt_4 != "") ? '<span class="db-poll-button" onClick="Javascript:exchangeContent(4,' + "'" + pollData.opt_4 + "'" + ');"><input type="radio" />' + pollData.opt_4 + '</span>' : "";
            optionHTML += '</div></div>';

            /*var printQuestion = '<li id="quizAds"><a href="Javascript:void(0);" onClick="exchangeContent(\'option\',0,\'\')"><span class="db-poll-img-con"><div class="graph"><i class="fa-bar-chart"></i><i class="fa-bar-chart1"></i><i class="fa-bar-chart2"></i></div><div class="db-poll-txt">DB Poll</div></span><span class="pwa_text">'+pollResultData.poll_data[0].poll_question+'</span></a></li>';$(window.event.target).closest('#quizAds').html(optionHTML);*/
            /*append to UL*/
            $('.recm_quiz').css('display', 'block');
            $('.recm_quiz').html(optionHTML);
        }
    }
    /*if($('.recm_quiz').html()==''){
     ispollflagart = true;
     }*/
}

/***********************************article page End **********************************/





/***********************************Listing Page **************************************/

/*************************************Listing Page ********************************/



window.addEventListener("message", function (e) {
    if (e.origin.search("ultima") < 0) {
        return;
    }
    var resArr = decodeURIComponent(e.data).split("-::-");
    if (resArr[0] == 'gaevent') {
        var myobj = JSON.parse(resArr[1]);
        dataLayer.push(myobj.gaevent);
    }
    if (isPageCheck == "home" || isPageCheck == "list") {
        if (resArr[0] == 'play' || resArr[0] == 'vidstart') {
            vdoFlag = 1;
            if (resArr[0] == 'vidstart' && !isNaN(resArr[1])) {
                $('.vid_' + resArr[1]).addClass('visitArticle');
                /**Viewed Home Videos**/
                vid_id = resArr[1];
                var readVideo = readCookieRealTime('viewedHVideo');
                if (readVideo != 'null' && readVideo != null && readVideo != '') {
                    var stories_ids = readVideo.split(",");
                    var isExists = stories_ids.indexOf(vid_id);
                    if (isExists < 0) {
                        readVideo = readVideo + ',' + parseInt(vid_id);
                    }
                } else {
                    readVideo = vid_id;
                }
                createCookieRealTime('viewedHVideo', readVideo, 1);
                /**Viewed Home Videos**/
            }
        }
    }
}, false);

$(document).scroll(function (e) {
    e.preventDefault();
    if (($('.homeView_2').isOnScreen()) && ispollflag == true && isPageCheck == 'home') {
        ispollflag = false;
        var pollfeedurl = feedUrl + "/ttl10m/poll/521/single/0/10/";
        /*var pollfeedurl = feedUrl+"/poll/521/single/?status=1";*/
        if (pollFeedData === '') {
            $.getJSON(pollfeedurl, function (hwPolldata) {
                /***** check poll *****/
                pollFeedData = hwPolldata;
                if (hwPolldata.total_question > 0) {

                    var pollCookieStatus = readCookieRealTime('poll_' + hwPolldata.poll_id);
                    if (pollCookieStatus != "1") {
                        var returnData = manage_pollsdata(hwPolldata);

                        var datastr = '<div class="mb_contentbox homeView_n" style="display:block;"><h2><a onClick="javascript:void(0);"><span>DB Poll</span></a></h2><ul id="homeView_n">' + returnData + '</ul></div>';
                        $('.homeView_2').after(datastr);
                    }
                }
            });
        } else {
            /***** check poll *****/
            if (pollFeedData.total_question > 0) {

                var pollCookieStatus = readCookieRealTime('poll_' + pollFeedData.poll_id);
                if (pollCookieStatus != "1") {
                    var returnData = manage_pollsdata(pollFeedData);

                    var datastr = '<div class="mb_contentbox homeView_n" style="display:block;"><h2><a onClick="javascript:void(0);"><span>DB Poll</span></a></h2><ul id="homeView_n">' + returnData + '</ul></div>';
                    $('.homeView_2').after(datastr);
                }
            }
        }
    }

    /*if($('.recm_quiz').html()==''){
     ispollflagart = true;
     }*/

    if (($('.mb_contentbox').isOnScreen()) && ispollflagart == true && isPageCheck == 'article') {
        /*code added for quiz implementation starts*/
        ispollflagart = false;
        if (pollFeedData === '') {
            var pollFeedUrl = feedUrl + "/ttl10m/poll/521/single/0/10/";
            /*var pollFeedUrl = feedUrl+"/poll/521/single/?status=1";*/
            $.getJSON(pollFeedUrl, function (resultData) {
                pollResultData = resultData;
                pollFeedData = resultData;

                add_poll_after_rec(pollFeedData);
            });
        } else {
            pollResultData = pollFeedData;
            add_poll_after_rec(pollFeedData);
        }
        /*code added for quiz implementation ends*/
    }

    /*code added for quiz implementation ends*/
    if (($('.mb_contentbox').isOnScreen()) && isquizflagart == true && isPageCheck == 'article') {
        isquizflagart = false;
    }
});

$(document).ready(function () {

    var cpurl = window.location.href;
    if (cpurl.indexOf("ref=sharedpoll") >= 0) {
        homewidgetF(3);
        viewFlag = 3;
        nflag = 3;
        flagP = 3;
        setTimeout(function () {
            $(window).scrollTop($('.homeView_2').offset().top + 1100);
        }, 500);
    }
});


function isVisibleContents(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) && left < (window.pageXOffset + window.innerWidth) && (top + height) > window.pageYOffset && (left + width) > window.pageXOffset);
}
/*$('.smb_readhome').on('click', function () {
    $('#firstParagraph').hide();
    $('#short_content').show();
    $(this).hide();
});*/

var deviceAgent = navigator.userAgent.toLowerCase();
var agentID = deviceAgent.match(/(iphone)/);
if (agentID || deviceAgent.indexOf(' ucbrowser/') >= 0) {
    $('.topSearchBotton').click(function (event) {
        $('#bell1').hide();
    });
}

function rightContentScrolled() {
    var yScrolled = window.scrollY;
    var starLoaded = false;
    var txtH = 0;

    try {
        if ($("#short_content").is(":visible") == true) {
            if (document.getElementById("short_content")) {
                txtH = document.getElementById('short_content').offsetHeight;
            };
            var shortElement = $('#short_content').offset().top;

        } else {
            if ($("#firstParagraph")) {
                txtH = document.getElementById('firstParagraph').offsetHeight;
            };
            var shortElement = $('#firstParagraph').offset().top;

        }

        var art_swip = $('.wrapper_swip h1').offset().top;



        if (txtH > shortElement) {
            var startOpen = art_swip;
            var endOpen = (txtH + startOpen);

        } else {
            var startOpen = art_swip;
            var startOpenVoice = 300;
            var endOpen = (txtH + startOpen);
        }
        var isVisibleFlag = false;
        if ($("#short_content").is(":visible") == true) {
            if (document.getElementById("short_content")) {
                isVisibleFlag = isVisibleContents(document.getElementById('short_content'));
            };
        } else {
            if (document.getElementById("firstParagraph")) {
                isVisibleFlag = isVisibleContents(document.getElementById('firstParagraph'));
            };
        }

        if (isVisibleFlag /*&& yScrolled >= art_swip-90*/ && yScrolled < endOpen - 125) {
            if ($(".play_container")) {
                if (window.location.href.indexOf("seq=") == -1 || window.location.href.indexOf("seq=0") > 0) {
                    if (deviceAgent.indexOf(' ucbrowser/') > 0 || deviceAgent.indexOf('opera') > 0 || window.location.href.indexOf("/JM-") > 0) {
                    } else {
                        $(".play_container").show();


                        console.log('startOpen-show: ' + startOpen + 'yScrolled-show: ' + yScrolled + 'endOpen: ' + endOpen);
                    }
                    starLoaded = true;
                }
            }
            if (document.getElementById("rightArrow")) {
                if (window.location.href.indexOf("seq=") == -1 || window.location.href.indexOf("seq=0") > 0) {
                    document.getElementById("rightArrow").style.display = "none";
                    starLoaded = true;
                }
            }
        } else {
            if ($(".play_container")) {
                $(".play_container").hide();
                $(".listen_msg").hide();

            }
            if (document.getElementById("rightArrow")) {
                document.getElementById("rightArrow").style.display = "none";

            }
            starLoaded = false;
        }
    } catch (e) {
    }
    ;
}
window.addEventListener("scroll", function () {
    rightContentScrolled()
}, false);

$('.rightArrow').click(function () {
    $(this).hide();
    dataLayer.push({
        'event': 'Ev_Custom',
        'ev_category': 'Article_Events',
        'ev_action': 'Click',
        'ev_label': 'Righ_Swipe_Arrow',
    });
});

function cricketScoreJS() {
    var gAV = function (el, attrName, dfault) {
        var attrVal = el.getAttribute('data-' + attrName);
        return (attrVal === undefined || attrVal === null) ? dfault : attrVal;
    };
    var gD = function () {
        return location.hostname;
    }
    var getElementsByClassName = function (node, classname) {
        var a = [];
        var re = new RegExp('(^| )' + classname + '( |$)');
        var els = node.getElementsByTagName("*");
        for (var i = 0, j = els.length; i < j; i++)
            if (re.test(els[i].className)) a.push(els[i]);
        return a;
    }
    var widgets = getElementsByClassName(document.body, 'wpce-widget');
    var d = new Date();
    for (var i = 0; i < widgets.length; i++) {
        var el = widgets[i];
        el.innerHTML = '<iframe id="wpce-frame' + i + '" src="' + gAV(el, 'site', '') + 'widgets/?layout=' + gAV(el, 'layout', '') + '&widgets=' + gAV(el, 'widgets', '') + '&ref=' + gD() + '" class="wpce-frame" style="min-width:100%;width:100%;*width:100%;" width="100%" frameborder="0" scrolling="no" allowtransparency="true" allowfullscreen="true"></iframe>';

        iFrameResize({
            messageCallback: function (r) {
                if (r.message.action == 'changeurl') {
                    window.history.pushState(null, null, r.message.url);
                    /*console.log(r.message);*/
                }
            }
        }, '#wpce-frame' + i);
    }
}





var readcat = readCookieRealTime('viewedCat');
var userSessId = readCookieRealTime('bhaskarUUID');
var curDate = new Date();
var curHour = curDate.getHours();
var rflTop = rflTopFlag = false;
if (curHour >= 6 && curHour < 12) {
    /* rflTop = true;
     rflTopFlag =true;*/
}
var pdRatesFlag = false;
if (curHour >= 7 && curHour < 11) {
    pdRatesFlag = false;
}
if (typeof excStoriesId == 'undefined') {
    var excStoriesIds = '';
} else {
    var excStoriesIds = excStoriesId;
}
if (!userSessId) {
    userSessId = generateUid();
    createCookieRealTime('bhaskarUUID', userSessId, 365);
    if (rflTop) {
        var feedUrlArr = ['/ttl15m/dbmeodtwo/521/0/2/', '/ttl15m/dbmeodhighestctr/521/0/2/' + excStoriesIds + '/', 'CS', '/ttl15m/dbmmostviewflicker/521/0/15/', 'TV', 'XS', 'MVEODF', 'POLL', '/ttl15m/dbmfacebooktrending/521/'];
    } else {
        var feedUrlArr = ['/ttl15m/dbmeodtwo/521/0/2/', '/ttl15m/dbmeodhighestctr/521/0/2/' + excStoriesIds + '/', 'CS', '/ttl15m/dbmmostviewflicker/521/0/15/', 'TV', 'XS', 'RF', 'MVEODF', 'POLL', '/ttl15m/dbmfacebooktrending/521/'];
    }
} else {
    if (rflTop) {
        var feedUrlArr = ['/ttl15m/dbmeodtwo/521/0/2/', '/ttl15m/dbmeodhighestctr/521/0/2/' + excStoriesIds + '/', 'CS', 'XS', 'TV', 'MVEODF', 'POLL', '/ttl15m/dbmfacebooktrending/521/'];
    } else {
        var feedUrlArr = ['/ttl15m/dbmeodtwo/521/0/2/', '/ttl15m/dbmeodhighestctr/521/0/2/' + excStoriesIds + '/', 'CS', 'XS', 'TV', 'RF', 'MVEODF', 'POLL', '/ttl15m/dbmfacebooktrending/521/'];
    }
}
var homeLi = 11;
var excNewStories = '';
var latestTmstamp = '';
var viewedStoriesCookie = '';
var viewedStories = [];
var fetchedStories = [];
function khelojeeto() {
    $.get("https://cldmum.bhaskar.com/event/ttl10m/ipl-quiz-list/521/0/11/", function (response) {

        if (response.data.length > 0) {
            /* poll banner call */
            $("#pollidblock").show();
        } else {
            /* quiz banner call */
            $("#quizidblock").show();
        }
    }, 'json');
}


$(document).ready(function (e) {
    // calling the rashifal Widgets

    window.setTimeout(function () {
        createRasifalBox();
        window.scrollTo(0, 0);
    }, 100);

});



function homePageCall(idx) {

    /* css not load return*/
    //if(!window.EXTCSS){return;}
    //debugger;
    //alert('homePageCall');

    var pointer = feedUrlArr[idx - 1];

    if (idx == 1) {
        homeLi = 0;/*reinitialize*/
        feedIdx = 4;/*reinitialize*/
        if (rflTop) {
            rflTopFlag = true;
        }
        sSeq = 1; /*reinitialize*/
        cSeq = 1; /*reinitialize*/
        var mainHtml = '';
        mainHtml += '<section class="homeSection">';
        mainHtml += '<div id="liveEvent_home" style="display:none;min-height:278px;"></div>';
        mainHtml += '<div class="clear10"></div>';
        mainHtml += '<ul  class="homeBrief">';
        mainHtml += '</ul>';
        mainHtml += '</section>';
        $('#home_widget').append(mainHtml);
        $('#da_mainwrapper').empty();
    }


    if ($(".list-loader").hasClass('pahide')) {
        /*$(".list-loader").removeClass('pahide');*/
    }

    if (pointer == 'CS') {
        var savedCitiesId = readCookieRealTime('savedCitiesId');
        var savedCitiesName = readCookieRealTime('savedCitiesName');
        openCityPopUp();
        if (savedCitiesId) {
            getCityWiseData(savedCitiesId, savedCitiesName);
        }
        srlFlag = true;
        feedIdx++;

    } else if (pointer == 'GST') {
        /*   createGSTWidget();
           srlFlag = true;*/
    } else if (pointer == 'RF') {

        createRasifalBox();
        srlFlag = true;

    } else if (pointer == 'POLL') {
        /*  createPollBox();
            srlFlag = true;*/

    } else {

        if (pointer == 'XS' && 0) {
            /*var readcatIds = readCookieRealTime('viewedCat');
            if (!readcatIds) {
                var feedUrlF = feedUrl + '/ttl15m/dbmxstories/521/' + userSessId + '/1/';
            } else {
                var feedUrlF = feedUrl + '/ttl15m/dbmxstories/521/' + userSessId + '/2/' + readcatIds + '/';
            }*/

        } else if (pointer == 'TV' && 0) {

            var feedUrlF = feedUrl + '/dbvideolatest/521/20/';
            $('.homeBrief').append('');

        } else if (pointer == 'NV') {

            var feedUrlF = feedUrl + '/dbvideosevent/521/23/1';

        } else if (pointer == 'MVEODF') {
            var feedUrlF = feedUrl + '/ttl15m/dbmmostvieweodflicker/521/0/20/';

        } else {
            /*var feedUrlF = feedUrl + pointer;*/

        }

        $.getJSON(feedUrlF, function (data) {
            if (pointer == 'TV') {
                var storyData = data.data;
            } else if (pointer == 'NV') {
                var storyData = data;
            } else {
                var storyData = data.data.story;
            }

            var vdoCount = 0;
            if (pointer == 'TV') {
                var viewedVideoIds = [];
                var viewedVideoCookies = readCookieRealTime('viewedHVideo');
                if (viewedVideoCookies != null && viewedVideoCookies != '') {
                    viewedVideoIds = viewedVideoCookies.split(',');
                }
            } else {
                viewedStoriesCookie = readCookieRealTime('viewedRecomm');
                if (viewedStoriesCookie != null && viewedStoriesCookie != '') {
                    viewedStories = viewedStoriesCookie.split('^');
                }
            }

            if (storyData != '') {
                for (p in storyData) {
                    var rtHtml = '';
                    var adsSeq = '';


                    if (homeLi == 0) {
                        var element = document.getElementById('div-gpt-ad-hp-0');
                        if (element == null) {
                            rtHtml += '<div class="a300d_n mar10" id="div-hp-0"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-hp-0" class="ad_300_n"></div></div>';
                        }
                        adsSeq = 'load';
                    } else if (homeLi == 3) {
                        var adrtHtml = '<div class="a300d_n mar10"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-1414753840758-6" class="ad_300_n"></div></div>';
                        adsSeq = 5;

                    } else if (homeLi == 11) {


                        rtHtml += '<div id="quizidblock" style="display:none;"><a href="/sports/ipl-2018/?ref=contest" title="Play Now"><img src="https://i10.dainikbhaskar.com/dainikbhaskar2010/img-mobile/IPL_2018/IPL-Quiz-img/IPL_Gyan_360x530.jpg" alt=""></a></div><div id="pollidblock" style="display:none;"><a href="/sports/ipl-2018/?ref=contest" title="Play Now"><img src="https://i10.dainikbhaskar.com/dainikbhaskar2010/img-mobile/IPL_2018/IPL-Quiz-img/360x530_Watch_Win_Hindi.jpg" alt=""></a></div>';
                        khelojeeto();

                    } else if (homeLi == 10) {
                        rtHtml += '<div class="a300d_n mar10"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-hp-1" class="ad_300_n"></div></div>';
                        adsSeq = 1;

                    } else if (homeLi == 18) {
                        rtHtml += '<div class="a300d_n mar10"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-hp-2" class="ad_300_n"></div></div>';
                        adsSeq = 2;

                    } else if (homeLi == 23) {
                        rtHtml += '<div class="a300d_n mar10"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-hp-3" class="ad_300_n"></div></div>';
                        adsSeq = 3;

                    }

                    if (idx == 1 && storyData[p].big_image == 1) {
                        var bigSHtml = renderHtml(storyData[p], 'bigstory');
                        $('.homeSection').prepend(bigSHtml);

                    } else if (pointer == 'TV') {
                        if (jQuery.inArray(storyData[p].id, viewedVideoIds) == -1) {
                            vdoCount++;
                            rtHtml += renderVideoHtml(storyData[p], 'video', vdoCount);
                            $('.homeBrief #videoWrapper').append(rtHtml);

                        }
                    } else if (pointer == 'NV') {
                        /*if(jQuery.inArray(storyData[p].id, viewedVideoIds) == -1){*/
                        /*vdoCount++;*/
                        rtHtml += renderVideoHtml(storyData[p], 'navratri', 0);
                        $('.homeBrief').append(rtHtml);
                        /*}*/
                    } else {
                        if (pointer == 'MVEODF' && 0) {
                            if (parseInt(p) == 0) {
                                var mveodfCount = 0;
                            }
                            if (jQuery.inArray(storyData[p].storyid, fetchedStories) == -1) {
                                mveodfCount++;
                                if (mveodfCount == 1) {
                                    storyData[p].img_type = 1;
                                    storyData[p].img = storyData[p].img.replace('116x90', '351x303');
                                    storyData[p].img = storyData[p].img.replace('112x80', '351x303');
                                }
                                if (mveodfCount <= 15) {
                                    rtHtml += renderHtml(storyData[p], 'main');
                                    sSeq++;
                                    $('.homeBrief').append(rtHtml);
                                }
                            }

                        } else {
                            rtHtml += renderHtml(storyData[p], 'main');
                            sSeq++;
                            $('.homeBrief').append(rtHtml);
                            if (pointer == 'XS' && p == 0) {
                                /*$('.homeBrief').append('<div style="padding:8px 0;clear:both;text-align:center;"><a href="https://m.bhaskar.com/?ref=arti"><img src="https://i10.dainikbhaskar.com/events/mbhaskar/arti1.gif" align="top" /></a></div>');*/
                            }
                        }
                        if (homeLi == 4) {
                            $('.homeBrief').append(adrtHtml);
                        }
                    }



                    if (pointer == 'XS') {
                        fetchedStories[p] = storyData[p].storyid;
                    }

                    if (adsSeq !== '') {
                        /* console.log('calling loadAds from custom data '+ adsSeq);*/
                        loadAds(adsSeq);
                    }

                    if (vdoCount == 5) {
                        break;
                    }
                }




            }



            if (rflTop && rflTopFlag && idx == 2) {
                console.log('RF Called');
                if (hload == 1) { var tmOut = 2000; } else {
                    var tmOut = 0;
                    $("#homeLi_1").after('<li class="notiHeight"><div class="mbh_notify_strip" id="notify_tab" style="display:none;"><div class="mbh_notify_left"> <span class="mbh_notify_sprit"></span> à¤¹à¤° à¤¬à¤¡à¤¼à¥‡ à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤•à¤¾ à¤…à¤²à¤°à¥à¤Ÿ </div><ul class="mbh_notify_right"><li class="mbh_notify_later"><a href="javascript:void(0)" onClick="hideTab();">Later</a></li><li class="mbhnotify_active"><a  href="javascript:void(0)" onClick="getNotification(\'home\');">Allow</a></li></ul><div class="clear"></div></div></li>');
                    if ((getSystemInfoNotification().browser == 'Chrome' || navigator.userAgent.indexOf("Chrome") != -1) || getSystemInfoNotification().browser == 'firefox') {
                        $("#notify_tab").show();
                        var nCounter = readCookieRealTime_N('notify_tab_counter');
                        if ((localStorage.getItem("_dbn_code") == 4 || localStorage.getItem("_dbn_code") == 2) || (nCounter != null && nCounter >= 0)) {
                            $("#notify_tab").hide();
                        }
                    }
                }
                setTimeout(createRasifalBox, tmOut);
                rflTopFlag = false;
            }



            $(".list-loader").addClass('pahide');
            if (idx == 4) {
                /*citylistall();*/
            }


            if (idx == 1) {
                if (pdRatesFlag) {
                    petrolDieselWgt('home');
                }
                checkAssets('bhaskarcss').then(homePageCall(2));
                $('.loader').hide();
            }
            /*if(isHanumanDay){ 
                if(idx == 2){
             $("#homeLi_2").after('<li style="width:100%; height:auto; margin:4px 0 10px;"><a href="https://m.bhaskar.com/?ref=hanuman-jayanti" style="width: 320px;margin: 0 auto;"><img src="https://i9.dainikbhaskar.com/dainikbhaskar2010/images/hanuman/hanuman320x70.gif" alt="" title="" width="320" height="70" /></a></li>');
                        }
            }*/

            if (idx == 4) {
                latestTmstamp = data.data.eodupdatetime;
                excNewStories = data.data.eod;
                /* checkAssets('bhaskarcss').then(homePageCall(3));*/
                $('.loader').hide();
                afterLoad(liveEvent_new);
            }
            srlFlag = true;
        });
    }

    if (readCookieRealTime('notifymelater')) {
        $("#notify_tab").hide();
    }
}


function getEODDateTime() {
    $.getJSON("https://appfeedlight.bhaskar.com/webfeed/ttl15m/dbmeodhighestctr/521/0/2/", function (data) {
        latestTmstamp = data.data.eodupdatetime;
        excNewStories = data.data.eod;
    });

}


function afterLoad(callback) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            callback();
        }
    }, 10);
}

/*  if(isBigPicture){
 var sSeq = 4;  
 }else{*/
var sSeq = 3;
var cSeq = 1;
/*}*/


$(document).ready(function () {

    //debugger;
    var curUrlB = window.location.pathname;
    var sUrlArrB = curUrlB.split('/');
    if (sUrlArrB[1] == "") {
        if (pdRatesFlag) {
            petrolDieselWgt('home');
        }
        var lstories = excStoriesId.split(',');
        var readStoriesCke = readCookieRealTime('viewedRecomm');
        var viewedEods = [];
        if (readStoriesCke != null && readStoriesCke != '') {
            viewedEods = readStoriesCke.split('^');
        }
        for (p in lstories) {
            if (jQuery.inArray(lstories[p], viewedEods) !== -1) {
                $('.' + lstories[p]).addClass('visitArticle');
            }
        }
        /*checkAssets('bhaskarcss').then(homePageCall(2));*/
        checkAssets('bhaskarcss').then(homePageCall(3));
        getEODDateTime();
        setInterval(loadNewStories, 1 * 60 * 1000);
    } else if (sUrlArrB[1] == "news") {
        if (sUrlArrB[2].indexOf('NAT-UTI-daily-petrol-diesel-price-news-and-updates-5633984-NOR') == 0) {
            petrolDieselWgt('article');
        }
        /*art_cat_id  is defined on php page*/
        /**viewedCategory**/
        var readcat = readCookieRealTime('viewedCat');
        if (readcat != 'null' && readcat != null && readcat != '') {
            var stories_ids = readcat.split(",");
            var isExists = stories_ids.indexOf(art_cat_id);
            if (isExists < 0) {
                readcat = readcat + ',' + parseInt(art_cat_id);
            }
        } else {
            readcat = art_cat_id;
        }
        createCookieRealTime('viewedCat', readcat, 1);
        /**viewedCategory**/
    }
});
var feedIdx = 4;
var srlFlag = true;
var feedArrLen = feedUrlArr.length;
var isNewStory = false;
var currEleId = '';
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var vdoFlag = 0;


(function (a) {
    a.expr[":"].onScreen = function (b) {
        var c = a(window), d = c.scrollTop(), e = c.height(), f = d + e, g = a(b), h = g.offset().top, i = g.height(), j = h + i;
        return h >= d && h < f || j > d && j <= f || i > e && h <= d && j >= f
    }
})(jQuery);

$(window).scroll(function () {

    // wait untill the css load 
    //if(!window.EXTCSS){  return; }

    if ($(window).scrollTop() > 350) {

        //debugger;
        isNewStory = true;
        var curUrl = window.location.pathname;
        var sUrlArr = curUrl.split('/');
        if (sUrlArr[1] == "") {
            var currElemnt = $('.mainLi:onScreen').attr('id');
            if (typeof currElemnt != 'undefined') { currEleId = currElemnt; }
            if ($("#home_widget").length > 0) {
                var totalLi = $(".homeBrief>li.mainLi").length;
                isOnView = $("#homeLi_" + (totalLi - 1)).isOnScreen();
                isOnView1 = $("#cityPopup").isOnScreen();
                if ((isOnView || isOnView1) && srlFlag && feedIdx <= feedArrLen) {
                    srlFlag = false;
                    checkAssets('bhaskarcss').then(homePageCall(feedIdx));
                    feedIdx++;
                }
            }
        }
    } else {
        isNewStory = false;
        $('.toastdiv').hide();
    }
    if (!$('#' + iframeId).isOnScreen() && vdoFlag == 1) {
        console.log($('.videoLi').isOnScreen()); console.log(vdoFlag);
        if (iOS) {
            $('#' + iframeId).attr('src', '').hide();
        } else {
            pauseVideoUltima(2);
        }
        vdoFlag = 0;
    }


    if (!$('#' + iframeId).isOnScreen() && vdoFlagv == 1) {
        console.log($('.videoLi').isOnScreen());
        pauseVideoUltima(2);
    }
});


function renderHtml(storyObj, section) {

    //alert('renderHtml');

    var mainLi = '';
    if (section == 'main') {
        homeLiIdx = homeLi;
        mainLi = 'mainLi';
    } else {
        homeLiIdx = section;
    }
    var liHtml = '';
    var vdoIcon = '';
    var OnClick = '';
    var homeHref = storyObj.link;
    var artFnameH = storyObj.file_name;
    var artFnameH1 = artFnameH.split(".");
    var artFname = artFnameH1[0];
    var hFullUrl = storyObj.file_name;
    var sId = storyObj.storyid;
    var newsUri = homeHref.split('/news/');
    if (typeof storyObj.cat_url !== 'undefined') {
        var setUrl = '/' + storyObj.cat_url + 'news/' + newsUri[1];
    } else {
        var setUrl = '/news/' + newsUri[1];
    }
    var catId = 521;/*Defined static to prevent error*/
    storyObj.link = storyObj.link.replace('/news/', '/' + storyObj.cat_url + 'news/');
    /*if (catId == 521) {
        var setUrl = '/news/' + artFnameH + '?ref=ht';
    }*/


    chId = 521;
    if (catId == 3322) {
        chId = 3322;
    }

    if (section == 'city') {
        var psseq = 200 + cSeq;
    } else {
        var psseq = sSeq;
    }
    var jsonData = "data-identi=\'{\"s\":\"" + storyObj.storyid + "\",\"c\":\"" + storyObj.channel_slno + "\",\"ct\":\"" + storyObj.catid + "\",\"u\":\"" + storyObj.link + "\",\"t\":\"" + storyObj.tracker + "\",\"m\":\"" + storyObj.datetime + "\",\"p\":\"" + storyObj.storydate + "\",\"w\":\"HP_NEW\",\"ps\":\"" + psseq + "\"}\'";

    var jsonVar = { 'sId': sId, 'artFname': artFname, 'setUrl': setUrl, 'onLoad': 0, 'chId': chId, 'isPopUp': 1, 'isramleela': 1 }

    if (storyObj.channel_slno == "1463" || storyObj.targetblank == '_blank') {
        OnClick = 'onclick="return identiClick(' + storyObj.storyid + ',\'' + storyObj.link + '\');"';
        var mLink = storyObj.link.replace('http://', 'https://');
    } else {
        OnClick = "onclick='return articleData(" + JSON.stringify(jsonVar) + ");'";

        OnClick = "";

        var mLink = storyObj.link;

        if (catId == 01) {
            var mLink = storyObj.url;  /** for UP election **/
        }

        mLink = mLink.replace('https://m.bhaskar.com', location.origin);

    }
    if (storyObj.video_flag == 1) {
        vdoIcon = '<strong class="videoflag_smal"></strong>';
    }
    var img_src = storyObj.img;

    var visitArticle = '';
    if (viewedStories.indexOf(sId) >= 0) {
        visitArticle = 'visitArticle';
    }
    if ((typeof storyObj.big_image !== 'undefined') && storyObj.big_image == 1) {
        if (storyObj.video_flag == 1) {
            vdoIcon = '<strong class="videoflag_big"></strong>';
        }
        liHtml += '<div id=" ' + sId + '" class="single_story ' + visitArticle + '" ' + jsonData + '>';
        liHtml += '<h2><a href="' + mLink + '"  ' + OnClick + '>' + storyObj.title + '</a></h2>';
        /*liHtml += '<div class="storyCat">' + storyObj.cat_name + '</div>';*/
        liHtml += '<div class="imgbox bigimg"><a href="' + mLink + '"  ' + OnClick + '> <img src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + img_src + '" alt="' + storyObj.title + '" title="' + storyObj.title + '" class="lazy" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"  />' + vdoIcon + '</a></div>';
        liHtml += '</div>';

    } else if (storyObj.img_type == 1) {
        liHtml += '<li id="homeLi_' + homeLiIdx + '" class="tempBold ' + mainLi + ' ' + visitArticle + ' ' + sId + '" ' + jsonData + '><div class="central">';
        liHtml += '<a href="' + mLink + '"  ' + OnClick + '>' + storyObj.title + '</a>';
        /*        liHtml += '<div class="storyCat">' + storyObj.cat_name + '</div>';*/
        liHtml += '<div class="firstimg"><a href="' + mLink + '"  ' + OnClick + '> <img src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + img_src + '" alt="' + storyObj.title + '" title="' + storyObj.title + '" class="lazy" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"  />' + vdoIcon + '</a></div>';
        liHtml += '</div></li>';
    } else if (storyObj.img_type == 2) {
        liHtml += '<li id="homeLi_' + homeLiIdx + '" class="tempNor ' + mainLi + ' ' + visitArticle + ' ' + sId + '" ' + jsonData + '><div class="central">';
        liHtml += '<a href="' + mLink + '"  ' + OnClick + '>' + storyObj.title + '</a>';
        if (section == 'newstory') {
            liHtml += '<div class="videoCon">'
            /*liHtml += '<div class="storyCat">'+storyObj.cat_name+'</div>';*/
            liHtml += '<div class="videoIcon eng">à¤¨à¤ˆ</div>';
            liHtml += '</div>';
        } else {
            /*  liHtml += '<div class="storyCat">' + storyObj.cat_name + '</div>';*/
        }
        liHtml += '<div class="firstimg"><a href="' + mLink + '"  ' + OnClick + '> <img src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + img_src + '" alt="' + storyObj.title + '" title="' + storyObj.title + '" class="lazy" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"  />' + vdoIcon + '</a></div>';
        liHtml += '</div></li>';
    } else if (storyObj.img_type == 5) {
        liHtml = '<li id="homeLi_' + homeLiIdx + '" class="thirdGrey ' + mainLi + ' ' + visitArticle + ' ' + sId + '" ' + jsonData + '><div class="central">';
        liHtml += '<a href="' + mLink + '"  ' + OnClick + '>' + storyObj.title + '</a>';
        /*liHtml += '<div class="storyCat">' + storyObj.cat_name + '</div>';*/
        liHtml += '<div class="thirdSection">';
        var imgArr = storyObj.images;
        for (q in imgArr) {
            if (q > 0) {
                vdoIcon = '';
            }
            liHtml += '<div class="thumb-img">';
            liHtml += '<a href="' + mLink + '"  ' + OnClick + '> <img src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + imgArr[q] + '" alt="' + storyObj.title + '" title="' + storyObj.title + '" class="lazy" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"  />' + vdoIcon + '</a>';
            liHtml += '</div>';
        }
        liHtml += '</div>';
        liHtml += '</div></li>';
    } else if (storyObj.img_type == 4) {
        if (storyObj.video_flag == 1) {
            vdoIcon = '<strong class="videoflag_big"></strong>';
        }
        var imgTag = '';
        var cusStyle = 'style="min-height:0px !important"';
        var cusStyleTitle = 'style="font-size:20px;line-height:28px !important"';
        if (img_src != '') {
            cusStyle = '';
            cusStyleTitle = '';
            imgTag = '<img src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + img_src + '" alt="' + storyObj.title + '" title="' + storyObj.title + '" class="lazy" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"  />' + vdoIcon;
        }
        liHtml += '<li id="homeLi_' + homeLiIdx + '" class="imgBig ' + mainLi + ' ' + visitArticle + ' ' + sId + '" ' + jsonData + '><div class="central">';
        liHtml += '<a href="' + mLink + '"  ' + OnClick + ' ' + cusStyleTitle + '>' + storyObj.title + '</a>';
        /* liHtml += '<div class="storyCat">' + storyObj.cat_name + '</div>';*/
        liHtml += '<div class="img350"  ' + cusStyle + '><a href="' + mLink + '"  ' + OnClick + '> ' + imgTag + '</a></div>';

        liHtml += '</div></li>';
    } else if (storyObj.img_type == 3 || storyObj.img_type == 6) {
        var imgTag = '';
        var cusStyle = 'style="min-height:0px !important"';
        var liClass = 'adjustHeight';
        if (img_src != '') {
            cusStyle = '';
            liClass = '';
            imgTag = '<span class="thumb101"><img src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + img_src + '" alt="' + storyObj.title + '" title="' + storyObj.title + '" class="lazy" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"  />' + vdoIcon + '</span>';
        }
        liHtml = '<li id="homeLi_' + homeLiIdx + '" class="' + mainLi + ' ' + visitArticle + ' ' + sId + ' ' + liClass + '" ' + jsonData + '><div class="central">';
        liHtml += '<a href="' + mLink + '"  ' + OnClick + '>' + imgTag;
        liHtml += '' + storyObj.title + '</a>';
        if (section == 'newstory') {
            liHtml += '<div class="videoCon">'
            /*  liHtml += '<div class="storyCat">'+storyObj.cat_name+'</div>';*/
            liHtml += '<div class="videoIcon eng">à¤¨à¤ˆ</div>';
            liHtml += '</div>';
        } else {
            /*liHtml += '<div class="storyCat">' + storyObj.cat_name + '</div>';*/
        }
        liHtml += '</div></li>';
    } /*else if (storyObj.img_type == 6) {
        liHtml = '<li id="homeLi_' + homeLiIdx + '" class="' + mainLi + ' ' + visitArticle + ' ' + sId + '" ' + jsonData + '><div class="central">';
        liHtml += '<a href="' + mLink + '"  ' + OnClick + '><span class="thumb135"> <img src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + img_src + '" alt="' + storyObj.title + '" title="' + storyObj.title + '" class="lazy" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"  />' + vdoIcon + '</span>';
        liHtml += '' + storyObj.title + '</a>';
        liHtml += '<div class="storyCat">' + storyObj.cat_name + '</div>';
        liHtml += '</div></li>';
    }*/
    if (section == 'main') {
        homeLi++;
    }
    return liHtml;
}

var device_id = 2;
var iframeId = "dataIframe";
$(document).on("click", ".videoContainer,.videoTitle", function () {
    var videoWidth = $('.videoContainer').width();
    var videoHeight = $('.videoContainer').height() + 32;
    var videoPos = $(this).parent().parent().find('.videoContainer').position().top - 18;
    if (iOS) {
        setTimeout(function () {
            $('#' + iframeId).css({ 'top': videoPos, 'width': videoWidth, 'height': videoHeight }).show();
        }, 300);
    } else {
        $('#' + iframeId).css({ 'top': videoPos, 'width': videoWidth, 'height': videoHeight }).show();
    }
    $(this).parent().parent().addClass('videoAuto');
});

function changeDSrc(src, title, vidId, imgSrc, views, fshare, mtitle, filename, durl, cat_id, sec_id, prov_id, vuserid, veditor_name, city, created, prov_sec, sec_track, vdoPos, deliveryBaseURLNew, webm_status, m3u8_status, mp4_status, videoUrlDefault) {
    vdoFlag = 1;
    if (iOS) {
        device_id = 4; document.getElementById(iframeId).src = '';
    } $('#' + iframeId).hide();
    // var durl=durl.replace('https','http');
    src = src.replace('http://', 'https://');
    var ifsrc = $('#' + iframeId).attr('src');
    if (device_id == 1 || device_id == 4 || ifsrc == '') {
        document.getElementById(iframeId).src = src;
    } else {
        var iframeWin = document.getElementById(iframeId).contentWindow;
        mp4_status = deliveryBaseURLNew != "" ? 1 : "";
        var data = title + '-::-' + durl + '-::-' + vidId + '-::-' + imgSrc + '-::-' + fshare + '-::-' + cat_id + '-::-' + sec_id + '-::-' + prov_id + '-::-' + vuserid + '-::-' + veditor_name + '-::-' + city + '-::-' + created + '-::-' + prov_sec + '-::-' + sec_track + '-::-' + deliveryBaseURLNew + "-::-" + webm_status + "-::-" + m3u8_status + "-::-" + mp4_status + "-::-" + videoUrlDefault;

        iframeWin.postMessage(data, "https://ultima.bhaskar.com/");
    }
    eventTracker(vidId, vdoPos);
    return false;
}


function setHeightFromTop(typ) {
    $('.mpVisioneriesCls').attr('data-id', typ);
    if (typ == 2) {
        setTimeout(function () {
            $('.mpVisioneriesCls').css('top', ($('#mpBrands').offset().top - 50));
            $('.mpVisioneriesCls').css('display', 'block');
        }, 150);
    } else if (typ == 3) {
        setTimeout(function () {
            $('.mpVisioneriesCls').css('top', ($('#mpBrands').offset().top - 75));
            $('.mpVisioneriesCls').css('display', 'block');
        }, 150);
    }
    else if (typ == 4) {
        var obj = $('.ipl_entryvideo');
        var videoWidth = '332';
        var videoHeight = '187';
        var videoPos = obj.position().top;
        if (iOS) {
            setTimeout(function () {
                $('#' + iframeId).css({ 'top': videoPos, 'width': videoWidth, 'height': videoHeight }).show();
            }, 300);
        } else {
            $('#' + iframeId).css({ 'top': videoPos, 'width': videoWidth, 'height': videoHeight }).show();
        }
        setTimeout(function () {
            $('#' + iframeId).show();
        }, 300);
    }
}

function eventTracker(video_id, event_pos) {
    var d = new Date(), timestamps = d.getTime();
    var dataTrack = 'channel=521&type=6&video_id=' + video_id + '&event_pos=' + event_pos + '&domain_type=m';
    var dTrack = dataTrack + '&' + timestamps;
    var adsUrl = 'https://ultima.bhaskar.com/tracking/event_tracking.php?v1';
    var http = new XMLHttpRequest();
    http.open("POST", adsUrl, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function () { }
    http.send(dTrack);
}


function renderVideoHtml(storyObj, section, idx) {
    var visitArticle = '';
    /*if(idx==0){
        viewedVideos = [];
        var viewedVideoCookie = readCookieRealTime('viewedHVideo');
        if (viewedVideoCookie != null && viewedVideoCookie != '') {
            viewedVideos = viewedVideoCookie.split(',');
        }
    }
    var visitArticle = '';
    if (viewedVideos.indexOf(storyObj.id) >= 0) {
        visitArticle = 'visitArticle';
    }*/
    var video_url = storyObj.video_url;
    var imgsrc = storyObj.image_path;
    if (section == 'videolisting') {
        homeLiIdx = idx;
        var liId = 'listing_' + homeLiIdx;
        video_url = video_url.replace('/videos-m/', '/videosnxt-m-blist/');
        var vdoTracker = 'videos-m-blist';
        imgsrc = imgsrc.replace('99x74', '351x170');
    } else {
        homeLiIdx = homeLi;
        var liId = 'homeLi_' + homeLiIdx;
        if (section == 'navratri') {
            video_url = video_url.replace('/videos-m/', '/videosnxt-m-ramleela/');
            var vdoTracker = 'videos-m-ramleela';
        } else {
            video_url = video_url.replace('/videos-m/', '/videosnxt-m-hws/');
            var vdoTracker = 'videos-m-hws';
        }
        imgsrc = imgsrc.replace('99x74', '351x170');
    }
    var mLink = storyObj.deliveryBaseURL;
    var fshare = 'https://www.dbvideos.in' + storyObj.categoryURL + storyObj.filename + '.html';
    var video_title = storyObj.video_title;
    video_title = video_title.replace(/'/g, "");
    var meta_title = storyObj.meta_title;
    meta_title = meta_title.replace(/'/g, "");
    var OnClick = 'onclick="setHeightFromTop(1); return changeDSrc(\'' + video_url + '\',\'' + video_title + '\',' + storyObj.id + ',\'' + imgsrc + '\',\'' + storyObj.views + '\',\'' + fshare + '\',\'' + meta_title + '\',\'' + storyObj.filename + '\',\'' + storyObj.deliveryBaseURL + '\',' + storyObj.category_id + ',' + storyObj.section_id + ',' + storyObj.video_provider + ', ' + storyObj.userid + ', \'' + storyObj.editor_name + '\',' + storyObj.city + ',\'' + storyObj.created_datetime + '\',' + storyObj.prov_sec + ',\'' + vdoTracker + '\',\'' + idx + '\', \'' + storyObj.deliveryBaseURLNew + '\', \'' + storyObj.webm_status + '\', \'' + storyObj.m3u8_status + '\', \'' + storyObj.mp4_status + '\', \'' + storyObj.videoUrlDefault + '\',\'' + section + '\');"';
    var mainLi = 'mainLi';
    /*var ultimaUrl = storyObj.video_url.replace("/videos-m/", "/videos-m-hws/");*/
    var vdoIcon = '<strong class="videoflag_mid"></strong>';
    var liHtml = '';
    if (section == 'navratri') {
        liHtml += '<li id="' + liId + '" style="background: #e0e0e0;" class="tempNor videoLi ' + mainLi + '  vid_' + storyObj.id + ' ' + visitArticle + '" ><div class="central">';
    } else {
        liHtml += '<li id="' + liId + '" class="tempNor videoLi ' + mainLi + '  vid_' + storyObj.id + ' ' + visitArticle + '" ><div class="central">';
    }
    if (section == 'navratri') {
        liHtml += '<a href="https://dbvideos.bhaskar.com/trending?ref=ramleela" target="_blank" style="display:block;text-align:center;padding:0 0 5px 0;width100%"><img src="https://i10.dainikbhaskar.com/events/mbhaskar/aaj-ki-ramleela-mobile-banner.jpg" align="top" /></a>';
    }
    liHtml += '<a href="javascript:void(0);"  ' + OnClick + ' class="videoTitle">' + storyObj.video_title + '</a>';
    liHtml += '<div class="videoCon">';
    if (section != 'navratri') {
        /* liHtml += '<div class="storyCat">'+storyObj.cat_name+'</div>';*/
    }
    if (section != 'videolisting') {
        liHtml += '<div class="videoIcon">à¤µà¥€à¤¡à¤¿à¤¯à¥‹</div>';
    }
    liHtml += '</div>';
    liHtml += '<div class="videoContainer">';
    liHtml += '<div class="firstimg" id="DBTV_total_' + homeLi + '"><a href="javascript:void(0);" ' + OnClick + '> <img src="/pagespeed_static/1.JiBnMqyl6S.gif" data-pagespeed-lazy-src="' + imgsrc + '" alt="' + storyObj.video_title + '" title="' + storyObj.video_title + '" class="lazy" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);"  />' + vdoIcon + '</a></div>';
    liHtml += '<span class="views"> ' + storyObj.views + '</span><span class="duration"> ' + storyObj.duration + '</span>';
    liHtml += '</div>';
    liHtml += '</li>';
    if (idx == 1 && section == 'videolisting') {
        liHtml += '<div class="a300d_n"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-index-0-6854758" class="ad_300_n"></div></div>';
    }
    else if (idx == 3 && section == 'videolisting') {
        liHtml += '<div class="a300d_n"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-index-1-6854758" class="ad_300_n"></div></div>';
    }
    else if (idx == 6 && section == 'videolisting') {
        liHtml += '<div class="a300d_n"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-index-2-6854758" class="ad_300_n"></div></div>';
    }
    else if (idx == 9 && section == 'videolisting') {
        liHtml += '<div class="a300d_n"><span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-index-3-6854758" class="ad_300_n"></div></div>';
    }
    if (section != 'videolisting') {
        homeLi++;
    }
    return liHtml;
}
var videoListArr = [];
function videoCatListing(Data) {
    var MetaData = '';
    MetaData.title = '';
    var rtHtml = '';
    if (vIdx == 0) {
        var strHtml = '<h2 class="pgheading">DB Videos</h2><ul id="homeView_6854758" class="videoCatList homeBrief"><iframe width="100%" height="200px" align="middle" scrolling="no" src="" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" msallowfullscreen="true" class="" id="dataIframeList" style="background-color:#000000"></iframe></ul>'
        $("#da_mainwrapper").empty();
        var sindex = findIndex2D(hSlider, "url", 'videos');
        sindex = sindex + 1;
        $("#idx_" + sindex).html(strHtml);
        $(".loader").hide();
        $("#recommend").hide(); $("#bhaskar-cric-entry-widget").hide(); $('.add_vitt_mantri_comment').remove();
        var viewedVideoIds = [];
        var viewedVideoCookies = readCookieRealTime('viewedHVideo');
        if (viewedVideoCookies != null && viewedVideoCookies != '') {
            viewedVideoIds = viewedVideoCookies.split(',');
        }
    }
    for (p in Data) {
        if ((jQuery.inArray(Data[p].id, videoListArr) == -1) && (jQuery.inArray(Data[p].id, viewedVideoIds) == -1)) {
            vIdx++;
            rtHtml += renderVideoHtml(Data[p], 'videolisting', vIdx);
            videoListArr.push(Data[p].id);
        }
    }
    $('.videoCatList').append(rtHtml);
}


$(document).on('click', '.indepClose', function () {
    sliderpopupEnable = false;
    $('.navbar').removeClass('navbar-hidden');
    $("#tpnav").show();
    setUrl("/independence-day-2017/", "Independence Day 2017: Celebrate 70th Independence Day with Dainik Bhaskar");
    var homeMetaArr = hWidget['homeMetaArr']['home'];
    document.title = homeMetaArr['title'];
    $("#homeIcn").addClass("swiper-pagination-bullet-active");
    $('#da_mainwrapper').empty();
    $('#articlePopup').hide();
    $('.navbar').removeClass('zindx');
    $('#main_wrapper').removeClass('marginTop');
    $('body').removeClass('fixheight');
    $('body').removeClass('overflowHide');
    $("#artPop").html('');
    pauseVideoUltima(1);
});
function openCityPopUp() {
    var popUpHtml = '<div id="cityPopup" class="runPopup">';
    popUpHtml += '<div class="cityBg"></div>';
    popUpHtml += '<div class="cityHeading"><i></i>à¤²à¥‹à¤•à¤² à¤–à¤¬à¤°à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤…à¤ªà¤¨à¤¾ à¤¶à¤¹à¤° à¤šà¥à¤¨à¥‡à¤‚</div>';
    popUpHtml += '<form class="personalSearch" onsubmit="return false;">';
    popUpHtml += '<input type="text" class="citySearch" autocomplete="off" placeholder="e.g. Agra" id="temSearch" />';
    popUpHtml += '<span class="searchBtn"></span>';
    popUpHtml += '<div id="cities-list"></div>';
    popUpHtml += '<ul id="menuciti" class="cityDropdown" style="display:none;">';
    try {
        //setTimeout(function(){
        var popUpHtmlLi = '';
        $.ajax({
            url: feedUrl + "/citylist/",
            dataType: 'json',
            success: function (resultdata) {
                window.cityList = resultdata.city;
                for (p in cityList) {
                    if (cityList[p].label != 'Noida') {
                        popUpHtmlLi += '<li onClick="getNCity(' + cityList[p].category_id + ',\'' + cityList[p].label + '\');"><span>' + cityList[p].label + '</span></li>';
                    }
                }
                $('.cityDropdown').append(popUpHtmlLi);
            }
        });

        //},500);
    } catch (e) {
        console.log('Error :' + e.message);
    }
    popUpHtml += '</ul>';
    popUpHtml += '<div class="cityWrapper">';
    popUpHtml += '</div>';
    /*popUpHtml += '<div class="cityBtn" onClick="citySubmit();">Save</div>';*/
    popUpHtml += '</form>';
    popUpHtml += '</div>';
    $('#home_widget .homeBrief #cityPopupWrapper').append(popUpHtml + '<div id="cityTabs" class="citiesTab"></div><div class="bottomStrip"><div class="lightBlue"></div></div>');
    if ($('.cityWrapper div').length < 3) {
        $('.personalSearch').show();
    }
    srlFlag = true;
    /*winW= $(window).width();
     winHt= $(window).height();
     $('#cityPopup,.overlayPopup').show();
     $('body').addClass('fixheight');
     var cityPop=$('#cityPopup').outerWidth()
     var cityHeight=$('#cityPopup').innerHeight()
     var cityX=winW/2-cityPop/2;
     var cityY=winHt/2-cityHeight/2;
     $('#cityPopup').css({"left":cityX,"top":cityY});
     $('.cityWrapper').on('click','span',function(){
     $(this).parent().remove();
     });
     $('.overlayPopup').on('click',function(){
     $(this).hide();
     $('#cityPopup').hide();
     $('body').removeClass('fixheight');
     });*/
    $('.cityWrapper').on('click', 'span', function () {
        $(this).parent().remove();
        if ($('.cityWrapper div').length < 3) {
            $('.personalSearch').show();
        }
    });
}

$(document).on("keyup", '#temSearch', function () {
    $('#menuciti').show();
    filterCity($(this).val(), 'ul#menuciti li', '#cities-list');
    /* filterSources($(this).val(), 'ul#cityMenu li > ul > li', '#target-cities');*/
    if ($(this).val() <= 0) {
        $('#menuciti').hide();
    } else {
        $('#menuciti').show();
        /*$('#cities-list').show();*/
    }
});

function getNCity(city_id, city_name) {
    var ctiFlag = true;
    $('.cityWrapper .citiesName').each(function () {
        if ($(this).attr("data-id") == city_id) {
            ctiFlag = false;
        }
    });
    if (ctiFlag) {
        if ($('.cityWrapper .citiesName').length < 3) {
            $('.cityWrapper').append('<div class="citiesName" data-id="' + city_id + '"> ' + city_name + '<span>x</span></div>');
            if ($('.cityWrapper .citiesName').length == 3) {
                $('.personalSearch').hide();
                $('.runPopup').addClass('bottomRadius');
                $('.bottomStrip').show();
            }
        }
    }
    $('#temSearch').val('');
    $('#menuciti').hide();
    citySubmit();
}
function filterCity(myVal, felem, target) {
    var input, filter, ul, li, a, i;
    input = document.getElementById('temSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("menuciti");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('span')[0].innerHTML.toUpperCase();
        if (a.indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

}
function citySubmit() {
    cSeq = 1; /*reinitialize*/
    var cityIdArr = [];
    var cityNameArr = [];
    var cityIds = '';
    var cityId = '';
    var cityName = '';
    var cityNames = '';
    $('.citiesName').each(function (i) {
        cityIdArr[i] = $(this).attr('data-id');
        cityNameArr[i] = $(this).html().substring(0, $(this).html().indexOf('<span>'));
        cityId = $(this).attr('data-id');
        cityName = $(this).html().substring(0, $(this).html().indexOf('<span>'));
        var idx = i + 1;
        loadCityHtml(idx, cityId, cityName);
    });
    if ($('.cityWrapper .citiesName').length == 3) {
        $('.cityBtn').hide();
    }
    addTabsClass();
    cityIds = cityIdArr.join(',');
    createCookieRealTime('savedCitiesId', cityIds, 365);
    cityNames = cityNameArr.join(',');
    createCookieRealTime('savedCitiesName', cityNames, 365);
    /*$.getJSON("http://appfeedlight1.bhaskar.com/webfeed/dbmcitywisestories/521/5622/", function(data){
     
     });*/
    /*$('body').removeClass('fixheight');*/

}

function getCityWiseData(CIds, CNames) {
    cSeq = 1; /*reinitialize*/
    if ($('.cityWrapper .citiesName').length == 3) {
        $('.personalSearch').hide();
    }
    var idx = 0;
    CIds = CIds.split(',');
    CNames = CNames.split(',');
    var selectedCityH = '';
    for (p in CIds) {
        idx = parseInt(p) + 1;
        loadCityHtml(idx, CIds[p], CNames[p]);
        selectedCityH += '<div class="citiesName" data-id="' + CIds[p] + '" style="display:none;"> ' + CNames[p] + '<span>x</span></div>';
    }
    $('.cityWrapper').append(selectedCityH);
    $('.runPopup').addClass('bottomRadius');
    $('.bottomStrip').show();
    addTabsClass();
}

function loadCityHtml(idx, cityId, cityName) {
    $(".cityWrapper").find("[data-id='" + cityId + "']").hide();
    var tabnav = '';
    if (idx == 1) {
        $('.citiesTab').html('<span class="addCity" onClick="addCity();"> + </span><ul class="cityTab"></ul>');
    }
    tabnav = '<li rel="ctab' + idx + '">' + cityName + '<span class="cityCross" data-id="' + cityId + '">x</span></li>';
    $('.cityTab').append(tabnav);
    var xClass = '';
    if (idx == 1) {
        xClass = 'firstTab';
    }
    $('.citiesTab').append('<div id="ctab' + idx + '" class="ctab' + idx + ' cityNone ' + xClass + '"></div>');
    $.getJSON("https://appfeedlight.bhaskar.com/webfeed/ttl15m/dbmcitywisestories/521/" + cityId + "/", function (data) {
        var storyData = data.data.story;
        if (storyData != '') {
            for (p in storyData) {
                var rtHtml = '';
                rtHtml = renderHtml(storyData[p], 'city');
                $('.ctab' + idx).append(rtHtml);
                cSeq++;
            }
        } else {
            $('.ctab' + idx).html('<div class="blankCity">à¤‡à¤¸ à¤¶à¤¹à¤° à¤•à¥€ à¤–à¤¬à¤°à¥‡à¤‚ à¤…à¤­à¥€ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¤‚</div>');
        }
    });
    $('.cityTab li:first-child').addClass('activeCity');
}

$(document).on('click', '.cityTab li', function () {
    $('.cityTab li').removeClass('activeCity');
    $(this).addClass('activeCity');
    $('.cityNone').hide();
    var activeTab = $(this).attr('rel');

    $('.' + activeTab).show()
});




function getAstroData(event, zSignVar) {
    if (event.type == 'click') {
        createCookieRealTime('todayRsfl', zSignVar, 30);
        console.log(zSignVar);
    } else {
        $('.rashifalHome').addClass('rplaceBig');
    }
    $('#results_data').prepend('<div class="loader-wrap"></div>');
    var ajax_url = feedUrl + '/Sunsigns/3322/' + zSignVar.toLowerCase() + '/daily/';
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: ajax_url,
        data: {},
        beforeSend: function (showloader) {
            $('#ajaxloader1').css('display', 'block');
        },
        success: function (response) {
            var comdata = response.data;
            if (comdata == "") {
                var htmlContent = '<div class="rashiMain"> <span class="rTxt">' + zSignVar.toUpperCase() + '</span></div>';
                $('#results_data').html(htmlContent);
            }
            else {
                var astroEntry = '<a target="_blank" href="https://religion.bhaskar.com/jyotish/rashifal/astrology-services/?ref=ast-m2"><img src="https://i10.dainikbhaskar.com/dainikbhaskar2010/astrology/astro-home-article.png"></a>';
                var htmlContent = '<div class="rashiMain">' +
                    '<span class="rTxt">' + zSignVar.toUpperCase() + ' (' + comdata[0].rss_sign + ')' + '</span><div class="rashiDropdown"><span>à¤°à¤¾à¤¶à¤¿ à¤¬à¤¦à¤²à¥‡à¤‚ </span></div></div><article class="rText">' + comdata[0].rss_desc + '</article><div class="rashiAur"><span>à¤”à¤° à¤ªà¤¢à¤¼à¥‡</span></div>' + astroEntry;
                $('#results_data').html(htmlContent);
            }

        },
        complete: function () {
            $('#ajaxloader1').css('display', 'none');
        }
    });
}

function createRasifalBox() {
    if (rflTop) {
        console.log($('#homeLi_0').length);
        $('#homeLi_0').after('<div id="rfWdgt"><div class="loader-wrap"></div></div>');
    } else {
        $('#rfWdgtWrapper').append('<div id="rfWdgt"><div class="loader-wrap"></div></div>');
    }
    $.get("https://" + window.location.hostname + "/DemorashifalWidget/?v3", function (data) {
        $('#rfWdgt').html(data);
        var myhoroscope = readCookieRealTime('todayRsfl');
        if (myhoroscope != null) {
            $('.rDropdown').hide();
            $('.rashifalH2,.rashifalBox1').hide();
            getAstroData('', myhoroscope);
            $('.rashifalInner').show();
        }
        var dropWidth = $('.rashifalHome').width();
        $(".rashifalBox1").unbind('click').on('click', '.rashiDropdown', function () {
            var dropPos = $('.rashifalBox1').position().top + $('.rashifalBox1').height();
            $('.rDropdown').toggle();
            $(this).toggleClass('rArrow');
            $('.rDropdown').css({ 'top': dropPos, 'width': dropWidth });
        });
        $('#results_data').on('click', '.rashiDropdown', function () {
            $('.rDropdown').toggle();
            $(this).toggleClass('rArrow');



        });
        $(document).on('click', '.r25', function () {
            var title = $(this).attr('title');
            $('.rDropdown').hide();
            $('.rashifalH2,.rashifalBox1').hide();
            $('.rTxt').text(title);
            $(this).attr(title);
            $('.rashifalInner').show();
            $('.rashifalHome').addClass('rplaceBig');
            $('.rashifalInner .rashiAur').show();
            $('.rText').removeClass('rMaxheight');
        });

        $("#results_data").on('click', '.rashiAur', function () {
            $('.rText').addClass('rMaxheight');
            $(this).hide();
            dataLayer.push({
                'event': 'Ev_Custom',
                'ev_category': 'HP_Events',
                'ev_action': 'click',
                'ev_label': 'Read_More_Religion',
            });
        });

        /*$("#tabs li a").append('<span class="tabCircle"></span>');*/
    });
}

function homepagepoll() {

    if (pollFeedData === '') {
        var pollFeedUrl = feedUrl + "/ttl10m/poll/521/single/0/10/";
        /*var pollFeedUrl = feedUrl+"/poll/521/single/?status=1";*/
        $.getJSON(pollFeedUrl, function (resultData) {
            pollResultData = resultData;
            pollFeedData = resultData;

            add_poll_after_rec(pollFeedData);
        });
    } else {
        pollResultData = pollFeedData;
        add_poll_after_rec(pollFeedData);
    }
}

function createPollBox() {
    $('#home_widget .homeBrief').append('<div id="quizAds" class="recm_quiz home_poll"></div>');
    homepagepoll();
}





/* Rashifal Code */
function loadRashifalTpl(event, selected) {
    event.preventDefault();
    menudown();
    var childno = $(event.target).parent("li").index();
    childno += 1;
    $('.swipe-wrap-home, #home_slider').css({ 'height': 0, 'overflow': 'hidden' });
    $("#da_mainwrapper").show();
    $(".list-loader").addClass('pahide');
    $(".loader").show();
    $(".mymenu_slide ul li").removeClass("swiper-pagination-bullet-active");
    $.get("https://" + window.location.hostname + "/jeevan-mantra/jyotish/rashifal/?mpwa_rash=1", function (data) {

        $("#da_mainwrapper").html(data.htmlTpl);
        $("#da_mainwrapper").prepend('<div class="adHolder" style="text-align: center;"> <span class="mb_ads_title_new">Advertisement</span><div id="div-gpt-ad-index-0"></div> </div>');
        $(".loader").hide();
        setUrl("/jeevan-mantra/jyotish/rashifal/?Bhaskar-JMsectiondrop-Religion", "");
        if (typeof selected != 'undefined' && selected == 1) {
            $(".tab li:nth-child(" + childno + ")").click();
        }
        $(".overlay").remove();

        var metaTitle = $('title').html();
        var metaDesc = $("meta[name=description]").val();
        analytics_func_ajax("/jeevan-mantra/jyotish/rashifal/?Bhaskar-JMsectiondrop-Religion", 'down', 'Aaj Ka Rashifal | Today Horoscope in Hindi | à¤°à¤¾à¤¶à¤¿à¤«à¤² 2016-17', '', 1, '', 0, 0, 0);
        realtimeHome({ title: metaTitle, description: metaDesc });
        comscore(1);
        comscoreAjaxCall();

        loadRashifalAd();
    }, "json");

}
/*$(document).on("click",".rashifal h3.mb_heading",function(e){
          e.preventDefault();
      loadRashifalTpl(e);
      window.scrollTo(0,0);
});*/

$(document).on("click", ".raashifal_main .list ul li a,.ank_rashifal .list ul li a, ul.order_link li a", function (e) {
    e.preventDefault();

    window.scrollTo(0, 0);
    $('.swipe-wrap-home, #home_slider').css({ 'height': 0, 'overflow': 'hidden' });
    /*$("#home_widget").hide();*/
    $("#da_mainwrapper").show();
    $(".list-loader").addClass('pahide');
    $(".loader").show();


    var target = $(this).attr('href');

    if (target.indexOf('/jyotish/') == -1) {
        target = target.replace("jeevan-mantra/", "jeevan-mantra/jyotish/");
    }

    url = target + "?mpwa_rash=1";
    $.get(url, function (data) {
        $("#da_mainwrapper").html(data.htmlTpl);
        $("#da_mainwrapper").prepend('<div class="adHolder" style="text-align: center;"> <span class="mb_ads_title_new" >Advertisement</span><div id="div-gpt-ad-index-0"></div> </div>');
        $(".loader").hide();
        setUrl(target, "");

        /*tracking code  */
        /*var currentArtTitle=catName;*/

        var ArtlUpdated = '';
        var Artflag_v = 1;
        var tracknumArtSlides = '';
        var item = {};

        var metaTitle = data.metaItem.title;
        var metaDesc = data.metaItem.description;
        analytics_func_ajax(target, 'down', metaTitle, ArtlUpdated, Artflag_v, tracknumArtSlides, 0, item, 0);
        realtimeHome({ title: metaTitle, description: metaDesc });
        comscore(1);
        comscoreAjaxCall();
        /*tracking code  */
        loadRashifalAd();
        console.log("rashifal data loaded success");
    }, "json");

});


$(document).ready(function () {
    setTimeout(function () {
        $('#home_slider #idx_0').css('transform', 'inherit');
    }, 1000);
    $(document).on("click", ".tab li", function () {
        $('.tab li').removeClass('active')
        $(this).addClass('active')
        $('.secondebox').hide();
        var curTab = $(this).attr('rel');
        $("#" + curTab).show();
    });

});

$(document).ready(function () {

    $(document).on("click", ".nsub", function () {
        $("#menu-sub-list").slideToggle()
        $(this).toggleClass("active");
    });

    $(document).on("click", "#menu-sub-list li", function () {
        $('#menu-sub-list li.active').removeClass('active');
        $(this).addClass('active');
    });

    if ($('.rashi_content').length) {
        var position = $('.rashi_content').position().top;
        var height = $(window).height() - position;

        $('.rashi_content').css('min-height', height);
    }
});

/*$(document).on('click',' .smb_readhome a',function(e){
    e.preventDefault();
    $(this).parent().hide();
    $('#results_data').removeClass('rashifalPara'); 
    dataLayer.push({
        'event': 'Ev_Custom',
        'ev_category': 'HP_Events',
        'ev_action': 'click',
        'ev_label': 'Read_More_Religion',
   });                                           
});*/
/* Rashifal Code */



$(document).on('click', '.homeBrief li', function () {
    if (!$(this).hasClass('videoLi')) {
        $(this).addClass('visitArticle');
    }
});
$(document).on('click', '.cityCross', function (e) {
    e.stopPropagation();
    var ctId = $(this).attr('data-id');
    var tbId = $(this).parent('li').attr('rel');
    $(this).parent('li').remove();
    $('#' + tbId).remove();
    $(".cityWrapper").find("[data-id='" + ctId + "']").remove();
    if ($('.cityTab li').length == 0) {
        $('.citiesTab').html('');
        $('.bottomStrip').hide();
    }
    if ($('.cityTab li').length < 3) {
        $('#temSearch').show();
        $('.cityBtn').show();
    }
    $('.cityTab li:first').addClass('activeCity');
    $('.citiesTab .cityNone:first').addClass('firstTab').show();
    addTabsClass();
    $('.personalSearch').show();
    var citiIdArr = [];
    var citiNameArr = [];
    var citiIds = '';
    var citiNames = '';
    $('.citiesName').each(function (i) {
        citiIdArr[i] = $(this).attr('data-id');
        citiNameArr[i] = $(this).html().substring(0, $(this).html().indexOf('<span>'));
    });
    citiIds = citiIdArr.join(',');
    createCookieRealTime('savedCitiesId', citiIds, 365);
    citiNames = citiNameArr.join(',');
    createCookieRealTime('savedCitiesName', citiNames, 365);
    $('.runPopup ').removeClass('bottomRadius');
});

function addTabsClass() {
    $('.cityTab').removeClass('sTab').removeClass('dbTab').removeClass('allTab');
    $('.addCity').hide();
    if ($('.cityTab li').length == 1) {
        $('.cityTab').addClass('sTab');
        $('.addCity').show();
    } else if ($('.cityTab li').length == 2) {
        $('.cityTab').addClass('dbTab');
        $('.addCity').show();
    } else if ($('.cityTab li').length == 3) {
        $('.cityTab').addClass('allTab');
    }
}

function addCity() {
    $('.personalSearch').show();
    $('.runPopup').removeClass('bottomRadius');
}

var totalNewStories = 0;
var newStoryHtml = '';
function loadNewStories() {
    if (typeof isPageCheck != 'undefined' && isPageCheck == 'home') {
        var feedUrlNS = feedUrl + '/ttl15m/dbmnewstories/521/' + latestTmstamp + '/' + excNewStories + '/';
        $.getJSON(feedUrlNS, function (data) {
            var storyData = data.data.story;
            var fdata = data.data;
            if (storyData != '') {
                if (isNewStory) {
                    $('.toastdiv').show();
                }
                latestTmstamp = fdata.eodupdatetime;
                /*storyData = storyData.reverse();*/
                totalNewStories = totalNewStories + storyData.length;
                var toastMsg = totalNewStories + ' New Stories';
                if (totalNewStories <= 1) {
                    toastMsg = totalNewStories + ' New Story';
                }
                $('.toastdiv').html(toastMsg);
                excNewStories = fdata.eod;
                for (p in storyData) {
                    var nsHtml = renderHtml(storyData[p], 'newstory');
                    /*$('.homeBrief').prepend(nsHtml);*/
                    newStoryHtml = newStoryHtml + nsHtml;
                }
            }
        });
    }
}

$('.toastdiv').on('click', function () {
    $(this).hide();
    $(newStoryHtml).insertAfter('#' + currEleId);
    newStoryHtml = '';
    totalNewStories = 0;
    /*$('html, body').animate({ scrollTop: 0 ,speed : 200}); */
});


$.fn.isOnScreenImgID = function (x, y) {
    if (x == null || typeof x == 'undefined')
        x = 1;
    if (y == null || typeof y == 'undefined')
        y = 1;
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + window.outerHeight;
    var height = this.outerHeight();
    var width = this.outerWidth();
    if (!width || !height) {
        return false;
    }
    var bounds = this.offset();
    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height;
    var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    if (!visible) {
        return false;
    } else {
        var deltas = {
            top: Math.min(1, (bounds.bottom - viewport.top) / height),
            bottom: Math.min(1, (viewport.bottom - bounds.top) / height),
            left: Math.min(1, (bounds.right - viewport.left) / width),
            right: Math.min(1, (viewport.right - bounds.left) / width)
        };
        var visivlemid = ((deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y);
        if (visivlemid) {
            return true;
        } else {
            return false;
        }
    }
};

function ideIngestionCall(data, event_type) {
    if (isGdprCnt == 'YES') { return; }
    jsonObj = [];
    var bhaskarUID = readCookieRealTime('bhaskarUUID');
    $.each(data, function (key, item) {
        item.rf = window.location.href;
        item.e = event_type;
        item.ui = bhaskarUID;
        jsonObj.push(item);
    });
    $.ajax({
        url: 'https://realtime.bhaskar.com/realtime_identification_new.php',
        data: { data: JSON.stringify(jsonObj) },
        crossDomain: true,
        type: "POST"
    });
}

/*article impression*/
var arrIdentification = [];
var storySeq = 1;
$(window).scroll(function () {
    $("[data-identi]").each(function () {
        if ($(this).isOnScreenImgID(0.9, 0.9) && !$(this).hasClass("notified")) {
            $(this).addClass('notified');
            arrIdentification.push($(this).data('identi'));
            storySeq++;
        }
    });
    if (storySeq > 8) {
        ideIngestionCall(arrIdentification, 1);
        arrIdentification = [];
        storySeq = 1;
    }
    if (document.readyState === "complete") {
        $("[data-identirec]").each(function () {
            var arrRecIdentification = [];
            if ($(this).isOnScreenImgID(0.9, 0.9) && !$(this).hasClass("notified") && $(this).is(":visible")) {
                $(this).addClass('notified');
                arrRecIdentification.push($(this).data('identirec'));
                ideIngestionCall(arrRecIdentification, 1);
            }
        });
    }
});

function identiClick(sId, url) {
    event.preventDefault();
    var objCTR = $('.' + sId).data('identi');
    if (!objCTR) {
    } else {
        if (arrIdentification.length > 0) {
            ideIngestionCall(arrIdentification, 1);
            arrIdentification = [];
            storySeq = 1;
        }
        jsonObjClick = [];
        jsonObjClick.push(objCTR);
        ideIngestionCall(jsonObjClick, 2);
        window.open(url, '_blank');
    }
}

/*******history push*********/
if (window.history && window.history.pushState) {
    $(window).on('popstate', function () {
        bm = histroydata.url.length;
        bUrl = histroydata.url[bm - xz];
        curl = bUrl.split('/');
        curlL = curl.length;

        if (bUrl.indexOf('/news/') > -1) {
            var ic = 1;
            for (ic = 1; ic < 5; ic++) {
                var aa = curl[ic].split('.');
                if (aa == 'news') {
                    aa = curl[ic + 1].split('.');
                    break;
                }
            }
            var cc = histroydata["article"][aa[0]];
            cc.bc = 1;
            articleData(cc);
        } else if (curlL == 2 && curl[1] == '') {
            loadHome(1);
        } else {
            var nn = bUrl;
            var bb = histroydata["listing"][nn];
            bb.bc = 1;
            var swipto = nn.slice(1, -1);
            if (swipto == 'bollywood/reviews/movie-reviews') {
                swipto = 'movie-reviews';
            }
            swipeTo(swipto);
            /*listData(bb);*/
        }
        if (bm > xz) {
            xz++;
        }
    });
}
/*******history push*********/

$(function () {
    $('.homeBrief').addClass('lisecliheightnone');
});



/******** start notifications section **********/
var chkSessIDN_1 = readCookieRealTime('n_sess_id');
if (chkSessIDN_1 != null || chkSessIDN_1 != '' || chkSessIDN_1 != 'null') {
    createSessionCookie('n_sess_id', chkSessIDN_1, 30);
}

var chkScreen = true;

$(window).scroll(function () {

    if (isPageCheck == 'article') {

        var nCounterChk = readCookieRealTime('notify_tab_counter');
        var nCounterChk_Art = readCookieRealTime('notify_tab_counter_art');

        console.log(nCounterChk + "===============");
        if (chkScreen) {
            if ((getSystemInfoNotification().browser == 'Chrome' || navigator.userAgent.indexOf("Chrome") != -1) || getSystemInfoNotification().browser == 'firefox') {
                if (ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1) {
                } else {

                    if (localStorage.getItem("_dbn_code") == 0 && countArticle == 2 && (nCounterChk_Art == 0 || nCounterChk_Art == null || nCounterChk_Art == '')) {
                        //var chkSessIDN = readCookieRealTime('n_sess_id');  
                        //if(chkSessIDN == null || chkSessIDN == '' || chkSessIDN == 'null'){
                        $(".blckgradient").show();
                        chkScreen = false;
                        //}
                    }
                }
            }
        }
    }
});


function _bhaskarOneResponseCallback(e) {
    console.log('callback....');
    console.log(e + "*********object");
    if (e.action.type == "_Self") { console.log('_Self initilize'); }
    if (e.action.type == "_onClick") {
        console.log('_onClick on element:' + e.action.element);
        if (e.notification.code == 1) {
            dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Allow_Browser', 'ev_label': 'STP2' });
            $(".mbh_notify_number").hide();
            $("#notify_tab").hide();
            $(".blckgradient").hide();
        }
        if (e.notification.code == 3) {
            createCookieRealTime('notify_tab_counter', 1, 1);
            dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Block', 'ev_label': 'STP2' });
            $(".mbh_notify_number").show();
            $("#notify_tab").hide();

            $(".blckgradient").hide();
        }
        if (e.notification.message == "CrossBtnClicked" && localStorage.getItem("_dbn_message") == "CrossBtnClicked") {
            dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Close', 'ev_label': 'STP2' });
        }
        /*DBCRIC FOLLOW*/
        if (e.action.element == "IndvsAus") {
            if (e.notification.code == '1' || (e.notification.code == '2' && (localStorage.getItem('_dbn_follow_tag') == null || localStorage.getItem('_dbn_follow_tag') != 'IndvsAus'))) {
                var data = {};
                data.bhaskarUUID = e.bhaskarUUID;
                data.type = 'follow';
                data.entityType = 'tag';
                data.entityName = 'IndvsAus';
                data.testingMode = e.testingMode;
                data.registration_id = e.notification.token;
                data.host = e.host;

                if (typeof (sendDetailsFollowTag) == "function") {
                    sendDetailsFollowTag(data);
                }

                if (typeof (sendCricDetailsFollowTag) == "function") {
                    sendCricDetailsFollowTag(data);

                }

            } else {
                console.log('Already Follow...');
            }
        }
        /**/
    }
}

function hideTab() {
    console.log(countArticle + "-----------Close Count");
    if (countArticle < 2) {
        countArticle = 0;
    }
    $("#notify_tab").hide();

    if (nCounter != 'null' && nCounter != null && nCounter != '') {
        createCookieRealTime('notify_tab_counter', (parseInt(nCounter) + 1), 1);
    } else {
        createCookieRealTime('notify_tab_counter', 1, 1);
    }

    var sessNId = readCookieRealTime('n_sess_id');

    if (!sessNId || sessNId == null) {
        sessNId = uniqueSESSID();
        createSessionCookie('n_sess_id', sessNId, 30);
    } else {
        createSessionCookie('n_sess_id', sessNId, 30);
    }
    createCookieRealTime('notifymelater', '1', 30);
    dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Later_Home', 'ev_label': 'STP1' });
}
function hideHindiListTab() {
    console.log(countArticle + "-----------Close Count");
    if (countArticle < 2) {
        countArticle = 0;
    }
    $("#notify_tab").hide();

    if (nCounter != 'null' && nCounter != null && nCounter != '') {
        createCookieRealTime('notify_tab_counter', (parseInt(nCounter) + 1), 1);
    } else {
        createCookieRealTime('notify_tab_counter', 1, 1);
    }

    var sessNId = readCookieRealTime('n_sess_id');

    if (!sessNId || sessNId == null) {
        sessNId = uniqueSESSID();
        createSessionCookie('n_sess_id', sessNId, 30);
    } else {
        createSessionCookie('n_sess_id', sessNId, 30);
    }
    dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Later_Hindi_Diwas', 'ev_label': 'STP1' });
}
function getNotification(tabName) {
    _bhaskarOne.push('_onClick', '1', _bhaskarOneResponseCallback);

    if (tabName == 'article_tab') {
        $(".blckgradient").hide();
        dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Allow_Article', 'ev_label': 'STP1' });
    } else if (tabName == 'hindi_diwas') {
        $("#notify_tab").hide();
        dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Allow_Hindi_Diwas', 'ev_label': 'STP1' });
    } else {
        $("#notify_tab").hide();
        dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Allow_Home', 'ev_label': 'STP1' });
    }
}

/*========Notify js=====*/

$(function () {
    var winhei = $(window).height();
    var mbhnotifypophei = winhei - 37;
    $(".mbh_notify_popup_close").on('click', function (event) {
        closePopup();
    });
    $('#bell1').on('click', function (event) {
        $('.topSearchBotton').removeClass('searchClose');
        $('.topSearchContainer, #search_result').hide();
        $('.menu_select').removeClass('toggleShow');
        $('.overlayClose, #smb_menu').slideUp();
        if (localStorage.getItem("_dbn_code") == 4) {
            $('body').css({ 'position': 'fixed', 'width': 100 + '%' });
            if (getSystemInfoNotification().browser == 'firefox') {
                $(".browsefirefox").show();
            } else if (getSystemInfoNotification().browser == 'Chrome' || navigator.userAgent.indexOf("Chrome") != -1) {
                $(".browsecrome").show();
            }
            $('#bell1').hide();
            $(".notify_list").hide();
            $(".mbh_notify_popup_bg").css('height', mbhnotifypophei).slideDown();
            $("#tpnav").css('z-index', 0);
            $(".mbh_notify_active_bg").slideDown();
            $(".mbh_notify_popup_close").slideDown();
            $('.mbh_notify_popup_close').show().css('background-position', 'left -29px');
            $('.navbar').css({ 'height': 37 });
            $(".dynamic_nab, .menuShadow, .latestNewsMenu").slideUp(100);
            event.stopImmediatePropagation();

        } else if (localStorage.getItem("_dbn_code") == 1 || localStorage.getItem("_dbn_code") == 2) {
            $('body').css({ 'position': 'fixed', 'width': 100 + '%' });
            var feedUrl = "https://appfeedlight.bhaskar.com/webfeed/notificationlist/521/";
            var nHtml = '';
            $.getJSON(feedUrl, function (data) {
                var nListData = data.feed;
                var countArr = nListData.length;
                nListData.forEach(function (value, index) {
                    nHtml += '<li><a href="' + value.url + '?ref=notifydrawer" title="' + value.title + '"><span class="pwa_thumb"><img class="swiper-lazy" src="' + value.image + '" ' + value.image_attr + ' alt="' + value.title + '" title="' + value.title + '"> </span><span class="pwa_text">' + value.title + '</span></a><div class="storyCat">' + value.timeago + '</div></li>';
                });
                /*if(countArr >5){
                    nHtml += '<div class="showMore" style=""><span><a href="/subscribed-notifications/">Show More</a></span></div>';
                }*/
                $(".notify_list").html(nHtml);
                /*if(countArr >5){
                $('.mbh_notify_popup_listing_bg').css('height', 100+'%');}*/
                $(".notify_list").show();
            });
            $('#bell1').hide();
            $(".mbh_notify_popup_bg").css('height', mbhnotifypophei).slideDown();
            $("#tpnav").css('z-index', 0);
            $(".notify_list").slideDown();
            $(".mbh_notify_popup_close").slideDown();
            $('.mbh_notify_popup_close').show().css('background-position', 'left -29px');
            $('.navbar').css({ 'height': 38 });
            $(".dynamic_nab, .menuShadow").slideUp(100);
            event.stopImmediatePropagation();
        } else {
            _bhaskarOne.push('_onClick', '1', _bhaskarOneResponseCallback);
        }
    });

    $('.cross_btn').on('click', function () {
        $('.blckgradient').slideUp(100);
        $('.blckgradient').slideUp(400);
        var nCounter1 = readCookieRealTime('notify_tab_counter');
        if (nCounter1 != 'null' && nCounter1 != null && nCounter1 != '') {
            createCookieRealTime('notify_tab_counter', (parseInt(nCounter1) + 1), 1);
        } else {
            createCookieRealTime('notify_tab_counter', 1, 1);
        }
        createCookieRealTime('notify_tab_counter_art', 1, 7);
        dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Close', 'ev_label': 'STP1' });
        return false;
    });
    //alert(readCookieRealTime('n_sess_id'));
    $('.cross_later').on('click', function () {
        $('.blckgradient').slideUp(100);
        $('.blckgradient').slideUp(400);
        var nCounter1 = readCookieRealTime('notify_tab_counter');
        if (nCounter1 != 'null' && nCounter1 != null && nCounter1 != '') {
            createCookieRealTime('notify_tab_counter', (parseInt(nCounter1) + 1), 1);
        } else {
            createCookieRealTime('notify_tab_counter', 1, 1);
        }
        /*
        var sessNId = readCookieRealTime('n_sess_id');
        
        if (!sessNId || sessNId==null || sessNId=='null') {
            sessNId = uniqueSESSID();
            createSessionCookie('n_sess_id', sessNId, 30);
        } else {
            createSessionCookie('n_sess_id', sessNId, 30);
        }
        */
        createCookieRealTime('notify_tab_counter_art', 1, 7);
        dataLayer.push({ 'event': 'Ev_Custom', 'ev_category': 'Notification', 'ev_action': 'Later_Article', 'ev_label': 'STP1' });
        return false;
    });

});
function closePopup() {
    $('#bell1').show();
    $('.mbh_notify_popup_listing_bg').removeAttr('style');
    $(".mbh_notify_popup_bg").slideUp();
    $("#tpnav").css('z-index', 99999);
    $(".mbh_notify_active_bg").slideUp();
    $(".mbh_notify_popup_close").slideUp();
    $('body, .navbar').removeAttr('style');
    $(".dynamic_nab, .menuShadow, .latestNewsMenu").slideDown(100);
    event.stopImmediatePropagation();
}

/******** end notifications section **********/

var sliderFlag = [];
var hsliderFlag = true;
var slidePpindexArr = [];
var slidePageIncArr = [];
var slidePPArr = [];
var currIndex = 0;
for (var i = 0; i < hSlider.length; i++) {
    sliderFlag[i] = true;
    slidePpindexArr[i] = 5;
    slidePageIncArr[i] = 10;
    slidePPArr[i] = 0;
}





function scrollNavigation() {
    var position = $('.swiper-pagination-bullet-active').position();
    var percentLeft = position.left;
    /*$(".mymenu_slide").animate({scrollLeft: percentLeft },100);*/
    var i = 4;
    if (homeSwipe.getPos() >= i) {
        $(".mymenu_slide").animate({ scrollLeft: percentLeft - 155 }, 0, 'swing');
        i++;
    } else {
        $(".mymenu_slide").animate({ scrollLeft: 0 }, 0, 'swing');

    }
}

$(function () {
    var curUrlB = window.location.pathname;
    var sUrlArrB = curUrlB.split('/');
    if (sUrlArrB[1] == "") {
        hsliderFlag = false;
    } else if ((typeof catName != 'undefined') && (sUrlArrB[1] !== "" && sUrlArrB[1] !== "news" && sUrlArrB[1] !== "photo" && sUrlArrB[1] !== "album" && sUrlArrB[1] !== "topics")) {
        var sindex = findIndex2D(hSlider, "url", catName);
        if (sindex !== false) {
            sliderFlag[sindex] = false;
            homeSwipe.slide(sindex + 1);
        }
    }
    $(window).scroll(function () {
        var curUrlC = window.location.pathname;
        var sUrlArrC = curUrlC.split('/');
        if (sUrlArrC[1] !== "news" && sUrlArrC[1] !== "photo" && sUrlArrC[1] !== "album" && sUrlArrC[1] !== "topics" && sUrlArrC[1] !== "quiz") {
            $('#home_slider #idx_' + currIndex).addClass('inhertClass');
        }
    });
});

function setSliderHeight(posSlider) {
    $('.swipe-wrap-home, #home_slider').css('height', 'auto');
    $('.swipe-wrap-home .swiper-slide').each(function () {
        $(this).height('10');
    });
    $('#' + posSlider).css('height', 'auto');

}



function appendNewCategory(listArr) {
    if (listArr['catName'] == 'Top News') {
        var ppcatid = 89745985;
    } else {
        var ppcatid = listArr['catID'];
    }
    if (isNewSlideExist == 0) {
        hSlider.unshift({ catID: parseInt(listArr['catID']), catName: listArr['catName'], setUrl: listArr['setUrl'], chId: listArr['chId'], "isTopNav": 1 });
        sliderFlag.unshift(false);
        slidePpindexArr.unshift(5);
        slidePageIncArr.unshift(10);
        slidePPArr.unshift(0);
        homeSwipe.stop();
        $('#homeIcn').after('<li id="pp_' + ppcatid + '"><a class="topmlink" href="https://m.bhaskar.com/' + listArr['setUrl'] + '" onclick="swipeTo(\'\');return false;">' + listArr['catName'] + ' </a></li>');
        $('.swiper-slide:first').after('<div class="swiper-slide" id="idx_1" data-url="' + listArr['setUrl'] + '" data-catid="' + listArr['catID'] + '">category6</div>');
        $('.swiper-slide').each(function (k) {
            if (k > 1) {
                $(this).attr('id', 'idx_' + k);
            }
        });
        setTimeout(function () {
            homeSwipe.setup();
        }, 500);
        isNewSlideExist = 1;
    } else {
        $('#homeIcn').next('li').remove();
        $('#homeIcn').after('<li id="pp_' + ppcatid + '"><a class="topmlink" href="https://m.bhaskar.com/' + listArr['setUrl'] + '" onclick="swipeTo(\'\');return false;">' + listArr['catName'] + ' </a></li>');
        hSlider[0] = { catID: parseInt(listArr['catID']), catName: listArr['catName'], setUrl: listArr['setUrl'], chId: listArr['chId'], "isTopNav": 1 };
        slidePpindexArr[0] = 5;
        slidePageIncArr[0] = 10;
        slidePPArr[0] = 0;
    }
    setTimeout(function () {
        homeSwipe.slide(1);
    }, 500);
}

function reIntHomeSlider(index) {
    if (isReIntSlider) {
        homeSwipe.stop();
        /*setTimeout(function(){*/
        homeSwipe.setup();
        homeSwipe.slide(index);
        /*},100);*/
        isReIntSlider = false;
    }
}


function swipeTo(swipeUrl) {
    /*if(index == 101){index=1;}else if((isNewSlideExist && index!=0)){index=index+1;}*/
    var sindex = 0;
    if (swipeUrl != '') {
        var sindex = findIndex2D(hSlider, "url", swipeUrl);
    }
    isCallHome = false;
    /*homeSwipe.slide(0); */
    homeSwipe.slide(sindex + 1);
    if (location.pathname.indexOf('/no-fake-news') > -1) {
        $(".no-fake-news").hide();
        $("#no-fake-news").remove();
        $("#main_wrapper").addClass('no-fake');
        $("#main_wrapper").prepend('<a  id=\'no-fake-news\' onclick=\'swipeTo("no-fake-news");return false;\' href="https://m.bhaskar.com/no-fake-news/" title="no-fake-news"><div class=\'no-fake-news\'></div></a>');
    }


    if (swipeUrl == "sports") {

        try {
            if (typeof (loadWidget) == "function" && $("#dbcric_sport_widget").length > 0) {
                loadWidget("dbcric_sport_widget", isPageCheck, currentmatchid);
            }
        } catch (ex) { }

    }
}

$('.topSearchBotton').click(function () {
    $(this).toggleClass('searchClose');
    $('.menu_select').toggleClass('toggleShow');
    $('.overlayClose').hide();
    $('body').removeClass('fixheight');
    $('.topSearchContainer, #search_result,#smb_menu').hide();
    closePopup();

});

function findIndex2D(arr, key, val) {
    var bool = false;
    for (var i = 0; i < arr.length; i++) {
        if (key == 'url') {
            if (val == arr[i].url) {
                bool = i;
            }
        } else {
            if (val == arr[i].catID) {
                bool = i;
            }
        }
    }
    return bool;
}
$('.logo_m,.navbar .dynamic_nab ul li a').click(function () {
    $('.overlayClose,#smb_menu').hide();
    $('body').removeClass('fixheight');
});

function rashifalMenuDown() {
    $('.jeevanlist').slideUp();
    $('.jeevanhead h3').removeClass('active');
}

if (isPageCheck == 'article') {
    voiceJsCall();
}

function voiceJsCall() {
    /* $.getScript("/public/nbhaskarpwa/js/text_to_speech.js?p" + v1p, function(jd) {
                 return true;
             });*/
    responsiveVoiceFlag = true;
}


String.prototype.replaceArray = function (find, replace) {
    var replaceString = this;
    for (var i = 0; i < find.length; i++) {
        /* global replacement*/
        var pos = replaceString.indexOf(find[i]);
        while (pos > -1) {
            replaceString = replaceString.replace(find[i], replace[i]);
            pos = replaceString.indexOf(find[i]);
        }
    }
    return replaceString;
};
/*responsiveVoice.cancel();*/
function sayIt() {

    responsiveVoice.cancel();
    var find = [".....", "....", "...", "..", "-", "|"];
    var replace = [",", ",", ",", ",", "", ","];
    $(".play").hide();
    $(".pausevoice").show();
    var textToSpeech = "" + $("#short_content").text().replaceArray(find, replace).split(/<[^>]*>/g);
    responsiveVoice.speak(textToSpeech, "Hindi Female");
    dataLayer.push({
        'event': 'Ev_Custom_Typ',
        'ev_category': 'Audio',
        'ev_action': 'Play',
        'ev_label': window.location.href,
    });

}
function stopIt() {
    responsiveVoice.cancel();
    dataLayer.push({
        'event': 'Ev_Custom_Typ',
        'ev_category': 'Audio',
        'ev_action': 'Stop',
        'ev_label': window.location.href,
    });
}

function pausevoice() {
    responsiveVoice.cancel();
    /*responsiveVoice.pause();*/
    dataLayer.push({
        'event': 'Ev_Custom_Typ',
        'ev_category': 'Audio',
        'ev_action': 'Stop',
        'ev_label': window.location.href,
    });
    $("#resume").show();
    $(".pausevoice").hide();

}

function resumevoice() {
    sayIt();
    /*responsiveVoice.resume();*/
    $("#resume").hide();
    $(".pausevoice").show();
}
if (isPageCheck == 'article') {

    $(document).on("visibilitychange", function () {
        if (document.hidden) {
            responsiveVoice.cancel();
            /*responsiveVoice.pause();*/
            $("#resume").show();
            $(".pausevoice").hide();
        } else {

        }
    });
}

/*===========Tracking articel on scorll ========*/




function chkbrowser(browser) {

    if (browser == "uc") {
        return (/UBrowser|UCBrowser|UC Browser|UCWEB/i.test(navigator.userAgent || navigator.vendor || window.opera));
    } else if (browser == "chrome") {
        return (/Chrome/i.test(navigator.userAgent || navigator.vendor || window.opera));
    } else if (browser == "firefox") {
        return (/firefox/i.test(navigator.userAgent || navigator.vendor || window.opera));
    } else if (browser == "android") {
        var ua = navigator.userAgent;
        return ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1) && !(/UBrowser|UCBrowser|UC Browser|UCWEB/i.test(navigator.userAgent || navigator.vendor || window.opera)));
    }

    return false;
}

if ((isPageCheck == "list" && catID == "1053") || (isPageCheck == "article" && $("#bhaskar-cric-score-widget").length > 0)) {
    checkLiveMatch();
}


function gameslist(listArr) {
    $('#liveEvent_article').hide();
    $('#liveEvent_home').hide();
    $("#no-fake-news").hide();
    $(".no-fake-news").hide();
    $("html, body").scrollTop(0);
    isPageCheck = 'list';
    $(".loader").show();
    $(".db_pollWD").hide();
    $(".hindi_diwas_title").hide();
    $("#lcontainerlist").show();
    $("#main_wrapper").removeClass('homePadding');
    $('#main_wrapper').removeClass('articlePadding');
    $('.rightArrow').hide();
    $('.topSearchBotton').removeClass('searchClose');
    $('.menu_select').removeClass('toggleShow');

    $(".mymenu_slide li").removeClass("swiper-pagination-bullet-active");
    $(".mymenu_slide li.dbquiz").addClass("swiper-pagination-bullet-active");


    /*********BollyWood Logo change**************/
    $("#main_wrapper").removeClass('no-fake');
    $("#tpnav").removeClass('smb_header_ent');
    $("#tpnav").removeClass("smb_header_sticky");
    $("#main_wrapper").removeClass("jeevan-mantra");
    $("#main_wrapper").removeClass("jeevan-mantra1");
    $("#smb_menu").removeClass("jeevan-mantra");
    $(".dynamic_nab").show();
    $("#tpnav").removeClass('bollywoodLogo');
    $("body").removeClass('newfont');
    /*********BollyWood Logo change**************/


    chId = listArr['chId'];
    catID = listArr['catID'];
    catName = listArr['catName'];

    if (listArr['setUrl'].charAt(0) == '/') {
        var url = listArr['setUrl'];
    } else {
        var url = "/" + listArr['setUrl'];
    }

    ga('set', 'dimension16', "Other");
    ga('set', 'dimension17', "Games");


    $('body').find('.overlay').remove();
    var ttleng = $('#contain_dbtv1 li').length;

    setUrl(url, catName);
    var gamespagecontainer = '';
    gamespagecontainer += '<div id="gamedatalist">';
    gamespagecontainer += '<h2 style="border-bottom:3px solid #2b63b1; color:#2b63b1; line-height:40px; font-weight:700; font-size:22px;">Games</h2>';
    gamespagecontainer += '<ul>';
    gamespagecontainer += '<li>';
    gamespagecontainer += '<a href="/games/snake/">';
    gamespagecontainer += '<span>à¤—à¥‡à¤® 1: à¤¸à¤¾à¤à¤ª-à¤¸à¥€à¤¢à¤¼à¥€</span>';
    gamespagecontainer += '<img src="/public/nbhaskarpwa/images/banner-Snakes-Ladders-n2.png" />';
    gamespagecontainer += '</a>';
    gamespagecontainer += '</li>';
    gamespagecontainer += '<li>';
    gamespagecontainer += '<a href="/games/carrom/">';
    gamespagecontainer += '<span> à¤—à¥‡à¤® 2: à¤•à¥ˆà¤°à¤® à¤¬à¥‹à¤°à¥à¤¡</span>';
    gamespagecontainer += '<img src="/public/nbhaskarpwa/images/banner-carrom-n2.png" />';
    gamespagecontainer += '</a>';
    gamespagecontainer += '</li>';
    gamespagecontainer += '</ul>';
    gamespagecontainer += '</div>';

    $("#da_mainwrapper").empty();
    $("#da_mainwrapper").hide();
    var sindex = findIndex2D(hSlider, "url", 'games');
    sindex = sindex + 1;
    $("#idx_" + sindex).html(gamespagecontainer);
    $(".loader").hide();
    $("#lcontainerlist").hide();
    $("#recommend").hide(); $("#bhaskar-cric-entry-widget").hide(); $('.add_vitt_mantri_comment').remove();
    $("#newsfind").val("");
    $('#target-cities').hide();
    $('#cityMenu').slideUp();

    /*** start tracking ***/
    var MetaData = { 'title': 'Games Bhaskar - Online Games, Online Quiz India', 'desc': 'Best Online Games.' };
    var currentArtTitle = 'Games';
    var ArtlUpdated = '';
    var Artflag_v = 1;
    var tracknumArtSlides = '';
    var item = 0;
    var metaTitle = MetaData.title;
    var metaDesc = MetaData.desc;
    var categoryName = MetaData.cat_name;

    ga('set', 'dimension16', "Other");
    ga('set', 'dimension17', categoryName);
    analytics_func_ajax(url, 'down', currentArtTitle, ArtlUpdated, Artflag_v, tracknumArtSlides, 0, item, 0);
    realtimeHome({ title: metaTitle, description: metaDesc });
    comscore(1);
    comscoreAjaxCall();
    /**abc tracking **/
    var statearray = ['/rajasthan/', '/mp/', '/haryana/', '/harayana/', '/delhi/', '/gujarat/', '/up/', '/chhatisgarh/', '/punjab/', '/chandigarh/', '/bihar/', '/jharkhand/', '/maharashtra/', '/himachal/', '/uttar-pradesh/', '/madhya pradesh/', '/union territory/'];
    var purl = window.location.pathname;
    if (purl.indexOf('bollywood/') > 0) {
        var abcDegitalUrl1 = abcarr['p_bollywood'];
    } else if (purl.indexOf('flicker/') > 0) {
        var abcDegitalUrl1 = abcarr['p_treading_now'];
    } else if (purl.indexOf('jeevan-mantra/') > 0) {
        var abcDegitalUrl1 = abcarr['p_jeevan_mantra'];
    } else if (purl.indexOf('sports/') > 0) {
        var abcDegitalUrl1 = abcarr['p_sports'];
    } else if (purl.indexOf('indian-national-news-in-hindi/') > 0) {
        var abcDegitalUrl1 = abcarr['p_desh'];
    } else if (purl.indexOf('world-news-in-hindi/') > 0) {
        var abcDegitalUrl1 = abcarr['p_videsh'];
    } else if (purl.indexOf('lifestyle/') > 0) {
        var abcDegitalUrl1 = abcarr['p_lifestyle'];
    } else if (statearray.indexOf(purl) >= 0) {
        var abcDegitalUrl1 = abcarr['p_rajya'];
    } else {
        var abcDegitalUrl1 = abcarr['p_others'];
    }
    /* console.log("abcDegitalUrl1=="+abcDegitalUrl1); */
    traceabcAjex(abcDegitalUrl1);
    /**abc tracking **/
    /******Push data *******/
    var PA = window.location.pathname;;
    histroydata['listing'][PA] = listArr;
    if (listArr['bc'] == '' || listArr['bc'] == undefined) {
        var np = window.location.pathname;
        histroydata['url'].push(np);
        xz = 2;
    }

    return true;
}


$(function () {
    if (window.location.href.indexOf('/topics/') > -1) {
        $(".fisrt_story ").css('margin-bottom', 10);
        $(".mb_contentbox h1 ").css('margin-top', 10);
        $(".numberofpageVideo").css({ 'margin-top': '0px', 'top': '7px' });
    }
});
$(document).ready(function () {
    $('.swipe-wrap .swiper-slide').css('opacity', 1);
});

/* ========================= */



$(function () {
    if (navigator.onLine == true) {
        $('.site_off_bg').hide();
    }
    if (navigator.onLine == false) {
        $('.site_off_bg').show();
    }


});
/* ========= IPL ENTRY POINT ======= */
function mainIplEntry(rdata) {
    var vdoTracker = "videos-m-ipl";
    var section = "IPL 2018"
    var feedUrl = "https://cldmum.bhaskar.com/webfeed/dbvideosevent/521/43/0/1/";
    $.ajax({
        url: feedUrl,
        type: "GET",
        dataType: "json",
        cache: true,
        data: {},
        success: function (response) {
            var value = response[0];
            var idx = 1;
            var image_path = value.image_path;
            image_path = image_path.replace('99x74', '319x180');
            var video_title = value.video_title;
            video_title = video_title.replace(/'/g, "");
            var meta_title = value.meta_title;
            meta_title = meta_title.replace(/'/g, "");
            var video_url = value.video_url.replace("videos-m", "videos-m-ipl");
            var OnClick = 'onclick="setHeightFromTop(4);return changeDSrc(\'' + video_url + '\',\'' + video_title + '\',' + value.id + ',\'' + image_path + '\',\'' + value.views + '\',\'' + value.fshare + '\',\'' + meta_title + '\',\'' + value.filename + '\',\'' + value.deliveryBaseURL + '\',' + value.category_id + ',' + value.section_id + ',' + value.video_provider + ', ' + value.userid + ', \'' + value.editor_name + '\',' + value.city + ',\'' + value.created_datetime + '\',' + value.prov_sec + ',\'' + vdoTracker + '\',\'' + idx + '\', \'' + value.deliveryBaseURLNew + '\', \'' + value.webm_status + '\', \'' + value.m3u8_status + '\', \'' + value.mp4_status + '\', \'' + value.videoUrlDefault + '\',\'' + section + '\');"';
            var entry_listHtml = '';
            entry_listHtml += '<style>.ipl-entrycommon { width: 100%; background: #fff; border:solid 1px #004c8d; overflow: hidden; }.ipl_entrypddingbox{padding:0 0px;}.ipl_Macho { background: #004c8d; float: left; width: 100%; padding-top: 2px; }.ipl_entrycmnLogo { float: left; width: 176px; height: 50px; display: inline-block; background: url("https://i10.dainikbhaskar.com/dainikbhaskar2010/img-mobile/ipl_2018_full/images/ipl-entywidgetlogo.png") no-repeat; margin-left:3px;}.ipl_machologo { float: right; font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12px; color: #fff; text-decoration: none; margin-top: 4px; }.ipl_machologo .ipl-machoimage { margin-top: 5px; background: url("https://i10.dainikbhaskar.com/dainikbhaskar2010/img-mobile/ipl_2018_full/images/ipl-machologo.jpg") no-repeat; height: 22px; display: block; }.ipl_entryvideo { min-height: 170px; position: relative; background-color: #ececec; }.ipl_entryvideo img { width: 100%; display: block; }.ipl_entryvideo .ipl_entryVieoIcon { position: absolute; left: 50%; top: 50%; font-family: "Trebuchet MS", Arial; z-index: 2; width: 56px; height: 56px; transform: translate(-50%, -50%); background: url(https://i10.dainikbhaskar.com/dainikbhaskar2010/img-mobile/ipl_2018_full/images/videoIcon.png) no-repeat; }.ipl_entryvideo .ipl_entryshdow { min-height: 114px; background: url(https://i10.dainikbhaskar.com/dainikbhaskar2010/img-mobile/ipl_2018_full/images/silly-shadow.png) left bottom repeat-x; position: absolute; left: 0; bottom: 0; font-size: 16px;line-height:24px; color: #fff; width: 100%; font-weight: bold; padding: 57px 10px 0px 10px; }.ipl-entry_listing {  list-style: none; margin: 0; padding:0 10px; box-sizing:border-box; width: 100%; float: left; }.ipl-entry_listing li { float: left; width: 100%; margin-top: 9px; padding-top:10px; border-top: 1px solid #0d66b3; }.ipl-entry_listing li a { padding: 0; font-size: 16px; line-height: 26px;  text-align: left; display: block; text-decoration: none; font-family: "Trebuchet MS", Arial; color:#000; }.ipl-entry_listing li .ipl_thumbentry{float:right; width:101px; height:88px; overflow:hidden; margin-left:10px; position:relative;}.ipl-entry_listing li .ipl_thumbentry img{display:block; max-width:100%;}.ipl_entryCoverage{width:100%; float:left; margin-top:10px;}.ipl_entryCoverage a{display:block; background:#f0880e; text-align:center; color:#000; font-size:15px; font-family:Arial, Helvetica, sans-serif; font-weight:bold; line-height:23px; text-decoration:none; text-transform:uppercase;}.ipl_entryPandit{width:320px; height:50px; margin: 15px auto 12px;}.ipl_thumbentry .video_iconEntry { position: absolute; left: 50%; top: 50%; z-index: 2; width: 26px; height: 26px; transform: translate(-50%, -50%); background: url(https://i10.dainikbhaskar.com/dainikbhaskar2010/img-mobile/ipl_2018_full/images/video-icon.png) no-repeat; }</style><div class="ipl-entrycommon"><div class="ipl_entrypddingbox"><div class="ipl_Macho"><a href="javascript:void(0);" class="ipl_entrycmnLogo"></a><a class="ipl_machologo" href="javascript:void(0);"> Co-Sponsored by <img src="https://i10.dainikbhaskar.com/dainikbhaskar2010/img-mobile/ipl_2018_full/images/ipl-machologo.jpg" class="ipl-machoimage"></a></div><div class="clear"></div><div class="ipl_entryvideo " ' + OnClick + '><img src="' + image_path + '"><div class="ipl_entryshdow">' + value.video_title + '</div><div class="ipl_entryVieoIcon"></div></div><div class="clear"></div><ul class="ipl-entry_listing" id="ipl-entry_listing">';
            $.each(rdata, function (key, val) {
                var video_icon = "";
                image_path = val.image.replace('319x278', '116x90');
                if (val.video_flag == 1) { video_icon = '<span class="video_iconEntry"></span></span>'; }
                entry_listHtml += '<li><a href="' + val.link + '"><span class="ipl_thumbentry"><img src="' + image_path + '" alt="">' + video_icon + '</span>' + val.title + '</a></li>';
            });

            entry_listHtml += '</ul></div><div class="clear"></div><div class="ipl_entryCoverage"><a href="https://m.bhaskar.com/sports/ipl-2018/">full coverage</a></div><div class="clear"></div><div class="ipl_entryPandit"><div><a href="https://m.bhaskar.com/sports/ipl-2018/?ref=contest"><img src="https://i10.dainikbhaskar.com/dainikbhaskar2010/ipl2018/320x50.jpg"></a></div><div><a href="https://www.cricketpundit.in/?ref=mbhaskar" target="_blank"><img src="https://i10.dainikbhaskar.com/dainikbhaskar2010/ipl2018/pundit320x50.gif"></a></div></div></div>'
            $("#homeLi_2").after("<div id='ipl_home_list'></div>");
            $('#ipl_home_list').append(entry_listHtml);
        },
        complete: function () {
        }
    });
}
function mainListEntry(calback) {
    var feedUrl = "https://appfeedlight.bhaskar.com/webfeed/news/521/10822/2/0/2/";
    $.ajax({
        type: "GET",
        url: feedUrl,
        dataType: "json",
        success: function (rdata) {
            if (rdata.data.story.length > 0) {
                calback(rdata.data.story);
            }
        }
    });
}
//mainListEntry(mainIplEntry);
var ip = 0;
setInterval(function () {
    if ($(".ipl_entryPandit").length > 0) {
        $('.ipl_entryPandit div').hide();
        $('.ipl_entryPandit div').eq(ip).show();
        ip++;
        if (ip > 1) {
            ip = 0;
        }
    }
}, 4000);



