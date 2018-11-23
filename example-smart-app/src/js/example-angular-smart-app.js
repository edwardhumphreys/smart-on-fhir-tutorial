var exampleApp = angular.module('exampleApp',[]);

exampleApp.factory('exampleFactory', ['$http','$q', function ($http, $q) {

    return {
        getPatient: function(smart) {

            var patient = smart.patient;
            var pt = patient.read();

            var obv = smart.patient.api.fetchAll({
                type: 'Observation',
                query: {
                    code: {
                        $or: [
                            'http://loinc.org|8302-2',
                            'http://loinc.org|8462-4',
                            'http://loinc.org|8480-6',
                            'http://loinc.org|2085-9',
                            'http://loinc.org|2089-1',
                            'http://loinc.org|55284-4'
                        ]
                    }
                }
            });

            return obv;
        }
    };
}]);

exampleApp.controller('FHIRController', function($window,$scope,$http,$q,exampleFactory) {

    console.log("v21 Angular!");

    var onError = function(){
        console.log('Loading error', arguments);
    };

    var getPatientPromise = function(smart){
        exampleFactory.getPatient(smart)
            .then(function(data) {
                console.log(data);
            }, function(error) {
                onError()
            });
    };

    var onReady = function(smart)  {

        console.log("v19");

        if (smart.hasOwnProperty('patient')) {

            getPatientPromise(smart);

        } else {
            onError();
        }
    }

    FHIR.oauth2.ready(onReady, onError);

});