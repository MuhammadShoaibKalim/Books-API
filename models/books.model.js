import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: [true, "Title is required"], 
            trim: true, 
            minlength: [3, "Title must be at least 3 characters long"]
        },
        year: { 
            type: Number, 
            required: [true, "Publication year is required"], 
            min: [1500, "Year must be at least 1500"], 
            max: [new Date().getFullYear(), "Year cannot be in the future"]
        },
        author: {
            name: { 
                type: String, 
                required: [true, "Author name is required"], 
                trim: true 
            },
            birthYear: {
                type: Number,
                min: [1000, "Birth year must be valid"],
                max: [new Date().getFullYear(), "Birth year cannot be in the future"]
            },
            nationality: { type: String, trim: true }
        }
    },
    { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
