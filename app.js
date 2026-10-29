const recuerdos = [
    {
        imagen: "https://i.pinimg.com/originals/52/7c/1e/527c1e22e6247e6873e382c4b3db8837.jpg",
        titulo: "Siempre en nuestro corazón",
        descripcion: "Tu recuerdo ilumina nuestra ofrenda.",
        dedicatoria: "Con mucho amor recordamos los momentos compartidos. Tu recuerdo siempre tendrá un lugar especial en nuestro corazón."
    },
    {
        imagen: "https://img.freepik.com/vector-premium/altar-ofrendas-dia-muertos_1302918-52204.jpg",
        titulo: "Momentos inolvidables",
        descripcion: "Los recuerdos bonitos permanecen.",
        dedicatoria: "Cada momento vivido forma parte de nuestra historia. Hoy honramos esos recuerdos con cariño y gratitud."
    },
    {
        imagen: "https://static.vecteezy.com/system/resources/previews/004/209/400/non_2x/altar-day-of-the-dead-vector.jpg",
        titulo: "Con amor y cariño",
        descripcion: "Tu luz sigue brillando.",
        dedicatoria: "Esta ofrenda representa nuestro amor, nuestras tradiciones y el recuerdo de las personas que son importantes para nosotros."
    }
];

let indiceActual = 0;

const fotoPrincipal = document.getElementById("fotoPrincipal");
const tituloFoto = document.getElementById("tituloFoto");
const descripcionFoto = document.getElementById("descripcionFoto");
const indicadores = document.getElementById("indicadores");

const ventana = document.getElementById("ventanaRecuerdo");
const tituloDedicatoria = document.getElementById("tituloDedicatoria");
const textoDedicatoria = document.getElementById("textoDedicatoria");

// CAMBIAR LA PRESENTACIÓN
function mostrarRecuerdo(indice) {
    indiceActual = (indice + recuerdos.length) % recuerdos.length;

    const recuerdo = recuerdos[indiceActual];

    fotoPrincipal.src = recuerdo.imagen;
    fotoPrincipal.alt = recuerdo.titulo;
    tituloFoto.textContent = recuerdo.titulo;
    descripcionFoto.textContent = recuerdo.descripcion;

    // Actualizar los tres puntos
    const puntos = indicadores.querySelectorAll(".punto");

    puntos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indiceActual);
    });
}

// FLECHA IZQUIERDA
document.getElementById("anterior").addEventListener("click", () => {
    mostrarRecuerdo(indiceActual - 1);
});

// FLECHA DERECHA
document.getElementById("siguiente").addEventListener("click", () => {
    mostrarRecuerdo(indiceActual + 1);
});

// BOTONES REDONDOS
indicadores.querySelectorAll(".punto").forEach((punto, i) => {
    punto.addEventListener("click", () => {
        mostrarRecuerdo(i);
    });
});

// ABRIR DEDICATORIA DE CADA FOTO
document.getElementById("verRecuerdo").addEventListener("click", () => {
    const recuerdo = recuerdos[indiceActual];

    tituloDedicatoria.textContent = recuerdo.titulo;
    textoDedicatoria.textContent = recuerdo.dedicatoria;

    ventana.showModal();
});

// CERRAR DEDICATORIA
document.getElementById("cerrarRecuerdo").addEventListener("click", () => {
    ventana.close();
});

document.getElementById("botonCerrar").addEventListener("click", () => {
    ventana.close();
});

/* REPRODUCTOR DE YOUTUBE */

const botonMusica = document.getElementById("botonMusica");
const estadoMusica = document.getElementById("estadoMusica");

let reproductorYouTube = null;
let reproductorListo = false;
let musicaReproduciendose = false;

// Cargar la API oficial de YouTube
window.onYouTubeIframeAPIReady = function () {
    reproductorYouTube = new YT.Player("reproductorYouTube", {
        events: {
            onReady: function () {
                reproductorListo = true;
                estadoMusica.textContent =
                    "Pulsa el botón para escuchar la música.";
            },

            onStateChange: function (evento) {
                if (evento.data === YT.PlayerState.PLAYING) {
                    musicaReproduciendose = true;
                    botonMusica.textContent = "⏸ Pausar música";
                    estadoMusica.textContent =
                        "♪ Música reproduciéndose";
                } else if (
                    evento.data === YT.PlayerState.PAUSED ||
                    evento.data === YT.PlayerState.ENDED
                ) {
                    musicaReproduciendose = false;
                    botonMusica.textContent = "▶️ Reproducir música";
                    estadoMusica.textContent =
                        "Pulsa el botón para escuchar la música.";
                }
            }
        }
    });
};

// Insertar el archivo de la API de YouTube
const scriptYouTube = document.createElement("script");
scriptYouTube.src = "https://youtu.be/_oeUQu1SvCM?list=RD_oeUQu1SvCM";
document.head.appendChild(scriptYouTube);

// Controlar el botón
botonMusica.addEventListener("click", function () {
    if (!reproductorListo || !reproductorYouTube) {
        estadoMusica.textContent =
            "El reproductor está cargando. Espera unos segundos.";
        return;
    }

    if (musicaReproduciendose) {
        reproductorYouTube.pauseVideo();
    } else {
        reproductorYouTube.playVideo();
    }
});

// MOSTRAR LA PRIMERA FOTOGRAFÍA
mostrarRecuerdo(0);