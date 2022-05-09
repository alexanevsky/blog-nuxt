<template>
  <div ref="modal" :id="id" class="modal" tabindex="-1">
    <div :class="normalizedDialogClass">
      <div class="modal-content">
        <a class="modal-close" href="#"><i class="fas fa-times fa-fw"></i></a>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { Modal, EVENT_CLOSED } from '~/assets/js/components/modal';

const PROPS = {
  id: {
    type:      String,
    required: true
  },
  size: {
    type:       String,
    validator:  (v) => ['sm', 'lg', 'xl'].includes(v)
  },
  isCentered: {
    type:       Boolean,
    default:    true
  }
}

export default {
  props: PROPS,

  data: () => ({
    modal: null
  }),

  computed: {
    normalizedDialogClass() {
      return [
        'modal-dialog',
        this.isCentered ? 'modal-dialog-centered' : null,
        this.size ? `modal-${this.size}` : null
      ].filter(v => v).join(' ');
    }
  },

  mounted() {
    this.modal = new Modal(this.$refs.modal);
    this.modal.open();

    $(this.$refs.modal).on(EVENT_CLOSED, () => {
      this.$modals.remove(this.id);
    });
  },

  beforeDestroy() {
    $(this.$refs.modal).remove();
    this.modal = null;
    this.$modals.remove(this.id);
  },

  methods: {
    toggle() {
      this.modal.toggle();
    },

    open() {
      this.modal.open();
    },

    close() {
      this.modal.close();
    },

    isOpened() {
      return this.modal.isOpened();
    }
  }
}

export {
  PROPS
}
</script>
