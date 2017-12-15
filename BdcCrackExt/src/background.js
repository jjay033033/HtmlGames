var repeat = "no";

chrome.webRequest.onBeforeRequest.addListener (  

	function(details) {
		if(window.localStorage.isInside == 'true'){			
		  // 如果请求带有特殊标记，则不进行修改
			if (repeat == "yes"||details.url.endsWith("#do_not_modify_this_request")) {
				repeat = "no";
				return {}
			}
			details.requestBody.formData.encrypt = 0;
			details.requestBody.formData.extra = details.requestBody.formData.extra[0];
			details.requestBody.formData.fid_list = details.requestBody.formData.fid_list[0];
			details.requestBody.formData.path_list = details.requestBody.formData.path_list[0];
			details.requestBody.formData.primaryid = details.requestBody.formData.primaryid[0];
			details.requestBody.formData.product = details.requestBody.formData.product[0];
			details.requestBody.formData.uk = details.requestBody.formData.uk[0];
			if(details.requestBody.formData.vcode_input){
				details.requestBody.formData.vcode_input = details.requestBody.formData.vcode_input[0];
			}
			if(details.requestBody.formData.vcode_str){
				details.requestBody.formData.vcode_str = details.requestBody.formData.vcode_str[0];
			}
			// console.log(details);  
			// 使用消息机制将请求传递给页面再发起 ajax，而不是在背景页中发起
			chrome.tabs.sendMessage(details.tabId, details, function(response) {
				repeat = response;
				// console.info("finished22222!");
			});
			 return {cancel: true};
			// alert(details);
		}
  
	},  
	   
	{urls:["https://pan.baidu.com/api/sharedownload*"]},  //监听页面请求,你也可以通过*来匹配。  
	["blocking","requestBody"]   
); 

