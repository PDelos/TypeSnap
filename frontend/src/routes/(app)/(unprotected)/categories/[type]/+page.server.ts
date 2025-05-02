import { error } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import type { Typography } from '$lib/types';

export async function load({ params }) {
    return {
        type: params.type,
    };
}