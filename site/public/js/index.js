(function indexWrapper() {
  var provider = new firebase.auth.GoogleAuthProvider();

  function admin() {
    console.log('switching to admin');
    $('#regular_index').replaceWith(
      '<body id=\'admin_index\'> <header> <a href=\'index\'><img id=\'logo\' src=\'images/logo.png\' alt=\'Trap Source Logo\'></a> <nav> <a id=\'current_page\' href=\'index.html\'>Home</a> <a href=\'tree.html\'>Tree</a> <a href=\'admin.html\'>Admin</a> <a href=\'about.html\'>About</a> </nav> <img id=\'hamburger\' src=\'images/hamburger.svg\' alt=\'Menu\'> </header> <div id=\'nav_line\'></div> <div id=\'jumbotron\'> <h1 contenteditable=\'true\'>Welcome</h1> <div class="jmb_ttl">  <div contenteditable=\'true\'>Lorem ipsum dolor <span>sit</span> amet, usu meis imperdiet sententiae <span>ea</span>. Cu his latine inermis gloriatur. </div> </div> <a id=\'learn_more\' href=\'about\'>Learn more</a> </div> <div id=\'text_column_wrapper\'> <article class=\'text_column\'> <div> <img src=\'images/icon1.svg\' alt=\'icon\'> <h2 contenteditable=\'true\'>Title</h2> </div> <div contenteditable=\'true\'>Lorem ipsum dolor sit amet, regione indoctum an per, an usu agam mazim mollis. Eam reque elaboraret at, eam quot sententiae at, at nusquam fastidii moderatius pro. His ei wisi alterum, eum et erat falli impetus. Habeo novum omittam no pro, cu persius similique eam. Cu magna vituperata sea.<br><br>Praesent electram repudiare ut est, ut agam instructior nec. Inermis contentiones est ex, mel ea epicuri iudicabit scribentur. Nec ut noster possim dignissim, eam populo dictas id, oratio insolens patrioque ea est.<br><br> Et has iudico denique volutpat. Qui justo eripuit incorrupte ea. Ad ius tacimates tractatos. Cu esse movet eripuit vel. Pri duis ubique detraxit ea. </div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon2.svg\' alt=\'icon\'> <h2 contenteditable=\'true\'>Title</h2> </div> <div contenteditable=\'true\'>Lorem ipsum dolor sit amet, regione indoctum an per, an usu agam mazim mollis. Eam reque elaboraret at, eam quot sententiae at, at nusquam fastidii moderatius pro. His ei wisi alterum, eum et erat falli impetus. Habeo novum omittam no pro, cu persius similique eam. Cu magna vituperata sea.<br><br>Praesent electram repudiare ut est, ut agam instructior nec. Inermis contentiones est ex, mel ea epicuri iudicabit scribentur. Nec ut noster possim dignissim, eam populo dictas id, oratio insolens patrioque ea est.<br><br> Et has iudico denique volutpat. Qui justo eripuit incorrupte ea. Ad ius tacimates tractatos. Cu esse movet eripuit vel. Pri duis ubique detraxit ea. </div> </article class=\'text_column\'> <article class=\'text_column\'> <div> <img src=\'images/icon3.svg\' alt=\'icon\'> <h2 contenteditable=\'true\'>Title</h2> </div> <div contenteditable=\'true\'>Lorem ipsum dolor sit amet, regione indoctum an per, an usu agam mazim mollis. Eam reque elaboraret at, eam quot sententiae at, at nusquam fastidii moderatius pro. His ei wisi alterum, eum et erat falli impetus. Habeo novum omittam no pro, cu persius similique eam. Cu magna vituperata sea.<br><br>Praesent electram repudiare ut est, ut agam instructior nec. Inermis contentiones est ex, mel ea epicuri iudicabit scribentur. Nec ut noster possim dignissim, eam populo dictas id, oratio insolens patrioque ea est.<br><br> Et has iudico denique volutpat. Qui justo eripuit incorrupte ea. Ad ius tacimates tractatos. Cu esse movet eripuit vel. Pri duis ubique detraxit ea. </div> </article class=\'text_column\'> </div> <div class = \'row\'> <div class = \'col-xs-12 text-center\'> <a id=\'submit_changes\'>Save Changes</a> </div> </div> <div id=\'footer_line\'></div> <footer> <p>Copyright © 2017 Trap Source</p> <p id=\'developed_by\'>Developed with ♥ by team 6A </p> </footer> </body>'
    );
  }

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
})();
