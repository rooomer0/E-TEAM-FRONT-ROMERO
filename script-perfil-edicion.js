

$(document).ready(function () {
    // conexion API
    $.ajax({
      url: 'https://eteamapp.herokuapp.com/api/users/629923ac84944079440d54e0',
      type: 'GET',
      success: function(respuesta) {
        if (respuesta.datos.profileType.toString() == "gamer"){
          $("#boton-crear-perfil").val("Crear perfil EQUIPO");
          $(".datos-juegos").show();
          $(".datos-integrantes").hide();
        }else if (respuesta.datos.profileType.toString() == "team"){
          $("#boton-crear-perfil").val("Crear perfil GAMER");
          $(".datos-juegos").hide();
          $(".datos-integrantes").show();
        }
        $("#tipo-perfil-span").html(respuesta.datos.profileType.toString().toUpperCase());
        $("#usuario-perfil-span").html(respuesta.datos.username.toString());
        $("#correo-perfil-span").html(respuesta.datos.email.toString());
      },
      error: function() {
          console.error("No es posible completar la operación");
      }
    });
  })
