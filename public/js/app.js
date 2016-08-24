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
                alert("Error creating contact.");
            });
        }
    })
    .controller("MainController", function($scope, SudakaService) {
      $scope.addSudaka = function() {
        if ($scope.sudakaForm || $scope.sudakaForm.$invalid) {
              $scope.showSudakaMachine = true;
              var _this = this;
              // SudakaService.addSudaka($scope.sudaka).then(function(b) {
              //     console.log('success',b)
              // }, function(error) {
              //   console.log('error', error)
              // })
          }
      }

      $scope.wins = 0
      $scope.rounds = 0
      $scope.machine1 = jQuery("#machine1").slotMachine({
        active: 0,
        delay: 500
      })
      $scope.machine2 = jQuery("#machine2").slotMachine({
        active: 1,
        delay: 500,
        direction: "down"
      })
      $scope.machine3 = jQuery("#machine3").slotMachine({
        active: 2,
        delay: 500
      })

      $scope.play = function() {
        $scope.trickMachine(), jQuery("#slotMachineButton1").click(function() {
            $scope.machine1.shuffle(5, $scope.onComplete), setTimeout(function() {
                $scope.machine2.shuffle(5, $scope.onComplete)
            }, 500), setTimeout(function() {
                $scope.machine3.shuffle(5, $scope.onComplete)
            }, 1e3), setTimeout(function() {
                $scope.publishResult()
            }, 4e3)
        })
      }

      $scope.trickMachine = function(a, b) {
        $scope.rounds = $scope.rounds + 1;
        var c = $scope.getRandomBoolean();
        $scope.rounds > 100 && ($scope.rounds = 0), c && $scope.wins < 3 && ($scope.wins = $scope.wins + 1, $scope.machine1.futureActive = 0, $scope.machine2.futureActive = 0, $scope.machine3.futureActive = 0)
      }

      $scope.getRandomBoolean = function() {
        var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            b = Math.floor(Math.random() * a.length);
        return a[b]
      }
      $scope.publishResult = function() {
          jQuery("#machine1Result").text() === jQuery("#machine2Result").text() && jQuery("#machine2Result").text() === jQuery("#machine3Result").text() ? $scope.result = "Heeey you won an entry ticket!" : $scope.result = "Sorry you are not a winner, Enjoy the party!", $scope.$apply();
          var _this = $scope;
          setTimeout(function() {
              _this.showSudakaMachine = false;
              _this.result = "";
              _this.$apply();
          }, 500)
      }
    })
    .controller("NewContactController", function($scope, $location) {
        $scope.back = function() {
            $location.path("#/");
        }
    });
