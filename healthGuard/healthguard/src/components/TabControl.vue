<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{active: index == curIndex}"
      @click="tabClick(index)"
      :key="item"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      curIndex: 0  //记录当前的选中的索引
    };
  },
  methods:{
    tabClick(index){
      this.curIndex = index  //给当前索引赋值
      this.$emit('tabClick', index)
    }
  }
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: #46BCF9;
}

.active span {
  border-bottom: 2px solid #46BCF9;
}
</style>