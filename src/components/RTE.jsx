import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import { ConfigureEV } from '../configure ev/ConfigureEV';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-input h-52'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        
        initialValue={defaultValue}
        apiKey={ConfigureEV.RTEAPI}

        init={{
            initialValue: defaultValue,
            height: 200,
            
            menubar: true,
            plugins: [
                
             
            ],
            toolbar:""
          ,
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}