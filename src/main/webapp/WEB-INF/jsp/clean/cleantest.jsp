<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="layout" content="main" />


<!-- <link rel="stylesheet" type="text/css" href="rdash/components/rdash-ui/dist/css/rdash.min.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="rdash/components/bootstrap/dist/css/bootstrap.min.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="rdash/components/font-awesome/css/font-awesome.min.css"> -->

<link rel="stylesheet" type="text/css"
	href="clean/css/customize-template.css" media="screen, projection" />
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script src="clean/js/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
<!-- 
<script type="text/javascript"
	src="rdash/components/angular/angular.min.js"></script>
<script type="text/javascript"
	src="rdash/components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
<script type="text/javascript"
	src="rdash/components/angular-cookies/angular-cookies.min.js"></script>
<script type="text/javascript"
	src="rdash/components/angular-ui-router/release/angular-ui-router.min.js"></script>
	 -->
</head>

<body>
	<div class="navbar navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<button class="btn btn-navbar" data-toggle="collapse"
					data-target="#app-nav-top-bar">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a href="dashboard.html" class="brand"><i class="icon-leaf">
						Dashboard</i></a>
				<div id="app-nav-top-bar" class="nav-collapse">
					<ul class="nav">
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown">MENU <b class="caret hidden-phone"></b></a>
							<ul class="dropdown-menu">
								<li><a href="clean/demo/dashboard.html">Dashboard</a></li>
								<li><a href="clean/demo/form.html">Form</a></li>
								<li><a href="clean/demo/custom-view.html">Custom View</a></li>
								<li><a href="clean/demo/login.html">Login Page</a></li>
							</ul></li>
				</div>
			</div>
		</div>
	</div>

	<div id="body-container">
		<div id="body-content">
			<div class="body-nav body-nav-horizontal body-nav-fixed">
				<div class="container">
					<ul>
						<li><a href="http://localhost:18082/clean.do"> <i
								class="icon-home icon-large"></i>메인화면
						</a></li>
						<li><a href="http://localhost:18082/insertDataForm.do"> <i
								class="icon-pencil icon-large"></i>등록
						</a></li>
						<li><a href="http://localhost:18082/selectDataView.do"> <i class="icon-list-alt icon-large"></i>조회
						</a></li>
						<li><a href="#"> <i class="icon-search icon-large"></i>검색
						</a></li>
					</ul>
				</div>
			</div>
			<section class="nav nav-page">
			<div class="container">
				<div class="row">
					<div class="span7">
						<header class="page-header">
						<h3>메인화면</h3>
						</header>
					</div>

				</div>
			</div>
			</section>
			<section class="page container">
			<div class="row">
				<div class="span16">
					<div class="box">
						<div class="box-header">
							<i class="icon-bookmark"></i>
							<h5>Shortcuts</h5>
						</div>
						<div class="box-content">
							<div class="btn-group-box" style="text-align:center">
								<button class="btn" style="width:23%;"><i class="icon-dashboard icon-large"></i><br/>Dashboard</button>
                            	<button class="btn" style="width:23%;"><i class="icon-user icon-large"></i><br/>Account</button>
                            	<button class="btn" style="width:23%; padding-top:6px;"><h5>전체<br>165건</h5> </button>
                            	<button class="btn" style="width:23%;"><i class="icon-list-alt icon-large"></i><br/>Reports</button>
								<!--  Data LoLong -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 
			<div class="row">
				<div class="span8">
					<div class="box pattern pattern-sandstone">
						<div class="box-header">
							<i class="icon-list"></i>
							<h5>Lists</h5>
							<button class="btn btn-box-right" data-toggle="collapse"
								data-target=".box-list">
								<i class="icon-reorder"></i>
							</button>
						</div>
						<div class="box-content box-list collapse in">
							<ul>
								<li>
									<div>
										<a href="#" class="news-item-title">Duis aute irure dolor
											in reprehenderit</a>
										<p class="news-item-preview">Lorem ipsum dolor sit amet,
											consectetur adipisicing elit, sed do eiusmod tempor
											incididunt ut labore et dolore.</p>
									</div>
								</li>
								<li>
									<div>
										<a href="#" class="news-item-title">Duis aute irure dolor
											in reprehenderit</a>
										<p class="news-item-preview">Lorem ipsum dolor sit amet,
											consectetur adipisicing elit, sed do eiusmod tempor
											incididunt ut labore et dolore.</p>
									</div>
								</li>
								<li>
									<div>
										<a href="#" class="news-item-title">Duis aute irure dolor
											in reprehenderit</a>
										<p class="news-item-preview">Lorem ipsum dolor sit amet,
											consectetur adipisicing elit, sed do eiusmod tempor
											incididunt ut labore et dolore.</p>
									</div>
								</li>
							</ul>
							<div class="box-collapse">
								<button class="btn btn-box" data-toggle="collapse"
									data-target=".more-list">Show More</button>
							</div>
							<ul class="more-list collapse out">
								<li>
									<div>
										<a href="#" class="news-item-title">Duis aute irure dolor
											in reprehenderit</a>
										<p class="news-item-preview">Lorem ipsum dolor sit amet,
											consectetur adipisicing elit, sed do eiusmod tempor
											incididunt ut labore et dolore.</p>
									</div>
								</li>
								<li>
									<div>
										<a href="#" class="news-item-title">Duis aute irure dolor
											in reprehenderit</a>
										<p class="news-item-preview">Lorem ipsum dolor sit amet,
											consectetur adipisicing elit, sed do eiusmod tempor
											incididunt ut labore et dolore.</p>
									</div>
								</li>
								<li>
									<div>
										<a href="#" class="news-item-title">Duis aute irure dolor
											in reprehenderit</a>
										<p class="news-item-preview">Lorem ipsum dolor sit amet,
											consectetur adipisicing elit, sed do eiusmod tempor
											incididunt ut labore et dolore.</p>
									</div>
								</li>
							</ul>
						</div>

					</div>
				</div>-->
			<div class="row">
				<div class="span16">
					<div class="box pattern">
						<div class="box-header">
							<i class="icon-table"></i>
							<h5>간편조회</h5>
						</div>
						<div class="box-content box-table">
							<table id="sample-table"
								class="table table-hover table-bordered tablesorter">
								<thead>
									<tr>
										<th>날짜</th>
										<th>출발지</th>
										<th>목적지</th>
										<th>전화번호</th>
										<th>금액</th>
										<th>상태</th>
										<!-- <th class="td-actions"></th> -->
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>2020-04-01</td>
										<td>서울특별시 금천구</td>
										<td>서울특별시 금천구</td>
										<td>000-0000-0000</td>
										<td>100,000</td>
										<td><a href="javascript:;" class="btn btn-small btn-info">
												완료</a></td>
										<!-- <td class="td-actions"><a href="javascript:;"
											class="btn btn-small btn-info"> 완료</a> <a href="javascript:;"
											class="btn btn-small btn-danger"> 미완료</a></td> -->
									</tr>
									<tr>
										<td>2020-04-01</td>
										<td>서울특별시 금천구</td>
										<td>서울특별시 금천구</td>
										<td>000-0000-0000</td>
										<td>100,000</td>
										<td><a href="javascript:;"
											class="btn btn-small btn-danger"> 미완료</a></td>
										<!-- <td class="td-actions"><a href="javascript:;"
											class="btn btn-small btn-info"> 완료</a> <a href="javascript:;"
											class="btn btn-small btn-danger"> 미완료</a></td> -->
									</tr>
									<!-- 
									<tr>
										<td>4.0</td>
										<td>Firefox</td>
										<td class="td-actions"><a href="javascript:;"
											class="btn btn-small btn-info"> <i
												class="btn-icon-only icon-ok"></i>
										</a> <a href="javascript:;" class="btn btn-small btn-danger">
												<i class="btn-icon-only icon-remove"></i>
										</a></td>
									</tr>
									<tr>
										<td>Latest</td>
										<td>Safari</td>
										<td class="td-actions"><a href="javascript:;"
											class="btn btn-small btn-info"> <i
												class="btn-icon-only icon-ok"></i>
										</a> <a href="javascript:;" class="btn btn-small btn-danger">
												<i class="btn-icon-only icon-remove"></i>
										</a></td>
									</tr>
									<tr>
										<td>Latest</td>
										<td>Chrome</td>
										<td class="td-actions"><a href="javascript:;"
											class="btn btn-small btn-info"> <i
												class="btn-icon-only icon-ok"></i>
										</a> <a href="javascript:;" class="btn btn-small btn-danger">
												<i class="btn-icon-only icon-remove"></i>
										</a></td>
									</tr>
									<tr>
										<td>11</td>
										<td>Opera</td>
										<td class="td-actions"><a href="javascript:;"
											class="btn btn-small btn-info"> <i
												class="btn-icon-only icon-ok"></i>
										</a> <a href="javascript:;" class="btn btn-small btn-danger">
												<i class="btn-icon-only icon-remove"></i>
										</a></td>
									</tr>
									 -->
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!--  
			<div class="row">
				<div class="span16">
					<div class="box">
						<div class="box-header">
							<i class="icon-book"></i>
							<h5>간편등록</h5>
						</div>
						<div class="box-content">
							<br>
							
							<div class="control-group ">
								<label class="control-label">날짜 <span class="required">*</span></label>
								<div class="controls">
									<input type="text" id="datepicker" name="lolong_text01"
										class="span15" value="" autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">출발지 </label>
								<div class="controls">
									<input type="text" id="current-pass-control"
										name="lolong_text02" class="span15" value=""
										autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">목적지 </label>
								<div class="controls">
									<input type="text" id="current-pass-control"
										name="lolong_text03" class="span15" value=""
										autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">전화번호 </label>
								<div class="controls">
									<input type="text" id="current-pass-control"
										name="lolong_text03" class="span15" value=""
										autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">금액 </label>
								<div class="controls">
									<input type="text" id="current-pass-control"
										name="lolong_text03" class="span15" value=""
										autocomplete="false">
								</div>
							</div>
							<div class="control-group ">
								<label class="control-label">부가세 </label>
								<div class="controls">
									<input type="text" id="current-pass-control"
										name="lolong_text03" class="span15" value=""
										autocomplete="false">
								</div>
							</div>
						</div>
						<div class="box-footer">
							<button type="submit" class="btn btn-primary">
								<i class="icon-ok"></i> 등록
							</button>
							<button id="submit-button" type="submit" class="btn btn-primary"
								name="action" value="CONFIRM">등록</button>
							<button type="submit" class="btn" name="action" value="CANCEL">취소</button>
						</div>
					</div>
				</div>
			</div>
-->
<!-- 
			<div class="row">
				<div class="span8">
					<div class="box">
						<div class="box-header">
							<i class="icon-folder-open"></i>
							<h5>Content</h5>
						</div>
						<div class="box-content">
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
								sed do eiusmod tempor incididunt ut labore et dolore magna
								aliqua. Ut enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<p>Duis aute irure dolor in reprehenderit in voluptate velit
								esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
								occaecat cupidatat non proident, sunt in culpa qui officia
								deserunt mollit anim id est laborum.</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
								sed do eiusmod tempor incididunt ut labore et dolore magna
								aliqua. Ut enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
					</div>
				</div>
			</div>
-->
			</section>



		</div>
	</div>

	<div id="spinner" class="spinner" style="display: none;">
		Loading&hellip;</div>

	<footer class="application-footer">
	<div class="container">
		<p>Application Footer</p>
		<div class="disclaimer">
			<p>This is an example disclaimer. All right reserved.</p>
			<p>Copyright © keaplogik 2011-2012</p>
		</div>
	</div>
	</footer>

	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-transition.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-alert.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-modal.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-dropdown.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-scrollspy.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-tab.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-tooltip.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-popover.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-button.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-collapse.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-carousel.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-typeahead.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-affix.js"></script>
	<script type="text/javascript"
		src="clean/js/bootstrap/bootstrap-datepicker.js"></script>
	<script type="text/javascript"
		src="clean/js/jquery/jquery-tablesorter.js"></script>
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
		setTimeout(scrollTo,0,0,1);
	}, false);
</script>

</body>
</body>
</html>