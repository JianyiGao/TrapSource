/*
******This tests the Admin page using QUnit tests******
*/
$(document).ready(function () {
  setTimeout(function () {
    console.log($("#admin-head").attr("href", "admin.test.html"));
  }, 100);
});

//Test side panel renders
$(document).ready(function () {
  QUnit.test("Test That Sidepanel Correctly Renders", function (assert) {
    var done = assert.async();
    var database = firebase.database();
    var data = {};
    database.ref("tree").once("value", function (snapshot) {
      data = snapshot.val();
      window.trapsourceTest.sidePanelRender(snapshot.val());

      var questions = $(".frm-question");
      console.log(questions);
      $.each(questions, function (key, question) {
        //test if question titles render correctly
        assert.equal(
          $(question)
            .find("a")
            .html(),
          data[key].questionTitle,
          "Question " + (key + 1) + " correctly renders"
        );
        //test if for empty question titles
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

  //import tree from database
  var database = firebase.database();
  database.ref("tree").once("value", function (snapshot) {
    var data = snapshot.val();
    testRenderCorrecty(data);
  });

  //test if questions correctly render into forms
  function testRenderCorrecty(data) {
    var i = 0;
    window.trapsourceTest.render(data, i, test);
    function test() {
      QUnit.test(
        "Test That the Form Num " + (i + 1) + " Rendered Correctly",
        function (assert) {
          var done = assert.async();
          var inputs = $(".frm-submit");
          var answerCount = 0;
          var pathCount = 0;
          var resourceCount = 0;
          var index = i;
          console.log(inputs);
          $.each(inputs, function (key, input) {
            var $input = $(input);
            if (key === 0) {
              //test of first question correctly renders in form
              assert.equal(
                $input.val(),
                data[index].questionTitle,
                "Title correctly renders"
              );
            } else if (key === 1) {
              //test if second question correctly renders in form
              assert.equal(
                $input.val(),
                data[index].questionParagraph,
                "Description correctly renders"
              );
            } else if ($input.attr("id") === "Answer") {
              //test if the rest of the questions correctly rener in form
              if ($(inputs.get(key + 1)).attr("id") === "Answer") {
                assert.equal(
                  $input.val(),
                  data[index].answers[answerCount].answerTitle,
                  "Path answer " + (answerCount + 1) + " rendered correctly"
                );
                answerCount++;
              } else {
                //test if nextBool works with path option
                assert.equal(
                  $input.val(),
                  data[index].answers[answerCount].answerTitle,
                  "Non-path answer " + (pathCount + 1) + " rendered correctly"
                );
                pathCount++;
              }
            } else if ($input.attr("id") === "Resource-Title") {
              //test if number of resources for each question correctly render in form
              assert.equal(
                $input.val(),
                data[index].answers[answerCount].resourceTitle,
                "Resource " + (resourceCount + 1) + " title correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-Paragraph") {
              //test if resources for each questions correctly render in form
              assert.equal(
                $input.val(),
                data[index].answers[answerCount].resourceParagraph,
                "Resource " +
                (resourceCount + 1) +
                " description correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-Name") {
              //test if number of links for each resources correctly render in form
              assert.equal(
                $input.val(),
                data[index].answers[answerCount].resourceLinks[resourceCount]
                  .linkName,
                "Resource " +
                (resourceCount + 1) +
                " link name correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-URL") {
              //test if links for each resources correctly render in form
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
            database.ref("tree").once("value", function (snapshot) {
              var data = snapshot.val();
              testNotEmpty(data);
            });
          }
        }
      );
    }
  }

  //Test for empty fields
  function testNotEmpty(data) {
    var i = 0;
    window.trapsourceTest.render(data, i, test);
    function test() {
      QUnit.test(
        "Test That the Form Num " + (i + 1) + " has no empty values",
        function (assert) {
          var done = assert.async();
          var inputs = $(".frm-submit");
          var answerCount = 0;
          var pathCount = 0;
          var resourceCount = 0;
          var index = i;
          console.log(inputs);
          $.each(inputs, function (key, input) {
            var $input = $(input);
            if (key === 0) {
              //test if title is empty
              assert.notEqual($input.val(), "", "Title correctly renders");
            } else if (key === 1) {
              assert.notEqual(
                $input.val(),
                "",
                "Description correctly renders"
              );
            } else if ($input.attr("id") === "Answer") {
              //test if path answer is empty
              if ($(inputs.get(key + 1)).attr("id") === "Answer") {
                assert.notEqual(
                  $input.val(),
                  "",
                  "Path answer " + (answerCount + 1) + " rendered correctly"
                );
                answerCount++;
              } else {
                //test if answers with no path is empty
                assert.notEqual(
                  $input.val(),
                  "",
                  "Non-path answer " + (pathCount + 1) + " rendered correctly"
                );
                pathCount++;
              }
            } else if ($input.attr("id") === "Resource-Title") {
              //test if source titles are empty
              assert.notEqual(
                $input.val(),
                "",
                "Resource " + (resourceCount + 1) + " title correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-Paragraph") {
              //test if resource paragraphs are empty
              assert.notEqual(
                $input.val(),
                "",
                "Resource " +
                (resourceCount + 1) +
                " description correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-Name") {
              //test if links are empty
              assert.notEqual(
                $input.val(),
                "",
                "Resoruce " +
                (resourceCount + 1) +
                " link name correctly rendered"
              );
            } else if ($input.attr("id") === "Resource-URL") {
              if ($(inputs.get(key + 1)).attr("id") !== "Resource-Name") {
                //test if urls are empty
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
