$(document).ready(

    //update user profile
    function() {
        $("#update").click(function() {
            var name = $("#name").val();
            var username = $("#username").val();
            var dateOfBirth = $("#dateOfBirth").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var confirmPassword = $("#confirmPassword").val();

            if (password && Password !== confirmPassword)
                alert('passwords do not match!');

            /*Perform some validation here.*/
            $.post(
                "/userDashboard/updateProfile",
                { name: name, username: username, dateOfBirth: dateOfBirth, email: email, password: password },
                function(data) {
                    if (data === 'success')
                        $("#updateResultMsg").show();
                    else
                        alert("update failed!");
                });
        });

    }
);