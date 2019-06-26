hostField = document.getElementById("host");
renderHost();
document.getElementById("optionSubmit").addEventListener("click", () => savePreferences());

function renderHost() {
	getHost().then( (o) => {
		if(typeof o.host !== 'undefined') {hostField.value = o.host;}
		else {setHost("172.25.100.100:443");}
	});
}

function savePreferences() {
	setHost(hostField.value);
}
function setHost(hoststr) {
	extApi().storage.local.set({host: hoststr});
	renderHost();
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
