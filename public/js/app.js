angular.module("contactsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("SudakaService", function($http) {
        this.addSudaka = function(sudaka) {
          return $http.post("/api/sudaka", sudaka).
            then(function(response) {
                return response;
            }, function(response) {
                console.log(response)
            });
        }
    })
    .controller("MainController", function($scope, SudakaService) {
      $scope.addSudaka = function() {
        if ($scope.sudakaForm || $scope.sudakaForm.$invalid) {
              $scope.showSudakaMachine = true;
              var _this = this;
              var sudakaData = $scope.sudaka;
              SudakaService.addSudaka(sudakaData);
              $scope.clearSudaka();
          }
      }

      $scope.clearSudaka = function() {
        $scope.sudaka = null
      }
      var machine4 = $("#casino1").slotMachine({
        active	: 0,
        delay	: 500
      });

      var machine5 = $("#casino2").slotMachine({
        active	: 1,
        delay	: 500
      });

      var machine6 = $("#casino3").slotMachine({
        active	: 2,
        delay	: 500
      });

      var started = 0;
      $scope.wins = 0;
      $("#slotMachineButtonShuffle").click(function(){
        started = 3;
        $scope.trickMachine()
        machine4.shuffle(5);
        machine5.shuffle(5);
        machine6.shuffle(5);
        setTimeout(function() {
          $scope.publishResult()
        }, 3600)
      });

      $scope.trickMachine = function() {
        $scope.rounds = $scope.rounds + 1;
        var win = $scope.getRandomBoolean();
        if($scope.rounds > 100){
          $scope.rounds = 0
        }
        if(win === 1) {
          machine4.futureActive = 5
          machine5.futureActive = 5
          machine6.futureActive = 5
        }
        if(win === 2) {
          machine4.futureActive = 3
          machine5.futureActive = 3
          machine6.futureActive = 3
        }
      }
      $scope.getRandomBoolean = function() {
        var sudakaChances = [];
        for(var i=0 ; i< 99 ; i++) {
          sudakaChances.push(0);
        }
        sudakaChances.push(1);
        var sudakaRandom = Math.floor(Math.random() * sudakaChances.length);
        if(sudakaChances[sudakaRandom] === 1) {
          return sudakaChances[sudakaRandom];
        }
        var besosChances = [];
        for(var i=0 ; i< 999 ; i++) {
          besosChances.push(0);
        }
        besosChances.push(2);
        var besosRandom = Math.floor(Math.random() * sudakaChances.length);
        return besosChances[besosRandom]
      }

      $scope.publishResult = function() {
          if(machine4.active === machine5.active && machine5.active === machine6.active) {
            if(machine4.active === 5) {
              $scope.result = "Congratulations you’ve won a FREE ticket for Sudaka Dantesque claim it with the staff!"
            } else {
              $scope.result = "Congratulations you’ve won a $50 dollars voucher for Besos Latinos! Claim your prize with the staff!"
            }

          }else {
            $scope.result = "Sorry you are not a winner this time but we will send you a little gift at your email ;) Enjoy the party!"
          }
          $scope.$apply()
          var _this = $scope;
          setTimeout(function() {
              _this.showSudakaMachine = false;
              _this.result = "";
              _this.$apply();
          }, 3600)
      }
    });
