import { persistCombineReducers } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import AsyncStorage from '@react-native-community/async-storage';

import { reducer as NetInfoReducer } from './NetInfoRedux';
import { reducer as AuthReducer } from './AuthRedux';
import { reducer as DraftReducer } from './DraftRedux';

const saveSubsetFilter = createFilter('user', [ 'username', 'token' ]);

const config = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: [
		'netInfo',
		'nav'
		// 'toast',
		// 'layouts',
		// 'payment',
	],
	whitelist: [ 'user' ],
	transforms: [ saveSubsetFilter ]
};

export default persistCombineReducers(config, {
	netInfo: NetInfoReducer,
	user: AuthReducer,
	draft: DraftReducer
});