import { ColorScheme } from "../UI/ColorScheme/ColorScheme"
import { CustomPropsComponent } from "../UI"

export const About = () => {
    return (
        <section id="about" className="page-container flex flex-col justify-center items-center">
            <ColorScheme />
            <CustomPropsComponent text="Hello, Tailwind!" color="var(--color-secondary)" />
        </section>
    )
}