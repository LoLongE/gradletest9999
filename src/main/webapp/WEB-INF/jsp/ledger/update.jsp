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
						<header class="page-header"><h3>상세조회&수정</h3></header>
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
							<h5>상세조회&수정</h5>
						</div>
						<div class="box-content">
							<br>
							<div class="control-group ">
								<label class="control-label">날짜 </label>
								<div class="controls">
									<input type="text" id="datepicker" name="board_regist_date" class="span15" value="${result.board_regist_date}" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">상차지 </label>
								<div class="controls">
									<input type="text" id="current-pass-control1" name="board_source" class="span15" value="${result.board_source}" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">하차지 </label>
								<div class="controls">
									<input type="text" id="current-pass-control2" name="board_destination" class="span15" value="${result.board_destination}" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">전화번호 </label>
								<div class="controls">
									<input type="text" id="current-pass-control3" name="board_tel" class="span15" value="${result.board_tel}" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">종류<span class="required">*</span></label>
								<div class="controls">
									<select id="challenge_question_control" class="span15" name="board_status">
										<option value="1">사무실</option>
										<option value="2">24시콜</option>
										<option value="3">원콜</option>
									</select>
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">금액 </label>
								<div class="controls">
									<input type="text" id="current-pass-control5" name="board_money" class="span15" value="${result.board_money}" onkeyup="numberWithCommasMoney(this.value)" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">부가세 </label>
								<div class="controls">
									<input type="text" id="current-pass-control5" name="board_tax" class="span15" value="${result.board_tax}" onkeyup="numberWithCommasTax(this.value)" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">입금<span class="required">*</span></label>
								<div class="controls">
									<select id="challenge_question_control" class="span15" name="board_money_status">
										<option value="1">미입금</option>
										<option value="2">입금완료</option>
									</select>
								</div>
							</div>
						</div>
						<div class="box-footer">
							<button id="submit-button" type="submit" class="btn btn-primary" name="board_insert_button" value="CONFIRM">수정</button>
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
	<script type="text/javascript" src="clean/js/bootstrap/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="clean/js/jquery/jquery-tablesorter.js"></script>
	<script type="text/javascript" src="clean/js/jquery/jquery-chosen.js"></script>
	<script type="text/javascript" src="clean/js/jquery/virtual-tour.js"></script>
	<script type="text/javascript">
		$(function() {
			$('#sample-table').tablesorter();
			$('#datepicker').datepicker();
			$(".chosen").chosen();
		});
		function numberWithCommasMoney(x) {
			  x = x.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
			  x = x.replace(/,/g,'');          // ,값 공백처리
			  $('[name="board_money"]').val(x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // 정규식을 이용해서 3자리 마다 , 추가 
			}
		function numberWithCommasTex(y) {
			  y = y.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
			  y = y.replace(/,/g,'');          // ,값 공백처리
			  $('[name="board_tax"]').val(y.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // 정규식을 이용해서 3자리 마다 , 추가 
			}
	</script>
</body>
</html>