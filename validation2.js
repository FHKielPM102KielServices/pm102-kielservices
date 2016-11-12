
$('document').ready(function()
{ 
  
   $("#register-form").validate({
        rules: {
        	       email: {
                   required: true,
                   email: true
                   },
                   password: {
                   required: true,
                   minlength: 8
                             }
               },
             
        messages: {
        	       
        	         password: {
                     required: "Please provide a password",
                     minlength: "Password at least have 8 characters"
                  },
                     email: "Please enter a valid email"
          },
          
          submitHandler:function(form) {
        	  
        	  $.ajax({
                  url:"Loginservlet",
                  type: "post",
                  data: $(form).serialize(),
                  success: function(data){
                	  
                	 
                  	var win = window.open("","_self");
                  	//alert(data);
                      win.document.write(data);
                	 
                  },
                  error: function(jqXHR,textStatus,errorThrown){
                  	
                      $("#register-form")[0].reset();
                      $("#result").html(jqXHR.responseText);
                  }
        	  /*sendInfo()*/
        	
                    
          
   });
          }
})
});