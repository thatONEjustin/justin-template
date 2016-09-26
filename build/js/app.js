//Basic routing, I made this a 1 page site so I load everything through 
//pages/home.html
var app = angular.module('portfolio-site', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            active: 'home'
        })
        .when('/page', {
            templateUrl: 'pages/page.html',
            controller: 'PageController',
            active: 'page'
        })
        .otherwise({ redirectTo: '/' });

}]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {

    $scope.$on("$routeChangeSuccess", function (scope, next, current) {
        $scope.active = $route.current.active;
    });
    
}]);


//Basically my use of MainController mirrors an old technique I used to do 
//with an init function that ran when $(document).ready() would fire. 
app.controller('MainController', function ($scope, $http, $route, GetContent) {

    try {

        Typekit.load({ async: true });        

        $scope.$on("$routeChangeSuccess", function (scope, next, current) {
            $scope.active = $route.current.active;
        });

    } catch (err) {

        console.log(err);

    }

});

app.controller('HomeController', function ($scope) {

        

});

app.controller('PageController', function ($scope) {

    

});

//Created a custom service to be able to load .JSON files into variables. the way this promise is set up 
//is so that files aren't loaded and code is run before the data is there.
app.service('GetContent', function ($http) {
    return {
        getJson : function(url) {
            return $http.get(url).then(function (response) {
                //console.log(response.data);
                return response.data;
            });
        }
    }
});