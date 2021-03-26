import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import rootReducer from '../redux/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [ 'auth' ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export function configureStore(initialState) {
	const store = createStore(
		persistedReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
	);
	let persistor = persistStore(store, null, () => {});

	return { store, persistor };
}
