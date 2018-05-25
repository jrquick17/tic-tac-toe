(function() {
    'use strict';

    angular.module('ticTacToe').controller(
        'BoardController',
        BoardController
    );

    BoardController.$inject = [
        'OpponentService',
        '$scope',
        'TicTacToeService'
    ];

    function BoardController(
        OpponentService,
        $scope,
        TicTacToeService
    ) {
        var BoardController = this;

        $scope.$watch(
            'cells',
            function(cells) {
                BoardController.cells = cells;
            }
        );

        $scope.$watch(
            'onClick',
            function(onClick) {
                BoardController.onClick = onClick;
            }
        );

        $scope.$watch(
            'userValue',
            function(userValue) {
                BoardController.opponentValue = TicTacToeService.getOtherValue(
                    userValue
                );

                BoardController.userValue = userValue;
            }
        );

        BoardController.click = click;
        function click(where) {
            BoardController.onClick(where);
        }

        BoardController.reset = reset;
        function reset() {

        }

        BoardController.init = init;
        function init() {
            BoardController.reset();
        }

        BoardController.init();
    }
})();