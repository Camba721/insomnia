export function insertModifyForm(movieId, movies) {
    const movie = movies.find(m => m.idPelicula == movieId);

    if (!movie) {
        console.error(`No se pudo encontrar la película con ID ${movieId}`);
        return;
    }

    const movieItem = document.querySelector(`[data-id-pelicula="${movieId}"]`);

    if (!movieItem) {
        console.error(`No se pudo encontrar el elemento de la película con ID ${movieId}`);
        return;
    }

    const formContainer = document.createElement('div');
    formContainer.classList.add('modify-form-container');

    const modifyForm = document.createElement('div');
    modifyForm.classList.add('modify-form');
    modifyForm.innerHTML = `
        <form id="modify-form-${movieId}" class="modify__form">
        
        <p>Ingrese los datos que quiera modificar</p>

            <label for="modify-titulo">Título</label>
            <input class="modify__form__input" type="text" id="modify-titulo" name="titulo" value="${movie.titulo}">

            <label for="modify-fecha">Fecha de Lanzamiento</label>
            <input class="modify__form__input" type="date" id="modify-fecha" name="fecha" value="${movie.fechaDeLanzamiento}">

            <label for="modify-genero">Género</label>
            <input class="modify__form__input" type="text" id="modify-genero" name="genero" value="${movie.genero}">

            <label for="modify-duracion">Duración</label>
            <input class="modify__form__input" type="text" name="duracion" id="modify-duracion" value="${movie.duracion}">
            
            <label for="modify-director">Director</label>
            <input class="modify__form__input" type="text" name="director" id="modify-director" value="${movie.director}">

            <label for="modify-reparto">Reparto</label>
            <input class="modify__form__input" type="text" name="reparto" id="modify-reparto" value="${movie.reparto}">

            <label for="modify-sinopsis">Sinopsis</label>
            <textarea class="modify__form__input" name="sinopsis" id="modify-sinopsis">${movie.sinopsis}</textarea>

            <label for="modify-imagen">URL de la Imagen</label>
            <input class="modify__form__input" type="text" id="modify-imagen" name="imagen" value="${movie.imagen}">
            
            <div class="modify__form__btns"><button class="btn modify__form__btn guardar" type="submit">Guardar</button>
            <button class="btn modify__form__btn cancelar" type="button">Cancelar</button></div>
            
        </form>
    `;


    formContainer.appendChild(modifyForm);
    movieItem.parentNode.insertBefore(formContainer, movieItem.nextSibling);

    const form = document.getElementById(`modify-form-${movieId}`);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const updatedFields = {};

        // Comparar los valores del formulario con los valores originales
        for (let [key, value] of formData.entries()) {
            if (value !== movie[key] && value.trim() !== '') {
                updatedFields[key] = value;
            }
        }

        // Si no hay campos actualizados, no hacer nada
        if (Object.keys(updatedFields).length === 0) {
            console.log('No se han realizado cambios');
            formContainer.remove();
            return;
        }

        try {
            const updateResponse = await fetch(`http://localhost:8080/app/peliculas/${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            if (updateResponse.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Película actualizada correctamente",
                    confirmButtonColor: "#e9540e"
                }).then(() => {
                    formContainer.remove();
                    location.reload();
                });

            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Error al actualizar la película: ${errorData.message || updateResponse.status}`,
                    confirmButtonColor: "#e9540e"
                });
            }

        } catch (error) {
            console.error('Error al actualizar la película:', error);
        }
    });

    // Manejar el botón de cancelar
    const cancelButton = modifyForm.querySelector('.cancelar');
    cancelButton.addEventListener('click', () => {
        formContainer.remove();
    });
}