(function() {
    'use strict';

    angular.module('ticTacToe', []);
})();
(function() {
    'use strict';

    angular.module('ticTacToe', []);
})();
(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'TicTacToeService',
        TicTacToeService
    );

    TicTacToeService.$inject = [
        '$q'
    ];

    function TicTacToeService(
        $q
    ) {
        var TicTacToeService = this;

        TicTacToeService.getWinner = getWinner;
        function getWinner(cells) {
            return $q.resolve().then(
                function() {
                    // Horizontal
                    if (cells[0] === cells[1] && cells[1] === cells[2]) {
                        return cells[0];
                    } else if (cells[3] === cells[4] && cells[4] === cells[5]) {
                        return cells[3];
                    } else if (cells[6] === cells[7] && cells[7] === cells[8]) {
                        return cells[6];
                    }

                    // Vertical
                    if (cells[0] === cells[3] && cells[3] === cells[6]) {
                        return cells[0];
                    } else if (cells[1] === cells[4] && cells[4] === cells[7]) {
                        return cells[1];
                    } else if (cells[2] === cells[5] && cells[5] === cells[8]) {
                        return cells[2];
                    }

                    // Diagonal
                    if (cells[0] === cells[4] && cells[4] === cells[8]) {
                        return cells[0];
                    } else if (cells[2] === cells[4] && cells[4] === cells[6]) {
                        return cells[2];
                    }

                    return null;
                }
            );
        }
        
        TicTacToeService.makeMove = makeMove;
        function makeMove(value, cells, difficulty) {
            return $q.resolve().then(
                function() {
                    if (typeof difficulty === 'undefined' || difficulty === 'easy') {
                        do {
                            var random = Math.round(Math.random() * 9);

                            if (cells[random] === -1 && cells[random] !== value) {
                                return random;
                            }
                        } while (true);
                    }
                }
            );
        }

        TicTacToeService.reset = reset;
        function reset() {

        }
        
        TicTacToeService.reset();

        return TicTacToeService;
    }
})();
(function() {
    'use strict';

    angular.module('ticTacToe').controller(
        'TicTacToeController',
        TicTacToeController
    );

    TicTacToeController.$inject = [
        'TicTacToeService'
    ];

    function TicTacToeController(
        TicTacToeService
    ) {
        var TicTacToeController = this;

        TicTacToeController.beginOpponentsTurn = beginOpponentsTurn;
        function beginOpponentsTurn() {
            return TicTacToeService.makeMove(
                TicTacToeController.opponenentValue,
                TicTacToeController.cells
            ).then(
                function(cell) {
                    if (cell !== null) {
                        TicTacToeController.cells[cell] = TicTacToeController.opponenentValue;

                        TicTacToeController.switchTurn();
                    }
                }
            );
        }

        TicTacToeController.beginUsersTurn = beginUsersTurn;
        function beginUsersTurn() {
            alert('Your turn.');
        }

        TicTacToeController.select = select;
        function select(cell) {
            if (TicTacToeController.isUsersTurn) {
                TicTacToeController.cells[cell] = TicTacToeController.userValue;

                TicTacToeController.switchTurn();
            }
        }

        TicTacToeController.setOrder = setOrder;
        function setOrder() {
            var random = Math.floor(Math.random() * 100);
            if (random % 2 === 0) {
                TicTacToeController.opponenentValue = 0;
                TicTacToeController.userValue = 1;
                TicTacToeController.isUsersTurn = true;
            } else {
                TicTacToeController.opponenentValue = 1;
                TicTacToeController.userValue = 0;
                TicTacToeController.isUsersTurn = false;
            }
        }

        TicTacToeController.start = start;
        function start() {
            TicTacToeController.setOrder();

            if (TicTacToeController.isUsersTurn) {
                TicTacToeController.beginUsersTurn();
            } else {
                TicTacToeController.beginOpponentsTurn();
            }
        }

        TicTacToeController.switchTurn = switchTurn;
        function switchTurn() {
            TicTacToeService.getWinner(
                TicTacToeController.cells
            ).then(
                function(winner) {
                    if (winner === TicTacToeController.opponenentValue) {
                        alert('Haha loser!');
                    } else if (winner === TicTacToeController.userValue) {
                        alert('Beginner\'s luck!');
                    } else {
                        TicTacToeController.isUsersTurn = !TicTacToeController.isUsersTurn;

                        if (TicTacToeController.isUsersTurn) {
                            TicTacToeController.beginUsersTurn();
                        } else {
                            TicTacToeController.beginOpponentsTurn();
                        }
                    }
                }
            );
        }

        TicTacToeController.reset = reset;
        function reset() {
            TicTacToeController.cells = [
                -1, -1, -1,
                -1, -1, -1,
                -1, -1, -1
            ];

            TicTacToeController.opponenentValue = 1;

            TicTacToeController.stats = false;

            TicTacToeController.userValue = 0;

            TicTacToeController.isUsersTurn = false;
        }

        TicTacToeController.init = init;
        function init() {
            TicTacToeController.reset();
            TicTacToeController.start();
        }

        TicTacToeController.init();
    }
})();
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
            template:'<div class="board"><div>{{ ctrl.isUsersTurn ? \'YOUR TURN\' : \'OPPONENT\\\'S TURN\' }} <span data-ng-if="!ctrl.isUsersTurn">(YOUR OPPONENT IS THINKING...)</span><div class="row"><div data-ng-repeat="cell in ctrl.cells track by $index" class="col-4" data-ng-class="{ \'disabled\': !ctrl.isUsersTurn || cell !== -1, \'x-cell\': cell === 0, \'o-cell\': cell === 1 }" data-ng-click="ctrl.select($index)">{{ cell }}</div></div></div></div>'
        };
    }
})();