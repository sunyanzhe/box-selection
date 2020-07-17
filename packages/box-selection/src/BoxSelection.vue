<template>
  <div ref="container"
    @mousedown.stop="mouseDownHandle"
    @mouseup.stop="mouseUpHandle"
    @keyup.delete="deleteSelect"
    @contextmenu.prevent
    :class="{'disabled': disabled}"
    tabindex="-1"
    class="drag-container"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
    >
    <div v-if="disabled" class="disabled-mask"></div>
    <box v-for="({position, overlap, id, selected}, index) in positionList"
      :key="id"
      :index="index"
      :selected="selected"
      :position="position"
      :overlap="overlap"
      :calcTempStyle="calcTempStyle"
      :calcShapeStyle="calcShapeStyle"
      @startMove="startMove"
      @selectArea="selectIndex"
      @startTransform="startTransform"
    >
      <template v-if="$scopedSlots.tag" slot="tag" slot-scope="{data}">
        <slot name="tag" :data="data">{{data.index}}</slot>
      </template>
    </box>
    
    <div v-if="isNew && canCreate" :style="calcTempStyle(tempPosition)" class="drag-area"></div>
  </div>
</template>

<script>
import Box from './Box';

// 最小创建的矩形长宽
const MIN = 20;
// 坐标对应的postion的index
const LOCATION_MAP = {
  left: 0,
  top: 1,
  right: 2,
  bottom: 3,
};
const RELATIVE_MAP = {
  left: 'X',
  right: 'X',
  top: 'Y',
  bottom: 'Y',
};

export default {
  name: 'BoxSelection',
  components: {
    Box,
  },
  props: {
    value: Array,
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      positionList: [], // 所有坐标{id, selected, position: [x1, y1, x2, y2], overlap}
      tempPosition: [], // 暂时的坐标, 供创建框选区、移动、形变时使用
      isNew: false, // 判断是否为新建框选区
      canCreate: false, // 距离太短不让创建
      isMove: false, // 判断是否为移动
      emitMove: false,
      emitTransform: false,
      isTransform: false, // 判断是否为变形
      canTransform: false, // 判断是否能变形
      location: [],
      currIndex: -1,
      rectWidth: 0,
      rectHeight: 0,
      id: 0,
    };
  },
  methods: {
    // 事件顺序 子组件emit(因为是微任务) -> 事件冒泡到画布(宏任务) -> mouseDownHandle判断给mouseMove添加什么事件
    // 鼠标按下, 判断是什么事件
    mouseDownHandle(e) {
      if (this.disabled) return false;
      if (this.isNew || this.isMove || this.isTransform) return;
      const target = e.currentTarget;
      const { offsetX: x, offsetY: y } = this.getOffset(e);
      this.tempPosition = [x, y];
      if (this.emitTransform) {
        this.isTransform = true;
        this.tempPosition = this.positionList[this.currIndex].position.slice();
        target.addEventListener('mousemove', this.transform, false);
      } else if (this.emitMove) {
        this.isMove = true;
        target.addEventListener('mousemove', this.move, false);
      } else {
        this.isNew = true;
        target.addEventListener('mousemove', this.dragMove, false);
      }
    },
    // 鼠标抬起, 取消对应的事件
    mouseUpHandle(e) {
      if (this.isNew) this.endDrag(e);
      if (this.isMove) this.endMove(e);
      if (this.isTransform) this.endTransform(e);
    },
    /** ======== 创建 ======== */
    // 拖拽
    dragMove(e) {
      const { offsetX, offsetY } = this.getOffset(e);
      const [x1, y1] = this.tempPosition;
      if (!(this.isEffectiveDrag(this.tempPosition, { offsetX, offsetY }))
          && !this.canCreate) return;
      this.canCreate = true;
      this.tempPosition = [x1, y1, offsetX, offsetY];
    },
    // 完成拖拽
    endDrag(e) {
      e.currentTarget.removeEventListener('mousemove', this.dragMove, false);
      this.isNew = false;
      if (!this.canCreate) return;
      this.canCreate = false;
      const position = this.calcPosition(...this.tempPosition);
      const id = this.id++;
      const overlap = this.checkOverlap(
        position,
        undefined,
        this.overlapCallback,
      );
      this.clearSelect();
      this.positionList.push({
        overlap, id, position, selected: true,
      });
      this.emitInput();
    },
    /** ======== 移动 ======== */
    startMove(index) {
      this.currIndex = index;
      this.emitMove = true;
      this.emitStartMove(index, this.positionList[index]);
    },
    // 移动矩形
    move(e) {
      const { offsetX, offsetY } = this.getOffset(e);
      const [startX, startY] = this.tempPosition;
      this.tempPosition = [offsetX, offsetY];
      this.moveArea([offsetX - startX, offsetY - startY], this.currIndex);
      this.emitMoving(this.currIndex, this.positionList[this.currIndex]);
    },
    // 移动结束
    endMove(e) {
      e.currentTarget.removeEventListener('mousemove', this.move, false);
      this.isMove = false;
      this.emitMove = false;
      this.emitEndMove(this.currIndex, this.positionList[this.currIndex]);
      this.emitInput();
      this.currentIndex = -1;
    },
    // 移动矩形
    moveArea([offsetX, offsetY], index) {
      const item = this.positionList[index];
      let { position, overlap } = item;
      const { id, selected } = item;
      const [x1, y1, x2, y2] = position;
      let L = x1 + offsetX;
      let R = x2 + offsetX;
      let T = y1 + offsetY;
      let B = y2 + offsetY;
      if (L < 0) {
        L = 0;
        R = x2 - x1;
      }
      if (R > this.rectWidth) {
        L = x1 + this.rectWidth - x2;
        R = this.rectWidth;
      }
      if (T < 0) {
        T = 0;
        B = y2 - y1;
      }
      if (B > this.rectHeight) {
        T = y1 + this.rectHeight - y2;
        B = this.rectHeight;
      }
      let curPosition = [L, T, R, B];
      item.position = curPosition;
      item.overlap = this.checkOverlap(curPosition, id, this.overlapCallback, this.recheckOverlap);
     
    },
    /** ======== 形变 ======== */
   
    startTransform(index, location) {
      this.emitTransform = true;
      this.currIndex = index;
      this.location = location;
      this.emitStartTrans(index, this.positionList[index]);
    },
    transform(e) {
      const coordinate = this.getOffset(e);
      const { tempPosition, location, currIndex } = this;
      const item = this.positionList[currIndex];
      const { id } = item;
      this.canTransform = true;
      const position = this.setPosition(tempPosition, location, coordinate);
      item.position = position;
      item.overlap = this.checkOverlap(
        this.calcPosition(...position),
        id,
        this.overlapCallback,
        this.recheckOverlap,
      );
      this.emitTrans(currIndex, this.positionList[currIndex]);
    },
    endTransform(e) {
      e.currentTarget.removeEventListener('mousemove', this.transform, false);
      const { currIndex, positionList } = this;
      const item = positionList[currIndex];
      const { position } = item;
      this.emitTransform = false;
      this.isTransform = false;
      this.canTransform = false;
      this.location = [];
      item.position = this.calcPosition(...position);
      this.emitEndTrans(currIndex, this.positionList[currIndex]);
      this.emitInput();
      this.currIndex = -1;
    },
    /** ======== 删除 ======== */
    deleteSelect() {
      const index = this.positionList.findIndex(item => item.selected);
      this.remove(index);
      this.emitInput();
    },
    remove(index) {
      if (index === -1) return false
      const { position, overlap } = this.positionList.splice(index, 1)[0];
      this.positionList = this.positionList.filter(item => !item.selected);
      if (overlap) this.checkOverlap(position, undefined, this.recheckOverlap);
    },
    // 判断是否拖拽有效
    isEffectiveDrag(position, coordinate, location) {
      if (location === undefined) {
        const [x1, y1] = position;
        const { offsetX, offsetY } = coordinate;
        return Math.abs(x1 - offsetX) > MIN || Math.abs(y1 - offsetY) > MIN;
      }
      const data = location.reduce((obj, coor) => {
        const key = LOCATION_MAP[coor];
        const val = coordinate[`offset${RELATIVE_MAP[coor]}`];
        obj[key] = val;
        return obj;
      }, {});
      return Object.entries(data)
        .reduce(
          (result, [key, val]) => result || Math.abs(position[key] - val) > MIN,
          false,
        );
    },
    // 根据拖拽不同的点, 修改不同的值
    setPosition(position, location, coordinate) {
      const data = location.reduce((obj, coor) => {
        const key = LOCATION_MAP[coor];
        const val = coordinate[`offset${RELATIVE_MAP[coor]}`];
        obj[key] = val;
        return obj;
      }, {});
      Object.entries(data).forEach(([key, val]) => {
        position[key] = val;
      });
      return position.slice();
    },
    // 整理坐标, 将左上坐标放到前面
    calcPosition(x1, y1, x2, y2) {
      [x1, x2] = x1 < x2 ? [x1, x2] : [x2, x1];
      [y1, y2] = y1 < y2 ? [y1, y2] : [y2, y1];
      return [x1, y1, x2, y2];
    },
    // 拖拽过程中的计算style
    calcTempStyle([x1, y1, x2, y2]) {
      const keyX = x1 < x2 ? 'left' : 'right';
      const keyY = y1 < y2 ? 'top' : 'bottom';
      const x = x1 < x2 ? x1 : this.rectWidth - x1;
      const y = y1 < y2 ? y1 : this.rectHeight - y1;
      const height = `${Math.abs(y2 - y1)}px`;
      const width = `${Math.abs(x2 - x1)}px`;
      return {
        [keyX]: `${x}px`,
        [keyY]: `${y}px`,
        height,
        width,
      };
    },
    // 拖拽完毕以后的计算style
    calcShapeStyle([x1, y1, x2, y2]) {
      const top = `${y1}px`;
      const left = `${x1}px`;
      const height = `${y2 - y1}px`;
      const width = `${x2 - x1}px`;
      return {
        top, left, height, width, cursor: 'move',
      };
    },
    // 获取鼠标的offset
    // 之所以不用offsetX 是因为在拖动过程中如果鼠标进入了拖拽形成的div
    // offset值会以该div为target， 而不是以容器，值会有问题
    getOffset(e) {
      const { container } = this.$refs;
      const { top, left } = container.getBoundingClientRect();
      const { clientX: x, clientY: y } = e;
      return { offsetX: x - left, offsetY: y - top };
    },
    // 获取容器宽高
    getContainerRect() {
      const { container } = this.$refs;
      this.rectWidth = container.clientWidth;
      this.rectHeight = container.clientHeight;
    },
    // 矩形之间是否重叠
    // 时间复杂度最小为O(n) 最大为O(n2) 根据重叠的数量
    checkOverlap(position, id = undefined, overlapCb, nolapCb) {
      const positionList = id !== undefined
        ? this.positionList.filter((item) => item.id !== id)
        : this.positionList;
      const lap = [];
      const nolap = [];
      let result = false;
      for (let i = 0; i < positionList.length; i++) {
        if (this.overlap(position, positionList[i].position)) {
          result = true;
          // 收集和当前矩形所重叠的矩形
          lap.push(positionList[i]);
        } else {
          // 和当前矩形不重叠的
          nolap.push(positionList[i]);
        }
      }
      if (overlapCb) overlapCb(lap);
      if (nolapCb) nolapCb(nolap);
      return result;
    },
    // 判断两个矩形是否相交
    overlap(p1, p2) {
      const [L1, T1, R1, B1] = p1;
      const [L2, T2, R2, B2] = p2;
      return !(R1 <= L2 || R2 <= L1 || B1 <= T2 || B2 <= T1);
    },
    // 将重叠的数据的overlap全部置为true
    // 将重叠的矩形收集，避免不必要的循环
    overlapCallback(list, set) {
      list.forEach(item => {
        item.overlap = true;
        if (set) set.add(item);
      });
    },
    // 创建、变形不重叠的回调；与删除重叠的回调
    // 将没有和当前矩形重叠的矩形list，判断他们是否还与其他矩形重叠。
    recheckOverlap(list) {
      const filterList = list.filter(item => item.overlap);
      const set = new Set();
      for (let i = 0; i < filterList.length; i++) {
        // 如果已经与其他的重叠了，那么直接跳过
        if (!set.has(filterList[i])) {
          const { id, position } = filterList[i];
          filterList[i].overlap = this.checkOverlap(
            position,
            id,
            (overlapList) => this.overlapCallback(overlapList, set),
          );
        }
      }
    },
    // 校验全部
    checkAllOverlap() {
      const set = new Set();
      const list = this.positionList;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (!set.has(item)) {
          const { position, id } = item;
          item.overlap = this.checkOverlap(
            position,
            id,
            (overlapList) => this.overlapCallback(overlapList, set),
          );
        }
      }
    },
    // 首次渲染
    firstRender() {
      const list = this.value ?? [];
      this.positionList = list.map((position) => ({
        position,
        selected: false,
        overlap: false,
        id: this.id++,
      }));
      this.checkAllOverlap();
    },
    // 选中一个选区
    selectIndex(index) {
      const { positionList } = this;
      const len = positionList.length;
      for (let i = 0; i < len; i++) {
        positionList[i].selected = i === index;
      }
    },
    clearSelect() {
      const { positionList } = this;
      const len = positionList.length;
      for (let i = 0; i < len; i++) {
        positionList[i].selected = false;
      }
    },
    /** ======== 事件 ======== */
    emitInput() {
      const list = this.positionList.map(({ position }) => position);
      this.$emit('input', list);
    },
    emitStartMove(index, { position, overlap }) {
      this.$emit('movestart', { index, position, overlap });
    },
    emitMoving(index, { position, overlap }) {
      this.$emit('move', { index, position, overlap });
    },
    emitEndMove(index, { position, overlap }) {
      this.$emit('moveend', { index, position, overlap });
    },
    emitAdd({ position, overlap }) {
      this.$emit('add', { position, overlap });
    },
    emitDel(index) {
      this.$emit('remove', index);
    },
    emitStartTrans(index, { position, overlap }) {
      this.$emit('transformstart', { index, position, overlap });
    },
    emitTrans(index, { position, overlap }) {
      this.$emit('transform', { index, position, overlap });
    },
    emitEndTrans(index, { position, overlap }) {
      this.$emit('transformend', { index, position, overlap });
    },
    /** ======== 校验 ======== */
    validate() {
      const list = this.positionList;
      const len = list.length;
      for (let i = 0; i < len; i++) {
        if (list[i].overlap) return Promise.reject();
      }
      return Promise.resolve();
    },
  },
  mounted() {
    this.getContainerRect();
    this.firstRender();
  },
};
</script>

<style lang="scss" scoped>
.drag-container {
  overflow: hidden;
  position: relative;
  border: 1px solid #e4e7ed;
  height: 500px;
  width: 500px;
  margin-left: 20px;
  margin-top: 20px;
  user-select: none;
  &.disabled{
    border-color: #e4e7ed;
    color: #c0c4cc;
  }
  .disabled-mask {
    position: absolute;
    z-index: 1000;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, .05);
    cursor: not-allowed;
  }
  &:focus {
    outline: none;
  }
  .drag-area {
    border: 1px solid rgb(0, 120, 215);
    background: rgba(0, 120, 215, .35);
    position: absolute;
    box-sizing: border-box;
    &.is-overlap {
      border-color: #f15151;
      background: rgba(241, 81, 81, .35);
      .drag-anchor {
        background: #f15151;
      }
    }
    .drag-anchor {
      width: 10px;
      height: 10px;
      background: rgb(0, 120, 215);
      position: absolute;
      &.left-top {
        top: 0px;
        left: 0px;
        margin-top: -5px;
        margin-left: -5px;
        cursor: se-resize;
      }
      &.left {
        top: 50%;
        left: 0px;
        margin-top: -5px;
        margin-left: -5px;
        cursor: e-resize;
      }
      &.left-bottom {
        bottom: 0px;
        left: 0px;
        margin-bottom: -5px;
        margin-left: -5px;
        cursor: ne-resize;
      }
      &.top {
        top: 0px;
        left: 50%;
        margin-top: -5px;
        margin-left: -5px;
        cursor: n-resize;
      }
      &.right-top {
        top: 0px;
        right: 0px;
        margin-right: -5px;
        margin-top: -5px;
        cursor: ne-resize;
      }
      &.right {
        top: 50%;
        right: 0px;
        margin-right: -5px;
        margin-top: -5px;
        cursor: e-resize;
      }
      &.right-bottom {
        right: 0px;
        bottom: 0px;
        margin-right: -5px;
        margin-bottom: -5px;
        cursor: se-resize;
      }
      &.bottom {
        bottom: 0px;
        left: 50%;
        margin-left: -5px;
        margin-bottom: -5px;
        cursor: n-resize;
      }
    }
  }
}
</style>
