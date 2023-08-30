import React from 'react'
import './Cards.scss'
import CardImg1 from '../../assets/images/crop.png'
import CardImg2 from '../../assets/images/focal.png'
import CardImg3 from '../../assets/images/Ai.png'
import CardImg4 from '../../assets/images/optimisation.png'
import {Link} from 'react-router-dom'

import { FaArrowRight } from 'react-icons/fa';

const Cards = () => {
  return (
    <div id='features' className="cards">
      <div className="cardsHeading">
        <h1>Our Features</h1>
        <span>The Complete toolkit to covert a image into something useful!</span>
      </div>
      <div className="cardsContainer">
        <div className="card">
          <img src={CardImg1}/>
          <div className="cardContent">
            <div className="cardHeading">Image Transformation </div>
            <div className="cardBody">Crop , Filters , Rotate , Flip and Transform</div>
            <div className="cardButton"><Link to={"/image-transform-01"} className='link'>Go to app <FaArrowRight/></Link></div>
          </div>
        </div>
        <div className="card">
          <img src={CardImg2}/>
          <div className="cardContent">
            <div className="cardHeading">Image Transformation</div>
            <div className="cardBody">Padding , Focal Point , Overlay , Rotate and Flip</div>
            <div className="cardButton"><Link to={"/image-transform-02"} className='link'>Go to app <FaArrowRight/></Link></div>
          </div>
        </div>
        <div className="card">
          <img src={CardImg3}/>
          <div className="cardContent">
            <div className="cardHeading">Image Tagging</div>
            <div className="cardBody">Auto Tagging with help of A.I</div>
            <div className="cardButton"><Link to={"/image-tagging"} className='link'>Go to app <FaArrowRight/></Link></div>
          </div>
        </div>
        <div className="card">
          <img src={CardImg4}/>
          <div className="cardContent">
            <div className="cardHeading">Image Compression</div>
            <div className="cardBody">Format Conversion And Image Compression</div>
            <div className="cardButton"><Link to={"/image-compression"} className='link'>Go to app <FaArrowRight/></Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards