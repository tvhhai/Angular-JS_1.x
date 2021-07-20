"use strict";

angular.module("user").component("editUser", {
  templateUrl: "users/edit-user/edit-user.template.html",
  controller: [
    "$state",
    "$uibModal",
    "$stateParams",
    "cssInjector",
    "UserService",
    "SharedService",
    "Notification",
    function (
      $state,
      $uibModal,
      $stateParams,
      cssInjector,
      UserService,
      SharedService,
      Notification
    ) {
      cssInjector.add("users/user.template.css");
      var vm = this;
      var currentId = $stateParams.id;

      vm.detailUser = detailUser;
      vm.update = updateUser;
      vm.open = openModal;
      vm.data = "Do you want to update it?";
      vm.regexEmail = SharedService.regexEmail();
      vm.regexPhone = SharedService.regexPhone();
      vm.detailUser();

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
            vm.phone = Number(res.data.phone);
            vm.isActive = res.data.isActive;
          })
          .catch((error) => {
            Notification.error({
              message: "Error",
              replaceMessage: true,
            });
          });
      }

      function updateUser() {
        var user = {
          name: vm.name,
          username: vm.username,
          email: vm.email,
          phone: vm.phone,
          isActive: vm.isActive,
        };

        UserService.updateUser(currentId, user)
          .then((res) => {
            Notification.success({
              message: res.data.message,
            });
            $state.go("main.user");
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
