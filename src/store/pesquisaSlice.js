// src/store/pesquisaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nome: '',
  data: null,
  imagem: null,
};

const pesquisaSlice = createSlice({
  name: 'pesquisa',
  initialState,
  reducers: {
    setPesquisa: (state, action) => {
      state.nome = action.payload.nome;
      state.data = action.payload.data;
      state.imagem = action.payload.imagem;
    },
    resetPesquisa: (state) => {
      state.nome = '';
      state.data = null;
      state.imagem = null;
    },
  },
});

export const { setPesquisa, resetPesquisa } = pesquisaSlice.actions;
export default pesquisaSlice.reducer;
