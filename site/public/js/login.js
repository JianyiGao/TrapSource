$(document).ready(function() {
  window.trapsourceTest = {};
  window.trapsourceTest.shakeModal = shakeModal;
  window.trapsourceTest.showLoginForm = showLoginForm;
  window.trapsourceTest.showRegisterForm = showRegisterForm;
  window.trapsourceTest.shakeModalPass = shakeModalPass;
  window.trapsourceTest.shakeModalRegister = shakeModalRegister;
  window.trapsourceTest.validateEmail = validateEmail;
  window.trapsourceTest.shakeModalEmail = shakeModalEmail;
  window.trapsourceTest.openLoginModal = openLoginModal;
  window.trapsourceTest.openRegisterModal = openRegisterModal;
  window.trapsourceTest.hideLoginModal = hideLoginModal;
  //window.trapsourceTest.validateEmail = validateEmail;
  //window.trapsourceTest.showLoginForm = showLoginForm;
  //window.trapsourceTest.showRegisterForm = showRegisterForm;

  $('#hamburger').on('click', function() {
    var nav = $('#nav-head');
    if (nav.css('top') === '-500px') {
      $('#nav-head').css('top', 'auto');
    } else {
      $('#nav-head').css('top', '-500px');
    }
  });

  toastr.options.closeButton = true;
  firebase.auth().onAuthStateChanged(function(u) {
    hideLoginModal();
    if (u) {
      console.log(u);
      var name;
      if (u.displayName) {
        name = u.displayName;
      } else {
        name = u.email.substr(0, u.email.indexOf('@'));
      }
      $('#login-head')
        .text(name)
        .css('font-weight', 'bold');
      var img;
      if (u.photoURL) {
        img = u.photoURL;
      } else {
        img = 'images/default-user.png';
      }
      if (u.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
        toastr.success('Switching to admin mode');
        $('#nav-head').append('<a id=\'admin-head\' href=\'admin.html\'>Admin</a>');
      }
      var userButtons = $('#user-buttons');
      userButtons.empty();
      var userProfile = $('#user-profile');
      if (u.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
        userProfile.append(
          '<img src="' +
            img +
            '"><p id=\'user-name\'>' +
            name +
            ' (Admin)' +
            '</p><a id="sign-out" class="btn btn-default">Sign out</a>'
        );
      } else {
        userProfile.append(
          '<img src="' +
            img +
            '"><p id=\'user-name\'>' +
            name +
            '</p><a id="sign-out" class="btn btn-default">Sign out</a><a id="delete-account" class="btn btn-danger">Delete account</a>'
        );
      }
      function signOut() {
        userProfile.empty();
        userButtons.append(
          '<h2>Login to Trapsource</h2><a style=\'margin-right: 0.3rem;\' class=\'btn btn-primary\' data-toggle=\'modal\' href=\'javascript:void(0)\' onclick=\'openLoginModal();\'>Log in</a><a class=\'btn btn-default\' data-toggle=\'modal\' href=\'javascript:void(0)\' onclick=\'openRegisterModal();\'>Register</a>'
        );
      }

      $('#sign-out').on('click', function() {
        firebase
          .auth()
          .signOut()
          .then(signOut)
          .catch(function(error) {
            console.log(error);
          });
      });
      $('#delete-account').on('click', function() {
        u
          .delete()
          .then(function() {
            signOut();
            $('#login-head')
              .text('Log In')
              .css('font-weight', 'normal');
            toastr.success('Account deleted sucessfully');
          })
          .catch(function(error) {
            toastr.error('There was some issue deleting the account');
          });
      });
      toastr.success('login successful');
    } else {
      $('#admin-head').remove();
    }
  });
});

$('#google_login').on('click', function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      user = result.user;
      console.log(user);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('error loging in', errorCode, errorMessage);
    });
});

$('#login-btn').on('click', function(e) {
  e.preventDefault();
  var email = $('#email-login').val();
  var password = $('#password-login').val();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      shakeModal();
    });
});

$('#register-btn').on('click', function(e) {
  e.preventDefault();
  console.log('click');
  var email = $('#email-register').val();
  var password = $('#password-register').val();
  var passwordRep = $('#password-register-rep').val();

  if (password === passwordRep && validateEmail(email)) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        shakeModalRegister();
      });
  } else if (!validateEmail(email)) {
    shakeModalEmail();
  } else {
    shakeModalPass();
  }
});

function showRegisterForm() {
  $('.loginBox').fadeOut('fast', function() {
    $('.registerBox').fadeIn('fast');
    $('.login-footer').fadeOut('fast', function() {
      $('.register-footer').fadeIn('fast');
    });
    $('.modal-title').html('Register with');
  });
  $('.error')
    .removeClass('alert alert-danger')
    .html('');
}
function showLoginForm() {
  $('#loginModal .registerBox').fadeOut('fast', function() {
    $('.loginBox').fadeIn('fast');
    $('.register-footer').fadeOut('fast', function() {
      $('.login-footer').fadeIn('fast');
    });

    $('.modal-title').html('Login with');
  });
  $('.error')
    .removeClass('alert alert-danger')
    .html('');
}

function hideLoginModal() {
  setTimeout(function() {
    $('#loginModal').modal('hide');
  }, 230);
}

function openLoginModal() {
  showLoginForm();
  setTimeout(function() {
    $('#loginModal').modal('show');
  }, 230);
}
function openRegisterModal() {
  showRegisterForm();
  setTimeout(function() {
    $('#loginModal').modal('show');
  }, 230);
}

function loginAjax() {
  shakeModal();
}

function shakeModal() {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.error')
    .addClass('alert alert-danger')
    .html('Invalid email/password combination');
  $('input[type="password"]').val('');
  setTimeout(function() {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}

function shakeModalPass() {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.error')
    .addClass('alert alert-danger')
    .html('Confirmed password does not match password');
  $('input[type="password"]').val('');
  setTimeout(function() {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}

function shakeModalRegister() {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.error')
    .addClass('alert alert-danger')
    .html('There was an error. This account may already be registered.');
  $('input[type="password"]').val('');
  setTimeout(function() {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}

function validateEmail(email) {
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return re.test(email);
}

function shakeModalEmail() {
  $('#loginModal .modal-dialog').addClass('shake');
  $('.error')
    .addClass('alert alert-danger')
    .html('You entered an invalid email.');
  $('input[type="password"]').val('');
  setTimeout(function() {
    $('#loginModal .modal-dialog').removeClass('shake');
  }, 1000);
}
