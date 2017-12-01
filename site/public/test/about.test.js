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

QUnit.test("Test Regular Mode Re-injected Correctly", function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref("test/about").once("value", function(snapshot) {
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
