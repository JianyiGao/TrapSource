QUnit.test("admin or regular user", window.qtest.render(){
    var userid = 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1';
    render.equal(user.uid, userid, "this is an admin user");
});
