'use strict';


angular.module('tpAngularApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    //variables
    $scope.itenerary_title = "Please Select a Day: ";
    $scope.curDay = {};
    $scope.dayPlans = [];


    //gets
    $http.get('/api/hotels').success(function(hotels) {
      $scope.hotels = hotels;
      socket.syncUpdates('hotels', $scope.hotels);
    });

    $http.get('/api/restaurants').success(function(restaurants) {
      $scope.restaurants = restaurants;
      socket.syncUpdates('restaurants', $scope.restaurants);
    });

    $http.get('/api/thingtodos').success(function(thingtodos) {
      $scope.thingtodos = thingtodos;
      socket.syncUpdates('thingtodos', $scope.thingtodos);
    });

    $http.get('/api/dayPlans').success(function(dayPlans) {
      $scope.dayPlans = dayPlans;
      socket.syncUpdates('dayPlans', $scope.dayPlans);
      $scope.curDay = $scope.dayPlans[0];
      //select day 1 button at top of page
      //apply markers for day
    });

    $scope.selectDay = function(clickedDayNum){
      $scope.curDay = $scope.dayPlans[clickedDayNum-1];
      //populate itenerary
    }
    //add day
    $scope.addDay = function(){
      $scope.aDay = {dayNum: $scope.dayPlans.length+1,
                      hotels:[],
                      restaurants:[],
                      things: []}
      $scope.dayPlans.push($scope.aDay);
      $http.post('/api/dayPlans',$scope.aDay).success(function(day) {
        $scope.dayPlans[$scope.dayPlans.length-1]._id = day._id;
      });
    }

    //dropdowns
    $scope.addtoHotel = function(){
      $scope.curDay.hotels.push($scope.currHotel);
      $http.post('/api/dayPlans/'+$scope.curDay._id+"/activity/hotels/"+$scope.currHotel._id)
        .success(function(data) {});
    }

    $scope.addtoRestaurant = function() {
      $scope.curDay.restaurants.push($scope.currRestaurant);

      $http.post('/api/dayPlans/'+$scope.curDay._id+"/activity/restaurants/"+$scope.currRestaurant._id)
        .success(function(data) {});
    }

     $scope.addtoThing = function() {
      $scope.curDay.things.push($scope.currThing);
      $http.post('/api/dayPlans/'+$scope.curDay._id+"/activity/things/"+$scope.currThing._id)
        .success(function(data){});
    }

    $scope.getByTypeId = function(type, id){
      var typeArr = $scope[type]
      for (var i = 0; i<typeArr.length; i++) {
        if(typeArr[i]._id.toString() == id.toString()){
          return typeArr[i];
        }
      };
      return undefined;
    }

  });
