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

export const signUp = async(display_name, email, password, dob) => {
    let response = await axios.post('/user/' , {
        'display_name': display_name,
        'email' : email,
        'password' : password,
        'dob' : dob
    })
    return response.data.success
}


export const logIn = async(email, password, setUser) => {
    let response = await axios.post('/user/', {
        'email' : email,
        'password' : password
    }, {
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    setUser(response.data)
}

export const currUser = async() =>{
    let response = await axios.get('/user/')
    return response.data
}

export const logOut = async(setUser) => {
    let response = await axios.post('/user/', {}, {
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    if(response.data.logout){
        setUser(null)
    }
}

