var thisUrl;

function initUrl(){
	chrome.tabs.getSelected(null,function(tab){  
		thisUrl = tab.url; 	
	});
}

function Api(name,url){
	this.name = name;
	this.url = url;
}

chrome.extension.onRequest.addListener(//监听扩展程序进程或内容脚本发送请求的请求
	function (request, sender, sendResponse) {
		console.info(request);
		alert(request.action);
		// if (request.action == "GetBaiduKeyWord") {
			// sendResponse({ kw: { kw: document.forms[0].wd.value } });
		// }
		// if (request.action == "SubmitForm") {
			// document.forms[0].submit();
		// }
	}
);

!function(){
	initUrl();
	var apis = new Array();
//	apis.push(new Api("通用接口1","http://api.47ks.com/webcloud/?v="));
//	apis.push(new Api("通用接口3","http://api.mp4la.net/?url="));
//	apis.push(new Api("通用接口4","http://v.72du.com/api/?url="));
//	apis.push(new Api("通用接口5","http://www.yydy8.com/Common/?url="));
//	apis.push(new Api("通用接口6","http://yun.mt2t.com/yun?url="));
//	apis.push(new Api("腾讯视频","http://api.47ks.com/webcloud/?v="));	
//	apis.push(new Api("搜狐视频","http://v.72du.com/api/?url="));
//	apis.push(new Api("爱奇艺高清","https://aikan-tv.com/qy.php?url="));
	var dataroot="data.json"; 
	$.getJSON(dataroot, function(data){ 
		apis=data.apis; 
		var table = '<table>';
		for(var i=0;i<apis.length;i++){
			table += '<tr><td><input type="button" id="button';
			table += i;
			table += '" value="';
			table += apis[i].name;
			table += '" api="';
			table += apis[i].url;
			table += '"/></td></tr>';
		}
		table += '</table>';
		document.getElementById('mypage').innerHTML = table;
		addAction(apis);
	}); 
	
}();

function addAction(apis){
	for(var i=0;i<apis.length;i++){
		document.getElementById('button'+i).onclick = function(){
			// doRedirect(this.getAttribute("api"));
			//openInTab(this.getAttribute("api")+thisUrl);
			chrome.tabs.getSelected(null, function (tab) {//获取当前tab
				//向tab发送请求
				chrome.tabs.sendRequest(tab.id, { action: "GetBaiduKeyWord" }, function (response) {
					console.info("GetBaiduKeyWord");
				});
			});
			 //向tab发送请求
			// chrome.tabs.sendRequest(tab.id, { action: "GetBaiduKeyWord" }, function (response) {
				// console.info("GetBaiduKeyWord");
			// });
		};
	}
}

function doRedirect(apiUrl){
	var url = window.btoa(encodeURI(apiUrl+thisUrl));
//	var url = "url="+apiUrl+thisUrl;
	chrome.tabs.create({url : "http://www.lmoon.top/vipvideo_ext2.html?"+url}, function(tab) {});
}



//嵌入页面播放
function openInTab(url){
	console.info(document);
    // evt.preventDefault();
    var iframe=document.createElement("iframe");
    iframe.id="TMiframe";
    var video;
    //iframe.style.cssText="width:100%;height:100%;text-align:center;border:none;";
    iframe.style.border="none";
    iframe.textAlign="center";
    // iframe.src=evt.target.href;
	iframe.src=url;
    var timer=setInterval(function(){    
		console.info("innnn");
	//-------------检测视频元素思路借鉴他人 License MIT Begin--------------
        [].every.call(document.querySelectorAll("object,embed,video"),function(item){                //LINK:https://greasyfork.org/zh-CN/scripts/26556-vip视频破解
            var style=getComputedStyle(item, null);                                                  
            if(style.width.replace("px","")>100 && style.height.replace("px","")>100){               
                video=item;
				console.info(item);
                return false;//有播放窗
            }
            return true;
        });
        if(video||document.querySelector("#TMiframe")){
			console.info(video.parentNode);
            if(document.querySelector("#TMiframe")){video=document.querySelector("#TMiframe");}
            clearInterval(timer);
            var videoStyle=getComputedStyle(video, null);
            iframe.width=videoStyle.width;
            iframe.height=videoStyle.height;
            var videoParent=video.parentNode;
            iframe.style.lineHeight=getComputedStyle(videoParent).height;
            if(video.parentNode){video.parentNode.replaceChild(iframe,video);}
        }
    },500);                                                                                         //-------------检测视频元素思路借鉴他人  End--------------------
    if(window.location.href.indexOf("youku")!=-1){
        document.querySelector(".vpactionv5_iframe_wrap").style.display="none";
    }
    /*run-at document-start 才能有效
    if(window.location.href.indexOf("iqiyi")!=-1){                                                   //页内解析重音问题，代码来源→19349-江小白：https://greasyfork.org/zh-CN/scripts/29873-%E8%A7%A3%E5%86%B3%E5%A5%87%E8%89%BA%E8%A7%A3%E6%9E%90%E9%97%AE%E9%A2%98/code
        Object.defineProperty(navigator, "userAgent", {
            value: "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.2661.102 Safari/537.36",
            writable: false,
            configurable: false,
            enumerable: true
        });
    }                                                                                                 //19349-江小白 借用代码End
    */
}

