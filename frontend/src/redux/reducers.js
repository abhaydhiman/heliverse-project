import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from './actions';

const initialState = {
    users: [],
    totalUsers: 0,
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
                totalUsers: action.payload.totalUsers,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
            };
        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload.error };
        default:
            return state;
    }
};

export default userReducer;
