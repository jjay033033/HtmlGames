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
            $.ajax(settings).done(function(responseData) {
				console.info(responseData);
				if(responseData.errno==0){
					if(responseData.list){
						if(responseData.list.length==1){
							window.open(responseData.list[0].dlink);
						}else{
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
