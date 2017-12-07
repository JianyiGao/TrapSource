$(document).ready(function() {
<<<<<<< HEAD
  // check if user is login display the admin page if it is, or don't give permission if user isn't admin
=======
  window.trapsourceTest = {};
  window.trapsourceTest.render = render;
  window.trapsourceTest.sidePanelRender = sidePanelRender;
  window.trapsourceTest.save = save;
  $('#hamburger').on('click', function() {
    var nav = $('#nav-head');
    if (nav.css('top') === '-500px') {
      $('#nav-head').css('top', 'auto');
    } else {
      $('#nav-head').css('top', '-500px');
    }
  });
  // check if user is login
>>>>>>> 6ADevelopment_Test
  firebase.auth().onAuthStateChanged(function(u) {
    window.trapsourceTest.giveMeUser = giveMeUser;
    function giveMeUser() {
      return u;
    }
    if (u) {
      var name;
      if (u.displayName) {
        name = u.displayName;
      } else {
        name = u.email.substr(0, u.email.indexOf('@'));
      }

      // edit header to have user name and admin if admin is logged in
      $('#login-head')
        .text(name)
        .css('font-weight', 'bold');
      if (u.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
        $('#nav-head').append(
          "<a class=\"current_page\" id='admin-head' href='admin.html'>Admin</a>"
        );
      } else {
        $('body').html("You don't have permission to access this");
      }
    } else {
      $('body').html("You don't have permission to access this");
    }
  });

  var database = firebase.database();

  var user;
  var index = 0;

  var container = $('#container');
  var title = $('#Title');
  var description = $('#Description');
<<<<<<< HEAD
  // render function to render admin page
  function render(tree) {
    // removes any binding made by jquery on old elements
=======

  function sidePanelRender(tree) {
    console.log('render sidepanel');
    var sidepanel = $('#sidepanel');
    sidepanel.empty();
    for (var ind = 0; ind < tree.length; ind++) {
      sidepanel.append(
        '<li class=\'active text-center frm-question\'><a data-toggle=\'pill\' href=\'#needs-validatoin\'>' +
          tree[ind].questionTitle +
          '</a></li>'
      );
    }
    sidepanel.append(
      '<li id=\'addForm\'><button class=\'btn btn-success btn-block\' id=\'addFormBtn\'>Add Question</button></li>'
    );
    var questions = $('.frm-question');
    $(questions.get(index)).addClass('current-question');
    $.each(questions, function(key, question) {
      $(question).on('click', function() {
        save(tree);
        if (checkEmpty() && checkPathExists(tree, index)) {
          index = key;
          render(tree);
        }
      });
    });
  }

  function save(tree) {
    console.log('save');
    var answerCount = 0;
    var resourceCount = 0;
    var inputs = $('.frm-submit');
    $.each(inputs, function(key, input) {
      $input = $(input);
      if (key === 0) {
        tree[index].questionTitle = $input.val();
      } else if (key === 1) {
        tree[index].questionParagraph = $input.val();
      } else if ($input.attr('id') === 'Answer') {
        if ($(inputs.get(key + 1)).attr('id') === 'Answer') {
          tree[index].answers[answerCount].answerTitle = $input.val();
          answerCount++;
        } else {
          tree[index].answers[answerCount].answerTitle = $input.val();
        }
      } else if ($input.attr('id') === 'Resource-Title') {
        tree[index].answers[answerCount].resourceTitle = $input.val();
      } else if ($input.attr('id') === 'Resource-Paragraph') {
        tree[index].answers[answerCount].resourceParagraph = $input.val();
      } else if ($input.attr('id') === 'Resource-Name') {
        tree[index].answers[answerCount].resourceLinks[
          resourceCount
        ].linkName = $input.val();
      } else if ($input.attr('id') === 'Resource-URL') {
        if ($(inputs.get(key + 1)).attr('id') !== 'Resource-Name') {
          tree[index].answers[answerCount].resourceLinks[
            resourceCount
          ].url = $input.val();
          answerCount++;
          resourceCount = 0;
        } else {
          tree[index].answers[answerCount].resourceLinks[
            resourceCount
          ].url = $input.val();
          resourceCount++;
        }
      }
    });
  }

  function checkEmpty() {
    var inputs = $('.frm-submit');
    var validInputs = true;
    $.each(inputs, function(key, input) {
      $input = $(input);
      if ($input.val() === '') {
        var prev = $input.prev();
        var next = $input.next();
        prev.addClass('error');
        next.addClass('error');
        $input.addClass('error-input');
        $input.change(function() {
          prev.removeClass('error');
          next.removeClass('error');
          $(this).removeClass('error-input');
        });
        validInputs = false;
      }
    });
    if (!validInputs) {
      toastr.error('Please fill in this form before continuing');
    }
    return validInputs;
  }

  function checkPathExists(tree, index) {
    if (index + 1 === tree.length) {
      return true;
    }

    for (var i = 0; i < tree[index].answers.length; i++) {
      if (tree[index].answers[i].nextBool === false) {
        return true;
      }
    }
    toastr.error('There must exist at least one answer that is a path');
    return false;
  }

  function render(tree, newIndex, test) {
    if (newIndex) {
      index = newIndex;
    }
>>>>>>> 6ADevelopment_Test
    $('.rm-li').each(function() {
      $(this).unbind();
    });
    console.log('render');
    var resourceAnswers = [];
    var question = tree[index];
    container.html('');
    // append the title and containers that will appear in every quetion
    container.append(
      "<div class='row'><div class='col-md-12 form-group'><label for='Title'> Title </label><input value=\"" +
        question.questionTitle +
        "\"type='text' class='form-control frm-submit' id='Title' placeholder='Title' required/><div class='invalid-feedback'>Please fill in this section.</div>      </div>    </div>    <div class='row'>      <div class='col-md-12 form-group'>        <label for='Description'> Description </label>        <textarea class='form-control frm-submit' rows=3 id='Description' placeholder='Description' required>" +
        question.questionParagraph +
        "</textarea>        <div class='invalid-feedback'>          Please fill in this section.        </div>      </div>    </div>"
    );
    // render questions out
    for (var i = 0; i < question.answers.length; i++) {
      var answer = question.answers[i];
      // if answer is a path question
      if (!answer.nextBool) {
        container.append(
          "<div class=\"row\"><div class='col-sm-11 col-xs-10 form-group'> <label for='Answer'> Answer </label> <input value=\"" +
            answer.answerTitle +
<<<<<<< HEAD
            "\" type='text' class='form-control frm-submit' id='Answer' placeholder='Answer' required/> <div class='invalid-feedback'> Please fill in this section. </div> </div> <div class='col-sm-1 col-xs-2 form-group'> <label for 'check' class='text-right'> Path </label> <input checked type='checkbox' class='form-control frm-check' id='check' /> </div></div>"
=======
            '" type=\'text\' class=\'form-control frm-submit\' id=\'Answer\' placeholder=\'Answer\' required/> <div class=\'invalid-feedback\'> Please fill in this section. </div><button style="margin-bottom: 1rem" class=\'btn btn-danger btn-md frm-btn-rm\'>				   Remove Answer</button></div> <div class=\'col-sm-1 col-xs-2 form-group\'> <label for \'check\' class=\'text-right\'> Path </label> <input checked type=\'checkbox\' class=\'form-control frm-check\' id=\'check\' /> </div></div>'
>>>>>>> 6ADevelopment_Test
        );
      } else {
        // render resources if the question isn't path
        var resources = '';
        resourceAnswers.push(i);
        for (var j = 0; j < answer.resourceLinks.length; j++) {
          resources +=
            "<label class='col-md-11 col-md-offset-1' for='Resources'> Resource Link Name </label>  <div class='col-md-1'></div>			  <div class='col-md-11'>				<input value='" +
            answer.resourceLinks[j].linkName +
            "' class='form-control frm-submit resource' rows=3 id='Resource-Name' placeholder='Resource' required></input>				<div  style='margin-bottom:0.5rem' class='invalid-feedback'>Please fill in this section.</div>			  </div>	<label class='col-md-11 col-md-offset-1' for='Resources'> Resource Link </label>  <div class='col-md-1'></div>			  <div class='col-md-11'>				<input value='" +
            answer.resourceLinks[j].url +
<<<<<<< HEAD
            "' class='form-control frm-submit resource' rows=3 id='Resource-URL' placeholder='Resource' required></input>				<div git class='invalid-feedback'>Please fill in this section.</div><div class=\"div-line\"></div></div>";
=======
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-URL\' placeholder=\'Resource\' required></input>				<div git class=\'invalid-feedback\'>Please fill in this section.</div> <button class=\'btn btn-danger btn-md frm-btn-rm-res\'>				   Remove Resource</button> <div class="div-line"></div></div>';
>>>>>>> 6ADevelopment_Test
        }
        // add extra elements after resources
        container.append(
          " <div class='row'>		  <div class='col-sm-11 col-xs-10 form-group'>			<label for='Answer'> Answer </label>			<input value=\"" +
            answer.answerTitle +
            "\" type='text' class='form-control frm-submit' id='Answer' placeholder='to' required/>			<div class='invalid-feedback'>			  Please fill in this section.			</div>		  </div>		  <div class='col-sm-1 col-xs-2 form-group'>			<label for 'check' class='text-right'> Path </label>			<input type='checkbox' class='form-control frm-check' id='check' />		  </div>		</div>		<div class='row'>		  <div class='col-md-12 form-group'>						<div class='row'>		<label class='col-md-11 col-md-offset-1' for='Resources'> Resource Box Title </label>  <div class='col-md-1'></div>			  <div class='col-md-11'>				<input value='" +
            answer.resourceTitle +
            "' class='form-control frm-submit resource' rows=3 id='Resource-Title' placeholder='Resource' required></input>				<div  style='margin-bottom:0.5rem' class='invalid-feedback'>Please fill in this section.</div>			  </div> <label class='col-md-11 col-md-offset-1' for='Resources'> Resource Box Description </label>  <div class='col-md-1'></div>			  <div class='col-md-11'>				<textarea  class='form-control frm-submit resource' rows=3 id='Resource-Paragraph' placeholder='Resource' required>" +
            answer.resourceParagraph +
            '</textarea>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please fill in this section.</div>	<div class="div-line"></div>		  <b style=" font-weight: bold; margin-bottom: 0.5rem; display: block">Links</b></div>' +
            resources +
<<<<<<< HEAD
            "			  </div>			  <div class='col-md-1'></div>			  <div class='col-md-10 input-group-button'>	<button class='btn btn-danger btn-md frm-btn-rm'>				   Remove Answer</button>				<button class='btn btn-primary btn-md frm-btn'>				  <span  style=\"color: #ffffff !important;\" style='font-size:1.5em;' class='glyphicon glyphicon-plus'></span> Add Resource</button>			  </div>			</div>		  </div>		</div>"
=======
            '			  </div>			  <div class=\'col-md-1\'></div>			  <div class=\'col-md-10 input-group-button\'>				  </div>	<button style="margin-bottom: 1rem !important; margin-top: 1rem !important;"  class=\'btn btn-danger btn-md frm-btn-rm\'>				   Remove Answer</button>				<button style="margin-bottom: 1rem !important; margin-top: 1rem !important;" class=\'btn btn-primary btn-md frm-btn\'>				  <span  style="color: #ffffff !important;" style=\'font-size:1.5em;\' class=\'glyphicon glyphicon-plus\'></span> Add Resource</button>		</div>		  </div>		</div>'
>>>>>>> 6ADevelopment_Test
        );
      }
    }
    // add the add question button
    container.append(
      "<div class='div-line'></div>            <div class='col-md-10 input-group-button'>              <button id='add-question' class='btn btn-primary btn-lg'>                <span style='color: #ffffff !important;' class='glyphicon glyphicon-plus'></span> Add Answer</button>            </div>"
    );

<<<<<<< HEAD
    // check if any of the values are empty, return false if they are and highlight them.
    function checkEmpty() {
      var inputs = $('.frm-submit');
      var validInputs = true;
      $.each(inputs, function(key, input) {
        $input = $(input);
        if ($input.val() === '') {
          var prev = $input.prev();
          var next = $input.next();
          prev.addClass('error');
          next.addClass('error');
          $input.addClass('error-input');
          $input.change(function() {
            prev.removeClass('error');
            next.removeClass('error');
            $(this).removeClass('error-input');
          });
          validInputs = false;
        }
      });
      return validInputs;
    }
    // save changes made by the user to local tree. Not uploaded to database yet
    function save() {
      var answerCount = 0;
      var resourceCount = 0;
      var inputs = $('.frm-submit');

      // big logic statments that bases the render on the type of input.
      $.each(inputs, function(key, input) {
        $input = $(input);
        if (key === 0) {
          tree[index].questionTitle = $input.val();
        } else if (key === 1) {
          tree[index].questionParagraph = $input.val();
        } else if ($input.attr('id') === 'Answer') {
          if ($(inputs.get(key + 1)).attr('id') === 'Answer') {
            tree[index].answers[answerCount].answerTitle = $input.val();
            answerCount++;
          } else {
            tree[index].answers[answerCount].answerTitle = $input.val();
          }
        } else if ($input.attr('id') === 'Resource-Title') {
          tree[index].answers[answerCount].resourceTitle = $input.val();
        } else if ($input.attr('id') === 'Resource-Paragraph') {
          tree[index].answers[answerCount].resourceParagraph = $input.val();
        } else if ($input.attr('id') === 'Resource-Name') {
          tree[index].answers[answerCount].resourceLinks[
            resourceCount
          ].linkName = $input.val();
        } else if ($input.attr('id') === 'Resource-URL') {
          if ($(inputs.get(key + 1)).attr('id') !== 'Resource-Name') {
            tree[index].answers[answerCount].resourceLinks[
              resourceCount
            ].url = $input.val();
            answerCount++;
            resourceCount = 0;
          } else {
            tree[index].answers[answerCount].resourceLinks[
              resourceCount
            ].url = $input.val();
            resourceCount++;
          }
        }
      });
    }
    // the botton handlers for add resource, add a new resource when clicked
=======
>>>>>>> 6ADevelopment_Test
    var buttons = $('.frm-btn');
    $.each(buttons, function(key, button) {
      $button = $(button);
      $button.on('click', function(e) {
        save(tree);
        e.preventDefault();
        tree[index].answers[resourceAnswers[key]].resourceLinks.push({
          linkName: '',
          url: ''
        });

        render(tree);
      });
    });

    // handles the remove buttons, removes a question when clicked
    var buttons = $('.frm-btn-rm');
    $.each(buttons, function(key, button) {
      save(tree);
      $button = $(button);
      $button.on('click', function(e) {
        e.preventDefault();
        tree[index].answers.splice(key, 1);
        render(tree);
        toastr.success(
          'Answer was removed. Clear changes to recover answer data'
        );
      });
    });

    function resourceOwnerCheck() {
      var arr = [];
      for (var i = 0; i < resourceAnswers.length; i++) {
        for (
          var j = 0;
          j < tree[index].answers[resourceAnswers[i]].resourceLinks.length;
          j++
        ) {
          arr.push({
            owner: resourceAnswers[i],
            self: j
          });
        }
      }
      return arr;
    }

    var buttons = $('.frm-btn-rm-res');
    var resourceOwner = resourceOwnerCheck();
    $.each(buttons, function(key, button) {
      save(tree);
      $button = $(button);
      $button.on('click', function(e) {
        if (
          tree[index].answers[resourceOwner[key].owner].resourceLinks.length > 1
        ) {
          e.preventDefault();
          tree[index].answers[resourceOwner[key].owner].resourceLinks.splice(
            resourceOwner[key].self,
            1
          );
          render(tree);
          toastr.success(
            'Resource was removed. Clear changes to recover answer data'
          );
        } else {
          toastr.error('There must be at least one link!');
        }
      });
    });

    // handles any changes to checkboxes and changes the question's resources accoringly
    var checkboxs = $('.frm-check');
    $.each(checkboxs, function(key, check) {
      $check = $(check);
      $check.change(function() {
<<<<<<< HEAD
        save();
        // if checked then make it a path file and remove the resources
=======
        save(tree);
>>>>>>> 6ADevelopment_Test
        if ($(this).is(':checked')) {
          tree[index].answers[key].nextBool = false;
          tree[index].answers[key].resourceLinks = undefined;
          tree[index].answers[key].resourceParagraph = undefined;
          tree[index].answers[key].resourceTitle = undefined;
          // if not, add resources
        } else {
          tree[index].answers[key].nextBool = true;
          tree[index].answers[key].resourceLinks = [
            {
              linkName: '',
              url: ''
            }
          ];
          tree[index].answers[key].resourceParagraph = '';
          tree[index].answers[key].resourceTitle = '';
        }
        // render tree after changes are made
        render(tree);
      });
    });

    // add question button handler
    $('#add-question').on('click', function(e) {
      save(tree);
      e.preventDefault();
      tree[index].answers.push({ answerTitle: '' });

      render(tree);
    });

<<<<<<< HEAD
    // renders side panel by itterating through tree and appending qustions to sidepanel
    var sidepanel = $('#sidepanel');
    sidepanel.empty();
    for (var ind = 0; ind < tree.length; ind++) {
      sidepanel.append(
        "<li class='active text-center frm-question'><a data-toggle='pill' href='#needs-validatoin'>" +
          tree[ind].questionTitle +
          '</a></li>'
      );
    }
    sidepanel.append(
      "<li id='addForm'><button class='btn btn-primary btn-block' id='addFormBtn'>Add Question</button></li>"
    );
    // handles a click on a question on the sidepanel
    var questions = $('.frm-question');
    $(questions.get(index)).addClass('current-question');
    $.each(questions, function(key, question) {
      $(question).on('click', function() {
        save();
        if (checkEmpty()) {
          index = key;
          render(tree);
        } else {
          toastr.error('Please fill in this form before continuing');
        }
      });
    });
    // add a new question to the side panel on click - handler
=======
    sidePanelRender(tree);

>>>>>>> 6ADevelopment_Test
    $('#addForm').on('click', function() {
      save(tree);

      tree.push({
        questionParagraph: '',
        questionTitle: 'New Question',
        answers: [
          {
            answerTitle: ''
          }
        ]
      });
      index = tree.length - 1;
      render(tree);
    });
    // move question up the tree on click - handler
    $('#up-arrow').on('click', function() {
      save(tree);

      if (index !== 0) {
        var temp = tree[index - 1];
        tree[index - 1] = tree[index];
        tree[index] = temp;
        index--;
        render(tree);
      }
    });

    // reverts form to the database on click -handler
    $('#clear-changes').on('click', function() {
      database.ref('tree').once('value', function(snapshot) {
        index = 0;
        render(snapshot.val());
        toastr.success('Changes cleared');
      });
    });
    // deletes a question on click - handler
    $('#delete-question').on('click', function() {
      tree.splice(index, 1);
      if (index >= tree.length) {
        index = tree.length - 1;
      }
      render(tree);
      toastr.success('Question deleted. Clear changes to recover');
    });
    // handles uploading the form to the database
    $('#upload-form').on('click', function() {
      save(tree);
      if (checkEmpty() && checkPathExists(tree, index)) {
        database.ref('tree').set(tree);
        toastr.success('Changes uploaded successfully');
      }
    });
    // moves a question down the tree on click -handler
    $('#down-arrow').on('click', function() {
      save(tree);

      if (index !== tree.length - 1) {
        var temp = tree[index + 1];
        tree[index + 1] = tree[index];
        tree[index] = temp;
        index++;
        render(tree);
      }
    });
    if (test) {
      test();
    }
  }
  // gets tree from the database and renders it out when
  database.ref('tree').on('value', function(snapshot) {
    render(snapshot.val());
  });
});
