var app = angular.module("contactsApp", ["ngRoute"]);

//routes
app.config(function ($routeProvider) {
    $routeProvider
        .when("/list", {
            templateUrl: "./views/contactList.html",
            controller: "contactList"

        })
        .when("/add", {
            templateUrl: "./views/newContact.html",
            controller: "addNewContact"
        })
        .otherwise({
            redirectTo: "/list"
        });
});

//factory
app.factory("contacts", function () {
    return [];
})
//controllers

app.controller("addNewContact", ["$scope", "contacts", function ($scope, contacts) {
    $scope.contacts = contacts
    $scope.addNewContact = function () {
        $scope.contacts.push({
            "name": $scope.newContact.name,
            "contact": $scope.newContact.contact
        })
    }
}]);

app.controller("contactList", ["$scope", "$http", "contacts", function ($scope, $http, contacts) {
    if (contacts.length == 0) {
        $http({
            method: 'GET',
            url: './data/contacts.json',
        }).then(function success(response) {
            for (x in response.data) {
                contacts.push(response.data[x])
            }
        }, function error(response) {
            console.log("error");
        });
    }

    $scope.contacts = contacts;
    $scope.removeContact = function (contact) {
        var index = $scope.contacts.indexOf(contact);
        $scope.contacts.splice(index, 1);
    }
}]);