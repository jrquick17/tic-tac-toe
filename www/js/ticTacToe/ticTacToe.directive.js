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
            template:'<div class="global"><div class="players row"><a class="opponent col-6" tabindex="0" data-content data-placement="right" data-toggle="popover" data-trigger="focus"><img src="img/opponent.png"></a> <a class="user col-6" tabindex="1" data-content data-placement="left" data-toggle="popover" data-trigger="focus"><img src="img/user.png"></a></div><board cells="ctrl.cells" on-click="ctrl.select" user-value="ctrl.userValue"></board><game-tree></game-tree></div>'
        };
    }
})();