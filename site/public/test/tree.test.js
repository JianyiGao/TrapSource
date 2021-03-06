$(document).ready(function() {
  setTimeout(function() {
    console.log($('#admin-head').attr('href', 'admin.test.html'));
  }, 100);
});

//$("#container").each(function(){
//console.log($(this).html())})

//$("#container").each(function(){
//console.log($(this).find(("h2, p")).text())})

function recursiveTest(index) {
  QUnit.test(
    'Novice Tree Question ' + index + ' Was Injected Correctly',
    function(assert) {
      var done = assert.async();
      var database = firebase.database();
      var data = {};
      database.ref('tree').once('value', function(snapshot) {
        data = snapshot.val();
        $('#tree-type').val('Advanced');
        //window.trapsourceTest.firebaseInit(snapshot);

        //window.trapsourceTest.closure = closure();
        // $("#tree-type").val('Advanced');
        var question = $('#question');
        assert.equal(
          question.find('h2').text(),
          data[index].questionTitle,
          'Question Title Loaded correctly'
        );
        assert.equal(
          question.find('p').text(),
          data[index].questionParagraph,
          'Question Description Loaded correctly'
        );
        var buttons = $('.answer_button');
        var next = null;
        $.each(buttons, function(key, button) {
          if (data[index].answers[key].nextBool === false) {
            next = key;
          }
          button = $(button);
          assert.equal(
            button.text(),
            data[index].answers[key].answerTitle,
            'Button ' + key + ' Loaded correctly'
          );
        });
        if (next !== null && index + 1 < data.length) {
          console.log(next);
          $(buttons.get(next)).trigger('click');
          recursiveTest(index + 1);
        } else {
          advancedTreeTest();
        }
        done();
      });
    }
  );
}

recursiveTest(0);

function advancedTreeTest() {
  QUnit.test('Test Advanced Tree Has Correct Data From Database', function(
    assert
  ) {
    var done = assert.async();
    var database = firebase.database();
    var data = {};
    database.ref('tree').once('value', function(snapshot) {
      data = snapshot.val();
      $('#tree-type').val('Advanced');
      //window.trapsourceTest.firebaseInit(snapshot);

      //window.trapsourceTest.closure = closure();
      // $("#tree-type").val('Advanced');
      window.trapsourceTest.advanced();
      var h2 = {};
      var p = {};
      /*
               $("#container").each(function(index){
                   h2=$(this).find("h2").text();
                   console.log(index+": "+h2);
                  p=$(this).find("p").text();
                   console.log(p);
              });
              */
      $('.advanced-question-container').each(function(index) {
        h2 = $(this)
          .find('h2')
          .text();
        //  console.log(index+": "+h2);
        assert.equal(
          h2,
          data[index].questionTitle,
          'Question Title Loaded correctly'
        );
        //console.log ((index+": "+data.tree[index].questionTitle));
        p = $(this)
          .find('p')
          .text();
        // console.log(index+": "+p);
        assert.equal(
          p,
          data[index].questionParagraph,
          'Question Paragraph Loaded correctly'
        );
        // console.log ((index+": "+data.tree[index].questionParagraph));
      });
      done();
    });
  });
  //tree.test.js
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
        assert.equal(
          adminTab.html(),
          'Admin',
          'Admin User: Admin tab correctly displayed'
        );
      } else {
        assert.equal(
          adminTab.html(),
          undefined,
          'Regular User: Admin tab not displayed'
        );
      }
    } else {
      assert.equal(adminTab.html(), undefined, 'No user profile detected');
    }
  });
}
