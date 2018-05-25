(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'NodeService',
        NodeService
    );

    NodeService.$inject = [
        'TicTacToeService'
    ];

    function NodeService(
        TicTacToeService
    ) {
        var NodeService = this;

        function Node(cells, value, move, parent) {
            var Node = this;

            Node.children = [];
            Node.move = typeof move === 'undefined' ? null : move;
            Node.parent = typeof parent === 'undefined' ? null : parent;
            Node.cells = cells;
            Node.value = value;

            Node.expand = function() {
                var availableMoves = TicTacToeService.getAvailableMoves(
                    this.cells
                );

                var grandChildrenValue = TicTacToeService.getOtherValue(
                    this.value
                );

                var numberOfAvailableMoves = availableMoves.length;

                for (var i = 0; i < numberOfAvailableMoves; i++) {
                    var move = availableMoves[i];

                    var tempCells = angular.copy(this.cells);
                    tempCells[move] = this.value;

                    var newChild = NodeService.getNode(
                        tempCells,
                        grandChildrenValue,
                        move,
                        this
                    );

                    this.children.push(newChild);
                }

                var childCount = this.children.length;

                for (var j = 0; j < childCount; j++) {
                    var winner = TicTacToeService.getWinner(
                        this.children[j].getCells()
                    );

                    if (winner === null) {
                        this.children[j].expand();
                    }
                }
            };

            Node.getCells = function() {
                return this.cells;
            };

            Node.getMove = function() {
                return this.move;
            };

            Node.getPoints = function(value) {
                var points = 0;

                var winner = TicTacToeService.getWinner(
                    this.getCells()
                );

                if (winner !== null) {
                    if (winner === value) {
                        points = 1;
                    } else if (winner === TicTacToeService.getOtherValue(value)) {
                        points = -1;
                    } else {
                        points = 0;
                    }

                    return points;
                }

                var childCount = this.children.length;
                for (var i = 0; i < childCount; i++) {
                    var child = this.children[i];

                    points += child.getPoints(value);
                }

                return points;
            };
        }

        NodeService.getNode = getNode;
        function getNode(cells, value, move, parent) {
            return new Node(cells, value, move, parent);
        }

        NodeService.reset = reset;
        function reset() {

        }
        
        NodeService.reset();

        return NodeService;
    }
})();