(function() {
  //initialize firebase
  var config = {
    apiKey: "AIzaSyDIQQbQkegzVvTF4mh7zMqoBsD4x1HmUCw",
    authDomain: "trapsource-c3482.firebaseapp.com",
    databaseURL: "https://trapsource-c3482.firebaseio.com",
    projectId: "trapsource-c3482",
    storageBucket: "trapsource-c3482.appspot.com",
    messagingSenderId: "1054890812044"
  };
  firebase.initializeApp(config);

  //get elements
  const txtEmail = document.getElementById('email');
  const txtPass = document.getElementById('password');
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const btnSignup = document.getElementById('btnSignup');

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPass.value;
    const auth = firebase.auth();

    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e=>{
    firebase.auth().signOut();
  });

  btnSignup.addEventListener('click', e=>{
    const email = txtEmail.value;
    const pass = txtPass.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .catch(e=>console.log(e.message));
  });

  // add a real time listen
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
    } else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
    }
  });

});
