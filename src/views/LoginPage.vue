<template>
  <div class="login">
    <h5>Для входа в личный кабинет требуется авторизация</h5>
    <div class="login__button">
      <!-- Callback mode -->
      <span v-if="!isLoaded">Loading...</span>
      <telegram-login-temp
        mode="callback"
        telegram-login="SaveReceiptBot"
        @loaded="telegramLoadedCallbackFunc"
        @callback="yourCallbackFunction"
        :userpic="false"
        requestAccess="write"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { telegramLoginTemp } from "vue3-telegram-login";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    telegramLoginTemp,
  },
  setup() {
    const isLoaded = ref<boolean>(false);
    const router = useRouter();
    const store = useStore();

    const telegramLoadedCallbackFunc = () => {
      isLoaded.value = true;
    };

    const yourCallbackFunction = (user) => {
      if (user?.username === undefined || user?.username === null) {
        document.cookie = `name=${user.id}`;
      } else {
        document.cookie = `name=${user.username}`;
      }

      document.cookie = `id=${user.id}`;
      document.cookie = `userpic=${user.photo_url}`;
      document.cookie = `token=${user.hash}`;

      const sendToken = new Promise<void>((resolve) => {
        store.dispatch("sendTokenUser", {
          user: String(user.id),
          token: user.hash,
        });

        resolve();
      });

      sendToken.then(() => {
        setTimeout(() => {
          router.push({ name: "MainPage" });
        }, 500);
      });
    };

    return {
      isLoaded,
      telegramLoadedCallbackFunc,
      yourCallbackFunction,
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h5 {
    text-align: center;
  }

  &__button {
    margin-top: 20px;
  }
}
</style>
