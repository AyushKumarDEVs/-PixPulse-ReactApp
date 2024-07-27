import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import DatabasesServices from '../appwrite/configureappwrite';
import PostForm from '../components/PostForm.jsx';
import Container from '../components/container/Container';

export default function EditPost() {
    const [postt, setpost] = useState({});
    const navigate=useNavigate();
    const {slug}=useParams();
    console.log(slug);
    useEffect(()=>{
        if(!slug){
            navigate("/");
        }
        try {
            DatabasesServices.GetPost(slug).then((postrecived)=>{
                if(postrecived){
                    setpost(postrecived);
                }else{
                    navigate("/");
                }
            }).catch((error)=>{
                console.log("eror in geting post"+error)
            })
            
        } catch (error) {
            console.log(error);
        }
    },[slug])
  return (
    <Container>
        {
            postt? (
                <PostForm   post={postt} slug={slug}/>
            )
            :
            null
        }
    </Container>
  )
}
