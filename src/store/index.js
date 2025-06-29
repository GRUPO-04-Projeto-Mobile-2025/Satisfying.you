import { configureStore } from '@reduxjs/toolkit';
import pesquisaReducer from './pesquisaSlice';

export const store = configureStore({
  reducer: {
    pesquisa: pesquisaReducer,
  },
});
