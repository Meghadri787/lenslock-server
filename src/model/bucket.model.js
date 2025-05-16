import mongoose, { model, Schema } from "mongoose";

const bucketSchema = new Schema(
    {
        // studio: {
        //     type: Schema.Types.ObjectId,
        //     ref: "studio",
        //     required: [true, "studio is required!"],
        // },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: [true, "user is required!"],
        },
        name: {
            type: String,
            required: [true, "name is required!"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        qr: {
            url: {
                type: String,
            },
            publicId: {
                type: String,
            },
        },
        link: {
            type: String,
        },
        accessList: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
        ],
        accessRequests: [
            {
               user : {
                  type: Schema.Types.ObjectId,
                ref: "user",
                required: true,
               }  ,
               status : {
                   type : String ,
                   enum : ["pending" , "rejected" , "accept"] ,
                   default : "pending"
               } ,
               createdAt :{
                type : Date ,
                default : Date.now()
               }
            },
        ],
        isPublic: {
            type: Boolean,
            default: false,
        },
        mediaList : [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref : "media" ,
            }
        ]
    },
    { timestamps: true }
);

export const Buckets = model("bucket", bucketSchema);
