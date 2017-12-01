//tree.test.js
QUnit.test("Test User Restrictions", function(assert){
    var adminTab = $("#admin-head");
    var u = window.trapsourceTest.giveMeUser();
    if (u) {
        var name;
        if (u.displayName) {
            name = u.displayName;
        } else {
            name = u.email.substr(0, u.email.indexOf("@"));
        }
        $("#login-head")
            .text(name)
            .css("font-weight", "bold");
        if (u.uid === "DaQoaYhJ7KW8ep4m4P0YLZUfcTk1") {
            assert.equal(adminTab.html(), "Admin", "Admin User: Admin tab correctly displayed");
        } else {
            assert.equal(adminTab.html(), undefined, "Regular User: Admin tab not displayed")
        }
    } else {
        assert.equal(adminTab.html(), undefined, "No user profile detected");
    }
});
