<template>
  <div class="mb-o3 text" v-html="$utils.convert.blockContent(post.description)"></div>
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
