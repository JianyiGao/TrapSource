$(document).ready(function adminWrapper() {
  var database = firebase.database();
  function regular(snapshot) {
    var index = snapshot.val();
    var jmbTitle = $('#jmbTitle').html(index.jmbTitle);
    var jmbDescription = $('#jmbDescription').html(index.jmbDescription);
    var mainTitle1 = $('#mainTitle1').html(index.mainTitle1);
    var mainTitle2 = $('#mainTitle2').html(index.mainTitle2);
    var mainTitle3 = $('#mainTitle3').html(index.mainTitle3);
    var mainPar1 = $('#mainPar1').html(index.mainPar1);
    var mainPar2 = $('#mainPar2').html(index.mainPar2);
    var mainPar3 = $('#mainPar3').html(index.mainPar3);
  }
  database.ref('index').on('value', regular);

  function admin() {
    console.log('switching to admin');
    database.ref('index').on('value', function(snapshot) {
      var index = snapshot.val();
      $('#regular_index').replaceWith(
        '<body id=\'admin_index\'> <header> <a href=\'index\'> <img id=\'logo\' src=\'images/logo.png\' alt=\'Trap Source Logo\'> </a> <nav> <a id=\'current_page\' href=\'index.html\'>Home</a> <a href=\'tree.html\'>Tree</a> <a href=\'admin.html\'>Admin</a> <a href=\'about.html\'>About</a> </nav> <img id=\'hamburger\' src=\'images/hamburger.svg\' alt=\'Menu\'> </header> <div id=\'nav_line\'></div> <div id=\'jumbotron\'> <h1 id=\'jmbTitle\' contenteditable=\'true\'>' +
          index.jmbTitle +
          ' </h1> <div class=\'jmb_ttl\'> <div id=\'jmbDescription\' contenteditable=\'true\'>' +
          index.jmbDescription +
          '</div> </div> <a id=\'learn_more\' href=\'about\'>Learn more</a> </div> <div id=\'text_column_wrapper\'> <article class=\'text_column\'> <div> <img src=\'images/icon1.svg\' alt=\'icon\'> <h2 id=\'mainTitle1\' contenteditable=\'true\'>' +
          index.mainTitle1 +
          '</h2> </div> <div id=\'mainPar1\' contenteditable=\'true\'>' +
          index.mainPar1 +
          '</div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon2.svg\' alt=\'icon\'> <h2 id=\'mainTitle2\' contenteditable=\'true\'>' +
          index.mainTitle2 +
          '</h2> </div> <div id=\'mainPar2\' contenteditable=\'true\'>' +
          index.mainPar2 +
          '</div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon3.svg\' alt=\'icon\'> <h2 id=\'mainTitle3\' contenteditable=\'true\'>' +
          index.mainTitle3 +
          '</h2> </div> <div id=\'mainPar3\' contenteditable=\'true\'>' +
          index.mainPar3 +
          '</div> </article class=\'text_column\'> </div> <div class=\'row\'> <div class=\'col-xs-12 text-center\'> <a id=\'submit_changes\'>Save Changes</a> </div> </div> <div id=\'footer_line\'></div> <footer> <p>Copyright © 2017 Trap Source</p> <p id=\'developed_by\'>Developed with ♥ by team 6A </p> </footer> </body>'
      );
      $('#submit_changes').on('click', function indexSubmitHandler() {
        var jmbTitle = $('#jmbTitle').html();
        var jmbDescription = $('#jmbDescription').html();
        var mainTitle1 = $('#mainTitle1').html();
        var mainTitle2 = $('#mainTitle2').html();
        var mainTitle3 = $('#mainTitle3').html();
        var mainPar1 = $('#mainPar1').html();
        var mainPar2 = $('#mainPar2').html();
        var mainPar3 = $('#mainPar3').html();

        database.ref('index').set({
          jmbTitle: jmbTitle,
          jmbDescription: jmbDescription,
          mainTitle1: mainTitle1,
          mainTitle2: mainTitle2,
          mainTitle3: mainTitle3,
          mainPar1: mainPar1,
          mainPar2: mainPar2,
          mainPar3: mainPar3
        });
      });
      $('div[contenteditable]').keydown(function(e) {
        // trap the return key being pressed
        if (e.keyCode === 13) {
          // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
          document.execCommand('insertHTML', false, '<br><br>');
          // prevent the default behaviour of return key pressed
          return false;
        }
      });
    });
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      admin();
    }
  });

  var provider = new firebase.auth.GoogleAuthProvider();

  var signIn = $('#sign_in');
  signIn.on('click', function signInHandler() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
        if (user.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
          console.log('yo2');
          admin();
        }
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('error loging in', errorCode, errorMessage);
      });
  });
});
