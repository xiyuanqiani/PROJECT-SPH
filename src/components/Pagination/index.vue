<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <!-- 当前页数大于等于4才显示 -->
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{'active':pageNo==1}">1</button>
    <!-- 当前页数大于等于5才显示 -->
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 大于start才显示 -->
    <!-- 官方推荐v-for和v-if不在同一个元素上同时使用 -->
    <template  v-for="(page,index) in startNumAndEndNum.end" >
    <button  v-if="page>=startNumAndEndNum.start" :key="index" @click="$emit('getPageNo',page)" :class="{'active':pageNo==page}">{{page}}</button>
    </template>
    
    <!-- 当前页数小于pageTotal-2才显示 -->
    <button v-if="startNumAndEndNum.end < pageTotal - 1">···</button>
    <!-- 当前页数小于pageTotal-3才显示 -->
    <button v-if="startNumAndEndNum.end < pageTotal" @click="$emit('getPageNo',pageTotal)" :class="{'active':pageNo==pageTotal}">{{pageTotal}}</button>
    <button :disabled="pageNo==pageTotal" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
    <h2>{{startNumAndEndNum}}---{{pageNo}}</h2>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        // 总页数
        pageTotal(){
            return Math.ceil(this.total/this.pageSize)
        },
        // 连续的起始页数和结束页数
        startNumAndEndNum(){
            const {pageNo,pageTotal,continues} = this
            let start = 0
            let end = 0
            if(continues > this.pageTotal){
                // 不正常现象，总页数小于连续的
                start = 1
                end = pageTotal
            }else{
                start = pageNo - parseInt(continues/2)
                end = pageNo + parseInt(continues/2)
                // 再做判断，如果start出现0或负数
                if(start < 1){
                    start = 1
                    end = continues
                }
                // end大于总页码
                if(end > pageTotal){
                    end = pageTotal
                    start = pageTotal - continues + 1
                }
            }
            return {start,end}
        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>