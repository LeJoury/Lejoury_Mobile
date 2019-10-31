import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import { updateItineraryByID, publishItineraryByID } from '@actions';

import { Spinner, Button, AnimatedTextInput } from '@components';
import { Styles, Languages, Color, Device, createStaggerAnimationStyle, showOkAlert, Constants } from '@common';

import styles from './styles';

const { Mode } = Constants.Spinner;

const { width, height } = Dimensions.get('window');

const AddQuote = (props) => {
	const [ quoteBox ] = useState(new Animated.Value(0));
	const [ confirmButtonBox ] = useState(new Animated.Value(0));

	const [ quote, setQuote ] = useState('');
	const [ isQuoteFocus, setQuoteFocus ] = useState(false);

	const [ isLoading, setIsLoading ] = useState(false);

	const [ itineraryId ] = useState(props.navigation.state.params.itineraryId);

	const [ selectedItinerary ] = useState(
		props.draft.itineraries.find((itinerary) => itinerary.itineraryId === itineraryId)
	);
	const onChangeQuote = (value) => {
		setQuote(value);
	};

	useEffect(() => {
		Animated.stagger(100, [
			Animated.timing(quoteBox, {
				toValue: 1,
				duration: 200
			}),
			Animated.timing(confirmButtonBox, {
				toValue: 1,
				duration: 200
			})
		]).start(() => {
			this._quote.getNode().focus();
		});
	}, []);

	const quoteBoxStyle = createStaggerAnimationStyle(quoteBox);
	const confirmButtonBoxStyle = createStaggerAnimationStyle(confirmButtonBox);

	const onConfirmPublish = () => {
		let newItinerary = {
			...selectedItinerary,
			quote: quote
		};
		const { token, userId } = props.user;

		setIsLoading(true);

		setTimeout(() => {
			props.updateItineraryByID(itineraryId, newItinerary, token, userId).then((response) => {
				setIsLoading(false);
				if (response.OK) {
					props
						.publishItineraryByID(itineraryId, token)
						.then((publishResponse) => {
							if (publishResponse.OK) {
								showOkAlert(
									Languages.SuccessfullyPublishedTitle,
									Languages.SuccessfullyPublishedMessage,
									Languages.OK,
									() => {
										props.navigation.dispatch({
											type: 'Navigation/RESET',
											index: 0,
											key: null,
											actions: [ NavigationActions.navigate({ routeName: 'Main' }) ]
										});
									}
								);
							} else {
								setIsLoading(false);
								//TODO: show failed message
								// try again
							}
						})
						.catch((error) => {
							setIsLoading(false);
							//TODO: show failed message
							// try again
						});
				}
			});
		}, 1500);
	};

	const renderLoading = () => {
		if (!isLoading) {
			return;
		}

		return <Spinner mode={Mode.publishItinerary} />;
	};

	return (
		<View style={styles.container}>
			<View style={styles.subContainer}>
				<Text style={styles.finalStepTitleStyle}>One More Step !</Text>
				<Text style={styles.finalStepTextStyle}>Any Quote of the trip you want to share ?</Text>
				<AnimatedTextInput
					inputRef={(ref) => (this._quote = ref)}
					inputStyle={[
						styles.input,
						quoteBoxStyle,
						{ borderColor: isQuoteFocus ? Color.primary : Color.lightGrey6 }
					]}
					placeholder={Languages.ShareYourQuote}
					onFocus={() => setQuoteFocus(true)}
					onBlur={() => setQuoteFocus(false)}
					onChangeText={(text) => onChangeQuote(text)}
					value={quote}
				/>
			</View>
			<Animated.View style={[ styles.buttonWrap, confirmButtonBoxStyle ]}>
				<Button
					text={Languages.Confirm}
					textStyle={styles.confirmTextStyle}
					containerStyle={styles.confirmButton}
					onPress={onConfirmPublish}
				/>
			</Animated.View>
			{renderLoading()}
		</View>
	);
};

const mapStateToProps = ({ draft, user }) => ({
	draft,
	user
});

export default connect(mapStateToProps, { updateItineraryByID, publishItineraryByID })(AddQuote);
