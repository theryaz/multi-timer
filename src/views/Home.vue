<template>
  <v-container class="py-6">
    <v-row>
      <v-col
        v-for="(timer, index) of RootTimers" :key="index"
        cols="12" sm="4" md="3"
      >
        <Timer
          :timer="timer"
          @start="updateTimers"
          @stop="updateTimers"
          @reset="updateTimers"
          @click:delete="confirmDeleteTimer(timer)"
        />
      </v-col>
    </v-row>
    <FabLauncher
      @click:timer="addTimer"
    />

    <v-dialog v-model="showDelete">
      <v-card class="px-4 py-6">
        <v-card-title>
          <v-btn fab elevation="0" color="primary" class="mr-4">
            <v-icon size="28">
              mdi-trash-can-outline
            </v-icon>
          </v-btn>
          {{DeleteTimerTitle}}
        </v-card-title>
        <v-card-text>
          This action can't be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn class="ml-2" color="primary" large outlined @click="showDelete = false">
            Cancel
          </v-btn>
          <v-btn class="ml-2 white--text" color="stopRed" large @click="deleteTimer">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { CurrentUserMixin } from '@/mixins/CurrentUserMixin';
import store from '@/store';
import FabLauncher from '@/components/FabLauncher.vue';
import { TimerModel } from '@/models/TimerModel';
import { timerService } from '@/services';


@Component({
  components: {
    FabLauncher,
  },
})
export default class Home extends Mixins(CurrentUserMixin) {

  get RootTimers(): TimerModel[]{
    return store.state.userState.rootTimers;
  }

  async addTimer(): Promise<void>{
    console.log("Add Timer");
  }

  updateTimers(): void{
    timerService.updateTimers();
  }

  showDelete: boolean = false;
  timerToDelete: TimerModel | null = null;
  confirmDeleteTimer(timer: TimerModel){
    this.timerToDelete = timer;
    this.showDelete = true;
  }
  deleteTimer(){
    store.dispatch('deleteTimer', this.timerToDelete);
    this.showDelete = false;
  }
  get DeleteTimerTitle(): string{
    if(this.timerToDelete === null){
      return "Delete timer?";
    }
    return `Delete "${this.timerToDelete.label}"?`;
  }
}
</script>
<style lang="scss" scoped>

</style>