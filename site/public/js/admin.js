$(document).ready(function() {
  var database = firebase.database();

  var user;
  var index = 0;

  var container = $('#container');
  var title = $('#Title');
  var description = $('#Description');

  function render(tree) {
    $('.rm-li').each(function() {
      $(this).unbind();
    });
    console.log('render');
    var resourceAnswers = [];
    var question = tree[index];
    container.html('');
    container.append(
      '<div class=\'row\'><div class=\'col-md-12 form-group\'><label for=\'Title\'> Title </label><input value="' +
        question.questionTitle +
        '"type=\'text\' class=\'form-control frm-submit\' id=\'Title\' placeholder=\'Title\' required/><div class=\'invalid-feedback\'>Please fill in this section.</div>      </div>    </div>    <div class=\'row\'>      <div class=\'col-md-12 form-group\'>        <label for=\'Description\'> Description </label>        <textarea class=\'form-control frm-submit\' rows=3 id=\'Description\' placeholder=\'Description\' required>' +
        question.questionParagraph +
        '</textarea>        <div class=\'invalid-feedback\'>          Please fill in this section.        </div>      </div>    </div>'
    );
    for (var i = 0; i < question.answers.length; i++) {
      var answer = question.answers[i];
      if (!answer.nextBool) {
        container.append(
          '<div class="row"><div class=\'col-sm-11 col-xs-10 form-group\'> <label for=\'Answer\'> Answer </label> <input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control frm-submit\' id=\'Answer\' placeholder=\'Answer\' required/> <div class=\'invalid-feedback\'> Please fill in this section. </div> </div> <div class=\'col-sm-1 col-xs-2 form-group\'> <label for \'check\' class=\'text-right\'> Path </label> <input checked type=\'checkbox\' class=\'form-control frm-check\' id=\'check\' /> </div></div>'
        );
      } else {
        var resources = '';
        resourceAnswers.push(i);
        for (var j = 0; j < answer.resourceLinks.length; j++) {
          resources +=
            '<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Link Name </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceLinks[j].linkName +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Name\' placeholder=\'Resource\' required></input>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please fill in this section.</div>			  </div>	<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Link </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceLinks[j].url +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-URL\' placeholder=\'Resource\' required></input>				<div git class=\'invalid-feedback\'>Please fill in this section.</div><div class="div-line"></div></div>';
        }
        container.append(
          ' <div class=\'row\'>		  <div class=\'col-sm-11 col-xs-10 form-group\'>			<label for=\'Answer\'> Answer </label>			<input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control frm-submit\' id=\'Answer\' placeholder=\'to\' required/>			<div class=\'invalid-feedback\'>			  Please fill in this section.			</div>		  </div>		  <div class=\'col-sm-1 col-xs-2 form-group\'>			<label for \'check\' class=\'text-right\'> Path </label>			<input type=\'checkbox\' class=\'form-control frm-check\' id=\'check\' />		  </div>		</div>		<div class=\'row\'>		  <div class=\'col-md-12 form-group\'>						<div class=\'row\'>		<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Box Title </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceTitle +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Title\' placeholder=\'Resource\' required></input>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please fill in this section.</div>			  </div> <label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Box Description </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<textarea  class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Paragraph\' placeholder=\'Resource\' required>' +
            answer.resourceParagraph +
            '</textarea>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please fill in this section.</div>	<div class="div-line"></div>		  <b style=" font-weight: bold; margin-bottom: 0.5rem; display: block">Links</b></div>' +
            resources +
            '			  </div>			  <div class=\'col-md-1\'></div>			  <div class=\'col-md-10 input-group-button\'>				<button class=\'btn btn-primary btn-md frm-btn\'>				  <span  style="color: #ffffff !important;" style=\'font-size:1.5em;\' class=\'glyphicon glyphicon-plus\'></span> Add Resource</button>			  </div>			</div>		  </div>		</div>'
        );
      }
    }
    container.append(
      '<div class=\'div-line\'></div>            <div class=\'col-md-10 input-group-button\'>              <button id=\'add-question\' class=\'btn btn-primary btn-lg\'>                <span style=\'color: #ffffff !important;\' class=\'glyphicon glyphicon-plus\'></span> Add Answer</button>            </div>'
    );

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

    function save() {
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

    var buttons = $('.frm-btn');
    $.each(buttons, function(key, button) {
      save();
      $button = $(button);
      $button.on('click', function(e) {
        e.preventDefault();
        tree[index].answers[resourceAnswers[key]].resourceLinks.push({
          linkName: '',
          url: ''
        });

        render(tree);
      });
    });
    var checkboxs = $('.frm-check');
    $.each(checkboxs, function(key, check) {
      $check = $(check);
      $check.change(function() {
        save();
        if ($(this).is(':checked')) {
          tree[index].answers[key].nextBool = undefined;
          tree[index].answers[key].resourceLinks = undefined;
          tree[index].answers[key].resourceParagraph = undefined;
          tree[index].answers[key].resourceTitle = undefined;
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

        render(tree);
      });
    });
    $('#add-question').on('click', function(e) {
      save();
      e.preventDefault();
      tree[index].answers.push({ answerTitle: '' });

      render(tree);
    });
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
      '<li id=\'addForm\'><button class=\'btn btn-primary btn-block\' id=\'addFormBtn\'>Add Question</button></li>'
    );
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

    $('#addForm').on('click', function() {
      save();

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

    $('#up-arrow').on('click', function() {
      save();

      if (index !== 0) {
        var temp = tree[index - 1];
        tree[index - 1] = tree[index];
        tree[index] = temp;
        index--;
        render(tree);
      }
    });

    $('#clear-changes').on('click', function() {
      database.ref('tree').once('value', function(snapshot) {
        render(snapshot.val());
        toastr.success('Changes cleared');
      });
    });

    $('#delete-question').on('click', function() {
      tree.splice(index, 1);
      if (index >= tree.length) {
        index = tree.length - 1;
      }
      render(tree);
      toastr.success('Question deleted. Clear changes to recover');
    });

    $('#upload-form').on('click', function() {
      save();
      if (checkEmpty()) {
        database.ref('tree').set(tree);
        toastr.success('Changes uploaded successfully');
      } else {
        toastr.error('Please fill in this form before continuing');
      }
    });

    $('#down-arrow').on('click', function() {
      save();

      if (index !== tree.length - 1) {
        var temp = tree[index + 1];
        tree[index + 1] = tree[index];
        tree[index] = temp;
        index++;
        render(tree);
      }
    });
  }
  database.ref('tree').on('value', function(snapshot) {
    render(snapshot.val());
  });
});
