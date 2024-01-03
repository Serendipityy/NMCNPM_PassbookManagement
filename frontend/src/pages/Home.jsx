import React from 'react'
import '../styles/home.css'
import homeWallpaper from '../assets/images/19197179.png'

const Home = () => {
  return (
    <div className="home__container">
      <div className='home__wallpaper'>
        <h3>A faster way to <br />
          <span>Manage Passbook</span>
        </h3>

        <img src={homeWallpaper} alt=''/>
      </div>


      <div className='home__intro'>
        <h1>Welcome!</h1>
        <div className='home__description'>
          <p>These are the functions that you can use as a bank employee to 
            manage customer’s passbook:       
          </p>
          <ol>
            <li>Create passbook</li>
            <li>Make deposit form</li>
            <li>Make withdraw form</li>
            <li>See customer's passbook list</li>
            <li>Make reports</li>
            <li>Change regulations</li>
            
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Home