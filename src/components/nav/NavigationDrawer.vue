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

		<v-list-item exact :to="tagRoute()">
			<v-list-item-icon>
				<v-icon>
					mdi-home-outline
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				All Timers
			</v-list-item-content>
		</v-list-item>

		<v-list-item 
			v-for="tag of Tags" exact :to="tagRoute(tag.id)" :key="tag.id"
		>
			<v-list-item-icon>
				<v-icon>
					mdi-label-outline
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				{{ tag.tag }}
			</v-list-item-content>
		</v-list-item>

		<v-list-item @click="editLabels">
			<v-list-item-icon>
				<v-icon>
					mdi-pencil
				</v-icon>
			</v-list-item-icon>
			<v-list-item-content>
				Edit Labels
			</v-list-item-content>
		</v-list-item>

		<v-dialog max-width="600" v-model="showEditLabels">
			<v-card class="pa-6">
				<v-form @submit.prevent="acceptLabel">
					<v-list-item>
						<v-list-item-icon class="my-auto">
							<v-icon>
								mdi-plus
							</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-text-field outlined hide-details="" placeholder="New Label" v-model="newLabel"/>
						</v-list-item-content>
						<v-list-item-icon class="my-auto">
							<v-btn icon @click="acceptLabel">
								<v-icon>
									mdi-check
								</v-icon>
							</v-btn>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item v-for="tag of Tags" :key="tag.id">
						<v-list-item-icon class="my-auto">
							<v-icon>
								mdi-label
							</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							{{ tag.tag }}
						</v-list-item-content>
						<v-list-item-icon class="my-auto">
							<v-btn @click="removeTag(tag.id)" icon>
								<v-icon>
									mdi-trash-can-outline
								</v-icon>
							</v-btn>
						</v-list-item-icon>
					</v-list-item>
				</v-form>
			</v-card>
		</v-dialog>

	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
import { Route } from 'vue-router';
import { TagRef } from '@/store/user.store';
import store from '@/store';
@Component
export default class NavigationDrawer extends Mixins(VuetifyMixin){
	mini: boolean = true;
	showSideNav: boolean = true;

	updateShowSideNav(): void{
		this.showSideNav = true;
		this.mini = true;
	}

	tagRoute(tagId?: string): Partial<Route>{
		if(tagId === undefined){
			return { name: 'Home' };
		}
		return {
			name: 'Home',
			params:{
				tagId
			}
		};
	}

	get Tags(): TagRef[]{
		return [
			...store.state.userState.userPrefs.tags,
			...store.state.userState.userPrefs.shareTags,
		];
	}

	showEditLabels: boolean = true;
	newLabel: string = "";
	editLabels(): void{
		this.showEditLabels = true;
	}
	acceptLabel(): void{
		if(!this.newLabel) return;
		this.createTag(this.newLabel);
		this.newLabel = "";
	}
	createTag(tag: string): void{
		store.dispatch('addTag', { tag });
	}
	removeTag(id: string): void{
		console.log("Remove Tag", { id })
		store.dispatch('removeTag', { id });
	}

}
</script>