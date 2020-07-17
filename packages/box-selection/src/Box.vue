<template>
  <div
    class="drag-area"
    :class="{'is-overlap': overlap}"
    @mousedown="startMove"
    @mouseup="endMove"
    @click.stop="selectArea"
    :style="[
      isTransform ? calcTempStyle(position) : calcShapeStyle(position),
      {'z-index': isMove || selected ? 999: null}
    ]"
  >
    <slot v-if="$scopedSlots.tag" 
      name="tag" 
      :data="{index, position, overlap, selected}"
    ></slot>
    
    <template v-if="selected">
      <span
        v-for="item in anchorList"
        :key="item"
        class="drag-anchor"
        :class="item"
        @mousedown="startTransform(item)"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    overlap: Boolean,
    selected: Boolean,
    position: Array,
    index: Number || undefined,
    calcTempStyle: Function,
    calcShapeStyle: Function,
  },
  data() {
    return {
      isMove: false,
      isTransform: false,
      anchorList: ['left-top', 'left', 'left-bottom', 'bottom', 'right-bottom', 'right', 'right-top', 'top'],
    };
  },
  methods: {
    /** ======== 位移 ======== */
    startMove() {
      if (this.isTransform) return;
      this.isMove = true;
      this.$emit('startMove', this.index);
    },
    endMove() {
      if (this.isTransform) this.isTransform = false;
      this.isMove = false;
    },
    /** ======== 形变 ======== */
    selectArea() {
      this.$emit('selectArea', this.index);
    },
    startTransform(loc) {
      this.isTransform = true;
      this.$emit('startTransform', this.index, loc.split('-'));
    },
  },
}
</script>
