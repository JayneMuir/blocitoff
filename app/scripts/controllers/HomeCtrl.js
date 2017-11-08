(function() {
    function HomeCtrl($scope, FirebaseService)
    {
        this.taskListTitle = "Current Tasks";
        
        FirebaseService.load();
        this.tasks = FirebaseService.getTasks();

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

            FirebaseService.addTask(newTask);
            $scope.newTaskDescription = "";
        };

        // remove task
	   $scope.removeTask = function (task) {
           FirebaseService.removeTask(task);
        };

        // toggle complete task
	   $scope.toggleComplete = function (task) {
           FirebaseService.completeTask(task);
        };
        
        $scope.tasks = this.tasks;
    }
    angular
        .module('blocitoff')
        .controller('HomeCtrl', ["$scope", "FirebaseService", HomeCtrl]);
})();
