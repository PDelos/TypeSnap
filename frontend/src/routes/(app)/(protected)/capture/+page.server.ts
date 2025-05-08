import { error } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import type { Prompt } from '$lib/types';

export async function load({ url }) {
    try {
        // Get model from query parameter (e.g., ?model=gpt-4)
        const modelName = url.searchParams.get('model');
        
        if (!modelName) {
            // If no model specified, return all prompts
            const prompts = await pb.collection('prompts').getFullList<Prompt>();
            return { 
                prompt: prompts[0].prompt,
                selectedModel: prompts[0].model
            };
        }
        
        // Fetch prompts filtered by model
        const prompts = await pb.collection('prompts').getFullList<Prompt>({
            filter: `model = '${modelName}'`
        });

        // console.log("The prompt is:", prompts[0].prompt);
        
        return {
            prompt: prompts[0].prompt,
            selectedModel: prompts[0].model
        };
    } catch (err) {
        console.error('Error fetching data:', err);
        throw error(404, 'Item not found');
    }
}