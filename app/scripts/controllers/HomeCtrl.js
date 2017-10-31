(function() {
    function HomeCtrl($scope, $firebaseArray)
    {
        this.taskListTitle = "To Do List";

        var ref = blocitoffDB.database().ref();

        var tasks = $firebaseArray(ref);

        // console log the array of tasks when loaded
        tasks.$loaded(function(data){
          $scope.tasks = tasks;
          console.log($scope.tasks);

          // check for InsertedDate - see if that value is greater than 60000 (a minute, in ms)
          // and then set its expired property to true
        })

        // make the tasks available in the DOM
        // $scope.tasks = tasks;

        // add a task
        $scope.addTask = function () {
            var todaysDateTime = new Date();
            var newTask = {
              Description: $scope.newTaskDescription,
              DateString: todaysDateTime.toDateString(),
              InsertedDate: todaysDateTime.getTime(),
              Expired: false
            };

            tasks.$add(newTask).then(function(ref) {
                console.log("added record with description " + newTask.InsertedDate);
            });

            $scope.newTaskDescription = "";
        };

        // remove task
	   $scope.removeTask = function (task) {
            tasks.$remove(task).then(function(ref) {
                console.log("removed record with description " + task.Description);
            });
        };
    }
    angular
        .module('blocitoff')
        .controller('HomeCtrl', ["$scope", "$firebaseArray", HomeCtrl]);
})();
