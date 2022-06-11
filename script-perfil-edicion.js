

$(document).ready(function () {
    // conexion API
    fetch("https://eteamapp.herokuapp.com/api/users/629923ac84944079440d54e0")
    .then(respuesta => respuesta.json() )
    .then(respuesta =>  $("#tipo-perfil-span").html(respuesta.datos.profileType))
  })

//   $("#tipo-perfil-span").html(jsonPerfil.datos.profileType)