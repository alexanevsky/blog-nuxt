<template>
  <div ref="editor" :id="id"></div>
</template>

<script>
import $ from 'jquery';
import { v4 as uuid } from 'uuid';

export default {
  props: {
    value: {
      type: [String, Object, Array]
    },
    id: {
      type:     String,
      default:  uuid()
    },
    required: {
      type:     Boolean,
      default:  false
    },
    tools: {
      type: Array
    }
  },

  data: () => ({
    editor:     null,
    savedValue: []
  }),

  watch: {
    value() {
      if (JSON.stringify(this.savedValue) !== JSON.stringify(this.value)) {
        this.savedValue = this.normalizeValue(this.value);

        this.init();
      }
    }
  },

  async mounted() {
    await this.init();
  },

  methods: {
    async init() {
      this.editor = null;
      $(this.$refs.editor).html('');
      this.savedValue = this.normalizeValue(this.value);

      let options = {
        id:   this.id,
        data: this.savedValue,
        onChange: this.handleUpdate
      };

      if (this.tools) {
        options.tools = this.tools;
      }

      this.editor = this.$editorjs(options);
      await this.editor.isReady;
    },

    async handleUpdate() {
      const data = await this.editor.save();
      const blocks = data.blocks.map((b) => this.$utils.object.filter(b, (v, k) => k !== 'id'));

      this.savedValue = blocks;
      this.$emit('input', blocks);
    },

    normalizeValue(value) {
      if (!value || !value.length) {
        return [];
      } else if (typeof value === 'string') {
        return JSON.parse(value);
      }

      return value;
    }
  }
}
</script>
