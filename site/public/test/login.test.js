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
