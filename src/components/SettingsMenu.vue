<template>
	<div>
		<v-menu offset-y>
			<template v-slot:activator="{ on }">
				<v-icon v-on="on" class="mx-1">
					mdi-cog-outline
				</v-icon>
			</template>
			<v-list>
				<v-list-item @click="toggleDarkMode">
					<v-list-item-content>
						Dark Mode
					</v-list-item-content>
					<v-list-item-icon>
						<v-icon>
							mdi-theme-light-dark
						</v-icon>
					</v-list-item-icon>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SettingsMenu extends Vue{

	created(): void{
		this.initTheme();
	}
	initTheme(): void{
		const darkMode = window.localStorage.getItem('darkMode');
		if(darkMode === 'true'){
			this.$vuetify.theme.dark = true;
		}else if(darkMode === 'false'){
			this.$vuetify.theme.dark = false;
		}
	}
	toggleDarkMode(): void{
		this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
		window.localStorage.setItem('darkMode', this.$vuetify.theme.dark === true ? 'true' : 'false');
	}

}
</script>