export const FETCH_DOMAIN_OPTIONS_REQUEST = 'FETCH_DOMAIN_OPTIONS_REQUEST';
export const FETCH_DOMAIN_OPTIONS_SUCCESS = 'FETCH_DOMAIN_OPTIONS_SUCCESS';
export const FETCH_DOMAIN_OPTIONS_FAILURE = 'FETCH_DOMAIN_OPTIONS_FAILURE';

export const fetchDomainOptions = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_DOMAIN_OPTIONS_REQUEST });

        const response = await fetch('http://localhost:5000/api/domains'); 
        const data = await response.json();

        dispatch({
            type: FETCH_DOMAIN_OPTIONS_SUCCESS,
            payload: data.domainOptions, 
        });
    } catch (error) {
        dispatch({ type: FETCH_DOMAIN_OPTIONS_FAILURE, payload: error.message });
    }
};
