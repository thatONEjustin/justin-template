//Basic routing, I made this a 1 page site so I load everything through 
//pages/home.html
var app = angular.module('portfolio-site', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })
        .otherwise({ redirectTo: '/' });
}]);

//Basically my use of MainController mirrors an old technique I used to do 
//with an init function that ran when $(document).ready() would fire. 
app.controller('MainController', function ($scope, $http, GetContent) {

    try {

        Typekit.load({ async: true });

        //I chose to load the .json data here making it part of the main load process. 
        GetContent.getJson('./data/content.json').then(function (data) {
            $scope.content = data;
        });
    
        GetContent.getJson('./data/projects.json').then(function (data) {
            $scope.projects = data; 
        });

    } catch (err) {

        console.log(err);

    }

});

app.controller('HomeController', function ($scope) {

    //Here I set the $scope variables from the $scope.content data derived from content.json
    $scope.title = $scope.content.title;
    $scope.tagline = $scope.content.tagline;
    $scope.disclaimer = $scope.content.disclaimer;
    $scope.mission = $scope.content.mission;
    $scope.statement = $scope.content.statement;
    $scope.languageTitle = $scope.content.languageTitle;
    $scope.languages = $scope.content.languages;
    $scope.projectTitle = $scope.content.projectTitle;

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