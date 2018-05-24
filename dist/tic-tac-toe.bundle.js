(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function () {
    'use strict';

    angular.module('ticTacToe', []);
})();
(function () {
    'use strict';

    angular.module('ticTacToe', []);
})();
(function () {
    'use strict';

    angular.module('ticTacToe').service('TicTacToeService', TicTacToeService);

    TicTacToeService.$inject = ['$q'];

    function TicTacToeService($q) {
        var TicTacToeService = this;

        TicTacToeService.getWinner = getWinner;
        function getWinner(cells) {
            return $q.resolve().then(function () {
                // Horizontal
                if (cells[0] !== -1 && cells[0] === cells[1] && cells[1] === cells[2]) {
                    return cells[0];
                } else if (cells[3] !== -1 && cells[3] === cells[4] && cells[4] === cells[5]) {
                    return cells[3];
                } else if (cells[6] !== -1 && cells[6] === cells[7] && cells[7] === cells[8]) {
                    return cells[6];
                }

                // Vertical
                if (cells[0] !== -1 && cells[0] === cells[3] && cells[3] === cells[6]) {
                    return cells[0];
                } else if (cells[1] !== -1 && cells[1] === cells[4] && cells[4] === cells[7]) {
                    return cells[1];
                } else if (cells[2] !== -1 && cells[2] === cells[5] && cells[5] === cells[8]) {
                    return cells[2];
                }

                // Diagonal
                if (cells[0] !== -1 && cells[0] === cells[4] && cells[4] === cells[8]) {
                    return cells[0];
                } else if (cells[2] !== -1 && cells[2] === cells[4] && cells[4] === cells[6]) {
                    return cells[2];
                }

                for (var i = 0; i < 9; i++) {
                    if (cells[i] === -1) {
                        return null;
                    }
                }

                return -1;
            });
        }

        TicTacToeService.makeMove = makeMove;
        function makeMove(value, cells, difficulty) {
            return $q.resolve().then(function () {
                // if (typeof difficulty === 'undefined' || difficulty === 'easy') {
                //     return TicTacToeService.makeEasyMove(value, cells);
                // } else if (difficulty === 'hard') {
                return TicTacToeService.makeHardMove(value, cells);
                // }
            });
        }

        TicTacToeService.makeHardMove = makeHardMove;
        function makeHardMove(value, cells) {
            do {
                var random = Math.round(Math.random() * 9);

                if (cells[random] === -1 && cells[random] !== value) {
                    return random;
                }
            } while (true);
        }

        TicTacToeService.makeEasyMove = makeEasyMove;
        function makeEasyMove(value, cells) {
            do {
                var random = Math.round(Math.random() * 9);

                if (cells[random] === -1 && cells[random] !== value) {
                    return random;
                }
            } while (true);
        }

        TicTacToeService.reset = reset;
        function reset() {}

        TicTacToeService.reset();

        return TicTacToeService;
    }
})();
(function () {
    'use strict';

    angular.module('ticTacToe').controller('TicTacToeController', TicTacToeController);

    TicTacToeController.$inject = ['TicTacToeService'];

    function TicTacToeController(TicTacToeService) {
        var TicTacToeController = this;

        TicTacToeController.beginOpponentsTurn = beginOpponentsTurn;
        function beginOpponentsTurn() {
            return TicTacToeService.makeMove(TicTacToeController.opponenentValue, TicTacToeController.cells).then(function (cell) {
                if (cell !== null) {
                    TicTacToeController.cells[cell] = TicTacToeController.opponenentValue;

                    TicTacToeController.switchTurn();
                }
            });
        }

        TicTacToeController.beginUsersTurn = beginUsersTurn;
        function beginUsersTurn() {
            TicTacToeController.showMessage(false, 'IT IS YOUR TURN.');
        }

        TicTacToeController.select = select;
        function select(cell) {
            if (TicTacToeController.isUsersTurn) {
                if (TicTacToeController.cells[cell] === -1) {
                    TicTacToeController.cells[cell] = TicTacToeController.userValue;

                    TicTacToeController.switchTurn();
                } else {
                    TicTacToeController.showMessage(false, 'YOU CANNOT GO THERE!');
                }
            } else if (TicTacToeController.isGameOver) {
                TicTacToeController.showMessage(false, 'THE GAME IS ALREADY OVER.');
            } else {
                TicTacToeController.showMessage(false, 'SIMMER DOWN! IT\'S MY TURN STILL!');
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

        TicTacToeController.showMessage = showMessage;
        function showMessage(fromUser, message) {
            var selector = fromUser ? '.user' : '.opponent';

            $(selector).attr('data-content', message).popover('show');
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
            TicTacToeService.getWinner(TicTacToeController.cells).then(function (winner) {
                if (winner === TicTacToeController.opponenentValue) {
                    TicTacToeController.isGameOver = true;

                    TicTacToeController.showMessage(false, 'HAHA LOSER.');
                } else if (winner === TicTacToeController.userValue) {
                    TicTacToeController.isGameOver = true;

                    TicTacToeController.showMessage(false, 'GOOD JOB.');
                } else if (winner === -1) {
                    TicTacToeController.isGameOver = true;

                    TicTacToeController.showMessage(false, 'WE TIED.');

                    TicTacToeController.showMessage(true, 'WE TIED.');
                } else {
                    TicTacToeController.isUsersTurn = !TicTacToeController.isUsersTurn;

                    if (TicTacToeController.isUsersTurn) {
                        TicTacToeController.beginUsersTurn();
                    } else {
                        TicTacToeController.beginOpponentsTurn();
                    }
                }
            });
        }

        TicTacToeController.reset = reset;
        function reset() {
            TicTacToeController.cells = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

            TicTacToeController.isGameOver = false;

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
(function () {
    'use strict';

    angular.module('ticTacToe').directive('ticTacToe', ticTacToe);

    function ticTacToe() {
        return {
            controller: 'TicTacToeController',
            controllerAs: 'ctrl',
            restrict: 'E',
            scope: {},
            template: '<div class="global"><div class="players row"><a class="opponent col-6" tabindex="0" data-content data-placement="right" data-toggle="popover" data-trigger="focus"><img src="img/opponent.png"></a> <a class="user col-6" tabindex="1" data-content data-placement="left" data-toggle="popover" data-trigger="focus"><img src="img/user.png"></a></div><div class="board row"><div data-ng-repeat="cell in ctrl.cells track by $index" class="col-4 cell" data-ng-class="{ \'empty-cell\': cell === -1, \'opponent-x-cell\': cell === 0 && ctrl.opponenentValue === 0, \'opponent-o-cell\': cell === 1 && ctrl.opponenentValue === 1, \'user-x-cell\': cell === 0 && ctrl.userValue === 0, \'user-o-cell\': cell === 1 && ctrl.userValue === 1 }" data-ng-click="ctrl.select($index)"></div></div></div>'
        };
    }
})();

},{}]},{},[1]);

//# sourceMappingURL=tic-tac-toe.bundle.js.map
