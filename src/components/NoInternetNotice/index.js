import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import { updateConnectionStatus } from '@actions';

import { Languages } from '@common';

import styles from './styles';

const NoInternetNotice = (props) => {
	const { netInfo } = props;

	useEffect(() => {
		NetInfo.isConnected.addEventListener('connectionChange', handleConnectionChange);

		return () => {
			NetInfo.isConnected.removeEventListener('connectionChange', handleConnectionChange);
		};
	}, []);

	const handleConnectionChange = (isConnected) => {
		props.updateConnectionStatus(isConnected);
		if (!isConnected) {
			return;
		}
	};

	const renderView = () => {
		if (!netInfo.isConnected) {
			return (
				<View style={styles.connectionStatus}>
					<Text style={styles.connectionText}>{Languages.NoConnection}</Text>
				</View>
			);
		} else {
			return;
		}
	};

	return <View>{renderView()}</View>;
};

const mapStateToProps = ({ netInfo }) => ({
	netInfo
});

// export default NoInternetNotice;
export default connect(mapStateToProps, { updateConnectionStatus })(NoInternetNotice);
