import { createStore } from 'vuex'

export default createStore({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    selectedProject:null,
    editAttr:{}
  },
  mutations: {
    updateselectedProject(state,value){
      state.selectedProject=value;
    },
    updateeditAttr(state,value){
      state.editAttr=value;
    }
  },
  actions: {

  },
  modules: {

  }
})
