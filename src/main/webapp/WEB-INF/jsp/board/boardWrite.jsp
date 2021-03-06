<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<title>Insert title here</title>
</head>
<body>
	
	<div class="navbar navbar-default">
	<div class="container">
		<div class="navbar-header">
			<button class="navbar-toggle" type="button" data-toggle="collapse" date-target="#navbar-main">
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Blog</a>
		</div>
		
		<center>
			<div class="navbar-collapse collapse" id="navbar-main">
				<form class="navbar-form navbar-right" rol="search" action="">
					<div class="form-group">
						<input type="text" class="form-control" name="id" placeholder="Username">
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="password" placeholder="Password">
					</div>
					<input type="submit" class="btn btn-default" value="로그인"></button>
				</form>
			</div>
		</center>
	</div>
	</div>
	
	<div class="inbox">
		<form id="write" name="write" action="/insert" method="post">
			<table class="table table-write">
				<colgroup>
					<col width="120px">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<td class="text-center">제목</td>
						<td class="pull_input"><input type="text" size=149 id="title" name="title"/></td>
					</tr>						
					<tr>
						<td class="text-center">내용</td>
						<td class="textarea"><textarea rows="14" cols=151 id="content" name="content"></textarea></td>
					</tr>
				</tbody>
			</table>
			<div class="huge-top">
				<input type="button" class="btn btn-normal pull-right" onclick="location.href='/index'" value="취소">
				<input type="submit" class="btn btn-normal pull-right" id="insert" name="insert" value="확인">
			</div>
		</form>
	</div>
	
</body>
</html>