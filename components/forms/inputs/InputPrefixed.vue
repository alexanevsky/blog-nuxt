<template>
  <div class="embed-input-group form-input" :class="this.focused ? 'focus' : null">
    <label v-if="prefix" class="embed-input-group-prefix" :for="id">{{ prefix }}</label>
    <input
      type="text"
      :id="id"
      :value="value"
      :required="required"
      @focus="focused = true"
      @blur="focused = false"
      @input="handleInput($event)"
    >
    <label v-if="suffix" class="embed-input-group-suffix" :for="id">{{ suffix }}</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type:     [String, Number],
      required: true
    },
    value: {
      type: [String, Number]
    },
    required: {
      type:     Boolean,
      default:  false
    },
    prefix: {
      type: String
    },
    suffix: {
      type: String
    }
  },

  data: () => ({
    focused: false
  }),

  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    }
  }
}
</script>
