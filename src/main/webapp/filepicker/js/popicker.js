(function(window){
	var util = {
		'getHostDomain' : function() {
			var scriptList = document.getElementsByTagName("script"),
				thisUrl = scriptList[scriptList.length-1].src;
			return thisUrl.match(/^https?:\/\/[a-z0-9-_:\.]*/i)[0];
		}
	}

	const MY_DOMAIN = util.getHostDomain();
	const HOST_DOMAIN = 'http://polaris.sayinfo.co.kr:8091';
	const RESOURCES_PICKER = MY_DOMAIN + "/filepicker/css";
	const PICKER_URL = HOST_DOMAIN + "/magicsso/index_gb.jsp";
	//const PICKER_URL = HOST_DOMAIN + "/filepicker";
    //const OPENAPI_FILE_DOWNLOAD = '';

    var popicker = {
    	'confirmCB' : function(data){
    		alert(data);
    	},
    	'cancelCB' : null,
    	'open' : function(webData) {
    		popicker.confirmCB = webData.confirmCB;
    		popicker.cancelCB = webData.cancelCB;
    		//alert(PICKER_URL);
			pickerPopup.popupOpen(PICKER_URL);
        }
    }

	var pickerPopup = {
		'events' : {
    		'confirm' : function(selectedInfo) {
				pickerPopup.popupClose();

    			var callback = popicker.confirmCB;
    			if(callback) {
    				callback(selectedInfo);
    			}
    		},
        	'cancel' : function() {
				pickerPopup.popupClose();

        		var callback = popicker.cancelCB;
        		if(callback) {
        			callback();
    			}
        	},
    	},
		'messageTarget' : null,
		'sendMessage' : function(jsonData, targetOrigin) {
			alert(jsonData);
			alert(targetOrigin);
            var target = pickerPopup.messageTarget;
            if(target) {
                target.postMessage(JSON.stringify(jsonData), targetOrigin);
            }
        },
        'receiveMessage' : function(event) {
        	if(event.origin === HOST_DOMAIN) {
        		var data = event.data;
        		if(data && data.match(/^{.*}$/g)) {
        			var jsonMessage = JSON.parse(event.data),
        				fnEvent = pickerPopup.events[jsonMessage.fnName];
        			
        			if(fnEvent) {
        				fnEvent(jsonMessage.list);
        			}
        		}
        	}
        },
		'pickerSetting' : function() {
        	var settings = {
					'fnName' : "init"
        		};
			pickerPopup.sendMessage(settings, HOST_DOMAIN);
        },
		'popupOpen' : function(url) {
			var parentDocument = window.document,
				popicker = parentDocument.getElementById("popicker");

			if(popicker === null) {
				window.addEventListener("message", pickerPopup.receiveMessage);

				var link = parentDocument.createElement("link");
				link.id = "popopupStyle";
				link.rel = "stylesheet";
				link.type = "text/css";
				link.href = RESOURCES_PICKER + "/popopup.css";
				parentDocument.body.appendChild(link);
				
				var div = parentDocument.createElement("div");
				div.innerHTML = '<div class="podim"></div><iframe id="popicker" src="' + url + '" frameborder="0"></iframe>';
				parentDocument.body.appendChild(div);

				var pickerIframe = parentDocument.getElementById("popicker");
				pickerPopup.messageTarget = pickerIframe.contentWindow;
				pickerIframe.addEventListener("load", pickerPopup.pickerSetting);
			}
		},
		'popupClose' : function() {
			var parentDocument = window.document,
				popicker = parentDocument.getElementById("popicker");

			if(popicker !== null) {
				parentDocument.body.removeChild(popicker.parentElement);
			}

			window.removeEventListener("message", pickerPopup.receiveMessage);
		}
	}
    window.popicker = popicker;
})(window);