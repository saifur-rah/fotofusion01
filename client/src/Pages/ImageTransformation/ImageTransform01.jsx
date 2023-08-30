import  { useState } from 'react'
import Image01 from '../../assets/image-placeholder.svg'
// import {faRotateLeft,FaRotateRight,LuFlipHorizontal,LuFlipVertical} from 'react-icons'
// import './style/main.scss'
import './ImageTransform01.scss'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr'
import { CgMergeVertical, CgMergeHorizontal } from 'react-icons/cg'
import { IoMdUndo, IoMdRedo } from 'react-icons/io'
import storeData from './LinkedList01-01.js'
const ImageTransform01 = () => {

  const filterElement = [
    {
      name: 'brightness',
      maxValue: 200,
    },
    {
      name: 'grayscale',
      maxValue: 200,
    },
    {
      name: 'sepia',
      maxValue: 200,
    },
    {
      name: 'saturate',
      maxValue: 200,
    },
    {
      name: 'contrast',
      maxValue: 200,
    },
    {
      name: 'hueRotate',
    },
  ]

  const [property, setProperty] = useState({
    name: 'brightness',
    maxValue: 200,
  })

  const [details, setDetails] = useState('')
  const [width, setWidth] = useState(10000)
  const [height, setHeight] = useState(10000)
  const [crop, setCrop] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [state, setState] = useState({
    image: '',
    brightness: 100,
    grayscale: 0,
    sepia: 0,
    saturate: 100,
    contrast: 100,
    hueRotate: 0,
    rotate: 0,
    vartical: 1,
    horizental: 1,
   
  })


  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
    const stateData = state
    storeData.insert(stateData)
  }


  const leftRotate = () => {
    setState({
      ...state,
      rotate: state.rotate - 90,
    })

    const stateData = state
    stateData.rotate = state.rotate - 90
    storeData.insert(stateData)
  }

  const rightRotate = () => {
    setState({
      ...state,
      rotate: state.rotate + 90,
    })
    const stateData = state
    stateData.rotate = state.rotate + 90
    storeData.insert(stateData)
  }
  const varticalFlip = () => {
    setState({
      ...state,
      vartical: state.vartical === 1 ? -1 : 1,
    })
    const stateData = state
    stateData.vartical = state.vartical === 1 ? -1 : 1
    storeData.insert(stateData)
  }

  const horizentalFlip = () => {
    setState({
      ...state,
      horizental: state.horizental === 1 ? -1 : 1,
    })
    const stateData = state
    stateData.horizental = state.horizental === 1 ? -1 : 1
    storeData.insert(stateData)
  }

  const redo = () => {
    const data = storeData.redoEdit()
    if (data) {
      setState(data)
    }
  }
  const undo = () => {
    const data = storeData.undoEdit()
    if (data) {
      setState(data)
    }
  }


  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader()

      reader.onload = () => {
        setState({
          ...state,
          image: reader.result,

        })

        const stateData = {
          image: reader.result,
          brightness: 100,
          grayscale: 0,
          sepia: 0,
          saturate: 100,
          contrast: 100,
          hueRotate: 0,
          rotate: 0,
          vartical: 1,
          horizental: 1,
        
        }
        storeData.insert(stateData)
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const transformWidth = (e) => {
    const newWidth = e.target.value
    setWidth(newWidth)

  }
  const transformHeight = (e) => {
    const newHeight = e.target.value
    setHeight(newHeight)
  }

  const imageCrop = () => {
    const canvas = document.createElement('canvas')
    const scaleX = details.naturalWidth / details.width
    const scaleY = details.naturalHeight / details.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const base64Url = canvas.toDataURL('image/jpg')

    setState({
      ...state,
      image: base64Url,
    })
    storeData.insert(state)

  }
   const saveImage = () => {
    const canvas = document.createElement('canvas')
    canvas.width = width!=0?((width<details.naturalHeight)?width :details.naturalHeight):details.naturalHeight
    canvas.height = height!=0?((height<details.naturalHeight)?height:details.naturalHeight):details.naturalWidth

  
      const ctx = canvas.getContext('2d')

      ctx.filter = `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg )`
      const imgQuality =state.quality *0.01 || 1.0;
      console.log(imgQuality);
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((state.rotate * Math.PI) / 180)
      ctx.scale(state.vartical, state.horizental)
  
  
      ctx.drawImage(
        details,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      )
  
      const link = document.createElement('a')
      link.download = 'image_edit.jpg'
      link.href = canvas.toDataURL('image/jpeg', state.quality / 100);
      link.click()
    
  
  }

  const resetState = () => {
    setState({
      image: selectedImage,
      brightness: 100,
      grayscale: 0,
      sepia: 0,
      saturate: 100,
      contrast: 100,
      hueRotate: 0,
      rotate: 0,
      vartical: 1,
      horizental: 1,
     
    })
    setCrop(null)
  }


  return (
    <div className='main-body1'>
      <div className='container1'>
        <h2>Saif Image Editor</h2>

        <div className='wrapper1'>
          <div className='editor-panel1'>
           
            <div className='filter1'>
              <label className='title1'>Filters</label>
              <div className='options1'>
                {filterElement.map((v, i) => (
                  <button
                    className={property.name === v.name ? 'active' : ''}
                    onClick={() => setProperty(v)}
                    key={i}
                  >
                    {v.name}
                  </button>
                ))}
              </div>

              <div className='slider1'>
                <div className='filter-info1'>
                  <label htmlFor='range1'>{property.name}</label>
                  <span>{state[property.name]}%</span>
                </div>
                <input
                  name={property.name}
                  onChange={inputHandle}
                  value={state[property.name]}
                  max={property.maxValue}
                  type='range'
                />
              </div>

              <div className='content1'>
                  <div className='column1-content1'>
                    <label>Width</label>
                    <input onChange={transformWidth} type='number' />
                  </div>
                  <div className='column1-content1'>
                    <label>Height</label>
                    <input onChange={transformHeight} type='number' />
                  </div>
                 
              </div>
             
            </div>
            <div className='rotate1'>
              <label className='title1'>Rotate & Filp</label>
              <div className='options1'>
                <button onClick={leftRotate}>
                  <GrRotateLeft />
                </button>
                <button onClick={rightRotate}>
                  <GrRotateRight />
                </button>
                <button onClick={varticalFlip}>
                  <CgMergeVertical />
                </button>
                <button onClick={horizentalFlip}>
                  <CgMergeHorizontal />
                </button>
              </div>
            </div>
          </div>
          <div className='preview-img1'>

            

            {state.image ? (
              <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
              <img
                onLoad={(e) => setDetails(e.currentTarget)}
                style={{
                  filter: `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`,
                  transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})`,
                }}
                src={state.image}
                alt=''
              />
              </ReactCrop>
            ) : (
               
              <>
                <img src={Image01} alt='preview-img1' />
              </>
            )}
          </div>
        </div>
        <div className='controls1'>
          <button className='reset-filter1' onClick={resetState}>
            Reset Filters
          </button>
          <div className='row1'>
            <div className='options1'>
              <button
                onClick={undo}
                className='undo1'
                disabled={storeData.current === null}
              >
                <IoMdUndo />
              </button>
              <button
                onClick={redo}
                className='undo1'
                disabled={storeData.current === null}
              >
                <IoMdRedo />
              </button>
              {crop && (
                <button onClick={imageCrop} className='save-img1'>
                  Crop Image
                </button>
              )}
              <input
                onChange={imageHandle}
                type='file'
                id='choose'
                className='file-input1'
                hidden
              />

              <label htmlFor='choose' className='label-img1'>
                Choose Image
              </label>

              <button onClick={saveImage} className='save-img1'>
                Save Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageTransform01
