$(document).ready(function() {
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
        $('#nav-head').append('<a id=\'admin-head\' href=\'admin.html\'>Admin</a>');
      }
      var userButtons = $('#user-buttons');
      userButtons.empty();
      var userProfile = $('#user-profile');
      userProfile.append(
        '<img src="' +
          img +
          '"><p id=\'user-name\'>' +
          name +
          '</p><a id="sign-out" class="btn btn-default">Sign out</a>'
      );
      $('#sign-out').on('click', function() {
        firebase
          .auth()
          .signOut()
          .then(function() {
            userProfile.empty();
            userButtons.append(
              '<h2>Login to Trapsource</h2><a class=\'btn big-primary\' data-toggle=\'modal\' href=\'javascript:void(0)\' onclick=\'openLoginModal();\'>Log in</a><a class=\'btn big-default\' data-toggle=\'modal\' href=\'javascript:void(0)\' onclick=\'openRegisterModal();\'>Register</a>'
            );
          })
          .catch(function(error) {
            console.log(error);
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
  if (password === passwordRep) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        shakeModalRegister();
      });
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
