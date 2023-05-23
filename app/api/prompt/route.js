
import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const GET = async (req) => {
    try {
        await connectToDB()
        const getUserData = await Prompt.find({}).populate("creator")
        return new Response(JSON.stringify(getUserData), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to get prompts", { status: 500 })
    }
}