(function () {
  'use strict';

  angular
    .module('submissions')
    .controller('SubmissionsListController', SubmissionsListController);

  SubmissionsListController.$inject = ['SubmissionsService'];

  function SubmissionsListController(SubmissionsService) {
    var vm = this;

    // Retrieve the submissions from the database
    vm.submissions = SubmissionsService.query();


    vm.sortTerm = 'date'; // Sort by date by default
    vm.sortBtnText = 'Sort by Date'; // The value to display in the sort button
    vm.sortReverse = false; // Sort in ascending order by default
    vm.sortMenuOpen = false; // The sort menu starts off closed by default

    // The code for managing the sorting functionality
    vm.sortBy = function(inSortTerm) {

      // Change the value of the search term to the imported value
      switch (inSortTerm) {
        case 'title':
          vm.sortTerm = 'title';
          vm.sortBtnText = 'Sort by Title';
          break;
        case 'date':
          vm.sortTerm = 'date';
          vm.sortBtnText = 'Sort by Date';
          break;
        case 'user':
          vm.sortTerm = 'user.displayName';
          vm.sortBtnText = 'Sort by User';
          break;
        case 'category':
          vm.sortTerm = 'categories';
          vm.sortBtnText = 'Sort by Category';
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

    // Calculate the rank of a submission's original poster (OP)
    vm.range = function(points) {
      var rank = [];
      //if OP has earned enough points to obtain rank 1
      if(points >= 10 ) {
        // OPs will earn a rank every 20 points
        for (var i = 0; i <= points; i += 20) {
          rank.push(i);
        }
      }
      return rank;
    };
  }
})();
