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
						<li><a href="http://localhost:18084/insertLedgerForm.do"> <i class="icon-pencil icon-large"></i>게임 등록</a></li>
						<li><a href="http://localhost:18084/selectLedgerForm.do"> <i class="icon-list-alt icon-large"></i>게임 조회</a></li>
						<li><a href="http://localhost:18084/searchLedgerForm.do"> <i class="icon-search icon-large"></i>게임 검색</a></li>
					</ul>
				</div>
			</div>
			<section class="nav nav-page">
			<div class="container">
				<div class="row">
					<div class="span7">
						<header class="page-header"><h3>메인화면</h3></header>
					</div>
				</div>
			</div>
			</section>
			<section class="page container">
			<!-- 
			<div class="row">
				<div class="span16">
					<div class="box">
						<div class="box-header">
							<i class="icon-bookmark"></i><h5>Shortcuts</h5>
						</div>
						<div class="box-content">
							<div class="btn-group-box" style="text-align: center">
								<button class="btn" style="width: 23%;"><i class="icon-dashboard icon-large"></i><br />Dashboard</button>
								<button class="btn" style="width: 23%;"><i class="icon-user icon-large"></i><br />Account</button>
								<button class="btn" style="width: 23%; padding-top: 6px;"><h5>전체<br>165건</h5></button>
								<button class="btn" style="width: 23%;"><i class="icon-list-alt icon-large"></i><br />Reports</button>								
							</div>
						</div>
					</div>
				</div>
			</div>
			 -->
			<div class="row">
				<div class="span16">
					<div class="box pattern">
						<div class="box-header">
							<i class="icon-table"></i><h5>간편조회</h5>
						</div>
						<div class="box-content box-table">
							<table id="sample-table" class="table table-hover table-bordered tablesorter">
								<thead>
									<tr>
										<th>출시일</th>
										<th>게임명</th>
										<th>장르</th>
										<th>제작사</th>
										<th>배급사</th>
										<th>플랫폼</th>
										<th>가격</th>									
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>2020.08.18</td>
										<td>스피릿페어러</td>
										<td>어드벤처, 시뮬레이션</td>
										<td>선더 로터스 게임즈</td>
										<td>선더 로터스 게임즈</td>
										<td>PC, PS4, XBOX, Switch</td>
										<td>₩21,000</td>										
									</tr>
									<tr>
										<td>2020.09.17</td>
										<td>하데스</td>
										<td>액션, 인디, RPG</td>
										<td>Supergiant Games</td>
										<td>Supergiant Games</td>
										<td>PC</td>
										<td>₩26,000</td>										
									</tr>
									<c:forEach items="${result}" var="result" varStatus="status">
                  					<tr>
                    					<td>${result.employeeId}</td>
                    					<td>${result.company}</td>
                    					<td>${result.employeeName}</td>
                    					<td>${result.etc}</td>
                    					<td>0</td>                   
                    					<td>0</td>
                    					<td>0</td>
                  					</tr>	
                  					</c:forEach>					
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			</section>
		</div>
	</div>

	<div id="spinner" class="spinner" style="display: none;">Loading&hellip;</div>

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
	</script>
	<!-- 주소창 숨기는 법  -->
	<script type="text/javascript">
		window.addEventListener('load', function() {
			setTimeout(scrollTo, 0, 0, 1);
		}, false);
	</script>
</body>
</html>