// rules: all question titles must be unique, there can be only one answer leading to a new question

$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(u) {
    if (u) {
      var name;
      if (u.displayName) {
        name = u.displayName;
      } else {
        name = u.email.substr(0, u.email.indexOf('@'));
      }
      $('#login-head')
        .text(name)
        .css('font-weight', 'bold');
      if (u.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
        $('#nav-head').append('<a id=\'admin-head\' href=\'admin.html\'>Admin</a>');
      }
    }
  });

  //load tree json from database
  var database = firebase.database();
  database.ref('tree').on('value', closure);

  //get json
  // $.getJSON("data.json", function (d) {
  // 	renderClosure(d);
  // });

  //displays resources as pop up
  function renderResources(resource) {
    var popup =
      '<div id=\'popup\'>' +
      '<h2>' +
      resource.resourceTitle +
      '</h2>' +
      '<p>' +
      resource.resourceParagraph +
      '</p><h3>Resources</h3>';

    //iterates through all links and add them to HTML
    for (var i = 0; i < resource.resourceLinks.length; i++) {
      popup +=
        '<a target=\'_blank\' href=\'' +
        resource.resourceLinks[i].url +
        '\'>' +
        resource.resourceLinks[i].linkName +
        '</a>';
    }

    popup +=
      '<div id=\'close_btn\' class=\'close_button noselect\'>Close</div></div>';
    var $popup = $(popup);
    var $wrapper = $('#wrap');
    var $footerLine = $('#footer_line');
    var $footer = $('footer');

    $wrapper.css({ filter: 'blur(3px)' });
    $footerLine.css({ filter: 'blur(3px)' });
    $footer.css({ filter: 'blur(3px)' });
    $popup.css({ filter: 'blur(0px)' });

    //function for closing pop up
    var removePopup = function() {
      $popup.remove();
      $footerLine.css({ filter: 'blur(0px)' });
      $footer.css({ filter: 'blur(0px)' });
      $wrapper.css({ filter: 'blur(0px)' });
    };

    $popup.find('#close_btn').on('click', removePopup);
    $('body').append($popup);
  }

  //the beginning of everything
  function closure(snapshot) {
    //instantiate tree
    var tree = snapshot.val();
    //console.log(tree);

    //create breadCrumbs array
    var breadCrumbs = [];

    //utility function for creating breadCrumbs
    function renderBreadCrumbsUtil(breadCrumbs) {
      //jquery stuff
      $breadCrumbs = $('#bread_crumbs');
      $breadCrumbs.empty();

      //console.log(breadCrumbs);

      //populate HTML with breadCrumbs
      for (var i = 0; i < breadCrumbs.length; i++) {
        var link =
          '<div class=\'bread_crumb\'id = ' + i + '>' + breadCrumbs[i] + '</div>';
        var $link = $(link);

        //breadCrumbs on click creates a function that find
        //the index of questionTitle in tree
        //then pass the index of the question to render function
        //to display on screen
        $link.on('click', function() {
          var bread = $(this).text();
          // console.log($(this).attr("id"));
          //console.log(bread);
          var index = 0;
          for (var o = 0; o < tree.length; o++) {
            if (tree[o].questionTitle == bread) {
              index = o;
              break;
            }
          }

          //popping all breadCrumbs up to current
          //allow browser to delete redundent stuff

          var popVal = breadCrumbs.length - index;

          // console.log(breadCrumbs.length);
          // console.log(index);
          // console.log(popVal);

          for (var m = 0; m < popVal; m++) {
            breadCrumbs.pop();
          }

          //console.log(index);

          render(index, true);
        });

        //append additional breadCrumbs to HTML
        $breadCrumbs.append($link);
        $breadCrumbs.append(
          $('<p style=\'display: inline-block\'> &nbsp; >> &nbsp;</p>')
        );
      }
    }

    //populate breadCrumbs array with questionTitle
    function renderBreadCrumbs(questionTitle) {
      breadCrumbs.push(questionTitle);
      renderBreadCrumbsUtil(breadCrumbs);
    }

    //where the magic happens
    var i = -1;
    function render(index, isBreadCrumbs) {
      i++;

      //this is for breadCrumbs, only take in parameters if breadCrumbs is clicked
      //stupid JS asynchronous
      if (isBreadCrumbs == true) {
        i = index;
      }

      //console.log(i);

      //instantiate variables
      var $question = $('#question');
      var $h2 = $question.find('h2');
      var $p = $question.find('p');
      var $buttons = $question.find('#buttons');

      //display questions and descriptions on page
      $h2.text(tree[i].questionTitle);
      $p.text(tree[i].questionParagraph);

      //create an array for answers
      var props = [];
      for (var j = 0; j < tree[i].answers.length; j++) {
        props.push(tree[i].answers[j]);
      }

      //console.log(props);

      $buttons.empty();

      //create buttons using answers array
      for (var l = 0; l < props.length; l++) {
        //console.log(props[l]);

        button =
          '<div class=\'answer_button noselect\'>' +
          tree[i].answers[l].answerTitle +
          '</div>';
        $button = $(button);

        //if answer leads to next question, recursively call render
        //iterate through each questions
        if (props[l].nextBool == false) {
          $button.on('click', render);
        } else {
          //if answer has resources, run renderResources function and pop ups
          $button.on('click', renderResources.bind(null, props[l]));
        }

        //add buttons for each answer
        $buttons.append($button);
      }

      //create breadCrumbs trail
      renderBreadCrumbs(tree[i].questionTitle);
    }

    //first time calling function to start at question 0
    render();
  }
});
