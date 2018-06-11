(function() {
    'use strict';

    angular.module('ticTacToe').controller(
        'ScoreboardController',
        ScoreboardController
    );

    ScoreboardController.$inject = [
        '$scope'
    ];

    function ScoreboardController(
        $scope
    ) {
        var ScoreboardController = this;

        $scope.$watch(
            'losses',
            function(losses) {
                ScoreboardController.losses = losses;
            }
        );

        $scope.$watch(
            'ties',
            function(ties) {
                ScoreboardController.ties = ties;
            }
        );

        $scope.$watch(
            'wins',
            function(wins) {
                ScoreboardController.wins = wins;
            }
        );

        ScoreboardController.reset = reset;
        function reset() {

        }

        ScoreboardController.init = init;
        function init() {
            ScoreboardController.reset();
        }

        ScoreboardController.init();
    }
})();