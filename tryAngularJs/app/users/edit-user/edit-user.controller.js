"use strict";

angular.module("user").component("editUser", {
  templateUrl: "users/edit-user/edit-user.template.html",
  controller: [
    "$location",
    "$uibModal",
    "$routeParams",
    "cssInjector",
    "UserService",
    "Notification",
    function (
      $location,
      $uibModal,
      $routeParams,
      cssInjector,
      UserService,
      Notification
    ) {
      cssInjector.add("users/user.template.css");
      var vm = this;
      var currentId = $routeParams.id;

      vm.detailUser = detailUser;
      vm.update = updateUser;
      vm.open = openModal;
      vm.data = "Do you want to update it?";

      function openModal(size) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "shared/dialog.template.html",
          controller: function ($uibModalInstance, data, $scope) {
            $scope.data = data;

            $scope.ok = function () {
              updateUser();
              $uibModalInstance.close();
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss("cancel");
            };
          },
          size: size,
          resolve: {
            data: function () {
              return vm.data;
            },
          },
        });

        modalInstance.result.then(function () {
          // alert("now I'll close the modal");
        });
      }

      function detailUser() {
        UserService.detailUser(currentId)
          .then((res) => {
            vm.name = res.data.name;
            vm.username = res.data.username;
            vm.email = res.data.email;
            vm.phone = res.data.phone;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
              replaceMessage: true,
            });
          });
      }

      vm.detailUser();

      function updateUser() {
        var user = {
          name: vm.name,
          username: vm.username,
          email: vm.email,
          phone: vm.phone,
        };

        UserService.updateUser(currentId, user)
          .then((res) => {
            Notification.success({
              message: res.data.message,
            });
            $location.url("user");
          })
          .catch((error) => {
            console.log(error);
            Notification.error({
              message: "Data update Error",
            });
          });
      }
    },
  ],
});