(function() {
    function CompletedCtrl($scope, $firebaseArray)
    {
        this.taskListTitle = "Task Archive";

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
            var sevenDays = 60000;    //604800000;
            tasks.forEach (function(task) {
               if (task.insertedDate < (todaysDateTime - sevenDays) ) {
                   task.expired = true;
                   task.active = false;
               }
            });
			
        });
    }
    angular
        .module('blocitoff')
        .controller('CompletedCtrl', ["$scope", "$firebaseArray", CompletedCtrl]);
})();

