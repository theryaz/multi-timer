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
				{{ tag.label }}
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
				</v-form>
					<v-list-item v-for="tag of Tags" :key="tag.id">
						<v-list-item-icon class="my-auto">
							<v-icon>
								mdi-label
							</v-icon>
						</v-list-item-icon>
						<template v-if="editingTag === tag.id">
							<v-list-item-content>
								<v-form @submit.prevent="acceptLabelEdit(tag.id)">
									<v-text-field v-model="editingTagLabel"/>
								</v-form>
							</v-list-item-content>
							<v-list-item-icon class="my-auto">
								<v-btn @click="endLabelEdit()" icon>
									<v-icon>
										mdi-close
									</v-icon>
								</v-btn>
								<v-btn @click="acceptLabelEdit(tag.id)" icon>
									<v-icon>
										mdi-check
									</v-icon>
								</v-btn>
							</v-list-item-icon>
						</template>
						<template v-else>
							<v-list-item-content @click="startLabelEdit(tag)">
								{{ tag.label }}
							</v-list-item-content>
							<v-list-item-icon class="my-auto">
								<v-btn @click="removeTag(tag.id)" icon>
									<v-icon>
										mdi-trash-can-outline
									</v-icon>
								</v-btn>
							</v-list-item-icon>
						</template>
					</v-list-item>
			</v-card>
		</v-dialog>

	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { VuetifyMixin } from '@/mixins/VuetifyMixin';
import { Route } from 'vue-router';
import { Tag } from '@/store/user.store';
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

	get Tags(): Tag[]{
		return [
			...store.state.userState.userPrefs.tags,
			...store.state.userState.userPrefs.shareTags,
		];
	}

	showEditLabels: boolean = false;
	@Watch('showEditLabels') onShowEditLabelsChange(val: boolean){
		if(val === false) this.endLabelEdit();
	}
	newLabel: string = "";
	editLabels(): void{
		this.showEditLabels = true;
	}
	acceptLabel(): void{
		if(!this.newLabel) return;
		this.createTag(this.newLabel);
		this.newLabel = "";
	}
	createTag(label: string): void{
		store.dispatch('addTag', { label });
	}
	removeTag(id: string): void{
		store.dispatch('removeTag', { id });
	}
	editTag(tag: Tag): void{
		store.dispatch('editTag', { tag });
	}

	editingTag: string | null = null;
	editingTagLabel: string = "";

	startLabelEdit(tag: Tag): void{
		this.editingTag = tag.id;
		this.editingTagLabel = tag.label;
	}
	endLabelEdit(): void{
		this.editingTag = null;
		this.editingTagLabel = "";
	}
	acceptLabelEdit(tagId: string): void{
		const tag = this.Tags.find(t => t.id === tagId);
		if(tag === undefined) return;
		this.editTag({
			id: tag.id,
			label: this.editingTagLabel,
		});
		this.endLabelEdit();
	}

}
</script>
<style lang="scss" scoped>
.v-list-item--active{
	&.theme--dark{
		color: $mt-secondary !important;
	}
}
</style>