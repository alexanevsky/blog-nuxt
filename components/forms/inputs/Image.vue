<template>
  <div ref="el" class="form-image" :class="avatar ? 'form-image-avatar' : null">

    <!-- Original -->
    <div v-if="!preview && original && !isCleared" class="form-image-original" :style="normalizedRatio ? `background-image: url('${original}');` : null">
      <img v-if="!normalizedRatio" :src="original" :alt="original">
      <div class="form-image-toolbar">
        <a href="#" class="btn btn-negative" :title="$t('common.buttons.image.delete')" @click.prevent="clear()"><i class="fas fa-times fa-fw"></i></a>
      </div>
    </div>

    <!-- Upload -->
    <div v-if="!preview && (!original || isCleared)" class="form-image-choose">
      <a href="#" class="btn btn-primary" :title="$t('common.buttons.image.choose')" @click.prevent="$refs.file.click()"><i class="fas fa-upload fa-fw"></i></a>
      <a v-if="original" href="#" class="btn btn-outline-primary ml-2" :title="$t('common.buttons.image.undo')" @click.prevent="undo()"><i class="fas fa-redo-alt fa-fw"></i></a>
    </div>

    <!-- Preview -->
    <div v-if="preview" class="form-image-preview" :style="normalizedRatio ? `background-image: url('${preview}');` : null">
      <img v-if="!normalizedRatio" :src="preview">
      <div class="form-image-toolbar">
        <a href="#" class="btn btn-negative" :title="$t('common.buttons.image.delete')" @click.prevent="clear()"><i class="fas fa-times fa-fw"></i></a>
      </div>
    </div>

    <input :id="id" ref="file" type="file" style="display: none;" @change="handleInput($event)">
  </div>
</template>

<script>
import $ from 'jquery';
import { v4 as uuid } from 'uuid';

export default {
  props: {
    id: {
      type: String,
      default: () => uuid()
    },
    value: {},
    original: {
      type: String
    },
    avatar: {
      type:     Boolean,
      default:  false
    },
    ratio: {
      type: Array
    }
  },

  data: () => ({
    preview:    null,
    isCleared:  false
  }),

  computed: {
    normalizedRatio() {
      if (this.ratio) {
        return this.ratio;
      } else if (this.avatar) {
        return [1, 1];
      }

      return null;
    }
  },

  watch: {
    normalizedRatio() {
      this.resize();
    }
  },

  mounted() {
    this.resize();
  },

  methods: {
    handleInput(event) {
      console.log(event.target.files);

      if (event.target.files.length) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (r) => {
          this.preview = r.target.result;
          this.$emit('input', r.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        this.preview = null;
        this.$emit('input', this.isCleared === false ? false : null);
      }
    },

    clear() {
      this.isCleared = true;
      this.preview = null;
      document.getElementById(this.id).value = '';
      this.$emit('input', this.original ? false : null);
    },

    undo() {
      this.isCleared = false;
      this.$emit('input', null);
    },

    resize() {
      if (!this.normalizedRatio) {
        $(this.$refs.el).height('auto');
        return;
      }

      const x = this.normalizedRatio[0] || 1;
      const y = this.normalizedRatio[1] || 1;

      $(this.$refs.el).height($(this.$refs.el).width() * y / x);
    }
  }
}
</script>
