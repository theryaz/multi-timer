<template>
	<div>
		<v-menu v-if="IsAuthenticated" class="user-menu" offset-y>
			<template v-slot:activator="{ on }">
				<div text v-on="on" v-ripple class="pa-1 rounded cursor-pointer">
					<UserInfo show-avatar :user="User" />
				</div>
			</template>
			<v-list>
				<v-list-item v-if="IsAnon" @click="upgradeAnonymous">
					<v-list-item-content>
						Sign In
					</v-list-item-content>
					<v-list-item-icon>
						<v-icon>
							mdi-login
						</v-icon>
					</v-list-item-icon>
				</v-list-item>
				<v-list-item v-else @click="logout">
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

	get AuthInitialized(): boolean{
		return store.state.userState.firebaseAuthInitialized;
	}
	get IsAuthenticated(): boolean{
		return store.state.userState.isAuthenticated;
	}
	get IsAnon(): boolean{
		if(!store.state.userState.firebaseUser) return false;
		return store.state.userState.firebaseUser.isAnonymous;
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