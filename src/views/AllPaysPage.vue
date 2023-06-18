<template>
  <div class="wrapper">
    <TheTopBar />
    <TheLeftBar :active="'all'" />
    <div class="content content-all">
      <div class="content-all__top">
        <div class="filters">
          <h6>Фильтр</h6>
          <div class="row gap-row">
            <div class="col-md-2 col-xs-12">
              <q-select
                v-model="sortType"
                :options="selectOption"
                label="Сортировка"
                filled
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="date-pick" v-click-outside="hideDate">
                <q-input v-model="dateInput" label="Дата" filled readonly>
                  <template v-slot:prepend>
                    <q-icon name="event" @click="isShowDatePick = true" />
                  </template>
                </q-input>
                <q-date
                  class="calendar"
                  v-model="date"
                  v-if="isShowDatePick"
                  @update:model-value="selectDate(date.from, date.to)"
                  mask="YYYY-MM-DD"
                  :locale="presetCalendar"
                  range
                />
              </div>
            </div>
            <div class="col-md-1 col-xs-1">
              <div class="search-button">
                <q-btn
                  color="secondary"
                  label="Найти"
                  @click="searchPays(date.from, date.to)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="result-filter">
          <template v-if="resultCount > 0">
            <div
              class="result-filter__item"
              v-for="(item, i) in itemsResult"
              :key="i"
            >
              <div class="result-filter__left">
                <div class="result-filter__name">{{ item.product }}</div>
                <div class="result-filter__date">Дата: {{ item.created }}</div>
                <div class="result-filter__cat-name">{{ item.category }}</div>
              </div>
              <div class="result-filter__right">
                <div class="result-filter__price">{{ item.money }} &#8381;</div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-result">
              По данному фильтру не найдено покупок... :(
            </div>
          </template>
          <div class="preload-widget" v-if="loadResult">
            <q-spinner-hourglass color="secondary" size="2em" />
          </div>
        </div>
        <div
          class="result-pagination"
          v-if="resultCount > 10 && resultCount !== 0"
        >
          <q-pagination
            v-model="currentPage"
            :max="Math.ceil(resultCount / 10)"
            direction-links
            flat
            color="grey"
            active-color="primary"
            @update:model-value="searchPays(date.from, date.to, currentPage)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import TheTopBar from "@/components/Basic/TheTopBar.vue";
import TheLeftBar from "@/components/Basic/TheLeftBar.vue";
import dataAllPaysPage from "@/mixins/AllPaysPage/data";
import { dataInfo } from "@/constants";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    TheTopBar,
    TheLeftBar,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const { presetCalendar } = dataInfo;

    const {
      isShowDatePick,
      currentPage,
      dateInput,
      date,
      selectOption,
      sortType,
    } = dataAllPaysPage();

    const hideDate = () => {
      isShowDatePick.value = false;
    };
    const selectDate = (from: string, to: string) => {
      dateInput.value = `${from.split("-").reverse().join("-")} - ${to
        .split("-")
        .reverse()
        .join("-")}`;

      isShowDatePick.value = false;
    };
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
    const searchPays = (from: string, to: string, page: number) => {
      store.dispatch("updateLoadFilterResult", true);
      store
        .dispatch("getSearchResult", {
          ordering:
            sortType.value !== null ? sortType.value : { value: "money" },
          page: page,
          pageSize: 10,
          from,
          to,
        })
        .catch((err) => {
          showAlert(
            "Последние покупки",
            err.response.statusText,
            err.response.status
          );
        });
    };

    const itemsResult = computed<object>(() => {
      return store.state.resultSearch.results;
    });
    const resultCount = computed<object>(() => {
      return store.state.resultSearch.count;
    });
    const loadResult = computed<object>(() => {
      return store.state.loadFilterResult;
    });

    onMounted(() => {
      dateInput.value = `${String(date.from)
        .split("-")
        .reverse()
        .join("-")} - ${String(date.to).split("-").reverse().join("-")}`;

      searchPays(date.from ?? "", date.to ?? "", 1);
    });

    return {
      selectOption,
      isShowDatePick,
      hideDate,
      date,
      selectDate,
      dateInput,
      sortType,
      currentPage,
      searchPays,
      itemsResult,
      resultCount,
      loadResult,
      presetCalendar,
    };
  },
});
</script>

<style lang="scss">
.content {
  padding: 80px 10px 10px 260px;
}

.gap-row {
  gap: 15px;
  align-items: center;
}

.date-pick {
  position: relative;
}

.date-picker {
  position: absolute;
  left: 0;
  bottom: 0;
}

.result-filter {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 15px;

  &__name {
    font-size: 16px;
    font-weight: 700;
  }

  &__cat-name {
    font-size: 11px;
    color: #6b7280;
  }

  &__price {
    font-size: 16px;
    font-weight: 700;
  }

  &__date {
    font-size: 13px;
    color: #6b7280;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    background: #f3f4f7;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
}

.content-all {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  &__top {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

.result-pagination {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.search-button {
  display: flex;
  align-items: center;
  height: 100%;
}

.calendar {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
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
