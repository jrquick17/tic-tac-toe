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
            'isGameOver',
            function(isGameOver) {
                ScoreboardController.isGameOver = isGameOver;
            }
        );

        $scope.$watch(
            'losses',
            function(losses) {
                if (ScoreboardController.losses < losses) {
                    ScoreboardController.lastResult = false;
                }

                ScoreboardController.losses = losses;
            }
        );

        $scope.$watch(
            'ties',
            function(ties) {
                if (ScoreboardController.ties < ties) {
                    ScoreboardController.lastResult = null;
                }

                ScoreboardController.ties = ties;
            }
        );

        $scope.$watch(
            'wins',
            function(wins) {
                if (ScoreboardController.wins < wins) {
                    ScoreboardController.lastResult = true;
                }

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