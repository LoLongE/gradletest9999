<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<jsp:include page="/WEB-INF/jsp/common/header.jsp"></jsp:include>

<body id="page-top">

  <div id="wrapper">    
    <jsp:include page="/WEB-INF/jsp/common/navigation.jsp"></jsp:include>
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
		<!-- Topbar -->
        <nav class="navbar topbar mb-4 static-top" style="height:0px;"></nav>
        <!-- End of Topbar -->
        <div class="container-fluid">

          <!-- Page Heading -->
           <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">문서검색</h1>
            
          </div>

          <div class="row">

            <div class="col-xl-12 col-lg-12">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">문서검색</h6>                  
                </div>
                <!-- Card Body -->
                <div class="card-body">
                  <div class="row">
	                  <div class="col-sm">
		                  <input class="form-control mr-sm-2" id="fileSrcName" type="text" placeholder="문서명을 입력하세요" aria-label="Search" value="">
		              </div>
		              <div class="col-sm">
						  <button class="btn btn-primary btn-rounded" id="fileSrcButton">검색</button>
	                  </div>
	              </div>
	              
	              <div class="row pt-1">
	              </div>
				  
				  <div class="row">
				  	<div class="col-sm">
					  <table id="fileListTable" class="table table-bordered">
					    <thead>
					    <tr>
					        <th data-field="state" data-radio="true"></th>
					        <th data-field="idFile">ID</th>
					        <th data-field="name">파일명</th>
					        <th data-field="originExt">변환전 확장자</th>
					        <th data-field="ownerEmail">소유자</th>
					        <th data-field="idPolarisDoc">공편ID</th>
					        <th data-field="size" data-formatter="commonUtil.convertToFileSizeReadable">파일크기</th>
					        <th data-field="timeLastModified" data-formatter="commonUtil.dateFormatUtilType6Sec">수정시간</th>
					    </tr>
					    </thead>
					  </table>
					</div>  
				  </div>
				  
                </div>
                
                <div class="card-footer">
                	<button class="btn btn-primary btn-rounded" id="zipFileDownloadButton">리포팅 문서 다운로드</button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <jsp:include page="/WEB-INF/jsp/common/footer.jsp"></jsp:include>
    </div>
  </div>
  <jsp:include page="/WEB-INF/jsp/common/corejs.jsp"></jsp:include>
  <script src="admin/js/report.js"></script>
</body>
