function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	if(cookieValue == '' || seconds < 0) {
		cookieValue = '';
		seconds = -2592000;
	}
	if(seconds) {
		var expires = new Date();
		expires.setTime(expires.getTime() + seconds * 1000);
	}
	domain = !domain ? 'www.tianya.cn' : domain;//此处test.test.com换为默认域名
	path = !path ? '/' : path;
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '/')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

function setcookies(cookies, seconds, path, domain, secure){
	var cookieStrs = cookies.split("; ");
	for(var i=0;i<cookieStrs.length;i++){
		var cookieStr = cookieStrs[i];
		var sIdx = cookieStr.indexOf("=");
		var cookieName = cookieStr.substring(0,sIdx);
		var cookieValue = cookieStr.substring(sIdx+1);
		setcookie(cookieName, cookieValue, seconds, path, domain, secure);
	}
}