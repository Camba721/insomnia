document.addEventListener('DOMContentLoaded', async () => {
    const formPeliculas = document.getElementById('form-peliculas');

    formPeliculas.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formPeliculas);
        const titulo = formData.get('titulo');
        const fechaDeLanzamiento = formData.get('fecha');
        const genero = formData.get('genero');
        const duracion = formData.get('duracion');
        const director = formData.get('director');
        const reparto = formData.get('reparto');
        const sinopsis = formData.get('sinopsis');
        const imagen = formData.get('imagen');

        if (titulo === '' || fecha === '' || genero === '' || duracion === '' || director === '' || reparto === '' || sinopsis === '' || imagen === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo,
                fechaDeLanzamiento,
                genero,
                duracion,
                director,
                reparto,
                sinopsis,
                imagen
            })
        };

        try {
            const response = await fetch('http://localhost:8080/app/peliculas', options);

            if (response.ok) {
                const responseData = await response.json();
                alert('Película agregada correctamente');
                formPeliculas.reset();
                location.reload();
            } else {
                const errorData = await response.json();
                alert(`Error al agregar la película: ${errorData.message || 'Error desconocido'}`);
            }
        } catch (error) {
            alert(`Error de red: ${error.message}`);
        }
    });
});