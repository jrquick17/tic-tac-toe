(function() {
    'use strict';

    angular.module('ticTacToe').directive(
        'board',
        board
    );

    function board() {
        return {
            controller:   'BoardController',
            controllerAs: 'ctrl',
            restrict:     'E',
            scope:        {
                cells:     '=',
                onClick:   '=',
                userValue: '='
            },
            template:'<div class="board row animated zoomIn"><div data-ng-repeat="cell in ctrl.cells track by $index" class="col-4 cell" data-ng-class="{ \'empty-cell\': cell === -1, \'animated fadeIn\': cell !== -1, \'opponent-x-cell\': cell === 0 && ctrl.opponentValue === 0, \'opponent-o-cell\': cell === 1 && ctrl.opponentValue === 1, \'user-x-cell\': cell === 0 && ctrl.userValue === 0, \'user-o-cell\': cell === 1 && ctrl.userValue === 1 }" data-ng-click="ctrl.click($index)"></div></div>'
        };
    }
})();