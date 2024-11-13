<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail',params:{blogId:blog.id}}">
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-pagination class="page"
          background
          layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=page
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "Blog",
  components:{Header},
  data(){
    return{
      blogs:[],
      currentPage: 1,
      total: 0,
      pageSize: 3,
    }
  },
  methods:{
    page(currentPage){
      const _this = this
      _this.$axios.get("/blog?currentPage="+currentPage+"&pageSize="+_this.pageSize).then(res=>{
        console.log(res)
        _this.blogs = res.data.data.records
        _this.currentPage = res.data.data.currentPage
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.pageSize
      })
    }
  },
  created() {
    this.page(1,this.pageSize)
  }
}
</script>


<style scoped>
.page{
  margin: 0 auto;
  text-align: center;
}
</style>