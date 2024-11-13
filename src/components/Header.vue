<template>
  <div class="content">
    <h3>欢迎来到Kingsman的博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.username }}</div>
      <div class="action">
        <span><el-link href="/blog">主页</el-link></span>
        <el-divider direction="vertical"></el-divider>
        <span><el-link type="success" href="/blog/add">发表博客</el-link></span>

        <el-divider direction="vertical"></el-divider>
        <span v-if="user.username=='请先登录'"><el-link type="primary" href="/login">登录</el-link></span>
        <span v-else><el-link type="danger" @click="logout">退出</el-link></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data(){
    return {
      user:{
        username: '请先登录',
        avatar:'https://img0.baidu.com/it/u=2740469799,403727586&fm=253&fmt=auto&app=138&f=GIF?w=500&h=500'
      }
    }
  },
  methods:{
    logout(){
      const _this = this
      _this.$axios.get("/logout",{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      }).then(res=>{
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }
  },
  created() {
    if(this.$store.getters.getUser.username){
      this.user.username = this.$store.getters.getUser.username
    }
  }
}
</script>


<style scoped>
.content{
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}
.action{

}
</style>