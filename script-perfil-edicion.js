

let idInicioSesion = "629923ac84944079440d54e0"
let servidor = "http://localhost:8800/api/"
let gamesUsuario = "";
$(document).ready(function () {
  // conexion API
  $.ajax({
    url: servidor + 'users/' + idInicioSesion,
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
          url: servidor + 'users/' + respuesta.datos.theTeam[i].user,
          type: 'GET',
          success: function (respuestaTeam) {
            $("#lista-integrantes-carga").append(`
                        <div class="col-md-8 lista-integrantes">
                            <img class="img-miniatura-perfil">
                            <span id="integrante-username-datos${i}" class="atributo-perfil">${respuestaTeam.datos.username + " - "}</span>
                            <span id="integrante-correo-datos${i}"   class="atributo-perfil">${respuestaTeam.datos.email + " - "}</span>
                            <span id="integrante-juego-datos${i}"    class="atributo-perfil">${respuestaTeam.datos.games + " - "}</span>
                            <span id="integrante-fecha-datos${i}"    class="atributo-perfil">${formatearFecha(respuesta.datos.theTeam[i].createdAt, "all")}</span>
                           
                        </div>
                        <div class="col-md-2 datos-juego-iconos-centrados">
                            <button id="eliminar-integrante-perfil${i}" class="boton-icono-borrar icono-sm"><i class="fi fi-rr-trash logo-datos"></i></button>
                        </div>
            `)

            $(`#eliminar-integrante-perfil${i}`).click(function () {
              $.ajax({
                url: servidor + 'members/' + respuesta.datos.theTeam[i].id,
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


      $("#img-perfil").attr('src',   `data:image/png;base64,${toBase64(respuesta.datos.coverImg.img.data.data)}`)

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
      url: servidor + 'users/' + idInicioSesion,
      'data': JSON.stringify({
        profileType: "gamer"
      }),
      'type': 'PUT',
      'contentType': 'application/json; charset=utf-8',
    });
    location.reload();
  } else if ($("#boton-crear-perfil").val() == "Crear perfil EQUIPO") {
    $.ajax({
      url: servidor + 'users/' + idInicioSesion,
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
    url: servidor + 'users/' + idInicioSesion,
    'data': JSON.stringify({
      games: ""
    }),
    'type': 'PUT',
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
    url: servidor + 'users/' + idInicioSesion,
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
    url: servidor + 'users/' + idInicioSesion,
    'data': JSON.stringify({
      games: stringJuego
    }),
    'type': 'PUT',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
})


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
  if ($("#buscador-integrante").val().length < 3) return
  console.log($("#buscador-integrante").val())
  let valorBuscar = $("#buscador-integrante").val();
  $.ajax({
    url: servidor + 'users?buscar=' + valorBuscar,
    'type': 'GET',
    success: function (response) {
      $("#carga-integrantes button").remove()
      let numeroElementos = Math.min(3, response.datos.length)
      for (let i = 0; i < numeroElementos; i++) {
        $("#carga-integrantes").append(
          `<div id="integrante-datos${i}" class="col-md-6 seleccionar-integrante">
              <button id="boton-integrante${i}" value="${response.datos[i].id}" class="boton-integrante">${response.datos[i].username}</button>
          </div>`
        )
      }
      $(".boton-integrante").click(function () {
        $(".boton-integrante").removeClass("seleccionado");
        $(this).addClass("seleccionado");
      })
    }
  });
})

$("#lanzar-integrante-nuevo").click(function () {
  let idMiembroSeleccionado = $(".seleccionado").val();
  let usernameMiembroSeleccionado = $(".seleccionado").text();

  $.ajax({
    url: servidor + 'members/',
    data: {
      "team": idInicioSesion,
      "user": idMiembroSeleccionado
    },
    'type': 'POST'
  });
  location.reload()
});



function toBase64(arr) {
  return btoa(
    arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}
