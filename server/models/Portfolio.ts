import { mongoose } from "../database/mongodb.js";

const PortfolioSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        tags: { type: [String], default: [] },
        published: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export const Portfolio = mongoose.models.Portfolio ?? mongoose.model("Portfolio", PortfolioSchema);
