function $(f) {
    
}
/**
 * Created by user on 11/14/2016.
 */
$(function() {
    // validate
    $("#contact").validate({
        // Set the validation rules
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            message: "required",
        },
        // Specify the validation error messages
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address",
            message: "Please enter a message",
        },
        // submit handler
        submitHandler: function(form) {
            //form.submit();
            $(".message").show();
            $(".message").fadeOut(4500);
        }
    });
});
