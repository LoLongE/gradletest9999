var network = {
	useAjax : function (method, reqUrl, reqData, successCB, errorCB)
	{
		if(!isOnline())
			return;
		$.ajax({
			type: method,
			url: reqUrl,
			data: reqData,
			dataType:"json",
			contentType:"application/json",
			success: successCB,
			error : errorCB,
			timeout: 240000
		});
	}
	, useAjaxText : function (method, reqUrl, reqData, successCB, errorCB)
	{
		if(!isOnline())
			return;
		$.ajax({
			type: method,
			url: reqUrl,
			data: reqData,
			dataType:"text",
			success: successCB,
			error : errorCB,
			timeout: 240000
		});
	}
	, useAjaxform : function (method, reqUrl, reqData, cur, successCB, errorCB)
	{
		if(!isOnline())
			return;
		var xhr = new XMLHttpRequest(),
        upload = xhr.upload;
		if(reqUrl != SETPORTRAIT)
		{
			upload.addEventListener("progress", function (ev) {
				progress(cur, ev);
			}, false);
			
		}	
			
		upload.addEventListener("error", errorCB, false);
	    xhr.addEventListener('abort', function() { on_abort(); }, false);
	    xhr.onreadystatechange=function()
	    {
	    	if(xhr.readyState == 4) {
	    		if(xhr.status == 200)
	    			successCB(xhr.responseText);
	    		else 
	    			successCB("");
	    		//console.log('complete' + xhr.responseText);
	    	}
	    }
	    
	    xhr.open("POST",reqUrl );
	    xhr.setRequestHeader("Cache-Control", "no-cache");
	    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	    xhr.setRequestHeader("X-File-Name", "TEST");
	    xhr.send(reqData);

	    return xhr;
	}
	, useAjaxform2 : function (method, reqUrl, reqData, successCB, errorCB)
	{
		if(!isOnline())
			return;
	    $.ajax({
	        url: reqUrl,
	        type: method, // 'POST',
	        data: reqData,
//	        async: false,
	        cache: false,
	        contentType: false,
	        processData: false,
	        success: successCB,
	        error: errorCB,
	        timeout: 240000
	    });
	}
	, useAjaxform3 : function (method, reqUrl, reqData, cur, successCB, errorCB)
	{
		if(!isOnline())
			return;
	    $.ajax({
	        url: reqUrl,
	        type: method, // 'POST',
	        data: reqData,
	        async: false,
	        cache: false,
	        contentType: false,
	        processData: false,
	        success: successCB,
	        error: errorCB,
	        timeout: 240000
	    });
	}
	, GetAjaxform : function (method,requrl,successCB,errorCB)
	{
		$.ajax({
			type:method,
			url:requrl,
			async:false
		}).error(function(msg){alert(msg);}).done(successCB);
	}
	, useAjaxform4 : function (method, reqUrl, reqData, successCB, errorCB)
	{
		if(!isOnline())
			return;

 		  var xhr = new XMLHttpRequest();
		  //xhr.addEventListener("error", errorCB, false);
	    xhr.onreadystatechange=function()
	    {
				if(xhr.readyState == 4) {
  	    	if(xhr.status == 200)
  	    		successCB(xhr);
  	    	// else
  	    		// successCB("");
  	    	//console.log('complete' + xhr.responseText);
  	    }
	    };

	    xhr.open("POST",reqUrl );
	    xhr.setRequestHeader("Content-Type", "application/json");
			xhr.responseType = 'blob';
	    xhr.send(reqData);

	    return xhr;
	}
};

function isOnline() {
	return navigator.onLine;    
}

function on_abort()
{
	console.log("xhr abort");
}
