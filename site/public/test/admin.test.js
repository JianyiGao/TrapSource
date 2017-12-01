$(document).ready(function() {
  QUnit.test("Test That Sidepanel Correctly Renders", function(assert) {
    var done = assert.async();
    var database = firebase.database();
    var data = {};
    database.ref("tree").once("value", function(snapshot) {
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

  var database = firebase.database();
  database.ref("tree").once("value", function(snapshot) {
    var data = snapshot.val();
    testRenderCorrecty(data);
  });

  function testRenderCorrecty(data) {
    var i = 0;
    window.trapsourceTest.render(data, i, test);
    function test() {
      QUnit.test(
        "Test That the Form Num " + (i + 1) + " Rendered Correctly",
        function(assert) {
          var done = assert.async();
          var inputs = $(".frm-submit");
          var answerCount = 0;
          var pathCount = 0;
          var resourceCount = 0;
          var index = i;
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
                  "Path answer " + (answerCount + 1) + " rendered correctly"
                );
                answerCount++;
              } else {
                assert.equal(
                  $input.val(),
                  data[index].answers[answerCount].answerTitle,
                  "Non-path answer " + (pathCount + 1) + " rendered correctly"
                );
                pathCount++;
              }
            } else if ($input.attr("id") === "Resource-Title") {
              assert.equal(
                $input.val(),
                data[index].answers[answerCount].resourceTitle,
                "Resoruce " + (resourceCount + 1) + " title correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-Paragraph") {
              assert.equal(
                $input.val(),
                data[index].answers[answerCount].resourceParagraph,
                "Resoruce " +
                  (resourceCount + 1) +
                  " description correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-Name") {
              assert.equal(
                $input.val(),
                data[index].answers[answerCount].resourceLinks[resourceCount]
                  .linkName,
                "Resoruce " +
                  (resourceCount + 1) +
                  " link name correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-URL") {
              if ($(inputs.get(key + 1)).attr("id") !== "Resource-Name") {
                assert.equal(
                  $input.val(),
                  data[index].answers[answerCount].resourceLinks[resourceCount]
                    .url,
                  "Resoruce " +
                    (resourceCount + 1) +
                    " link URL correctly rendered"
                );
                answerCount++;
                resourceCount = 0;
              } else {
                assert.equal(
                  $input.val(),
                  data[index].answers[answerCount].resourceLinks[resourceCount]
                    .url,
                  "Resoruce " +
                    (resourceCount + 1) +
                    " link URL correctly rendered"
                );
                resourceCount++;
              }
            }
          });
          done();
          if (i + 1 < data.length) {
            window.trapsourceTest.render(data, ++i, test);
          } else {
            var database = firebase.database();
            database.ref("tree").once("value", function(snapshot) {
              var data = snapshot.val();
              testNotEmpty(data);
            });
          }
        }
      );
    }
  }

  function testNotEmpty(data) {
    var i = 0;
    window.trapsourceTest.render(data, i, test);
    function test() {
      QUnit.test(
        "Test That the Form Num " + (i + 1) + " has no empty values",
        function(assert) {
          var done = assert.async();
          var inputs = $(".frm-submit");
          var answerCount = 0;
          var pathCount = 0;
          var resourceCount = 0;
          var index = i;
          console.log(inputs);
          $.each(inputs, function(key, input) {
            var $input = $(input);
            if (key === 0) {
              assert.notEqual($input.val(), "", "Title correctly renders");
            } else if (key === 1) {
              assert.notEqual(
                $input.val(),
                "",
                "Description correctly renders"
              );
            } else if ($input.attr("id") === "Answer") {
              if ($(inputs.get(key + 1)).attr("id") === "Answer") {
                assert.notEqual(
                  $input.val(),
                  "",
                  "Path answer " + (answerCount + 1) + " rendered correctly"
                );
                answerCount++;
              } else {
                assert.notEqual(
                  $input.val(),
                  "",
                  "Non-path answer " + (pathCount + 1) + " rendered correctly"
                );
                pathCount++;
              }
            } else if ($input.attr("id") === "Resource-Title") {
              assert.notEqual(
                $input.val(),
                "",
                "Resoruce " + (resourceCount + 1) + " title correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-Paragraph") {
              assert.notEqual(
                $input.val(),
                "",
                "Resoruce " +
                  (resourceCount + 1) +
                  " description correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-Name") {
              assert.notEqual(
                $input.val(),
                "",
                "Resoruce " +
                  (resourceCount + 1) +
                  " link name correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-URL") {
              if ($(inputs.get(key + 1)).attr("id") !== "Resource-Name") {
                assert.notEqual(
                  $input.val(),
                  "",
                  "Resoruce " +
                    (resourceCount + 1) +
                    " link URL correctly rendered"
                );
                answerCount++;
                resourceCount = 0;
              } else {
                assert.notEqual(
                  $input.val(),
                  "",
                  "Resoruce " +
                    (resourceCount + 1) +
                    " link URL correctly rendered"
                );
                resourceCount++;
              }
            }
          });
          done();
          if (i + 1 < data.length) {
            window.trapsourceTest.render(data, ++i, test);
          }
        }
      );
    }
  }
});
