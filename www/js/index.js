function init() {
    document.addEventListener("deviceready", deviceReady, true);
    delete init;
}

function deviceReady() {
    
    // here I will check if the user was already logged
    
}

function login(){
    $("#loginButton").attr("disabled","disabled");
    var e = $("#email").val();
    var p = $("#password").val();
    if(e !== '' && p !== '') {
        $.post("http://192.168.1.100/api/json.api?www-command=auth-login", 
        {email:e,password:p}, 
        function(res) {
            if(res['success'] === true){
                var data = res['data'];
                if(data['status'] !== '2'){
                    window.localStorage['id'] = data['id'];
                    window.localStorage['name'] = data['name'];
                    window.localStorage['email'] = data['email'];
                    window.localStorage['password'] = data['password'];
                    if(data['type'] === '1'){
                        document.location.href = "user-home.html";
                    }else{
                        document.location.href = "nurse-home.html";
                        /*
                        if(data['status'] === '3'){
                            document.location.href = "nurse-upload.html";
                        }else if(data['status'] === '4'){
                            navigator.notification.alert("Pending Aproval");
                        }else{
                            document.location.href = "nurse-home.html";
                        }
                        */
                    }
                }else{
                    navigator.notification.alert("Dear "+data['name']+", Your account is blocked. Contact support.");
                }
            }else{
                navigator.notification.alert(res['error']);
            }
            $("#loginButton").removeAttr("disabled");
        });
    }
    return false;
}

function signup(){
    $("#signupButton").attr("disabled","disabled");
    var n = $("#name").val();
    var e = $("#email").val();
    var p = $("#password").val();
    var t = $("input[name='type']:checked").val();
    if(n !== '' && e !== '' && p !== '' && t !== '') {
        $.post("http://192.168.1.100/api/json.api?www-command=auth-register", 
        {name:n,email:e,password:p,type:t}, 
        function(res) {
            if(res['success'] === true){
                var data = res['data'];
                window.localStorage['id'] = data['id'];
                window.localStorage['name'] = data['name'];
                window.localStorage['email'] = data['email'];
                window.localStorage['password'] = data['password'];
                if(data['type'] === 1){
                    document.location.href = "user-home.html";
                }else{
                    document.location.href = "nurse-home.html";//nurse-upload.html
                }
            }else{
                navigator.notification.alert(res['error']);
            }
            $("#signupButton").removeAttr("disabled");
        });
    }
    return false;
}

function forgot(){
    navigator.notification.alert("Hi");
}