var exampleApp = angular.module('exampleApp',['ngMaterial','ngMessages', 'material.svgAssetsCache']);

example.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD-MM-YYYY');
    };
});

exampleApp.factory('exampleFactory', ['$http','$q', function ($http, $q) {

    return {
        dateWithinCurrentNDAPeriod: function(dateStr) {

            return $http.get('/api/doc/dateWithinCurrentNDAPeriod/'+dateStr)
                .then(function(response) {
                    return response.data;

                }, function(response) {
                    console.log("GET /api/doc/dateWithinCurrentNDAPeriod/dateStr");
                    return $q.reject(response.data);
                });
        }
    };
}]);

exampleApp.controller('DoctorController', function($window,$scope,$http,$q,exampleFactory,$mdDialog,$filter) {


});