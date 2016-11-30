function validateForm() {
    var x = document.getElementById("username").value;
    var y = document.getElementById("password").value;
    if((x!='') && (y!='')){
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
            alert("Please enter a valid e-mail address");
            return false;
        }
        alert('Valid Credentials!!!');
    }else{
        alert("Please enter both Username and Password");
        return false;
    }
}

function validatePasswordChange() {
    var p1 = document.getElementById("password1").value;
    var p2 = document.getElementById("password2").value;
    if(p1!='' && p2!=''){
        if(p1 === p2){
            alert('Password Change Successful!');
            window.location.href='login.html';
        }else{
            alert('Values do not match. Please re-enter the values');
        }
    }else{
        alert('Please enter the values');
    }
}

function validateRegistration() {
    var lastname = document.getElementById("lName").value;
    var dob = document.getElementById("DoB").value;
    var email = document.getElementById("Email").value;
    var p1 = document.getElementById("password1").value;
    var p2 = document.getElementById("password2").value;
    if(lastname!='' && dob!='' && email!='' && p1!='' && p2!=''){
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
            alert("Please enter a valid e-mail address");
            return false;
        }
        if(p1 != p2){
            alert('Password do not match. Please re-enter the values');
            return false;
        }
        alert('Registration Successful!');
        window.location.href = 'login.html';
    }else{
        alert("Please enter all the details");
    }
}