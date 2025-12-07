import facebookIcon from "../../../assets/icons/facebook.svg"
import twitterIcon from "../../../assets/icons/twitter.svg"
import linkedinIcon from "../../../assets/icons/linkedin.svg"

import "./TeamMemberCard.css"

function TeamMemberCard({ photo, name, position, description }) {
    return (
        <div className="memberCard">
            <img src={photo} alt={name || "Team Member"} className="memberCard__img" />
            <h3 className="memberCard__name">{name}</h3>
            <h4 className="memberCard__position">{position}</h4>
            <p className="memberCard__description">{description}</p>
            <ul className="memberCard__list">
                <li className="memberCard__social-item">
                    <a href="#"><img src={facebookIcon} alt="Facebook" className="memberCard__social-icon" /></a>
                </li>
                <li className="memberCard__social-item">
                    <a href="#"><img src={twitterIcon} alt="Twitter" className="memberCard__social-icon" /></a>
                </li>
                <li className="memberCard__social-item">
                    <a href="#"><img src={linkedinIcon} alt="Linkedin" className="memberCard__social-icon" /></a>
                </li>
            </ul>
        </div>
    )
}
export default TeamMemberCard