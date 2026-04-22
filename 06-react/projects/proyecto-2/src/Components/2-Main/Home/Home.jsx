import { HeroBanner } from "./HeroBanner"
import { CategoryGrid } from "./CategoryGrid"
import { CampaignGrid } from "./CampaignGrid"

export const Home = () => {
    return (
        <>
            <HeroBanner />
            <CategoryGrid />
            <CampaignGrid />
        </>
    )
}
