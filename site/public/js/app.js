(function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  var auth = firebase.auth();

  //get elements
  var txtEmail = document.getElementById('email');
  var txtPass = document.getElementById('password');
  var btnLogin = document.getElementById('btnLogin');
  var btnLogout = document.getElementById('btnLogout');
  var btnSignup = document.getElementById('btnSignup');

  btnLogin.addEventListener('click', e => {
    var email = txtEmail.value;
    var pass = txtPass.value;

    //sign in
    var promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  btnSignup.addEventListener('click', e => {
    var email = txtEmail.value;
    var pass = txtPass.value;
    var auth = firebase.auth();

    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  // add a real time listen
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
    } else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
    }
  });
});
