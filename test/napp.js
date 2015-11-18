var app = angular.module("napp", ['helloWorld-directive']);
angular.module('napp', []).config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});
angular.module("napp")
.controller("nappCtrl", function ($scope, $http) {

  // sample playlist, this will model what we get from db on server calls
  //$scope.playlist = ["http://127.0.0.1:4569/music/spotify:track:3WS7spXVlbeC5kjePmHMQW", "http://127.0.0.1:4569/music/spotify:track:1HUiGfaouK0hCdW0z2xao2", "http://127.0.0.1:4569/music/spotify:track:3GzjG6Qah8cplpj5YAURLK", "http://127.0.0.1:4569/music/spotify:track:2zWK15Cln5vM4hsROKI1iO"];
  $scope.playlist = ['http://127.0.0.1:4569/music/spotify:track:1P0wLge0z6CiDMztVH0q9i'];
  $scope.audio = document.getElementById('track');
  $scope.audio.addEventListener('ended', function(){
    console.log("audio has ended...going to next song");
    $scope.playlist.shift();
    $scope.audio.src = $scope.playlist[0];
  });

  // $scope.$watch('playlist.length', function () {
  //   if ($scope.playlist.length > 0) {    
  //     $scope.audio = document.getElementById('track');
  //     $scope.audio.addEventListener('ended', function(){
  //       console.log("audio has ended...going to next song");
  //       $scope.playlist.shift();
  //       $scope.audio.src = $scope.playlist[0];
  //     });
  //   }
  // })

  $scope.post = function (uri) {
    console.log($scope.link);
    $scope.playlist.push( 'http://127.0.0.1:4569/music/' + uri);
  };

  $scope.tracks = [];

  $scope.searchTrack = function () {
    var searchStr = $scope.search.split(" ").join("+");
    $http({
      method: 'GET',
      withCredentials: false,
      url: 'http://api.spotify.com/v1/search?q='+searchStr+'&type=track'
    }).then(function (result) {
      console.log(result.data.tracks.items);
      $scope.tracks = result.data.tracks.items;
    })
  };
});
