<template>
  <div ref="select" class="form-select" :class="size ? `form-select-${size}` : null">
    <div class="form-select-field" tabindex="0">
      <div v-if="normalizedLabel" class="form-select-field-value">{{ normalizedLabel }}</div>
      <div v-else class="form-select-field-placeholder">{{ placeholder }}</div>
      <div class="form-select-field-toggler">
        <i class="fas fa-angle-down form-select-field-icon"></i>
      </div>
    </div>
    <div class="form-select-dropdown">
      <div
        class="form-select-dropdown-reset"
        @click="selectNothing(); close()"
      >{{ deselect }}</div>
      <ul class="form-select-dropdown-items">
        <template v-for="(option, i) in options">
          <li
            :key="i"
            class="form-select-dropdown-item"
            :class="option.value === value ? 'selected' : null"
            @focus="selectValue(option.value)"
            @click="selectValue(option.value); close()"
          >{{ option.label }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import FormSelect from '~/assets/js/components/formSelect';

const SIZE_VALUES = ['sm', 'lg'];

export default {
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type:     Array,
      default:  () => []
    },
    placeholder: {
      type:     String,
      default: 'Не выбрано'
    },
    required: {
      type:     Boolean,
      default:  false
    },
    size: {
      type:       String,
      validator:  (v) => !v || SIZE_VALUES.includes(v)
    },
    deselect: {
      type:     String,
      default:  'Сбросить'
    }
  },

  data: () => ({
    select: null
  }),

  computed: {
    normalizedLabel() {
      const selected = this.options.find(v => v.value === this.value);

      return selected ? selected.label : null;
    }
  },

  mounted() {
    this.select = new FormSelect(this.$refs.select);
  },

  methods: {
    selectValue(value = null) {
      this.$emit('input', value);
    },

    selectNothing() {
      this.selectValue(null);
    },

    toggle() {
      this.select.toggle();
    },

    open() {
      this.select.open();
    },

    close() {
      this.select.close();
    }
  }
}

export {
  SIZE_VALUES
}
</script>
