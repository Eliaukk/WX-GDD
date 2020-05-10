<template lang="wxml">
  <!-- wxml结构搭建 vue：需要根标签 -->
  <view class="search" :class="{'focus':isFocus}">

    <!-- 美化样式：调整wxml结构，less结构 -->
    <!-- 搜索区盒子 -->
    <view class="box">
      <!-- 2.注册事件 -->
      <input type="text" @focus="ipt_focus" :placeholder="placeholder" @input="hInput" v-model.trim="key"/>
      <!-- 按钮有自己默认样式 -->
      <view class="cancel" @tap="ipt_blur">取消</view>

      <!-- 图标1 ：显示 -->
      <view class="icon_1">搜索</view>
      <!-- 图标2 ：隐藏-->
      <view class="icon_2"></view>
    </view>

    <!-- 搜索建议 -->
    <view  class="history">
      <navigator v-for="(item,index) in suggestList" :key="item.goods_id">{{item.goods_name}}</navigator>
    </view>

    <!-- 历史搜索 -->
    <view class="history" v-if="!suggestList.length">历史记录</view>



  </view>

</template>

<script>
export default {
  data(){
    return {
      // 初始化不添加类名
      isFocus:false,
      // 引导信息：默认状态，没有文字信息
      placeholder:"",
      // 输入框数据
      key:'',
      // 搜索建议
      suggestList:[]

    }
  },
  methods:{
    // 3.处于聚焦的时候，添加类名啊！
    ipt_focus(){
      // 3.1 data有个初始化数据，要个视图保持一致
      // 3.2 视图中，绑定类名
      // 3.3 处于聚焦的时候，添加类名啊！
      this.isFocus = true;

      // 
      this.placeholder = "请输入您想要的商品";


      // 解决高度问题：
      // 1. 聚焦的时候，需要获取页面的高度值；API  ：原生wx.api; uni-app：顶级对象 uni
      //    为什么有uni? 编译到好多端，通过框架自动会编译需要的顶级对象；
      //    api?  uni.getSystemInfoSync()
      var info = uni.getSystemInfoSync();
      // console.log(info);

      // 2. 现在是子组件，传递给 index.vue 页面父组件:自定义事件名称，及发送的数据；
      this.$emit("send",info.windowHeight+"px");

    },
    // 失去聚焦的类名:回到默认状态
    ipt_blur(){
      this.isFocus = false;

      // 
      this.placeholder = "";


      // 
      this.$emit("send","auto");
    },
    // 获取搜索建议
    async getSuggest() {
      const key = this.key
      const res = await this.$request({
        url:'/api/public/v1/goods/qsearch',
        data: {
          query:key
        }
      })
      // 获取数据
      this.suggestList = res
      console.log(res);
    },
    // input事件
    hInput () {
      this.getSuggest()
    }
  }
}
</script>

<style lang="less">
  // 搜索区：默认样式
	.search {
    
    // 搜索盒子
    .box {
      background-color: #ff2d4a;
      box-sizing: border-box;
      padding: 20rpx 16rpx;
      position: relative;
      input {
        background-color: #fff;
        height: 60rpx;
        border-radius: 6rpx;
      }
      .cancel {
        display: none;
      }
      // 图标1 显示
      .icon_1 {
        display: block;
        background: url(http://static.botue.com/ugo/images/icon_search%402x.png) no-repeat;
        background-size: 32rpx;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 24rpx;
        // content区 是包括 padding区域,背景图要出现在content区域；
        padding-left: 50rpx;
        color:#ccc;
      }

      // 图标2 隐藏
      .icon_2 {
        display: none;
      }

    }

    // 历史记录
    .history {
      display: none;
    }
		
  }
  

  // 聚焦状态样式
  .focus {
    // 直接找上级父级：不是屏幕

    // CSS基础：width: 100%;找谁相对于100%？找一个有定位的父级；如果找不到，会一直找到当前屏幕
    // html 适用；测试下；
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    



    // 搜索盒子
    .box {
      background-color: rgb(239, 239, 239);
      display: flex;
      input {
        flex: 1;
        padding-left: 55rpx;
        font-size: 24rpx;
        color: #ccc;
      }
      .cancel {
        display: block;
        width: 150rpx;
        border:1px solid #ccc;
        line-height: 60rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 24rpx;
        border-radius: 10rpx;
        margin-left: 20rpx;
      }
      // 图标1 ：隐藏
      .icon_1 {
        display: none;
      }

      // 图标2 : 显示
      .icon_2 {
        display: block;
        position: absolute;
        top: 50%;
        left: 30rpx;
        transform: translateY(-50%);
        width: 32rpx;
        height: 32rpx;
        background: url(http://static.botue.com/ugo/images/icon_search%402x.png) no-repeat;
        background-size: 32rpx;
      }
    }

    // 历史记录
    .history {
      display: block;
      position: absolute;
      top: 100rpx;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
    }
  }
</style>