import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import palette from "@/scss/variables.scss";

Vue.use(Vuetify);

const THEME = {
	primaryText: palette.primaryText,
	whiteText: palette.whiteText,

	primary: palette.primary,
	secondary: palette.secondary,
	accent: palette.accent,
	anchor: palette.anchor,

	goGreen: palette.goGreen,
	stopRed: palette.stopRed,

	background: palette.background,

	// suggested labels:
	// secondary, accent, anchor
	// error, info, success, warning
};

export default new Vuetify({
	theme:{
		dark: false,
		themes:{
			light:THEME,
			dark:THEME,
		}
	}
});