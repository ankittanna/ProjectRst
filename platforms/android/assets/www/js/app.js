/*eslint no-undef: "off"*/
'use strict';

angular.module('starter', [ 'ionic', 'starter.controllers', 'starter.services' ])
.run(function IonicConfigRun($ionicPlatform) {
    $ionicPlatform.ready(function ionicPlatformReady() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
})
.run(function LoadKeys($http, $window) {
    var applicationKeys = [];

    $http.get('keys/keys.json')
        .success(function getKeysSuccess(response) {
            applicationKeys = _.map(response, function mapKeyResponse(value, key) {
                return { key: key, value: value }
            });

            $window.applicationKeys = applicationKeys;
        })
        .error(function keysLoadErrorHandler(error) {
            /*console.log('error ' + error);*/
            $window.applicationKeys = [];
            $window.applicationError = error;
        });
})
.config(function StarterConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'views/menu/menu.html',
    controller: 'MenuCtrl'
  })

.state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.tableReservation', {
    url: '/table-reservation',
    views: {
      'menuContent': {
        templateUrl: 'views/table-reservation.html'
      }
    }
  })

  .state('app.orderTakeaway', {
      url: '/order-takeaway',
      views: {
        'menuContent': {
          templateUrl: 'views/order-takeaway.html'
        }
      }
  })
  .state('app.reviews', {
      url: '/reviews',
      views: {
        'menuContent': {
          templateUrl: 'views/reviews.html',
          controller: 'ReviewsCtrl'
        }
      }
  })

  .state('app.about-us', {
      url: '/about-us',
      views: {
        'menuContent': {
          templateUrl: 'views/about-us/about-us.html',
          controller: 'AboutUsController',
          controllerAs: 'vm'
        }
      }
  })

.state('app.contact-us', {
      url: '/contact-us',
      views: {
        'menuContent': {
          templateUrl: 'views/contact-us.html',
          controller: 'ContactUsCtrl'
        }
      }
})

.state('app.comments', {
      url: '/comments',
      views: {
        'menuContent': {
          templateUrl: 'views/comments.html',
          controller: 'CommentsCtrl'
        }
      }
})

.state('app.awards', {
      url: '/awards',
      views: {
        'menuContent': {
          templateUrl: 'views/awards.html',
          controller: 'AwardsCtrl'
        }
      }
})

.state('app.press', {
      url: '/press',
      views: {
        'menuContent': {
          templateUrl: 'views/press.html',
          controller: 'PressCtrl'
        }
      }
})

.state('app.gallery', {
      url: '/gallery',
      views: {
        'menuContent': {
          templateUrl: 'views/gallery.html',
          controller: 'GalleryCtrl'
        }
      }
})

.state('app.logout', {
      url: '/logout',
      views: {
        'menuContent': {
          templateUrl: 'views/logout.html',
          controller: 'LogoutCtrl'
        }
      }
})

.state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'views/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
});
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about-us');
});
