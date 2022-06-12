

$(document).ready(function () {
  // conexion API
  $.ajax({
    url: 'https://eteamapp.herokuapp.com/api/users/62a4d28ac27a64a3da0995ec',
    type: 'GET',
    success: function (respuesta) {
      if (respuesta.datos.profileType.toString() == "gamer") {
        $("#boton-crear-perfil").val("Crear perfil EQUIPO");
        $(".datos-juegos").show();
        $(".datos-integrantes").hide();
      } else if (respuesta.datos.profileType.toString() == "team") {
        $("#boton-crear-perfil").val("Crear perfil GAMER");
        $(".datos-juegos").hide();
        $(".datos-integrantes").show();
      }
      $("#tipo-perfil-span").html(respuesta.datos.profileType.toString().toUpperCase());
      $("#usuario-perfil-span").html(respuesta.datos.username.toString());
      $("#correo-perfil-span").html(respuesta.datos.email.toString());
      if (respuesta.datos.games.toString() == "") {
        $("#boton-anadir-juego").show();
        $("#eliminar-juego-perfil").hide();
        $("#editar-juego-perfil").hide();
        $("#form-datos-juego").show();
      } else {
        $("#boton-anadir-juego").hide();
        $("#eliminar-juego-perfil").show();
        $("#editar-juego-perfil").show();
        $("#form-datos-juego").hide();
      }
      $("#games-usuario").html(respuesta.datos.games.toString());
    },
    error: function () {
      console.error("No es posible completar la operación");
    }
  });
})

$("#eliminar-juego-perfil").click(function () {
  $.ajax({
    url: 'https://eteamapp.herokuapp.com/api/auth/login',
    'data': {
      "username": "prueba",
      "email":"prueba@gmail.com",
      "password":"1234"
    }, //{action:'x',params:['a','b','c']}
    'type': 'PUT',
    'contentType': 'application/json; charset=utf-8',
   });
})


// $(document).ready(function () {
//   $.ajax({
//     url: 'https://eteamapp.herokuapp.com/api/auth/login',
//     'data': {

//       "username": "marta3333",
//       "email": "marta3333@gmail.com",
//       "password": "1234"

//     }, //{action:'x',params:['a','b','c']}
//     'type': 'POST',
//     'contentType': 'application/json; charset=utf-8',
//     'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTMyZTllMWE2MGVkOTc0NDBkYTE5YSIsImlhdCI6MTY1NTA0OTM5OSwiZXhwIjoxNjU1MzA4NTk5fQ.HWEVcrNwo9-b-TZdcYM7m6j-Lo8Z6lP4wznUr0ssJ3k'
//   });
