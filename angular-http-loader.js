(function () {
    'use strict';
    angular.module('angularHttpLoading')
        .factory('LoadingInterceptor', [ '$rootScope', '$q', function ($rootScope, $q) {
 
            var requestsInProgress = 0;
            var requiresGenericPreloader = function (configuration, callback) {
                if (configuration.defaultPreloader !== false && !configuration.cache) {
                    callback();
                }
            };
 
            var setPreloader = function (active) {
                if (requestsInProgress === 0) {
                    $rootScope.httpCallInProgress = active;
                }
            };
 
            var requestHandler = function (config) {
                requiresGenericPreloader(config, function () {
                    setPreloader(true);
                    requestsInProgress++;
                });
                return config;
            };
 
            var responseHandler = function (response) {
                requiresGenericPreloader(response.config, function () {
                    requestsInProgress--;
                    setPreloader(false);
                });
                return response;
            };
 
            return {
                request: requestHandler,
                response: responseHandler,
                responseError: function (response) {
                    return $q.reject(responseHandler(response));
                }
            };
        }])
 
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('LoadingInterceptor');
        }]);
})();
