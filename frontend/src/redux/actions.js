import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || "https://heliverse-api.onrender.com";

export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users, totalUsers, currentPage, totalPages) => ({
    type: FETCH_USERS_SUCCESS,
    payload: { users, totalUsers, currentPage, totalPages },
});

export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: { error },
});

export const fetchUsers = (queryParams) => {
    return async (dispatch) => {
        try {
            dispatch(fetchUsersRequest());
            const response = await axios.get(`${backendBaseUrl}/api/users`, { params: queryParams });
            const { users, totalUsers, currentPage, totalPages } = response.data;
            dispatch(fetchUsersSuccess(users, totalUsers, currentPage, totalPages));
        } catch (error) {
            dispatch(fetchUsersFailure(error.message));
        }
    };
};
