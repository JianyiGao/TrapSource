$(document).ready(function() {
	$.getJSON("../data.json", function(d) {
		render(d.question);
	});

	function renderResources(resource) {}

	function render(question) {
		$question = $("#question");
		$h2 = $question.find("h2");
		$p = $question.find("p");
		$buttons = $question.find("#buttons");

		$h2.text(question.questionTitle);
		$p.text(question.questionParagraph);

		var props = [];

		for (q in question.answers) {
			props.push(q);
		}

		for (var i = 0; i < props.length; i++) {
			button = "<a class='answer_button'>" + props[i] + "</a>";
			$button = $(button);
			if (question.answers[props[i]].question != null) {
				$button.on(
					"click",
					render.bind(null, question.answers[props[i]].question)
				);
			} else {
				$button.on(
					"click",
					renderResources.bind(null, question.answers[props[i]])
				);
			}
			$buttons.append($button);
		}
	}
});
