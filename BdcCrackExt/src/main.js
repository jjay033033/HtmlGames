var isInsideEle = document.getElementById('isInside');
isInsideEle.onclick = function(){
	// alert(isInsideEle.checked);
	window.localStorage.isInside = isInsideEle.checked;
};

!function(){
	initIsInsideHtml();
}();

function initIsInsideHtml(){
	// console.info(window.localStorage.isInside);
	if(window.localStorage.isInside == 'true'){
		isInsideEle.checked = true;
	}
}