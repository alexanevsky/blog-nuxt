<template>
  <div class="mb-o3 text">
    <template v-for="(item, i) in post.description">
      <p :key="i" v-if="item.type == 'paragraph' && item.data && item.data.text">{{ item.data.text }}</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type:     Object,
      required: true
    }
  }
}
</script>
