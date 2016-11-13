// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']).factory('myService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

});

addCtrl.controller('addCtrl', function($scope, $http,$rootScope, geolocation, gservice, myService)
{

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    // Functions
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = " ";
        });
    });

    //got to record page
    $scope.goToRecord = function() {
        $location.path( '/problemRecords.html' );
    };

    // funtion get all record from db
    // Perform an AJAX call to get all of the records in the db.
    $http.get('/users').success(function(response){
        $scope.userInfo = response;
        console.log($scope.userInfo);

    }).error(function(){});

    //function get on problem to create project
    $scope.getUserForPost = function(object){
        myService.set(object);
    };

    $scope.isVoted = function(user,vote){
        user.votes += vote;

        var userData = {
            _id : user._id,
            username: user.username,
            gender: user.gender,
            age: user.age,
            votes : user.votes,
            favlang: user.favlang,
            location: [user.location[0], user.location[1]],
            htmlverified: user.htmlverified
        };

        // Saves the user data to the db
        $http.put('/users', userData)
            .success(function (data) {
                console.log('Success: ' + data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $scope.createUser = function() {

        // Grabs all of the text box fields
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            votes : 2,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";


                // Refresh the map with new data
                // gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        // Refresh the map with new data
        //gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
        //$scope.goToRecord();
    };
});