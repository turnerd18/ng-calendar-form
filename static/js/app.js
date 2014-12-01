angular.module('calendarGenerator', [])
	.controller('calendarController', ['$scope', function ($scope) {
		var getCalendarDates = function (year, month) {
			var firstDay = new Date(year, month, 1);
			var dayOfWeek = firstDay.getDay();
			if (dayOfWeek != 0) {
				firstDay.setDate(firstDay.getDate() - dayOfWeek);
			}
			
			var dates = [];
			for (var i = 0; i < 6; i++) {
				var week = [];
				for (var j = 0; j < 7; j++) {
					var nextDate = new Date(firstDay);
					nextDate.setDate(nextDate.getDate() + ((i*7)+j));
					week.push(nextDate);
				}
				dates.push(week);
			}
			return dates;
		};
		
		$scope.daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		$scope.monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		
		var today = new Date();
		$scope.month = today.getMonth();
		$scope.year = today.getFullYear();
		
		$scope.addMonth = function () { 
			if ($scope.month == 11) {
				$scope.month = 0;
				$scope.year++;
			} else {
				$scope.month++;
			}
			$scope.resetDates();
		};
		
		$scope.subtractMonth = function () { 
			if ($scope.month == 0) {
				$scope.month = 11;
				$scope.year--;
			} else {
				$scope.month--;
			}
			$scope.resetDates();
		};
		
		$scope.resetDates = function () {
			var monthDates = getCalendarDates($scope.year, $scope.month);
			
			if ($scope.dates) {
				while ($scope.dates.length) {
					$scope.dates.pop();
				}
				monthDates.forEach(function (week) {$scope.dates.push(week);});
			} else {
				$scope.dates = monthDates;
			}			
		};
		
		$scope.resetDates();
	}]);
	
Date.prototype.shortFormat = function () {
	return (this.getMonth() + 1) + "/" + this.getDate() + "/" + this.getFullYear();
};