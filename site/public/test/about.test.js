QUnit.test("admin or regular user", function(render){
    var userid = 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1';
    render.equal(userid, 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1', "this is an admin user");
    render.equal(userid, 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1', "this is a regular user");
});