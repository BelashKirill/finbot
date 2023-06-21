<template>
  <div class="wrapper">
    <TheTopBar />
    <TheLeftBar :active="'todo'" />
    <div class="content">
      <h6>Планирование покупок</h6>
      <div class="todo-buttons">
        <q-btn
          color="secondary"
          label="Запланировать покупку"
          @click="(addPays = true), dropDataWindow()"
        />
      </div>
      <div class="todo-pays">
        <div class="todo-pays__item" v-for="(item, i) in itemsPays" :key="i">
          <div class="todo-pays__left">
            <div class="todo-pays__title">{{ item.product }}</div>
            <div class="todo-pays__cat">{{ item.category }}</div>
            <div class="todo-pays__date">{{ formatDate(item.created) }}</div>
          </div>
          <div class="todo-pays__rigth">
            <q-icon
              name="edit"
              @click="editPay(item.id)"
              size="22px"
              color="teal-10"
            />
            <q-icon
              name="delete_outline"
              @click="(confirmDelete = true), (delItem = item.id)"
              color="red-10"
              size="22px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="confirmDelete" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="primary" text-color="white" />
        <span class="q-ml-sm">Подтвердите удаление покупки</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Удалить"
          @click="deletePay(delItem)"
          color="primary"
          v-close-popup
        />
        <q-btn flat label="Отмена" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="addPays" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="title-modal text-bold">Заполните данные о покупке</span>
        <div class="col-12">
          <div class="fields-add">
            <q-input square outlined v-model="namePay" label="Что покупаем?" />
            <q-select
              square
              outlined
              v-model.trim="typePay"
              :options="options"
              label="Категория покупки"
            />
            <div class="date-pick" v-click-outside="hideCalendar">
              <q-input
                v-model.trim="dateInput"
                label="Дата"
                square
                outlined
                readonly
              >
                <template v-slot:prepend>
                  <q-icon name="event" @click="isShowDatePick = true" />
                </template>
              </q-input>
              <q-date
                class="calendar calendar-todo"
                v-model.trim="date"
                v-if="isShowDatePick"
                @update:model-value="selectDate(date)"
                mask="YYYY-MM-DD"
                :locale="presetCalendar"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          :label="typeResponse === 'send' ? 'Добавить покупку' : 'Обновить'"
          color="primary"
          :disable="namePay.length < 3"
          @click="addPay"
          v-close-popup
        />
        <q-btn flat label="Отмена" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import TheTopBar from "@/components/Basic/TheTopBar.vue";
import TheLeftBar from "@/components/Basic/TheLeftBar.vue";
import { dataInfo } from "@/constants";
import { formatDate } from "@/heplers";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default defineComponent({
  components: {
    TheTopBar,
    TheLeftBar,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const { presetCalendar } = dataInfo;

    const currentDate = new Date();
    let addPays = ref<boolean>(false);
    let confirmDelete = ref<boolean>(false);
    let isShowDatePick = ref<boolean>(false);
    let date = ref<string>("");
    let dateInput = ref<string>("");
    let typePay = ref<string>("Другие расходы");
    let namePay = ref<string>("");
    let delItem = ref<number>(0);
    let typeResponse = ref<string>("send");

    const itemsPays = computed(() => {
      return store.state.listToDo;
    });

    const options = reactive([
      "Продукты",
      "Проезд",
      "Подарки",
      "Платежи, комисии",
      "Отдых и развлечения",
      "Образование",
      "Машина",
      "Кафе и рестораны",
      "Здоровье и фитнес",
      "Забота о себе",
      "Дети",
      "Покупка одежды, техники",
      "Другие расходы",
    ]);

    const selectDate = (d: string) => {
      dateInput.value = d.split("-").reverse().join("-");
    };
    const hideCalendar = () => {
      isShowDatePick.value = false;
    };

    const dropDataWindow = () => {
      namePay.value = "";
      typePay.value = "Другие расходы";

      date.value = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      dateInput.value = date.value.split("-").reverse().join("-");

      typeResponse.value = "send";
    };

    const editPay = (id: number) => {
      addPays.value = true;

      const item = store.state.listToDo.filter((i) => i.id === id);

      namePay.value = item[0].product;
      typePay.value = item[0].category;
      date.value = item[0].created;
      dateInput.value = item[0].created.split("-").reverse().join("-");
      typeResponse.value = "edit";
      delItem.value = id;
    };

    const deletePay = (id: number) => {
      store
        .dispatch("deleteToDoPay", { id })
        .then(() => {
          $q.notify({
            type: "positive",
            caption: `Покупка удалена`,
            message: "OK",
            position: "bottom-right",
          });

          store.dispatch("getListToDo").catch((err) => {
            $q.notify({
              type: "negative",
              caption: `Ошибка загрузки списка будущих покупок ` + err,
              message: "Error",
              position: "bottom-right",
            });
          });
        })
        .catch((err) => {
          $q.notify({
            type: "negative",
            caption: `Ошибка удаления покупки ` + err,
            message: "Error",
            position: "bottom-right",
          });
        });
    };

    const addPay = () => {
      if (typeResponse.value === "send") {
        store
          .dispatch("addNewToDoPay", {
            plan: namePay.value,
            category: typePay.value,
            date: dateInput.value.split("-").reverse().join("-") + "T00:00:00",
          })
          .then(() => {
            $q.notify({
              type: "positive",
              caption: `Покупка успешно создана`,
              message: "OK",
              position: "bottom-right",
            });

            namePay.value = "";
            typePay.value = "Другие расходы";

            store.dispatch("getListToDo").catch((err) => {
              $q.notify({
                type: "negative",
                caption: `Ошибка загрузки списка будущих покупок ` + err,
                message: "Error",
                position: "bottom-right",
              });
            });
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              caption: `Ошибка добавления покупки ` + err,
              message: "Error",
              position: "bottom-right",
            });

            namePay.value = "";
            typePay.value = "Другие расходы";
          });
      } else {
        store
          .dispatch("updateToDoPay", {
            plan: namePay.value,
            category: typePay.value,
            id: delItem.value,
            date: date.value,
          })
          .then(() => {
            $q.notify({
              type: "positive",
              caption: `Покупка успешно обновлена`,
              message: "OK",
              position: "bottom-right",
            });

            store.dispatch("getListToDo").catch((err) => {
              $q.notify({
                type: "negative",
                caption: `Ошибка загрузки списка будущих покупок ` + err,
                message: "Error",
                position: "bottom-right",
              });
            });
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              caption: `Ошибка загрузки списка будущих покупок ` + err,
              message: "Error",
              position: "bottom-right",
            });
          });
      }
    };

    onMounted(() => {
      date.value = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      dateInput.value = date.value.split("-").reverse().join("-");

      store.dispatch("getListToDo").catch((err) => {
        $q.notify({
          type: "negative",
          caption: `Ошибка загрузки списка будущих покупок ` + err,
          message: "Error",
          position: "bottom-right",
        });
      });
    });

    return {
      addPays,
      presetCalendar,
      isShowDatePick,
      date,
      selectDate,
      hideCalendar,
      dateInput,
      options,
      typePay,
      namePay,
      itemsPays,
      formatDate,
      addPay,
      confirmDelete,
      delItem,
      deletePay,
      editPay,
      dropDataWindow,
      typeResponse,
    };
  },
});
</script>

<style lang="scss">
.todo-buttons {
  padding: 20px 0;
}

.fields-add {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 0;
}

.calendar-todo {
  position: fixed;
  top: auto;
  left: auto;
}

.todo-pays {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 24px;
    background: #f3f4f7;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  &__left {
    display: flex;
    flex-direction: column;
  }

  &__rigth {
    display: flex;
    padding-left: 20px;

    i {
      cursor: pointer;
    }
  }

  &__title {
    font-weight: 700;
    font-size: 18px;
  }

  &__cat {
    padding-top: 15px;
    font-size: 12px;
    color: #9b9999;
  }

  &__text {
    font-size: 14px;
  }

  &__date {
    font-size: 11px;
  }
}
</style>
