

var orderApp = angular.module('orderApp', ['ngRoute']);

// configure our routes
orderApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'index.html',
                    })

        
});
