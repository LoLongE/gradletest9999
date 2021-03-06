function confirmYesNoDialog(title, yes, no, handler) {
  $(`<div class="modal fade" tabindex="-1" role="dialog" id="confirmModal">
	  <div class="modal-dialog" role="document">
	  <div class="modal-content">
	    <div class="modal-header">
	      <h5 class="modal-title">`
	      + title +
	      `</h5>
	      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	        <span aria-hidden="true">&times;</span>
	      </button>
	    </div>
	    <div class="modal-footer">
	      <button type="button" class="btn btn-primary" id="btnYes">`+yes+`</button>
	      <button type="button" class="btn btn-secondary" id="btnNo" data-dismiss="modal">`+no+`</button>
	    </div>
	  </div>
	</div>
	</div>`).appendTo('body');
 
  $("#confirmModal").modal({
     backdrop: 'static',
     keyboard: false
  });
  
   $("#btnYes").click(function () {
       handler(true);
       $("#confirmModal").modal("hide");
   });
    
   $("#btnNo").click(function () {
       handler(false);
       $("#confirmModal").modal("hide");
   });

   $("#confirmModal").on('hidden.bs.modal', function () {
      $("#confirmModal").remove();
   });
}