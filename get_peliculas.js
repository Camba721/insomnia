import { insertModifyForm } from './put_peliculas.js';
import { deleteMovieBtns } from './delete_peliculas.js';

document.addEventListener('DOMContentLoaded', async () => {
    const mainListTable = document.querySelector('.main__list__table');

    try {

        console.log("Iniciando petición fetch...");

        const response = await fetch('http://localhost:8080/app/peliculas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Respuesta recibida:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const movies = await response.json();

        console.log("Datos recibidos:", movies);

        // Limpiamos el contenido existente
        mainListTable.innerHTML = '';

        movies.forEach(movie => {

            const movieItem = document.createElement('div');
            movieItem.classList.add('main__list__table__item');
            movieItem.dataset.idPelicula = movie.idPelicula;

            // Divide el género en palabras separadas
            const genres = movie.genero.split('/').map(genre => genre.trim());

            movieItem.innerHTML = `
                <img id="pelicula-img" src="${movie.imagen}" alt="${movie.titulo}">
                <table>
                    <tr>
                        <th>Título</th>
                    </tr>
                    <tr>
                        <td id="pelicula-titulo">${movie.titulo}</td>
                    </tr>
                    <tr>
                        <th>Género</th>
                    </tr>
                    <tr>
                        <td id="pelicula-genero">${genres.join(', ')}</td>
                    </tr>
                    <tr>
                        <th>Acciones</th>
                    </tr>
                    <tr>
                        <td>
                            <button class="main__list__table__item__btn btn modificar">Modificar</button>
                            <button class="main__list__table__item__btn btn eliminar">Eliminar</button>
                        </td>
                    </tr>
                </table>
            `;

            mainListTable.appendChild(movieItem);
        });

        // Evento para los botones de modificar
        document.querySelectorAll('.modificar').forEach(button => {
            button.addEventListener('click', (event) => {
                const movieItem = event.target.closest('.main__list__table__item');
                const movieId = movieItem.dataset.idPelicula;
                console.log("ID de la película a modificar:", movieId);
                insertModifyForm(movieId, movies);
            });
        });

        //Manejador de evento para los botones de eliminar
        deleteMovieBtns(movies);

    } catch (error) {
        console.error("Error al obtener las películas:", error);
        mainListTable.innerHTML = '<p class="error-movies">Error al cargar las películas. Por favor, intenta de nuevo más tarde.</p>';
    }
});