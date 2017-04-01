(function () {
    let app = angular.module('app');
    app.controller('appCtr', AppCtr);
    function AppCtr ($scope, appService) {
        window.sc = $scope;
        window.sv = appService;
        $scope.Categories = [];
        $scope.CategoryItems = [];
        $scope.CurrentItem = undefined;
        $scope.CurrentCategory = {};
        $scope.isWait = false;
        activate();

        function activate() {
            $scope.isWait = true;
            appService.GetAllCategories().then(function (res) {
                $scope.Categories = res;
                $scope.isWait = false;
                if ($scope.Categories.length > 0)
                    getCategoryDetail($scope.Categories[0]._id);
            }, function (err) {
                $scope.isWait = false;
                sweetAlert('Error', err, 'error');
            })
        }

        function getCategoryDetail(categoryId) {
            $scope.isWait = true;
            appService.GetCategoryDetail(categoryId).then(function (res) {
                $scope.isWait = false;
                $scope.CategoryItems = res.Items;
                $scope.CurrentCategory = res.Category;
            }, function (err) {
                $scope.isWait = false;
                sweetAlert('Error', err, 'error');
            })
        }

        $scope.chooseCategory = function chooseCategory(id) {
            getCategoryDetail(id);
        }

        $scope.deleteCategory = function deleteCategory(id) {
            swal({
                    title: "Delete Category?",
                    text: "Do you really want to?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                function(){
                    appService.DeleteCategory(id).then(function (res) {
                        swal("Success", "Delete Category And " + res.count +" Item(s) Successfully", 'success');
                        activate();
                    }, function (err) {
                        swal("Something went wrong", err.data, 'error');
                    })
                });
        }

        $scope.deleteItem = function deleteItem(id) {
            swal({
                    title: "Delete Item?",
                    text: "Do you really want to?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                function(){
                    appService.DeleteTodo(id).then(function () {
                        swal("Success", "Delete Successfully", 'success');
                        activate();
                    }, function (err) {
                        swal("Something went wrong", err.data, 'error');
                    })
                });
        }

        $scope.chooseItem = function chooseItem(id) {
            $scope.isWait = true;
            appService.GetTodoDetail(id).then(function (res) {
                $scope.CurrentItem = res;
                $scope.isWait = false;
            }, function (err) {
                $scope.isWait = false;
                sweetAlert('Error', err, 'error');
            })
        }

        $scope.TimeConvert = function (Timestamp) {
            return (new Date(Timestamp)).toLocaleString('vi');
        }

        $scope.OpenModal = function (modalId, data) {
            $scope.ModalData = angular.copy(data);
            $(modalId).modal('show');
        }

        $scope.$on('reload' , function (event, data) {;
            if (data && data.itemId)
                $scope.chooseItem(data.itemId);
            if (data && data.categoryId)
                $scope.chooseCategory(data.categoryId);
            else
                activate();
            if (data & data.reloadAll)
                activate;
        })
    }
})();