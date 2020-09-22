import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import axios from '../config/axios'

const Gallery = (props) => {
    const {user} = props
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
        // props.dispatch(updateUserInfo(id,data,props.history))
        // console.log(formData)
    }
    const fileHandle = (e) =>{
        // console.log(e.target.files)
        setFormData({images: [...e.target.files]})
    }
    return (
        <React.Fragment>
            <h2>Gallery</h2>            
            {data.length > 0  && data.map(obj => {
               return  obj.images && obj.images.map(image=>{
                   return <div key={image.path}><img  alt="profile" src={`${process.env.PUBLIC_URL ? process.env.PUBLIC_URL  : "http://localhost:3005"}/${image ? image.path : ""}`} style={{height: 100,width: 100}} /><br/></div>
               })
            })}
            <h2>Images</h2>
            <br/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="images">Upload Image</label>
                <input type="file" name="images"  onChange={fileHandle} multiple/>
                <br />
                <button >Add to Gallery</button>
                </form>
            {Object.keys(user).length > 0 && 
            <>
             <p>Full Name: {user.fullName}</p>
             <img alt="profile" src={`${process.env.PUBLIC_URL ? process.env.PUBLIC_URL  : "http://localhost:3005"}/${user.image ? user.image.path : ""}`} style={{height: 100,width: 100}} />
             <br />
             </>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Gallery)