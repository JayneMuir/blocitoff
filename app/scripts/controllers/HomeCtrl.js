(function() {
    function HomeCtrl($scope, $firebaseArray)
    {
        this.taskListTitle = "Current Tasks";

        var ref = blocitoffDB.database().ref();

        var tasks = $firebaseArray(ref);

        // console log the array of tasks when loaded
        tasks.$loaded(function(data){
            $scope.tasks = tasks;
            console.log($scope.tasks);

            // check for InsertedDate - see if that value is greater than 7 days in ms
            // and then set its expired property to true
            // timestamp for today's date
            var todaysDateTime = new Date().getTime();
            // 7 days in ms
            var sevenDays = 604800000;
            tasks.forEach (function(task) {
               if (task.insertedDate < (todaysDateTime - sevenDays) ) {
                   task.expired = true;
                   task.active = false;
               }
            });

        })

        // add a task
        $scope.addTask = function () {
            var todaysDateTime = new Date();
            var newTask = {
              description: $scope.newTaskDescription,
              dateString: todaysDateTime.toDateString(),
              insertedDate: todaysDateTime.getTime(),
              expired: false,
              active: true,
              completed: false,
              priority: $scope.newTaskPriority
            };

            tasks.$add(newTask).then(function(ref) {
                console.log("added record with insertedDate " + newTask.insertedDate);
            });

            $scope.newTaskDescription = "";
        };

        // remove task
	   $scope.removeTask = function (task) {
            tasks.$remove(task).then(function(ref) {
                console.log("removed record with description " + task.description);
            });
        };

        // toggle complete task
	   $scope.toggleComplete = function (task) {
           if (task.completed){
             task.active = false;
            tasks.$save(task);
           }
        };
    }
    angular
        .module('blocitoff')
        .controller('HomeCtrl', ["$scope", "$firebaseArray", HomeCtrl]);
})();
