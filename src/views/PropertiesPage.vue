<template>
  <div class="wrapper">
    <TheTopBar />
    <TheLeftBar :active="'main'" />
    <div class="content">
      <div class="content__line">
        <LimitsWidget />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheTopBar from "@/components/Basic/TheTopBar.vue";
import TheLeftBar from "@/components/Basic/TheLeftBar.vue";
import LimitsWidget from "@/components/PropertiesWidgets/LimitsWidget.vue";

export default defineComponent({
  components: {
    TheTopBar,
    TheLeftBar,
    LimitsWidget,
  },
});
</script>

<style lang="scss" scoped>
.content {
  padding: 80px 10px 10px 260px;

  &__line {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 5px 0;
  }
}

@media (max-width: 991px) {
  .content {
    padding-left: 10px;

    &__line {
      flex-direction: column;
    }
  }
}
</style>
