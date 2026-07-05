import { mongoose } from "../database/mongodb.js";

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
        readTime: { type: String, default: "5 menit" },
        published: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export const Blog = mongoose.models.Blog ?? mongoose.model("Blog", BlogSchema);
