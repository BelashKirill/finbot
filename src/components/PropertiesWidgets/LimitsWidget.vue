<template>
  <div class="widget">
    <div class="widget__title">Лимиты</div>
    <div class="widget__items">
      <div class="widget__text">Установите лимит (сутки):</div>
      <q-input v-model="dayLimit" label="Сутки" />
    </div>
    <div class="widget__items">
      <div class="widget__text">Установите лимит (месяц):</div>
      <q-input v-model="mouthLimit" label="Месяц" />
    </div>
    <div class="widget__items">
      <div class="widget__text">Установите текст предупреждения (сутки):</div>
      <q-input v-model="textAlertDay" filled type="textarea" />
    </div>
    <div class="widget__items">
      <div class="widget__text">Установите текст предупреждения (месяц):</div>
      <q-input v-model="textAlertMouth" filled type="textarea" />
    </div>
    <div class="widget__save">
      <q-btn color="primary" label="Сохранить" @click="saveWidget()" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
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
    let dayLimit = ref<number>(500);
    let mouthLimit = ref<number>(15000);
    let textAlertDay = ref<string>(
      "Внимание! Вы превысили установленный дневной лимит трат."
    );
    let textAlertMouth = ref<string>(
      "Внимание! Вы превысили установленный месячный лимит трат."
    );

    const isPreload = computed<boolean>(() => {
      return store.state.loadLatestPay;
    });

    const dataLastPays = computed<boolean>(() => {
      return store.state.listLatestPay;
    });

    const saveWidget = () => {
      store
        .dispatch("updateLimitsUserWidget", {
          dayLimit: dayLimit.value,
          mouthLimit: mouthLimit.value,
          textAlertDay: textAlertDay.value,
          textAlertMouth: textAlertMouth.value,
        })
        .then(() => {
          $q.notify({
            type: "positive",
            caption: `Настройки успешно сохранены`,
            message: "OK",
            position: "bottom-right",
          });

          store.dispatch("getLimitsWidget").catch((err) => {
            $q.notify({
              type: "negative",
              caption: `Ошибка загрузки виджета Лимиты ` + err,
              message: "Error",
              position: "bottom-right",
            });
          });
        })
        .catch((err) => {
          $q.notify({
            type: "negative",
            caption: `Ошибка обновления данных. Виджет Лимиты. ` + err,
            message: "Error",
            position: "bottom-right",
          });
        });
    };

    onBeforeMount(() => {
      store
        .dispatch("getLimitsWidget")
        .then(() => {
          dayLimit.value = store.state.limitsUser[0].limit;
          mouthLimit.value = store.state.limitsUser[0].month_limit;
          textAlertDay.value = store.state.limitsUser[0].day_text;
          textAlertMouth.value = store.state.limitsUser[0].month_text;
        })
        .catch((err) => {
          $q.notify({
            type: "negative",
            caption: `Ошибка загрузки виджета Лимиты ` + err,
            message: "Error",
            position: "bottom-right",
          });
        });
    });

    return {
      props,
      isPreload,
      dataLastPays,
      saveWidget,
      dayLimit,
      mouthLimit,
      textAlertDay,
      textAlertMouth,
    };
  },
});
</script>

<style lang="scss">
.widget {
  position: relative;
  width: 100%;
  min-height: 274px;
  padding: 24px;
  background: #fff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;

  &__text {
    font-size: 15px;
  }

  &__save {
    margin-top: 15px;
  }

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
