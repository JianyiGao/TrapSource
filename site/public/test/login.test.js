$(document).ready(function() {
  setTimeout(function() {
    console.log($("#admin-head").attr("href", "admin.test.html"));
  }, 100);
});

QUnit.test("Testing shake modal function", function(assert) {
  window.trapsourceTest.showLoginForm();
  window.trapsourceTest.shakeModal();
  var alert = $($(".error.alert.alert-danger").get(0));
  assert.equal(
    alert.text(),
    "Invalid email/password combination",
    "Warning message rendered correctly: Invalid email/password"
  );
});

QUnit.test("Testing shake modal password function", function(assert) {
  window.trapsourceTest.showRegisterForm();
  window.trapsourceTest.shakeModalPass();
  var alert = $($(".error.alert.alert-danger").get(0));
  assert.equal(
    alert.text(),
    "Confirmed password does not match password",
    "Warning message rendered correctly: Confirmed password does not match"
  );
});

QUnit.test("Testing shake modal register function", function(assert) {
  window.trapsourceTest.showRegisterForm();
  window.trapsourceTest.shakeModalRegister();
  var alert = $($(".error.alert.alert-danger").get(0));
  assert.equal(
    alert.text(),
    "There was an error. This account may already be registered.",
    "Warning message rendered correctly: Registered account already exists"
  );
});

QUnit.test("Testing shake modal email function", function(assert) {
  window.trapsourceTest.showRegisterForm();
  window.trapsourceTest.shakeModalEmail();
  var alert = $($(".error.alert.alert-danger").get(0));
  assert.equal(
    alert.text(),
    "You entered an invalid email.",
    "Warning message rendered correctly: Invalid email entered"
  );
});

QUnit.test("Testing login modal opens correctly", function(assert) {
  var done = assert.async();
  window.trapsourceTest.openLoginModal();
  setTimeout(function() {
    var display = $("#loginModal").css("display");
    assert.equal(display, "block", "Login modal opens correctly");
    done();
  }, 500);
});

QUnit.test("Testing register modal opens correctly", function(assert) {
  var done = assert.async();
  window.trapsourceTest.openRegisterModal();
  setTimeout(function() {
    var display = $("#loginModal").css("display");
    assert.equal(display, "block", "Register modal opens correctly");
    done();
  }, 500);
});

QUnit.test("Testing login modal closes correctly", function(assert) {
  var done = assert.async();
  window.trapsourceTest.hideLoginModal();
  setTimeout(function() {
    var display = $("#loginModal").css("display");
    assert.equal(display, "none", "Login modal closes correctly");
    done();
  }, 500);
});
