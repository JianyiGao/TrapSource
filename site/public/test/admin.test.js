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
  
 