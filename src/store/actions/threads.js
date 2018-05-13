import axios from 'axios'

import config from '../../config'

export const GET_THREAD = 'GET_THREAD'
export const GET_THREADS = 'GET_THREADS'
export const THREAD_CREATED = 'THREAD_CREATED'
export const GET_THREAD_LOADED = 'GET_THREAD_LOADED'
export const GET_THREAD_LOADING = 'GET_THREAD_LOADING'
export const GET_THREADS_LOADED = 'GET_THREADS_LOADED'
export const GET_THREADS_LOADING = 'GET_THREADS_LOADING'

export const getThreads = (page = 1) => async (dispatch, getState) => {
  dispatch({
    type: GET_THREADS_LOADING
  })
  const response = await axios.get(`${config.apiUrl}/threads?page=${page}`)

  dispatch({
    type: GET_THREADS,
    payload: response.data.data
  })
  dispatch({
    type: GET_THREADS_LOADED
  })
} 

export const createThread = (data) => async (dispatch, getState) => {
  const response = await axios.post(`${config.apiUrl}/threads`, data, {
    headers: {
      Authorization: `Bearer ${getState().auth.accessToken}`
    }
  })

  dispatch({
    type: THREAD_CREATED,
    payload: response.data.data
  })
} 

export const getThread = (id) => async (dispatch) => {
  dispatch({
    type: GET_THREAD_LOADING
  })

  const response = await axios.get(`${config.apiUrl}/threads/show/${id}`)

  dispatch({
    type: GET_THREAD,
    payload: response.data.data
  })
  dispatch({
    type: GET_THREAD_LOADED
  })
}