

let idInicioSesion = "62a702295174230e04ecafe4"
let gamesUsuario = "";
$(document).ready(function () {
  // conexion API
  $.ajax({
    url: 'http://localhost:8800/api/users/' + idInicioSesion,
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
      $("#nombre-usuario").val(respuesta.datos.name.toString())
      $("#apellidos-usuario").val(respuesta.datos.secondName.toString())
      $("#descripcion-usuario").val(respuesta.datos.description.toString())

      for (let i = 0; i < respuesta.datos.theTeam.length; i++) {

        $.ajax({
          url: 'http://localhost:8800/api/users/' + respuesta.datos.theTeam[i].user,
          type: 'GET',
          success: function (respuestaTeam) {
            $("#lista-integrantes-carga").append(`
                        <div class="col-md-8 lista-integrantes">
                            <img class="img-miniatura-perfil">
                            <span id="integrante-username-datos${i}" class="atributo-perfil"></span>
                            <span id="integrante-correo-datos${i}"   class="atributo-perfil"></span>
                            <span id="integrante-juego-datos${i}"    class="atributo-perfil"></span>
                            <span id="integrante-fecha-datos${i}"    class="atributo-perfil"></span>
                           
                        </div>
                        <div class="col-md-2 datos-juego-iconos-centrados">
                            <button id="eliminar-integrante-perfil${i}" class="boton-icono-borrar icono-sm"><i class="fi fi-rr-trash logo-datos"></i></button>
                        </div>
            `)
            $(`#integrante-username-datos${i}`).html(respuestaTeam.datos.username + " - ")
            $(`#integrante-correo-datos${i}`).html(respuestaTeam.datos.email + " - ")
            $(`#integrante-juego-datos${i}`).html(respuestaTeam.datos.games + " - ")
            $(`#integrante-fecha-datos${i}`).html(formatearFecha(respuestaTeam.datos.createdAt, "date"))
            $(`#eliminar-integrante-perfil${i}`).click(function () {
              $.ajax({
                url: 'http://localhost:8800/api/members/' + respuesta.datos.theTeam[i].id,
                'data': JSON.stringify({
                  "team": idInicioSesion,
                  "user": respuestaTeam.datos.id
                }),
                'type': 'DELETE',
                'contentType': 'application/json; charset=utf-8'
              });
              location.reload();
            })
          }
        })
      }

      if (respuesta.datos.games.toString() == "") {
        $("#eliminar-juego-perfil").hide();
        $("#editar-juego-perfil").hide();
        $("#form-datos-juego").show();
      } else {
        $("#eliminar-juego-perfil").show();
        $("#editar-juego-perfil").show();
        $("#form-datos-juego").css("visibility", "none");
      }
      gamesUsuario = respuesta.datos.games.toString()
      $("#games-usuario").html(gamesUsuario);
      juegoSeparado = gamesUsuario.split("-");
      $("#juego-form-datos").val(juegoSeparado[0])
      $("#rol-form-datos").val(juegoSeparado[1])
      $("#nivel-form-datos").val(juegoSeparado[2])

    },
    error: function () {
      console.error("No es posible completar la operación");
    }
  });

  $("#icono-perfil-boton").click(function () {
    if ($(".desplegable-perfil").css("display") == "none") {
      $(".desplegable-perfil").show()
    } else {
      $(".desplegable-perfil").hide()
    }
  })
})

$("#boton-crear-perfil").click(function () {
  if ($("#boton-crear-perfil").val() == "Crear perfil GAMER") {
    $.ajax({
      url: 'http://localhost:8800/api/users/' + idInicioSesion,
      'data': JSON.stringify({
        profileType: "gamer"
      }),
      'type': 'PUT',
      'contentType': 'application/json; charset=utf-8',
    });
    location.reload();
  } else if ($("#boton-crear-perfil").val() == "Crear perfil EQUIPO") {
    $.ajax({
      url: 'http://localhost:8800/api/users/' + idInicioSesion,
      'data': JSON.stringify({
        profileType: "team"
      }),
      'type': 'PUT',
      'contentType': 'application/json; charset=utf-8',
    });
    location.reload();
  }
})

$("#eliminar-juego-perfil").click(function () {
  $.ajax({
    url: 'http://localhost:8800/api/users/' + idInicioSesion,
    'data': JSON.stringify({
      games: ""
    }),
    'type': 'PUT',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
})

$("#eliminar-integrante-perfil").click(function () {
  $.ajax({
    url: 'http://localhost:8800/api/members/',
    'data': JSON.stringify({
      "team": idInicioSesion,
      "user": "629b202c2d005dde25eebee6"
    }),
    'type': 'DELETE',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
})


$("#editar-juego-perfil").click(function () {

  async function f() {
    let esperaEdicion = new Promise((resolve, reject) => {
      $("#form-datos-juego").show()
      $("#boton-guardar-datos-perfil").click(() => resolve(cargarDatos()))
      function cargarDatos() {
        let stringJuego = "";
        if ($("#juego-form-datos").val()) {
          stringJuego += $("#juego-form-datos").val()
          if ($("#rol-form-datos").val()) {
            stringJuego += " - " + $("#rol-form-datos").val()
            if ($("#nivel-form-datos").val()) {
              stringJuego += " - " + $("#nivel-form-datos").val()
            }
          }
        }
        return stringJuego;
      }
    });
    let datosCargados = await esperaEdicion; // espera hasta que la promesa se resuelva (*)
    console.log(datosCargados);
  }

  f();


  // $.ajax({
  //   url: 'http://localhost:8800/api/users/' + idInicioSesion,
  //   'data': JSON.stringify({
  //     games: ""
  //   }),
  //   'type': 'PUT',
  //   'contentType': 'application/json; charset=utf-8',
  // });
  // location.reload();
})

$("#iniciar-sesion").click(function (e) {
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

$("#boton-guardar-datos-perfil").click(function () {
  let nombreUsuario = $("#nombre-usuario").val()
  let apellidosUsuario = $("#apellidos-usuario").val()
  let descripcionUsuario = $("#descripcion-usuario").val()
  $.ajax({
    url: 'http://localhost:8800/api/users/' + idInicioSesion,
    'data': JSON.stringify({
      name: nombreUsuario,
      secondName: apellidosUsuario,
      description: descripcionUsuario
    }),
    'type': 'PUT',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
})

$("#boton-guardar-datos-juegos").click(function () {
  let stringJuego = "";
  if ($("#juego-form-datos").val()) {
    stringJuego += $("#juego-form-datos").val()
    if ($("#rol-form-datos").val()) {
      stringJuego += " - " + $("#rol-form-datos").val()
      if ($("#nivel-form-datos").val()) {
        stringJuego += " - " + $("#nivel-form-datos").val()
      }
    }
  }
  $.ajax({
    url: 'http://localhost:8800/api/users/' + idInicioSesion,
    'data': JSON.stringify({
      games: stringJuego
    }),
    'type': 'PUT',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
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

function formatearFecha(fecha, estado) {
  try {
    if (estado == "date") {
      return new Date(fecha).toLocaleDateString();
    } else if (estado == "time") {
      return new Date(fecha).toLocaleTimeString();
    } else if (estado == "all") {
      return new Date(fecha).toLocaleString();
    }
  } catch (error) {
    return null;
  }
}


$("#buscador-integrante").keyup(function () {
  $.ajax({
    url: 'http://localhost:8800/api/users/?buscar='+$("#buscador-integrante").val(),
    'type': 'GET',
    succes:function(response){
      console.log($("#buscador-integrante").val())
    }
  });
})