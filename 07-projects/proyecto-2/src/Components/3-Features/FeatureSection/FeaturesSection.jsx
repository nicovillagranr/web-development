import FeatureCard from "../FeatureCard/FeatureCard"

import penRulerIcon from "../../../assets/icons/features/pen-ruler.svg"
import responsiveIcon from "../../../assets/icons/features/desktop.svg"
import lightIcon from "../../../assets/icons/features/light.svg"
import reactIcon from "../../../assets/icons/features/react.svg"
import suitcaseIcon from "../../../assets/icons/features/suitcase.svg"
import cloudIcon from "../../../assets/icons/features/cloud.svg"

import "./FeatureSection.css"

function FeatureSection() {
    return (
        <section className="feature" id="feature" aria-labelledby="features-title">
            <h2 className="sr-only" id="features-title">Features</h2>
            <div className="feature__cards">
                <FeatureCard icon={penRulerIcon} title="Easily Customized" text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus veritatis soluta quas distinctio dolores alias. Quasi molestias iure fugit provident." />
                <FeatureCard icon={responsiveIcon} title="Responsive Ready" text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus veritatis soluta quas distinctio dolores alias. Quasi molestias iure fugit provident." />
                <FeatureCard icon={lightIcon} title="Modern Design" text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus veritatis soluta quas distinctio dolores alias. Quasi molestias iure fugit provident." />
                <FeatureCard icon={reactIcon} title="Clean Code" text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus veritatis soluta quas distinctio dolores alias. Quasi molestias iure fugit provident." />
                <FeatureCard icon={suitcaseIcon} title="Ready to ship" text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus veritatis soluta quas distinctio dolores alias. Quasi molestias iure fugit provident." />
                <FeatureCard icon={cloudIcon} title="Download for Free" text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus veritatis soluta quas distinctio dolores alias. Quasi molestias iure fugit provident." />
            </div>
        </section>
    )
}
export default FeatureSection
