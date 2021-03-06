
var popcorn = {
	drivesearchfilenamelist: function(data, successCB, errorCB) {
		network.useAjax("POST", DRIVE_SEARCHFILENAME_LIST_API, JSON.stringify(data), successCB, errorCB);
	},
	downloaderrorreport: function(successCB, errorCB) {
		network.useAjax("GET", CURRENT_ENGINE_VERSION_API, null, successCB, errorCB);
	},
	engineVersion: function(successCB, errorCB) {
		network.useAjax("GET", CURRENT_ENGINE_VERSION_API, null, successCB, errorCB);
	},
	engineVersionUpdate: function(version, successCB, errorCB) {
		var uri = UPDATE_ENGINE_VERSION_API.replace("{version}", version);
		network.useAjax("GET", uri, null, successCB, errorCB);
	},
	serverStatus: function(successCB, errorCB) {
		network.useAjax("GET", SERVER_STATUS_API, null, successCB, errorCB);
	},
	serverControll: function(uri, successCB, errorCB) {
		network.useAjax("GET", uri, null, successCB, errorCB);
	},
	deployHistory: function(start, size, successCB, errorCB) {
		network.useAjax("GET", DEPLOY_HISTORY_API.replace("{start}", start).replace("{size}", size), null, successCB, errorCB);
	},
	rollback: function(filename, successCB, errorCB) {
		var encoded = encodeURI(filename);
		network.useAjax("GET", ROLLBACK_API.replace("{filename}", encoded), null, successCB, errorCB);
	}
}
