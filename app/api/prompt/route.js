import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";



export const GET = async (request, { params }) => {

    const filterString = request.url.split("=").length >= 2 ? request.url.split("=").at(-1) : "";

    try {
        await connectToDB();
        let prompts;
        if (filterString == null || filterString === "") {
            prompts = await Prompt.find({}).populate("creator");
        }
        else {
            prompts = await Prompt.find({
                $or: [
                    { tag: { $regex: filterString, $options: 'i' } },
                    { prompt: { $regex: filterString, $options: 'i' } },
                ]
            }).populate("creator");
        }

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}