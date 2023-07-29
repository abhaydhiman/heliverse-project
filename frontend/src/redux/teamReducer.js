import {
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAILURE,
} from './teamActions';

const initialState = {
    team: null,
    loading: false,
    error: null,
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TEAM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                team: action.payload,
            };
        case CREATE_TEAM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default teamReducer;
