import { model, Schema } from "mongoose";



const bucktModel = new Schema({
    studio:{
        type : Schema.Types.ObjectId ,
        ref : "studio" ,
        required : [ true , "studio is required !"] ,
    } , 
    user :{
        type : Schema.Types.ObjectId ,
        ref : "user" ,
        required : [ true , "user is required !"] ,
    } , 
    name : {
        type : String , 
        required : [ true , "name is required !"] , 
        trim : true , 
        minLength : [ 3 , "name must be 3 char or more "] , 
        maxLangth : [ 60 , "name must be under 60 char"] 
    } ,
    description : {
        type : String , 
        trim : true , 
        minLength : [ 3 , "description must be 3 char or more "] , 
        maxLangth : [ 500 , "description must be under 500 char"] 
    } ,
    qr :{
        url : {
            type : String , 
            default : null
        } , 
        public_id : {
            type : String , 
            default : null
        }
    } , 
    link : {
        type : String , 
        required : [ true , "link is required !"] , 
        trim : true , 
    } ,
    accessList :[
        {
            type : Schema.Types.ObjectId , 
            ref : "user" , 
            required : [ true , "accessList is required !"] , 
        } , 
    ] ,
    accessRequest : [
        {
            type : Schema.Types.ObjectId , 
            ref : "user" , 
            required : [ true , "accessRequest is required !"] , 
        } , 
    ] ,   
} , { timestamps : true  , versionKey : false } )

export const Buckets = model( "bucket" , bucktModel )