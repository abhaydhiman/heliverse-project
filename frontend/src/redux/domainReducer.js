import {
    FETCH_DOMAIN_OPTIONS_REQUEST,
    FETCH_DOMAIN_OPTIONS_SUCCESS,
    FETCH_DOMAIN_OPTIONS_FAILURE,
} from './domainActions';

const initialState = {
    domainOptions: [],
    loading: false,
    error: null,
};

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DOMAIN_OPTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_DOMAIN_OPTIONS_SUCCESS:
            return {
                ...state,
                domainOptions: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_DOMAIN_OPTIONS_FAILURE:
            return {
                ...state,
                domainOptions: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default domainReducer;
