import React, { useContext } from 'react'
import Card from '../Components/Card'
import { ContextGlobal } from '../Components/utils/global.context';

const Home = () => {
  const { theme, dentists } = useContext(ContextGlobal);

  return (
    <main className={theme === 'dark' ? 'dark' : 'light'}>
      <h1>Home</h1>
      <div className='card-grid'>
      {dentists.map(dentist => (
          <Card
            key={dentist.id}
            name={dentist.name}
            username={dentist.username}
            id={dentist.id}
          />
        ))}
      </div>
    </main>
  )
}

export default Home