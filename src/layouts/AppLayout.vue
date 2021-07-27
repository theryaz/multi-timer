<template>
	<v-app>
		<AppBar/>
		<NavigationDrawer />
		<v-main>
			<v-fade-transition hide-on-leave>
				<router-view />
			</v-fade-transition>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/nav/AppBar.vue';
import store from '@/store';
import { User } from '@/models/User';
export default Vue.extend({
	name: 'App',
	components: {
		AppBar,
	},
	computed:{
		CurrentUser(): User | null{
			return store.state.userState.user;
		},
		useNavbar(): boolean{
			return true;
		},
		IsHome(): boolean{
			return this.$route.path === '/';
		}
	}
});
</script>
<style lang="scss" scoped>
.p-relative{
	position: relative;
}
</style>