(function () {
    let app = angular.module('app');
    app.controller('CategoryCtr', CategoryController);
    
    function CategoryController($scope, appService) {
        $scope.submit = function () {
            if ($scope.ModalData.Action == 'Add') {
                appService.AddCategory($scope.ModalData.Category).then(function (res) {
                    sweetAlert('Success', 'Add Category Successfully', 'success');
                    done();
                }, function (err) {
                    if (err.data.message == 'name_existed')
                        sweetAlert('Fail', 'Category Name Existed', 'error');
                })
            }
            else if ($scope.ModalData.Action == 'Edit') {
                appService.UpdateCategory($scope.ModalData.Category._id, $scope.ModalData.Category).then(function (res) {
                    sweetAlert('Success', 'Update Category Successfully', 'success');
                    done();
                }, function (err) {
                    if (err.data.message == 'name_existed')
                        sweetAlert('Fail', 'Category Name Existed', 'error');
                })
            }
        };
        function done(categoryId) {
            $('#category-modal').modal('hide');
            $scope.$emit('reload', {categoryId: categoryId});
        }
    }
})();