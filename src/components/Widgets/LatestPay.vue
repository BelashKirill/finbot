<!-- eslint-disable prettier/prettier -->
<template>
  <div class="widget">
    <div class="widget__title">{{ props.title }}</div>
    <div class="widget__items">
      <div class="widget__item" v-for="(item, i) in dataLastPays" :key="i">
        <div class="widget__left">
          <div class="widget__left-info">
            <div class="widget__name">{{ item.product }}</div>
            <div class="widget__cat-name">{{ item.category }}</div>
          </div>
        </div>
        <div class="widget__right">
          <div class="widget__price">{{ item.money }} &#8381;</div>
        </div>
      </div>
    </div>
    <div class="preload-widget" v-if="isPreload">
      <q-spinner-hourglass color="secondary" size="2em" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const $q = useQuasar();

    const isPreload = computed<boolean>(() => {
      return store.state.loadLatestPay;
    });

    const dataLastPays = computed<boolean>(() => {
      return store.state.listLatestPay;
    });

    const showAlert = (
      namePlugin: string,
      textMore: string,
      codeErr: number
    ) => {
      $q.notify({
        type: "negative",
        caption: `Ошибка загрузки плагина ${namePlugin}. ${textMore} Код ошибки: ${codeErr}`,
        message: "Error",
        position: "bottom-right",
      });
    };

    onMounted(() => {
      store.dispatch("getLastPays").catch((err) => {
        showAlert(
          "Последние покупки",
          err.response.statusText,
          err.response.status
        );
      });
    });

    return {
      props,
      isPreload,
      dataLastPays,
      showAlert,
    };
  },
});
</script>

<style lang="scss">
.widget {
  position: relative;
  width: 100%;
  min-height: 434px;
  padding: 24px;
  background: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;

  &__title {
    font-weight: 600;
    font-size: 18px;
  }

  &__items {
    margin-top: 15px;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e5e5e5;

    &:last-child {
      border-bottom: 0;
    }
  }

  &__name {
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
  }

  &__cat-name {
    font-size: 11px;
    color: #6b7280;
  }

  &__price {
    padding-left: 10px;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
