import { createStore } from 'vuex'

export default createStore({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    selectedProject:{},
    editAttr:{},
    newAttr:true,
  },
  mutations: {
    updateselectedProject(state,value){
      state.selectedProject=value;
    },
    updateeditAttr(state,value){
      state.editAttr=value;
    },
    updatenewAttr(state,value){
      state.newAttr=value;
    }
  },
  actions: {

  },
  modules: {

  }
})
