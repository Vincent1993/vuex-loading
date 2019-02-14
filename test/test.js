const test = require('ninos')(require('ava'));
const Vuex = require('vuex');
const Vue = require('vue');

const createLoadingPlugin = require('..');

Vue.use(Vuex);

const asyncFn = context => {
  return new Promise(() => {
    setTimeout(resolve => {
      context.commit('ASYNC_SUCCESS');
      resolve();
    }, 2000);
  });
};

test('default namespace should be @@loading', t => {
  const store = new Vuex.Store({
    plugins: [createLoadingPlugin()]
  });

  t.truthy(store.state['@@loading'], 'aaaaaa');
});

test('set custom namespace', t => {
  const store = new Vuex.Store({
    plugins: [
      createLoadingPlugin({
        namespace: '@@custom-loading'
      })
    ]
  });

  t.truthy(store.state['@@custom-loading']);
  t.falsy(store.state['@@loading']);
});

test('exited namespace', t => {
  const error = t.throws(() => {
    const store = new Vuex.Store({
      state: {
        testState: {
          test: 1
        }
      },
      plugins: [
        createLoadingPlugin({
          namespace: 'testState'
        })
      ]
    });
    t.falsy(store.state['@@loading']);
  });

  t.is(error.message, 'createLoadingPlugin: testState exited in current store');
});

test('async action', async t => {
  const store = new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      ASYNC_SUCCESS(state) {
        state.count++;
      }
    },
    actions: {
      add(context) {
        asyncFn(context);
      }
    },
    plugins: [createLoadingPlugin()]
  });

  await store.dispatch('add');

  t.deepEqual(store.state['@@loading'], {
    global: false,
    effects: {
      add: false
    }
  });
});

test('includes', async t => {
  const store = new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      ASYNC_SUCCESS(state) {
        state.count++;
      }
    },
    actions: {
      add(context) {
        asyncFn(context);
      },
      add1(context) {
        asyncFn(context);
      }
    },
    plugins: [
      createLoadingPlugin({
        includes: ['add']
      })
    ]
  });

  await store.dispatch({
    type: 'add'
  });
  await store.dispatch({
    type: 'add1'
  });

  t.deepEqual(store.state['@@loading'], {
    global: false,
    effects: {
      add: false
    }
  });
});

test('excludes', async t => {
  const store = new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      ASYNC_SUCCESS(state) {
        state.count++;
      }
    },
    actions: {
      add(context) {
        asyncFn(context);
      },
      add3(context) {
        asyncFn(context);
      }
    },
    plugins: [
      createLoadingPlugin({
        excludes: ['add']
      })
    ]
  });

  await store.dispatch('add');
  await store.dispatch('add3');
  t.deepEqual(store.state['@@loading'], {
    global: false,
    effects: {
      add3: false
    }
  });
});
