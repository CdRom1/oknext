browser.storage.local.get("hostSetting").then( (o) => {try {document.getElementById("host").value = o["hostSetting"]["host"];} catch{ setHost("172.25.100.100:443");}});
document.getElementById("optionSubmit").addEventListener("click", () => savePreferences());
function savePreferences() {
	setHost(document.getElementById("host").value);
}
function setHost(hoststr) {
	hostSetting = {host: hoststr};
	browser.storage.local.set({hostSetting});
	
}
