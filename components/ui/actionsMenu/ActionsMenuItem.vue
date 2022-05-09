<template>
  <UIDropdownItem :label="label" @click="$emit('click', $event)" />
</template>

<script>
export default {
  props: {
    label: {
      type:     String,
      required: true
    }
  }
}
</script>
