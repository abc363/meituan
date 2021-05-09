<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/avatar2.jpg" alt=""/>
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="请输入商家名"
    prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="请输入密码"
    prefix-icon=" iconfont icon-suotou" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="text" @click="$router.push({path: '/shopregister'})">注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // 这是登录表单绑定的对象
      loginForm:{
      },
      loginFormRules:{
        username: [
          // 验证用户名是否合法
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
        password:[
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    // 重置按钮点击事件
    resetLoginForm(){
      console.log(this);
      // 拿到表单的实例对象用resetFields方法进行清除
      this.$refs.loginFormRef.resetFields()
    },
    // 登录按钮预验证
    login(){
      // TODO 接口不成功
      this.$refs.loginFormRef.validate(async valid => {
        // 输出true或者false来表示是否验证成功
        if(!valid)return;
        // 解构把data中的信息传给res
        this.post('/shops/login',this.loginForm).then(res => {
          this.$message.success("登陆成功！")
          this.$router.push("/system")
        }).catch(res=>{
              return this.$error(`请求失败！${res.message}`);
        }).finally(e=>{
            this.isVisible = false;
            this.$emit('showProduct');
        })
      })
    }
  }
}
</script>
// 加上scoped表示该样式只在这个单文件组件中生效 lang="less"
<style lang="less" scoped>
.login-container{
  background:url(../../static/img/shopBackground.jpg);
  background-repeat: no-repeat;
  height: 100%;
  background-size:cover;
  padding: 0;
  margin: 0;
}
.login-box{
  height: 300px;
  width:550px;
  background-color: white;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  box-shadow: 0 0 10px #eee;
}
.avatar_box{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #eee;
  padding: 8px;
  box-shadow: 0 0 10px #ddd;
  position:absolute;
  left:50%;
  background: white;
  transform: translate(-50%,-50%);
  img{
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login-form{
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 40px;
  box-sizing: border-box;
  text-align: center;
}
</style>
