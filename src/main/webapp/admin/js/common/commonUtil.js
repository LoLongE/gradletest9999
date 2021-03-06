/**
 * commonUtil.js for every page
 * created on 20140226 by youngone
 * 
*/
if(window.console == undefined) {console={log:function(){}};};

var isNotDummy = true;
//if(location.host=='localhost:6080') isNotDummy = false;

var commonUtil = {
		test : function() {
			
		}, booleanFormatUtilType : function(val, row, index){
			if ( val == false ) {
				return "";
			} else {
				return "<span class='badge badge-pill badge-success'>OK</span>";
			} 
		}
		, userDetailFormatter : function(val, row, index){
			return '<a href=# onclick="commonUtil.userDetail(event);">'+val+'</a>'
		}
		,userDetail : function (e) {
			var urlStr = location.protocol+'//'+location.host+'/view/user?id='+e.srcElement.innerHTML+'#userdetail';	
			window.open(urlStr);	
		}
		, userEmailDetailFormatter : function(val, row, index){
			if(val)
				return '<a href=# onclick="commonUtil.userEmailDetail(event);">'+val+'</a>'
		},userEmailDetail : function (e) {
			var urlStr = location.protocol+'//'+location.host+'/view/user?email='+e.srcElement.innerHTML+'#userdetail';	
			window.open(urlStr);	
		},notifytestuserdetail : function (e) {
			var urlStr = location.protocol+'//'+location.host+'/view/notifytestuser?id='+e.srcElement.innerHTML+'#notifytestuserdetail';	
			window.open(urlStr);	
		},notifytestuseremaildetail : function (e) {
			var urlStr = location.protocol+'//'+location.host+'/view/notifytestuser?email='+e.srcElement.innerHTML+'#notifytestuserdetail';	
			window.open(urlStr);	
		}
		, exportToExcelHtml : (function(table, name, filename) {
		    var uri = 'data:application/vnd.ms-excel;charset=UTF-8;base64,'
		    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"'
		    	+ ' xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'
		    	+ '<x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>'
		    	+ '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
		    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
		    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
		    return function(table, name, filename) {
		        var ctx;
		        if(name=='대외비_회원목록') {
		        	table = $('table#'+table).clone();
		        	table.find('tbody tr').each(function(index) {
		        		$(this).find('td:eq(2)').text('');
		        		$(this).find('td:eq(3)').text('');
		        	});
		        	ctx = { worksheet: name || 'Worksheet', table: table.html() };
		        }
		        else if (!table.nodeType) {
		        	 table = document.getElementById(table);
		        	 ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
		        }
	             document.getElementById("dlink").href = uri + base64(format(template, ctx));
	             document.getElementById("dlink").download = filename;
	             document.getElementById("dlink").click();
		    }
		})()
		, exportToTXTPost : (function(table, filename) {
		  var uri = 'data:text/plain;charset=utf-8,';

		  return function(table, filename) {
            document.getElementById("dlink").href = uri + table;
            document.getElementById("dlink").download = filename;
            document.getElementById("dlink").click();
            }
		})()
		,exportToExcelPost : (function(table, sheetname, filename) {
			  var uri = 'data:application/vnd.ms-excel;charset=UTF-8;base64,'
				    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"'
				    	+ ' xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'
				    	+ '<x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>'
				    	+ '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
				    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
				    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
				  return function(table, sheetname, filename) {
				    var ctx = {worksheet: sheetname || 'Worksheet', table: table};
		            document.getElementById("dlink").href = uri + base64(format(template, ctx));
		            document.getElementById("dlink").download = filename;
		            document.getElementById("dlink").click();
				  }
				})()
		,logOutAction : function() {
			popcorn.logout(function(json) {
				if( json.resultCode == 0 ) {
				    if (typeof (localStorage) == 'undefined') {
				        alert("죄송합니다. 브라우저가 HTML5 로컬 스토리지를 지원하지 않거나 장비에서 Private Browsing이 설정되어 있습니다.");
				    }
				    else {
						localStorage.removeItem("userStoredInfo");
				    }
					location.href = "/";
				} else {
					alert(json.resultMsg);
				}
			}, function() {
				alert("오류 입니다.");
			});
		}
		, commonPreventEvent : function(e) {
			if (e.preventDefault) {
			    e.preventDefault();
			} else {
			    e.returnValue = false;
			}
		}
		, commonStopPropagation : function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		}
		, commonErrCB : function(err) {
//			console.log('error-------------------', err);
			if( err.status && err.status==403 ) {
				alert('페이지에 접근할 수 없습니다.\r\n관리자에게 문의하세요');
				commonUtil.removeProgressBar();
//				location.href = '/'; // view/home으로 가서 내 권한정보 확인
			}
			else if( err.status && err.status==401 ) {
//				alert('세션이 만료되었거나 로그인 상태가 아닙니다. 다시 로그인해 주십시오.');
				location.href = '/view/login';
			}else if (err.resultCode == 104){
				alert('6개월 이내 사용한 적 있는 비밀번호로 바꿀 수 없습니다! You can not use the passwords previously used within six months!');
			}
			else {
				setTimeout(function(){
					if(errorCodes[err.resultCode]!=null) {
						alert('Oops, something happened :(\r\nCode: '+err.resultCode+'\r\nMessage: '+errorCodes[err.resultCode]);
					} else {
						alert('Oops, something happened :(\r\nResult: '+err.resultCode+'\r\nMessage: '+err.resultMsg+'\r\nStatus: '+err.status+'\r\nDetails: '+err.statusText);
					}
					commonUtil.removeProgressBar();
//					window.location.reload(); // 무한반복될 가능성 많음
				}, 500);
			}
		}
		, getSelector : function(e) {
			return (e.target) ? $(e.target) : $(e.srcElement);
		}
		, getKeyCode: function(e) {
			return (e.which) ? e.which : e.keyCode;
		}
		, countCheckedBox : function(pId, tId, msg1, msg2, allowMulti) {
			var pIdStr = ( (pId==undefined || pId==null) ? 'view' : pId );
			var tIdStr = ( (tId==undefined || tId==null) ? 'table' : tId );
			var msgStr1 = ( (msg1==undefined || msg1==null) ? '하나만 선택해 주세요.' : msg1);
			var msgStr2 = ( (msg2==undefined || msg2==null) ? '선택된 필드가 없습니다.' : msg2);
			var checkedCnt = 0;
			var $tr;
			$('div#'+pIdStr+' table#'+tIdStr).find('tbody tr').each(function(index){
				if($(this).find('td:eq(0) input:checkbox').prop('checked')) {
					checkedCnt++;
					$tr = $(this);
				}
			});
			if(checkedCnt>1) {
				if(allowMulti) {
				} else {
					alert(msgStr1);
					return checkedCnt;
				}
			} else if(checkedCnt==0) {
				alert(msgStr2);
				return checkedCnt;
			}
			return checkedCnt;
		}
		, resetCheckedBox : function(pId, tId) {
			var pIdStr = ( (pId==undefined || pId==null) ? 'view' : pId );
			var tIdStr = ( (tId==undefined || tId==null) ? 'table' : tId );
			$('div#'+pIdStr+' table#'+tIdStr).find('tbody tr').each(function(index){
				$(this).find('td:eq(0) input:checkbox').prop('checked', false);
			});
		}
		, renderTable : function(thArr, tdArr, renderElObj, resList, extraTd) {
			var theadObj = renderElObj.find('thead');
			theadObj.empty();
			var tbodyObj = renderElObj.find('tbody');
			tbodyObj.empty();
			var thStr = commonUtil.getTrStr('th', thArr);
			var tdStr = '';
			var count = resList.length;
			for(var i = 0; i < count; i++) {
			    var item = resList[i];
			    tdStr += '<tr><td><input id="selRow'+i+'" type="checkbox" onclick="commonUtil.checkBoxChainSelectAll(event);"/></td>';
//			    tdStr += '<td>'+i+'</td>'; // 순서 index용
			    tdStr += commonUtil.getTrStr('td', tdArr, item);
			    if(extraTd!=undefined) {
			    	tdStr += '<td><input type="button" id="'+extraTd.idStr+'_'+i+'" value="'+extraTd.labelStr+'" onclick="'+extraTd.actionStr+'(event);" class="'+extraTd.cssClassStr+'" '+extraTd.otherAttr+'/></td>';
			    }
				tdStr += '</tr>';
			}		
			theadObj.append(thStr);
			tbodyObj.append(tdStr);
		}
		, renderTableRowMerge : function(thArr, tdArr, renderElObj, resList, extraTd, rowMerge) {
			var radioName = 'rowMergeRadio_'+renderElObj.attr('id');
			var theadObj = renderElObj.find('thead');
			theadObj.empty();
			var tbodyObj = renderElObj.find('tbody');
			tbodyObj.empty();
			var thStr = commonUtil.getTrStr('th', thArr);
			theadObj.append(thStr);
			var tdStr = '';
			var count = resList.length;
			for(var i = 0; i < count; i++) {
			    var item = resList[i];
			    var rowSpanVal = 1;
			    var rowSpanTd;
			    if(rowMerge) {
				    if(i==0 || tbodyObj.find('tr.rowSpan_'+item[rowMerge.fieldName]).length<1) {
				    	tdStr = '<tr class="rowSpan_'+item[rowMerge.fieldName]+'"><td rowSpan="1" class="central"><input id="selRow'+i+'" type="'+rowMerge.type+'" '+(rowMerge.type=='radio' ? 'name="'+radioName+'"' : '')+'/></td>';
				    } else {
				    	rowSpanTd = tbodyObj.find('tr.rowSpan_'+item[rowMerge.fieldName]+' td:eq(0)');
				    	rowSpanVal = parseInt(rowSpanTd.attr('rowspan'));
				    	rowSpanTd.prop('rowSpan', ++rowSpanVal);
				    	tdStr = '<tr>';
				    }
			    }
			    else tdStr = '<tr><td class="central"><input id="selRow'+i+'" type="checkbox"/></td>';
//			    tdStr = '<td>'+i+'</td>'; // 순서 index용
			    tdStr += commonUtil.getTrStr('td', tdArr, item);
			    if(extraTd!=undefined) {
			    	tdStr += '<td><input type="button" id="'+extraTd.idStr+'_'+i+'" value="'+extraTd.labelStr+'" onclick="'+extraTd.actionStr+'(event);" class="'+extraTd.cssClassStr+'" '+extraTd.otherAttr+'/></td>';
			    }
				tdStr += '</tr>';
				tbodyObj.append(tdStr);
			}
		}
		, renderTableNoCheckbox : function(thArr, tdArr, renderElObj, resList, extraTd, firstIdx) {
			var theadObj = renderElObj.find('thead');
			theadObj.empty();
			var tbodyObj = renderElObj.find('tbody');
			tbodyObj.empty();
			var thStr = commonUtil.getTrStr('th', thArr);
			var tdStr = '';
			var count = resList.length;
			for(var i = 0; i < count; i++) {
			    var item = resList[i];
			    var evtParamField;
//			    console.log("~~~~~~~~~~~item", item);
			    if(item instanceof Array) {
//			    	console.log("*************Array!");
			    	count += (item.length-1);
			    	for (var j = 0; j < item.length; j++) {
			    		var innerItem = item[j];
					    tdStr += (i%2==1 ? '<tr class="odd">' : '<tr>');
					    tdStr += '<td class="central">'+((firstIdx) ? ++firstIdx : (i+1))+'</td>'; // 순서 index용
					    tdStr += commonUtil.getTrStr('td', tdArr, innerItem);
					    if(extraTd!=undefined) {
					    	if(extraTd['checkNull']) {
					    		evtParamField = innerItem[extraTd['paramField']]; 
					    		if(evtParamField!=null)
					    			tdStr += '<td><input type="button" id="'+extraTd.idStr+'_'+i+'" value="'+extraTd.labelStr+'" onclick="'+extraTd.actionStr+'(\''+evtParamField+'\');" class="'+extraTd.cssClassStr+'" '+extraTd.otherAttr+'/></td>';
					    		else tdStr += '<td></td>';
					    	} else tdStr += '<td><input type="button" id="'+extraTd.idStr+'_'+i+'" value="'+extraTd.labelStr+'" onclick="'+extraTd.actionStr+'(event);" class="'+extraTd.cssClassStr+'" '+extraTd.otherAttr+'/></td>';
					    }
						tdStr += '</tr>';
			    		i++;
			    	}
			    } else {
				    tdStr += (i%2==1 ? '<tr class="odd">' : '<tr>');
				    tdStr += '<td class="central">'+((firstIdx) ? ++firstIdx : (i+1))+'</td>'; // 순서 index용
				    tdStr += commonUtil.getTrStr('td', tdArr, item);
				    if(extraTd!=undefined) {
				    	if(extraTd['checkNull']) {
				    		evtParamField = item[extraTd['paramField']];
				    		if(evtParamField!=null)
				    			tdStr += '<td><input type="button" id="'+extraTd.idStr+'_'+i+'" value="'+extraTd.labelStr+'" onclick="'+extraTd.actionStr+'(\''+evtParamField+'\');" class="'+extraTd.cssClassStr+'" '+extraTd.otherAttr+'/></td>';
				    		else tdStr += '<td></td>';
				    	} else tdStr += '<td><input type="button" id="'+extraTd.idStr+'_'+i+'" value="'+extraTd.labelStr+'" onclick="'+extraTd.actionStr+'(event);" class="'+extraTd.cssClassStr+'" '+extraTd.otherAttr+'/></td>';
				    }
					tdStr += '</tr>';
			    }
			}		
			theadObj.append(thStr);
			tbodyObj.append(tdStr);
		}
		, renderTableNoCheckboxLicense : function(thArr, tdArr, renderElObj, resList, extraTd, firstIdx) {
			var theadObj = renderElObj.find('thead');
			theadObj.empty();
			var tbodyObj = renderElObj.find('tbody');
			tbodyObj.empty();
			var thStr = commonUtil.getTrStr('th', thArr);
			var tdStr = '';
			var count = resList.length;
			for(var i = 0; i < count; i++) {
			    var item = resList[i];
			    var evtParamField;
				    tdStr += (i%2==1 ? '<tr class="odd">' : '<tr>');
				    tdStr += '<td class="central">'+((firstIdx) ? ++firstIdx : (i+1))+'</td>'; // 순서 index용
				    tdStr += commonUtil.getTrStr('td', tdArr, item);
				    if(extraTd!=undefined) {
				    	if( item.status=='VALID') {
				    		tdStr += '<td><input type="button" id="'+extraTd.idStr+'_'+i+'" value="'+extraTd.labelStr+'" onclick="'+extraTd.actionStr+'(event);" class="'+extraTd.cssClassStr+'" '+extraTd.otherAttr+'/></td>';
				    	}else if  ( item.status=='REFUNDED') {
				    		tdStr += '<td>환불 완료</td>';
				    	}
				    	else tdStr += '<td></td>';
				    }
					tdStr += '</tr>';
			}		
			theadObj.append(thStr);
			tbodyObj.append(tdStr);
		}
		, appendTableTr : function(tdArr, renderElObj, resList, extraTd, tdIdIdx) {
			var tbodyObj = renderElObj.find('tbody');
			if(tbodyObj.find('tr.noInfo').length>0) tbodyObj.empty();
			var tdStr = '';
			var count = resList.length;
			for(var i = 0; i < count; i++) {
			    var item = resList[i];
			    tdStr += (i%2==1 ? '<tr class="odd">' : '<tr>');
			    tdStr += '<td class="central"></td>'; // 순서 index용
			    tdStr += commonUtil.getTrStr('td', tdArr, item, tdIdIdx);
			    if(extraTd!=undefined) {
			    	tdStr += '<td><input type="button" value="'+extraTd.labelStr+'" onclick="'+extraTd.actionStr+'(event);" class="'+extraTd.cssClassStr+'" '+extraTd.otherAttr+'/></td>';
			    }
				tdStr += '</tr>';
			}		
			tbodyObj.append(tdStr);
		}
		, refreshTrOrder : function (renderElObj, orderTdIdx) {
			var tbodyObj = renderElObj.find('tbody');
			tbodyObj.find('tr').each(function(index){
				if(index%2==1) $(this).addClass('odd');
				else $(this).removeClass('odd');
				$(this).find('td:eq('+orderTdIdx+')').text(index+1);
			});
		}
		, getTrStr : function(trType, arrObj, item, tdIdIdx) {
			var trStr = (trType=='th' ? '<tr>' : '');
			var cellVal;
//			var cellClass = 'central';
			if(tdIdIdx!=null) { // tdIdidx should be used only for the tbody tr, not thead
				for (var x = 0; x<arrObj.length; x++) {
					cellVal = commonUtil.getItemInfo(item, arrObj[x]);
					cellClass = commonUtil.getCellClass(cellVal);
					if(tdIdIdx==x) trStr += '<'+trType+' id="dualCheck_'+cellVal+ ' >'+cellVal+'</'+trType+'>';
					else trStr += '<'+trType+' >'+cellVal+'</'+trType+'>';
				}
			} else {
				for (var x = 0; x<arrObj.length; x++) {
					if(arrObj[x]=='noItemStr') {
						//cellClass = 'central';
						trStr += '<'+trType+' >'+item+'</'+trType+'>';
					}
					else {
						if(trType=='th') {
							cellVal = arrObj[x];
							//cellClass = 'central';
						} else {
							cellVal = commonUtil.getItemInfo(item, arrObj[x]);
							//cellClass = commonUtil.getCellClass(cellVal);
						}
						trStr += '<'+trType+' >'+cellVal+'</'+trType+'>';
					}
				}
			}
			if(trType=='th') trStr += '</tr>'; 
			return trStr;
		}
		, getCellClass : function(cVal) {
			if( !isNaN(cVal) ) {
				if(typeof cVal == 'boolean') return 'central';
				else if(typeof cVal == 'object') return 'central';
				return 'dextrous';
			}
			else {
				if( cVal.indexOf('GB')>-1 || cVal.indexOf('MB')>-1 || cVal.indexOf('KB')>-1 ) return 'dextrous';
				return 'central';
			}
		}
		, getInnerListStr : function(itemArticleList) {
			var innerLStr = '';
			var valObj;
			if(itemArticleList.length) {
				for(var z=0; z<itemArticleList.length; z++) {
					valObj = itemArticleList[z];
					if(typeof valObj == 'object' && !$.isEmptyObject(valObj)) {
						valObj = valObj.id;
					}
					innerLStr += (valObj + ', <br/>');
				}
			} else {
				for(var z=0; z<20; z++) {
					valObj = itemArticleList[z];
					if(typeof valObj == 'object' && !$.isEmptyObject(valObj)) {
						valObj = valObj.id;
					}
					innerLStr += (valObj!=null ? valObj + ', <br/>' : '');
				}
			}
			return innerLStr;
		}
		, getItemInfo : function(item, article) {
			var tmpStr = item[article];
			if(tmpStr!=null) {
				tmpStr = ''+tmpStr;
				if(tmpStr.indexOf('input type="text"')>-1) {
					return tmpStr;
				}
			}
			if(commonUtil.checkIsArray(item[article])) return commonUtil.getInnerListStr(item[article]); 
			else if(article.indexOf('.')>0) {
				var p = article.split('.')[0];
				var c = article.split('.')[1];
				if(item[p]!=null) {
					return item[p][c] != null ? commonUtil.processItemStr(item[p][c], c) : '';
				} else return '';
			}
			else return (item[article]!=null ? /*item[article]*/ commonUtil.processItemStr(item[article], article) : (article=='userLevel' ? 'FREE' : ''));
		}
		, processItemStr : function(itemArticle, article) {
//			if(article=='userLevel') {
//				return ( itemArticle=='FREE' ? '무료' : (itemArticle.indexOf('PAID')>=0 ? itemArticle : '기타') );
//			}
			if(article=='productMonth') {
				return ( itemArticle+'개월' );
			}
			if(article=='payType') {
				return ( itemArticle=='PAID1_1MONTH' ? '1개월 결제' : (itemArticle=='PAID1_1YEAR' ? '1년 결제' : '기타') );
			}
			if(article.toLowerCase().indexOf('time')>=0 || article.toLowerCase().indexOf('regist')>=0 || article=='lastLogin') {
				if( article.toLowerCase().indexOf('registmanufacture')>=0 || article.toLowerCase().indexOf('registmobile')>=0 ){
					return ( itemArticle);
				}
				if(isNaN(itemArticle)) {
					if(typeof itemArticle == 'string' && itemArticle.indexOf('1970')>=0) return '';
					return commonUtil.dateFormatUtilType7(itemArticle);
				}
				else {
					if(article!='timePurchase' && article!='timeCancelled') {
						if(article=='timeExpire' && location.pathname=='/view/user') return commonUtil.dateFormatUtilType6(itemArticle);
						return commonUtil.dateFormatUtilType6(itemArticle*1000); //UI에 보여주도록 변환.
					}
					else if(location.pathname=='/view/payment' || location.pathname=='/view/refund' || location.pathname=='/view/team' || location.pathname=='/view/htcpayment' || location.pathname=='/view/asuspayment' || location.pathname=='/view/hppayment' || location.pathname=='/view/licensepayment' || location.pathname=='/view/orangepayment' || location.pathname=='/view/paymentprice' || location.pathname=='/view/paymentproduction' ) {
						return commonUtil.dateFormatUtilType6(itemArticle*1000);
					}
					else {
						return commonUtil.dateFormatUtilType6(itemArticle);
					}
				}
			}
			if(article.toLowerCase().indexOf('prize')>=0) {
				return commonUtil.convertToMB(itemArticle);
			}
			if(article.toLowerCase().indexOf('teamcapacity')>=0) {
				return commonUtil.convertToGB(itemArticle)+' GB';
			}
			return itemArticle;
		}
		, checkIsArray : function(checkObj) {
			if($.isArray(checkObj)) return true;
			else return false;
		}
		, makeBaseTable : function(parentDivId, tableId) {
			var parentDivIdStr = (parentDivId==undefined ? 'view' : parentDivId);
			var tableIdStr = (tableId==undefined ? 'table' : tableId);
			var elStr = '';
			elStr += '<table id="'+tableIdStr+'"  class="table table-responsive no-padding" "><thead><tr><th></th></tr></thead>'
			      + '<tbody><tr><td></td></tr></tbody></table>';			
			$('div#'+parentDivIdStr).html('').html(elStr);
			$('div#controlBtns input:button').hide();
		}
		, makeBasePager : function(pagerId, tableId) {
			var pagerIdStr = (pagerId==undefined ? 'pager' : pagerId);
			var tableIdStr = (tableId==undefined ? 'table' : tableId);
			var elStr = '';
			$('div#'+pagerIdStr).html('');
			$('div#'+pagerIdStr).remove();
			elStr += '<div id="'+pagerIdStr+'" class="pager custom">'
				  + '<input type="button" id="goFirst" class="btnFirst"/><input type="button" id="goPrev" class="btnPrev"/>'
				  + '<input type="text" id="pagedisplay" value="0" class="pagedisplay" disabled="disabled"/>'
			      + '<input type="button" id="goNext" class="btnNext"/><input type="button" id="goLast" class="btnLast"/>'
			      + '</div>'; 
			$(elStr).insertAfter('table#'+tableIdStr);
		}
		, makeBasePluginPager : function(pagerId, tableId) {
			var pagerIdStr = (pagerId==undefined ? 'pager' : pagerId);
			var tableIdStr = (tableId==undefined ? 'table' : tableId);
			var elStr = '';
			$('div#'+pagerIdStr).html('');
			$('div#'+pagerIdStr).remove();
			elStr += '<div id="pager" class="pager" width="90%"><form>'
				  + '<img src="/common/image/first.png" class="first"><img src="/common/image/prev.png" class="prev">'
			      + '<input type="text" class="pagedisplay">'
			      + '<img src="/common/image/next.png" class="next"><img src="/common/image/last.png" class="last">'
				  + '<select class="pagesize"><option selected="selected" value="10">10</option>'
				  + '<option value="20">20</option><option value="30">30</option><option value="40">40</option></select>'
				  + '</form></div>';
			$(elStr).insertAfter('table#'+tableIdStr);
		}
		, makeBasePluginPager40first : function(pagerId, tableId) {
			var pagerIdStr = (pagerId==undefined ? 'pager' : pagerId);
			var tableIdStr = (tableId==undefined ? 'table' : tableId);
			var elStr = '';
			$('div#'+pagerIdStr).html('');
			$('div#'+pagerIdStr).remove();
			elStr += '<div id="pager" class="pager" width="90%"><form>'
				  + '<img src="/common/image/first.png" class="first"><img src="/common/image/prev.png" class="prev">'
			      + '<input type="text" class="pagedisplay">'
			      + '<img src="/common/image/next.png" class="next"><img src="/common/image/last.png" class="last">'
				  + '<select class="pagesize"><option value="10">10</option>'
				  + '<option value="20">20</option><option value="30">30</option><option selected="selected" value="40">40</option></select>'
				  + '</form></div>';
			$(elStr).insertAfter('table#'+tableIdStr);
		}
		, makeEmptyTable : function(parentDivId, tableId, emptyHeaderMsg, emptyBodyMsg) {
			if(typeof parentDivId == 'string') {
				$('div#'+parentDivId+' table#'+tableId+' thead').html('<tr><th>'+emptyHeaderMsg+'</th></tr>');
				$('div#'+parentDivId+' table#'+tableId+' tbody').html('<tr class="noInfo"><td>'+emptyBodyMsg+'</td></tr>');
			} else {
				parentDivId.find('table#'+tableId+' thead').html('<tr><th>'+emptyHeaderMsg+'</th></tr>');
				parentDivId.find('table#'+tableId+' tbody').html('<tr class="noInfo"><td>'+emptyBodyMsg+'</td></tr>');
			}
		}
		, makeMultiEmptyTables : function(tableObjList) {
			for(var tIdx = 0; tIdx<tableObjList.length; tIdx++) {
				commonUtil.makeEmptyTable(tableObjList[tIdx].parentDivId, tableObjList[tIdx].tableId, tableObjList[tIdx].emptyHeaderMsg, tableObjList[tIdx].emptyBodyMsg);
			}
		}
		, controlBtns : function(paramArr) {
			for (var i=0; i<paramArr.length; i++) {
				$('#'+paramArr[i]).show();
			}
		}
		, toggleSelectAll : function(e) { // 테이블 헤더의 전체선택 체크박스 선택 혹은 해제시
			var isSelectAll = $('div#view table#table thead th input:checkbox').prop('checked');
			$('div#view table#table').find('tbody tr').each(function(index) {
				$(this).find('td:eq(0) input:checkbox').prop('checked', isSelectAll);
			});
			commonUtil.toggleSelectRange(isSelectAll);
		}
		, toggleSelectRange : function(isSelectAll, selectedRows) { // 테이블 헤더의 전체선택 체크박스 또는 테이블 각 행의 체크박스 클릭시
			var $tr = $('div#view table#table tbody tr');
			var totalCount = commonUtil.getTotalCount($tr);
			if(isSelectAll==true || (selectedRows>0 && selectedRows==$tr.length)) {
				$('div#selectAllArea span#selectedRange').text('전체 '+totalCount+'건 중 '+$tr.length+' 건이 선택되었습니다.');
				$('select#selectAllRange').show();
				$('span#selectedRange').show();
			} else {
				$('select#selectAllRange option:first').prop('selected', true);
				$('select#selectAllRange').hide();
				$('div#selectAllArea span#selectedRange').text('전체 '+totalCount+'건이 검색되었습니다.');
				if(selectedRows!=undefined) {
					if(selectedRows>0) {
						$('div#selectAllArea span#selectedRange').text('전체 '+totalCount+'건 중 '+selectedRows+' 건이 선택되었습니다.');
					}
				}
			}
		}
		, checkBoxChainSelectAll : function(e) { // 테이블 각 행의 체크박스 클릭시
			if($('div#view table#table thead th input:checkbox').length>0) {
				var isSelectAll = $('div#view table#table thead th input:checkbox').prop('checked');
				var needToToggle = 0;
				var $tr = $('div#view table#table tbody tr');
				var $clickedTarget = commonUtil.getSelector(e);
				$('div#view table#table').find('tbody tr').each(function(index) {
					if(isSelectAll!=$clickedTarget.prop('checked')) {
						if($(this).find('td:eq(0) input:checkbox').prop('checked')==$clickedTarget.prop('checked')) {
							needToToggle++;
						}
					} else {
						if($(this).find('td:eq(0) input:checkbox').prop('checked')!=$clickedTarget.prop('checked')) {
							needToToggle++;
						}
					}
				});
				if($clickedTarget.prop('checked')!=isSelectAll && isSelectAll) {
					$('div#view table#table thead th input:checkbox').prop('checked', !isSelectAll); 
					commonUtil.toggleSelectRange(!isSelectAll, $tr.length-needToToggle);
				} else {
					if(needToToggle==$('div#view table#table').find('tbody tr').length && needToToggle>0) {
						$('div#view table#table thead th input:checkbox').prop('checked', !isSelectAll); 
						commonUtil.toggleSelectRange(!isSelectAll, needToToggle);
					}
					else commonUtil.toggleSelectRange(isSelectAll, needToToggle);
				}
			}
		}
		, updateSelectRange : function(e) { // 테이블 위의 페이지 전체선택 도는 검색결과 전체선택 셀렉트 콤보 변경시
			var $tr = $('div#view table#table tbody tr');
			var totalCount = commonUtil.getTotalCount($tr);
			if($('select#selectAllRange').val()=='page') {
				$('div#selectAllArea span#selectedRange').text('전체 '+totalCount+'건 중 '+$tr.length+' 건이 선택되었습니다.');
			} else if($('select#selectAllRange').val()=='all') {
				$('div#selectAllArea span#selectedRange').text('전체 '+totalCount+'건 중 '+totalCount+' 건이 선택되었습니다.');
			}
		}
		, updateSearchResult : function(count, pageFlag) { // 새로운 조건으로 검색버튼 눌렀거나 혹은 기존 결과에서 테이블 페이지 이동한 경우
			if(pageFlag==true && $('select#selectAllRange').css('display')!='none' && $('select#selectAllRange').val()=='all') {
				$('div#view table#table thead th input:checkbox').prop('checked', true);
				$('div#view table#table').find('tbody tr').each(function(index) {
					$(this).find('td:eq(0) input:checkbox').prop('checked', true);
				});
				$('#selectedRange').text('전체 '+count+'건 중 '+count+' 건이 선택되었습니다.');
			} else {
				if(count!=undefined && count>0) {
					$('select#selectAllRange').hide();
					$('select#selectAllRange option:first').prop('selected', true);
					$('span#selectedRange').text('전체 '+count+'건이 검색되었습니다.');
					$('span#selectedRange').show();
				} else {
					$('select#selectAllRange').hide();
					$('span#selectedRange').text('');
					$('span#selectedRange').hide();
				}
			}
		}
		, getTotalCount : function($tr) {
			var totalCount = ( $tr ? $tr.length : 0 );
			if(location.pathname.indexOf('/user')>=0) {
				totalCount = sfData.usData.count;
			}
			else if(location.pathname.indexOf('/payment')>=0) {
				totalCount = sfData.psData.count;
			}
			else if(location.pathname.indexOf('/history')>=0) {
				totalCount = sfData.hsData.count;
			}
			else if(location.pathname.indexOf('/coupon')>=0) {
				totalCount = sfData.csData.count;
			}
			else if(location.pathname.indexOf('/refund')>=0) {
				totalCount = sfData.rsData.count;
			}
			return totalCount;
		}
		, dateFormatBase : function(d) {
			if (d.getMonth) {
				var curr_date;
				if(d.getDate()<10) {
					curr_date = "0"+d.getDate();
				}
				else {
					curr_date = ""+d.getDate();
				}
			    var curr_month;
			    if( (d.getMonth()+1) <10) {
			    	curr_month = "0"+(d.getMonth()+1);
			    }
			    else {
			    	curr_month = ""+(d.getMonth()+1);
			    }
			    var curr_year = ""+d.getFullYear();
			    var outputVal = curr_year + "-" + curr_month + "-" + curr_date;
			    return outputVal;
		    }
			else {
				return "2000-01-01";
			}
		}
		, dateFormatUtilType1 : function(outputVal) {
			if(outputVal>0) {
				if(typeof outputVal == 'string') {
					outputVal = outputVal.split("-").join("/");
				}
				var d = new Date(outputVal);
				outputVal = commonUtil.dateFormatBase(d);
			    return outputVal;
			} else return '';
		}
		, dateFormatUtilType2 : function(outputVal) {
			if(typeof outputVal == 'string') {
				outputVal = outputVal.split("-").join("/");
			}
			var d = new Date(outputVal);
		    outputVal = commonUtil.dateFormatBase(d);
			var curr_hour = d.getHours();
			if(parseInt(curr_hour)<10) {
				curr_hour = "0"+curr_hour;
			}
		    outputVal += (" "+curr_hour+":00");
		    return outputVal;
		}
		, dateFormatUtilType3 : function(outputVal) {
			if(typeof outputVal == 'string') {
				outputVal = outputVal.split("-").join("/");
			}
			var d = new Date(outputVal);
			outputVal = commonUtil.dateFormatBase(d);
			d.setDate(d.getDate()+6);
			var weekLater = commonUtil.dateFormatBase(d);
			outputVal = outputVal + " - " +weekLater;
		    return outputVal;
		}
		, dateFormatUtilType4 : function(outputVal) {
			if(typeof outputVal == 'string') {
				outputVal = outputVal.split("-").join("/");
			}
			var d = new Date(outputVal);
		    outputVal = commonUtil.dateFormatBase(d);
		    var dToday = new Date();
		    var todayVal = commonUtil.dateFormatBase(dToday);
		    outputVal = outputVal + " - "+todayVal;
		    return outputVal;
		}
		, dateFormatUtilType5 : function(outputVal) {
			if(typeof outputVal == 'string') {
				outputVal = outputVal.split("-").join("/");
			}
			var d = new Date(outputVal);
			var dM = d.getMonth()+1;
			var dMVal = (dM<10 ? "0"+dM : ""+dM);
		    return d.getFullYear()+"-"+dMVal;
		}
		, dateFormatUtilType6 : function(outputVal) {
			if(outputVal==0) return '';
			if(typeof outputVal == 'string') {
				outputVal = outputVal.split("-").join("/");
			}
			var d = new Date(outputVal);
		    outputVal = commonUtil.dateFormatBase(d);
			var curr_hour = d.getHours();
			if(parseInt(curr_hour)<10) {
				curr_hour = "0"+curr_hour;
			}
		    outputVal += (" "+curr_hour);
		    var curr_min = d.getMinutes();
		    if(parseInt(curr_min)<10) {
		    	curr_min = "0"+curr_min;
		    }
		    outputVal += (":"+curr_min);
		    return outputVal;
		}
		, dateFormatUtilType6Sec : function(outputVal) {
			return commonUtil.dateFormatUtilType6(outputVal*1000);
		}
		, dateFormatUtilType7 : function(outputVal) {
			if(outputVal==0) return '';
			if(typeof outputVal == 'string') {
				outputVal = outputVal.split("-").join("/");
			}
			var d = new Date(outputVal);
		    outputVal = commonUtil.dateFormatBase(d);
			var curr_hour = d.getHours();
			if(parseInt(curr_hour)<10) {
				curr_hour = "0"+curr_hour;
			}
		    outputVal += (" "+curr_hour);
		    var curr_min = d.getMinutes();
		    if(parseInt(curr_min)<10) {
		    	curr_min = "0"+curr_min;
		    }
		    outputVal += (":"+curr_min);
		    
		    var curr_sec = d.getSeconds();
		    if(parseInt(curr_sec)<10) {
		    	curr_sec = "0"+curr_sec;
		    }
		    outputVal += (":"+curr_sec);
		    return outputVal;
		}		
		, dateFormatUtilType8 : function(outputVal) {
			if(typeof outputVal == 'string') {
				outputVal = outputVal.split("-").join("/");
			}
			var d = new Date(outputVal);
			outputVal = commonUtil.dateFormatBase(d);
			d.setDate(d.getDate()-6);
			var weekBefore = commonUtil.dateFormatBase(d);
			outputVal = weekBefore + " - " + outputVal;
		    return outputVal;
		}
		, dateToTime : function(outputVal) {
			if(typeof outputVal == 'string') {
				outputVal = outputVal.split("-").join("/");
				var d = new Date(outputVal);
			} else {
				outputVal += '';
				if(outputVal.length!=8) {
					return ((new Date()).getTime());
				}
				var d = new Date(outputVal.substring(0, 4)+'/'+outputVal.substring(4, 6)+'/'+outputVal.substring(6));
			}
			return d.getTime();
		}
		, dateDiff : function(dateBegin, dateEnd) {
			if(typeof dateBegin == 'string') {
				dateBegin = dateBegin.split("-").join("/");
			}
			if(typeof dateBegin == 'string') {
				dateEnd = dateEnd.split("-").join("/");
			}
			var dBegin = new Date(dateBegin);
			var dEnd = new Date(dateEnd);
			dEnd.setDate(dEnd.getDate()-6);
			var dBeginTxt = commonUtil.dateFormatBase(dBegin);
			var dSpanTxt = commonUtil.dateFormatBase(dEnd);
			if(dBeginTxt == dSpanTxt) {
				return true;
			}
			else {
				return false;
			}
		}
		, convertToFileSizeReadable : function(size) {
			local = 'ko_KR'
			if(!size || size <= 0) {
		      value = 0.00;
		      value = poLocal.localizationNumber(value, local);
		      value += 'MB';
		      if(typeof size != 'undefined' && size == -1) value = '-';
		    } else if(size < 11) {
		        value = 0.01;
		        value = poLocal.localizationNumber(value, local, true);
		        value += 'KB';
		    } else if(size < 1024 * 1023) {
		    	/* KB */
		    	value = (Math.floor(size/1024*100)/100).toFixed(2);
		    	value = poLocal.localizationNumber(value, local, true);
		    	value += 'KB';
		    } else if(size < 1024 * 1024 * 1023) {
		      /* MB */
		      value = (Math.ceil(size/1024/1024*100)/100).toFixed(2);
		      value = poLocal.localizationNumber(value, local, true);
		      value += 'MB';
		    } else if(size < 1024 * 1024 * 1024 * 1023) {
		      /* GB */
		      value = (Math.ceil(size/1024/1024/1024*100)/100).toFixed(2);
		      value = poLocal.localizationNumber(value, local, true);
		      value += 'GB';
		    } else if(size < 1024 * 1024 * 1024 * 1024 * 1023) {
		      /* TB */
		      value = (Math.ceil(size/1024/1024/1024/1024*100)/100).toFixed(2);
		      value = poLocal.localizationNumber(value, local, true);
		      value += 'TB';
		    } else {
		      /* TB */
		      value = (Math.ceil(size/1024/1024/1024/1024*100)/100).toFixed(2);
		      value = poLocal.localizationNumber(value, local, true);
		      value += 'TB';
		    }
			return value;
		}
		, convertToMB : function(outputVal) {
			var numVal = outputVal/1048576;
			numVal = Math.round(numVal);
			return numVal;
		}
		, convertToGB : function(outputVal) {
			var numVal = outputVal/1073742824;
			numVal = Math.round(numVal*10)/10;
			numVal = numVal.toFixed(1);
			return numVal;
		}
		, setPagerInfo : function(searchTypeStr, tblObj, appendStr) {
			commonUtil.setTableSort(tblObj);
			if(appendStr!=undefined) commonUtil.setTablePager(tblObj, searchTypeStr, appendStr);
			else commonUtil.setTablePager(tblObj, searchTypeStr);
		}
		, setTableSort : function(tblObj) {
//			tblObj.tablesorter( {sortList: [[1,0], [2,0]]} ); // sort on the second and third column in ascending order.
			tblObj.tablesorter({ headers: { 0: { sorter: false}/*, 1: {sorter: false}*/ } }); // disable sorting on the first column.
		}
		, setSearchTypeForPager : function(searchTypeStr, appendStr) {
			var appendL = '';
			if(appendStr!=undefined) appendL = appendStr;
			$('#searchTypeForPager'+appendL).val(searchTypeStr);
		}
		, setTablePager : function(tblObj, searchTypeStr, appendStr) {
			if(appendStr!=undefined) {
				commonUtil.setSearchTypeForPager(searchTypeStr, appendStr);
				commonUtil.bindPagerEvents(tblObj, appendStr);
			} else {
				commonUtil.setSearchTypeForPager(searchTypeStr);
				commonUtil.bindPagerEvents(tblObj);
			}
		}
		, bindPagerEvents : function(tblObj, appendStr) {
			var appendL = '';
			if(appendStr!=undefined) appendL = appendStr;
			$('#goFirst'+appendL).unbind('click');
			$('#goPrev'+appendL).unbind('click');
			$('#goNext'+appendL).unbind('click');
			$('#goLast'+appendL).unbind('click');
			var searchType = $('#searchTypeForPager'+appendL).val();
			switch(searchType) {
				case 'user':
				{
					$('#goFirst'+appendL).bind('click', userSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', userSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', userSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', userSrcAjaxSubmit);
					break;
				}
				case 'payment':
				{
					$('#goFirst'+appendL).bind('click', paymentSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', paymentSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', paymentSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', paymentSrcAjaxSubmit);
					break;
				}
				case 'paymentprice':
				{
					$('#goFirst'+appendL).bind('click', paymentPriceSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', paymentPriceSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', paymentPriceSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', paymentPriceSrcAjaxSubmit);
					break;
				}
				case 'paymentproduct':
				{
					$('#goFirst'+appendL).bind('click', paymentProductSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', paymentProductSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', paymentProductSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', paymentProductSrcAjaxSubmit);
					break;
				}
				case 'htcpayment':
				{
					$('#goFirst'+appendL).bind('click', htcpaymentSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', htcpaymentSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', htcpaymentSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', htcpaymentSrcAjaxSubmit);
					break;
				}
				case 'refund':
				{
					$('#goFirst'+appendL).bind('click', refundSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', refundSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', refundSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', refundSrcAjaxSubmit);
					break;
				}
				case 'history':
				{
					$('#goFirst'+appendL).bind('click', historySrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', historySrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', historySrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', historySrcAjaxSubmit);
					break;
				}
				case 'coupon':
				{
					$('#goFirst'+appendL).bind('click', couponSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', couponSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', couponSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', couponSrcAjaxSubmit);
					break;
				}
				case 'couponevent':
				{
					$('#goFirst'+appendL).bind('click', eventSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', eventSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', eventSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', eventSrcAjaxSubmit);
					break;
				}
				case 'coupondetailA':
				{
					$('#goFirst'+appendL).bind('click', couponUserListSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', couponUserListSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', couponUserListSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', couponUserListSrcAjaxSubmit);
					break;
				}
				case 'coupondetailB':
				{
					$('#goFirst'+appendL).bind('click', couponUsedListSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', couponUsedListSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', couponUsedListSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', couponUsedListSrcAjaxSubmit);
					break;
				}
				case 'badcon':
				{
					$('#goFirst'+appendL).bind('click', badconSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', badconSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', badconSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', badconSrcAjaxSubmit);
					break;
				}
				case 'report':
				{
					$('#goFirst'+appendL).bind('click', reportSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', reportSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', reportSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', reportSrcAjaxSubmit);
					break;
				}
				case 'team':
				{
					$('#goFirst'+appendL).bind('click', getTeamListTable);
					$('#goPrev'+appendL).bind('click', getTeamListTable);
					$('#goNext'+appendL).bind('click', getTeamListTable);
					$('#goLast'+appendL).bind('click', getTeamListTable);
					break;
				}
				case 'orangepayment':
				{
					$('#goFirst'+appendL).bind('click', orangeSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', orangeSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', orangeSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', orangeSrcAjaxSubmit);
					break;
				}
				case 'asuspayment':
				{
					$('#goFirst'+appendL).bind('click', asuspaymentSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', asuspaymentSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', asuspaymentSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', asuspaymentSrcAjaxSubmit);
					break;
				}
				case 'asususer':
				{
					$('#goFirst'+appendL).bind('click', asususerSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', asususerSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', asususerSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', asususerSrcAjaxSubmit);
					break;
				}
				case 'htcuser':
				{
					$('#goFirst'+appendL).bind('click', htcuserSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', htcuserSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', htcuserSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', htcuserSrcAjaxSubmit);
					break;
				}
				case 'hppayment':
				{
					$('#goFirst'+appendL).bind('click', hppaymentSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', hppaymentSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', hppaymentSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', hppaymentSrcAjaxSubmit);
					break;
				}
				case 'licensepayment':
				{
					$('#goFirst'+appendL).bind('click', licensepaymentSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', licensepaymentSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', licensepaymentSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', licensepaymentSrcAjaxSubmit);
					break;
				}
				case 'hpuser':
				{
					$('#goFirst'+appendL).bind('click', hpuserSrcAjaxSubmit);
					$('#goPrev'+appendL).bind('click', hpuserSrcAjaxSubmit);
					$('#goNext'+appendL).bind('click', hpuserSrcAjaxSubmit);
					$('#goLast'+appendL).bind('click', hpuserSrcAjaxSubmit);
					break;
				}
				default: break;
			}
		}
		, roles : {
			userRole:{
				'ROLE_NONE': 0
				, 'ROLE_USER_VIEW': 1
				, 'ROLE_USER_EXPORT': 2
				, 'ROLE_USER_EDIT': 3
			}
			, paymentRole:{
				'ROLE_NONE': 0
				, 'ROLE_PAYMENT_VIEW': 1
				, 'ROLE_PAYMENT_EXPORT': 2
				, 'ROLE_PAYMENT_EDIT': 3
			}
			, couponeRole:{
				'ROLE_NONE': 0
				, 'ROLE_COUPON_VIEW': 1
				, 'ROLE_COUPON_EDIT': 2
			}
			, popupRole:{
				'ROLE_NONE': 0
				, 'ROLE_POPUP_VIEW': 1
				, 'ROLE_POPUP_EDIT': 2
			}
			, notifyRole:{
				'ROLE_NONE': 0
				, 'ROLE_NOTIFY_VIEW': 1
				, 'ROLE_NOTIFY_EDIT': 2
			}
			, contentsRole:{
				'ROLE_NONE': 0
				, 'ROLE_CONTENTS_VIEW': 1
				, 'null': 0
			}
			, teamRole:{
				'ROLE_NONE': 0
				, 'ROLE_TEAM_VIEW': 1
				, 'ROLE_TEAM_EDIT': 2
				, 'null': 0
			}
			, documentRole:{
				'ROLE_NONE': 0
				, 'ROLE_DOCUMENT_VIEW': 1
				, 'ROLE_DOCUMENT_EDIT': 2
				, 'null': 0
			}
			, announceRole:{
				'ROLE_NONE': 0
				, 'ROLE_ANNOUNCE_VIEW': 1
				, 'ROLE_ANNOUNCE_EDIT': 2
				, 'null': 0
			}
			, templeteRole:{
				'ROLE_NONE': 0
				, 'ROLE_TEMPLETE_VIEW': 1
				, 'ROLE_TEMPLETE_EDIT': 2
				, 'null': 0
			}
			, preloadRole:{
				'ROLE_NONE': 0
				, 'ROLE_PRELOAD_VIEW': 1
				, 'ROLE_PRELOAD_EDIT': 2
				, 'null': 0
			}
			, reviewRole:{
				'ROLE_NONE': 0
				, 'ROLE_REVIEW_VIEW': 1
				, 'ROLE_REVIEW_EDIT': 2
				, 'null': 0
			}
			, serverDevRole:{
				'ROLE_NONE': 0
				, 'ROLE_SERVERDEV_VIEW': 1
				, 'ROLE_SERVERDEV_EDIT': 2
				, 'null': 0
			}
			, privacyRole:{
				'ROLE_NONE': 0
				, 'ROLE_PRIVACY_VIEW': 1
				, 'ROLE_PRIVACY_EXPORT': 2
				, 'null': 0
			}
//			, superRole:{
//				'ROLE_NONE': 0
//				, 'ROLE_SUPERADMIN': 1
//			}
		}
		, initRoles : function(dialogType, divId) {
			// dialogType either 'perm' or 'regist'
			if(divId != undefined) {
				$('div#permissionGroupSuper').hide();
				
//				$('div#'+divId+' p.permissionGroup').show();
//				$('div#'+divId+' p.permissionGroupSuper').hide();
			}
			$('select#'+dialogType+'userInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'paymentInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'couponeInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'popupInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'notifyInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'contentsInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'teamInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'documentInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'announceInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'templeteInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'preloadInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'reviewInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'serverDevInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
			$('select#'+dialogType+'privacyInfoRole option').each(function() {
				if(parseInt($(this).val())==0) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
			});
		}
		, getRoles : function(dialogType, submitData) {
			var userRole = 0;
			userRole = parseInt($('select#'+dialogType+'userInfoRole').val());
			var paymentRole = 0;
			paymentRole = parseInt($('select#'+dialogType+'paymentInfoRole').val());
			var couponeRole = 0;
			couponeRole = parseInt($('select#'+dialogType+'couponeInfoRole').val());
			var popupRole = 0;
			popupRole = parseInt($('select#'+dialogType+'popupInfoRole').val());
			var notifyRole = 0;
			notifyRole = parseInt($('select#'+dialogType+'notifyInfoRole').val());
			var contentsRole = 0;
			contentsRole = parseInt($('select#'+dialogType+'contentsInfoRole').val());
			var teamRole = 0;
			teamRole = parseInt($('select#'+dialogType+'teamInfoRole').val());
			var documentRole = 0;
			documentRole = parseInt($('select#'+dialogType+'documentInfoRole').val());
			var announceRole = 0;
			announceRole = parseInt($('select#'+dialogType+'announceInfoRole').val());
			var templeteRole = 0;
			templeteRole = parseInt($('select#'+dialogType+'templeteInfoRole').val());
			var preloadRole = 0;
			preloadRole = parseInt($('select#'+dialogType+'preloadInfoRole').val());
			var reviewRole = 0;
			reviewRole = parseInt($('select#'+dialogType+'reviewInfoRole').val());
			var serverDevRole = 0;
			serverDevRole = parseInt($('select#'+dialogType+'serverDevInfoRole').val());
			var privacyRole = 0;
			privacyRole = parseInt($('select#'+dialogType+'privacyInfoRole').val());
			
			submitData.userRole = userRole;
			submitData.paymentRole = paymentRole;
			submitData.couponeRole = couponeRole;
			submitData.popupRole = popupRole;
			submitData.notifyRole = notifyRole;
			submitData.contentsRole = contentsRole;
			submitData.teamRole = teamRole;
			submitData.documentRole = documentRole;
			submitData.announceRole = announceRole;
			submitData.templeteRole = templeteRole;
			submitData.preloadRole = preloadRole;
			submitData.reviewRole = reviewRole;
			submitData.serverDevRole = serverDevRole;
			submitData.privacyRole = privacyRole;
			return submitData;
		}
		, selectRoles : function(dialogType, userRoles, paymentRoles, couponeRoles, popupRoles, notifyRoles, contentsRoles, teamRoles, documentRoles, announceRoles, templeteRoles, preloadRoles, reviewRoles, serverDevRoles, superRoles, divId, privacyRole) {
			var roleIdArray = [dialogType+'userInfoRole', dialogType+'paymentInfoRole', dialogType+'couponeInfoRole', dialogType+'popupInfoRole', dialogType+'notifyInfoRole', 
			                   dialogType+'contentsInfoRole', dialogType+'teamInfoRole', dialogType+'documentInfoRole', dialogType+'announceInfoRole', dialogType+'templeteInfoRole', dialogType+'preloadInfoRole', dialogType+'reviewInfoRole', dialogType+'serverDevInfoRole', dialogType+'privacyInfoRole'];
			var roleObjArray = [userRoles, paymentRoles, couponeRoles, popupRoles, notifyRoles, contentsRoles, teamRoles, documentRoles, announceRoles, templeteRoles, preloadRoles, reviewRoles, serverDevRoles, privacyRole];
			for (var idx=0; idx<roleIdArray.length; idx++) {
				switch (idx) {
					case 0: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.userRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 1: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.paymentRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 2: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.couponeRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 3: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.popupRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 4: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.notifyRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 5: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.contentsRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 6: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.teamRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 7: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.documentRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 8: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.announceRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 9: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.templeteRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 10: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.preloadRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 11: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.reviewRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 12: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.serverDevRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					case 13: {
						$('select#'+roleIdArray[idx]+' option').each(function() {
							if($(this).val()==commonUtil.roles.privacyRole[roleObjArray[idx]]) $(this).prop('selected', true); //$(this).attr('selected', 'selected');
						});
						break;
					}
					default : break;
				}
			}
			if(superRoles!=undefined && superRoles[0]=='ROLE_SUPERADMIN') {
				$('div#permissionGroupSuper').show();
//				$('div#'+divId+' p.permissionGroup').hide();
//				$('div#'+divId+' p.permissionGroupSuper').show();
			}
		}
		, disableFormItems : function(formId, cssClassStr) {
			$('#'+formId).children().find('.'+cssClassStr).each(function(index) {
				$(this).attr('disabled', 'disabled');
			});
		}
		, enableFormItems : function(formId, cssClassStr) {
			$('#'+formId).children().find('.'+cssClassStr).each(function(index) {
				if($(this).attr('disabled')=='disabled') {
					$(this).removeAttr('disabled');
				}
			});
		}
		, getiOSversion : function() {
		    if (/iPhone/.test(navigator.userAgent) || /iPhone/.test(navigator.platform)) {
		        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		        if(v) return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		    }
		}
		, iOSversion : function() {
			var ver = commonUtil.getiOSversion();
			if (ver && ver[0]) {
				return ver[0];
			} else return null;
		}
		, getBrowser : function() {
			var uagent = navigator.userAgent.toLowerCase();
			if(uagent.search('chrome')>=0) {
				return 'chrome';
			}
			else if(uagent.search('safari') >=0 && uagent.search('chrome') == -1) {
				return "safari";
			} else {
				return commonUtil.isMSIE();
			}
		}
		, isMacOSSafari : function() {
			if( navigator.platform.search('Mac') >=0 || navigator.userAgent.search('Mac') >=0 ) {
				var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
				if(iOS && commonUtil.getBrowser()=='safari' ) {
					return false;
				} else if (commonUtil.getBrowser()=='safari') return true;
			} else return false;
		}
		, isMobileOrTablet : function() {
			var trickOne = (/iPhone|iPod|iPad|Android|BlackBerry/).test( navigator.userAgent );
			console.log('isMobileOrTablet, by userAgent trickOne=', trickOne);
			var trickTwo = false;
			var mediaQSnippets = ['only screen and (max-width: 320px)', 'only screen and (max-width: 640px)', 'only screen and (max-width: 760px)', 'only screen and (max-width: 800px)', 'only screen and (max-width: 1024px)', 'only screen and (max-width: 1028px)'];
			for (var i=0; i<mediaQSnippets.length; i++) {
				if(window.matchMedia(mediaQSnippets[i]).matches) {
					trickTwo = true;
					console.log('isMobileOrTablet, by mediaQuerySnippets trickTwo=', mediaQSnippets[i]);
				}
			}
			var trickThree = false;
			if ( ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) || ((hash['touch'] && hash['touch'].offsetTop) === 9) ) {
				trickThree = true;
				console.log('isMobileOrTablet, by ontouchstart trickThree=', trickThree);
			}
			if(trickOne || trickTwo || trickThree) return true;
			else return false;
		}
		, getInternetExplorerVersion : function() {
			// Returns the version of Internet Explorer or a -1
			// (indicating the use of another browser).
			  var rv = -1; // Return value assumes failure.
			  if (navigator.appName == 'Microsoft Internet Explorer')
			  {
			    var ua = navigator.userAgent;
			    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			    if (re.exec(ua) != null)
			      rv = parseFloat( RegExp.$1 );
			  }
			  return rv;
		}
		, isMSIE : function() {
			  var msg = 'etc';
			  var ver = commonUtil.getInternetExplorerVersion();
			  if ( ver > -1 )
			  {
				  msg = 'msie'+ver;
				  return msg;
			  }
			  return msg;
		}		
		, checkValidNumeric : function(numericInput, msg1) {
			var msgStr = (msg1 ? msg1 : '숫자만 입력해 주십시오.');
			var numericRegex = /^[0-9]+$/;
			if( numericInput.val().length>0 ) {
				if( numericRegex.test(numericInput.val())==false ) {
					alert(msgStr);
					numericInput.select();
					return 'NaN';
				}
				return parseInt(numericInput.val());
			}
			return 0;
		}
		, checkValidDate : function(e) {
			if($(this).val().length>0) {
				if(commonUtil.validateDate($(this))==false) {
					alert('유효한 형식과 일자인지 확인해 주세요.\r\nyyyy-MM-dd');
					$(this).val('');
				}
			}
		}
		, checkValidDatetime : function(fieldObj) {
			if(fieldObj.val().length>0) {
				if(commonUtil.dateIsNaN(fieldObj.val())) {
					alert('유효한 형식과 일시인지 확인해 주세요.\r\nyyyy-MM-dd HH:mm:ss');
					fieldObj.val('');
					fieldObj.focus();
				} else {
					if(commonUtil.validateDatetime(fieldObj)==false) {
						alert('유효한 형식과 일시인지 확인해 주세요.\r\nyyyy-MM-dd HH:mm:ss');
						fieldObj.val('');
						fieldObj.focus();
					}
				}
			}
		}
		, checkValidDatetime2 : function(fieldObj) {
			if(fieldObj.val().length>0) {
				if(commonUtil.dateIsNaN(fieldObj.val())) {
					return false;
				} else {
					if(commonUtil.validateDatetime(fieldObj)==false) {
						return false;
					}
				}
				return true;
			}
		}
		, dateIsNaN: function(dateString) {
			if(typeof dateString == 'string') dateString = dateString.split('-').join('/'); // Safari, IE 등에서 Date.parse할 때 false로 나오는 오류 관련
			return isNaN(Date.parse(dateString));
		}
		, validateDate : function(dateInput) {
			  var dateVal = dateInput.val();
			  var dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
			  // Match the date format through regular expression  
			  if(dateVal.match(dateformat)) {
				  // 날짜 구분자가 '/'인 경우에는 '-'로 변경  
				  var dfVal = dateVal.split('/').join('-');
				  // Extract the string into month, date and year  
				  var pdate = dfVal.split('-');
				  var yy = parseInt(pdate[0]);  
				  var mm  = parseInt(pdate[1]);  
				  var dd = parseInt(pdate[2]);  
				  // Create list of days of a month [assume there is no leap year by default]  
				  var daysArr = [31,28,31,30,31,30,31,31,30,31,30,31];  
				  if (mm==1 || mm>2) {
					  if (dd>daysArr[mm-1]) {
						  return false;  
					  }
				  }
				  if (mm==2) {  
					  var lyear = false;  
					  if ( (!(yy % 4) && yy % 100) || !(yy % 400)) {  
						  lyear = true;  
					  }  
					  if ((lyear==false) && (dd>=29)) {  
						  return false;  
					  }  
					  if ((lyear==true) && (dd>29)) {  
						  return false;  
					  }  
				  }  
				  dateInput.val(dfVal);
				  return true;
			  } 
			  return false;
		}  
		, validateDatetime : function(dateInput) {
			  var dateVal = dateInput.val();
			  dateVal = dateVal.split('-').join('/');
			  var dateVals = dateVal.split(' ');
			  if(dateVals==null || dateVals.length<2) return false;
			  var dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
			  var timeformat = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/;
			  /*
^                   # Start of string
(?:                 # Try to match...
 (?:                #  Try to match...
  ([01]?\d|2[0-3]): #   HH:
 )?                 #  (optionally).
 ([0-5]?\d):        #  MM: (required)
)?                  # (entire group optional, so either HH:MM:, MM: or nothing)
([0-5]?\d)          # SS (required)
$                   # End of string
			   */
			  
			  // Match the date format through regular expression  
			  if(dateVals[0].match(dateformat)) {
				  // 날짜 구분자가 '/'인 경우에는 '-'로 변경  
				  var dfVal = dateVals[0].split('/').join('-');
				  // Extract the string into month, date and year  
				  var pdate = dfVal.split('-');
				  var yy = parseInt(pdate[0]);  
				  var mm  = parseInt(pdate[1]);  
				  var dd = parseInt(pdate[2]);  
				  // Create list of days of a month [assume there is no leap year by default]  
				  var daysArr = [31,28,31,30,31,30,31,31,30,31,30,31];  
				  if (mm==1 || mm>2) {
					  if (dd>daysArr[mm-1]) {
						  return false;  
					  }
				  }
				  if (mm==2) {  
					  var lyear = false;  
					  if ( (!(yy % 4) && yy % 100) || !(yy % 400)) {  
						  lyear = true;  
					  }  
					  if ((lyear==false) && (dd>=29)) {  
						  return false;  
					  }  
					  if ((lyear==true) && (dd>29)) {  
						  return false;  
					  }  
				  }  
			  } else return false;
			  if(dateVals[1].match(timeformat)) {
				  var newVals = dateInput.val().split(' ');
				  dateInput.val(newVals[0].split('/').join('-')+' '+newVals[1]);
				  return true;
			  }
			  else return false;
		}  
		, validateNumRange : function(startInput, endInput, rangeType) {
			var startVal = commonUtil.checkValidNumeric(startInput, rangeType+' 시작값을 숫자만 입력해 주십시오.');
			var endVal = commonUtil.checkValidNumeric(endInput, rangeType+' 종료값을 숫자만 입력해 주십시오.');
			if(startVal=='NaN' || endVal=='NaN') {
				return 'NaN'; // 둘 다 또는 둘 중 하나가 숫자가 아님
			}
			else if(startVal==0 && endVal==0) {
				return 0; // 둘 다 비어 있음
			}
			else if( (startVal==0 && endVal>0) || (endVal==0 && startVal>0) ) {
				if(startVal<1) {
					if(rangeType!=undefined) {
						alert(rangeType+' 숫자범위 시작값을 입력해주세요.');
					}
					startInput.select();
				} else {
					if(rangeType!=undefined) {
						alert(rangeType+' 숫자범위 종료값을 입력해주세요.');
					}
					endInput.select();
				}
				return 1; // 시작값 혹은 종료값 하나만 있음
			} else if( startVal>0 && endVal>0) {
				if(startVal>endVal) {
					alert(rangeType+' 종료값이 시작값보다 작습니다.');
					endInput.select();
					return 2; // 시작값이 종료값보다 클 수 없음
				} else return 0; // 정상
			} else return 3; // 그밖에 알 수 없는 비정상 케이스 (?)
		}
		, validatePeriod : function(startInput, endInput, periodType) {
			var startVal = startInput.val();
			var endVal = endInput.val();
			if(startVal.length<1 && endVal.length<1) {
				if(periodType!=undefined) {
					alert(periodType+' startDate and endDate are required.');
				}
				startInput.select();
				return 1; // 조회기간이 시작일 종료일 모두 비어 있음
			} else if( (startVal.length<1 && endVal.length>0) || (endVal.length<1 && startVal.length>0) ) {
				if(startVal.length<1) {
					if(periodType!=undefined) {
						alert(periodType+' startDate is required.');
					}
					startInput.select();
				} else {
					if(periodType!=undefined) {
						alert(periodType+' endDate is required.');
					}
					endInput.select();
				}
				return 2; // 조회기간 중에 시작일 혹은 종료일 하나만 있음
			} else {
				var startNum = commonUtil.dateToTime(startVal);
				var endNum = commonUtil.dateToTime(endVal);
				var todayNum = new Date().getTime();
				if(startNum>todayNum) {
					if(periodType!=undefined) {
						alert(periodType+' startDate cannot be later than today.');
					}
					startInput.select();
					return 3; // 조회기간 시작일이 오늘 날짜보다 큼
				} else if(endNum>todayNum) {
					if(periodType!=undefined) {
						alert(periodType+' endDate cannot be later than today.');
					}
					endInput.select();
					return 4; // 조회기간 종료일이 오늘 날짜보다 큼
				} else if(startNum>endNum) {
					if(periodType!=undefined) {
						alert(periodType+' endDate cannot be earlier than startDate.');
					}
					endInput.select();
					return 5; // 조회기간 중에서 시작일이 더 큼
				} else return 0; // 정상적인 조회기간
			}
		}
		, validatePeriod2 : function(startInput, endInput, periodType) {
			var startVal = startInput.val();
			var endVal = endInput.val();
			if(startVal.length<1 && endVal.length<1) {
				if(periodType!=undefined) {
					alert(periodType+' startDate and endDate are required.');
				}
				startInput.select();
				return 1; // 기간이 시작일 종료일 모두 비어 있음
			} else if( (startVal.length<1 && endVal.length>0) || (endVal.length<1 && startVal.length>0) ) {
				if(startVal.length<1) {
					if(periodType!=undefined) {
						alert(periodType+' startDate is required.');
					}
					startInput.select();
				} else {
					if(periodType!=undefined) {
						alert(periodType+' endDate is required.');
					}
					endInput.select();
				}
				return 2; // 기간 중에 시작일 혹은 종료일 하나만 있음
			} else {
				var startNum = commonUtil.dateToTime(startVal);
				var endNum = commonUtil.dateToTime(endVal);
				var todayNum = commonUtil.dateToTime(commonUtil.dateFormatUtilType1(new Date().getTime())); // 00시 00초 기준
				if(startNum<todayNum) {
					if(periodType!=undefined) {
						alert(periodType+' startDate cannot be earlier than today.');
					}
					startInput.select();
					return 3; // 기간 시작일이 오늘 날짜보다 작음
				} else if(endNum<todayNum) {
					if(periodType!=undefined) {
						alert(periodType+' endDate cannot be earlier than today.');
					}
					endInput.select();
					return 4; // 기간 종료일이 오늘 날짜보다 작음
				} else if(startNum>endNum) {
					if(periodType!=undefined) {
						alert(periodType+' endDate cannot be earlier than startDate.');
					}
					endInput.select();
					return 5; // 기간 중에서 시작일이 더 큼
				} else return 0; // 정상적인 기간
			}
		}
		, validatePeriod3 : function(startInput, endInput, periodType) {
			var startVal = startInput.val();
			var endVal = endInput.val();
			if(startVal.length<1 && endVal.length<1) {
				if(periodType!=undefined) {
					alert(periodType+' startDate and endDate are required.');
				}
				startInput.select();
				return 1; // 조회기간이 시작일 종료일 모두 비어 있음
			} else if( (startVal.length<1 && endVal.length>0) || (endVal.length<1 && startVal.length>0) ) {
				if(startVal.length<1) {
					if(periodType!=undefined) {
						alert(periodType+' startDate is required.');
					}
					startInput.select();
				} else {
					if(periodType!=undefined) {
						alert(periodType+' endDate is required.');
					}
					endInput.select();
				}
				return 2; // 조회기간 중에 시작일 혹은 종료일 하나만 있음
			} else {
				var startNum = commonUtil.dateToTime(startVal);
				var endNum = commonUtil.dateToTime(endVal);
				if(startNum>endNum) {
					if(periodType!=undefined) {
						alert(periodType+' endDate cannot be earlier than startDate.');
					}
					endInput.select();
					return 5; // 조회기간 중에서 시작일이 더 큼
				} else return 0; // 정상적인 조회기간
			}
		}
		, validatePeriod4 : function(startInput, endInput, periodType) {
			var startVal = startInput.val();
			var endVal = endInput.val();
			if(endVal.length<1) {
				if(periodType!=undefined) {
					alert(periodType+' endDate is required.');
				}
				endInput.select();
				return 1; // 종료일 비어 있음
			} else {
				var startNum = commonUtil.dateToTime(startVal);
				var endNum = commonUtil.dateToTime(endVal);
				var todayNum = commonUtil.dateToTime(commonUtil.dateFormatUtilType1(new Date().getTime())); // 00시 00초 기준
				if(startNum>endNum) {
					if(periodType!=undefined) {
						alert(periodType+' endDate cannot be earlier than startDate.');
					}
					endInput.select();
					return 5; // 기간 중에서 시작일이 더 큼
				}
			}
			return 0; // 정상적인 기간
		}
		, getAutoComDate : function(dateTypeSelect, startInput, endInput, isFuture) {
			var selectedOption = '전체'
			dateTypeSelect.find('option').each(function(oIdx) {
				if($(this).prop('selected')) selectedOption = $(this).text();
			});
			if(selectedOption=='전체') {
			} else if(selectedOption=='오늘') {
				var todayVal = commonUtil.dateFormatUtilType1(new Date().getTime());
				startInput.val(todayVal);
				endInput.val(todayVal);
			} else if(selectedOption=='1주일') {
				var todayTime = new Date().getTime();
				if(isFuture) {
					endInput.val( commonUtil.dateFormatUtilType1( Number(todayTime)+(1000*60*60*24*6) ) );
					startInput.val( commonUtil.dateFormatUtilType1(todayTime) );
				} else {
					startInput.val( commonUtil.dateFormatUtilType1( Number(todayTime)-(1000*60*60*24*6) ) );
					endInput.val( commonUtil.dateFormatUtilType1(todayTime) );
				}
			} else if(selectedOption=='1개월') {
				var todayDate = new Date();
				if(isFuture) {
					endInput.val( commonUtil.getLaterDateByPeriod(1, 'month', todayDate) );
					startInput.val( commonUtil.dateFormatUtilType1(todayDate.getTime()) );
				} else {
					startInput.val( commonUtil.getEarlierDateByPeriod(1, 'month', todayDate) );
					endInput.val( commonUtil.dateFormatUtilType1(todayDate.getTime()) );
				}
			} else if(selectedOption=='2개월') {
				var todayDate = new Date();
				if(isFuture) {
					endInput.val( commonUtil.getLaterDateByPeriod(2, 'month', todayDate) );
					startInput.val( commonUtil.dateFormatUtilType1(todayDate.getTime()) );
				} else {
					startInput.val( commonUtil.getEarlierDateByPeriod(2, 'month', todayDate) );
					endInput.val( commonUtil.dateFormatUtilType1(todayDate.getTime()) );
				}
			} else if(selectedOption=='6개월') {
				var todayDate = new Date();
				if(isFuture) {
					endInput.val( commonUtil.getLaterDateByPeriod(6, 'month', todayDate) );
					startInput.val( commonUtil.dateFormatUtilType1(todayDate.getTime()) );
				} else {
					startInput.val( commonUtil.getEarlierDateByPeriod(6, 'month', todayDate) );
					endInput.val( commonUtil.dateFormatUtilType1(todayDate.getTime()) );
				}
			} else if(selectedOption=='1년') {
				var todayDate = new Date();
				if(isFuture) {
					endInput.val( commonUtil.getLaterDateByPeriod(1, 'year', todayDate) );
					startInput.val( commonUtil.dateFormatUtilType1(todayDate.getTime()) );
				} else {
					startInput.val( commonUtil.getEarlierDateByPeriod(1, 'year', todayDate) );
					endInput.val( commonUtil.dateFormatUtilType1(todayDate.getTime()) );
				}
			}
		}
		, getEarlierDateByPeriod : function(timeSpan, timeUnit, todayDate) {
			var todayTime = todayDate.getTime();
			if(timeUnit=='year') {
				var lyear = false;
				lyear = commonUtil.isLeapYear(parseInt(todayDate.getFullYear())-timeSpan);
				if(lyear) {
					return commonUtil.dateFormatUtilType1( Number(todayTime)-(1000*60*60*24*(365*timeSpan)) );
				} else return commonUtil.dateFormatUtilType1( Number(todayTime)-(1000*60*60*24*(365*timeSpan-1)) );
			} else if(timeUnit=='month') {
				var howManyDays = commonUtil.howManyDaysForMonths(timeSpan);
				return commonUtil.dateFormatUtilType1( Number(todayTime)-( 1000*60*60*24*(howManyDays-1) ) );
			}
		}
		, getLaterDateByPeriod : function(timeSpan, timeUnit, todayDate) {
			var todayTime = todayDate.getTime();
			if(timeUnit=='year') {
				var lyear = false;
				lyear = commonUtil.isLeapYear(parseInt(todayDate.getFullYear())+timeSpan);
				if(lyear) {
					return commonUtil.dateFormatUtilType1( Number(todayTime)+(1000*60*60*24*(365*timeSpan)) );
				} else return commonUtil.dateFormatUtilType1( Number(todayTime)+(1000*60*60*24*(365*timeSpan-1)) );
			} else if(timeUnit=='month') {
				var howManyDays = commonUtil.howManyDaysForMonths(timeSpan, true);
				return commonUtil.dateFormatUtilType1( Number(todayTime)+( 1000*60*60*24*(howManyDays-1) ) );
			}
		}
		, isLeapYear : function(yearVal) {
			var lyear = false;  
			if ( (!(yearVal % 4) && yearVal % 100) || !(yearVal % 400)) {  
				lyear = true;  
			}
			return lyear;
		}
		, howManyDaysPerMonth : function(monthVal, yearVal) {
			var lyear = false;
			lyear = commonUtil.isLeapYear(yearVal);
			if(monthVal==2) 
				return (lyear ? 29 : 28);
			else {
				if(monthVal==4 || monthVal==6 || monthVal==9 || monthVal==11)
					return 30;
				else return 31;
			}
		}
		, howManyDaysForMonths : function(timeSpan, isFuture) {
			var dayCount = 0;
			var todayDate = new Date();
			var monthVal = todayDate.getMonth()+1;
			var yearVal = todayDate.getFullYear();
			if(isFuture) {
				for(var m=1; m<=timeSpan; m++) {
					if(monthVal==13) {
						yearVal++;
						monthVal = 1;
					}
					dayCount += commonUtil.howManyDaysPerMonth(monthVal, yearVal);
					monthVal++;
				}
			} else {
				for(var m=1; m<=timeSpan; m++) {
					monthVal--;
					if(monthVal==0) {
						yearVal--;
						monthVal = 12;
					}
					dayCount += commonUtil.howManyDaysPerMonth(monthVal, yearVal);
				}
			}
			return dayCount;
		}
		, deParamQuery: function(queryStr) {
			  var query_string = {};
			  var vars = queryStr.split("&");
			  for (var i=0;i<vars.length;i++) {
				    var pair = vars[i].split("=");
				    pair[0] = decodeURIComponent(pair[0]);
				    pair[1] = decodeURIComponent(pair[1]);
				    	// If first entry with this name
				    if (typeof query_string[pair[0]] === "undefined") {
				      query_string[pair[0]] = pair[1];
				    	// If second entry with this name
				    } else if (typeof query_string[pair[0]] === "string") {
				      var arr = [ query_string[pair[0]], pair[1] ];
				      query_string[pair[0]] = arr;
				    	// If third or later entry with this name
				    } else {
				      query_string[pair[0]].push(pair[1]);
				    }
			  } 	
			  return query_string;
		}
		, commonExtraEventsUser: function(e) {
//			var tdObj = $(e.originalEvent.srcElement);
			var tdObj = $(this);
			commonUtil.resetCheckedBox('view', 'table');
			tdObj.parent().find('td:eq(0) input:checkbox').prop('checked', true);
			var userIdVal = tdObj.parent().find('td:eq(1)').text();
			var winOption = {};
			winOption.width = 1075;
			winOption.height = 750;
			winOption.resizable = 'yes';
			winOption.status = 'no';
			winOption.menubar = 'no';
			winOption.scrollbars = 'yes';
			winOption.location = 'no';
			winOption.modal = 'yes';
			popup.winPopup.openWin(location.protocol+'//'+location.host+'/view/user?id='+userIdVal+'#userdetail', 'TargetUserDetailPage', winOption);
		}
		, addProgressBarWrapper: function(pbarParams, afterwards) {
//			$('div#pleaseWait').css({'height': $(document).height()+'px', 'width': $(document).width()}).show();
			//$(window).scrollTop(0);
			$('body').bind('keydown', function(e){
				alert('The request is being processed... Please wait.');
				return false;
			});
//			for (var i=0; i<pbarParams.length; i++) {
//				if ($('div#inProgress_'+pbarParams[i]).length<1) {
//					var pbarDiv = '<div id="inProgress_'+pbarParams[i]+'" class="inProgress"><img src="/common/image/ajax_spin.GIF"/></div>'; 
//					$(pbarDiv).insertAfter($('#'+pbarParams[i]));
//				}
//			}
			$(afterwards);
		}
		, removeProgressBar: function(pbarParam) {
			if(pbarParam) {
				$('#inProgress_'+pbarParam).remove();
			} else {
				$("[id^='inProgress_']").remove();
			}
			// $('div#pleaseWait').hide();
			$('body').unbind('keydown');
		}
		, calRateValue: function(denomVal, numerVal, roundVal) {
			var roundUnit = 100;
			if(roundVal) roundUnit = roundVal;
			if(denomVal=='NaN' || numerVal=='NaN' || denomVal==0 || numerVal==0) return '';
			else return Math.round( ((numerVal/denomVal)*100)*roundUnit )/roundUnit;
		}
		, calAvgValue: function(denomVal, numerVal, roundVal) {
			var roundUnit = 100;
			if(roundVal) roundUnit = roundVal;
			if(denomVal=='NaN' || numerVal=='NaN' || denomVal==0 || numerVal==0) return '';
			else return Math.round( ((numerVal/denomVal)*roundUnit) )/roundUnit;
		}
		, calStorageValue: function(storageType, output, roundVal) {
			if(storageType=='gb') {
				if(roundVal) return Math.round( (output/(1024*1024*1024))*roundVal )/roundVal;
				return output/(1024*1024*1024);
			} else if(storageType=='mb') {
				if(roundVal) return Math.round( (output/(1024*1024))*roundVal )/roundVal;
				return output/(1024*1024);
			} else if(storageType=='kb') {
				if(roundVal) return Math.round( (output/1024)*roundVal )/roundVal;
				return output/1024;
			} else if(storageType=='tb') {
				if(roundVal) return Math.round( (output/(1024*1024*1024*1024))*roundVal )/roundVal;
				return output/(1024*1024*1024*1024);
			} 
			else return output;
		}
		, numberWithCommas: function(n) {
			if(n==null) return '';
			if(typeof n == 'string') return n;
		    var parts=n.toString().split(".");
		    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		}
		, getOptions: function(optionList, valueType, isTotal) {
			var optionStr = '';
			if(isTotal) {
				if(valueType=='index') optionStr = '<option value="0">전체</option>';
				else optionStr = '<option value="ALL">전체</option>';
			}
			for (var i=0; i<optionList.length; i++) {
				if(optionList[i]!='null') { // 필터에 null 스트링 들어가는 것 제거
					if(valueType=='index') optionStr += '<option value="'+(isTotal==true ? (i+1) : i)+'">'+optionList[i]+'</option>';
					else optionStr += '<option value="'+optionList[i]+'">'+optionList[i]+'</option>';
				}
			}
			return optionStr;
		}
		, getFilterNameNation: function(successCBFunc, onFilterNationDone){
			if(successCBFunc) popcorn.filtergetnamenation(null, successCBFunc, commonUtil.commonErrCB);
			else popcorn.filtergetnamenation(null, function(res){commonUtil.getFilterNameNationSucCB(res, onFilterNationDone);}, commonUtil.commonErrCB);
		}
		, getFilterNameNationSucCB: function(res, onFilterNationDone) {
			if(res.resultCode==0) {
//				console.log('===============================getFilterNameNationSucCB res', res);
				if(res.list && res.list.length>0) {
					var newRes = {};
					var constantNations = {
						'Korea, Republic of': 1
						, 'United States': 2
						, 'Japan': 3
						, 'China': 4
					}
					newRes.list = [];
					newRes.list.push('Korea, Republic of');
					newRes.list.push('United States');
					newRes.list.push('Japan');
					newRes.list.push('China');
					for (var i = 0; i<res.list.length; i++) {
						var listItem = res.list[i];
						if(listItem!='ALL' && constantNations[listItem]==null) newRes.list.push(listItem);
					}
					$('.filterNation').each(function(index){
						$(this).html(commonUtil.getOptions(newRes.list, 'default', true));
						if(typeof onFilterNationDone === 'function')
							onFilterNationDone(); // filterNation 콜백 완료 후
						// onFilterNameNationDone은 각 페이지에 정의하고, 이 안에서 onchange 이벤트를 바인딩하여
						// 각 페이지의 필터 변경에 따른 이벤트를 등록함
					});
				}
			} else commonUtil.commonErrCB(res);
		}
		, searchFieldPosition: function(isHidden) {
			if(isHidden) {
				$('div.divSearchField').addClass('off');
				$('div#selectAllArea').addClass('off');
			} else {
				$('div.divSearchField').removeClass('off');
				$('div#selectAllArea').removeClass('off');
			}
		}
		, validFloatNum: function(dataInput) {
			var entered_value = dataInput.val();
		    var regexPattern = /^\d{0,8}(\.\d{1,5})?$/;         
		    //Allow only Number as well 0nly 2 digit after dot(.)
		       
		    //entered_value.match(regexPattern)
		    if(regexPattern.test(entered_value)) {
		        return true;
		    } else {
		        return false;
		    }
		}
		, stringcheckFormatter: function(val){
			if(val == null)
				return "";
			else
				return val;
		}
}

function customSubmitAjaxFn(e) {
	/* this empty function is required for ajax form submit after validation */
}

function toDoAlert(e) {
	alert("구현 예정 입니다.");
}

var errorCodes = {
	'700': "Landing page does not exist."
	, '706': "Message does not exist."
	, '804': "Could not execute 'control', please check the job status."
	, '805': "Could not control the job, please check the job status."
	, '808': "Please check the program status."
	, '811': "Could not upload the file."
	, '812': "Could not delete the file."
	, '813': "The landing page already exists."
	, '814': "The message is registered to a notification program.\r\nPlease make sure the message you're trying to delete is not related to any valid program."
	, '815': "The file is registered to a notification program.\r\nPlease make sure the file you're trying to delete is not related to any valid program."
	, '102': "비밀번호가 올바르지 않습니다!"
	, '105': "허용된 관리IP로 접속하지 않으셨습니다! Invalid super user:IP Address Denied"
	, '106': "이메일로 검색할 권한이 없습니다! No permission to search by email"
	, '108': "권한이 없습니다! 잘못된 접근입니다!"
}