 $('document').ready(function()
 { 
	 
         $("#register-form").validate({
             rules: {
                 firstname: "required",
                 lastname: "required",
					address1:"required",
					
					date:"required",
       
                 email: {
                     required: true,
                     email: true
                 },
                 password: {
                     required: true,
                     minlength: 8
                 },
					gender:{
                          required: function() {
                        return $('[name="gender"]:checked').length; 
                        }
                      },
                      
                    
            
				number:{
				             required:true,
							 minlength:10,
							 maxlength:10,
							 number: true
				
				},
			 },
             messages: {
                 firstname: "Please enter your firstname",
                 lastname: "Please enter your lastname",
					
					address1:"Please enter your address",
					
					
                 password: {
                     required: "Please provide password",
                     minlength: "Password at least have 8 characters"
                 },
				 date:"Please select date of birth",
					number: {
                     required: "Please provide your mobile number",
                     minlength: "mobile no at least have 10 characters",
						maxlength:"mobile no max  have 10 characters",
						number: "only number"
                 },
					gender: {
                           required: "Select gender"
                         },
                 email: "Please enter a valid email "
					
             },
             
             submitHandler:sendInfo
            	 
            	 
            	 
             });
        
	 
 });
 
 
 function sendInfo(){
	 $("#register-form").on("submit", function(event) {
	        event.preventDefault();

	 $.ajax({
         url: "Welcome",
         type: "post",
         data: $(this).serialize(),
        success:function(data){
        	 
        	 window.location.href="index.html"
        	  },
         error: function(){
             alert("error");
         }
     });
	 });
	 
 }