import axios from 'axios';
import { GET_IDEAS_SUCCEEDED, CREATE_NEW_IDEA, UPDATE_IDEA, DELETE_IDEA } from './actionTypes';
import { constant } from '../../constant.js';

export const getIdeas = () => (dispatch) =>{
    axios.get(`${constant.API_ENDPOINT_URL}/ideas`).then((response) => {
      dispatch({ type: GET_IDEAS_SUCCEEDED, payload: response.data });
    })
}

export const createNewIdea = () => (dispatch) =>{
    axios.post(`${constant.API_ENDPOINT_URL}/ideas/new`, {
        created_date: new Date(),
        id: Math.floor(Math.random()*90000) + 10000,
        title: "",
        body: ""
    }).then((response) => {
        dispatch({ type: CREATE_NEW_IDEA, payload: response.data });
    })
}
export const updateIdea = (payload) => (dispatch) => {
    axios.put(`${constant.API_ENDPOINT_URL}/idea/update/${payload.id}`, {
        title: payload.title,
        body: payload.body,
        created_date: new Date(),
    }).then((response) => {
        dispatch({ type: UPDATE_IDEA, payload: response.data });
    });
}

export const deleteIdea = (idea) => (dispatch) => {
    axios.delete(`${constant.API_ENDPOINT_URL}/idea/delete/${idea.id}`).then((response) => {
        dispatch({ type: DELETE_IDEA, payload: idea.id });
    });
}