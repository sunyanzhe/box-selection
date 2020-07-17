import BoxSelection from '@/box-selection'

const install = (Vue) => {
  Vue.component(BoxSelection.name, BoxSelection)
}

if (window !== undefined && window.Vue) {
  install(window.vue)
}

export {
  BoxSelection,
  install
}