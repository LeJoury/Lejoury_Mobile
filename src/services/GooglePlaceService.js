import axios from 'axios';
import { Constants } from '@common';

const { URL } = Constants.URL;
const { STATUS } = Constants.STATUS;
const { PARAMS, FIELDS_NAME } = Constants.PARAMS;

export const QUERY_PLACES = (input) =>
	new Promise((resolve, reject) => {
		let link = `${URL.GOOGLE_PLACE_URL}`;
		let params = `${PARAMS.INPUT}=${input}&`;
		let key = `${PARAMS.API_KEY}=AIzaSyBNmvhqpaxVMyWmdvnPljeALQtjL5CexwY`;

		axios
			.get(`${link}${params}${key}`)
			.then((response) => {
				const { status, predictions } = response.data;

				if (status === STATUS.OK) {
					resolve(predictions);
				} else {
					resolve([]);
				}
			})
			.catch((error) => {
				reject(error.response);
			});
	});

export const GET_PLACE_DETAILS = (place_id) =>
	new Promise((resolve, reject) => {
		let link = `${URL.GOOGLE_PLACE_DETAILS_URL}`;
		let params = `${PARAMS.PLACE_ID}=${place_id}&${PARAMS.FIELDS}=${FIELDS_NAME.NAME},${FIELDS_NAME.COMPONENT},${FIELDS_NAME.ADDRESS},${FIELDS_NAME.GEOMETRY},${FIELDS_NAME.TYPE},${FIELDS_NAME.URL}&`;
		let key = `${PARAMS.API_KEY}=AIzaSyBNmvhqpaxVMyWmdvnPljeALQtjL5CexwY`;

		axios
			.get(`${link}${params}${key}`)
			.then((response) => {
				const { status, result } = response.data;

				if (status === STATUS.OK) {
					resolve(result);
				} else {
					reject();
				}
			})
			.catch((error) => {
				reject(error.response);
				console.log(error.response);
			});
	});
