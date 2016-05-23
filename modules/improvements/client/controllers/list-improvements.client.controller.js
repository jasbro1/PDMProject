(function () {
  'use strict';

  angular
    .module('improvements')
    .controller('ImprovementsListController', ImprovementsListController);

  ImprovementsListController.$inject = ['$state', 'ImprovementsService'];

  function ImprovementsListController($state, ImprovementsService) {
    var vm = this;

    vm.improvements = ImprovementsService.query();
    $scope.authentication = Authentication;

    vm.sortTerm = 'likes';                   // Sort by likes by default
    vm.sortBtnText = 'Sort by Popularity';  // The value to display in the sort button
    vm.sortReverse = true;                 // Sort in ascending order by default
    vm.sortMenuOpen = false;                // The sort menu starts off closed by default
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
          vm.sortTerm = 'date';
          vm.sortBtnText = 'Sort by Date';
          break;
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
      $state.reload();  // Loads the improvements list
    };

    // Incrementing logic
    function incrementLikes(improvement, byX){
      if(improvement.likes===null){
        improvement.likes=0;
      }
      improvement.likes+=byX;
      improvement.$update(successCallback, errorCallback);
    }

    // Decrementing logic
    function decrementLikes(improvement, byX){
      if(improvement.likes!==0){
        improvement.likes-=byX;
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

    // Render if logged in
    function shouldRender(user) {
      return !!user;
    }

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
