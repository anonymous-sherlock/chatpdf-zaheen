"use client"

import Dropzone from "react-dropzone"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import {  useToast } from "@/components/ui/use-toast"
import  { useState } from 'react'
import { Cloud, File } from "lucide-react"
import { Progress } from "./ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { trpc } from "@/app/_trpc/client"
import { useRouter } from "next/navigation"

function Dropzoneupload() {
const router=useRouter()
const [isuploading, setisuploading] = useState(false)
const [uploadProgress, setUploadProgress] = useState<number>(0)

const {startUpload}=useUploadThing("fileUploader")
const {mutate:startPolling}= trpc.getFile.useMutation({
    onSuccess:(file)=>{
     router.push(`/dashboard/`)
    },
    retry:true,
    retryDelay:500
})
const {toast} =useToast()

const startSimulation=()=>{
    setUploadProgress(0)
  const interval= setInterval(()=>{
    
    setUploadProgress((prev)=>{
        if (prev==95) {
            return prev
        }
         return prev+5
    })
   },500)
   return interval
}
    return (
        <Dropzone 
        
        multiple={false}
        onDrop={async(acceptedFile)=>{
            setisuploading(true)
            const simulation =startSimulation()

            // handle file upload
           const res= await startUpload(acceptedFile)

           if(!res){
           return toast({
                variant:"destructive",
                title: "Something went wrong!!",
                description: "Pdf file was not able to be uploaded",
              })
           }
           
           
            const[fileResponse] =res
            const key =fileResponse?.key
            if(!key){
              return  toast({
                    variant:"destructive",
                    title: "Something went wrong!!",
                    description: "please try again later",
                  })
            }
     
                clearInterval(simulation)
                setUploadProgress(100)
                startPolling({key})
            
           
           
        }}
        
        >

            {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div {...getRootProps()} className="border h-64 m-4 border-dashed border-gray-300 rounded-lg">
                    <div className="flex w-full h-full items-center justify-center">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 
            hover:bg-gray-100">
                            <div className="flex flex-col pt-5 pb-6 items-center justify-center">
                                <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                                <p className="mb-2 text-sm text-zinc-700">
                                    <span className="font-semibold">Click to upload</span>
                                    or drag and drop
                                </p>
                                <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
                            </div>
                            {acceptedFiles && acceptedFiles[0] ? (
                                <div className="max-w-xS bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                                    <div className="px-3 py-2 h-full grid place-items-center">
                                        <File className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div className="px-3 py-3 h-full text-sm truncate">
                                        {acceptedFiles[0].name}
                                    </div>
                                </div>
                            ) : null}

                            {isuploading?(<div className="w-full max-w-xs mt-4 mx-auto">
                                <Progress className="h-1 w-full bg-zinc-200" value={uploadProgress}/>
                            </div> ):null}

                            <input {...getInputProps()} type="file" className="hidden" id="dropzone-file" />
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    )
}


export const DialogButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='destructive'>Upload PDF</Button>
            </DialogTrigger>
            <DialogContent>
                <Dropzoneupload />
            </DialogContent>
        </Dialog>
    )
}










