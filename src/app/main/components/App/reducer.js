export default function(
	state = {
		languages: [
			{ identifier: "it", localizedName: "Italiano" },
			{ identifier: "en", localizedName: "English" }
		],
		is_logged: false,
		base_url: 'http://v3.pyxie.it'
	},
	action
) {
	// action .type => nome azione
	// action .payload => dati dell'azione
	let s = null;

	if (!action.type.startsWith("app.")) return state;

	switch (action.type) {
		case "app.languages":
			s = { ...state, languages: action.payload.items };

			return s;
		case "app.login":
			return { ...state, is_logged: true };

		case "app.logout":
			return { ...state, is_logged: false };

		case "app.base_url":
			return { ...state, base_url: action.payload.base_url };

		default:
			return state;
	}
}
