<template>
  <UIModalEmpty ref="modal" :id="id" :size="size" :is-centered="isCentered">
    <div v-if="!!$slots.title" class="modal-header">
      <div class="modal-title">
        <slot name="title"></slot>
      </div>
    </div>
    <form v-if="isForm" @submit.prevent="handleForm($event)" novalidate>
      <div :class="normalizedBodyClass">
        <slot name="body"></slot>
      </div>
      <div v-if="!!$slots.footer" class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </form>
    <template v-else>
      <div :class="normalizedBodyClass">
        <slot name="body"></slot>
      </div>
      <div v-if="!!$slots.footer" class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </UIModalEmpty>
</template>

<script>
import { PROPS } from './ModalEmpty.vue';

export default {
  props: {
    ...PROPS,
    bodyClass: {
      type: String
    },
    isForm: {
      type:     Boolean,
      default:  false
    }
  },

  computed: {
    normalizedBodyClass() {
      return [
        'modal-body',
        this.bodyClass || null
      ].filter(v => v).join(' ');
    }
  },

  methods: {
    handleForm(event) {
      this.$emit('form-submit', event);
    },

    toggle() {
      this.$refs.modal.toggle();
    },

    open() {
      this.$refs.modal.open();
    },

    close() {
      this.$refs.modal.close();
    },

    isOpened() {
      this.$refs.modal.isOpened();
    }
  }
}
</script>
