import { v4 as uuid } from 'uuid';

export default({ store }, inject) => {
  store.registerModule('modals', {
    namespaced: true,
    state: {
      modals: []
    },
    getters: {
      modals(state) {
        return state.modals;
      }
    },
    mutations: {
      add(state, modal) {
        if (!state.modals.filter((m) => m.id === modal.id).length) {
          state.modals.push({ id: modal.id, modal: modal.modal, binds: modal.binds });
        }
      },

      remove(state, id) {
        const index = state.modals.findIndex((m) => m.id === id);

        if (index >= 0) {
          state.modals.splice(index, 1);
        }
      },

      clear(state) {
        state.modals = [];
      }
    }
  });

  const all = () => {
    return store.getters['modals/modals'];
  };

  const count = () => {
    return store.getters['modals/modals'].length;
  };

  const add = (modal, binds, id = null) => {
    if (!id) {
      id = `modal-${uuid()}`;
    }

    store.commit('modals/add', { id, modal, binds });
  };

  const remove = (id) => {
    store.commit('modals/remove', id);
  };

  const clear = () => {
    store.commit('modals/clear');
  };

  inject('modals', {
    all,
    count,
    add,
    remove,
    clear
  });
};
