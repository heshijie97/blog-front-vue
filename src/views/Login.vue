<template>
  <div>
    <el-container>
      <el-header>
        <img class="logo" src="https://img0.baidu.com/it/u=2740469799,403727586&fm=253&fmt=auto&app=138&f=GIF?w=500&h=500">
      </el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Element from "element-ui";

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post('/login',this.ruleForm).then(res=>{
            const jwt = res.headers["authorization"]
            const userInfo = res.data.data
            console.log(userInfo)
            // 把数据共享出去
            _this.$store.commit("SET_TOKEN",jwt)
            _this.$store.commit("SET_USERINFO",userInfo)
            console.log(_this.$store.getters.getUser)
            _this.$router.push("/blog")
            _this.$message.success("登录成功", {duration: 2 * 1000})
          }).catch(error => {
            _this.$message.error(error, {duration: 1 * 1000})
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>


<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  //background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.logo{
  height: 70%;
  margin-top: 10px;
}
.demo-ruleForm{
  max-width: 500px;
  margin: 0 auto;
}

</style>