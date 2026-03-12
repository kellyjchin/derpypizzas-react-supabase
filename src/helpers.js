import { supabase } from "./supabaseClient";

export async function fetchRecentReviewsAllUsers(user) {
    const { data, error } = await supabase
    .from('Review')
    .select(`
        id,
        review_body,
        rating,
        created_at,
        profiles (
            email
        ),
        review_likes_dislikes (
            profile_id,
            like_status
        )
    `)
    .limit(3)
    .order('created_at', {ascending: false})
    if (error) {
        console.error('Error fetching data', error);
    }

    const reviewsWithCounts = data.map(review => {
        const likeCount = review.review_likes_dislikes.filter(r => r.like_status === 1).length;
        const dislikeCount = review.review_likes_dislikes.filter(r => r.like_status === -1).length;
        return { ...review, likeCount, dislikeCount };
    });

    return reviewsWithCounts;
}

export async function fetchUserReviewsPaginated({ userId, limit, offset }) {
    if(!userId) return;

    // first get the profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .single()

    if(!profile) return;

    // then with the profile gotten, use it to grab the profile's reviews    
    const from = offset;
    const to = offset + limit - 1;    
    const { data, error, count } = await supabase
        .from('Review')
        .select(`
            id,
            review_body,
            rating,
            created_at,
            profiles (
                email
            ),
            review_likes_dislikes (
                profile_id,
                like_status
            )
        `, {count: 'exact'})
        .eq('profile_id', profile.id)
        .order('created_at', {ascending: false})
        .range(from, to);
    
    if (error) {
        console.error('Error fetching data', error);
    }

    const reviewsWithCounts = data.map(review => {
        const likeCount = review.review_likes_dislikes.filter(r => r.like_status === 1).length;
        const dislikeCount = review.review_likes_dislikes.filter(r => r.like_status === -1).length;
        return { ...review, likeCount, dislikeCount };
    });
    reviewsWithCounts.total = count;
    return reviewsWithCounts;
}

export async function fetchAllOrders(user) {
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

export async function fetchOrdersPaginated({ userEmail, limit, offset }) {

    if (!userEmail) return null;

    const from = offset;
    const to = offset + limit - 1;

    const { data, error, count } = await supabase
        .from('Order')
        .select('*', { count: 'exact' })
        .eq('order_user', userEmail)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching orders:', error);
        return null;
    }

    return {
        orders: data,
        totalCount: count
    };
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

export async function fetchCommentsForReview(reviewId) {
    if(!reviewId) return;
    const { data, error } = await supabase
        .from('comments')
        .select(`
            id,
            comment_body,
            created_at,
            profiles (
                email
            )
        `)
        .eq("review_id", reviewId)
        .order("created_at", { ascending: true });

    if(error) {
        console.error(error);
        return;
    }

    return data;
}

export async function insertComment(newComment) {
    if(!newComment) return;

    const { error } = await supabase
        .from('comments')
        .insert(newComment)

    if(error) {
        console.error('Error inserting new comment', error)
    }
}