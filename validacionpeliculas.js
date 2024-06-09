// levanto los campos del formulario de registro que voy a validar
const titulo = document.getElementById('titulo');
const fecha = document.getElementById('fecha');
const genero = document.getElementById('genero');
const duracion = document.getElementById('duracion');
const director = document.getElementById('director');
const reparto = document.getElementById('reparto');
const sinopsis = document.getElementById('sinopsis');
const imagen = document.getElementById('imagen');
const formPeliculas = document.getElementById('form-peliculas');

// levanto los campos de error
const errorTitulo = document.getElementById('error-titulo');
const errorFecha = document.getElementById('error-fecha');
const errorGenero = document.getElementById('error-genero');
const errorDuracion = document.getElementById('error-duracion');
const errorDirector = document.getElementById('error-director');
const errorReparto = document.getElementById('error-reparto');
const errorSinopsis = document.getElementById('error-sinopsis');
const errorImagen = document.getElementById('error-imagen');

//si se termino de cargar el dom
document.addEventListener('DOMContentLoaded', function() {

        //en el evento submit valido que los campos esten llenos y no dejo que se envie automaticamente el formulario
        formPeliculas.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("entro a la funcion");
            // limpio los mensajes de error
            errorTitulo.innerText = "";
            errorFecha.innerText = "";
            errorGenero.innerText = "";
            errorDuracion.innerText = "";
            errorDirector.innerText = "";
            errorReparto.innerText = "";
            errorSinopsis.innerText = "";
            errorImagen.innerText = "";

            if (titulo.value === '' || titulo.value == null) {
                e.preventDefault();
                errorTitulo.innerText = "El título es obligatorio";
            }
            if (fecha.value === '' || fecha.value == null) {
                e.preventDefault();
                errorFecha.innerText = "La fecha de lanzamiento es obligatoria";
            }
            if (genero.value === '' || genero.value == null) {
                e.preventDefault();
                errorGenero.innerText = "El género es obligatorio";
            }
            if (duracion.value === '' || duracion.value == null) {
                e.preventDefault();
                errorDuracion.innerText = "La duración es obligatoria";
            }
            if (director.value === '' || director.value == null) {
                e.preventDefault();
                errorDirector.innerText = "El director es obligatorio";
            }
            if (reparto.value === '' || reparto.value == null) {
                e.preventDefault();
                errorReparto.innerText = "El reparto es obligatorio";
            }
            if (sinopsis.value === '' || sinopsis.value == null) {
                e.preventDefault();
                errorSinopsis.innerText = "La sinopsis es obligatoria";
            }
            if (imagen.value === '' || imagen.value == null) {
                e.preventDefault();
                errorImagen.innerText = "La imagen es obligatoria";
            }


        });

});

// no se valida cuando toca tabb y enter, solo al momento de precionar el submit