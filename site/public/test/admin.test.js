QUnit.test("Test That Sidepanel Correctly Renders", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/tree").once("value", function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.sidePanelRender(snapshot.val());

    var questions = $(".frm-question");
    console.log(questions);
    $.each(questions, function(key, question) {
      assert.equal(
        $(question)
          .find("a")
          .html(),
        data[key].questionTitle,
        "Question " + (key + 1) + " correctly renders"
      );
      assert.notEqual(
        $(question)
          .find("a")
          .html(),
        "",
        "Question " + (key + 1) + " title isn't empty"
      );
    });
    done();
  });
});

QUnit.test("Test That the Form Rendered Correctly", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/tree").once("value", function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.render(snapshot.val());

    var inputs = $(".frm-submit");
    var answerCount = 0;
    var pathCount = 0;
    var resourceCount = 0;
    var index = 0;
    console.log(inputs);
    $.each(inputs, function(key, input) {
      var $input = $(input);
      if (key === 0) {
        assert.equal(
          $input.val(),
          data[index].questionTitle,
          "Title correctly renders"
        );
      } else if (key === 1) {
        assert.equal(
          $input.val(),
          data[index].questionParagraph,
          "Description correctly renders"
        );
      } else if ($input.attr("id") === "Answer") {
        if ($(inputs.get(key + 1)).attr("id") === "Answer") {
          assert.equal(
            $input.val(),
            data[index].answers[answerCount].answerTitle,
            "Non-path answer " + (answerCount + 1) + " rendered correctly"
          );
          answerCount++;
        } else {
          assert.equal(
            $input.val(),
            data[index].answers[answerCount].answerTitle,
            "Path answer " + (pathCount + 1) + " rendered correctly"
          );
          pathCount++;
        }
      } else if ($input.attr("id") === "Resource-Title") {
        assert.equal(
          $input.val(),
          data[index].answers[answerCount].resourceTitle,
          "correctly"
        );
      } else if ($input.attr("id") === "Resource-Paragraph") {
        assert.equal(
          $input.val(),
          data[index].answers[answerCount].resourceParagraph,
          "correctly"
        );
      } else if ($input.attr("id") === "Resource-Name") {
        assert.equal(
          $input.val(),
          data[index].answers[answerCount].resourceLinks[resourceCount]
            .linkName,
          "correctly"
        );
      } else if ($input.attr("id") === "Resource-URL") {
        if ($(inputs.get(key + 1)).attr("id") !== "Resource-Name") {
          assert.equal(
            $input.val(),
            data[index].answers[answerCount].resourceLinks[resourceCount].url,
            "correctly"
          );
          answerCount++;
          resourceCount = 0;
        } else {
          assert.equal(
            $input.val(),
            data[index].answers[answerCount].resourceLinks[resourceCount].url,
            "correctly"
          );
          resourceCount++;
        }
      }
    });
    done();
  });
});
