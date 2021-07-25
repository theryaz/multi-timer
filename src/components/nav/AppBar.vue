<template>
	<v-app-bar dense app
		class="app-bar flex-grow-0 transparent border-bottom"
		:class="{ 'dark': IsDark }"
		elevation="0"
		height="56"
	>
		<v-sheet outlined class="rounded-lg pa-2 px-3">
			<v-icon>
				mdi-timer-outline
			</v-icon>
		</v-sheet>
		<div class="ml-2 text-h6">
			Multi Timer
		</div>
		<v-spacer />
		<SettingsMenu class="mx-2" />
		<UserMenu class="nav-edge" />
	</v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import UserMenu from '@/components/UserMenu.vue';
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
@Component({
	components:{
		UserMenu,
	}
})
export default class AppBar extends Mixins(VuetifyMixin){
	@Prop({ default: false, type: Boolean }) useNavbar!: boolean;
	@Prop({ default: false, type: Boolean }) dense!: boolean;
	@Prop({ type: Boolean, default: true }) collapseSideNav!: boolean;
	@Prop({ type: Boolean, default: false }) showSideNav!: boolean;
	updateShowSideNav(value: boolean): void{
		this.$emit('update:show-side-nav', value);
	}
	get IsHome(): boolean{
		return this.$route.path === '/';
	}
}
</script>
<style lang="scss" scoped>

.nav-edge{
	&.right{
		flex-basis: 170px;
	}
	&.left{
		@media (min-width: 950px) {
			justify-content: flex-start;
			flex-basis: 170px;
		}
	}
}

.v-app-bar ::v-deep .v-toolbar__content{
	display: flex;
	justify-content: space-between;
}

.border-bottom{
	border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
	&.dark{
		border-bottom: thin solid rgba(255, 255, 255, 0.12) !important;
	}
}
</style>