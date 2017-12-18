chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
		// console.info("11111111111122222");
		// console.info(request);
		// console.info(sender);
		// console.info(sendResponse);
            // 重新发起的请求要做标记，避免无限循环
            var settings = {
                url: request.url + "#do_not_modify_this_request",
                method: request.method,
                dataType: "json"
            };
            if (request.requestBody && request.requestBody.formData) {
                settings.data = request.requestBody.formData;
            }
			
			if(request.url.indexOf("https://pan.baidu.com/api/sharedownload?")>= 0){
				$.ajax(settings).done(function(responseData) {
					// console.info(responseData);
					if(responseData.errno==0){
						if(responseData.list){
							var infos = "";
							for(var i=0;i<responseData.list.length;i++){
								infos += "文件名："; 
								infos += responseData.list[i].server_filename; 
								infos += "\n"; 
								infos += "文件地址："; 
								infos += responseData.list[i].dlink; 
								infos += "\n"; 
								infos += "大小："; 
								infos += responseData.list[i].size; 
								infos += "\n\n";
							}
							console.info(infos);
							if(responseData.list.length==1){
								window.open(responseData.list[0].dlink);
							}else{
								alert(infos);
							}
						}else{
							alert("找不到文件？！");
						}
						 hideBaiduTips();
					}else if(responseData.errno==-20){
						sendResponse("yes");					
						// console.info("再点一次哦~");
						 // alert("再点一次哦~");
						 $(".icon-download")[0].click();
						 hideBaiduTips();
					}else if(responseData.errno==112){
						alert("超时了，刷新一下~");
					}else{
						alert("不知名失败。。。");
					}
					hideBaiduTips();
				});
			}else if(request.url.indexOf("https://pan.baidu.com/api/download?")>= 0){
				$.ajax(settings).done(function(responseData) {
					// console.info(responseData);
					if(responseData.errno==0){
						if(responseData.dlink){
							var infos = "";
							for(var i=0;i<responseData.dlink.length;i++){
								infos += "文件ID："; 
								infos += responseData.dlink[i].fs_id; 
								infos += "\n"; 
								infos += "文件地址："; 
								infos += responseData.dlink[i].dlink; 
								infos += "\n\n";
							}
							console.info(infos);
							if(responseData.dlink.length==1){
								window.open(responseData.dlink[0].dlink);
							}else{
								alert(infos);
							}
						}else{
							alert("找不到文件？！");
						}
						 hideBaiduTips();
					}else if(responseData.errno==-20){
						//sendResponse("yes");					
						// console.info("再点一次哦~");
						  alert("再点一次哦~");
						 //$(".icon-download")[0].click();
						 //hideBaiduTips();
					}else if(responseData.errno==112){
						alert("超时了，刷新一下~");
					}else{
						alert("不知名失败。。。");
					}
					//hideBaiduTips();
				});
			}
            
			
            // 由于 sendResponse 是异步调用的，需要返回 true
            return true;
        }
);

function hideBaiduTips(){
	var bdTip = document.querySelector(".module-yun-tip");
	if(bdTip){
		bdTip.style.display="none";
	}	
}
