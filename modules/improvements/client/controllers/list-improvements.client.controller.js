(function () {
  'use strict';

  angular
    .module('improvements')
    .controller('ImprovementsListController', ImprovementsListController);

  ImprovementsListController.$inject = ['$state', 'ImprovementsService'];

  function ImprovementsListController($state, ImprovementsService) {
    var vm = this;

    vm.improvements = ImprovementsService.query();

    vm.sortTerm = 'like'; // Sort by date by default
    vm.sortBtnText = 'Sort by Popularity'; // The value to display in the sort button
    vm.sortReverse = false; // Sort in ascending order by default
    vm.sortMenuOpen = false; // The sort menu starts off closed by default
    vm.incrementLikes = incrementLikes;
    vm.decrementLikes = decrementLikes;

    // The code for managing the sorting functionality
    vm.sortBy = function(inSortTerm) {

      // Change the value of the search term to the imported value
      switch (inSortTerm) {
        case 'likes':
          vm.sortTerm = 'likes';
          vm.sortBtnText = 'Sort by Popularity';
          break;
        case 'date':
          vm.sortTerm = 'date';
          vm.sortBtnText = 'Sort by Date';
        case 'user':
          vm.sortTerm = 'user.displayName';
          vm.sortBtnText = 'Sort by User';
          break;
        default:
          vm.sortTerm = 'likes';
          vm.sortBtnText = 'Sort by Popularity';
          break;
      }

      // Change the sorting order on every click
      vm.sortReverse = !vm.sortReverse;
    };

    vm.toggleSortMenu = function() {
      vm.sortMenuOpen = !vm.sortMenuOpen;
    };

    // Load improvements list
    vm.load = function(){
      $state.reload();
    };

    // Incrementing logic
    function incrementLikes(improvement){
      if(improvement.likes===null){
        improvement.likes=0;
      }
      improvement.likes+=1;
      improvement.$update(successCallback, errorCallback);
    }

    // Decrementing logic
    function decrementLikes(improvement){
      if(improvement.likes!==0){
        improvement.likes-=1;
      }
      else if(improvement.likes===null){
        improvement.likes=0;
      }
      improvement.$update(successCallback, errorCallback);
    }

    function successCallback(res) {
    }

    function errorCallback(res) {
      vm.error = res.data.message;
    }
  }
})();
