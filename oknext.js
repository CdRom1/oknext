var host = "";

getHost().then( (o) => {
	if(typeof o.host !== 'undefined') {host = o.host;}
	else {host = "172.25.100.100:443"; setHost(host);}
	startWs();
});
function ytnext() {
	document.getElementsByClassName("ytp-next-button ytp-button")[0].click();
}
function spotinext() {
	document.getElementsByClassName("control-button spoticon-skip-forward-16")[0].click();
}
function startWs() {
//start ws
console.log("starting ws");
console.log("host: " + host);
var ws = new WebSocket("wss://" + host);
ws.onopen = function (event) {
	  ws.send("oknext browser ready !"); 
};
ws.onmessage = function (event) {
	if(event.data == "next") {
		picknext();
	}
	console.log(event);
}
}

function picknext() {
	switch(window.location.hostname) {
		case "www.youtube.com":
			ytnext();
			break;
		case "open.spotify.com":
			spotinext();
			break;
	}
}


//dirty copy of options

function setHost(hoststr) {
	return(extApi().storage.local.set({host: hoststr}));
}

function getHost() {
	if (typeof browser !== 'undefined') {
		return browser.storage.local.get(['host']);
	}
	if (typeof chrome !== 'undefined') {
		//fucking non-standard API they're proud of because you can sync to google cloud but doesn't support promises even for local storage and has a different name because of fucking branding guidelines
		return new Promise(function(resolve, reject) {
			chrome.storage.local.get(['host'], (o) => resolve(o));
		});
	}
}
function extApi() {
	if (typeof browser !== 'undefined') {
		return browser;
	}
	if (typeof chrome !== 'undefined') {
		return chrome;
	}
}

