(function () {
  'use strict';


  angular
    .module('submissions')
    .controller('MySubmissionsListController', MySubmissionsListController);

  MySubmissionsListController.$inject = ['MySubmissionsService'];

  function MySubmissionsListController(MySubmissionsService) {
    var vm = this;

    vm.submissions = MySubmissionsService.query();
  }
})();
