<template>
  <li class="breadcrumbs-item">
    <template v-if="!normalizedActive || !to">
      <NuxtLink :to="normalizedTo" class="breadcrumbs-link">{{ normalizedName }}</NuxtLink>
    </template>
    <template v-else>
      <span class="breadcrumbs-value">{{ normalizedName }}</span>
    </template>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type:     String,
      required: true
    },
    to: {
      type: [String, Object]
    },
    active: {
      type:     Boolean,
      default:  false
    }
  },

  computed: {
    normalizedName() {
      return !new RegExp('^([A-z\.]+)$').test(this.name) ? this.name : this.$t(this.name);
    },

    normalizedTo() {
      return typeof this.to === 'string' && !this.to.includes('/')
        ? { name: this.to }
        : this.to;
    },

    normalizedActive() {
      return this.active || typeof this.to === 'string' && this.to === this.$route.name;
    }
  }
}
</script>
