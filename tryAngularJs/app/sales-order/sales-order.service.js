"use strict";

angular
  .module("salesOrder")
  .service("SalesOrderService", function ($http, BaseUrlService) {
    var salesOrder = "/sales-order";
    var baseUrl = BaseUrlService.getBaseUrl() + salesOrder;

    this.listSalesOrder = function () {
      return $http.get(baseUrl);
    };

    this.detailSalesOrder = function (id) {
      return $http.get(`${baseUrl}/${id}`);
    };

    this.createSalesOrder = function (data) {
      return $http.post(baseUrl, data);
    };

    this.updateSalesOrder = function (id, data) {
      return $http.put(`${baseUrl}/${id}`, data);
    };

    this.deleteSalesOrder = function (id) {
      return $http.delete(`${baseUrl}/${id}`);
    };
  });