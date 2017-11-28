// rules: all question titles must be unique, there can be only one answer leading to a new question

$(document).ready(function () {
	
	//load tree json from database
	var database = firebase.database();
	database.ref('tree').on("value", closure)

	//get json
	// $.getJSON("data.json", function (d) {
	// 	renderClosure(d);
	// });
	
	//displays resources as pop up
	function renderResources(resource) {
		var popup =
			"<div id='popup'>" +
			"<h2>" +
			resource.resourceTitle +
			"</h2>" +
			"<p>" +
			resource.resourceParagraph +
			"</p><h3>Resources</h3>";
		//iterates through all links and add them to HTML
		for (var i = 0; i < resource.resourceLinks.length; i++) {
			popup +=
				"<a target='_blank' href='" +
				resource.resourceLinks[i].url +
				"'>" +
				resource.resourceLinks[i].linkName +
				"</a>";
		}
		popup +=
			"<div id='close_btn' class='close_button noselect'>Close</div></div>";
		var $popup = $(popup);
		var $wrapper = $("#wrap");
		var $footerLine = $("#footer_line");
		var $footer = $("footer");
		$wrapper.css({ filter: "blur(3px)" });
		$footerLine.css({ filter: "blur(3px)" });
		$footer.css({ filter: "blur(3px)" });
		$popup.css({ filter: "blur(0px)" });

		//function for closing pop up
		var removePopup = function () {
			$popup.remove();
			$footerLine.css({ filter: "blur(0px)" });
			$footer.css({ filter: "blur(0px)" });
			$wrapper.css({ filter: "blur(0px)" });
		};

		$popup.find("#close_btn").on("click", removePopup);
		$("body").append($popup);
	}

	//the beginning of everything
	function closure(snapshot) {

		//instantiate tree
		var tree = snapshot.val();
		//console.log(tree);
		
		//create breadCrumbs array
		var breadCrumbs = [];
		function renderBreadCrumbsUtil(breadCrumbs) {
			$breadCrumbs = $("#bread_crumbs");
			$breadCrumbs.empty();
			//console.log(breadCrumbs);
			for (var i = 0; i < breadCrumbs.length; i++) {
				var link =
					"<div class='bread_crumb'>" +
					breadCrumbs[i] +
					"</div>";
				var $link = $(link);
				$link.on("click", function(){
					var bread = $(this).text();
					//console.log(bread);
					var index =0
					for(var o = 0; o < tree.length; o++){
						if(tree[o].questionTitle == bread){
							index = o;
							break;
						}
					}
					//console.log(index);
					render(index, true);
				});
				$breadCrumbs.append($link);
				$breadCrumbs.append(
					$("<p style='display: inline-block'> &nbsp; >> &nbsp;</p>")
				);
			}
		}
		function renderBreadCrumbs(questionTitle) {
			breadCrumbs.push(questionTitle);
			renderBreadCrumbsUtil(breadCrumbs);
		}
		var i = -1;
		function render(index, isBreadCrumbs) {
			i++;
			if (isBreadCrumbs == true){
				i = index;
			}
			//console.log(i);
			var $question = $("#question");
			var $h2 = $question.find("h2");
			var $p = $question.find("p");
			var $buttons = $question.find("#buttons");

			$h2.text(tree[i].questionTitle);
			$p.text(tree[i].questionParagraph);

			var props = [];
			for (var j = 0; j < tree[i].answers.length; j++) {
				props.push(tree[i].answers[j]);
			}
			//console.log(props);
			$buttons.empty();
			for (var l = 0; l < props.length; l++) {
				//console.log(props[l]);
				button =
					"<div class='answer_button noselect'>" +
					tree[i].answers[l].answerTitle +
					"</div>";
				$button = $(button);
				if (props[l].nextBool == false) {
					$button.on("click", render)
				} else {
					$button.on("click", renderResources.bind(null, props[l]))
				}
				$buttons.append($button);
			}
			renderBreadCrumbs(tree[i].questionTitle);
		}
		render();
	}
});
