angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

// Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    
    console.log('login username:' + $scope.loginData.username);
    console.log('login password:' + $scope.loginData.password);
    
    var data_post = "v=1" 
                    +"&module=1"
                    +"&action=1"
                    +"&u="+$scope.loginData.username
                    +"&p="+$scope.loginData.password
                    +"&login_type=1"
                    +"&id_device=1"
                    +"&os=1";
    
    var url_web = 'http://storeapp.mobidosoft.com/api/services/api.php';
    
    $http({
    method: 'POST',
    url: url_web,
    data: data_post,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}).success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log('success data: ' + data);
           
    
    if(data.success == '1')
    {
      $window.localStorage['user_access_key'] =data.user_access_key;

        $window.localStorage['admins_id'] = data.login.admins_id;

      //alert("user_access_key: " +  $window.localStorage['user_access_key'] + ' admins_id: ' + $window.localStorage['admins_id']);
      $scope.closeLogin();

        $location.path("/app/index");
    }
    else
    {
      $window.localStorage['user_access_key'] = '0';
      alert('Error: ' + data.error_message);
    }
    
    
    
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    
    console.log('error data: ' + data);
    console.log('error status: ' + status);
    console.log('error headers: ' + headers);
    console.log('error config: ' + config);
    
    alert("Error data: " + data);
  });
          
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
    */
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('CategoriesCtrl', function($scope) {

  
  $scope.playlists = [
    { title: 'Mujeres', id: 1, img:'img/mujeres.png'  },
    { title: 'Hombres', id: 2, img:'img/hombres.png' },
    { title: 'Niños y Niñas', id: 3, img:'img/ninos.png' }
    
  ];
  
  
  
})

 .controller('ProductsCtrl', function($http, $window, $scope,$stateParams, $location) {

        //alert('categoriaId: ' + $stateParams.categoriaId);
        //alert ('user_access_key: ' + $window.localStorage['user_access_key']);

        var userAccessKey = $window.localStorage['user_access_key'];
        //alert('user_access_key 2:' + $window.localStorage['user_access_key']);

        if(userAccessKey == "undefined" || userAccessKey == undefined ||  userAccessKey == '0')
        {

            alert('Require Login, Menu->Login');
            $location.path("/app/categories");
            //login();
            //$state.go
            //$scope.state.go('login');
        }
        else {


            var data_post = "v=1"
                + "&module=2"
                + "&action=1"
                + "&user_access_key=" + $window.localStorage['user_access_key']
                + "&admins_id=" + $window.localStorage['admins_id']
                + "&category_id=" + $stateParams.categoriaId;

            //alert ('data_post: ' + data_post);

            var categoriaName = '';
            if($stateParams.categoriaId == 1)
                categoriaName = 'Mujures';
            else if ($stateParams.categoriaId == 2)
                categoriaName = 'Hombres';
            else if ($stateParams.categoriaId == 3)
                categoriaName = 'Niños y Niñas';

            $scope.categoriaName = categoriaName;


            var url_web = 'http://storeapp.mobidosoft.com/api/services/api.php';

            $http({
                method: 'POST',
                url: url_web,
                data: data_post,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('success data: ' + data);

                //alert('success data: ' + JSON.stringify(data));

                if (data.success == '1') {
                    //alert('results' + data.results);
                    $scope.products = data.results;
                }
                else {
                    alert('Error: ' + data.error_message);
                }


            }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.

                    console.log('error data: ' + data);
                    console.log('error status: ' + status);
                    console.log('error headers: ' + headers);
                    console.log('error config: ' + config);

                    alert("Error data: " + JSON.stringify(data));
                });


        }

    })

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
