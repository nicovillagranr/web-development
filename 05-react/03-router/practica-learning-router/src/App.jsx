import { Navigate, NavLink, Outlet, Route, Routes, useParams } from 'react-router-dom'
import { COURSES } from './data/courses'

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="header">
        <h1>Learning Router Lab</h1>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/cursos">Cursos</NavLink>
          <NavLink to="/retos">Retos</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

function DashboardPage() {
  return (
    <section className="panel">
      <p className="eyebrow">Ruta principal</p>
      <h2>Dashboard de estudio</h2>
      <p>
        Usa el menu para navegar y observa como cambia la URL sin recargar la pagina.
      </p>
    </section>
  )
}

function CoursesLayout() {
  return (
    <section className="panel">
      <p className="eyebrow">Rutas anidadas</p>
      <h2>Catalogo de cursos</h2>
      <p>Selecciona un curso para ver detalle dinamico por slug.</p>

      <div className="course-grid">
        <aside>
          <ul className="side-list">
            {COURSES.map((course) => (
              <li key={course.slug}>
                <NavLink to={`/cursos/${course.slug}`}>{course.title}</NavLink>
              </li>
            ))}
          </ul>
        </aside>

        <section className="detail-area">
          <Outlet />
        </section>
      </div>
    </section>
  )
}

function CoursesIndex() {
  return (
    <article className="card">
      <h3>Elige un curso</h3>
      <p>Este panel muestra un componente index en una ruta anidada.</p>
    </article>
  )
}

function CourseDetail() {
  const { slug } = useParams()
  const course = COURSES.find((item) => item.slug === slug)

  if (!course) {
    return (
      <article className="card">
        <h3>Curso no encontrado</h3>
        <p>Revisa el slug en la URL.</p>
      </article>
    )
  }

  return (
    <article className="card">
      <h3>{course.title}</h3>
      <p>
        Nivel: <strong>{course.level}</strong>
      </p>
      <p>{course.objective}</p>
      <ul>
        {course.lessons.map((lesson) => (
          <li key={lesson}>{lesson}</li>
        ))}
      </ul>
    </article>
  )
}

function ChallengesPage() {
  return (
    <section className="panel">
      <p className="eyebrow">Practica guiada</p>
      <h2>Retos del modulo</h2>
      <ul>
        <li>Agregar ruta de perfil con params dinamicos.</li>
        <li>Crear pagina de administracion con nested routes.</li>
        <li>Integrar redirects condicionales con Navigate.</li>
      </ul>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="panel">
      <h2>404</h2>
      <p>La ruta solicitada no existe en este laboratorio.</p>
    </section>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="cursos" element={<CoursesLayout />}>
          <Route index element={<CoursesIndex />} />
          <Route path=":slug" element={<CourseDetail />} />
        </Route>
        <Route path="retos" element={<ChallengesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
