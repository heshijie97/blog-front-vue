<template>
  <div>
    <Header></Header>
    <div class="blog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'BlogEdit',params:{blogId:blog.id}}">
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import 'github-markdown-css'

export default {
  name: "BlogDetail",
  components:{Header},
  data(){
    return{
      blog:{
        id: "",
        title: "",
        content: "",
      },
      ownBlog: false
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    console.log(blogId)
    const _this = this
    if(blogId){
      this.$axios.get("/blog/"+blogId).then(res=>{
        console.log(res)
        const blog = res.data.data
        _this.blog.id = blog.id
        _this.blog.title = blog.title
        const MarkdownIt = require("markdown-it");
        const md = new MarkdownIt();
        _this.blog.content = md.render(blog.content)
        console.log(_this.$store.getters.getUser)
        if (_this.$store.getters.getUser){
          _this.ownBlog = true
        }

      })
    }
  }
}
</script>


<style scoped>
.blog{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
</style>