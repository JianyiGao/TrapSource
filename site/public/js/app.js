$(document).ready(function() {
  openLoginModal();
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
      hideLoginModal();
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('error loging in', errorCode, errorMessage);
    });
});

$('#email-login').on('click', function(e) {
  e.preventDefault();
  console.log('click');
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
