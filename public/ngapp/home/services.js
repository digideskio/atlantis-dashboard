var services = angular.module('atlantisApp.homeServices', []);

services.factory('appsFactory', ['$http', function ($http) {
  var selectedApp, svc = {
    apps: []
  };

  var callGet = function (url, callback) {
    $http.get(url).success(callback);
  };

  var callPost = function (url, postData, success, error) {
    $http.post(url, postData).success(success).error(error);
  };

  var getApps = function (callback) {
    callGet('/apps', callback);
  };

  svc.list = getApps;

  svc.findByName = function (name, callback) {
    callGet('/apps/' + name + '/envs', callback);
  };

  svc.getEnvs = function (callback) {
    callGet('/envs', callback);
  };

  svc.getEnvsByApp = function (appName, callback) {
  };

  svc.deployApp = function (options, success, error) {
    var buildUrl = '/instances/apps/' + options.appName + '/shas/' +
                    options.sha + '/envs/' + options.env +
                    '/containers?User=aa&Secret=dummysecret';

    callPost(buildUrl, options.data, success, error);
  };

  svc.getTasks = function (id, success, error) {
    callGet('/tasks/' + id, success, error);
  };

  svc.findEnv = function (appName, envName, callback) {
    callGet('/apps/' + appName + '/envs/' + envName, callback);
  };

  svc.getContainer = function (containerID, callback) {
    callGet('/instance_data/' + containerID, callback);
  };

  svc.getShaById = function (id, callback) {
    callGet('/shas/' + id, callback);
  };

  svc.getDeps = function (callback) {
    callGet('/deps', callback);
  };

  return svc;
}]);
