<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<div class="navbar navbar-default">
	<div class="container">
		<div class="navbar-header">
			<button class="navbar-toggle" type="button" data-toggle="collapse" date-target="#navbar-main">
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Login</a>
		</div>
	</div>
	</div>
	<div class="container">
		<div class="col-lg-4"></div>
			<div class="col-lg-4">
			
					<div class="form-group">
						<input type="text" class="form-control" placeholder="아이디" id="member_id" name="member_id" maxlength="20">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" placeholder="비밀번호" id="member_password" name="member_password" maxlength="20">

					</div>
					<input type="submit" class="btn btn-primary form-control" id="btn_login" name="btn_login" value="Login" onclick="login()">
			</div>
			</div>
		<div class="col-lg-4"></div>
<script type="text/javascript">
	function login() {
		if($("#member_id").val() == null || $("#member_id").val() == ""){
			alert("아이디를 입력해주세요!");
			return;
		} else {
			location.href="/selectLoginView.do?member_id="+$("#member_id").val()+"&member_password="+$("#member_password").val();	
		}
	}
</script>
	
</body>
</html>