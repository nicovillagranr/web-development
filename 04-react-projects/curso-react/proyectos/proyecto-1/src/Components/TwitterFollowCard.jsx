import { useState } from 'react'

function TwitterFollowCard({ userName, name, isFollowing: initialIsFollowing }) {

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing
        ? 'followcard__button is-following'
        : 'followcard__button'



    function handleClick() {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='followcard'>
            <header className='followcard__header'>
                <img
                    className='followcard__img'
                    src={`https://unavatar.io/${userName}`}
                    alt={`Avatar de ${name}`} />
                <div className='followcard__info'>
                    <strong>{name}</strong>
                    <span className='info__username'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='followcard__text'>{text}</span>
                    <span className='followcard__stop-follow'>Dejar de Seguir</span>
                </button>
            </aside>
        </article>
    )
}
export default TwitterFollowCard
