(function () {
    let app = angular.module('app');
    app.factory('appService', AppService);
    function AppService($resource) {
        let itemResource = $resource('/api/items/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        })
        let categoryResource = $resource('/api/categories/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        })

        let service = {
            GetAllCategories: getAllCategories,
            GetCategoryDetail: getCategoryDetail,
            UpdateCategory: updateCategory,
            DeleteCategory: deleteCategory,
            AddCategory: addCategory,
            GetTodoDetail: getTodoDetail,
            UpdateTodo: updateTodo,
            AddTodo: addTodo,
            DeleteTodo: deleteTodo,
        };

        return service;



        function getAllCategories() {
            return categoryResource.query().$promise;
        }

        function getCategoryDetail(id) {
            return categoryResource.get({id: id}).$promise;
        }

        function updateCategory(id, data) {
            return categoryResource.update({id: id}, data).$promise;
        }

        function deleteCategory(id) {
            return categoryResource.remove({id: id}).$promise;
        }

        function addCategory(data) {
            return categoryResource.save(data).$promise;
        }

        function getTodoDetail(id) {
            return itemResource.get({id: id}).$promise;
        }

        function updateTodo(id, data) {
            return itemResource.update({id: id}, data).$promise;
        }

        function addTodo(data) {
            return itemResource.save(data).$promise;
        }

        function deleteTodo(id) {
            return itemResource.remove({id: id}).$promise;
        }
    }
})();