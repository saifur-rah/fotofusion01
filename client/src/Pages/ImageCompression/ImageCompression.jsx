import  { useState } from 'react'
import Image01 from '../../assets/image-placeholder.svg'
import './ImageCompression.scss'
import 'react-image-crop/dist/ReactCrop.css'
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr'
import { CgMergeVertical, CgMergeHorizontal } from 'react-icons/cg'
import { IoMdUndo, IoMdRedo } from 'react-icons/io'
import storeData from './linkedlist02.js'
const ImageCompression = () => {
  
 

  
  const [propertyQuality, setPropertyQuality] = useState({
    name: 'quality',
    maxValue: 100,
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [state, setState] = useState({
    image: '',
   
    rotate: 0,
    vartical: 1,
    horizental: 1,
    quality: 100,
   
  })
  const [selectedFormat, setSelectedFormat] = useState('jpg')

  const formatOptions = [
    { label: 'JPEG', value: 'jpeg' },
    { label: 'JPG', value: 'jpg' },
    { label: 'PNG', value: 'png' },
    // Add more format options if needed
  ]
  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value)
  }
 
  const inputQualityHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
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
        
          rotate: 0,
          vartical: 1,
          horizental: 1,
          quality: 100,
         
        }
        storeData.insert(stateData)
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }
 


  const saveImage = () => {
    const canvas = document.createElement('canvas')
    const baseImage = new Image()
    baseImage.src = state.image

    baseImage.onload = () => {
      const canvasWidth = baseImage.width 
      const canvasHeight = baseImage.height 
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      const ctx = canvas.getContext('2d')

      // Draw the base image
      ctx.translate(canvasWidth / 2, canvasHeight / 2)
      ctx.rotate((state.rotate * Math.PI) / 180)
      ctx.scale(state.vartical, state.horizental)
      ctx.drawImage(
        baseImage,
        -baseImage.width / 2,
        -baseImage.height / 2,
        baseImage.width,
        baseImage.height
      )

      
        
        let format1 = 'image/jpg'
        if (selectedFormat === 'jpeg') {
          format1 = 'image/jpeg'
        } else if (selectedFormat === 'png') {
          format1 = 'image/png'
        } else {
          format1 = 'image/jpg'
        }
        const link = document.createElement('a')
        link.download = `image_edit.${selectedFormat}`
        link.href = canvas.toDataURL(format1, state.quality / 100)
        link.click()
      
    }
  }

  const resetState = () => {
    setState({
      image: selectedImage,
      rotate: 0,
      vartical: 1,
      horizental: 1,
      quality:100,
     
    })
  }
  

  return (
    <div className='main-bodyc'>
      <div className='containerc'>
        <h2>Saif Image Editor</h2>

        <div className='wrapperc'>
          <div className='editor-panelc'>
            <div className='format-dropdownc'>
              <label htmlFor='format-select'>Format:</label>
              <select
                id='format-select'
                value={selectedFormat}
                onChange={handleFormatChange}
              >
                {formatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='filterc'>
              

              
              <div className='sliderc'>
                <div className='filter-infoc'>
                    
                  <label htmlFor='range'  >Image Quality</label>
                  <span>{state[propertyQuality.name]}%</span>
                </div>
                <input
                  name={propertyQuality.name}
                  onChange={inputQualityHandle}
                  value={state[propertyQuality.name]}
                  max={propertyQuality.maxValue}
                  type='range'
                />
              </div>
             
            </div>
            <div className='rotatec'>
              <label className='titlec'>Rotate & Filp</label>
              <div className='optionsc'>
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
          <div className='preview-imgc'>
            

            {state.image ? (
              <img  
              style={{
                transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})`,
              }}              
                src={state.image}
                alt=''
              />
            ) : (
              <>
                <img src={Image01} alt='preview-imgc' />
              </>
            )}
          </div>
        </div>
        <div className='controlsc'>
          <button className='reset-filterc' onClick={resetState}>
            Reset Filters
          </button>
          <div className='rowc'>
            <div className='optionsc'>
              <button
                onClick={undo}
                className='undoc'
                disabled={storeData.current === null}
              >
                <IoMdUndo />
              </button>
              <button
                onClick={redo}
                className='undoc'
                disabled={storeData.current === null}
              >
                <IoMdRedo />
              </button>
             
              <input
                onChange={imageHandle}
                type='file'
                id='choose'
                className='file-inputc'
                hidden
              />

              <label htmlFor='choose' className='label-imgc'>
                Choose Image
              </label>

              <button onClick={saveImage} className='save-imgc'>
                Save Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCompression
