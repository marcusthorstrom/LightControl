angular.module('Lights').controller('AddLights', ["$http", "$scope", function($http, $scope){
  $scope.save = function(light) {
    console.log(light);
  };
}]);

angular.module('Lights').controller('LightsGrid', ["$http", "$scope", function($http, $scope){
  $scope.on = function(light) {
    $http.post("/"+light.channel+"/"+light.number+"/on").then(function() {
      console.log("Turned on");
    }, function(err) {
      console.log(err);
    });
  };

  $scope.off = function(light) {
    $http.post("/"+light.channel+"/"+light.number+"/off").then(function() {
      console.log("Turned off");
    }, function(err) {
      console.log(err);
    });
  }


  $scope.lights = [
    {
      name:"Sovrum",
      channel:"A",
      number:"3"
  },
  {
    name:"Dator",
    channel:"A",
    number:"2"
  },
  {
    name:"Tv-rum",
    channel:"A",
    number:"1"
  },
  {
    name:"Kaffebryggare",
    channel:"B",
    number:"1"
  }
];

console.log($scope.lights);

}]);
