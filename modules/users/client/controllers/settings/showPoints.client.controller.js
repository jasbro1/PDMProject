'use strict';

(function () {
  angular.module('users').controller('showPointsController', ['MyPointsService',
    function (MyPointsService) {
      var vm = this;
      vm.users = MyPointsService.query();
    }
  ]);
})();
