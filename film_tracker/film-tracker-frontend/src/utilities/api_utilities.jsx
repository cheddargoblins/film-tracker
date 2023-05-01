import axios from 'axios';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export const fetchWatchlist = async () => {
        try {
            const response = await axios.get(`/user/api/get_watchlist/`);
            return response.data.watchlist;
        }
        catch (error) {
            console.error(error);
        }
};


export const removeFromWatchlist = async (movieId) => {
        console.log(`Attempting to remove: ${movieId}`)
        try {
            await axios.post(`/user/api/remove_watchlist/`, {
                'film_id' : movieId,
            }, {
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
        }
        catch (error) {
            console.error(error);
        }
};


export const fetchList = async () => {
    try {
        const response = await axios.get(`/user/api/get_custom_list/`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};


export const addCustomList = async (listName) => {
    console.log(`Attempting to create list named ${listName}`)
    try {
        await axios.post(`/user/api/create_list/`, {
            'list_name' : listName
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};


export const removeList = async (list_name) => {
    console.log(`Attempting to remove ${list_name}`)
    try {
        await axios.post(`/user/api/delete_list/`, {
            'list_name' : list_name
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};


export const addToList = async (list_name,movieId) => {
    console.log(`Attempting to add: ${movieId} to ${list_name}`)
    try {
        await axios.post(`/user/api/add_list/`, {
            'film_id' : movieId,
            'list_name' : list_name
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};


export const removeFromList = async (movieId,list_name) => {
    console.log(`Attempting to remove: ${movieId} from ${list_name}`)
    try {
        await axios.post(`/user/api/remove_list/`, {
            'film_id' : movieId,
            'list_name' : list_name
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};


export const fetchUserReviews = async () => {
    try {
        const response = await axios.get(`/user/api/get_user_review/`);
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export const deleteReview = async (movieId) => {
    console.log(`Attempting to delete review of ${movieId}`)
    try {
        await axios.post(`/user/api/delete_review/`, {
            'film_id' : movieId
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};

export const updateReview = async (movieId,newReview) => {
    console.log(`Attempting to update a review of ${movieId}`)
    try {
        await axios.put(`/user/api/update_review/`, {
            'film_id' : movieId,
            'review' : newReview
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};




////////////////////////////////////////////////////////////////////
export const addMovieReview = async (review_content, movieId) => {
    console.log(`Attempting to add a review to ${movieId}`)
    try {
        await axios.post(`/user/api/create_review/`, {
            'review_content' : review_content,
            'film_id' : movieId
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};


export const getMovieReviews = async (movieId) => {
    console.log(`Attempting to get reviews of ${movieId}`)
    try {
        const response = await axios.post(`/user/api/get_review/`, {
            'film_id' : movieId
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};


export const addMovieToWatchlist = async (movieId) => {
    console.log(`Attempting to add ${movieId} to watchlist`)
    try {
        await axios.post(`/user/api/add_watchlist/`, {
            'film_id' : movieId
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    }
    catch (error) {
        console.error(error);
    }
};




////////////////////////////////////////////////////////////////////
export const getMovieDetails = async (movieId) => {
    console.log(`Attempting to get infomation for ${movieId}`)
    try {
        const response = await axios.post(`/movie/details/`, {
            'film_id' : movieId
        }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};