import { reactive, ref } from "vue";

export default function dataAllPaysPage() {
  interface datePick {
    from?: string;
    to?: string;
  }

  const isShowDatePick = ref<boolean>(false);
  const currentPage = ref<number>(1);
  const day = String(new Date().getDate()).padStart(2, "0");
  const dateInput = ref<string>("");
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const year = new Date().getFullYear();
  const date: datePick = reactive({
    from: `${year}-${month}-${day}`,
    to: `${year}-${month}-${+day + 1}`,
  });
  const selectOption = reactive([
    {
      label: "Цена (возрастание)",
      value: "money",
    },
    {
      label: "Цена (убывание)",
      value: "-money",
    },
    {
      label: "Дата покупки (новые)",
      value: "-created",
    },
    {
      label: "Дата покупки (старые)",
      value: "created",
    },
  ]);
  const sortType = ref<object>({
    label: "Цена (возрастание)",
    value: "money",
  });

  return {
    isShowDatePick,
    currentPage,
    dateInput,
    date,
    selectOption,
    sortType,
  };
}
