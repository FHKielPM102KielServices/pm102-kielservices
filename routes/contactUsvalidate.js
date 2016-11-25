/**
 * Created by user on 11/25/2016.
 */

function _validate() {
    var emVal, fnVal, lnVal, cityVal, StatVal, CommVal;
    var _email = document.getElementById('email').value;
    var _fname = document.getElementById('first_name').value;
    var _coomments = document.getElementById('comments').value;
    var _lblError = document.getElementById('lblError');

    if (_email != "" || _email != null) {
        var b = _emailValidator(_email);
        if (b == false) {
            _lblError.innerHTML = "Invalid Email";
            emVal = false;
        }
        else {
            emVal = true;
            if ( _fname == "" || _fname == null) {
                _lblError.innerHTML = "Please Enter your Name";
                fnVal = false;
            }

            else {
                CommVal = true;
                if (emVal == true && fnVal == true && lnVal == true && cityVal == true && StatVal == true && CommVal == true) {
                    postIt();
                }

            }
        }
    }
    else {
        _lblError.innerHTML = "Enter Email ID";
        emVal = false;
    }
}
function _emailValidator(_email) {
    var a;
    var lastAtPos = _email.lastIndexOf('@');
    var lastDotPos = _email.lastIndexOf('.');
    if (lastAtPos < lastDotPos && lastAtPos > 0 && lastDotPos > 2 && (_email.length - lastDotPos) > 2) {
        a = true;
    }
    else {
        a = false;
    }
    return a;
}
function hideIt() {
    document.getElementById('lblError').innerHTML = "";
}
function postIt() {
    document.forms["_form"].submit();
}
/**
 * Created by user on 11/23/2016.
 */

