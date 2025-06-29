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
    orderBy 
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
      querySnapshot.forEach((doc) => {
        pesquisas.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return pesquisas;
    } catch (error) {
      console.error('Erro ao buscar pesquisas:', error);
      throw error;
    }
  };
  
  // 2. RECUPERAR UMA PESQUISA ESPECÍFICA
  export const getPesquisaById = async (id) => {
    try {
      const docRef = doc(db, 'pesquisas', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
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
  export const addPesquisa = async (dadosPesquisa) => {
    try {
      const pesquisa = {
        ...dadosPesquisa,
        createdAt: new Date(),
        votes: {
          excelente: 0,
          bom: 0,
          neutro: 0,
          ruim: 0,
          pessimo: 0
        }
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
        updatedAt: new Date()
      });
      console.log('Pesquisa atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar pesquisa:', error);
      throw error;
    }
  };
  
  // 5. EXCLUIR PESQUISA
  export const deletePesquisa = async (id) => {
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
      const docRef = doc(db, 'pesquisas', pesquisaId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const dadosAtuais = docSnap.data();
        const votosAtuais = dadosAtuais.votes || {};
        
        await updateDoc(docRef, {
          [`votes.${tipoVoto}`]: (votosAtuais[tipoVoto] || 0) + 1
        });
        
        console.log('Voto registrado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
      throw error;
    }
  };