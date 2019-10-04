import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device, Styles } from "@common";

export default StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Color.white1,
        paddingHorizontal: 20,
        height: 60
    },
    leftText: {
        fontSize: 15,
        color: Color.darkGrey2,
		fontFamily: 'Quicksand-Regular',
    },
    rightText: {
        fontSize: 14,
        color: Color.grey1,
        alignSelf: 'flex-start',
		fontFamily: 'Quicksand-Regular',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
    }
});
