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
    "Warning message rendered correctly"
  );
});
