var host = "";
browser.storage.local.get("hostSetting").then( (o) => {try {host = o["hostSetting"]["host"];} catch{ 
	host = "172.25.100.100:443";
	hostSetting = {host: host};
	browser.storage.local.set({hostSetting})i;
}});
function ytnext() {
	document.getElementsByClassName("ytp-next-button ytp-button")[0].click();
}
function spotinext() {
	document.getElementsByClassName("control-button spoticon-skip-forward-16")[0].click();
}
//start ws
console.log("starting ws");
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
