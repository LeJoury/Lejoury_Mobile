module.exports = {
	root: true,
	extends: '@react-native-community',
	rules: {
		'prettier/prettier': 0,
		'comma-dangle': [
			'off',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'always-multiline'
			}
		]
	}
};
