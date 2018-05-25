(function() {
    'use strict';

    angular.module('ticTacToe').controller(
        'TicTacToeController',
        TicTacToeController
    );

    TicTacToeController.$inject = [
        'MessageService',
        'OpponentService',
        'TicTacToeService'
    ];

    function TicTacToeController(
        MessageService,
        OpponentService,
        TicTacToeService
    ) {
        var TicTacToeController = this;

        TicTacToeController.beginOpponentsTurn = beginOpponentsTurn;
        function beginOpponentsTurn() {
            return OpponentService.makeMove(
                TicTacToeController.opponentValue,
                TicTacToeController.cells
            ).then(
                function(cell) {
                    if (cell !== null) {
                        TicTacToeController.cells[cell] = TicTacToeController.opponentValue;

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
            if (TicTacToeController.isGameOver) {
                TicTacToeController.showMessage(
                    false,
                    'THE GAME IS ALREADY OVER.'
                );
            } else if (TicTacToeController.isUsersTurn) {
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
                TicTacToeController.opponentValue = 0;
                TicTacToeController.userValue = 1;
                TicTacToeController.isUsersTurn = true;
            } else {
                TicTacToeController.opponentValue = 1;
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
            var winner = TicTacToeService.getWinner(
                TicTacToeController.cells
            );

            if (winner === TicTacToeController.opponentValue) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showMessage(
                    false,
                    MessageService.getWinMessage()
                );
            } else if (winner === TicTacToeController.userValue) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showMessage(
                    false,
                    MessageService.getLossMessage()
                );
            } else if (winner === -1) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showMessage(
                    false,
                    MessageService.getTieMessage()
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

        TicTacToeController.reset = reset;
        function reset() {
            TicTacToeController.cells = [
                -1, -1, -1,
                -1, -1, -1,
                -1, -1, -1
            ];

            TicTacToeController.isGameOver = false;

            TicTacToeController.opponentValue = 1;

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