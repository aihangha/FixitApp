// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.
var addProject = angular.module('addProject', ['geolocation', 'gservice']);
addProject.controller('addProject', function($scope, $http,$rootScope, geolocation, gservice){
    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US

    // Functions
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
            $scope.formData.htmlverified = "WHOOOPS 0_0  This location has not been HTML Verified! ";
        });
    });

    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $scope.createProject = function() {

        // Grabs all of the text box fields
        var userData = {
            userid : $scope.formData.userid,
            username: $scope.formData.username,
            teammates: $scope.formData.teammates,
            description: $scope.formData.description,
            equipment_needed: $scope.formData.equipment_needed,
            deadline: $scope.formData.deadline,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/projects', userData)

            .success(function (data) {
            //redirect
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        // Refresh the map with new data
        //gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
    };
});