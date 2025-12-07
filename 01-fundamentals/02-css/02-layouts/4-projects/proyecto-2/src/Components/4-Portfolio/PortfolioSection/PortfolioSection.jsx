import PortfolioItem from "../PortfolioItem/PortfolioItem"

import PorfolioItem1 from "../../../assets/images/portfolio/0_0.webp"
import PorfolioItem2 from "../../../assets/images/portfolio/0_1.webp"
import PorfolioItem3 from "../../../assets/images/portfolio/0_2.webp"
import PorfolioItem4 from "../../../assets/images/portfolio/0_3.webp"
import PorfolioItem5 from "../../../assets/images/portfolio/1_0.webp"
import PorfolioItem6 from "../../../assets/images/portfolio/1_1.webp"
import PorfolioItem7 from "../../../assets/images/portfolio/1_2.webp"
import PorfolioItem8 from "../../../assets/images/portfolio/1_3.webp"

import "./PortfolioSection.css"

function PortfolioSection() {
    return (
        <section className="portfolio__section" id="portfolio">
            <PortfolioItem img={PorfolioItem1} name="Portfolio Item 1" text="Lorem ipsum dolor sit amet ." />
            <PortfolioItem img={PorfolioItem2} name="Portfolio Item 2" text="Lorem ipsum dolor sit amet ." />
            <PortfolioItem img={PorfolioItem3} name="Portfolio Item 3" text="Lorem ipsum dolor sit amet ." />
            <PortfolioItem img={PorfolioItem4} name="Portfolio Item 4" text="Lorem ipsum dolor sit amet ." />
            <PortfolioItem img={PorfolioItem5} name="Portfolio Item 5" text="Lorem ipsum dolor sit amet ." />
            <PortfolioItem img={PorfolioItem6} name="Portfolio Item 6" text="Lorem ipsum dolor sit amet ." />
            <PortfolioItem img={PorfolioItem7} name="Portfolio Item 7" text="Lorem ipsum dolor sit amet ." />
            <PortfolioItem img={PorfolioItem8} name="Portfolio Item 8" text="Lorem ipsum dolor sit amet ." />
        </section>
    )
}
export default PortfolioSection