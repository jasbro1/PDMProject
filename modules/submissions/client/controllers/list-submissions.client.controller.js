(function () {
  'use strict';

  angular
    .module('submissions')
    .controller('SubmissionsListController', SubmissionsListController);

  SubmissionsListController.$inject = ['$scope', 'Authentication', 'SubmissionsService'];

  function SubmissionsListController($scope, Authentication, SubmissionsService) {
    var vm = this;

    // Retrieve the submissions from the database
    vm.submissions = SubmissionsService.query();
    $scope.authentication = Authentication;

    vm.sortTerm = 'likes'; // Sort by date by default
    vm.sortBtnText = 'Sort by Popularity'; // The value to display in the sort button
    vm.sortReverse = true; // Sort in ascending order by default
    vm.sortMenuOpen = false; // The sort menu starts off closed by default
    vm.hasVoted = false;
    vm.incrementLikes = incrementLikes;
    vm.decrementLikes = decrementLikes;
    vm.shouldRender = shouldRender;

    // The code for managing the sorting functionality
    vm.sortBy = function(inSortTerm) {

      // Change the value of the search term to the imported value
      switch (inSortTerm) {
        case 'likes':
          vm.sortTerm = 'likes';
          vm.sortBtnText = 'Sort by Popularity';
          break;
        case 'date':
          vm.sortTerm = 'created';
          vm.sortBtnText = 'Sort by Date';
          break;
        case 'title':
          vm.sortTerm = 'title';
          vm.sortBtnText = 'Sort by Title';
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

    // Incrementing logic
    function incrementLikes(submission, byX){
      if(submission.likes===null){
        submission.likes=0;
      }
      submission.likes+=byX;
      vm.hasVoted=true;
      submission.$update(successCallback, errorCallback);
    }

    // Decrementing logic
    function decrementLikes(submission, byX){
      if(submission.likes!==0){
        submission.likes-=byX;
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

    // Render if logged in
    function shouldRender(user) {
      return !!user;
    }

    // Calculate the rank of a submission's original poster (OP)
    vm.range = function(points) {
      var rank = [];
      //if OP has earned enough points to obtain rank 1
      if(points>=10) {
        // OPs will earn a rank every 20 points
        for (var i = 0; i <= points; i += 20) {
          rank.push(i);
        }
      }
      return rank;
    };
  }
})();
