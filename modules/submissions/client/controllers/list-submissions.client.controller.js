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
    vm.incrementLikes = incrementLikes;
    vm.decrementLikes = decrementLikes;

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

    // Incrementing logic
    function incrementLikes(submission){
      if(submission.likes===null){
        submission.likes=0;
      }
      submission.likes+=1;
      submission.$update(successCallback, errorCallback);
    }

    // Decrementing logic
    function decrementLikes(submission){
      if(submission.likes!==0){
        submission.likes-=1;
      }
      else if(submission.likes===null){
        submission.likes=0;
      }
      submission.$update(successCallback, errorCallback);
    }

    function successCallback(res) {
    }

    function errorCallback(res) {
      vm.error = res.data.message;
    }
  }
})();
