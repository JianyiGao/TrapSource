/*source :https://codepen.io/njmcode/pen/Fjcai */
var DecisionTree = function(data) {
  
  this.initial = data.initial;
  this.choices = data.choices;
  
  /* Return an array of choice objects for the root of the tree */
  this.getInitial = function() {
    
    if (!this.initial) throw 'DecisionTree: no initial choice(s) specified';
    return this.getChoices(this.initial);
    
  };
  
  /* Get full choice data by specific id */
  this.getChoice = function(id) {

    if (!(id in this.choices)) return false;
    if (!('id' in this.choices[id])) this.choices[id].id = id;
    return this.choices[id];
    
  };
  
  /* As above, but passing an array of choice IDs */
  this.getChoices = function(idList) {
    if(!idList) return [];
    var list = [];
    for(var i = 0, ln = idList.length; i < ln; i++) {
      var childChoice = this.getChoice(idList[i]);
      list.push(childChoice);
    }
    return list;
    
  };
  
  /* Get an array of choice data for a parent id */
  this.getChildren = function(parentId) {
    
    if (!(parentId in this.choices)) return false;
    if (!('children' in this.choices[parentId])) return false;
    
    var childIds = this.choices[parentId].children;
    return this.getChoices(childIds);
    
  };
  
  /* Get an array of choice data for the parent(s) of an id */
  this.getParents = function(id) {
    
    var parents = [];
    var node = this.getChoice(id);
    
    while(node.parent) {
      node = this.getChoice(node.parent);
      parents.unshift(node);
    }
    
    return parents;
    
  };
  
  /* Get just an array of ids for the parents of a specific id */
  this.getParentIds = function(id) {
    var parents = this.getParents(id);
    var parentIds = [];
    for(var i = 0, ln = parents.length; i < ln; i++) {
      parentIds.push(parents[i].id);
    }
    return parentIds;
  };
  
  /* Get the 'name' prop for the parent of an id */
  this.getParentName = function(id) {
    var parent = this.getParents(id).pop();
    if(!parent) {
      return false;
    } else {
      return parent.name;
    }
  };
  
  /* Init - insert ids into choice objects, check dups, associate parents, etc */
  this.init = function() {
    
    var idList = [];
    for(var k in this.choices) {
      if(idList.indexOf(k) !== -1) throw 'DecisionTree: duplicate ID "' + k + '" in choice set';
      
      var choice = this.getChoice(k);
      choice.id = k;
      
      var children = this.getChildren(k);
      for(var i = 0; i < children.length; i++) {
        
        var child = children[i];
        if(child.parent) throw 'DecisionTree: tried to assign parent "' + k + '" to child "' + choice.children[i] + '" which already has parent "' + child.parent + '"';
        child.parent = k;
       
      }
      
    }
    
    console.log('init', this.initial, this.choices);
    
  };
  
  this.init();
  
};


/*** TEST DATA ***/
var data = {
    initial: ['Lorem', 'ipsum'],
    choices: {

<<<<<<< HEAD
=======
        // TOP LEVEL

        'Lorem': {
            name: 'Lorem',
            children: ['dolor', 'sit', 'amet']
        },

        'ipsum': {
            name: 'ipsum',
            children: ['consectetur', 'adipiscing', 'elit']
        },

        // STAY IN

        'dolor': {
            name: 'dolor',
            children: ['Mauris', 'efficitur', 'consequat', 'Nullam']
        },
        'sit': {
            name: 'sit',
            children: ['mi', 'est', 'pharetra']
        },
        'amet': {
            name: 'amet',
            children: ['at', 'quam']
        },

        // GO OUT

        'consectetur': {
            name: 'consectetur',
            children: ['a', 'volutpat']
        },
        'adipiscing': {
            name: 'adipiscing',
            children: ['hendrerit', 'velit']
        },
        'elit': {
            name: 'elit',
            children: ['pellentesque', 'habitant']
        },

        // WATCH MOVIE

        'mauris': {
            name: 'morbi'
        },
        'efficitur': {
            name: 'tristique'
        },
        'consequat': {
            name: 'senectus'
        },
        'nullam': {
            name: 'et'
        },

        // WATCH TV 

        'mi': {
            name: 'netus'
        },
        'est': {
            name: 'et'
        },
        'pharetra': {
            name: 'malesuada'
        },

        // COOK
        'at': {
            name: 'fames'
        },
        'quam': {
            name: 'ac'
        },

        // CINEMA
        'a': {
            name: 'turpis'
        },
        'volutpat': {
            name: 'egestas'
        },

        // DRINK
        'hendrerit': {
            name: 'sed'
        },
        'velit': {
            name: 'vitae'
        },

        // RESTAURANT
        'pellentesque': {
            name: 'lectus'
        },
        'habitant': {
            name: 'et'
        }

    }
};

>>>>>>> 5d59f363d391ecae387d7761db9e480990adb5f6
/** TEST CODE **/

$(function() {
  
  var tree = new DecisionTree(data);
  var $list = $('#choices');
  var $title = $('#initial');  ////
  
  var current_id = null;
  
  var renderList = function(items) {
    
    var title = tree.getParentName(items[0].id);
    if(title) {
      $title.text(title);
    } else {
      $title.text('Welcome to TrapSource');
    }
    
    $list.empty();
    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      //$list.append('<li><a href="#" data-choice="' + item.id + '">' + item.name + '</a></li>');
     $list.append('<p><span><a href="#" data-choice="' + item.id + '">' + item.name + '</a></p>');
 
    }
  };
  
  var _doInitial = function() {
      var initData = tree.getInitial();
      current_id = null;
      renderList(initData);
  };
  
  $(document).on('click', '#choices a', function(e) {
    e.preventDefault();
    var choiceId = $(this).data('choice');
    console.log('clicked', choiceId);
    
    var kids = tree.getChildren(choiceId);
    if(kids) {
      current_id = choiceId;
      renderList(kids);
    }
  });
  
  $('#back').on('click', function(e) {
    e.preventDefault();
    if(!current_id) return false;
    console.log('back button clicked', current_id);
    
    var parents = tree.getParents(current_id);
   
    if(parents.length > 0) {
      var prev_node = parents.pop();
      current_id = prev_node.id;
      renderList(tree.getChildren(prev_node.id));
    } else {
      _doInitial();
    }
    
  });
  
  $('#go').on('click', function(e) {
    e.preventDefault();
    
    var cid = $('#show-id').val();
    if(!cid || !(cid in data,choices)) return false;
    console.log('show parents for', cid);
    
    var parentData = tree.getParents(cid);
    $('#results').val(JSON.stringify(parentData, null, 4));
    
  });

  _doInitial();

  
});

