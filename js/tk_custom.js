var $scope, $location;
var app = angular.module('tkWebPageApp', ['duScroll', 'ngRoute', 'ui.bootstrap']);
var cur_page;


app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'home.html',
    controller  : 'tkWebPagCtrl'
  })

  .when('/projects', {
    templateUrl : 'projects.html',
    controller  : 'tkWebPagCtrl'
  })

  .when('/background', {
    templateUrl : 'background.html',
    controller  : 'tkWebPagCtrl'
  })

  .otherwise({redirectTo: '/'});
});

app.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop-30;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

});


app.controller('tkWebPagCtrl', function($scope, $location, anchorSmoothScroll) {
  $scope.gotoElement = function (eID){
    // set the location.hash to the id of
    // the element you wish to scroll to.
    //$location.hash('/bottom');

    // call $anchorScroll()
    anchorSmoothScroll.scrollTo(eID);

  };

  var num_of_cards = 3;

  $scope.var_style = "card";
  var flipped = [];
  $scope.flipped = []
  for(var i;i<num_of_cards;i++) {
    $scope.flipped[i] = false;
  }

  $scope.flipCard = function(index) {
    $scope.flipped[index] = !$scope.flipped[index];
  }

  $scope.path = $location.path();
  if ($scope.path == "/projects"){
    $scope.about_active = false;
    $scope.background_active = false;
    $scope.projects_active = true;
  }
  else if ($scope.path == "/background") {
    $scope.about_active = false;
    $scope.background_active = true;
    $scope.projects_active = false;
  }
  else {
    $scope.about_active = true;
    $scope.background_active = false;
    $scope.projects_active = false;
  }

  $scope.activate = function(label) {
    if (label == 'about_active') {
      $scope.about_active = true;
      $scope.background_active = false;
      $scope.projects_active = false;
    }
    else if (label == 'projects_active') {
      $scope.about_active = false;
      $scope.background_active = false;
      $scope.projects_active = true;
    }
    else if (label == 'background_active') {
      $scope.about_active = false;
      $scope.background_active = true;
      $scope.projects_active = false;
    }
  }

});
