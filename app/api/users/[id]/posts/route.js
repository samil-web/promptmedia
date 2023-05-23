import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    //  take parts from post method in frontend and send to database
    //  prompt,tag,userid
    // take response using await
    try {
        await connectToDB()

        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to create prompt", { status: 500 })
    }
}