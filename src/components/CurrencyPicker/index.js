import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements';

import { Languages, Color } from '@common';

import styles from './styles';

const CurrencyPicker = (props) => (
	<RNPickerSelect
		onValueChange={(value) => props.setCurrency(value)}
		doneText={Languages.Done}
		value={props.currency}
		style={{
			...pickerSelectStyles,
			iconContainer: {
				top: Platform.OS === 'ios' ? 8 : 16,
				right: 8
			},
			inputIOSContainer: {
				marginLeft: -12,
				paddingHorizontal: 0
			},
			inputAndroidContainer: {
				width: 80,
				marginLeft: -12
			}
		}}
		useNativeAndroidPickerStyle={false}
		Icon={() => {
			return <Icon name="chevron-down" type="feather" color={Color.black} size={15} />;
		}}
		items={[ { label: 'USD', value: 'USD' }, { label: 'MYR', value: 'MYR' }, { label: 'SGD', value: 'SGD' } ]}
	/>
);

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 14,
		paddingVertical: 6,
		color: Color.black,
		fontFamily: 'Quicksand-Medium',
		paddingLeft: 6,
		paddingRight: 32 /// to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 14,
		paddingVertical: 8,
		color: Color.black,
		fontFamily: 'Quicksand-Medium',
		paddingRight: 30 // to ensure the text is never behind the icon
	}
});

export default CurrencyPicker;
