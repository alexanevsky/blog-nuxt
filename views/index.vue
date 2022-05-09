<script>
export default {
  middleware: [
    ({ redirect }) => { redirect({ name: 'blogPosts' }); }
  ]
}
</script>
