<template>
  <!-- Grid layout -->
  <LayoutContainerWrapper v-if="layout === 'grid'">
    <LayoutContainerFull>
      <slot></slot>
      <div v-if="!!$slots.pagination" class="w-100">
        <slot name="pagination"></slot>
      </div>
    </LayoutContainerFull>
  </LayoutContainerWrapper>

  <!-- Full width layout -->
  <LayoutContainerWrapper v-else-if="layout === 'fullwidth'">
    <LayoutContainerFull>
      <slot></slot>
      <div v-if="!!$slots.pagination" class="w-100">
        <slot name="pagination"></slot>
      </div>
    </LayoutContainerFull>
  </LayoutContainerWrapper>

  <!-- Sidebar layout -->
  <LayoutContainerWrapper v-else-if="layout === 'sidebar'">
    <LayoutContainerMain>
      <slot></slot>
      <div v-if="!!$slots.pagination" class="w-100">
        <slot name="pagination"></slot>
      </div>
    </LayoutContainerMain>
    <LayoutContainerSidebar :sticky="true">
      <AppBlogPostsSidebar />
    </LayoutContainerSidebar>
  </LayoutContainerWrapper>

  <!-- Default layout -->
  <LayoutContainerWrapper v-else>
    <LayoutContainerMain>
      <slot></slot>
      <div v-if="!!$slots.pagination" class="w-100">
        <slot name="pagination"></slot>
      </div>
    </LayoutContainerMain>
  </LayoutContainerWrapper>
</template>

<script>
export default {
  data: () => {
    return {
      layout: null
    }
  },

  created() {
    this.layout = this.$params.get('blogPosts.postsLayout');
  }
}
</script>
