import Header from "../Header/Header"
import Footer from "../Footer/Footer"

import "./Layout.css"

// TODO(tipos): `children` es JSX que entra desde fuera — mira App.tsx, le mete
// 6 componentes de golpe. Necesitas el tipo con el que React describe "cualquier
// cosa que se pueda pintar". Es tu exercise-05 de 09-react-props.
// OJO: con `verbatimModuleSyntax` un tipo se importa con `import type`, no con
// `import` normal. Si te equivocas ahí, compila pero revienta en runtime.
function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="main">{children}</main>
            <Footer />
        </>
    );
}
export default Layout;
