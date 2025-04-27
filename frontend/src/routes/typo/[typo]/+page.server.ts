import { error } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import type { Typography } from '$lib/types';

export async function load({ params }) {
    try {
        // Get the parameter from the URL
        const typoId = params.typo;
        
        // Fetch the typography record from PocketBase using the ID
        const record = await pb.collection("typographies").getOne<Typography>(typoId, {
            expand: 'info'
        });
        
        //console.log('Fetched typography:', record);
        //console.log('Expanded info:', record.expand?.info);
        
        return {
            item: record
        };
    } catch (err) {
        console.error('Error fetching data:', err);
        throw error(404, 'Item not found');
    }
}