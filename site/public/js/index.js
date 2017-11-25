$(document).ready(function adminWrapper() {
  var database = firebase.database();
  function regular(snapshot) {
    var index = snapshot.val();
    var jmbTitle = $('#jmbTitle').text(index.jmbTitle);
    var jmbDescription = $('#jmbDescription').text(index.jmbDescription);
    var mainTitle1 = $('#mainTitle1').text(index.mainTitle1);
    var mainTitle2 = $('#mainTitle2').text(index.mainTitle2);
    var mainTitle3 = $('#mainTitle3').text(index.mainTitle3);
    var mainPar1 = $('#mainPar1').text(index.mainPar1);
    var mainPar2 = $('#mainPar2').text(index.mainPar2);
    var mainPar3 = $('#mainPar3').text(index.mainPar3);
  }
  database.ref('index').on('value', regular);

  function admin() {
    // console.log('switching to admin');
    // $('#regular_index').replaceWith(
    //   '<body id=\'admin_index\'> <header> <a href=\'index\'> <img id=\'logo\' src=\'images/logo.png\' alt=\'Trap Source Logo\'> </a> <nav> <a id=\'current_page\' href=\'index.html\'>Home</a> <a href=\'tree.html\'>Tree</a> <a href=\'admin.html\'>Admin</a> <a href=\'about.html\'>About</a> </nav> <img id=\'hamburger\' src=\'images/hamburger.svg\' alt=\'Menu\'> </header> <div id=\'nav_line\'></div> <div id=\'jumbotron\'> <h1 id=\'jmbTitle\' contenteditable=\'true\'>Welcome</h1> <div class=\'jmb_ttl\'> <div id=\'jmbDescription\' contenteditable=\'true\'>Lorem ipsum dolor sit amet, usu meis imperdiet sententiae ea. Cu his latine inermis gloriatur. </div> </div> <a id=\'learn_more\' href=\'about\'>Learn more</a> </div> <div id=\'text_column_wrapper\'> <article class=\'text_column\'> <div> <img src=\'images/icon1.svg\' alt=\'icon\'> <h2 id=\'mainTitle1\' contenteditable=\'true\'>Title</h2> </div> <div id=\'mainPar1\' contenteditable=\'true\'>Lorem ipsum dolor sit amet, regione indoctum an per, an usu agam mazim mollis. Eam reque elaboraret at, eam quot sententiae at, at nusquam fastidii moderatius pro. His ei wisi alterum, eum et erat falli impetus. Habeo novum omittam no pro, cu persius similique eam. Cu magna vituperata sea. <br> <br>Praesent electram repudiare ut est, ut agam instructior nec. Inermis contentiones est ex, mel ea epicuri iudicabit scribentur. Nec ut noster possim dignissim, eam populo dictas id, oratio insolens patrioque ea est. <br> <br> Et has iudico denique volutpat. Qui justo eripuit incorrupte ea. Ad ius tacimates tractatos. Cu esse movet eripuit vel. Pri duis ubique detraxit ea. </div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon2.svg\' alt=\'icon\'> <h2 id=\'mainTitle2\' contenteditable=\'true\'>Title</h2> </div> <div id=\'mainPar2\' contenteditable=\'true\'>Lorem ipsum dolor sit amet, regione indoctum an per, an usu agam mazim mollis. Eam reque elaboraret at, eam quot sententiae at, at nusquam fastidii moderatius pro. His ei wisi alterum, eum et erat falli impetus. Habeo novum omittam no pro, cu persius similique eam. Cu magna vituperata sea. <br> <br>Praesent electram repudiare ut est, ut agam instructior nec. Inermis contentiones est ex, mel ea epicuri iudicabit scribentur. Nec ut noster possim dignissim, eam populo dictas id, oratio insolens patrioque ea est. <br> <br> Et has iudico denique volutpat. Qui justo eripuit incorrupte ea. Ad ius tacimates tractatos. Cu esse movet eripuit vel. Pri duis ubique detraxit ea. </div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon3.svg\' alt=\'icon\'> <h2 id=\'mainTitle3\' contenteditable=\'true\'>Title</h2> </div> <div id=\'mainPar3\' contenteditable=\'true\'>Lorem ipsum dolor sit amet, regione indoctum an per, an usu agam mazim mollis. Eam reque elaboraret at, eam quot sententiae at, at nusquam fastidii moderatius pro. His ei wisi alterum, eum et erat falli impetus. Habeo novum omittam no pro, cu persius similique eam. Cu magna vituperata sea. <br> <br>Praesent electram repudiare ut est, ut agam instructior nec. Inermis contentiones est ex, mel ea epicuri iudicabit scribentur. Nec ut noster possim dignissim, eam populo dictas id, oratio insolens patrioque ea est. <br> <br> Et has iudico denique volutpat. Qui justo eripuit incorrupte ea. Ad ius tacimates tractatos. Cu esse movet eripuit vel. Pri duis ubique detraxit ea. </div> </article class=\'text_column\'> </div> <div class=\'row\'> <div class=\'col-xs-12 text-center\'> <a id=\'submit_changes\'>Save Changes</a> </div> </div> <div id=\'footer_line\'></div> <footer> <p>Copyright © 2017 Trap Source</p> <p id=\'developed_by\'>Developed with ♥ by team 6A </p> </footer> </body>'
    // );
    // $('#submit_changes').on('click', function indexSubmitHandler() {
    //   var jmbTitle = $('#jmbTitle').html();
    //   var jmbDescription = $('#jmbDescription').html();
    //   var mainTitle1 = $('#mainTitle1').html();
    //   var mainTitle2 = $('#mainTitle2').html();
    //   var mainTitle3 = $('#mainTitle3').html();
    //   var mainPar1 = $('#mainPar1').html();
    //   var mainPar2 = $('#mainPar2').html();
    //   var mainPar3 = $('#mainPar3').html();
    //   database.ref('index').set({
    //     jmbTitle: jmbTitle,
    //     jmbDescription: jmbDescription,
    //     mainTitle1: mainTitle1,
    //     mainTitle2: mainTitle2,
    //     mainTitle3: mainTitle3,
    //     mainPar1: mainPar1,
    //     mainPar2: mainPar2,
    //     mainPar3: mainPar3
    //   });
    // });
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
