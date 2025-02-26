function alertForgot(event) {
    event.preventDefault(); // Prevents the link from navigating
    alert("Open page to forgotten password");
}

// Attach event listener
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("forgot").addEventListener("click", alertForgot);
});



function alertRegister(event){
    event.preventDefault();
    alert("Open page to register account")
}

document.addEventListener("DOMContentLoaded", function(){
document.getElementById("register").addEventListener("click", alertRegister);
});




function alertSignIn(event){
    event.preventDefault();
    alert("You are now signed in!")
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("signIn").addEventListener("click", alertSignIn);
});