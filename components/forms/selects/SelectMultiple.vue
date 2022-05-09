<template>
  <div ref="select" class="form-select form-select-multiple" :class="size ? `form-select-${size}` : null">
    <div class="form-select-field" tabindex="0">
      <div v-if="normalizedLabel" class="form-select-field-value">{{ normalizedLabel }}</div>
      <div v-else class="form-select-field-placeholder">{{ placeholder }}</div>
      <div class="form-select-field-toggler">
        <i class="form-select-field-icon" :class="icon"></i>
      </div>
    </div>
    <div class="form-select-dropdown">
      <div v-if="togglers" class="form-select-dropdown-togglers btn-group btn-group-sm" tabindex="-1">
        <a
          href="#"
          class="btn btn-outline-primary w-50"
          :class="isSelectedAll ? 'disabled' : null"
          @click.stop="selectAll(); $event.target.blur()"
        >Выбрать все</a>
        <a
          href="#"
          class="btn btn-outline-primary w-50"
          :class="isSelectedNothing ? 'disabled' : null"
          @click.stop="deselectAll(); $event.target.blur()"
        >Сбросить все</a>
      </div>
      <ul class="form-select-dropdown-items">
        <template v-for="(option, i) in options">
          <li
            :key="i"
            class="form-select-dropdown-item"
            :class="value.includes(option.value) ? 'selected' : null"
            @keydown="$event.code === 'Space' ? selectValue(option.value) : null"
            @click="selectValue(option.value)"
          >
            <i class="form-select-dropdown-icon" :class="selectedIcon"></i>
            <span>{{ option.label }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import FormSelect from '~/assets/js/components/formSelect';

import { SIZE_VALUES } from './Select.vue';

export default {
  props: {
    value: {
      type:     Array,
      default:  () => []
    },
    options: {
      type:     Array,
      default:  () => []
    },
    labelMax: {
      type:     Number,
      default:  2
    },
    placeholder: {
      type:     String,
      default: 'Ничего не выбрано'
    },
    icon: {
      type:     String,
      default:  'fas fa-angle-down'
    },
    selectedIcon: {
      type:     String,
      default:  'fas fa-check'
    },
    size: {
      type:       String,
      validator:  (v) => !v || SIZE_VALUES.includes(v)
    },
    required: {
      type:     Boolean,
      default:  false
    },
    togglers: {
      type:     Boolean,
      default:  false
    }
  },

  data: () => ({
    select: null
  }),

  computed: {
    normalizedLabel() {
      if (!this.value.length) {
        return null;
      } else if (this.value.length <= this.labelMax) {
        return this.options.filter(o => this.value.includes(o.value)).map(o => o.label).join(', ');
      } else if (this.value.length === this.options.length) {
        return 'Выбано всё';
      }

      return `Выбрано ${this.value.length} из ${this.options.length}`;
    },

    isSelectedAll() {
      return this.value.length === this.options.length;
    },

    isSelectedNothing() {
      return !this.value.length;
    }
  },

  mounted() {
    this.select = new FormSelect(this.$refs.select);
  },

  methods: {
    selectValue(value) {
      this.$emit('input', this.value.includes(value)
        ? this.value.filter(v => v !== value)
        : [...this.value, value]);
    },

    selectAll() {
      this.$emit('input', this.options.map(v => v.value));
    },

    deselectAll() {
      this.$emit('input', []);
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
</script>
