$(document).ready(function() {
  var database = firebase.database();
  var user;
  var index = 0;

  var container = $('#container');
  var title = $('#Title');
  var description = $('#Description');

  function render(tree) {
    var resourceAnswers = [];
    var question = tree[index];
    title.val(question.questionTitle);
    description.val(question.questionParagraph);
    container.html('');
    for (var i = 0; i < question.answers.length; i++) {
      var answer = question.answers[i];
      if (!answer.nextBool) {
        container.append(
          '<div class="row"><div class=\'col-sm-11 col-xs-10 form-group\'> <label for=\'Answer\'> Answer </label> <input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control frm-submit\' id=\'Answer\' placeholder=\'Answer\' required/> <div class=\'invalid-feedback\'> Please provide a valid Answer. </div> </div> <div class=\'col-sm-1 col-xs-2 form-group\'> <label for \'check\' class=\'text-right\'> Path </label> <input checked type=\'checkbox\' class=\'form-control frm-check\' id=\'check\' /> </div></div>'
        );
      } else {
        var resources = '';
        resourceAnswers.push(i);
        for (var j = 0; j < answer.resourceLinks.length; j++) {
          resources +=
            '<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Link Name </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceLinks[j].linkName +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Name\' placeholder=\'Resource\' required></input>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please provide a valid Resource.</div>			  </div>	<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Link </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceLinks[j].url +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-URL\' placeholder=\'Resource\' required></input>				<div git class=\'invalid-feedback\'>Please provide a valid Resource.</div><div class="div-line"></div></div>';
        }
        container.append(
          ' <div class=\'row\'>		  <div class=\'col-sm-11 col-xs-10 form-group\'>			<label for=\'Answer\'> Answer </label>			<input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control frm-submit\' id=\'Answer\' placeholder=\'to\' required/>			<div class=\'invalid-feedback\'>			  Please provide a valid Answer.			</div>		  </div>		  <div class=\'col-sm-1 col-xs-2 form-group\'>			<label for \'check\' class=\'text-right\'> Path </label>			<input type=\'checkbox\' class=\'form-control frm-check\' id=\'check\' />		  </div>		</div>		<div class=\'row\'>		  <div class=\'col-md-12 form-group\'>						<div class=\'row\'>		<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Box Title </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceTitle +
            '\' class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Title\' placeholder=\'Resource\' required></input>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please provide a valid Resource.</div>			  </div> <label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Box Description </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<textarea  class=\'form-control frm-submit resource\' rows=3 id=\'Resource-Paragraph\' placeholder=\'Resource\' required>' +
            answer.resourceParagraph +
            '</textarea>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please provide a valid Resource.</div>	<div class="div-line"></div>		  <b style=" font-weight: bold; margin-bottom: 0.5rem; display: block">Links</b></div>' +
            resources +
            '			  </div>			  <div class=\'col-md-1\'></div>			  <div class=\'col-md-10 input-group-button\'>				<button class=\'btn btn-primary btn-lg frm-btn\' type=\'submit\'>				  <span  style="color: #ffffff !important;" style=\'font-size:1.5em;\' class=\'glyphicon glyphicon-plus\'></span> Add Resource</button>			  </div>			</div>		  </div>		</div>'
        );
      }
    }
    $('#frm-save').on('click', function(e) {
      var answerCount = 0;
      var resourceCount = 0;
      e.preventDefault();
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
      console.log(tree);
    });
    var buttons = $('.frm-btn');
    $.each(buttons, function(key, button) {
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
  }

  database.ref('tree').on('value', function(snapshot) {
    render(snapshot.val());
  });
});
