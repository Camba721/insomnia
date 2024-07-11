export function deleteMovieBtns(movies) {

    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', (event) => {
            const movieItem = event.target.closest('.main__list__table__item');
            const movieId = movieItem.dataset.idPelicula;
            const movie = movies.find(m => m.idPelicula == movieId);

            Swal.fire({
                title: '¿Estás seguro?',
                text: `¿Quieres eliminar la película "${movie.titulo}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#297391',
                cancelButtonColor: '#e9540e',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteMovie(movieId, movieItem);
                }
            });
        });
    });
}

async function deleteMovie(movieId, movieItem) {
    try {
        const response = await fetch(`http://localhost:8080/app/peliculas/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.message);

        // Eliminar el elemento de la película del DOM
        movieItem.remove();

        Swal.fire({
            icon: "success",
            title: "Película eliminada correctamente",
            confirmButtonColor: "#e9540e"
        }).then(() => {
            location.reload();
        });
        
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Error al eliminar la película: ${error}`,
            confirmButtonColor: "#e9540e"
        });
    }
}