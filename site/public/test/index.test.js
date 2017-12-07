/*
******This tests the Index/Landing page using QUnit tests******
*/
$(document).ready(function() {
  setTimeout(function() {
    console.log($('#admin-head').attr('href', 'admin.test.html'));
  }, 100);
});

//Tests Database data injections
QUnit.test('Test Firebase Initial Data Injection', function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref('test/index/index').once('value', function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.firebaseInit(snapshot);
    var jmbTitle = $('#jmbTitle');
    var jmbDescription = $('#jmbDescription');
    var mainPar1 = $('#mainPar1');
    var mainPar2 = $('#mainPar2');
    var mainPar3 = $('#mainPar3');
    var mainTitle1 = $('#mainTitle1');
    var mainTitle2 = $('#mainTitle2');
    var mainTitle3 = $('#mainTitle3');
    //test for jumbotron
    assert.equal(
      jmbTitle.html(),
      data.jmbTitle,
      'Jumbotron title injected correctly'
    );
    //test for jumbotron description
    assert.equal(
      jmbDescription.html(),
      data.jmbDescription,
      'Jumbotron description injected correctly'
    );
    //test for column title 1
    assert.equal(
      mainTitle1.html(),
      data.mainTitle1,
      'Column title 1 injected correctly'
    );
    //test for column title 2
    assert.equal(
      mainTitle2.html(),
      data.mainTitle2,
      'Column title 2 injected correctly'
    );
    //test for column title 3
    assert.equal(
      mainTitle3.html(),
      data.mainTitle3,
      'Column title 3 injected correctly'
    );
    //test for column paragraph 1
    assert.equal(
      mainPar1.html(),
      data.mainPar1,
      'Paragragh column 1 injected correctly'
    );
    //test for column paragraph 2
    assert.equal(
      mainPar2.html(),
      data.mainPar2,
      'Paragragh column 2 injected correctly'
    );
    //test for column paragraph 3
    assert.equal(
      mainPar3.html(),
      data.mainPar3,
      'Paragragh column 3 injected correctly'
    );

    done();
  });
});

//Test for admin mode database injection
QUnit.test('Test Admin Mode Injected Correctly', function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref('test/index/index').once('value', function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.admin(snapshot);
    var jmbTitle = $('#jmbTitle');
    var jmbDescription = $('#jmbDescription');
    var mainPar1 = $('#mainPar1');
    var mainPar2 = $('#mainPar2');
    var mainPar3 = $('#mainPar3');
    var mainTitle1 = $('#mainTitle1');
    var mainTitle2 = $('#mainTitle2');
    var mainTitle3 = $('#mainTitle3');
    var submit_changes = $('#submit_changes');
    //test for admin jumbotron injection
    assert.equal(
      jmbTitle.html(),
      data.jmbTitle,
      'Admin jumbotron title injected correctly'
    );
    //test for admin jumbotron description injection
    assert.equal(
      jmbDescription.html(),
      data.jmbDescription,
      'Admin jumbotron description injected correctly'
    );
    //test for admin column title 1
    assert.equal(
      mainTitle1.html(),
      data.mainTitle1,
      'Admin column title 1 injected correctly'
    );
    //test for admin column title 2
    assert.equal(
      mainTitle2.html(),
      data.mainTitle2,
      'Admin column title 2 injected correctly'
    );
    //test for admin column title 3
    assert.equal(
      mainTitle3.html(),
      data.mainTitle3,
      'Admin column title 3 injected correctly'
    );
    //test for admin column paragraph 1
    assert.equal(
      mainPar1.html(),
      data.mainPar1,
      'Admin paragragh column 1 injected correctly'
    );
    //test for admin column paragraph 2
    assert.equal(
      mainPar2.html(),
      data.mainPar2,
      'Admin paragragh column 2 injected correctly'
    );
    //test for admin column paragraph 3
    assert.equal(
      mainPar3.html(),
      data.mainPar3,
      'Admin paragragh column 3 injected correctly'
    );
    //test for admin save-button
    assert.notEqual(
      submit_changes.html(),
      undefined,
      'Admin mode save-button injected correctly'
    );

    done();
  });
});

//Test if Admin Mode actually let edit
QUnit.test('Test Admin Mode Is Correctly Editable', function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref('test/index/index').once('value', function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.admin(snapshot);
    var jmbTitle = $('#jmbTitle');
    var jmbDescription = $('#jmbDescription');
    var mainPar1 = $('#mainPar1');
    var mainPar2 = $('#mainPar2');
    var mainPar3 = $('#mainPar3');
    var mainTitle1 = $('#mainTitle1');
    var mainTitle2 = $('#mainTitle2');
    var mainTitle3 = $('#mainTitle3');
    //test if jumbotron title is editable
    assert.equal(
      jmbTitle.attr('contentEditable'),
      'true',
      'Jumbotron title is correctly editable'
    );
    //test if jumbotron description is editable
    assert.equal(
      jmbDescription.attr('contentEditable'),
      'true',
      'Jumbotron description is correctly editable'
    );
    //test if column 1 is editable
    assert.equal(
      mainTitle1.attr('contentEditable'),
      'true',
      'Column title 1 is correctly editable'
    );
    //test if column 2 is editable
    assert.equal(
      mainTitle2.attr('contentEditable'),
      'true',
      'Column title 2 is correctly editable'
    );
    //test if column 3 is editable
    assert.equal(
      mainTitle3.attr('contentEditable'),
      'true',
      'Column title 3 is correctly editable'
    );
    //test if column descriptions are editable
    assert.equal(
      mainPar1.attr('contentEditable'),
      'true',
      'Paragragh column 1 is correctly editable'
    );
    //test if column descriptions are editable
    assert.equal(
      mainPar2.attr('contentEditable'),
      'true',
      'Paragragh column 2 is correctly editable'
    );
    //test if column descriptions are editable
    assert.equal(
      mainPar3.attr('contentEditable'),
      'true',
      'Paragragh column 3 is correctly editable'
    );

    done();
  });
});

//Test to see if data re-inject properly when log into regular user
QUnit.test('Test Regular Mode Re-injected Correctly', function(assert) {
  var done = assert.async();
  var database = firebase.database();
  var data = {};
  database.ref('test/index/index').once('value', function(snapshot) {
    data = snapshot.val();
    window.trapsourceTest.regular(snapshot);
    var jmbTitle = $('#jmbTitle');
    var jmbDescription = $('#jmbDescription');
    var mainPar1 = $('#mainPar1');
    var mainPar2 = $('#mainPar2');
    var mainPar3 = $('#mainPar3');
    var mainTitle1 = $('#mainTitle1');
    var mainTitle2 = $('#mainTitle2');
    var mainTitle3 = $('#mainTitle3');
    var submit_changes = $('#submit_changes');
    //test if jumbotron title is re-injected properly
    assert.equal(
      jmbTitle.html(),
      data.jmbTitle,
      'Regular jumbotron title injected correctly'
    );
    //test if jumbotron description is re-injected properly
    assert.equal(
      jmbDescription.html(),
      data.jmbDescription,
      'Regular jumbotron description injected correctly'
    );
    //test if column title 1 is re-injected properly
    assert.equal(
      mainTitle1.html(),
      data.mainTitle1,
      'Regular column title 1 injected correctly'
    );
    //test if column title 2 is re-injected properly
    assert.equal(
      mainTitle2.html(),
      data.mainTitle2,
      'Regular column title 2 injected correctly'
    );
    //test if column title 3 is re-injected properly
    assert.equal(
      mainTitle3.html(),
      data.mainTitle3,
      'Regular column title 3 injected correctly'
    );
    //test if column paragraph 1 is re-injected properly
    assert.equal(
      mainPar1.html(),
      data.mainPar1,
      'Regular paragragh column 1 injected correctly'
    );
    //test if column paragraph 2 is re-injected properly
    assert.equal(
      mainPar2.html(),
      data.mainPar2,
      'Regular paragragh column 2 injected correctly'
    );
    //test if column paragraph 3 is re-injected properly
    assert.equal(
      mainPar3.html(),
      data.mainPar3,
      'Regular paragragh column 3 injected correctly'
    );
    //test for absense of admin mode save button
    assert.equal(
      submit_changes.html(),
      undefined,
      'Admin mode save-button not injected'
    );

    done();
  });
});

//Test for admin vs normal user functionality
QUnit.test('Test User Restrictions', function(assert) {
  var adminTab = $('#admin-head');
  var u = window.trapsourceTest.giveMeUser();
  if (u) {
    var name;
    if (u.displayName) {
      name = u.displayName;
    } else {
      name = u.email.substr(0, u.email.indexOf('@'));
    }
    $('#login-head')
      .text(name)
      .css('font-weight', 'bold');
    if (u.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
      //test if admin user is correctly implemented
      assert.equal(
        adminTab.html(),
        'Admin',
        'Admin User: Admin tab correctly displayed'
      );
    } else {
      //test of regular user is correctly implemented
      assert.equal(
        adminTab.html(),
        undefined,
        'Regular User: Admin tab not displayed'
      );
    }
  } else {
    //test if no user profile when not logged in
    assert.equal(adminTab.html(), undefined, 'No user profile detected');
  }
});
