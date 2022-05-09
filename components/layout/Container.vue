<template>
  <div class="container pt-4 pb-5">
    <template v-if="!!$slots.breadcrumbs || !!$slots.toolbar">
      <div class="flex-md-between-center mb-4">
        <LayoutBreadcrumbs v-if="!!$slots.breadcrumbs">
          <slot name="breadcrumbs"></slot>
        </LayoutBreadcrumbs>
        <div v-if="!!$slots.toolbar" class="btn-toolbar flex-nowrap mt-2 mt-md-0">
          <slot name="toolbar"></slot>
        </div>
      </div>
    </template>
    <template v-if="!!$slots.default">
      <slot></slot>
    </template>
  </div>
</template>
