import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import axios from '../config/axios'

const Gallery = (props) => {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({images: []})

    useEffect(() => {
        axios.get('/galleries',{
            headers: {
                'x-auth': localStorage.getItem("authToken")
            }
        }).then((response)=>{
            setData([...response.data])
        })
      },[]);
      const handleSubmit = e =>{
        e.preventDefault();
        const data = new FormData()
        formData.images.forEach(image =>{
            data.append('images', image)
        })
        axios.post('/galleries',data,{
            headers: {
                'x-auth': localStorage.getItem("authToken")
            }
        }).then(response=>{
            setData([...data,response.data])
        })
        props.history.push('/galleries')
    }
    const fileHandle = (e) =>{
        setFormData({images: [...e.target.files]})
    }
    return (
        <React.Fragment>
            <h2>Gallery</h2>  
            <form onSubmit={handleSubmit}>
                <label htmlFor="images">Upload Image</label>
                <input type="file" name="images"  onChange={fileHandle} multiple/>
                <br />
                <button >Add to Gallery</button>
            </form>
            <br />          
            {data.length > 0  && data.map(obj => {
               return  obj.images && obj.images.map(image=>{
                   return <img key={image.path} alt="profile" src={`${process.env.PUBLIC_URL ? process.env.PUBLIC_URL  : "http://localhost:3005"}/${image ? image.path : ""}`} style={{height: 100,width: 100,paddingLeft: "10px"}} />
               })
            })}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Gallery)