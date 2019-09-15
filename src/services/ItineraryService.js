import Realm, { schemaVersion } from 'realm';
import _ from 'lodash';
import { realmObjectToArray, create_UUID } from '@common';

const ITINERARY = 'ITINERARY';
const DAY = 'DAY';
const ACTIVITY = 'ACTIVITY';
const LOCATION = 'LOCATION';

// ItineraryID: 'string',
// JourneyName: 'string',
// StartDate: 'string',
// EndDate: 'string',
// CoverPhoto: 'string?',

const LocationSchema = {
	name: LOCATION,
	properties: {
		name: 'string',
		lat: 'double',
		lng: 'double',
		country: 'string'
	}
};

const ActivitySchema = {
	name: ACTIVITY,
	properties: {
		title: 'string?',
		location: 'LOCATION',
		photos: 'string?[]',
		description: 'string?',
		budget: 'string?',
		currency: 'string?',
		rate: 'int?'
	}
};

const DaySchema = {
	name: DAY,
	properties: {
		date: 'string?',
		identifier: 'int?',
		activities: 'ACTIVITY[]'
	}
};

const ItinerarySchema = {
	name: ITINERARY,
	primaryKey: 'itineraryID',
	properties: {
		itineraryID: 'string',
		itineraryName: 'string',
		startDate: 'string',
		endDate: 'string',
		coverPhoto: 'string?',
		days: 'DAY[]'
	}
};

const itineraryDBOptions = {
	schema: [ ItinerarySchema, DaySchema, LocationSchema, ActivitySchema ],
	schemaVersion: 1
};

export const updateItinerary = (itinerary) =>
	new Promise((resolve, reject) => {
		Realm.open(itineraryDBOptions)
			.then((realm) => {
				realm.write(() => {
					const newItinerary = realm.create(ITINERARY, itinerary, true);
					// console.log(newItinerary);
					resolve(newItinerary);
				});
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});

export const updateItineraryCoverPhoto = (itinerary) =>
	new Promise((resolve, reject) => {
		Realm.open(itineraryDBOptions)
			.then((realm) => {
				realm.write(() => {
					const newItinerary = realm.create(ITINERARY, itinerary, true);
					resolve(newItinerary);
				});
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});

export const addItinerary = (itineraryName, startDate, endDate) =>
	new Promise((resolve, reject) => {
		let uuid = create_UUID();

		Realm.open(itineraryDBOptions)
			.then((realm) => {
				realm.write(() => {
					const newItinerary = realm.create(
						ITINERARY,
						{
							itineraryID: uuid,
							itineraryName,
							startDate,
							endDate
						},
						true
					);

					resolve(newItinerary);
				});
			})
			.catch((error) => reject(error));
	});

export const queryItineraryList = () =>
	new Promise((resolve, reject) => {
		Realm.open(itineraryDBOptions)
			.then((realm) => {
				realm.write(() => {
					let itineraries = realm.objects(ITINERARY);
					const formatted = _.values(realmObjectToArray(itineraries)); //itinerary to array

					for (let itinerary = 0; itinerary < formatted.length; itinerary++) {
						//day to array
						const days = _.values(realmObjectToArray(formatted[itinerary].days));
						formatted[itinerary].days = days;
						for (let day = 0; day < days.length; day++) {
							//activity to array
							const activities = _.values(realmObjectToArray(days[day].activities));
							formatted[itinerary].days[day].activities = activities;

							for (let activity = 0; activity < activities.length; activity++) {
								//photos to array
								const photos = _.values(realmObjectToArray(activities[activity].photos));
								formatted[itinerary].days[day].activities[activity].photos = photos;
							}
						}
					}

					// console.log(formatted);
					resolve(formatted);
				});
			})
			.catch((error) => reject(error));
	});

export const removeItinerary = (itinerary_id) =>
	new Promise((resolve, reject) => {
		Realm.open(itineraryDBOptions)
			.then((realm) => {
				realm.write(() => {
					realm.delete(realm.objectForPrimaryKey(ITINERARY, itinerary_id));
					resolve(itinerary_id);
				});
			})
			.catch((error) => reject(error));
	});

export default new Realm({ itineraryDBOptions });
