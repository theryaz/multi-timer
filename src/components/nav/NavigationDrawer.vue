<template>
	<v-navigation-drawer
		width="180"
		app fixed disable-resize-watcher
		:mini-variant.sync="mini"
		:permanent="mini"
		:value="showSideNav"
		@input="updateShowSideNav"
	>
		<v-list-item>
			<v-list-item-icon>
				<v-icon @click="mini = !mini">
					mdi-menu
				</v-icon>
			</v-list-item-icon>
			<v-spacer />
			<v-btn icon @click="mini = !mini">
				<v-icon>
					mdi-chevron-left
				</v-icon>
			</v-btn>
		</v-list-item>

		<v-list-item @click.stop="tag('home')">
			<v-list-item-icon>
				<v-icon>
					mdi-home-outline
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				All Timers
			</v-list-item-content>
		</v-list-item>

		<v-list-item>
			<v-list-item-icon>
				<v-icon @click.stop="tag('home')">
					mdi-home-outline
				</v-icon>
			</v-list-item-icon>
		</v-list-item>

		<v-list-item>
			<v-list-item-icon>
				<v-icon>
					mdi-plus
				</v-icon>
			</v-list-item-icon>
		</v-list-item>

	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
@Component
export default class NavigationDrawer extends Mixins(VuetifyMixin){
	mini: boolean = true;
	showSideNav: boolean = true;

	updateShowSideNav(): void{
		this.showSideNav = true;
		this.mini = true;
	}

	tag(): void{
		console.log("Home");
	}
}
</script>