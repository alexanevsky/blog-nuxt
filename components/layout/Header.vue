<template>
  <div class="header">
    <div class="header-main">
      <div class="container flex-between-center py-4">
        <div class="header-sitename">
          <NuxtLink :to="{name: 'index'}">{{ $params.get('sitename') }}</NuxtLink>
        </div>
        <div class="header-buttons btn-toolbar btn-shadow-none">
          <template v-if="isLogged">
            <UIDropdown>
              <UIDropdownToggler class="btn btn-dark btn-hover-primary font-weight-medium">{{ user.username }}</UIDropdownToggler>
              <UIDropdownMenu color="primary">
                <UIDropdownLink :to="{name: 'user', params: {id: user.alias || user.id}}" :label="$t('security.buttons.profile')" />
                <UIDropdownItem tag="a" href="#" @click.native.prevent="logout()" :label="$t('security.buttons.logout')" />
              </UIDropdownMenu>
            </UIDropdown>
          </template>
          <template v-else>
            <!-- <a class="btn btn-dark btn-hover-primary font-weight-medium" href="/signup">$t('security.buttons.signup')</a> -->
            <NuxtLink :to="{name: 'authLogin'}" class="btn btn-dark btn-hover-primary font-weight-medium ml-3">{{ $t('security.buttons.login') }}</NuxtLink>
          </template>
        </div>
      </div>
    </div>
    <div class="header-nav py-3">
      <div class="container">
        <ul class="nav nav-inversed nav-pills nav-lg">
          <NuxtLink :to="{name: 'index'}" class="nav-link" :exact="true"><i class="fas fa-home fa-fw"></i></NuxtLink>

          <template v-for="item in nav">
            <template v-if="!item.children.length">
              <li :key="item.to.name" class="nav-item ml-2">
                <NuxtLink :to="item.to" class="nav-link" :exact="item.exact" active-class="active">{{ item.name }}</NuxtLink>
              </li>
            </template>
            <template v-else>
              <UIDropdown :key="item.to.name" tag="li" class="nav-item nav-dropdown ml-2">
                <NuxtLink :to="item.to" class="nav-link" :exact="item.exact" active-class="active">{{ item.name }}</NuxtLink>
                <UIDropdownToggler class="nav-dropdown-toggle" />
                <UIDropdownMenu color="dark" class="mt-4">
                  <template v-for="child in item.children">
                    <UIDropdownLink :key="child.to.name" :to="child.to" :exact="child.exact" active-class="active" :label="child.name" />
                  </template>
                </UIDropdownMenu>
              </UIDropdown>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const NAV = [
  {
    to:       { name: 'blogPosts' },
    name:     'blog.title',
    children: [
      {
        to:     { name: 'blogPosts' },
        name:   'blogPosts.titles.postsAll',
        roles:  ['ROLE_ADMIN', 'ROLE_BLOG_MANAGER'],
        exact:  true
      },
      {
        to:     { name: 'blogPostsUnpublished' },
        name:   'blogPosts.titles.postsUnpublished',
        roles:  ['ROLE_ADMIN', 'ROLE_BLOG_MANAGER']
      },
      {
        to:     { name: 'blogPostsRemoved' },
        name:   'blogPosts.titles.postsRemoved',
        roles:  ['ROLE_ADMIN', 'ROLE_BLOG_MANAGER']
      },
      {
        to:     { name: 'blogCategories' },
        name:   'blogCategories.title',
        roles:  ['ROLE_ADMIN', 'ROLE_BLOG_MANAGER'],
        exact:  true
      }
    ]
  },
  {
    to:       { name: 'users' },
    name:     'users.title',
    roles:    ['ROLE_ADMIN', 'ROLE_USERS_MANAGER'],
    children: []
  }
];

export default {
  computed: {
    nav() {
      return this.parseNav(NAV);
    },
    user() {
      return this.$auth.user;
    },
    isLogged() {
      return this.$auth.loggedIn;
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout();
      this.$nuxt.refresh();
    },

    parseNav(nav) {
      return nav.map(item => this.parseNavItem(item)).filter(item => item !== null);
    },

    parseNavItem(item) {
      if (item.roles && item.roles.length) {
        if (!this.isLogged || !this.user.roles.filter(x => item.roles.includes(x)).length) {
          return null;
        }
      }

      return {
        to:           item.to,
        name:         this.$t(item.name),
        exact:        typeof item.exact === 'boolean' ? item.exact : false,
        children:     item.children ? this.parseNav(item.children) : []
      }
    }
  }
}
</script>
