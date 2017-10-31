$(document).ready(function() {
	$.getJSON("../data.json", function(d) {
		renderEditor(d);
	});

	function renderEditor(d) {
		// create the editor
		var container = document.getElementById("jsoneditor");
		var options = {};
		var editor = new JSONEditor(container, options);

		// set json
		editor.set(d);

		function updateJSON() {
			// get json
			var json = editor.get();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "../php/updateJSON.php",
				data: { myData: json },
				contentType: "application/json; charset=utf-8",
				success: function(data) {
					alert("JSON Updated!");
				},
				error: function(e) {
					console.log(e.message);
				}
			});
		}

		$("#submit_button").on("click", updateJSON);
	}
});
