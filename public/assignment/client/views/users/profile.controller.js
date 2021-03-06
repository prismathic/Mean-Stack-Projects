/**
 * Created by Sanil on 2/18/2016.
 */
(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController)

    function ProfileController(UserService, $location){

        var vm=this;

        vm.update=update;

        function init(){
            UserService.getCurrentUser()
                .then(function(response){
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                    vm.user=response.data;
                });
        }
        init();

        // function to update a user
        function update(user) {
            UserService.updateUser(user._id,user)
                .then(
                    function(response) {
                        return UserService.findUserById(user._id);
                    })
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                    }
                });
        }
    }
})();