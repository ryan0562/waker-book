App.controller('musicListCtroller', musicListCtroller);


function musicListCtroller($http) {
    var vm = this;
    var player = document.getElementById("player");
    $http({
            method: "get",
            url: "/musicListData",
        })
        .success(function(res) {
            vm.musicList = res;
            vm.musicSum = res.length;
        })
        .error(function(res) {
            console.log('error');
        });



    vm.playMusic = function(link) {
        $('#player').attr('src', link);
        player.play();
    };


}
App.directive('musicPlayer', function() {
    return {
        restrict: 'EA',
        transclude: true,
        scope: {},
        template: '<audio id="player"></audio>' +
            '<div class="musicPlayer">' +
            '<i class="icon pack" ng-click="pack()">&#xe699;</i>' +
            '<i class="icon play" ng-click="play()">&#xe627;</i>' +
            '<i class="icon forward">&#xe605;</i>' +
            '</div>',
        link: function(vm) {
            var player = $('#player')[0];
            vm.play = function() {
                if (player.paused) {
                    player.play();
                } else if (player.played) {
                    player.pause();
                }
            };
        }
    };
});
