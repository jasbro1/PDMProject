(function () {
    'use strict';

    angular
        .module('users')
        .factory('MyPointsService', MyPointsService);


    MyPointsService.$inject = ['$resource'];

    function MyPointsService($resource)
    {
        return $resource('/api/users/myPoints', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
})();
