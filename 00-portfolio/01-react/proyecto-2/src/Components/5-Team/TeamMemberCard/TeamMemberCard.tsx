import facebookIcon from "../../../assets/icons/facebook.svg"
import twitterIcon from "../../../assets/icons/twitter.svg"
import linkedinIcon from "../../../assets/icons/linkedin.svg"

import "./TeamMemberCard.css"

// TODO(tipos): el mismo patrón por tercera vez, ya con 4 props. Quien las pasa
// es TeamSection.tsx. Fíjate en que `name` se usa dentro de una plantilla
// (`Visit ${name} on Facebook`) — eso también te dice algo de su tipo.
function TeamMemberCard({ photo, name, position, description }) {
    return (
        <li className="member">
            <img src={photo} alt={name || "Team Member"} className="member__img" loading="lazy" decoding="async" />
            <h3 className="member__name">{name}</h3>
            <h4 className="member__position">{position}</h4>
            <p className="member__description">{description}</p>
            <ul className="member__list">
                <li className="member__social">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name} on Facebook`}>
                        <img src={facebookIcon} alt="" className="member__social-icon" />
                    </a>
                </li>
                <li className="member__social">
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name} on X`}>
                        <img src={twitterIcon} alt="" className="member__social-icon" />
                    </a>
                </li>
                <li className="member__social">
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name} on LinkedIn`}>
                        <img src={linkedinIcon} alt="" className="member__social-icon" />
                    </a>
                </li>
            </ul>
        </li>
    )
}
export default TeamMemberCard
