

let idInicioSesion = "62a702295174230e04ecafe4"
$(document).ready(function () {
  // conexion API
  $.ajax({
    url: 'http://localhost:8800/api/users/'+idInicioSesion,
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
      $("#usuario-tablon-span-miniatura").html(respuesta.datos.username.toString());
      $("#descripcion-tablon-span-miniatura").html(respuesta.datos.description.toString());
      if (respuesta.datos.games.toString() == "") {
        $("#boton-anadir-juego").show();
        $("#eliminar-juego-perfil").hide();
        $("#editar-juego-perfil").hide();
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
  $("#boton-anadir-juego").click(function () {
    $(".form-datos-juego").show();
  })

  $("#icono-perfil-boton").click(function () {
    if ($(".desplegable-perfil").css("display") == "none") {
      $(".desplegable-perfil").show()
    } else{
      $(".desplegable-perfil").hide()
    }
  })
})

$("#eliminar-juego-perfil").click(function () {
  $.ajax({
    url: 'http://localhost:8800/api/users/'+idInicioSesion,
    'data': JSON.stringify({
      games: ""
    }),
    'type': 'PUT',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
})


$("#editar-juego-perfil").click(function () {
  $.ajax({
    url: 'http://localhost:8800/api/users/'+idInicioSesion,
    'data': JSON.stringify({
      games: ""
    }),
    'type': 'PUT',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
})

$("#iniciar-sesion").click(function(e){
  e.preventDefault();
  $.ajax({
    url: 'https://localhost:8800/api/auth/login',
    'data': JSON.stringify({
      email: "romerit0@gmail.com",
      password: "1234"
    }),
    'type': 'POST',
    'contentType': 'application/json; charset=utf-8',
    success: function (respuesta) {
      sessionStorage.clear();
      sessionStorage.setItem('idInicioSesion', respuesta.user);
    }
  });
})
// $(document).ready(function () {
//   $.ajax({
//     url: 'https://eteamapp.herokuapp.com/api/auth/login',
//     type: 'GET' ,
//     success: function (respuesta) {
//       console.log(respuesta);
//     },
//     error: function (){

//     }
//    });
// })


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
