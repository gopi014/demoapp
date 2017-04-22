'use strict';

/**
 * @ngdoc home
 * @name demoapp
 * @description
 * # demoapp
 *
 * Main module of the application.
 */

var app = angular.module('demoapp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: "views/home.html",
            controller: "HomeCtrl"
        })
        .state('add', {
            url: '/addblog',
            templateUrl: "views/addblog.html",
            controller: "addBlogCtrl"
        });

    $urlRouterProvider.otherwise('/home');
});
