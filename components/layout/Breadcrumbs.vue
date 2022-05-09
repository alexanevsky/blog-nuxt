<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs-item">
      <NuxtLink :to="{name: 'index'}" class="breadcrumbs-link"><i class="fas fa-home"></i></NuxtLink>
    </li>
    <slot></slot>
  </ul>
</template>
