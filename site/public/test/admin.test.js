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
        "Question " + key + " correctly"
      );
    });
    done();
  });
});
