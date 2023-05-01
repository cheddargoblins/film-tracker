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


export const getPosterURL = async (movieId) => {
    const response = await axios.post('/movie/getPoster/', {
        'film_id' : movieId,
    }, {
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
    return response.data.data;
};


export const handleSearch = async (e, searchQuery, navigate, setSearchQuery) => {
    e.preventDefault();
    const response = await axios.post('/movie/search/', {
        'movie_title': searchQuery
    }, {
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
    });
    navigate(`/movie/search/${searchQuery.toLowerCase()}`, { state: { results: response.data.results } });
    setSearchQuery("");
};

export const getIMDBLists = async () => {
    try {
        const response = await axios.get(`/movie/getIMDBLists/`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};


export const getMovieTimes = async () => {
    try {
        const response = await axios.get(`/movie/getTimes/`);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};