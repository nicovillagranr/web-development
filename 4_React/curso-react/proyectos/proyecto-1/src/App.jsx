import './App.css'
import TwitterFollowCard from './Components/TwitterFollowCard'

const users = [
    {
        userName: `midudev`,
        name: `Miguel Angel Durán`,
        isFollowing: false
    },
    {
        userName: `pheralb`,
        name: `Pablo H`,
        isFollowing: false
    },
    {
        userName: `vxnder`,
        name: `Vanderhart`,
        isFollowing: false
    }
]

function App() {

    return (
        <section className='App'>
            {
                users.map(user => {
                    const { userName, name, isFollowing } = user
                    return (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            isFollowing={isFollowing}
                            name={name}>
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    )
}
export default App