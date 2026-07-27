import facebookIcon from "../../../assets/icons/facebook.svg"
import twitterIcon from "../../../assets/icons/twitter.svg"
import linkedinIcon from "../../../assets/icons/linkedin.svg"

import "./TeamMemberCard.css"

function TeamMemberCard({ photo, name, position, description }) {
    return (
        <div className="member">
            <img src={photo} alt={name || "Team Member"} className="member__img" />
            <h3 className="member__name">{name}</h3>
            <h4 className="member__position">{position}</h4>
            <p className="member__description">{description}</p>
            <ul className="member__list">
                <li className="member__social">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src={facebookIcon} alt="Facebook" className="member__social-icon" /></a>
                </li>
                <li className="member__social">
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt="Twitter" className="member__social-icon" /></a>
                </li>
                <li className="member__social">
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} alt="Linkedin" className="member__social-icon" /></a>
                </li>
            </ul>
        </div>
    )
}
export default TeamMemberCard