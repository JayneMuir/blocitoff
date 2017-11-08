(function() {
     function FirebaseService($firebaseArray) {
         var FirebaseService = {};
         var ref = null;
         var tasks = null;
         
         var currentDatabase = null;
        FirebaseService.load = function() {
             if(!currentDatabase) {
                currentDatabase = blocitoffDB.database();
                ref = currentDatabase.ref();
                tasks = $firebaseArray(ref);
             }
            // console log the array of tasks when loaded
            tasks.$loaded(function(data){
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
         };
         
         FirebaseService.addTask = function(task) {
             if(!currentDatabase) {
                currentDatabase = blocitoffDB.database();
                ref = currentDatabase.ref();
                tasks = $firebaseArray(ref);
             }
             tasks.$add(task).then(function(ref) {
                 console.log("added record with insertedDate " + task.insertedDate);
            });
         };
         FirebaseService.removeTask = function(task) {
            if(!currentDatabase) {
                currentDatabase = blocitoffDB.database();
                ref = currentDatabase.ref();
                tasks = $firebaseArray(ref);
            }
            tasks.$remove(task).then(function(ref) {
                console.log("removed record with description " + task.description);
            });            
         };
         
         FirebaseService.completeTask = function(task) {
             if(!currentDatabase) {
                currentDatabase = blocitoffDB.database();
                ref = currentDatabase.ref();
                tasks = $firebaseArray(ref);
             }
             if (task.completed){
                task.active = false;
                tasks.$save(task);
            }
         };
         
         FirebaseService.getTasks = function() {
             if(!currentDatabase) {
                currentDatabase = blocitoffDB.database();
                ref = currentDatabase.ref();
                tasks = $firebaseArray(ref);
             }   
             return tasks;
         }
         
         return FirebaseService;
     }
 
     angular
         .module('blocitoff')
         .factory('FirebaseService', ['$firebaseArray', FirebaseService]);
 })();