$(document).ready(function() {
	$.getJSON("../data.json", function(d) {
		renderClosure(d);
	});

	function renderClosure(d) {
		function renderResources(resource) {}

		function renderBreadCrumbsUtil(breadCrumbs) {
			$breadCrumbs = $("#bread_crumbs");
			$breadCrumbs.empty();
			for (var i = 0; i < breadCrumbs.length; i++) {
				var link =
					"<div class='bread_crumb'>" +
					breadCrumbs[i].questionTitle +
					"</div>";
				var $link = $(link);

				$link.on("click", render.bind(null, breadCrumbs[i]));
				$breadCrumbs.append($link);
				$breadCrumbs.append($("<p> >> </p>"));
			}
		}

		function renderBreadCrumbs(questionTitle) {
			var breadCrumbs = [];
			var itter = d.question;
			while (true) {
				if (itter.questionTitle == questionTitle) {
					break;
				} else {
					breadCrumbs.push(itter);
					itter = itter.answers.yes.question;
				}
			}
			renderBreadCrumbsUtil(breadCrumbs);
		}

		function render(question) {
			var $question = $("#question");
			var $h2 = $question.find("h2");
			var $p = $question.find("p");
			var $buttons = $question.find("#buttons");

			$h2.text(question.questionTitle);
			$p.text(question.questionParagraph);

			var props = [];

			for (q in question.answers) {
				props.push(q);
			}
			$buttons.empty();
			for (var i = 0; i < props.length; i++) {
				button =
					"<div class='answer_button noselect'>" +
					props[i] +
					"</div>";
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
			renderBreadCrumbs(question.questionTitle);
		}

		render(d.question);
	}
});
