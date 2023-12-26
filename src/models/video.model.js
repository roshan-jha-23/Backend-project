import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videoFile:{
        type:String,//cloudnary url
        required:[true,"Please add a file"]
    },
    thumbNail:{
        type:String ,//cloudinary url
        required:true
    },
    title:{
        type:String,
        require:[true,"Enter the Title"],
    },
    description:{
         type:String,
        require:true,
    },
    duration:{
        type:Number ,//cloudnary url
        required:true,

    },
    views:{
        type: Number,  // number of times this video has been viewed.
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true}
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema);