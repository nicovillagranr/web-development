// Importamos su propio CSS
import './ProfileCard.css'
// Importamos la imagen
import img from '../../assets/selfie.jpg'

function ProfileCard() {

    return (
        <div className="container">
            <div className="card">
                <div className="card__img-container">
                    <img className='card__img' src={img} alt="Imagen mía" />
                </div>
                <div className="card__text-container">
                    <h1 className='card__title'>Nico Villagran</h1>
                    <p className='card__description'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, eum!</p>
                </div>
            </div>
        </div>
    )
}
export default ProfileCard