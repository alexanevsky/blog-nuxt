<template>
  <textarea :value="normalizedValue" class="form-textarea" :required="required" :rows="rows" @input="handleTextarea($event)"></textarea>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Array, Object]
    },
    required: {
      type:     Boolean,
      default:  false
    },
    rows: {
      type:     [Number, String],
      default:  10
    }
  },

  computed: {
    isValueJson() {
      return ['array', 'object'].includes(typeof this.value);
    },

    normalizedValue() {
      return this.isValueJson
        ? (this.value ? JSON.stringify(this.value) : '')
        : this.value;
    }
  },

  methods: {
    handleTextarea(e) {
      this.$emit('input', e.target.value);
    }
  }
}
</script>
