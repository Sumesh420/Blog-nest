import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
export default function RTE({name,label,control,defaultValue=""}) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({field:{onChange}})=>(
            <Editor
            apiKey='6v8uyz65fxtkjeq4ftri2rxokuk7siexbvs6nvqp6fo7g079'
              initialValue={defaultValue}
              init={{
                initialValue:defaultValue,
                height:500,
                menubar:true,
                plugin:[
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdateandtime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount"
                ],
                toolbar:"undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent removeformat | help",
                content:"body {font-family:Helvetica,Arial,sans-serif;font-size:14px}"
              }}
              onEditorChange={onChange}
            />
        )}
      />
    </div>
  )
}
