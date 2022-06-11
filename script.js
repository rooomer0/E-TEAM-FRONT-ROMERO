$(document).ready(function(){
    if ($("#imagen-cargada").attr("src")=="")
    $("#imagen-cargada").hide()
})

imgInp.onchange = evt => {
  const [file] = imgInp.files
  if (file) {
    blah.src = URL.createObjectURL(file)
    $("#imagen-cargada").show()
    $("#imagen-cargada").attr("src",blah.src)
  }
}

$(document).ready(function(){
var margin = 10,
            instance1 = new emojiButtonList( "boton-emoji", {
                dropDownXAlign: "left",
                textBoxID: "boton-emoji1",
                yAlignMargin: margin,
                xAlignMargin: margin
            } );

        function emojiClickEvent( emojiText ) {
            document.title += " " + emojiText;
        }

      })
