(function () {
  'use strict';

  angular
    .module('usercomments')
    .controller('UsercommentsListController', UsercommentsListController);

  UsercommentsListController.$inject = ['$state', 'UsercommentsService'];

  function UsercommentsListController($state, UsercommentsService) {
    var vm = this;

    vm.usercomments = UsercommentsService.query();

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
    };

    function incrementLikes(usercomments){
      usercomments.likes+=1;
      usercomments.$update(successCallback, errorCallback);
    }

    function decrementLikes(usercomments){
      if(usercomments.likes!==0){
        usercomments.likes-=1;
      }
      usercomments.$update(successCallback, errorCallback);
    }

    function successCallback(res) {
    }

    function errorCallback(res) {
      vm.error = res.data.message;
    }

    // Calculate the rank of a submission's original poster (OP)
    vm.range = function(points) {
      var rank = [];
      //if OP has earned enough points to obtain rank 1
      if(points >= 10) {
        // OPs will earn a rank every 20 points
        for (var i = 0; i <= points; i += 20) {
          rank.push(i);
        }
      }
      return rank;
    };
  }
})();
