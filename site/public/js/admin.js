$(document).ready(function() {
	$.getJSON("data.json", function(d) {
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
				url: "/php/updateJSON.php",
				type: "POST",
				data: { data: json },
				success: function(result) {
					console.log(result);
					alert("JSON updated!");
				},
				error: function(e) {
					console.log(e.message);
				}
			});
		}

		$("#submit_button").on("click", updateJSON);
	}
});
