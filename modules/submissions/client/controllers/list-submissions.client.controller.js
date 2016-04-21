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


        vm.sortTerm = 'created'; // Sort by date by default
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
                case 'created':
                    vm.sortTerm = 'created';
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
                    vm.sortTerm = 'created';
                    vm.sortBtnText = 'Sort by Date';
                    break;
            }

            // Change the sorting order on every click
            vm.sortReverse = !vm.sortReverse;
        };

        vm.toggleSortMenu = function() {
            vm.sortMenuOpen = !vm.sortMenuOpen;
        };
    }
})();
