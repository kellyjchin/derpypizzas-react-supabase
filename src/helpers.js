import { supabase } from "./supabaseClient";

export async function fetchReviews(user) {
    if (user) {
        const { data, error } = await supabase
        .from('Review')
        .select('*')
        .eq('reviewer', user)
        .order('created_at', {ascending: false})
        if (error) {
            console.error('Error fetching data', error);
        }
    
        return data;
    }

    else {
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
}

export async function fetchOrders(user) {
    if (user) {
        const { data, error } = await supabase
        .from('Order')
        .select('*')
        .eq('reviewer', user)
        .order('created_at', {ascending: false})
        if (error) {
            console.error('Error fetching data', error);
        }
    
        return data;
    }
}