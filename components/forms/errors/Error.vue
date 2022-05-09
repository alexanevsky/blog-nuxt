<template>
  <div ref="error" class="form-error" style="display: none;">{{ visibleError }}</div>
</template>

<script>
import $ from 'jquery';

const DURATION = 50;

export default {
  props: {
    error: {
      type: String
    }
  },

  data: () => ({
    visibleError: ''
  }),

  watch: {
    error() {
      if (this.error && !this.visibleError) {
        this.visibleError = this.error;
        $(this.$refs.error).slideDown(DURATION);
      } else if (!this.error && this.visibleError) {
        $(this.$refs.error).slideUp(DURATION, () => {
          this.visibleError = '';
        });
      } else {
        this.visibleError = this.error;
      }
    }
  },

  mounted() {
    if (this.error) {
      this.visibleError = this.error;
      $(this.$refs.el).show();
    }
  }
}
</script>
