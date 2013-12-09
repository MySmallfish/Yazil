﻿(function (S, C, Y) {

    Y.CustomerServiceController = function ($scope, $location, $sce, metadataService, alertService) {
            
        metadataService.getMetadata().then(function (metadata) {
            
            $scope.items = [{
                title: "חייג",
                text: metadata.ServicePhone1,
                cssClass: "i-phone",
                type: "tel"
            },
             {
                 title: "פקס",
                 text:metadata.ServicePhone2,
                 cssClass: "i-fax",
                 type: "tel"
             },
             {
                 title: "שעות פעילות",
                 text: $sce.trustAsHtml("בימי א' עד ה'" + "<br/>" + "בין השעות <span style='direction:ltr'>" + metadata.OpeningHoursFinish + " - " + metadata.OpeningHoursStart + "</span>"),
                 cssClass: "i-clock"
             },
             {
                 title: "כתובת",
                 text: $sce.trustAsHtml(metadata.AddressLine1 + (metadata.AddressLine2 ? "<br/>" + metadata.AddressLine2 : "") + "<br/>" + metadata.City),
                 cssClass: "i-address"
             } ];
        }, function(error) {
            alertService.show(error.Dialog).then(function () {
                $scope.logout();
            });
        });

 
    };

})(Simple, Cal, Cal.Yazil);