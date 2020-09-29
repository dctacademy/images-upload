# Image Upload

## Step 1: [Install the package “multer” in the backend server node app](https://www.npmjs.com/package/multer).
```javascript
npm install --save multer
```
## Step 2:  Set Up the Schema for image property, an example of uploading a user profile image.
```javascript
  image: {
       type: Object
   }
```
###### If multiple images 
```javascript
images: {
       type: Array
   }
```
## Step 3: Set up middleware file multer.js in the middlewares folder
```javascript
    const multer=require('multer')
    const storage=multer.diskStorage({
       destination:function(req,file,cb){
           cb(null,'uploads/')
       },
       filename:function(req,file,cb){
           cb(req.file,file.originalname.split(' ').join('-'))
      // file name change split with space and join with ‘-’
       }
    })
    const upload=multer({storage:storage})

    module.exports={
       upload
    }
```
## Step 4: In the routes.js file add the middleware upload function by importing multer middleware
```javascript
  const { upload } = require("../app/middlewares/multer")
  router.post('/users/register',upload.single('image'), usersController.register)
// If multiple images you can use upload.array('images',10) 
// field name images and 10 is number of images you can upload
```
## Step 5: In user controller handle files.
```javascript
   usersController.register = (req, res) => {
   const body = req.body
   const user = new User(body)
   user.image = req.file
// if multiple images upload.array('images',10), req.files
// user.images = req.files
   user.save()
       .then((user) => {
           res.json(user)
       })
       .catch((err) =>{
           res.json(err)
       })
   }
```
## Step 6: Create the uploads folder outside the react folder and make it available by adding this line.
```javascript
  app.use('/uploads', express.static('uploads'));
```
## Step 7:  React form fields.
```javascript
import React from 'react'
import axios from './config/axios'
import Swal from 'sweetalert2'
 
class Register extends React.Component{
   constructor(){
       super();
       this.state= {
           fullName:"",
           email: "",
           password: "",
           image: {} // []
       }
   }
   fileHandle = (e) =>{
       this.setState({image: e.target.files[0]})
	// if multiple images e.target.files
   }
   handleSubmit = (e) =>{
       e.preventDefault()
       const formData = new FormData()
       formData.append('fullName',this.state.fullName)
       formData.append('email',this.state.email)
       formData.append('password',this.state.password)
       formData.append('image',this.state.image)
       axios.post('/users/register', formData)
       .then((response) =>{
           // console.log(response.data)
           if(response.data.hasOwnProperty('errors')){
               Swal.fire({
                   type: 'info',
                   text: "Check the fileds"
               })
           }else{
               console.log(response.data)
               this.props.history.push('/login')
              
           }
 
       }).catch(err => {
           console.log(err)
       })
   }
   handleChange = (e) => {
       const value = e.target.value
       this.setState({[e.target.name] : value})
   }
   render(){
       const {email, password, fullName} = this.state
       return (
           <div>
               <h2>Register</h2>
               <form onSubmit={this.handleSubmit}>
               <label htmlFor="fullName">Full Name</label>
               <input type="text" name="fullName" value={fullName} onChange={this.handleChange}/>
               <br />
               <label htmlFor="email">Email</label>
               <input type="email" name="email" value={email} onChange={this.handleChange}/>
               <br />
               <label htmlFor="password">Password</label>
               <input type="password" name="password" value={password} onChange={this.handleChange}/>
               <br />
               <label htmlFor="image">Upload Image</label>
               <input type="file" name="image"  onChange={this.fileHandle}/>
               <br />
               <button >Register</button>
               </form>
           </div>
       )
   }
}
 
export default Register
```
