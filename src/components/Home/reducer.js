import lodash from 'lodash';
import { GET_IDEAS_SUCCEEDED, CREATE_NEW_IDEA, UPDATE_IDEA, DELETE_IDEA } from './actionTypes';

const homeState = { ideas: [], newIdea: {}}

export const homeReducer = (states = homeState, action) => {
    switch (action.type) {
        case GET_IDEAS_SUCCEEDED:
            return { ...states, ideas: action.payload }

        case CREATE_NEW_IDEA:
            return { ...states, newIdea: action.payload }

        case UPDATE_IDEA:
            const index = lodash.findIndex(states.ideas, (idea) => idea.id === action.payload.id);
            lodash.assign(states.ideas[index], action.payload);
            return { ...states }
        
        case DELETE_IDEA:
            lodash.remove(states.ideas, (idea) => idea.id === action.payload);
            return { ...states }

        default: return states;
    }
}