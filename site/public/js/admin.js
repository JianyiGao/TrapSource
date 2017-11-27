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
      if (answer.nextBool) {
        container.append(
          '<div class="row"><div class=\'col-sm-11 col-xs-10 form-group\'> <label for=\'Answer\'> Answer </label> <input value="' +
            answer.answerTitle +
            '" type=\'text\' class=\'form-control\' id=\'Answer\' placeholder=\'Answer\' required/> <div class=\'invalid-feedback\'> Please provide a valid Answer. </div> </div> <div class=\'col-sm-1 col-xs-2 form-group\'> <label for \'check\' class=\'text-right\'> Path </label> <input type=\'checkbox\' class=\'form-control\' id=\'check\' /> </div></div>'
        );
      } else {
        container.append(
          ' <div class=\'row\'>		  <div class=\'col-sm-11 col-xs-10 form-group\'>			<label for=\'Answer\'> Answer </label>			<input type=\'text\' class=\'form-control\' id=\'Answer\' placeholder=\'Answer\' required/>			<div class=\'invalid-feedback\'>			  Please provide a valid Answer.			</div>		  </div>		  <div class=\'col-sm-1 col-xs-2 form-group\'>			<label for \'check\' class=\'text-right\'> Path </label>			<input type=\'checkbox\' class=\'form-control\' id=\'check\' />		  </div>		</div>		<div class=\'row\'>		  <div class=\'col-md-12 form-group\'>			<label for=\'Resources\'> Resource </label>			<div class=\'row\'>			  <div class=\'col-md-1\'></div>			  <div class=\'col-md-11\'>				<textarea class=\'form-control\' rows=3 id=\'Resources\' placeholder=\'Resource\' required></textarea>				<div class=\'invalid-feedback\'>Please provide a valid Resource.</div>			  </div>			  <div class=\'col-md-1\'></div>			  <div class=\'col-md-10 input-group-button\'>				<button class=\'btn btn-primary btn-lg\' type=\'submit\'>				  <span style=\'font-size:1.5em;\' class=\'glyphicon glyphicon-plus\'></span> Add Resource</button>			  </div>			</div>		  </div>		</div>'
        );
      }
    }
  }

  database.ref('tree').on('value', render);
});
