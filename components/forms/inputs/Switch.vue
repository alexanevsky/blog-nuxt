<template>
  <div :class="normalizedClass">
    <input type="checkbox" class="form-switch-input" :id="id" :checked="value" @change="handleInput($event)">
    <label class="form-switch-label" :for="id">
      <template v-if="!!$slots.default"><slot></slot></template>
      <template v-else>{{ label }}</template>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type:     Boolean,
      default:  false
    },
    label: {
      type: String
    },
    color: {
      type:       String,
      validator:  c => ['positive', 'negative'].includes(c)
    },
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    normalizedClass() {
      return [
        'form-switch',
        this.color ? `form-${this.color}` : null
      ].filter(c => c).join(' ').trim();
    }
  },

  methods: {
    handleInput(e) {
      this.$emit('input', e.target.checked);
    }
  }
}
</script>
