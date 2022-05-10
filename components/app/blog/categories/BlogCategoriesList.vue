<template>
  <div class="card">
    <div class="card-table">
      <table class="table table-align-middle">
          <thead class="card-table-header">
            <tr>
              <th colspan="2">{{ $t('blogCategories.entities') }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="category in categories">
              <tr :key="category.id" :id="`category-${category.id}`">
                <td class="title-3">
                  <span>{{ category.name }}</span>
                  <!-- <NuxtLink :to="{name: 'blogCategoryPosts', params: {alias: category.alias}}">{{ category.name }}</NuxtLink> -->
                  <span v-if="!category.isActive" class="badge badge-muted ml-2">{{ $t('blogCategories.values.inactive') }}</span>
                </td>
                <td class="text-right">
                  <UIActionsMenu>
                    <UIActionsMenuModal v-if="category.permissions.update" modal="ModalBlogCategoryForm" :binds="{category}" :label="$t('blogCategories.buttons.edit')" />
                    <UIActionsMenuModal v-if="category.permissions.delete" modal="ModalBlogCategoryDelete" :binds="{category}" :label="$t('blogCategories.buttons.delete')" />
                  </UIActionsMenu>
                </td>
              </tr>
            </template>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type:     Array,
      required: true
    }
  }
}
</script>
