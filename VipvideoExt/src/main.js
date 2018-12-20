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

//http://www.w3dev.cn/article/20140703/chrome-extension-get-tab-page-dom.aspx
//http://www.iqiyi.com/v_19rr7ye898.html?fc=87bbded392d221f5

var isInsideEle = document.getElementById('isInside');
isInsideEle.onclick = function(){
	// alert(isInsideEle.checked);
	window.localStorage.isInside = isInsideEle.checked;
};

!function(){
	initUrl();
	initIsInsideHtml();
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

function initIsInsideHtml(){
	// console.info(window.localStorage.isInside);
	if(window.localStorage.isInside == 'true'){
		isInsideEle.checked = true;
	}
}

function addAction(apis){
	for(var i=0;i<apis.length;i++){
		document.getElementById('button'+i).onclick = function(){
			// doRedirect(this.getAttribute("api"));
			var api = this.getAttribute("api");
			chrome.tabs.getSelected(null, function (tab) {//获取当前tab
				var theurl = api +tab.url;
				if(!isInsideEle.checked||api.indexOf("https://")!=-1){
					doRedirect(theurl);
				}else{
					//向tab发送请求
					chrome.tabs.sendRequest(tab.id, { url: theurl }, function (response) {
						console.info("todojs");
					});
				}
				
			});
		};
	}
}

function doRedirect(apiUrl){
	var url = window.btoa(encodeURI(apiUrl));
//	var url = "url="+apiUrl+thisUrl;
	chrome.tabs.create({url : "https://jjay033033.github.io/HtmlGames/vipvideo_ext2.html?"+url}, function(tab) {});
}





