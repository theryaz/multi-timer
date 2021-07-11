import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import palette from "@/scss/variables.scss";

Vue.use(Vuetify);


export default new Vuetify({
	theme:{
		themes:{
			light:{
				primaryText: palette.primaryText,
				whiteText: palette.whiteText,
				
				primary: palette.primary,
				secondary: palette.secondary,
				accent: palette.accent,
				anchor: palette.anchor,

				background: palette.background,

				// suggested labels:
				// secondary, accent, anchor
				// error, info, success, warning
			}
		}
	}
});