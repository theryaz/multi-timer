<template>
	<v-navigation-drawer
		width="180"
		app fixed
		:mini-variant.sync="mini"
		permanent
		v-model="showSideNav"
	>

		<v-list-item>
			<v-list-item-icon>
				<v-fade-transition v-if="mini">
					<v-icon @click="mini = !mini">
						mdi-menu
					</v-icon>
				</v-fade-transition>
			</v-list-item-icon>
			<v-spacer />
			<v-btn icon @click="mini = !mini">
				<v-icon>
					mdi-chevron-left
				</v-icon>
			</v-btn>
		</v-list-item>

		<v-list-item>
		</v-list-item>

	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
@Component
export default class NavigationDrawer extends Mixins(VuetifyMixin){
	showSideNav: boolean = false;
	mini: boolean = true;
}
</script>