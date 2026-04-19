import { ColorScheme } from "../../UI/ColorScheme/ColorScheme"
import { CustomPropsComponent } from "../../UI"
import { ComponentWithVariant } from "../../UI"
import { ComponentWithContainerQueries } from "../../UI"
import { LinearGradient } from "../../UI"
import { InsetShadowsAndRings } from "../../UI"

export const About = () => {
    return (
        <section id="about" className="flex flex-col justify-center items-center p-5">
            <ColorScheme />
            <CustomPropsComponent text="Hello, Tailwind!" color="var(--color-secondary)" />
            <ComponentWithVariant />
            <ComponentWithContainerQueries />
            <LinearGradient />
            <InsetShadowsAndRings />
        </section>
    )
}