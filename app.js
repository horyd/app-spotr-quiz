angular.module('appspotr',[])
.constant('URL', 'https://api2.appspotr.com/givemeachallenge')
.controller('MainCtrl', function ($q, $scope, $http, URL) {
	
	var findOddOne = function (quiz) {
		var l = quiz.length,
		i = Math.floor(l/2),
		oddHalves = i % 2;
		// iteration end cases
		if (quiz[i] != quiz[i+1] && quiz[i] != quiz[i-1]) return quiz[i];
		if (l === 3) {
			if (quiz[0] === quiz[1]) return quiz[2];
			return quiz[0];
		}
		// iteration perpetuators
		if (quiz[i] === quiz[i+1] && oddHalves) return findOddOne(quiz.slice(0,i));
		if (quiz[i] === quiz[i+1] && !oddHalves) return findOddOne(quiz.slice(i));
		if (quiz[i] === quiz[i-1] && oddHalves) return findOddOne(quiz.slice(i+1));
		if (quiz[i] === quiz[i-1] && !oddHalves) return findOddOne(quiz.slice(0,i+1));
	}

	$scope.solveQuiz = function (postcode) {
		$http.get(URL)
		.then(function (data) {
			var quiz = data.data.quiz;
			quiz.sort();
			$scope.answer = findOddOne(quiz);
		})
	}
})