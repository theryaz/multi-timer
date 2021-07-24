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
        />
      </v-col>
    </v-row>
    <FabLauncher
      @click:timer="addTimer"
    />
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
    timerService.updateTimers(this.RootTimers);
  }
}
</script>
<style lang="scss" scoped>

</style>