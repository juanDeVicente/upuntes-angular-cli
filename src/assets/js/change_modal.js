
function change_modal(modal_id, modal_body_id, data) {
	document.getElementById(modal_body_id).innerHTML = "<div class=\"modal-body\">\n" + data + "</div>\n<div class=\"modal-footer\">\n" +
		"\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\"id='close_button' onClick=\"reloadPage()\">Cerrar</button>\n" +
		"\t\t\t\t\t</div>";
	$('#' + modal_id).on('hidden.bs.modal', function () {
		reloadPage();
	});
}

function reloadPage() {
	location.reload();
}
