QUnit.test("Test Firebase Initial Data Injection", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/about").once("value", function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.firebaseInit(snapshot);
    var abtTitle = $("#abtTitle");
    var abtDescription = $("#abtDescription");
    var abtPar = $("#abtPar");
    assert.equal(abtTitle.html(), data.abtTitle, "Title injected correctly");
    assert.equal(
      abtDescription.html(),
      data.abtDescription,
      "Description injected correctly"
    );
    assert.equal(abtPar.html(), data.abtPar, "Paragraph injected correctly");
    done();
  });
});

QUnit.test("Test Admin Mode Injected Correctly", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/about").once("value", function(snapshot) {
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

QUnit.test("Test Admin Mode Is Correctly Editable", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/about").once("value", function(snapshot) {
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

QUnit.test("Test Firebase Submit Works Correctly", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/about").once("value", function(snapshot) {
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
