<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="layout" content="main" />
<link rel="stylesheet" type="text/css"
	href="clean/css/customize-template.css" media="screen, projection" />
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script src="clean/js/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
</head>
<script type="text/javascript">

//alert("조회");
console.log(${jsonString});
var test = ${jsonString};
console.log(test);
</script>
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
						<li><a href="http://localhost:18082/clean.do"> <i
								class="icon-home icon-large"></i>메인화면
						</a></li>
						<li><a href="http://localhost:18082/insertDataForm.do"> <i
								class="icon-pencil icon-large"></i>등록
						</a></li>
						<li><a href="#"> <i class="icon-list-alt icon-large"></i>조회
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
						<h3>조회</h3>
						</header>
					</div>

				</div>
			</div>
			</section>
			<section class="page container">
			<div class="row">
				<div class="span16">
					<div class="box pattern">
						<div class="box-header">
							<i class="icon-table"></i>
							<h5>조회</h5>
						</div>
						<div class="box-content box-table">
							<table id="sample-table"
								class="table table-hover table-bordered tablesorter">
								<section>
								<thead>
									<tr>
										<th>날짜</th>
										<th>상차지</th>
										<th>하차지</th>
										<th>종류</th>
										<th>금액</th>
										<th>누적</th>
										<th>상태</th>									
									</tr>
								</thead>
								<tbody id="data-container"></tbody>																
   							 </section>														
							</table>
						</div>
						<div class="box-footer">
							<div id="pagination"></div>							
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
	
	$(function () {
        let container = $('#pagination');
        container.pagination({
            dataSource: ${jsonString},	           
            callback: function (data, pagination) {	            		            	
            	var dataHtml;
                $.each(data, function (index, item) {	                	
                    var money_status = item.board_money_status;
                    var status = item.board_status;
                    if(status=="1") {
                    	item.board_status = "<a href='javascript:;' class='btn btn-small btn-success'>사무실</a>"
                    } else if (status=="2" || status=="3") {
                    	item.board_status = "<a href='javascript:;' class='btn btn-small btn-warning'>24시콜&원콜</a>"
                    }
                    if (money_status=="1") {
                    	item.board_money_status = "<a href='javascript:;' class='btn btn-small btn-danger'>미입금</a>"
                    } else if(money_status=="2") {
                    	item.board_money_status = "<a href='javascript:;' class='btn btn-small btn-info'>입금완료</a>"
                    }                     
                   	dataHtml += 
                    	'<tr onclick=selectDetailView('+item.board_no+')>'+ '<td>' + item.board_regist_date + '</td>' +
    					'<td>' + item.board_source + '</td>' +
    					'<td>' + item.board_destination + '</td>' +
        				'<td>' + item.board_status + '</td>' +
	    				'<td>' + item.board_money + '</td>' +
	    				'<td>' + item.board_status_count + '</td>' +
	    				'<td>' + item.board_money_status +'</td>'+ '</tr>';        					
                });
				$("#data-container").html(dataHtml);
            }
        })
    });	
	$(function() {
			$('#sample-table').tablesorter();
			$('#datepicker').datepicker();
			$(".chosen").chosen();
		});
	
	function selectDetailView(board_no){
		location.href="http://localhost:18082/updateDataForm.do?board_no="+board_no;    
	}
		  
	    
	</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.css"/>
</body>

</html>