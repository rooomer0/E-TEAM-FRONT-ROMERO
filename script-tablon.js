$(document).ready(function () {
  $.ajax({
    url: 'https://eteamapp.herokuapp.com/api/users/629923ac84944079440d54e0',
    type: 'GET',
    success: function(respuesta) {
      $("#usuario-tablon-span").html(respuesta.datos.username.toString());
      $("#seguidores-perfil-span").html(respuesta.datos.theFollowers.length);
      $("#siguiendo-perfil-span").html(respuesta.datos.theFollowing.length);
    },
    error: function() {
        console.error("No es posible completar la operación");
    }
  });
  // conexion API
  
})

imgInp.onchange = evt => {
  const [file] = imgInp.files
  if (file) {
    blah.src = URL.createObjectURL(file)
    $("#imagen-cargada").show()
    $("#imagen-cargada").attr("src", blah.src)
  }
}

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
  if ($("#imagen-cargada").attr("src") == ""){
    $("#imagen-cargada").hide()
  }
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
});




