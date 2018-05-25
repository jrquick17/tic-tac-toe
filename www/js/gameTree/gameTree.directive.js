(function() {
    'use strict';

    angular.module('ticTacToe').directive(
        'gameTree',
        gameTree
    );

    function gameTree() {
        return {
            controller:   'GameTreeController',
            controllerAs: 'ctrl',
            restrict:     'E',
            scope:        {},
            template:'<div><div class="row"><board class="col" cells="ctrl.tree.parentNode.cells" user-value="ctrl.tree.parentNode.value"></board></div><div class="row" data-ng-repeat="child in ctrl.tree.parentNode.children"><div class="col"><board cells="child.cells" user-value="ctrl.tree.parentNode.value"></board></div></div></div>'
        };
    }
})();