(function() {
    'use strict';

    angular.module('ticTacToe').directive(
        'ticTacToe',
        ticTacToe
    );

    function ticTacToe() {
        return {
            controller:   'TicTacToeController',
            controllerAs: 'ctrl',
            restrict:     'E',
            scope:        {},
            template:'<div class="global"><div class="players row"><a class="opponent col-6" tabindex="0" data-content data-placement="right" data-toggle="popover" data-trigger="focus"><img src="img/opponent.png"></a> <a class="user col-6" tabindex="1" data-content data-placement="left" data-toggle="popover" data-trigger="focus"><img src="img/user.png"></a></div><div class="board row"><div data-ng-repeat="cell in ctrl.cells track by $index" class="col-4 cell" data-ng-class="{ \'empty-cell\': cell === -1, \'opponent-x-cell\': cell === 0 && ctrl.opponenentValue === 0, \'opponent-o-cell\': cell === 1 && ctrl.opponenentValue === 1, \'user-x-cell\': cell === 0 && ctrl.userValue === 0, \'user-o-cell\': cell === 1 && ctrl.userValue === 1 }" data-ng-click="ctrl.select($index)"></div></div></div>'
        };
    }
})();