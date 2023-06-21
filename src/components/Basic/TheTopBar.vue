<template>
  <div class="top-bar">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="top-bar__left">
            <div class="top-bar__logo"></div>
            <div class="top-bar__logo-m" @click.prevent="openMenu"></div>
            <div class="top-bar__name-logo">finbot</div>
          </div>
        </div>
        <div class="col-6">
          <div class="top-bar__right">
            <div class="top-bar__name">{{ getCookie("name") }}</div>
            <div class="top-bar__img-user">
              <img :src="getCookie('userpic')" alt="" />
              <q-menu transition-show="flip-right" transition-hide="flip-left">
                <q-list style="min-width: 200px">
                  <q-item clickable @click="goToPage('properties')">
                    <q-item-section>Настройки</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="exit">
                    <q-item-section>Выход</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <div class="top-bar__note">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getCookie, deleteCookie } from "@/heplers";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// document.cookie =
//   "token=b3e204d87b260accc722f63a813edec4a466e3356a2c21e7f4b7171a75608667";
// document.cookie = "name=447530876";
// document.cookie = "id=447530876";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

    const exit = () => {
      deleteCookie("token");
      deleteCookie("id");
      deleteCookie("userpic");
      deleteCookie("stel_ssid");
      deleteCookie("name");

      router.push("login");
    };

    const openMenu = () => {
      store.dispatch("openLeftMenu", store.state.openMenu);
    };

    const goToPage = (name: string) => {
      router.push(name);
    };

    return {
      getCookie,
      exit,
      openMenu,
      goToPage,
    };
  },
});
</script>

<style lang="scss">
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  background: #fff;
  box-shadow: 0px 4px 8px -4px rgba(34, 60, 80, 0.2);

  &__logo {
    width: 35px;
    height: 35px;
    background: url("@/assets/img/logo.svg") no-repeat;
  }

  &__logo-m {
    display: none;
    width: 35px;
    height: 35px;
    background: url("@/assets/img/menu_black_36dp.svg") no-repeat;
  }

  &__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__img-user {
    width: 35px;
    height: 35px;
    background: url("@/assets/img/free-icon-user-profile-3985429.png") no-repeat;
    cursor: pointer;
  }

  &__name-logo {
    font-weight: 700;
    font-size: 18px;
    margin-left: 10px;
    text-transform: uppercase;
  }

  &__name {
    margin-right: 10px;
    font-weight: 600;
  }

  &__note {
    position: relative;
    width: 32px;
    height: 33px;
    background: url("@/assets/img/Notification_Icon.svg");

    span {
      position: absolute;
      top: 4px;
      right: 6px;
      width: 10px;
      height: 10px;
      background: #e02424;
      border: 2px solid #fff;
      border-radius: 100%;
    }
  }
}

@media (max-width: 991px) {
  .top-bar {
    z-index: 1;

    &__logo {
      display: none;
    }

    &__logo-m {
      display: block;
    }
  }
}
</style>
