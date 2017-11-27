$(document).ready(function() {
  var database = firebase.database();
  var user;
  var snapshot;
  var adminOn = false;
  toastr.options.closeButton = true;
  function render() {
    if (snapshot && user && user.uid === 'DaQoaYhJ7KW8ep4m4P0YLZUfcTk1') {
      admin(snapshot);
    } else if (snapshot) {
      regular(snapshot);
    }
  }

  database.ref('about').on('value', function(s) {
    snapshot = s;
    render();
  });
  firebase.auth().onAuthStateChanged(function(u) {
    console.log(u);
    user = u;
    render();
  });

  function regular(snapshot) {
    adminOn = false;
    about = snapshot.val();
    $('#aboutWrapper').replaceWith(
      '<div id="aboutWrapper"> <div id=\'about\'> <h1 id=\'abtTitle\'>' +
        about.abtTitle +
        '</h1> <h2> <div id=\'abtDescription\'>' +
        about.abtDescription +
        '</div> </h2> <div id=\'abtPar\'>' +
        about.abtPar +
        '</div> </div> </div>'
    );
  }

  function admin(snapshot) {
    if (adminOn === false) {
      toastr.success('Switching to admin');
      adminOn = true;
    }
    about = snapshot.val();
    $('#aboutWrapper').replaceWith(
      '<div id="aboutWrapper"> <div id=\'about\'> <h1 contenteditable="true" id=\'abtTitle\'>' +
        about.abtTitle +
        '</h1> <h2> <div contenteditable="true" id=\'abtDescription\'>' +
        about.abtDescription +
        '</div> </h2> <div contenteditable="true" id=\'abtPar\'>' +
        about.abtPar +
        '</div> </div> <div class="text-center"> <a id="submit_changes">Save Changes</a></div>'
    );
    $('#submit_changes').on('click', function() {
      database.ref('about').set({
        abtTitle: $('#abtTitle').html(),
        abtDescription: $('#abtDescription').html(),
        abtPar: $('#abtPar').html()
      });
      toastr.success('Changes saved');
    });
  }
});
