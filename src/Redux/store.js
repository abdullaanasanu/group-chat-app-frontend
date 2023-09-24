import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './group/groupSlice'
import chatReducer from './group/chatSlice'

export default configureStore({
  reducer: {
    group: groupReducer,
    chat: chatReducer,
  },
})