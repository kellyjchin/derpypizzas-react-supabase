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
        .eq('order_user', user)
        .order('created_at', {ascending: false})
        if (error) {
            console.error('Error fetching data', error);
        }
        return data;
    }
}

export async function fetchRewardBalance(user) {
    if (user) {
        const { data, error } = await supabase
        .from('profiles')
        .select('reward_points')
        .eq('user_id', user.id)
        .single();
        
        if (error) {
            console.error('Error fetching data', error);
        }
        return data;
    }
}

export async function updateRewardPoints(user, totalPrice, newBalance) {
    let { error: pointsError } = await supabase
    .from('profiles')
    .update({reward_points: totalPrice + newBalance})
    .eq('user_id', user.id);
    if (pointsError) {
        console.error('Error fetching user profile:', pointsError);
        return;
    }
}