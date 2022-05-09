<template>
  <UIDropdownModal :id="id" :modal="modal" :binds="binds" :label="label">
    <slot></slot>
  </UIDropdownModal>
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
