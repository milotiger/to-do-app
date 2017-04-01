(function () {
    let app = angular.module('app');
    app.controller('ItemCtr', ItemController);

    function ItemController($scope, appService) {
        $scope.submit = function () {
            // console.log($scope.ModalData.Item.ItemName);
            if ($scope.ModalData.Action == 'Add') {
                appService.AddTodo($scope.ModalData.Item).then(function (res) {
                    sweetAlert('Success', 'Add Item Successfully', 'success');
                    done(res.id, $scope.ModalData.Item.Category);
                }, function (err) {
                    if (err.data.message == 'name_existed')
                        sweetAlert('Fail', 'Item Name Existed', 'error');
                })
            }
            else if ($scope.ModalData.Action == 'Edit') {
                appService.UpdateTodo($scope.ModalData.Item._id, $scope.ModalData.Item).then(function (res) {
                    sweetAlert('Success', 'Update Item Successfully', 'success');
                    done($scope.ModalData.Item._id, $scope.ModalData.Item.Category);
                }, function (err) {
                    if (err.data.message == 'name_existed')
                        sweetAlert('Fail', 'Item Name Existed', 'error');
                })
            }
        };
        function done(itemId, categoryId) {
            $('#item-modal').modal('hide');
            $scope.$emit('reload', {itemId: itemId, categoryId: categoryId});
        }
    }
})();