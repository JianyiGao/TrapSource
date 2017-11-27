$(document).ready(function() {
  var database = firebase.database();
  var user;
  var snapshot;
  var index = 0;

  var container = $('#container');
  var title = $('#Title');
  var description = $('#Description');

  function render(snapshot) {
    var tree = snapshot.val();
    var question = tree[index];
    title.val(question.questionTitle);
    description.val(question.questionParagraph);
    container.html('');
    for (var i = 0; i < question.answers.length; i++) {
      var answer = question.answers[i];
      console.log(answer.answerTitle);
      if (!answer.nextBool) {
        container.append(
          '<div class="row"><div class=\'col-sm-11 col-xs-10 form-group\'> <label for=\'Answer\'> Answer </label> <input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control\' id=\'Answer\' placeholder=\'Answer\' required/> <div class=\'invalid-feedback\'> Please provide a valid Answer. </div> </div> <div class=\'col-sm-1 col-xs-2 form-group\'> <label for \'check\' class=\'text-right\'> Path </label> <input type=\'checkbox\' class=\'form-control\' id=\'check\' /> </div></div>'
        );
      } else {
        var resources = '';
        for (var j = 0; j < answer.resourceLinks.length; j++) {
          resources +=
            '<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource Title </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'' +
            answer.resourceLinks[j].linkName +
            '\' class=\'form-control\' rows=3 id=\'Resources\' placeholder=\'Resource\' required></input>				<div  style=\'margin-bottom:0.5rem\' class=\'invalid-feedback\'>Please provide a valid Resource.</div>			  </div>	<label class=\'col-md-11 col-md-offset-1\' for=\'Resources\'> Resource URL </label>  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<input value=\'\' +				answer.url +				\'\' class=\'form-control\' rows=3 id=\'Resources\' placeholder=\'Resource\' required></input>				<div style=\'margin-bottom:1rem\' class=\'invalid-feedback\'>Please provide a valid Resource.</div>';
        }
        container.append(
          ' <div class=\'row\'>		  <div class=\'col-sm-11 col-xs-10 form-group\'>			<label for=\'Answer\'> Answer </label>			<input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control\' id=\'Answer\' placeholder=\'to\' required/>			<div class=\'invalid-feedback\'>			  Please provide a valid Answer.			</div>		  </div>		  <div class=\'col-sm-1 col-xs-2 form-group\'>			<label for \'check\' class=\'text-right\'> Path </label>			<input checked type=\'checkbox\' class=\'form-control\' id=\'check\' />		  </div>		</div>		<div class=\'row\'>		  <div class=\'col-md-12 form-group\'>						<div class=\'row\'>			' +
            resources +
            '			  </div>			  <div class=\'col-md-1\'></div>			  <div class=\'col-md-10 input-group-button\'>				<button class=\'btn btn-primary btn-lg\' type=\'submit\'>				  <span style=\'font-size:1.5em;\' class=\'glyphicon glyphicon-plus\'></span> Add Resource</button>			  </div>			</div>		  </div>		</div>'
        );
      }
    }
  }

  database.ref('tree').on('value', render);
});
