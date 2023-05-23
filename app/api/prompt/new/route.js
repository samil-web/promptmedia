// import database and prompt components
import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"
export const POST = async (req) => {
    //  take parts from post method in frontend and send to database
    //  prompt,tag,userid
    // take response using await
    const { userId, prompt, tag } = await req.json()
    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create prompt", { status: 500 })
    }
}