<template>
  <ModalButton :id="id" :modal="modal" :binds="binds" :label="label" class="dropdown-item" @click="$emit('click', $event)">
    <slot></slot>
  </ModalButton>
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
    label: {
      type: String
    }
  }
}
</script>
