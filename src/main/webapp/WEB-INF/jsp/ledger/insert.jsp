<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="layout" content="main" />
<link rel="stylesheet" type="text/css" href="clean/css/customize-template.css" media="screen, projection" />
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript" src="clean/js/jquery/jquery-1.8.2.min.js"></script>
</head>

<body>
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<button class="btn btn-navbar" data-toggle="collapse" data-target="#app-nav-top-bar">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
				</button>
				<a href="dashboard.html" class="brand"><i class="icon-leaf"> Dashboard</i></a>
				<div id="app-nav-top-bar" class="nav-collapse">
					<ul class="nav">
						<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">MENU <b class="caret hidden-phone"></b></a>
							<ul class="dropdown-menu">
								<li><a href="clean/demo/dashboard.html">Dashboard</a></li>
								<li><a href="clean/demo/form.html">Form</a></li>
								<li><a href="clean/demo/custom-view.html">Custom View</a></li>
								<li><a href="clean/demo/login.html">Login Page</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<div id="body-container">
		<div id="body-content">
			<div class="body-nav body-nav-horizontal body-nav-fixed">
				<div class="container">
					<ul>
						<li><a href="http://localhost:18084/selectMainLedgerForm.do"> <i class="icon-home icon-large"></i>메인화면</a></li>
						<li><a href="http://localhost:18084/insertLedgerForm.do"> <i class="icon-pencil icon-large"></i>등록</a></li>
						<li><a href="http://localhost:18084/selectLedgerForm.do"> <i class="icon-list-alt icon-large"></i>조회</a></li>
						<li><a href="http://localhost:18084/searchLedgerForm.do"> <i class="icon-search icon-large"></i>검색</a></li>
					</ul>
				</div>
			</div>
			<section class="nav nav-page">
			<div class="container">
				<div class="row">
					<div class="span7">
						<header class="page-header"><h3>등록</h3></header>
					</div>
				</div>
			</div>
			</section>
			<section class="page container">
			<div class="row">
				<div class="span16">
					<div class="box">
						<div class="box-header">
							<i class="icon-book"></i>
							<h5>등록</h5>
						</div>
						<div class="box-content">
							<br>
							<div class="control-group ">
								<label class="control-label">날짜 </label>
								<div class="controls">
									<input type="text" id="datepicker" name="ledger_regist_date" class="span15" value="" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">상차지 </label>
								<div class="controls">
									<input type="text" id="current-pass-control1" name="ledger_source" class="span15" value="" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">하차지 </label>
								<div class="controls">
									<input type="text" id="current-pass-control2" name="ledger_destination" class="span15" value="" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">전화번호 </label>
								<div class="controls">
									<input type="text" id="current-pass-control3" name="ledger_tel" class="span15" value="" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">종류<span class="required">*</span></label>
								<div class="controls">
									<select id="challenge_question_control" class="span15" name="ledger_status">
										<option value="">-- 종류 선택 --</option>
										<option value="1">사무실</option>
										<option value="2">24시콜</option>
										<option value="3">원콜</option>
									</select>
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">금액 </label>
								<div class="controls">
									<input type="text" id="current-pass-control5" name="ledger_money" class="span15" value="" autocomplete="false">
								</div>
							</div>
						</div>
						<div class="box-footer">
							<button id="submit-button" type="submit" class="btn btn-primary" name="ledger_insert_button" value="CONFIRM">등록</button>
							<button type="submit" class="btn" name="action" value="CANCEL">취소</button>
						</div>
					</div>
				</div>
			</div>
			</section>
		</div>
	</div>

	<footer class="application-footer">
	<div class="container">
		<p>Application Footer</p>
		<div class="disclaimer">
			<p>This is an example disclaimer. All right reserved.</p>
			<p>Copyright © keaplogik 2011-2012</p>
		</div>
	</div>
	</footer>

	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-transition.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-alert.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-modal.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-dropdown.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-scrollspy.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-tab.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-tooltip.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-popover.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-button.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-collapse.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-carousel.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-typeahead.js"></script>
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-affix.js"></script>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>
	<script type="text/javascript" src="clean/js/jquery/jquery-tablesorter.js"></script>
	<script type="text/javascript" src="clean/js/jquery/jquery-chosen.js"></script>
	<script type="text/javascript" src="clean/js/jquery/virtual-tour.js"></script>
	<script type="text/javascript">
		$(function() {
			$('#sample-table').tablesorter();
			$('[name="ledger_regist_date"]').datepicker({
				dateFormat : 'yy-mm-dd' //Input Display Format 변경                           
			});
			$('[name="ledger_regist_date"]').datepicker('setDate', new Date);
			$(".chosen").chosen();
		});
	</script>
	<script type="text/javascript">
		$('[name="ledger_insert_button"]').click(function() {
			var ledger_regist_date = $('[name="ledger_regist_date"]').val();
			var ledger_source = $('[name="ledger_source"]').val();
			var ledger_destination = $('[name="ledger_destination"]').val();
			var ledger_tel = $('[name="ledger_tel"]').val();
			var ledger_status = $('[name="ledger_status"]').val();
			var ledger_money = $('[name="ledger_money"]').val();
			if (ledger_status == '' || ledger_status == null){
				alert('종류를 선택해주세요.');
				return false;
			}
			alert("등록");
			var path = 'http://localhost:18084/insertLedgerView.do';
			
			$.ajax({
		        type : "POST",
		        data : {ledger_regist_date : ledger_regist_date, 
		        	ledger_source : ledger_source,
		        	ledger_destination : ledger_destination,
		        	ledger_tel : ledger_tel,
		        	ledger_status : ledger_status,
		        	ledger_money : ledger_money},
		        url  : path,
		        success : function(data) {           
		           // $(".sideRight").empty();
		            //$(".sideRight").append(data);
		            alert('물품등록 성공');
		          	console.log('물품등록 성공');
		        },
		        error : function() {
		        	alert('물품등록 실패');
		          	console.log('물품등록 실패');                         
		        }		        
		    });
		});
	</script>
</body>
</html>