import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai"
import "./UploadImage.css"
import { Button, Group } from '@mantine/core';
const UploadImage = ({ nextStep, propertyDetails, setPropertyDetails, prevStep }) => {

    const [imageUrl, setImageUrl] = useState(propertyDetails.image);
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const handleNext = ()=>{
        setPropertyDetails((prev)=>({...prev,image:imageUrl}))
        nextStep()
    }


    useEffect(()=>{
        cloudinaryRef.current =window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName:"djwiw4h3n",
                uploadPreset:"mz3gypb9",
                maxFiles:1
            },
            (err,result)=>{
                if (result.event === "success") {
                    setImageUrl(result.info.secure_url)
                }
            }
        )
    })
   
    return (
        <div className="flexColCenter uploadWrapper">
            {
                !imageUrl ? (
                    <div className="flexColCenter uploadZone"
                    onClick={()=>widgetRef.current?.open()}
                    >

                        
                        <AiOutlineCloudUpload size={50} color='grey' />
                        <span>UploadImage</span>
                    </div>
                ) :
                    (
                        <div className="uploadImage"
                        onClick={()=>widgetRef.current?.open()}
                        >

                            <img src={imageUrl} alt="" />
                        </div>
                    )
            }
             <Group position='center' mt={"xl"}>
                    <Button  variant='default' onClick={prevStep}>Back</Button>
                    <Button onClick={handleNext} disabled={!imageUrl}>Next Step</Button>
                </Group>
        </div>
    )
}

export default UploadImage
