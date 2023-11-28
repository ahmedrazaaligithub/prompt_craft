import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        console.log('params------>',params);
        const prompts = await Prompt.find({creator:params.id}).populate("creator");
        console.log('finded===================================>',prompts);
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Prompts", { status: 500 });
          }
}