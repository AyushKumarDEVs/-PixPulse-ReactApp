import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPost from './pages/AllPost.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import Store from './store/Store.js'
import PostForm from './components/PostForm.jsx'
import Profile from './pages/Profile.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Following from './pages/Following.jsx'
import Followers from './pages/Followers.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"/login",
        element:
          <LoginPage/>
      },
      
      {
        path:"/signup",
        element:<SignupPage/>
      },
      {
        path:"/add-post",
        
        element:<PostForm/>
      },
      {
        path:"/all-posts",
        element:<AllPost/>
      },
      {
        path:"/post/:slug",
        element:<Post/>
      },

      {
        path:"/editpost/:slug",
        element:
          <EditPost/>
        
      },
      {
        path:"/profile",
        element:
          <Profile />
        
      },

      {
        path:"/profile/:id",
        element:
          <Profile />
        
      },

      {
        path:"/editprofile/:profileid",
        element:
          <EditProfile/>
        
      },

      {
        path:"/following/:id/:username",
        element:
          <Following/>
        
      },

      {
        path:"/followers/:id/:username",
        element:
          <Followers/>
        
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
   
  </Provider>,
)
