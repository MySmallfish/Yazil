﻿(function (S, C, Y) {

    Y.AppController = function ($scope, $rootScope, $route, $location, $controller, $filter, metadataService) {
        $scope.displayCalLogo = true;
        $scope.animations = {
            page: false,
            swipe: false
        };

        function updateMetadata() {
            metadataService.getMetadata().then(function (metadata) {
                $scope.animations.page = metadata.PageAnimationEnabled;
                $scope.animations.swipe = metadata.SwipeAnimationEnabled;
                $scope.displayCalLogo = metadata.DisplayCalLogo;
            });
        }

        updateMetadata();
        $rootScope.$on("Cal.Yazil.SessionStarted", updateMetadata);

        $rootScope.$on("Cal.Yazil.SessionEnded", function() {
            $scope.animations = {
                page: false,
                swipe: false
            };
        });

        $rootScope.notifyProgressStarted = function () {
            $rootScope.$emit("progress-started");
        };
        $rootScope.notifyProgressCompleted = function () {
            $rootScope.$emit("progress-completed");
        };

        $rootScope.$on("progress-started", function () {
            $scope.isInProgress = true;
            
        });
        $rootScope.$on("progress-completed", function () {
            $scope.isInProgress = false;
        });
        $rootScope.$on("$routeChangeSuccess", function (scope, next) {
            if (next && next.locals && next.locals.pageInfo) {
                $scope.header = $filter("l10n")(next.locals.pageInfo.header);
                $scope.hideFooter = next.locals.pageInfo.hideFooter;
            }
        });
        $scope.navigateToCustomerService = function () {
            $location.path("CustomerService");
        };
        $scope.navigateToHome = function () {
            $location.path("/");
        };
        $scope.navigateToAccount = function () {
            $location.path("Account");
        };
        $scope.navigateToMoreInfo = function () {
            $location.path("MoreInfo");
        };

        $scope.isButtonSelected = function (name) {
            return $route.current.controller == name;
        };
    };

})(Simple, Cal, Cal.Yazil);