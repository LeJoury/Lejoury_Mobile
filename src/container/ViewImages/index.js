import React, { useState } from 'react';
import {
	View,
	FlatList,
	ActivityIndicator,
	Image,
	TouchableOpacity,
	Modal,
	Dimensions,
	Platform,
	TouchableNativeFeedback
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { ScaledImage, Spinner } from '@components';
import { Constants, Color, formatImages } from '@common';

const { Sizes } = Constants.Spinner;

import styles from './styles';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const { width, height } = Dimensions.get('window');

const ViewImages = ({ images }) => {
	//preview image
	const [ previewModalVisible, setPreviewModalVisible ] = useState(false);
	const [ selectedIndex, setSelectedIndex ] = useState(0);

	const renderImage = ({ item, index }) => {
		return (
			<Touchable
				activeOpacity={0.8}
				key={index}
				onPress={() => {
					setPreviewModalVisible(true);
					setSelectedIndex(index);
				}}
			>
				<View style={styles.images}>
					<ScaledImage uri={item.link} key={index} width={width - 16} />
				</View>
			</Touchable>
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
