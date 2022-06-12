$(document).ready(function () {
    // conexion API
    $.ajax({
      url: 'https://eteamapp.herokuapp.com/api/users/62a4d28ac27a64a3da0995ec',
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
        if (respuesta.datos.games.toString()==""){
          $("#boton-anadir-juego").show();
          $("#eliminar-juego-perfil").hide();
          $("#editar-juego-perfil").hide();
        }else {
          $("#boton-anadir-juego").hide();
          $("#eliminar-juego-perfil").show();
          $("#editar-juego-perfil").show();
        }
        $("#games-usuario").html(respuesta.datos.games.toString());
      },
      error: function() {
          console.error("No es posible completar la operación");
      }
    });
  })
