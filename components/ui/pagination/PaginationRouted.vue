<template>
  <div v-if="hasToPaginate" :class="`flex-${position}-center`">
    <ul class="pagination">
      <li class="pagination-item" :class="normalizedPage == 1 ? 'disabled' : null">
        <NuxtLink :to="generateRoute(normalizedPage - 1)" class="pagination-link"><i class="fas fa-chevron-left fa-fw"></i></NuxtLink>
      </li>

      <template v-for="(item, i) in pagination">
        <li :key="i" class="pagination-item" :class="item.active ? 'active' : null">
          <template v-if="item.type == 'page'">
            <NuxtLink :to="generateRoute(item.page)" class="pagination-link" >{{ item.page }}</NuxtLink>
          </template>
          <template v-else>
            <span class="pagination-ellipsis">&hellip;</span>
          </template>
        </li>
      </template>

      <li class="pagination-item" :class="normalizedPage == normalizedPagesCount ? 'disabled' : null">
        <NuxtLink :to="generateRoute(normalizedPage + 1)" class="pagination-link"><i class="fas fa-chevron-right fa-fw"></i></NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
const SEPARATOR = { type: 'separator' };

export default {
  props: {
    meta: {
      type:     Object,
      default:  () => ({
        offset: null,
        limit:  null,
        count:  null
      }),
      // required: true
    },
    page: {
      type: Number
    },
    pagesCount: {
      type: Number
    },
    /*offset: {
      type: Number
    },
    limit: {
      type: Number
    },
    count: {
      type: Number
    },*/
    position: {
      type: String,
      default:  'center',
      validator: (position) => ['start', 'end', 'center'].includes(position)
    }
  },

  computed: {
    normalizedPage() {
      return this.page || Math.ceil(this.meta.offset / this.meta.limit + 1);
    },

    normalizedPagesCount() {
      return this.pagesCount || Math.ceil(this.meta.count / this.meta.limit);
    },

    hasToPaginate() {
      return this.normalizedPagesCount > 1;
    },

    routeName() {
      return this.$route.name.includes('Paginated') ? this.$route.name.substring(0, this.$route.name.length - 9) : this.$route.name;
    },

    pagination() {
      let pagination = [];

      // Stop if pagination is not available
      if (this.normalizedPagesCount <= 1) {
        return pagination;
      }

      let pagesBlocks = [[], [], []];

      // Define blocks of pages
      if (this.normalizedPagesCount < 6) {
        let firstBlockPage = 1;

        while (firstBlockPage <= this.normalizedPagesCount) {
          pagesBlocks[0].push(firstBlockPage++);
        }
      } else {
        let firstBlockPage = this.normalizedPage < 4 ? 1 : this.normalizedPage - 1;
        let lastBlockPage;

        if (this.normalizedPage === 1) {
          lastBlockPage = 4;
        } else if (2 === this.normalizedPage) {
          lastBlockPage = 4;
        } else if (this.normalizedPagesCount === this.normalizedPage) {
          lastBlockPage = this.normalizedPage;
        } else if ((this.normalizedPagesCount - 3) === this.normalizedPage) {
          lastBlockPage = this.normalizedPage + 3;
        } else if ((this.normalizedPagesCount - 2) === this.normalizedPage) {
          lastBlockPage = this.normalizedPage + 1;
        } else {
          lastBlockPage = this.normalizedPage + 1;
        }

        if (lastBlockPage > this.normalizedPagesCount) {
            lastBlockPage = this.normalizedPagesCount;
        }

        if (this.normalizedPage >= 5) {
          pagesBlocks[0].push(1);
        }

        while (firstBlockPage <= lastBlockPage) {
          pagesBlocks[1].push(firstBlockPage++);
        }

        if ((this.normalizedPagesCount - 2) === this.normalizedPage) {
          pagesBlocks[1].push(this.normalizedPagesCount);
        } else if ((this.normalizedPagesCount - 3) > this.normalizedPage) {
          pagesBlocks[2].push(this.normalizedPagesCount);
        }
      }

      pagesBlocks.filter(v => v.length).forEach((block, i) => {
        if (i !== 0) {
          pagination.push(SEPARATOR);
        }

        block.forEach(p => {
          pagination.push({
            type:   'page',
            page:   p,
            active: p === this.normalizedPage
          });
        });
      });

      return pagination;
    }
  },

  methods: {
    generateRoute(page = 1) {
      return page !== 1 ? {
        name:   this.routeName + 'Paginated',
        params: { ...this.$route.params, ...{ page } },
        query:  this.$route.query
      } : {
        name:   this.routeName,
        params: { ...this.$route.params, ...{ page: null } },
        query:  this.$route.query
      };
    }
  }
}
</script>
