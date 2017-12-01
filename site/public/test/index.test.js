QUnit.test("Test Firebase Initial Data Injection", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/index/index").once("value", function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.firebaseInit(snapshot);
    var jmbTitle = $("#jmbTitle");
    var jmbDescription = $("#jmbDescription");
    var mainPar1 = $("#mainPar1");
    var mainPar2 = $("#mainPar2");
    var mainPar3 = $("#mainPar3");
    var mainTitle1 = $("#mainTitle1");
    var mainTitle2 = $("#mainTitle2");
    var mainTitle3 = $("#mainTitle3");
    assert.equal(
      jmbTitle.html(),
      data.jmbTitle,
      "Jumbotron title injected correctly"
    );
    assert.equal(
      jmbDescription.html(),
      data.jmbDescription,
      "Jumbotron description injected correctly"
    );
    assert.equal(
      mainTitle1.html(),
      data.mainTitle1,
      "Column title 1 injected correctly"
    );
    assert.equal(
      mainTitle2.html(),
      data.mainTitle2,
      "Column title 2 injected correctly"
    );
    assert.equal(
      mainTitle3.html(),
      data.mainTitle3,
      "Column title 3 injected correctly"
    );
    assert.equal(
      mainPar1.html(),
      data.mainPar1,
      "Paragragh column 1 injected correctly"
    );
    assert.equal(
      mainPar2.html(),
      data.mainPar2,
      "Paragragh column 2 injected correctly"
    );
    assert.equal(
      mainPar3.html(),
      data.mainPar3,
      "Paragragh column 3 injected correctly"
    );

    done();
  });
});

QUnit.test("Test Admin Mode Injected Correctly", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/index/index").once("value", function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.admin(snapshot);
    var jmbTitle = $("#jmbTitle");
    var jmbDescription = $("#jmbDescription");
    var mainPar1 = $("#mainPar1");
    var mainPar2 = $("#mainPar2");
    var mainPar3 = $("#mainPar3");
    var mainTitle1 = $("#mainTitle1");
    var mainTitle2 = $("#mainTitle2");
    var mainTitle3 = $("#mainTitle3");
    var submit_changes = $("#submit_changes");
    assert.equal(
      jmbTitle.html(),
      data.jmbTitle,
      "Admin jumbotron title injected correctly"
    );
    assert.equal(
      jmbDescription.html(),
      data.jmbDescription,
      "Admin jumbotron description injected correctly"
    );
    assert.equal(
      mainTitle1.html(),
      data.mainTitle1,
      "Admin column title 1 injected correctly"
    );
    assert.equal(
      mainTitle2.html(),
      data.mainTitle2,
      "Admin column title 2 injected correctly"
    );
    assert.equal(
      mainTitle3.html(),
      data.mainTitle3,
      "Admin column title 3 injected correctly"
    );
    assert.equal(
      mainPar1.html(),
      data.mainPar1,
      "Admin paragragh column 1 injected correctly"
    );
    assert.equal(
      mainPar2.html(),
      data.mainPar2,
      "Admin paragragh column 2 injected correctly"
    );
    assert.equal(
      mainPar3.html(),
      data.mainPar3,
      "Admin paragragh column 3 injected correctly"
    );
    assert.notEqual(
      submit_changes.html(),
      undefined,
      "Admin mode save-button injected correctly"
    );

    done();
  });
});

QUnit.test("Test Admin Mode Is Correctly Editable", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/index/index").once("value", function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.admin(snapshot);
    var jmbTitle = $("#jmbTitle");
    var jmbDescription = $("#jmbDescription");
    var mainPar1 = $("#mainPar1");
    var mainPar2 = $("#mainPar2");
    var mainPar3 = $("#mainPar3");
    var mainTitle1 = $("#mainTitle1");
    var mainTitle2 = $("#mainTitle2");
    var mainTitle3 = $("#mainTitle3");
    assert.equal(
      jmbTitle.attr("contentEditable"),
      "true",
      "Jumbotron title is correctly editable"
    );
    assert.equal(
      jmbDescription.attr("contentEditable"),
      "true",
      "Jumbotron description is correctly editable"
    );
    assert.equal(
      mainTitle1.attr("contentEditable"),
      "true",
      "Column title 1 is correctly editable"
    );
    assert.equal(
      mainTitle2.attr("contentEditable"),
      "true",
      "Column title 2 is correctly editable"
    );
    assert.equal(
      mainTitle3.attr("contentEditable"),
      "true",
      "Column title 3 is correctly editable"
    );
    assert.equal(
      mainPar1.attr("contentEditable"),
      "true",
      "Paragragh column 1 is correctly editable"
    );
    assert.equal(
      mainPar2.attr("contentEditable"),
      "true",
      "Paragragh column 2 is correctly editable"
    );
    assert.equal(
      mainPar3.attr("contentEditable"),
      "true",
      "Paragragh column 3 is correctly editable"
    );

    done();
  });
});

QUnit.test("Test Regular Mode Re-injected Correctly", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/index/index").once("value", function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.regular(snapshot);
    var jmbTitle = $("#jmbTitle");
    var jmbDescription = $("#jmbDescription");
    var mainPar1 = $("#mainPar1");
    var mainPar2 = $("#mainPar2");
    var mainPar3 = $("#mainPar3");
    var mainTitle1 = $("#mainTitle1");
    var mainTitle2 = $("#mainTitle2");
    var mainTitle3 = $("#mainTitle3");
    var submit_changes = $("#submit_changes");
    assert.equal(
      jmbTitle.html(),
      data.jmbTitle,
      "Regular jumbotron title injected correctly"
    );
    assert.equal(
      jmbDescription.html(),
      data.jmbDescription,
      "Regular jumbotron description injected correctly"
    );
    assert.equal(
      mainTitle1.html(),
      data.mainTitle1,
      "Regular column title 1 injected correctly"
    );
    assert.equal(
      mainTitle2.html(),
      data.mainTitle2,
      "Regular column title 2 injected correctly"
    );
    assert.equal(
      mainTitle3.html(),
      data.mainTitle3,
      "Regular column title 3 injected correctly"
    );
    assert.equal(
      mainPar1.html(),
      data.mainPar1,
      "Regular paragragh column 1 injected correctly"
    );
    assert.equal(
      mainPar2.html(),
      data.mainPar2,
      "Regular paragragh column 2 injected correctly"
    );
    assert.equal(
      mainPar3.html(),
      data.mainPar3,
      "Regular paragragh column 3 injected correctly"
    );
    assert.equal(
      submit_changes.html(),
      undefined,
      "Admin mode save-button not injected"
    );

    done();
  });
});

QUnit.test("Test User Restrictions", function(assert){
    var adminTab = $("#admin-head");
    var u = window.trapsourceTest.giveMeUser();
        if (u) {
            var name;
            if (u.displayName) {
                name = u.displayName;
            } else {
                name = u.email.substr(0, u.email.indexOf("@"));
            }
            $("#login-head")
                .text(name)
                .css("font-weight", "bold");
            if (u.uid === "DaQoaYhJ7KW8ep4m4P0YLZUfcTk1") {
                assert.equal(adminTab.html(), "Admin", "Admin User: Admin tab correctly displayed");
            } else {
                assert.equal(adminTab.html(), undefined, "Regular User: Admin tab not displayed")
            }
        } else {
            assert.equal(adminTab.html(), undefined, "No user profile detected");
        }
});
