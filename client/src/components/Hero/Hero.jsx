import React from 'react'

import './Hero.scss'
import HeroImage from '../../assets/images/HeroImage.jpg'
// import { link } from '../../../../api/routes/auth'
// import {Link} from 'react-router-dom'


const Hero = () => {
  return (
    <div className="header">
      <div className="header-text">
        <h1>FotoFusion : Next Gen Image Editor</h1>
        <p>Our cutting-edge photo editing software harnesses the power of Artificial Intelligence (AI) to revolutionize the way you enhance and transform your images. </p>
        <button>Explore Below</button>
      </div>
      <div className="header-img">
        <img alt='image' src={HeroImage}/>
      </div>
    </div>
  )
}

export default Hero