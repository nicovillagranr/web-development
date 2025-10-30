import './main.css'
import img from '../assets/placeholder.jpg'

function Main() {
    return (
        <main>
            <section>
                <h2>Bienvenido a mi carpeta de proyectos HTML</h2>
                <p>
                    Esta es una recopilación de ejemplos, ejercicios y proyectos creados durante mi aprendizaje de HTML.
                    El objetivo es entender la estructura, las etiquetas más comunes y cómo se organizan los documentos web.
                </p>
                <img src={img} alt="Ejemplo de diseño básico" />
            </section>

            <article>
                <h2>¿Qué contiene este repositorio?</h2>
                <p>
                    Aquí encontrarás distintos proyectos que van desde estructuras simples hasta layouts más completos.
                    Cada carpeta representa un experimento distinto: formularios, tablas, multimedia, semántica, entre otros.
                </p>
                <p>
                    Este archivo <strong>intro.html</strong> actúa como punto de partida y guía visual para navegar entre ellos.
                </p>
            </article>

            <aside>
                <h3>Índice de temas</h3>
                <ul>
                    <li>Estructura base y etiquetas principales</li>
                    <li>Textos y enlaces</li>
                    <li>Imágenes y multimedia</li>
                    <li>Listas y tablas</li>
                    <li>Formularios</li>
                    <li>Semántica y accesibilidad</li>
                </ul>
            </aside>
        </main>
    )
}
export default Main