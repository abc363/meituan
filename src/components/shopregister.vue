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
          prefix-icon="iconfont icon-suotou" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input placeholder="请再次输入密码"
          prefix-icon="iconfont icon-suotou" v-model="password2" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="infomation">
          <el-input placeholder="请输入商家信息"
          prefix-icon="el-icon-tickets" v-model="loginForm.infomation"></el-input>
        </el-form-item>
        <el-form-item prop="img" label="头像">
          <el-upload
            class="upload-demo"
            action="http://120.55.95.122:8080/image/uploadFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="text" @click="$router.push({path: '/shopLogin'})">返回登录</el-button>
          <el-button type="primary" @click="register">注册</el-button>
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
      fileList: [],
      // 这是登录表单绑定的对象
      loginForm:{},
      password2:'',
      loginFormRules:{
        username: [
          // 验证用户名是否合法
            { required: true, message: '请输入登录名称', trigger: 'change' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'change' }
          ],
        password:[
            { required: true, message: '请输入登录密码', trigger: 'change' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
        ],
        // password2:[
        //     { required: true, message: '请确认登录密码', trigger: 'change' },
        //     { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'change' }
        // ],
        infomation:[
            { required: true, message: '请输入商家信息', trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(file, fileList) {
        this.$message.warning(`只能上传一个图片！`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 重置按钮点击事件
    resetLoginForm(){
      console.log(this);
      // 拿到表单的实例对象用resetFields方法进行清除
      this.$refs.loginFormRef.resetFields()
    },
    // 登录按钮预验证
    register(){
      // TODO 接口不成功
      this.$refs.loginFormRef.validate(async valid => {
        // 输出true或者false来表示是否验证成功
        if(valid){
          if (this.loginForm.password !== this.password2) {
            this.$message.info('两次输入的密码不一致')
            return
          }
          this.post('/shops/reg',this.loginForm).then(res => {
              this.$message.success("注册成功！")
	            this.$router.push("/shopLogin")
            }).catch(res=>{
                  return this.$error(`请求失败！${res.message}`);
            }).finally(e=>{
                this.isVisible = false;
                this.$emit('showProduct');
            })
        }
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
  height: 550px;
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
