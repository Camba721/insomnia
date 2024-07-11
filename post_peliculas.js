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

                Swal.fire({
                    icon: "success",
                    title: "Película agregada correctamente",
                    confirmButtonColor: "#e9540e"
                }).then(() => {
                    formPeliculas.reset();
                    location.reload();
                });

            } else {
                const errorData = await response.json();

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Error al agregar la película: ${errorData.message || 'Todos los campos son obligatorios'}`,
                    confirmButtonColor: "#e9540e"
                });
            }
        } catch (error) {
            alert(`Error de red: ${error.message}`);
        }
    });
});