<template lang="wxml">
  <view>
    <search/>

    <view  class="category">

         <!-- 左侧区域 -->
      <view class="sup">

        <scroll-view class="left_category" scroll-y>
          <!-- 一级标题 -->
          <text v-for="(item,i) in headline1" @tap="hTap(i)" :class="{'active':index==i}" :key="item.cat_id">{{item.cat_name}}</text>
        </scroll-view>

      </view>

      <!-- 右侧区域 -->
      <view class="sub">
        <scroll-view class="right_category" scroll-y>
          <!-- 顶部banner -->
          <image src="../../static/uploads/category.png" />

          <view class="children" v-for="item in headline1[index].children" :key="item.cat_id">

            <!-- 二级标题分类 -->
            <view class="title" >
              {{item.cat_name}}
            </view>

            <!-- 三级标题品牌内容 -->
            <view class="brands">
              <navigator url="" v-for="e in item.children" :key="e.cat_id">
                <image :src="e.cat_icon" />
                <text class="name">{{e.cat_name}}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    
  </view>
</template>

<script>
// 1.导入
import search from "@/components/search.vue";
export default {
  // 2.注册
  components:{
    search
  },
  data () {
    return {
      headline1:[],
      index:0
    }
  },
  methods: {
    // 获取标题数据
    async getHeadline() {
      const res = await this.$request({
        url:'/api/public/v1/categories'
      }) 
      this.headline1 = res
      console.log(res);
    },
    // 一级标签点击事件
    hTap (i) {
      this.index = i

    }
  },
  onLoad () {
    // 获取标题数据
    this.getHeadline()
  }
}
</script>

<style lang="less">
scroll-view {
    height: 100%;
  }
.category {
  position: absolute;
  width: 100%;
  top: 100rpx;
  bottom: 0;
  display: flex;
  // 左侧盒子

  .sup {
    width: 196rpx;
    text {
      position: relative;
      display: block;
      width: 100%;
      text-align: center;
      height: 100rpx;
      line-height: 100rpx;
      background-color: #f1f1f1;
      border-bottom: 1rpx solid #efefef;
      box-sizing: border-box;
      &:last-child{
        border-bottom: 0;
      }
    }
    .active {
      color: #eb4653;
      background-color: #fff;
      &::before{
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 60rpx;
        width: 8rpx;
        background-color: #eb4653;
      }
    }
  }
  // 右侧盒子

  .sub {
    flex: 1;
    padding: 20rpx 18rpx; 
    image {
      width: 100%;
      height: 180rpx;
    }
    .children{
      text-align: center;
      .title {
        display: inline-block;
        margin: 40rpx 0 20rpx;
        font-size: 30rpx;
        &::before {
          content:'/';
          margin-right: 20rpx;
          color: #666;
        }
        &::after {
          content:'/';
          margin-left: 20rpx;
          color: #666;
        }
      }
      .brands {
        display: flex;
        flex-wrap: wrap;
        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }
        image {
          width: 120rpx;
          height: 120rpx;
        }
        .name {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
}

</style>