import { useState } from 'react'
import axios from 'axios'
import './ImageTagging.scss'
import { BiSolidImageAdd } from 'react-icons/bi'



const apiKey = 'acc_74a4fd8f43f396d'
const apiSecret = '0ec62cf16c8cc2fdbf05a719f1d0df94'
// const apiKey = process.env.REACT_APP_API_KEY;
// const apiSecret = process.env.REACT_APP_API_SECRET;


const ImageTagging = () => {
  const [tags, setTags] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  // const [imgUrl, setImgUrl] = useState('')
  const [file, setFile] = useState(null)

  const fetchTags = async (imgUrl) => {
    try {
      const response = await axios.get(
        'https://api.imagga.com/v2/tags?image_url=' +
          encodeURIComponent(imgUrl),
        {
          auth: {
            username: apiKey,
            password: apiSecret,
          },
        }
      )
      console.log(response.data.result)
      setTags(response.data.result.tags)
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong!')
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    setTags([])
    setError(null)
    if (file) {
      const data = new FormData()
      data.append('file', file)
      try {
        setLoading(true)
        const res = await axios.post('/api/upload', data)
        // setImgUrl(res.data.secure_url)
        console.log(res.data.secure_url)
        fetchTags(res.data.secure_url)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className='imgTagContainer'>
      <div className='wrapper'>
        <h1>Image Auto Tagging App</h1>
        <form onSubmit={submitHandler}>
          <div className='imageInput'>
            <label htmlFor='fileInput' className='inputImage'>
              <BiSolidImageAdd />
            </label>
            <input
              id='fileInput'
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              // style={{ display: "none" }}
            />
          </div>
          {loading && <div className='loader'></div>}

          {/* {imgUrl==='' && <div className='loader'>Loading</div>} */}
          {/* {imgUrl && } */}
          <button type='submit'>Detect</button>
        </form>
        {error && <p className='tagError'>{error}</p>}
        {tags.length > 0 && (
          <div className='tagsContainer'>
            <h2>Tags Detected</h2>
            <ul>
              {tags.map((tag) => (
                <li key={tag.tag.en}>{tag.tag.en}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageTagging
