<template>
  <v-container class="d-flex fill-height">
		<div class="my-auto flex-grow-1">
			<v-row>
				<v-col v-bind="Cols">
					<v-card flat>
						<v-btn @click="loginWithGoogle" color="primary" large block>
							Continue with Google
						</v-btn>
					</v-card>
				</v-col>
			</v-row>

			<v-row>
				<v-col v-bind="Cols" class="d-flex my-6">
					<hr class="my-auto flex-grow-1"/>
					<div class="my-auto mx-4">
						or
					</div>
					<hr class="my-auto flex-grow-1"/>
				</v-col>
			</v-row>

			<v-row>
				<v-col v-bind="Cols">
					<v-form v-model="formValue.valid" @submit.prevent="loginWithAnonymous(formValue)">
						<v-card flat>
							<v-btn type="submit" color="primary" large block :disabled="!formValue.valid" class="mt-6">
								Continue Anonymously
							</v-btn>
						</v-card>
					</v-form>
				</v-col>
			</v-row>
		</div>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { FormRulesMixin } from '@/mixins/FormRulesMixin';
import { FirebaseAuthMixin } from '@/mixins/FirebaseAuthMixin';

@Component({
  components: {},
})
export default class Login extends Mixins(FirebaseAuthMixin, FormRulesMixin) {
  formValue = {
		valid: false,
		displayName: ""
	};

	get Cols(): Record<string,string>{
		return {
			'cols':"10",
			'offset':"1",
			'md':"6",
			'offset-md':"3"
		}
	}
}
</script>