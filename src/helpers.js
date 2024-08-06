import { supabase } from "./supabaseClient";

export async function getLatestReviews() {
    const { data, error } = await supabase
        .from('Review')
        .select('*')
        .limit(3)
        .order('created_at', {ascending: false})

    if (error) {
        console.error('Error fetching data', error);
    }

    return data;
}