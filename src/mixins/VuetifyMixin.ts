import { Component, Vue } from 'vue-property-decorator';
import { Framework } from 'vuetify';

/**
 * Provides helpers to access Vuetify theme and color information.
 */
@Component
export class VuetifyMixin extends Vue {
	// From JS Vuetify Mixin
	get Theme(){
		if (this.$vuetify.theme.dark) return 'dark';
		return 'light';
	}
	getColor(color: string, dark = false){
		if (!this.$vuetify.theme) return color;
		return this.$vuetify.theme.themes[dark ? 'dark' : this.Theme][color] || color;
	}
	$vuetify!: Framework;

	get IsMobile(): boolean {
		return this.$vuetify.breakpoint.mobile;
	}
	get IsDark(): boolean {
		return this.$vuetify.theme.dark;
	}
}
