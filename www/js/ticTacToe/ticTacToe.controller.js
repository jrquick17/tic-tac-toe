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
            TicTacToeController.showMessage(
                false,
                'IT IS YOUR TURN.'
            );
        }

        TicTacToeController.select = select;
        function select(cell) {
            if (TicTacToeController.isUsersTurn) {
                if (TicTacToeController.cells[cell] === -1) {
                    TicTacToeController.cells[cell] = TicTacToeController.userValue;

                    TicTacToeController.switchTurn();
                } else {
                    TicTacToeController.showMessage(
                        false,
                        'YOU CANNOT GO THERE!'
                    );
                }
            } else {
                TicTacToeController.showMessage(
                    false,
                    'SIMMER DOWN! IT\'S MY TURN STILL!'
                );
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
            TicTacToeService.getWinner(
                TicTacToeController.cells
            ).then(
                function(winner) {
                    if (winner === TicTacToeController.opponenentValue) {
                        TicTacToeController.showMessage(
                            false,
                            'HAHA LOSER.'
                        );
                    } else if (winner === TicTacToeController.userValue) {
                        TicTacToeController.showMessage(
                            false,
                            'GOOD JOB.'
                        );
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