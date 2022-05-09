<template>
  <UIDropdownLink :to="to" :label="label" />
</template>

<script>
export default {
  props: {
    to: {
      type:     [Object, String],
      required: true
    },
    label: {
      type:     String,
      required: true
    }
  }
}
</script>
