$(document).ready(function() {
	$.getJSON("../data.json", function(d) {
		renderClosure(d);
	});

	function renderClosure(d) {
		function renderResources(resource) {
			var popup =
				"<div class='popup'>" +
				"<h2>" +
				resource.resourceTitle +
				"</h2>" +
				"<p>" +
				resource.resourceParagraph +
				"</p><h3>Resources</h3>";
			for (var i = 0; i < resource.resourceLinks.length; i++) {
				popup +=
					"<a src='" +
					resource.resourceLinks[i].url +
					"'>" +
					resource.resourceLinks[i].linkName +
					"</a>";
			}
			popup += "<div class='close_button'>Close</div></div>";
			var $popup = $(popup);
			$("#wrap").append($popup);
		}

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
				$breadCrumbs.append(
					$("<p style='display: inline-block'> &nbsp; >> &nbsp;</p>")
				);
			}
		}

		function renderBreadCrumbs(questionTitle) {
			var breadCrumbs = [];
			var itter = d.question;
			while (true) {
				if (itter.questionTitle == questionTitle) {
					breadCrumbs.push(itter);
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
