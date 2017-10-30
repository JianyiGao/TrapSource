(function() {
  'use strict';

  angular
    .module('novice-tree')
    .controller('NoviceTreeController', NoviceTreeController);

  NoviceTreeController.$inject = ['$scope'];

  function NoviceTreeController($scope) {
    var vm = this;

    // Novice tree controller logic
    // ...
    var DecisionTree = require('decision-tree-template');
    var data = require('modules/novice-tree/data/test');
    $scope.Decisiontree = function() {
      
      var tree = new DecisionTree(data);
      var $list = '#choices';
      var $title = '#initial';  ////
      
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
      
      document.on('click', '#choices a', function(e) {
        e.preventDefault();
        var choiceId = this.data('choice');
        console.log('clicked', choiceId);
        
        var kids = tree.getChildren(choiceId);
        if(kids) {
          current_id = choiceId;
          renderList(kids);
        }
      });
      
      '#back'.on('click', function(e) {
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
      
      '#go'.on('click', function(e) {
        e.preventDefault();
        
        var cid = '#show-id'.val();
        if(!cid || !(cid in data,'#choices')) return false;
        console.log('show parents for', cid);
        
        var parentData = tree.getParents(cid);
        '#results'.val(JSON.stringify(parentData, null, 4));
        
      });

      _doInitial();

      
    };


    init();

    function init() {
    }
  }
})();
