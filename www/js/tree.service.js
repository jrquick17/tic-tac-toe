(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'TreeService',
        TreeService
    );

    TreeService.$inject = [
        'MoveService',
        'NodeService'
    ];

    function TreeService(
        MoveService,
        NodeService
    ) {
        var TreeService = this;

        function Tree(cells, value) {
            var Tree = this;

            Tree.parentNode = NodeService.getNode(cells, value);

            Tree.expand = function() {
                Tree.parentNode.expand();
            };
            
            Tree.getMoves = function() {
                var moves = [];
                
                var childCount = this.parentNode.children.length;
                
                for (var i = 0; i < childCount; i++) {
                    var child = this.parentNode.children[i];
                    
                    var points = child.getPoints(
                        this.parentNode.value
                    );
                    
                    var move = MoveService.getMove(
                        child.getMove(),
                        points
                    );
                    
                    moves.push(move);
                }

                return moves;
            };
        }

        TreeService.getTree = getTree;
        function getTree(cells, value) {
            return new Tree(cells, value);
        }

        TreeService.reset = reset;
        function reset() {

        }
        
        TreeService.reset();

        return TreeService;
    }
})();