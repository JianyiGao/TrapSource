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
    var abtTitle = $("#abtTitle");
    var abtDescription = $("#abtDescription");
    var abtPar = $("#abtPar");
    var submit_changes = $("#submit_changes");
    assert.equal(
      abtTitle.html(),
      data.abtTitle,
      "Admin title injected correctly"
    );
    assert.equal(
      abtDescription.html(),
      data.abtDescription,
      "Admin description injected correctly"
    );
    assert.equal(
      abtTitle.html(),
      data.abtTitle,
      "Admin title injected correctly"
    );
    assert.notEqual(
      submit_changes.html(),
      undefined,
      "Admin save changes button exists"
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
    var abtTitle = $("#abtTitle");
    var abtDescription = $("#abtDescription");
    var abtPar = $("#abtPar");
    var submit_changes = $("#submit_changes");
    assert.equal(
      abtTitle.html(),
      data.abtTitle,
      "Regular title injected correctly"
    );
    assert.equal(
      abtDescription.html(),
      data.abtDescription,
      "Regular description injected correctly"
    );
    assert.equal(
      abtTitle.html(),
      data.abtTitle,
      "Regular title injected correctly"
    );
    assert.equal(
      submit_changes.html(),
      undefined,
      "Admin save changes button doesn't exists"
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
    var abtTitle = $("#abtTitle");
    var abtDescription = $("#abtDescription");
    var abtPar = $("#abtPar");
    assert.equal(
      abtTitle.attr("contentEditable"),
      "true",
      "Admin title is correctly editable"
    );
    assert.equal(
      abtDescription.attr("contentEditable"),
      "true",
      "Admin description is correctly editable"
    );
    assert.equal(
      abtPar.attr("contentEditable"),
      "true",
      "Admin paragraph is correctly editable"
    );
    done();
  });
});
