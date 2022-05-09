<template>
  <a href="#" @click.prevent="showModal()">
    <slot></slot>
    <i v-if="icon" :class="icon"></i>
    {{ label }}
  </a>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    modal: {
      type:     String,
      required: true
    },
    binds: {
      type: Object
    },
    icon: {
      type: String
    },
    label: {
      type: String
    }
  },
  methods: {
    showModal() {
      this.$modals.add(this.modal, this.binds, this.id);
    }
  }
}
</script>
