import { Dimensions, StyleSheet } from 'react-native';
import { Color, Styles } from '@common';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
		paddingTop: 6,
        alignItems: 'center',
        justifyContent: 'center'
    }
});