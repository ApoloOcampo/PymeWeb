
function validacion(){
    let user=document.getElementById("usuario").value;
    let pass=document.getElementById("password").value;
    if(user == "admin" && pass == "1234"){
        alert("Usuario correcto")
        window.location="index.html";
        return false;
    }
   if(user == "" || pass =="") {
        alert("falta agregar información")
    }
    else{
        alert("contraseña o usuario invalido")
    }
}