import { useState } from 'react'
import Image01 from '../../assets/image-placeholder.svg'

import './ImageTransform02.scss'
import 'react-image-crop/dist/ReactCrop.css'
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr'
import { CgMergeVertical, CgMergeHorizontal } from 'react-icons/cg'
import { IoMdUndo, IoMdRedo } from 'react-icons/io'
import storeData from './LinkedList01-02.js'
const ImageTransform02 = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [state, setState] = useState({
    image: '',

    rotate: 0,
    vartical: 1,
    horizental: 1,
    padding: 0,
    focalX: 50,
    focalY: 50,
    overlayWidth: 100, // Add overlay width
    overlayHeight: 100,
  })

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
  const paddingHandler = (e) => {
    setState({ ...state, padding: parseInt(e.target.value) })
    storeData.insert(state)
  }
  const focalxHandler = (e) => {
    setState({ ...state, focalX: parseInt(e.target.value) })
    storeData.insert(state)
  }
  const focalyHandler = (e) => {
    setState({ ...state, focalY: parseInt(e.target.value) })
    storeData.insert(state)
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
          padding: 0,
          focalX: 50,
          focalY: 50,
          overlayWidth: 100,
          overlayHeight: 100,
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
      const canvasWidth = baseImage.width + 2 * state.padding
      const canvasHeight = baseImage.height + 2 * state.padding
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      const ctx = canvas.getContext('2d')

      // Draw the base image
      // ctx.filter = `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`
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

      // Draw the overlay image
      if (state.overlay) {
        const overlayImage = new Image()
        overlayImage.crossOrigin = 'anonymous' // Enable cross-origin usage
        overlayImage.onload = () => {
          // Calculate the scaling factor for the overlay image
          const baseAspectRatio = baseImage.width / baseImage.height
          const overlayAspectRatio = overlayImage.width / overlayImage.height
          let overlayWidth, overlayHeight
          if (baseAspectRatio > overlayAspectRatio) {
            overlayWidth = baseImage.width
            overlayHeight =
              (overlayWidth / overlayImage.width) * overlayImage.height
          } else {
            overlayHeight = baseImage.height
            overlayWidth =
              (overlayHeight / overlayImage.height) * overlayImage.width
          }

          // Calculate the position of the overlay image
          const overlayX = -overlayWidth / 2
          const overlayY = -overlayHeight / 2

          // Draw the overlay image on the canvas
          ctx.globalAlpha = 0.5 // Set full opacity for the overlay image
          ctx.drawImage(
            overlayImage,
            overlayX,
            overlayY,
            overlayWidth,
            overlayHeight
          )

          const link = document.createElement('a')
          link.download = `image_edit.jpg`
          link.href = canvas.toDataURL('image/jpg', state.quality / 100)
          link.click()
        }
        overlayImage.src = state.overlay
      } else {
        const link = document.createElement('a')
        link.download = `image_edit.jpg`
        link.href = canvas.toDataURL('image/jpg', state.quality / 100)
        link.click()
      }
    }
  }

  const resetState = () => {
    setState({
      image: selectedImage,
      rotate: 0,
      vartical: 1,
      horizental: 1,
      padding: 0,
      focalX: 50,
      focalY: 50,
      overlayWidth: 100,
      overlayHeight: 100,
    })
    // setCrop(null)
  }
  const handleOverlayChange = (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setState({ ...state, overlay: reader.result })
      }
      reader.readAsDataURL(file)
    } else {
      setState({ ...state, overlay: '' })
    }
  }

  return (
    <div className='main-body2'>
      <div className='container2'>
        <h2>Saif Image Editor</h2>

        <div className='wrapper2'>
          <div className='editor-panel2'>
            <div className='filter2'>
              <div className='content2'>
                <div className='row2 sizes2'>
                  <div className='column2 height2'>
                    <label>Padding</label>
                    <input
                      type='number'
                      value={state.padding}
                      onChange={paddingHandler}
                    />
                  </div>
                </div>
              </div>
              <div className='content2'>
                <div className='column2-content2'>
                  <label>Focal X</label>
                  <input
                    type='number'
                    value={state.focalX}
                    onChange={focalxHandler}
                  />
                </div>
                <div className='column2-content2'>
                  <label>Focal Y</label>
                  <input
                    type='number'
                    value={state.focalY}
                    onChange={focalyHandler}
                  />
                </div>
              </div>

              <div className='content2'>
                <div className='column2-content2'>
                  <input
                    type='file'
                    accept='image/*'
                    id='take'
                    onChange={(e) => handleOverlayChange(e.target.files[0])}
                    hidden
                  />
                  <label
                    htmlFor='take'
                    className='overlay-label2'
                    style={{ marginTop: '10px' }}
                  >
                    Overlay
                  </label>
                </div>
              </div>
            </div>
            <div className='rotate2'>
              <label className='title2'>Rotate & Filp</label>
              <div className='options2'>
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
          <div className='preview-img2'>
            {state.overlay && (
              <div className='overlay-wrapper2'>
                <img
                  className='overlay-image2'
                  src={state.overlay}
                  alt='Overlay'
                />
              </div>
            )}

            {state.image ? (
              <img
                style={{
                  transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})`,
                  padding: `${state.padding}px`,
                  objectPosition: `${state.focalX}% ${state.focalY}%`,
                }}
                src={state.image}
                alt=''
              />
            ) : (
              <>
                <img src={Image01} alt='preview-img2' />
              </>
            )}
          </div>
        </div>
        <div className='controls2'>
          <button className='reset-filter2' onClick={resetState}>
            Reset Filters
          </button>
          <div className='row2'>
            <div className='options2'>
              <button
                onClick={undo}
                className='undo2'
                disabled={storeData.current === null}
              >
                <IoMdUndo />
              </button>
              <button
                onClick={redo}
                className='undo2'
                disabled={storeData.current === null}
              >
                <IoMdRedo />
              </button>

              <input
                onChange={imageHandle}
                type='file'
                id='choose'
                className='file-input2'
                hidden
              />

              <label htmlFor='choose' className='label-img2'>
                Choose Image
              </label>

              <button onClick={saveImage} className='save-img2'>
                Save Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageTransform02
