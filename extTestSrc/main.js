var thisUrl;

chrome.webRequest.onBeforeRequest.addListener (  
  
    function(details) {  
      // 如果请求带有特殊标记，则不进行修改
        if (details.url.endsWith("#do_not_modify_this_request")) {
            return {}
        }
        // chrome.tabs.query({active:true},function(tab){  
            // // 当前页面的url  
            // var pageUrl = tab[0].url;  
            // // 在这可以写判断逻辑，将请求cancel掉，或者将请求打印出来  
            // console.log("current url -> " + pageUrl);  
			// alert(pageUrl);
        // });  
		//console.log(details);  
		details.requestBody.formData.encrypt = 0;
		details.requestBody.formData.extra = details.requestBody.formData.extra[0];
		details.requestBody.formData.fid_list = details.requestBody.formData.fid_list[0];
		details.requestBody.formData.path_list = details.requestBody.formData.path_list[0];
		details.requestBody.formData.primaryid = details.requestBody.formData.primaryid[0];
		details.requestBody.formData.product = details.requestBody.formData.product[0];
		details.requestBody.formData.uk = details.requestBody.formData.uk[0];
		console.log(details);  
		// 使用消息机制将请求传递给页面再发起 ajax，而不是在背景页中发起
        chrome.tabs.sendMessage(details.tabId, details, function(response) {
			console.info("finished22222!");
            // 此处可以修改response...
            // redirectUrl = "data:application/json;charset=UTF-8;base64," + Base64.encode(newResponse)
        });
		 return {cancel: true};
			// alert(details);
  
    },  
       
    {urls:["https://pan.baidu.com/api/sharedownload*"]},  //监听页面请求,你也可以通过*来匹配。  
    ["blocking","requestBody"]   
); 

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
	aaa();
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
	/*var dataroot="data.json"; 
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
	}); */
	
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
	chrome.tabs.create({url : "http://www.lmoon.top/vipvideo_ext2.html?"+url}, function(tab) {});
}


function aaa(){
	var details = {};
	details.domain = ".tianya.cn";
	details.name = "sso";
	//alert(details.url);
	console.info(chrome.cookies);
	chrome.cookies.getAll(details,function(cookie){console.info(cookie);});
	//var url = window.btoa(encodeURI(document.cookie));
	// document.querySelector(".guide-enter").innerHTML='<a href="https://vast-inlet-75928.herokuapp.com/test2?cookie='+url+'">进入社区</a>';
}




