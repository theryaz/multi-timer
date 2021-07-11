<template>
	<v-app>
		<AppBar :useNavbar="useNavbar" :showSideNav="ShowSideNav" @update:show-side-nav="updateShowSideNav"/>
		<template v-if="useNavbar">
			<v-navigation-drawer
				width="180"
				app fixed dark
				color="primary"
				:value="ShowSideNav"
				@input="updateShowSideNav"
			>
				
			</v-navigation-drawer>
		</template>
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
			return false;
		},
		IsHome(): boolean{
			return this.$route.path === '/';
		},
		ShowSideNav(): boolean{
			return this.showSideNav && this.IsHome;
		}
	},
	methods: {
		updateShowSideNav(val: boolean): void{
			this.showSideNav = val;
		}
	},
	data(){
		return {
			showSideNav: false,
		}
	}
});
</script>
<style lang="scss" scoped>
.p-relative{
	position: relative;
}
</style>