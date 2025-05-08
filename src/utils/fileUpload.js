import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


export async function fileUploader(localFilePath) {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto', // for PDF and other non-image files
      folder: 'books'
    });
    // Delete local file after upload
    fs.unlinkSync(localFilePath);
    return {
      url: result.secure_url,
      public_id: result.public_id,
      error: null
    };
  } catch (error) {
    // Delete local file if upload failed
    console.error('Cloudinary upload error:', error);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return { url: null, public_id: null, error };
  }
}

export const fileDestroy = async( public_id )=>{

  if(public_id){
    try {
       
      const data = await cloudinary.uploader.destroy(public_id)
      // console.log(data);
      return { success : true , data, error : null }
  
    } catch (error) {
      console.error(error);
      
      return { success : false , data:null ,  error}
    }

  }

  return { success : true , error: null , data:null}

}
