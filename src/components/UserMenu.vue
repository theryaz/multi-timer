<template>
	<div>
		<v-menu v-if="IsAuthenticated" class="user-menu" offset-y>
			<template v-slot:activator="{ on }">
				<div text v-on="on" v-ripple class="pa-1 rounded cursor-pointer">
					<UserInfo show-avatar :user="User" />
				</div>
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
				<v-list-item @click="logout">
					<v-list-item-content>
						Logout
					</v-list-item-content>
					<v-list-item-icon>
						<v-icon>
							mdi-logout
						</v-icon>
					</v-list-item-icon>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import store from '@/store';
import {FirebaseAuthMixin} from '@/mixins/FirebaseAuthMixin';
import { User } from '@/models/User';
import UserInfo from '@/components/UserInfo.vue';

@Component({
	components:{
		UserInfo,
	}
})
export default class UserMenu extends Mixins(FirebaseAuthMixin){

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

	get AuthInitialized(): boolean{
		return store.state.userState.firebaseAuthInitialized;
	}
	get IsAuthenticated(): boolean{
		return store.state.userState.isAuthenticated;
	}
	get User(): User | null{
		return store.state.userState.user;
	}
}
</script>
<style lang="scss" scoped>
.user-menu{
	font-size: 12px;
}
</style>