var ossSearchDisable = true;
var ossSearchClear = true;



$(document).ready(function () {
	$('#fileListTable').bootstrapTable({
		pagination: true,
		showExport: true,
		sortable: true,
		resizable: true,
		pageSize: 10,
		pageList: [10, 25, 50, 100, 200],
		sidePagination: 'server',
		ajax: getFileListTable
	});
	
	$('#fileSrcButton').on('click', fileSrcAjaxSubmit);
	$('#zipFileDownloadButton').on('click', zipDownloadAjaxSubmit);
	
	$("#fileSrcName").keyup(function(event) {
	    if (event.keyCode === 13) {
	        $("#fileSrcButton").click();
	    }
	});
});



function fileSrcAjaxSubmit(e) {
	e.preventDefault();
	ossSearchClear = true;
	ossSearchDisable = false;
	$('#fileListTable').bootstrapTable('removeAll');
	$('#fileListTable').bootstrapTable('selectPage', 1);
	$('#fileListTable').bootstrapTable('refresh');
}



function zipDownloadAjaxSubmit(e) {
	e.preventDefault();	
	
	var selection = $('#fileListTable').bootstrapTable('getSelections')[0];
	
	if (selection == null || selection.length === 0) {
		toastr.error("문서를 검색하고 선택해 주세요")
		return;
	}
	
	if ( selection.idPolarisDoc == null || selection.idPolarisDoc.length === 0 ) {
		toastr.error("공편ID가 있는 문서만 리포팅이 가능합니다")
		return;
	}
	
	var idPolairsDoc = selection.idPolarisDoc;
	
	var uri = ERROR_REPORT_ZIPFILE_DOWNLOAD_API.replace("{docId}", idPolairsDoc);
	
	window.location=uri;
	
	toastr.info("문서를 다운로드 합니다<br>(크롬 브라우저 추천)")
}



function getFileListTable(param) {
	if (ossSearchDisable === true) {
		param.success({
			total: 0,
			rows: null
		});
		return;
	}

	if (ossSearchClear === true) {
		ossSearchClear = false;
		firstResult = 0;
	}

	var fileName = $('#fileSrcName').val().trim();
	if (fileName == null || fileName.length === 0 ) {
		toastr.error("정확한 파일명을 입력하세요");
		return;
	}
	
	/*
	if (fileName.length < 2 ) {
		alert("검색은 3글자 이상 가능합니다");
		return;
	}
	*/
	
	var firstResult = param.data.offset;
	var maxResults = param.data.limit;
	var submitData = {
		'name': fileName,
		'page': firstResult,
		'size': maxResults
	};

	popcorn.drivesearchfilenamelist(submitData, function successCB(res) {
		if (res.resultCode === 0 && res.list.length <= 0) {
			toastr.info("검색 결과가 없습니다.");
		}

		param.success({
			total: res.count,
			rows: res.list
		});
	}, commonUtil.commonErrCB);
}