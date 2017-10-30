$(document).ready(function() {
	$.getJSON("../data.json", function(d) {
		render(d.question);
	});

	function render(question) {
		$question = $("#question");
		$h2 = $question.find("h2");
		$p = $question.find("p");
		$buttons = $question.find("#buttons");

		$h2.text(question.questionTitle);
		$p.text(question.questionParagraph);

		var buttons = [];

		for (q in question.answers) {
			button = "<a class='answer_button'>" + q + "</a>";
			$button = $(button);
			$button.on("click");
			buttons.push($(button));
		}
	}
});
