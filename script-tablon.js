let idInicioSesion = "62a702295174230e04ecafe4"
let servidor = "http://localhost:8800/api/"
$(document).ready(function () {
  $.ajax({
    url: servidor + 'users/' + idInicioSesion,
    type: 'GET',
    success: function (respuesta) {
      //carga de datos del usuario con el que se ha iniciado sesion
      // $("#img-eteam").attr("src",respuesta.datos.username);
      $("#usuario-tablon-span").html(respuesta.datos.username.toString());
      $("#descripcion-tablon-span").html(respuesta.datos.description.toString());
      $("#usuario-tablon-span-miniatura").html(respuesta.datos.username.toString());
      $("#descripcion-tablon-span-miniatura").html(respuesta.datos.description.toString());
      $("#nombre-tablon-span").html(respuesta.datos.name.toString());
      $("#apellidos-tablon-span").html(respuesta.datos.secondName.toString());
      $("#juegos-tablon-span").html(respuesta.datos.games.toString());
      $("#seguidores-perfil-span").html(respuesta.datos.theFollowers.length);
      $("#siguiendo-perfil-span").html(respuesta.datos.theFollowing.length);
      for (let index = 0; index < respuesta.datos.thePosts.length; index++) {
        let idPost = respuesta.datos.thePosts[index].id;
        $("#contenedor-post").append(`<div class="row">
      <div class="col-md-1">
          <img class="img-miniatura-perfil-post" src="../../../Downloads/img_perfil.jpeg">
      </div>
      <div class="col-md-11">
          <span class="post-usuario-dato">@<span id="usuario-post-span${idPost}"></span></span><br>
          <span class="post-usuario-dato"><span id="descripcion-usuario-post-span${idPost}"></span></span><br>
          <span class="post-fecha-hora"><span id="hora-post-span${idPost}"></span></span>
      </div>
  </div>
  <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10 post-contenido">
          <span id="descripcion-post-span${idPost}"></span>
      </div>
      <div class="col-md-1"></div>
  </div>
  <div class="row">
      <div class="col-md-2 post-boton">
          <button class="boton-icono icono-xs">
              <i class="fi fi-rr-redo align-middle"></i>
              <span class="numero-interacciones">50</span>
          </button>
      </div>
      <div class="col-md-2 post-boton">
          <button class="boton-icono icono-xs">
              <i class="fi fi-rr-heart align-middle"></i>
              <span class="numero-interacciones">50</span>
          </button>
      </div>
      <div class="col-md-2 post-boton">
          <button class="boton-icono icono-xs " >
              <i class="fi fi-rr-comment align-middle"></i>
              <span class="numero-interacciones">50</span>
          </button>
      </div>
      <div class="col-md-2 post-boton">
          <button class="boton-icono icono-xs">
              <i class="fi fi-rr-share align-middle"></i>
              <span class="numero-interacciones">50</span>
          </button>
      </div>
      <div class="col-md-2 post-boton">
          <button class=" boton-icono icono-xs ">
              <i class="fi fi-rr-bookmark align-middle"></i>
              <span class="numero-interacciones">50</span>
          </button>
      </div>
      <div class="col-md-2 post-boton">
          <button class="boton-icono icono-xs">
              <i class="fi fi-rr-menu-dots-vertical align-middle"></i>
      </button>
      </div>
  </div>
  <div class="row barraNegra">`)
        $(`#usuario-post-span${idPost}`).html(respuesta.datos.thePosts[index].owner.toString());
        $(`#descripcion-usuario-post-span${idPost}`).html(respuesta.datos.thePosts[index].owner.toString());
        $(`#hora-post-span${idPost}`).html(respuesta.datos.thePosts[index].createdAt.toString());
        $(`#descripcion-post-span${idPost}`).html(respuesta.datos.thePosts[index].text.toString());
      }

    },
    error: function () {
      console.error("No es posible completar la operaci??n");
    }
  });
  // conexion API

})


$(document).ready(function () {
  var margin = 10,
    instance1 = new emojiButtonList("boton-emoji", {
      dropDownXAlign: "left",
      textBoxID: "boton-emoji1",
      yAlignMargin: margin,
      xAlignMargin: margin
    });

  function emojiClickEvent(emojiText) {
    document.title += " " + emojiText;
  }

})


$(document).ready(function () {

  $("#contenedor-comentarios").show();
  $("#contenedor-fotos-videos").hide();
  $("#contenedor-destacados").hide();

  $("#seccion-comentarios").click(function () {
    $("#contenedor-comentarios").show();
    $("#contenedor-fotos-videos").hide();
    $("#contenedor-destacados").hide();

  });

  $("#seccion-fotos-videos").click(function () {
    $("#contenedor-comentarios").hide();
    $("#contenedor-fotos-videos").show();
    $("#contenedor-destacados").hide();

  });

  $("#seccion-destacados").click(function () {
    $("#contenedor-comentarios").hide();
    $("#contenedor-fotos-videos").hide();
    $("#contenedor-destacados").show();

  });
  $("#icono-perfil-boton").click(function () {
    if ($(".desplegable-perfil").css("display") == "none") {
      $(".desplegable-perfil").show()
    } else{
      $(".desplegable-perfil").hide()
    }
  })
});

$("#boton-subir-post").click(function(){
  let contenidNuevoPost = $("#texto-post-subir").val();
  let idOwner = "62a702295174230e04ecafe4";
  $.ajax({
    url: servidor + 'posts/',
    'data': JSON.stringify({   
      text: contenidNuevoPost,
      multimedia:"",
      "likes.number": 0,
      "likes.usersId":"",
      owner: idOwner
    }),
    'type': 'POST',
    'contentType': 'application/json; charset=utf-8',
  });
  location.reload();
})


