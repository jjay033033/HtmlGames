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

!function(){
	initUrl();
	var apis = new Array();
	apis.push(new Api("通用接口1","http://api.47ks.com/webcloud/?v="));
	apis.push(new Api("通用接口3","http://api.mp4la.net/?url="));
	apis.push(new Api("通用接口4","http://v.72du.com/api/?url="));
	apis.push(new Api("通用接口5","http://www.yydy8.com/Common/?url="));
	apis.push(new Api("通用接口6","http://yun.mt2t.com/yun?url="));
	apis.push(new Api("腾讯视频","http://api.47ks.com/webcloud/?v="));	
	apis.push(new Api("搜狐视频","http://v.72du.com/api/?url="));
	apis.push(new Api("爱奇艺高清","http://jx.71ki.com/index.php?url="));
	//apis.push(new Api("磁力链接","http://apiv.ga/magnet/"));
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
}();

function addAction(apis){
	for(var i=0;i<apis.length;i++){
		document.getElementById('button'+i).onclick = function(){
			doRedirect(this.getAttribute("api"));
		};
	}
}

function doRedirect(apiUrl){
	var url = encodeURI(apiUrl+thisUrl);
	chrome.tabs.create({url : "http://www.lmoon.top/vipvideo_ext2.html?url="+url}, function(tab) {});
}

