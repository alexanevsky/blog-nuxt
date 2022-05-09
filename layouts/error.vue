<template>
  <LayoutContainer>
    <LayoutError :message="normalizedMessage" />
  </LayoutContainer>
</template>

<script>
  export default {
    props: {
      error: {
        required: true
      }
    },
    computed: {
      normalizedMessage() {
        return this.error.message && this.error.message !== '{}'
          ? this.error.message
          : 'Something went wrong.'
      }
    },
    head() {
      return {
        title: this.normalizedMessage
      }
    }
  }
</script>
