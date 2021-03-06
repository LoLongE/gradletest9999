/**
 * polaris cloud localization module
 * 폴라리스 클라우드 서비스에 사용되는 지역화 관련 자바스크립트
 */
var poLocal = (function(window, document, undefined) {
  'use strict';

  var _version = "0.0.1";

  if ($.fn.jquery !== '1.8.3') {
    console.log('this module is depend on jquery 1.8.3');
  }

  if (window.poLocal !== undefined) {
    return window.poLocal;
  }

  /**
   * ex) getDateFormat(new Date(),"YYYY/DD/MM HH:mm:ss AP")<br><br>
   * 대소문자 구별함<br>
   * YY => 2자리 연도<br>
   * YYYY => 4자리 연도<br>
   *
   * M  => 1자리 월<br>
   * MM => 2자리 월 (1 => 01)<br>
   *
   * D  => 1자리 일<br>
   * DD => 2자리 일 (2 => 01)<br>
   *
   * <!-- MMM => 약자로 월 (jan)<br>
   * MMMM => 단어로 월 (january)<br>
   *
   * DDD => 약자로 요일 (mon)<br>
   * DDDD => 단어로 요일 (monday)<br> -->
   *
   * AP => AM/PM<br>
   *
   * h  => 1자리로 시간 (12시간 기준)<br>
   * hh => 2자리로 시간 (12시간 기준)<br>
   *
   * H  => 1자리로 시간 (24시간 기준)<br>
   * HH => 2자리로 시간 (24시간 기준)<br>
   *
   * m  => 1자리로 분<br>
   * mm => 2자리로 분<br>
   *
   * s  => 1자리로 초<br>
   * ss => 2자리로 초<br>
   **/
  function _getDateFormat(theDate,dateFormatString) {
    if (theDate == null) {
      return "theDateNull";
    }
    if (dateFormatString == null) {
      dateFormatString = "YYYY/MM/DD hh:mm";
    }
    
    // At IE 8, 9 none apply in ar-AE Locale
    /*
     * 사이드 발생 :: text 주입 및 css 반작용 문제 발생
     * 추후 검토
    {
    	var temp = dateFormatString.split(' ');
    	var max = temp[0].length;
    	var maxIndex = 0;
    	for (var i = 1; i < temp.length; i++) {
    		if (temp[i].length > max) {
    			maxIndex = i;
    			max = temp[i].length;
    		}
    	}
            
    	temp[maxIndex] = "<SPAN dir='ltr'>" + temp[maxIndex] + '</SPAN>';
    	dateFormatString = temp.join(' ');
    }
    */
        	
    var year = theDate.getFullYear();
    var shortYear = (''+year).substring(2);

    var month = theDate.getMonth() + 1;
    var longMonth = ((''+month).length==1)?'0'+month:month;

    var date = theDate.getDate();
    var longDate = ((''+date).length==1)?'0'+date:date;

    var hours = theDate.getHours();
    var longHours = ((''+hours).length==1)?'0'+hours:hours;
    var twelveHours = hours>12 ? hours-12 : (hours==12 ? 12 : hours);
    var longTwelveHours = ((''+twelveHours).length==1)?'0'+twelveHours:twelveHours;

    var hoursStr = "";
    var dateString = null;
    if(hours < 12) {
      hoursStr = LanguagePack.DATE_AM;
    } else {
      hoursStr = LanguagePack.DATE_PM;
    }
    var minutes = theDate.getMinutes();
    var longMinutes = ((''+minutes).length==1)?'0'+minutes:minutes;

    var seconds = theDate.getSeconds();
    var longSeconds = ((''+seconds).length==1)?'0'+seconds:seconds;


    dateFormatString = dateFormatString.replace("YYYY",year);
    dateFormatString = dateFormatString.replace("YY",shortYear);
    //dateFormatString = dateFormatString.replace("MMMM",);
    //dateFormatString = dateFormatString.replace("MMM",);
    dateFormatString = dateFormatString.replace("MM",longMonth);
    dateFormatString = dateFormatString.replace("M",month);
    //dateFormatString = dateFormatString.replace("DDDD",);
    //dateFormatString = dateFormatString.replace("DDD",);
    dateFormatString = dateFormatString.replace("DD",longDate);
    dateFormatString = dateFormatString.replace("D",date);
    if(LanguagePack.CURRENT_LAN != 'ar') {
    	dateFormatString = dateFormatString.replace("AP",hoursStr);
    } else {
    	dateFormatString = dateFormatString.replace("AP",'');
    }
    dateFormatString = dateFormatString.replace("HH",longHours);
    dateFormatString = dateFormatString.replace("H",hours);
    dateFormatString = dateFormatString.replace("hh",longTwelveHours);
    if(LanguagePack.CURRENT_LAN == 'ko' || LanguagePack.CURRENT_LAN == 'en') {
    	dateFormatString = dateFormatString.replace("h",twelveHours);
    } else {
    	dateFormatString = dateFormatString.replace("h",longHours);
    }
    dateFormatString = dateFormatString.replace("mm",longMinutes);
    dateFormatString = dateFormatString.replace("m",minutes);

    dateFormatString = dateFormatString.replace("ss",longSeconds);
    dateFormatString = dateFormatString.replace("s",seconds);

    return dateFormatString;
  }

  /**
   * 숫자 포맷을 변경해주는 Number.prototype의 확장
   * var
   * @param  {int} digitDecimal     소수 자리 갯수
   * @param  {int} digitNature      자연수 자리 갯수
   * @param  {str} delimiterSection 자연수 구분자
   * @param  {str} delimiterDecimal 소수와 자연수 구분자
   */
  var _format = function(data, digitDecimal, digitNature,
                        delimiterSection, delimiterDecimal) {
    var re = '\\d(?=(\\d{' + (digitNature || 3) + '})+' + (digitDecimal > 0 ? '\\D' : '$') + ')';

    var num = 0;
    if (typeof data === 'string') {
      num = Number(data);
    }
    else {
      num = data;
    }
    num = num.toFixed(Math.max(0, ~~digitDecimal));

    return (delimiterDecimal ? num.replace('.', delimiterDecimal) : num)
          .replace(new RegExp(re, 'g'), '$&' + (delimiterSection || ','));
  };


  /**
   * Localization Number
   * @param  {str, number} num 변환할 숫자값
   * @param  {str} locale 지역, ex) ko_KR, fr_FR...
   * @param  {bool} isDecimal 소수값? default) false
   * @return {str}   지역화된 숫자값
   */
  var _localizationNumber = function(num, locale, isDecimal) {
    var number = 0;
    if (isDecimal) {
      number = parseFloat(num);
    }
    else {
      number = parseInt(num);
    }

    var digitDecimal = 0;
    if (isDecimal) {
      switch(locale) {
        case 'ar_AE':
          digitDecimal = 2; // 아랍어 레이아웃 이슈로 소수자리수는 3자리에서 2자리로 변경함
          break;
        default:
          digitDecimal = 2;
      }
    }

    var localization = '';
    switch(locale) {
      case 'ar_AE':
        localization = _format(num, digitDecimal, 3, ',', '.');
        break;
      case 'fr_FR':
        localization = _format(num, digitDecimal, 3, ' ', ','); 
        break;
      default:
        localization = _format(num, digitDecimal, 3, ',', '.');
    }
    return localization;
  };

  return {
    getDateFormat: _getDateFormat,
    localizationNumber: _localizationNumber,
  };

})(window, document);

// #GMX-7224
var checkPermission = function (type, cbYes, cbNo, e, cond) {
	if(gUserLevel == 'BUSINESS') {
		if(type == 'Download') {
			var data = {'properties' : ['externalFilePermission']};
			popcorn.teamGetProperty(data , function(result) {
				if(result.externalFilePermission != false || cond == true) {
					if(typeof cbYes == 'function') cbYes.call(this, e);
				} else {
					if(typeof cbNo == 'function') cbNo.call(this, e);					
				}
			}, null);
		} else if(type == 'Share') {
			var data = {'properties' : ['externalFilePermission', 'externalShared']};
			popcorn.teamGetProperty(data , function(result) {
				if(result.externalFilePermission == false || result.externalShared == false) {
					var message = LanguagePack.COOPERATION_AUTHENTICATEDFAIL_MSG4;
					if(result.externalFilePermission == false) message = LanguagePack.BUSINESS_FILEMOVE_ERROR;
					if(typeof cbNo == 'function') cbNo.call(this, e, message);
				} else {
					if(typeof cbYes == 'function') cbYes.call(this, e);
				}
			}, null);
		}

	} else {
		if(typeof cbYes == 'function') cbYes.call(this, e);
	}

}

var logUploadType = {};
//GMX-6975
function isAtypical(name) {
	var index = name.lastIndexOf(".");
	if (index == -1) return false;
	var type = name.substr(index + 1, name.length).toLowerCase();
	switch(type) {
		case 'bmp':
			if(typeof logUploadType.bmp == 'undefined')
				logUploadType.bmp = 0;
			logUploadType.bmp += 1;
			return true;
		case 'avi':
			if(typeof logUploadType.avi == 'undefined')
				logUploadType.avi = 0;
			logUploadType.avi += 1;
			return true;
		case 'mp3':
			if(typeof logUploadType.mp3 == 'undefined')
				logUploadType.mp3 = 0;
			logUploadType.mp3 += 1;
			return true;
		case 'jpeg':
			if(typeof logUploadType.jpeg == 'undefined')
				logUploadType.jpeg = 0;
			logUploadType.jpeg += 1;
			return true;
		case 'wmv':
			if(typeof logUploadType.wmv == 'undefined')
				logUploadType.wmv = 0;
			logUploadType.wmv += 1;
			return true;
		case 'wav':
			if(typeof logUploadType.wav == 'undefined')
				logUploadType.wav = 0;
			logUploadType.wav += 1;
			return true;
		case 'jpg':
			if(typeof logUploadType.jpg == 'undefined')
				logUploadType.jpg = 0;
			logUploadType.jpg += 1;
			return true;
		case 'asf':
			if(typeof logUploadType.asf == 'undefined')
				logUploadType.asf = 0;
			logUploadType.asf += 1;
			return true;
		case 'mid':
			if(typeof logUploadType.mid == 'undefined')
				logUploadType.mid = 0;
			logUploadType.mid += 1;
			return true;
		case 'gif':
			if(typeof logUploadType.gif == 'undefined')
				logUploadType.gif = 0;
			logUploadType.gif += 1;
			return true;
		case 'flv':
			if(typeof logUploadType.flv == 'undefined')
				logUploadType.flv = 0;
			logUploadType.flv += 1;
			return true;
		case 'wma':
			if(typeof logUploadType.wma == 'undefined')
				logUploadType.wma = 0;
			logUploadType.wma += 1;
			return true;
		case 'png':
			if(typeof logUploadType.png == 'undefined')
				logUploadType.png = 0;
			logUploadType.png += 1;
			return true;
		case 'swf':
			if(typeof logUploadType.swf == 'undefined')
				logUploadType.swf = 0;
			logUploadType.swf += 1;
			return true;
		case 'psd':
			if(typeof logUploadType.psd == 'undefined')
				logUploadType.psd = 0;
			logUploadType.psd += 1;
			return true;
		case 'mov':
			if(typeof logUploadType.mov == 'undefined')
				logUploadType.mov = 0;
			logUploadType.mov += 1;
			return true;
		case 'tif':
			if(typeof logUploadType.tif == 'undefined')
				logUploadType.tif = 0;
			logUploadType.tif += 1;
			return true;
		case 'mpeg':
			if(typeof logUploadType.mpeg == 'undefined')
				logUploadType.mpeg = 0;
			logUploadType.mpeg += 1;
			return true;
		case 'raw':
			if(typeof logUploadType.raw == 'undefined')
				logUploadType.raw = 0;
			logUploadType.raw += 1;
			return true;
		case 'mpg':　
			if(typeof logUploadType.mpg == 'undefined')
				logUploadType.mpg = 0;
			logUploadType.mpg += 1;
			return true;
		case 'ai':
			if(typeof logUploadType.ai == 'undefined')
				logUploadType.ai = 0;
			logUploadType.ai += 1;
			return true;
		case 'mp4':
			if(typeof logUploadType.mp4 == 'undefined')
				logUploadType.mp4 = 0;
			logUploadType.mp4 += 1;
			return true;
		case 'eps':
			if(typeof logUploadType.eps == 'undefined')
				logUploadType.eps = 0;
			logUploadType.eps += 1;
			return true;
		default:
			return false;
	}
	
}



function unverifyShareMsg(e) {
	if(e) {
		commonPreventEvent(e);
	}
	if(typeof ischina != 'undefined' && ischina=='true') {
		openSetInfo(null, 3);
		return;
	}
	var popupMessage = new Array();
	popupMessage[0] = '<h3><span class="pop_tit">'+LanguagePack.SHARE_EASILY+'</span></h3>';
	popupMessage[1] = '<span class="pop_conts">'+LanguagePack.SHARE_EASILY_DETAIL+'</span>';
	popupMessage[2] = '<span class="pop_link"><a href="#" class="underline">'+LanguagePack.SHARE_WHY_NEED_EMAIL+'</a></span>';
	var popup = new PopupMessage(PopupType.DEFAULT, ButtonType.CONFIRM_VERIFY, null, {popupMessage:popupMessage}, function(e) {
		if((navigator.userAgent.indexOf('podialog') != -1 || navigator.userAgent.indexOf('macdialog') != -1) && document.getElementById('closecooperation') != null) {
			document.getElementById('closecooperation').click();
			return;
		}
		defaultAlertCB(e);
	}, function(res) {
		var emailValue = typeof userEmail != 'undefined' ?userEmail : gUserEmail ;
		var e = emailValue;
		if(emailValue) {
			e = '';
		}
		RequestVerifyEmail(e, function(response) {
			if(CheckResult(null, response) != null) {
				showUnverifyPopMsg(emailValue);
			} else if(response.resultCode == Enum.common.INVALIDPARAM && emailValue) {
				AccountUserInfo(function(res) {
					CheckResult(null, res);
				}, function(res) {
					
				});
			}
		}, function(response) {
			toastMessage(LanguagePack.POPUP_FAILTOSENDEMAIL);
		});

		if(navigator.userAgent.search("PolarisOfficeLink") != -1 || navigator.userAgent.search("PolarisPCOffice") != -1 || navigator.userAgent.indexOf('podialog') != -1 || navigator.userAgent.indexOf('macdialog') != -1) {
			if (res.preventDefault) res.preventDefault();   
			if (res.stopPropagation) res.stopPropagation();
			var prevPopup = PopupManagement.getCurrentPopup();
			if(prevPopup != null) {
				prevPopup.destroy();
			}
		} else {
			if((navigator.userAgent.indexOf('podialog') != -1 || navigator.userAgent.indexOf('macdialog') != -1) && document.getElementById('closecooperation') != null) {
				document.getElementById('closecooperation').click();
				return;
			}
			defaultAlertCB(res);
		} 	
	}, function(e) {
		if((navigator.userAgent.indexOf('podialog') != -1 || navigator.userAgent.indexOf('macdialog') != -1) && document.getElementById('closecooperation') != null) {
			document.getElementById('closecooperation').click();
			return;
		}
		defaultAlertCB(e);
	});

	popup.popupCb = function () {
		var that = $(PopupViewID.CONTENT_BOX);
		that.find('span.pop_link').on('click', function () {
			that.find('span.pop_tit').text(LanguagePack.SHARE_REASON_WHY_NEED_EMAIL);
			that.find('span.pop_conts').text(LanguagePack.SHARE_REASON_WHY_NEED_EMAIL_DETAIL);
			that.find('span.pop_link').text(LanguagePack.SHARE_REASON_WHY_NEED_EMAIL_DETAIL2);
			popup.show();
			changePopupSize();
		});

	}
	popup.create();
	popup.show();
	changePopupSize();
}

function changePopupSize() {
	if((navigator.userAgent.indexOf('podialog') != -1 || navigator.userAgent.indexOf('macdialog') != -1) && document.getElementById('changesize') != null) {
		$('#changesize').data('settings', {'size' : {'width': $('#popup_message_view').width(), 'height': $('#popup_message_view').height()}});
		document.getElementById('changesize').click();
	}
}
if (!window.console) { console = {log: function() {}} };
