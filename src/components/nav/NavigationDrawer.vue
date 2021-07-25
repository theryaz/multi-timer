<template>
	<v-navigation-drawer
		width="180"
		app fixed disable-resize-watcher
		:mini-variant="mini"
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

		<v-list-item exact :to="tag()">
			<v-list-item-icon>
				<v-icon>
					mdi-home-outline
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				All Timers
			</v-list-item-content>
		</v-list-item>

		<v-list-item exact :to="tag('ryan')">
			<v-list-item-icon>
				<v-icon>
					mdi-label-outline
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				Ryan
			</v-list-item-content>
		</v-list-item>

		<v-list-item>
			<v-list-item-icon>
				<v-icon>
					mdi-plus
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
			</v-list-item-content>
		</v-list-item>

	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
import { Route } from 'vue-router';
@Component
export default class NavigationDrawer extends Mixins(VuetifyMixin){
	mini: boolean = true;
	showSideNav: boolean = true;

	updateShowSideNav(): void{
		this.showSideNav = true;
		this.mini = true;
	}

	tag(tag?: string): Partial<Route>{
		if(tag === undefined){
			return { name: 'Home' };
		}
		return {name: 'Home',params:{tag}};
	}

}
</script>