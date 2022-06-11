$(document).ready(function () {
  if ($("#imagen-cargada").attr("src") == "")
    $("#imagen-cargada").hide()
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