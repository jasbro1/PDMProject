(function () {
  'use strict';

  angular
    .module('improvements')
    .controller('ImprovementsListController', ImprovementsListController);

  ImprovementsListController.$inject = ['$state', 'ImprovementsService'];

  function ImprovementsListController($state, ImprovementsService) {
    var vm = this;

    vm.improvements = ImprovementsService.query();

    vm.sortTerm = 'date'; // Sort by date by default
    vm.sortBtnText = 'Sort by Date'; // The value to display in the sort button
    vm.sortReverse = false; // Sort in ascending order by default
    vm.sortMenuOpen = false; // The sort menu starts off closed by default

    // The code for managing the sorting functionality
    vm.sortBy = function(inSortTerm) {

      // Change the value of the search term to the imported value
      switch (inSortTerm) {
        case 'user':
          vm.sortTerm = 'user.displayName';
          vm.sortBtnText = 'Sort by User';
          break;
        default:
          vm.sortTerm = 'date';
          vm.sortBtnText = 'Sort by Date';
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
    }
  }
})();
