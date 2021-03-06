import { persistCombineReducers } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import AsyncStorage from '@react-native-community/async-storage';

import { reducer as NetInfoReducer } from './NetInfoRedux';
import { reducer as AuthReducer } from './AuthRedux';
import { reducer as DraftReducer } from './DraftRedux';
import { reducer as ProfileReducer } from './ProfileRedux';
import { reducer as TravellerRedux } from './TravellerRedux';
import { reducer as ItineraryRedux } from './ItineraryRedux';

const saveSubsetFilter = createFilter('user', [ 'username', 'userId', 'token' ]);

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
	draft: DraftReducer,
	profile: ProfileReducer,
	traveller: TravellerRedux,
	itinerary: ItineraryRedux
});
