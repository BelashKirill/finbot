<template>
  <div class="wrapper">
    <TheTopBar />
    <TheLeftBar :active="'main'" />
    <div class="content">
      <div class="content__line">
        <LatestPay :title="'Последние покупки'" />
        <TopCategories :title="'Топ категорий'" />
      </div>
      <div class="content__line">
        <TopExpensivePay :title="'Топ дорогих покупок'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheTopBar from "@/components/Basic/TheTopBar.vue";
import TheLeftBar from "@/components/Basic/TheLeftBar.vue";
import LatestPay from "@/components/Widgets/LatestPay.vue";
import TopCategories from "@/components/Widgets/TopCategories.vue";
import TopExpensivePay from "@/components/Widgets/TopExpensivePay.vue";

export default defineComponent({
  components: {
    TheTopBar,
    TheLeftBar,
    LatestPay,
    TopCategories,
    TopExpensivePay,
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
