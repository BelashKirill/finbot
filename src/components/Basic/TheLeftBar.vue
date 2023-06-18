<template>
  <div class="left-bar" :class="{ 'open-menu': store.state.openMenu }">
    <div class="left-bar__close" @click.prevent="closeMenu"></div>
    <ul class="left-bar__menu">
      <li
        class="left-bar__item-menu main"
        :class="{ active: activeMenuItem === 'main' }"
        @click="activeLink('main')"
      >
        <router-link to="/">Главная</router-link>
      </li>
      <li
        class="left-bar__item-menu all"
        :class="{ active: activeMenuItem === 'all' }"
        @click="activeLink('all')"
      >
        <router-link to="/all">Все покупки</router-link>
      </li>
      <li
        class="left-bar__item-menu list-pays"
        :class="{ active: activeMenuItem === 'todo' }"
        @click="activeLink('todo')"
      >
        <router-link to="/todo">Будущие покупки</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    active: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    let activeMenuItem = ref<string>(props.active);

    const activeLink = (name: Ref<string>) => {
      activeMenuItem = name;

      return false;
    };

    const closeMenu = () => {
      store.dispatch("openLeftMenu", store.state.openMenu);
    };

    return {
      activeLink,
      activeMenuItem,
      store,
      closeMenu,
    };
  },
});
</script>

<style lang="scss">
$colorText: #505455;

.left-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: #fff;
  box-shadow: 3px 4px 8px -4px rgba(34, 60, 80, 0.2);
  z-index: 1;
  transition: ease-out 0.4s;

  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 35px;
    height: 35px;
    background: url("@/assets/img/close_black_36dp.svg") no-repeat;
    background-color: #f3f2f2;
    border-radius: 100%;
  }

  &__menu {
    padding: 90px 20px 0;

    li {
      a {
        display: flex;
        align-items: center;
        padding: 5px;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 600;
        color: $colorText;
      }

      &.active {
        background: #fafafa;
        border-radius: 12px;

        a {
          color: #1c64f2;
        }
      }
    }

    .main {
      a {
        &::before {
          font-family: "Material Icons";
          content: "\e88a";
          display: block;
          font-size: 18px;
          margin-right: 10px;
          color: $colorText;
        }
      }
    }

    .all {
      a {
        &::before {
          font-family: "Material Icons";
          content: "\e4fc";
          display: block;
          font-size: 18px;
          margin-right: 10px;
          color: $colorText;
        }
      }
    }

    .list-pays {
      a {
        &::before {
          font-family: "Material Icons";
          content: "\e6b1";
          display: block;
          font-size: 18px;
          margin-right: 10px;
          color: $colorText;
        }
      }
    }

    .active {
      a {
        &::before {
          color: #1c64f2;
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .left-bar {
    left: -250px;
    z-index: 2;
  }

  .open-menu {
    left: 0;
  }
}
</style>
