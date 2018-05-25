(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'MessageService',
        MessageService
    );

    MessageService.$inject = [];

    function MessageService() {
        var MessageService = this;

        MessageService.lossMessages = [
            'AW SHUCKS!',
            'I GOT DISTRACTED...',
            'HOW IN THE?!',
            'ARE YOU CHEATING?',
            'I BET YOU WON\'T WIN AGAIN.',
            'WE ALL GET LUCKY.',
            'DOUBLE OR NOTHING.',
            'REMATCH?',
            'BEGINNER\'S LUCK!'
        ];

        MessageService.tieMessages = [
            'CAT!',
            'WE TIED!',
            'UGH THIS AGAIN.',
            'YOU PLAY LIKE A COWARD!',
            'WE TIED AGAIN!'
        ];

        MessageService.winMessages = [
            'HAHA LOSER!',
            'NEXT!',
            '*YAWN*',
            'THAT WAS CUTE.',
            'IS THAT ALL YOU\'VE GOT?'
        ];

        MessageService.getLossMessage = getLossMessage;
        function getLossMessage() {
            return MessageService.selectMessage(
                MessageService.lossMessages
            );
        }

        MessageService.getTieMessage = getTieMessage;
        function getTieMessage() {
            return MessageService.selectMessage(
                MessageService.tieMessages
            );
        }

        MessageService.getWinMessage = getWinMessage;
        function getWinMessage() {
            return MessageService.selectMessage(
                MessageService.winMessages
            );
        }

        MessageService.selectMessage = selectMessage;
        function selectMessage(messages) {
            var random = Math.random();

            return messages[
                Math.round(random * messages.length)
            ];
        }

        MessageService.reset = reset;
        function reset() {

        }
        
        MessageService.reset();

        return MessageService;
    }
})();