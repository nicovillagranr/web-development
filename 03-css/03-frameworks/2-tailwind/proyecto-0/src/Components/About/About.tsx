import { ColorScheme } from "../UI/ColorScheme/ColorScheme"
import { CustomPropsComponent } from "../UI"
import { ComponentWithVariant } from "../UI"
export const About = () => {
    return (
        <section id="about" className="page-container flex flex-col justify-center items-center gap-4 ">
            <ColorScheme />
            <CustomPropsComponent text="Hello, Tailwind!" color="var(--color-secondary)" />
            <ComponentWithVariant />
        </section>
    )
}