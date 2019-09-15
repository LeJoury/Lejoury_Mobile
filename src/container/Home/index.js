import React, { Component } from 'react';
import {
	Animated,
	Text,
	Dimensions,
	ScrollView,
	View,
	TouchableOpacity,
	SafeAreaView,
	Platform,
	StyleSheet
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { connect } from 'react-redux';

import { getItineraryDraft } from '@actions';

import { ItineraryHolder, CountryHolder, TravellerHolder, Section } from '@components';
import { Search } from '@container';
import { Images, Languages, Device, Color, Styles } from '@common';

import styles from './styles';

const { width, height } = Dimensions.get('window');

const countries = [
	{
		countryID: 'country_1',
		countryName: 'Malaysia',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FMalaysia.jpg?alt=media&token=9f1a40b2-4429-4562-9409-5faeac822e91'
	},
	{
		countryID: 'country_2',
		countryName: 'Brunei',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FBrunei.jpeg?alt=media&token=541930d6-e212-4c27-b93e-9099c157fcb5'
	},
	{
		countryID: 'country_3',
		countryName: 'Cambodia',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FCambodia.jpg?alt=media&token=19eec492-827b-46e3-8cd9-926ceef6bd20'
	},
	{
		countryID: 'country_4',
		countryName: 'Laos',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FLaos.jpeg?alt=media&token=0ad2ce9a-bcac-4bb5-b060-0c817fda09a3'
	},
	{
		countryID: 'country_5',
		countryName: 'Myanmar',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FMyanmar.jpg?alt=media&token=c8f9341f-8b32-47f1-9aac-ff9c5103af92'
	},
	{
		countryID: 'country_6',
		countryName: 'Philippines',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FPhilippines.jpg?alt=media&token=195d88ab-236e-4e37-b301-d44011dc9da4'
	},
	{
		countryID: 'country_7',
		countryName: 'Singapore',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FSingapore.jpg?alt=media&token=53423a33-fcf1-4e83-979e-85cefc1f22e2'
	},
	{
		countryID: 'country_8',
		countryName: 'Thailand',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FThailand.jpeg?alt=media&token=0e5c0250-611f-4c42-88b3-277bfb1ae42b'
	},
	{
		countryID: 'country_9',
		countryName: 'Vietnam',
		thumbnails:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Countries%2FVietnam.jpg?alt=media&token=534fbb86-c4ef-4b0a-b34d-257dff55d6d7'
	}
];

const itineraries = [
	{
		traveller: {
			username: 'Zoey',
			userProfilePicture: 'https://randomuser.me/api/portraits/women/47.jpg'
		},
		itineraryID: '8ab479cc-b25c-4557-98db-246bd9d89d49',
		itineraryName: 'Sekinchan 2 days 1 night',
		country: 'MY',
		startDate: '9-Sept-2016',
		endDate: '10-Sept-2016',
		coverPhoto:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fcoverphoto.jpg?alt=media&token=ea13cd46-9965-40f5-98bd-a1f7688b8fca',
		days: [
			{
				date: '9-Sept-2016',
				identifier: 1,
				activities: [
					{
						title: 'Dinner Seafood at Wan Lau Seafood Restaurant',
						location: {
							name: 'Wan Lau Seafood Restaurant',
							lat: 3.61243,
							lng: 101.06078,
							country: 'Malaysia'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday1_activity1_photo1.jpg?alt=media&token=29b3c7f5-d36c-4eb3-a352-1f40355a486a',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday1_activity1_photo2.jpg?alt=media&token=d79d640d-03dd-4375-9157-7eb64443a0f7',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday1_activity1_photo3.jpg?alt=media&token=2fa4f347-624f-45ff-a860-77d62ccc79a6'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'Wan Lau Seafood Restaurant(旺盛海鲜酒家) is highly recommended if you love seafood as it is fresh at reasonable price.'
					}
				]
			},
			{
				date: '10-Sept-2016',
				identifier: 2,
				activities: [
					{
						title: 'Paddy Processing Factory & Gallery',
						location: {
							name: 'Paddy Processing Factory & Gallery',
							lat: 3.52122,
							lng: 101.12885,
							country: 'Malaysia'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity1_photo1.jpg?alt=media&token=033030a6-1620-401d-be73-6dea5e69c3eb',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity1_photo2.jpg?alt=media&token=56f99227-7fb9-428b-8781-bdab887d97a5'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'At this place, you can learn a lot about paddy and also the history of this town. Besides that, you can also buy rice, local snacks and souvenirs at their grocery market.'
					},
					{
						title: 'Ah Ma House 阿嬤的家',
						location: {
							name: 'Ah Ma House 阿嬤的家',
							lat: 3.55295,
							lng: 101.08059,
							country: 'Malaysia'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity2_photo1.jpg?alt=media&token=23cdbb6a-0f5d-48df-a03c-07b45f226483',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity2_photo2.jpg?alt=media&token=86204bb0-f1f8-4f7d-908f-fc51660ebb75',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity2_photo3.jpg?alt=media&token=40d081d4-dafc-4d6a-b87d-80965d41de82'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'Ah Ma House is a bakery shop which has many vintage and classic stuff which is a good spot for photography. After taking photo, visitors can purchase local snacks such as kuih kapit (love letters / egg waffle).'
					},
					{
						title: 'Relaxing at Pantai Redang Beach',
						location: {
							name: 'Pantai Redang Beach',
							lat: 3.50766,
							lng: 101.0935,
							country: 'Malaysia'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity3_photo1.jpg?alt=media&token=d24d433f-93d7-4c53-9573-d58292a5ffbc',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity3_photo2.jpg?alt=media&token=4a43b14d-1915-4ea1-af2f-8865b77bc0a2',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity3_photo3.jpg?alt=media&token=906a102a-d889-4e63-9bd5-f9557251498a'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'This is a must visit place for the big old wishing tree and activities on the beach. You can also visit the Chinese temple here for praying. However the beach is not suitable for swimming. So, no need to bring your swimsuit.'
					},
					{
						title: 'Bukit Malawati, Kuala Selangor',
						location: {
							name: 'Bukit Malawati',
							lat: 3.34269,
							lng: 101.24628,
							country: 'Malaysia'
						},
						budget: '30',
						currency: 'MYR',
						rate: 4,
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity4_photo1.jpg?alt=media&token=aa459e93-ee88-4601-8344-50386cbdc6a8',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity4_photo2.jpg?alt=media&token=e5bb53f1-dd60-49a9-903c-080bc6f14b59',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Sekinchan%2Fday2_activity4_photo3.jpg?alt=media&token=99a2742a-2924-4bff-9ef0-4d3b2a0abd95'
						],
						description:
							'Here, you can walk around the hilltop park or visit the Kuala Selangor Historical Museum. At Bukit Malawati, you can play and shoot photo with the friendly monkeys here. The monkeys here love banana or kangkung.'
					}
				]
			}
		]
	},
	{
		traveller: {
			username: 'Dave',
			userProfilePicture: 'https://randomuser.me/api/portraits/men/47.jpg'
		},
		itineraryID: '9bb479cc-b25c-4557-98db-246bd9d89d50',
		itineraryName: 'Singapore 3Days Trip !',
		country: 'SG',
		startDate: '17-Jun-2018',
		endDate: '19-Jun-2018',
		coverPhoto:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2FcoverPhoto.jpg?alt=media&token=e8cd4d2a-a86e-4c39-9810-afc7ddf2347b',
		days: [
			{
				date: '17-Jun-2018',
				identifier: 1,
				activities: [
					{
						title: 'Kampong Glam',
						location: {
							name: 'Kampong Glam',
							lat: 1.3022391,
							lng: 103.8562698,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday1_activity1_photo1.jpg?alt=media&token=55b5d4eb-4236-4b29-9e52-c0186025e5f3'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'Endless rows of eateries offering Indian-Muslim creations abound here, but for a classic Singapore-style breakfast, hit up Singapore Zam Zam Restaurant for prata (South Indian flatbread) and a side of fish curry.'
					},
					{
						title: 'Civic District',
						location: {
							name: 'Civic District',
							lat: 1.2902696,
							lng: 103.8416103,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday1_activity2_photo1.jpg?alt=media&token=86d99d5e-fb2b-4134-82b5-78b9703b0781'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							"Come midday, you'll want to make your way to the Civic District to have lunch at Raffles Hotel on Beach Road. Pop by The Halia for European plates with Asian touches (try the signature chilli crab spaghettini for a taste of Singapore) and take a post-lunch stroll around the hotel to admire its awe-inspiring colonial-era architecture."
					},
					{
						title: 'Singapore River',
						location: {
							name: 'Singapore River',
							lat: 1.2891166,
							lng: 103.8317116,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday1_activity3_photo1.jpg?alt=media&token=fbaab069-97cd-4028-84e0-dec56eab53b2'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'Just before dinner, hop on a traditional bumboat (operated by Singapore River Cruise) and get to know the historic Singapore River and key areas like Boat Quay, Clarke Quay, and Robertson Quay. After that, hop off and head to Clarke Quay to check out its the colourful array of dining options and nightlife offerings.'
					}
				]
			},
			{
				date: '18-Jun-2018',
				identifier: 2,
				activities: [
					{
						title: 'Joo Chiat/Katong',
						location: {
							name: 'Joo Chiat/Katong',
							lat: 1.3085178,
							lng: 103.9008706,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday2_activity1_photo1.jpg?alt=media&token=9f951466-6a26-451b-80e7-dbfc47c1c03b'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'For breakfast, pop by the Joo Chiat ‘hood in the east for kaya (coconut jam) toast – a breakfast staple in Singapore – at Chin Mee Chin Confectionery.'
					},
					{
						title: 'Chinatown',
						location: {
							name: 'Chinatown',
							lat: 1.2805071,
							lng: 103.8407971,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday2_activity2_photo1.jpg?alt=media&token=54c5997c-1e7a-405e-9c03-9031c50d35bc'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'Make your way to Chinatown and head straight to Maxwell Food Centre for not-to-be-missed local creations like chicken rice from the well-loved Tian Tian stall, as well as an ice cold glass of sugarcane juice from any of the countless drink stalls to quench your thirst.'
					},
					{
						title: 'Tiong Bahru',
						location: {
							name: 'Tiong Bahru',
							lat: 1.2902696,
							lng: 103.8416103,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday2_activity3_photo1.jpg?alt=media&token=91f13c66-18ba-4897-928d-d108cdd734f3'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'This may be one of Singapore’s oldest neighbourhoods, but it’s worth visiting to see how old meets new in this hip area. Get a table at Bincho, a mee pok (flat yellow egg noodles) stall by day and yakitori joint and bar by night and have a meal (and a drink or two) there before checking out outlets like indie bookstore BooksActually and Curated Records for cool vinyl records.'
					}
				]
			},
			{
				date: '19-Jun-2018',
				identifier: 3,
				activities: [
					{
						title: 'Singapore Botanic Gardens',
						location: {
							name: 'Singapore Botanic Gardens',
							lat: 1.3111178,
							lng: 103.8132114,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday3_activity1_photo1.jpg?alt=media&token=4269b66d-a9fb-43f0-ba02-b5fce336dbf6'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'Enjoy lush gardens, peace and tranquility at this 150-year-old green destination – which happens to be a UNESCO World Heritage Site (a first for the nation) – and don’t miss highlights like the National Orchid Garden which is home to the largest orchid display in the world, this attraction boasts over 60,000 plants and orchids.'
					},
					{
						title: 'Orchard Road',
						location: {
							name: 'Orchard Road',
							lat: 1.301674,
							lng: 103.8358879,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday3_activity2_photo1.jpg?alt=media&token=4225134f-4874-48f9-b316-96edcb844aa9'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'After spending the morning amidst the gardens, switch the pace up a little and head to one of Singapore’s major shopping districts, like Orchard Road. Here you’ll find a mix of high-end international brands, local labels, and everything in between.'
					},
					{
						title: 'Bugis Street Market',
						location: {
							name: 'Bugis Street Market',
							lat: 1.3006935,
							lng: 103.8527005,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday3_activity3_photo1.jpg?alt=media&token=008fddb8-dbb0-45e0-80ec-3a25380ad893'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'Next up is the Bugis and Little India neighbourhoods. There’s no where else quite like Bugis. What was a thriving district with a colourful past is now famed for its trendy Korean-themed stores and is a great place to score some shopping bargains.'
					},
					{
						title: 'Little India',
						location: {
							name: 'Little India',
							lat: 1.3074797,
							lng: 103.8487349,
							country: 'Singapore'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/Singapore%2Fday3_activity4_photo1.jpg?alt=media&token=c7bf61f6-ea77-4bff-afc0-732b26ee3049'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'When night falls, make a beeline for the ethnic enclave Little India that is peppered with spice shops, jewellery stores, flower vendors and lots more.'
					}
				]
			}
		]
	},
	{
		traveller: {
			username: 'Alex',
			userProfilePicture: 'https://randomuser.me/api/portraits/men/57.jpg'
		},
		itineraryName: 'Tanjung Sepat One Day Trip',
		itineraryID: '1cb479cc-b25c-4557-98db-246bd9d89d90',
		country: 'MY',
		startDate: '9-May-2016',
		endDate: '9-May-2016',
		coverPhoto:
			'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2FcoverPhoto.jpg?alt=media&token=7c1a53ed-aed3-414b-b351-efdc2071e6f2',
		days: [
			{
				date: '9-May-2016',
				identifier: 1,
				activities: [
					{
						title: 'Multi-Rich Pitaya Dragon Fruit Farm',
						location: {
							name: 'Pitaya Dragon Fruit Farm',
							lat: 2.813602,
							lng: 101.733435,
							country: 'Malaysia'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity1_photo1.jpg?alt=media&token=70f4abae-0ca6-488b-bbdc-51daf445873e',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity1_photo2.jpg?alt=media&token=e9b3e3dc-c408-4cf3-85d7-2d685f577298',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity1_photo3.jpg?alt=media&token=30693e83-9fd1-45c8-9f7d-2b35bb04bb90'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'The first place that we visited is a dragon fruit farm which is called Multi-Rich Pitaya Sdn. Bhd.  If you never see a dragon fruit or the plant before, you can come here to experience it but there is not much to see here as it is just dragon fruit plant.'
					},
					{
						title: 'Ah Hock Seafood Bak Kut Teh',
						location: {
							name: 'Ah Hock Seafood Bak Kut Teh',
							lat: 2.6601639,
							lng: 101.5592507,
							country: 'Malaysia'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity2_photo1.jpg?alt=media&token=d336dc3c-7ea0-4677-937a-7d00f7a16603',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity2_photo2.jpg?alt=media&token=35f62b41-30cc-41d6-b8c1-6159f264e506'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description: 'This restaurant only opens for lunch and we were almost late for our Bak Kut Teh.'
					},
					{
						title: 'Tanjung Sepat’s Lover’s Bridge',
						location: {
							name: 'Tanjung Sepat’s Lover’s Bridge',
							lat: 2.6587589,
							lng: 101.5582828,
							country: 'Malaysia'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity3_photo1.jpg?alt=media&token=27d260ab-a7c4-4a04-b6bc-d3a64dc122c1',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity3_photo2.jpg?alt=media&token=efd0ea36-baf2-436a-b516-bd0fbd13ad9b',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity3_photo3.jpg?alt=media&token=68c52497-dcfc-4ddd-973d-5335edf90dcc',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity3_photo4.jpg?alt=media&token=b2677263-bdc1-423d-b066-08e6523319db',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity3_photo4.jpg?alt=media&token=b2677263-bdc1-423d-b066-08e6523319db'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'We continue our journey to the Lover’s Bridge which is the main attraction at Tanjung Sepat and one of the reasons why we are here.'
					},
					{
						title: 'Kuan Wellness Ecopark',
						location: {
							name: 'Kuan Wellness Ecopark',
							lat: 2.6934259,
							lng: 101.4948535,
							country: 'Malaysia'
						},
						photos: [
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity4_photo1.jpg?alt=media&token=0ff4bd0c-28a3-44be-91c8-ade9d7e9ee03',
							'https://firebasestorage.googleapis.com/v0/b/lejoury-86cb4.appspot.com/o/TanjungSepat%2Fday1_activity4_photo2.jpg?alt=media&token=5bcc2f37-83fc-4bed-a55c-6cb156be6b17'
						],
						budget: '30',
						currency: 'MYR',
						rate: 4,
						description:
							'Our next stop is the Kuan Wellness Ecopark, which promotes Green Heart, Green Life.  Kuan Wellness is actually a bird’s nests cultivation place with more than 10 years of experience.  Kuan Wellness also processes the bird’s nests for retailing and exporting them.'
					}
				]
			}
		]
	}
];

const travellers = [
	{
		travellerID: 'traveller_1',
		travellerName: 'Tina',
		thumbnails: 'https://randomuser.me/api/portraits/women/59.jpg'
	},
	{
		travellerID: 'traveller_2',
		travellerName: 'Bryan',
		thumbnails: 'https://randomuser.me/api/portraits/men/60.jpg'
	},
	{
		travellerID: 'traveller_3',
		travellerName: 'Xiao Li',
		thumbnails: 'https://randomuser.me/api/portraits/women/60.jpg'
	},
	{
		travellerID: 'traveller_4',
		travellerName: 'Bond',
		thumbnails: 'https://randomuser.me/api/portraits/men/10.jpg'
	},
	{
		travellerID: 'traveller_5',
		travellerName: 'Zac',
		thumbnails: 'https://randomuser.me/api/portraits/men/2.jpg'
	},
	{
		travellerID: 'traveller_6',
		travellerName: 'Janice',
		thumbnails: 'https://randomuser.me/api/portraits/women/10.jpg'
	}
];

const user = {
	userId: '622dcef6-2e6e-4009-b810-6f39b557c79d',
	name: 'Leanne Graham',
	username: 'Bret',
	userProfilePicture: 'https://randomuser.me/api/portraits/women/57.jpg',
	emailAddress: 'Sincere@april.biz',
	bio: 'Travellers, photographers, storytellers, and dreamers.',
	gender: 'male',
	followers: 100,
	following: 50,
	countries: 8,
	itineraries: 8
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			searchWidth: new Animated.Value(width - 18),
			showCancel: false,
			searchViewOpacity: new Animated.Value(0),
			showSearchView: false
		};
	}
	_keyExtractor_Itinerary = (item) => item.itineraryID.toString();

	_keyExtractor_Country = (item) => item.countryID.toString();

	_keyExtractor_Traveller = (item) => item.travellerID.toString();

	componentDidMount() {
		this.props.getItineraryDraft();
	}

	componentDidUpdate() {}

	componentWillUnmount() {}

	updateSearch = (search) => {
		this.setState({
			search
		});
	};

	onSearchFocus = () => {
		const { searchWidth, searchViewOpacity } = this.state;

		Animated.timing(searchWidth, {
			toValue: width - 70,
			duration: 300
		}).start(({ finished }) => {
			if (finished) {
				this.setState({
					showCancel: true,
					showSearchView: true
				});

				Animated.timing(searchViewOpacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true
				}).start();
			}
		});
	};

	onSearchBlur = () => {
		const { searchWidth, searchViewOpacity } = this.state;

		this.searchBar.blur();

		Animated.timing(searchViewOpacity, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true
		}).start(() => {
			this.setState(
				{
					showCancel: false,
					showSearchView: false
				},
				() => {
					Animated.timing(searchWidth, {
						toValue: width - 18,
						duration: 300
					}).start();
				}
			);
		});
	};

	_onPressFeed = (feed) => {
		this.props.navigation.navigate('ItineraryDetails', {
			itinerary: feed
		});
	};

	_onPressPopular = (feed) => {
		// this.props.navigation.navigate('ItineraryDetails', {
		// 	itinerary: feed
		// });
	};

	_onPressTraveller = (user) => {
		console.log(user);
		this.props.navigation.navigate('TravellerProfile', {
			user
		});
	};

	_renderFamousPlaces = ({ item }) => (
		<ItineraryHolder itinerary={item} key={item.itineraryID} onPress={() => this._onPressFeed(item)} type="main" />
	);

	_renderPopular = ({ item }) => (
		<CountryHolder country={item} key={item.countryID} onPress={() => this._onPressPopular(item)} type="main" />
	);

	_renderTraveller = ({ item }) => (
		<TravellerHolder
			traveller={item}
			key={item.travellerID}
			onPress={() => this._onPressTraveller(item)}
			type="main"
		/>
	);

	_renderSearchBar = () => {
		const { search } = this.state;

		return (
			<View style={styles.searchViewContainer}>
				<Animated.View style={{ width: this.state.searchWidth }}>
					<SearchBar
						ref={(ref) => (this.searchBar = ref)}
						placeholder={Languages.PlaceHolderTryMalaysia}
						onChangeText={this.updateSearch}
						value={search}
						lightTheme={true}
						platform={Platform.OS}
						containerStyle={styles.searchBarContainerStyle}
						inputContainerStyle={styles.searchBarInputContainerStyle}
						inputStyle={styles.searchBarInputStyle}
						leftIconContainerStyle={{ paddingLeft: 6 }}
						onFocus={this.onSearchFocus}
					/>
				</Animated.View>
				<Animated.View style={styles.cancelSearchBarContainer}>
					<TouchableOpacity onPress={this.onSearchBlur}>
						{this.state.showCancel && <Text style={styles.cancelSearchBarText}>Cancel</Text>}
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	};

	render() {
		const { searchViewOpacity, showSearchView } = this.state;

		const searchViewStyle = {
			opacity: searchViewOpacity.interpolate({
				inputRange: [ 0, 1 ],
				outputRange: [ 0, 1 ]
			}),
			transform: [
				{
					translateY: searchViewOpacity.interpolate({
						inputRange: [ 0, 1 ],
						outputRange: [ 200, 0 ]
					})
				}
			]
		};

		return (
			<View style={styles.container}>
				{this._renderSearchBar()}
				{showSearchView ? (
					<Animated.View style={[ searchViewStyle, { flex: 1 } ]}>
						<Search navigation={this.props.navigation}/>
					</Animated.View>
				) : (
					<ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 12 }}>
						<Section
							isHorizontalList={true}
							showHorizontalIndicator={false}
							data={itineraries}
							type="carousel"
							keyExtractor={this._keyExtractor_Itinerary}
							renderHolder={this._renderFamousPlaces}
							// sectionBigTitle={Languages.IntroduceFamousPlaces}
						>
							<Text style={[ styles.sectionTitle, { fontSize: 26, color: Color.primary } ]}>
								{Languages.Destination}
							</Text>
							<Text style={[ styles.smallSectionTitle, { marginTop: 8 } ]}>
								{Languages.Hello}, {user.username}
							</Text>
							<Text style={[ styles.smallSectionTitle, { marginTop: 4 } ]}>
								{Languages.WhereWouldYouLikeToExplore}
							</Text>
						</Section>
						<Section
							containerStyle={styles.sectionContainer}
							isHorizontalList={true}
							showHorizontalIndicator={false}
							data={countries}
							keyExtractor={this._keyExtractor_Country}
							renderHolder={this._renderPopular}
						>
							<Text style={styles.smallSectionTitle}>{Languages.TrendingCountries}</Text>
						</Section>
						<Section
							containerStyle={[ styles.sectionContainer, { paddingBottom: 50 } ]}
							isHorizontalList={true}
							showHorizontalIndicator={false}
							data={travellers}
							keyExtractor={this._keyExtractor_Traveller}
							renderHolder={this._renderTraveller}
							flatListStyle={{ paddingLeft: 10 }}
						>
							<View style={[ Styles.Common.RowCenterBetween, { flex: 1 } ]}>
								<View style={{ flex: 2 }}>
									<Text style={styles.sectionTitle}>{Languages.TopTraveller}</Text>
								</View>
								<TouchableOpacity style={styles.seeMoreContainer}>
									<Text style={styles.seeMoreStyle}>{Languages.seeMore}</Text>
								</TouchableOpacity>
							</View>
						</Section>
					</ScrollView>
				)}
			</View>
		);
	}
}

const mapStateToProps = ({ draft }) => ({
	draft
});

export default connect(mapStateToProps, { getItineraryDraft })(Home);
