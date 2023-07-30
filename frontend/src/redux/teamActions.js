import axios from 'axios';

export const CREATE_TEAM_REQUEST = 'CREATE_TEAM_REQUEST';
export const CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS';
export const CREATE_TEAM_FAILURE = 'CREATE_TEAM_FAILURE';
const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;

const createTeamRequest = () => {
    return {
        type: CREATE_TEAM_REQUEST,
    };
};

const createTeamSuccess = (team) => {
    return {
        type: CREATE_TEAM_SUCCESS,
        payload: team,
    };
};

const createTeamFailure = (error) => {
    return {
        type: CREATE_TEAM_FAILURE,
        payload: error,
    };
};

export const createTeam = (selectedUserIds) => {
    return (dispatch) => {
        dispatch(createTeamRequest());
        axios
            .post(`{backendBaseUrl}/api/team`, { selectedUsers: selectedUserIds })
            .then((response) => {
                const team = response.data;
                dispatch(createTeamSuccess(team));
            })
            .catch((error) => {
                dispatch(createTeamFailure(error.message));
            });
    };
};
