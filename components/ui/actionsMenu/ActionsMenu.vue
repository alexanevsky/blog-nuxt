<template>
  <UIDropdown v-if="!!$slots.default">
    <UIDropdownToggler class="btn btn-text-muted btn-hover-primary btn-sm" icon="fas fa-pen fa-fw" />
    <UIDropdownMenu :right="true" color="primary">
      <slot></slot>
    </UIDropdownMenu>
  </UIDropdown>
</template>
