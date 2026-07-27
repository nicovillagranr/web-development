import member1 from "../../../assets/images/team/team__member-1.webp"
import member2 from "../../../assets/images/team/team__member-2.webp"
import member3 from "../../../assets/images/team/team__member-3.webp"
import member4 from "../../../assets/images/team/team__member-4.webp"

import TeamMemberCard from "../TeamMemberCard/TeamMemberCard"

import "./TeamSection.css"

function TeamSection() {
    return (
        <section className="team" id="team" aria-labelledby="team-title">
            <h2 className="sr-only" id="team-title">Our Team</h2>
            <ul className="team__list">
                <TeamMemberCard
                    photo={member1}
                    name="Ruth Woods"
                    position="FOUNDER, CEO"
                    description="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo." />
                <TeamMemberCard
                    photo={member2}
                    name="Timothy Reed"
                    position="CO-FOUNDER, DEVELOPER"
                    description="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo." />
                <TeamMemberCard
                    photo={member3}
                    name="Victoria Valdez"
                    position="UI DESIGNER"
                    description="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo." />
                <TeamMemberCard
                    photo={member4}
                    name="Beberly Little"
                    position="DATA SCIENTIST"
                    description="Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo." />
            </ul>
        </section>
    )
}
export default TeamSection
