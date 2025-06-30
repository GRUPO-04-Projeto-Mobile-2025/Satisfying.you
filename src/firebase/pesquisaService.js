import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import app from './config';

const db = getFirestore(app);
const pesquisasCollection = collection(db, 'pesquisas');

// 1. RECUPERAR TODAS AS PESQUISAS
export const getAllPesquisas = async () => {
  try {
    const q = query(pesquisasCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const pesquisas = [];
    querySnapshot.forEach(document => {
      pesquisas.push({
        id: document.id,
        ...document.data(),
      });
    });

    return pesquisas;
  } catch (error) {
    console.error('Erro ao buscar pesquisas:', error);
    throw error;
  }
};

// 2. RECUPERAR UMA PESQUISA ESPECÍFICA
export const getPesquisaById = async id => {
  try {
    const docRef = doc(db, 'pesquisas', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error('Pesquisa não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar pesquisa:', error);
    throw error;
  }
};

// 3. CADASTRAR NOVA PESQUISA (melhorada)
export const addPesquisa = async dadosPesquisa => {
  try {
    const pesquisa = {
      ...dadosPesquisa,
      createdAt: new Date(),
      votes: {
        excelente: 0,
        bom: 0,
        neutro: 0,
        ruim: 0,
        pessimo: 0,
      },
    };

    const docRef = await addDoc(pesquisasCollection, pesquisa);
    console.log('Pesquisa criada com ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar pesquisa:', error);
    throw error;
  }
};

// 4. MODIFICAR PESQUISA
export const updatePesquisa = async (id, novosDados) => {
  try {
    const docRef = doc(db, 'pesquisas', id);
    await updateDoc(docRef, {
      ...novosDados,
      updatedAt: new Date(),
    });
    console.log('Pesquisa atualizada com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar pesquisa:', error);
    throw error;
  }
};

// 5. EXCLUIR PESQUISA
export const deletePesquisa = async id => {
  try {
    const docRef = doc(db, 'pesquisas', id);
    await deleteDoc(docRef);
    console.log('Pesquisa excluída com sucesso');
  } catch (error) {
    console.error('Erro ao excluir pesquisa:', error);
    throw error;
  }
};

// 6. ADICIONAR VOTO À PESQUISA
export const addVoto = async (pesquisaId, tipoVoto) => {
  try {
    console.log('=== DEBUG addVoto ===');
    console.log('pesquisaId:', pesquisaId);
    console.log('tipoVoto:', tipoVoto);

    const docRef = doc(db, 'pesquisas', pesquisaId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dadosAtuais = docSnap.data();
      const votosAtuais = dadosAtuais.votes || {};

      console.log('votosAtuais antes:', votosAtuais);

      // Converter tipoVoto para minúsculas para garantir consistência
      const key = tipoVoto.toLowerCase(); // 'Excelente' → 'excelente'
      const novoValor = (votosAtuais[key] || 0) + 1;
      console.log(`Atualizando votes.${key} para:`, novoValor);

      await updateDoc(docRef, {
        [`votes.${key}`]: novoValor,
      });

      console.log('Voto registrado com sucesso');

      // Verificar se foi salvo corretamente
      const docSnapVerificacao = await getDoc(docRef);
      if (docSnapVerificacao.exists()) {
        console.log('votes após atualização:', docSnapVerificacao.data().votes);
      }
    } else {
      console.error('Pesquisa não encontrada para ID:', pesquisaId);
      throw new Error('Pesquisa não encontrada');
    }
  } catch (error) {
    console.error('Erro ao registrar voto:', error);
    throw error;
  }
};

// 7. OBTER VOTOS POR PESQUISA PARA RELATÓRIO
export const getVotosPorPesquisa = async pesquisaId => {
  try {
    const docRef = doc(db, 'pesquisas', pesquisaId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dadosPesquisa = docSnap.data();
      const votesOriginais = dadosPesquisa.votes || {};

      console.log('=== DEBUG getVotosPorPesquisa ===');
      console.log('votesOriginais:', votesOriginais);

      // Normalizar as chaves para minúsculo para garantir consistência
      const votesNormalizados = {};

      Object.entries(votesOriginais).forEach(([chave, valor]) => {
        const chaveNormalizada = chave.toLowerCase();
        votesNormalizados[chaveNormalizada] = valor;
        console.log(`Normalizando: ${chave} -> ${chaveNormalizada} = ${valor}`);
      });

      console.log('votesNormalizados:', votesNormalizados);
      return votesNormalizados;
    } else {
      console.log('Pesquisa não encontrada para o relatório.');
      throw new Error('Pesquisa não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar votos da pesquisa:', error);
    throw error;
  }
};
