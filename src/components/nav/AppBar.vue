<template>
	<v-app-bar dense app dark
		color="primary"
		class="app-bar flex-grow-0"
	>
		<v-expand-x-transition>
			<div v-if="useNavbar" class="nav-edge left">
				<v-app-bar-nav-icon v-if="collapseSideNav"
					@click.stop="updateShowSideNav(!showSideNav)">
						<v-icon>mdi-menu</v-icon>
				</v-app-bar-nav-icon>
			</div>
		</v-expand-x-transition>
		<div class="text-center title">
			<template v-if="PageTitle">
				{{ PageTitle }}
			</template>
		</div>
		<UserMenu class="nav-edge" />
	</v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserMenu from '@/components/UserMenu.vue';
@Component({
	components:{
		UserMenu,
	}
})
export default class AppBar extends Vue{
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
	get PageTitle(): string | null{
		if(!this.$route.meta['pageTitle']) return null;
		return this.$route.meta['pageTitle'];
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
</style>