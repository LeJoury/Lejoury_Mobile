import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Modal, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { ScaledImage, Spinner } from '@components';
import { Constants, Color, formatImages } from '@common';

const { Sizes } = Constants.Spinner;

import styles from './styles';

const { width, height } = Dimensions.get('window');

const ViewImages = ({ images }) => {
	//preview image
	const [ previewModalVisible, setPreviewModalVisible ] = useState(false);
	const [ selectedIndex, setSelectedIndex ] = useState(0);

	const renderImage = ({ item, index }) => {
		return (
			<TouchableOpacity
				style={styles.images}
				key={index}
				onPress={() => {
					setPreviewModalVisible(true);
					setSelectedIndex(index);
				}}
			>
				<ScaledImage uri={item} key={index} width={width - 16} />
			</TouchableOpacity>
		);
	};

	const renderPreviewModal = () => {
		return (
			<Modal
				visible={previewModalVisible}
				transparent={true}
				onRequestClose={() => setPreviewModalVisible(false)}
			>
				<ImageViewer
					imageUrls={formatImages(images)}
					onSwipeDown={() => setPreviewModalVisible(false)}
					enableSwipeDown={true}
					enablePreload={true}
					index={selectedIndex}
					loadingRender={() => (
						<ActivityIndicator color={Color.white} size={Sizes.LARGE} style={styles.loadingStyle} />
					)}
				/>
			</Modal>
		);
	};

	return (
		<View style={styles.container}>
			{renderPreviewModal()}
			<FlatList data={images} renderItem={renderImage} />
		</View>
	);
};
export default ViewImages;
