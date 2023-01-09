<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="goShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 
          三级分类由于使用router-link的时候，会出现卡顿现象，因此采用编程式导航
          router-link是一个组件：相当于VueComponent类的实例对象，一瞬间
          new VueComponent很多实例（1000+），很消耗内存，因此导致卡顿。

          利用事件委派+编程式导航实现路由跳转传参
         -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 15)"
                :key="c1.categoryId"
                :class="{ cur: originIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级分类js实现显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: originIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild.slice(0, 9)"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入节流函数
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      originIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，向服务器发送请求
  mounted() {
      // 判断是哪个组件
    if (this.$route.path != "/home") {
        this.show = false;
      }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性时，右侧函数会执行一次
      // 注入一个参数state，即为大仓库中的数据
      categoryList: (state) => state.Home.categoryList,
    }),
  },
  methods: {
    // changeIndex(index){
    //   this.originIndex = index
    //   console.log('zx',index);
    // },
    changeIndex: throttle(function (index) {
      this.originIndex = index;
    }, 50),
    leaveIndex() {
      this.originIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    goSearch(event) {
      // 1.事件委派时怎么确定是a标签
      // 2.如何区分是1,2,3级

      // 1.利用自定义属性，只有a拥有
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;

      if (categoryname) {
        // 如果拥有categoryname属性一定是a标签，区分1,2,3级
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //判断， 如果路由跳转时带有params参数，带着传过去
        if(this.$route.params){
          location.params = this.$route.params
          // 整理参数,动态添加对象
        location.query = query;
        this.$router.push(location);
        }
      }
    },
    goShow() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }

    .sort-enter{
      height:0
    }
    .sort-enter-to{
      height:461px
    }
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>
