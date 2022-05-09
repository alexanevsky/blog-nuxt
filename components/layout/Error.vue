<template>
  <div class="alert alert-negative">
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type:     String,
        required: true
      }
    }
  }
</script>
