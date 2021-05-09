<template>
  <div>
    <div class="title-wrap">
      <div class="logo-btn">
        波波生鲜
      </div>
      <div class="user-info">
        <el-popover
          placement="top"
          v-model="visible">
          <el-button size="mini" type="text" @click="signOut">退出登录</el-button>
          <div slot="reference">
            <img :src="shop.img" alt="">
            <span>{{shop.username}}</span>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="menu-wrap">
    <el-row>
    <el-col :span="3">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品情况</span>
        </template>
      </el-menu-item>
    </el-menu>
    </el-col>
    </el-row>
    <div class="biaodan">
      <div class="head">
          <el-form ref="iSearch" :model="formData" @search="fetch" :inline="true" class="search-box">      
            <el-input type="text" class="search-input" placeholder="请输入商品名称" v-model="formData.name"></el-input>
            <el-button class="buttons" icon="el-icon-search" @click="search" type="primary"></el-button>  
          </el-form>
        <el-button type="primary" class="btn" @click="addshop()">添加商品</el-button>
      </div>
      <i-table
      :tableData="tableData"
      :pageInfo="pageInfo"
      :selectionShow="true"
      @handleSizeChange="handleSizeChange" 
      @handleCurrentChange="handleCurrentChange">
        <el-table-column 
        v-for="(item, index) in columnList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        align="center"
        :formatter="columnFormatter">
        </el-table-column>
        <el-table-column
        prop="edit"
        label="操作">
        <template slot-scope="scope">
          <el-button class="op" @click="updateshop(scope.row.goodsId)">编辑</el-button>
          <el-button type="danger" class="op" @click="deleteshop()">删除</el-button>
        </template>
      </el-table-column>
      </i-table>
      <div class="table-pagination" v-show="tableData.length && paginationVisible">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.startPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :totalNum="totalNum">
        </el-pagination>
      </div>
    </div>
    </div>
  
    <el-dialog :visible.sync="dialogVisible"
    :title="dialogTitle"
    :showButton="true"
    ref="dialog"
    @dialog-before-close="dialogBeforeClose"
    @dialog-cancel="dialogCancel"
    @dialog-confirm="dialogConfirm">
    <el-form :model="dialogFromData" label-width="100px" :rules="rules" ref="ruleForm">
      <el-row>
     <el-col :span="24"> 
    <el-form-item label="商品名称" prop="name">
    <el-input v-model="dialogFromData.name"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="24"> 
    <el-form-item label="分类" prop="classify">
     <el-select v-model="dialogFromData.classify" placeholder="请选择">
      <el-option
        v-for="item in ClassifyIdOptions"
        :key="item.value"
        :label="item.name"
        :value="item.value">
      </el-option>
    </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="24"> 
    <el-form-item label="库存" prop="num">
    <el-input v-model.number="dialogFromData.num"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="24"> 
    <el-form-item label="在售价" prop="price">
    <el-input type="number" v-model.number="dialogFromData.price"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span='24'>
      <el-form-item label="商品介绍" prop="info">
        <el-input type="textarea" v-model="dialogFromData.info" placeholder="请输入"></el-input>
      </el-form-item>
    </el-col>
   
    <el-col :span="24">
      <el-form-item label="图片" prop="img">
        <el-upload
            class="upload-demo"
            action="http://120.55.95.122:8080/image/uploadFile"
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
      </el-form-item>
    </el-col>
    </el-row>
    </el-form>
     <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
</div>

</template>
<script>
import IDialog from '@/assembly/i-dialog.vue'
import ITable from '@/assembly/i-table.vue'
import IFile from '@/assembly/i-file.vue'
export default {
    components: {
      IDialog,
      ITable,
      IFile
    },
    data() {
      return {
        formData: {
          name:"",
          pageSize:10,
          startPage:0
        },
        dialogFromData: {
          name: '',
          classify: '',
          num: '',
          price: '',
          img: '',
          info: ''
        },
        shop:{},
      fileList: [],
        visible: false,
        dialogVisible: false,
        dialogTitle: '',
        dialogType: '',
        commCode: '',
        getSelectCommCode: [],
        commVersion: '',
        delete: [],
        update: {},
        ClassifyIdOptions: [
          {value:1,name:"鲜活水产"},
          {value:2,name:"冰鲜水产"},
          {value:3,name:"冷冻水产"},
          {value:4,name:"鱼"},
          {value:5,name:"虾/虾仁"},
          {value:6,name:"贝/生蚝"},
          {value:7,name:"蟹"},
          {value:8,name:"三文鱼/鳕鱼"},
          {value:9,name:"半成品/熟食"},
          {value:10,name:"海参/干货"},
        ],
        tableData: [],
        multipleSelection: [],
        pageInfo: {
          pageSize:10,
          startPage:0,
        },
        totalNum: 0,
        columnList: [
          {label: '商品编码', prop: 'pid', width:'150px'},
          {label: '商品名称', prop: 'name', width:'120px'},
          {label: '商品介绍', prop: 'info', width:'170px'},
          {label: '售价', prop: 'price', width:'90px'},
          {label: '分类', prop: 'classify', width: '120px'},
          {label: '商品图片', prop: 'img', width:'100px'},
          {label: '库存', prop: 'num',width:'90px'}
        ],
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          classify: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          info: [
          { required: true, message: '请输入商品介绍', trigger: 'change' }
          ],
          num: [
            { required: true, message: '请输入库存', trigger: 'blur' },
            { type: 'number', message: '商品库存必须为数字' }
          ],
          price: [
            { required: true, message: '请输入在售价', trigger: 'blur' },
            { type: 'number', message: '在售价必须为数字' }
          ],
          img: [
          { required: true, message: '请上传商品图片', trigger: 'change' }
          ]
        }
      }
    },
    mounted(){
      this.showPro()
    },
    methods: {
      fetch () {
        // this.pageInfo.pageSize = 10
        // this.pageInfo.startPage = 0
        // this.search()
      },
      showPro(){
         this.get('/products/show',this.pageInfo).then(res => {
           console.log("8888",res)   
          this.tableData = res.tableData
          this.totalNum = res.totalNum
        }).catch(res=>{
          return this.$error(`请求失败！${res.message}`);
        }).finally(e=>{
            this.isVisible = false;
            this.$emit('showProduct');
        })
      },
      search () {
        this.$refs.iSearch.validate(async valid => {
        if(!valid)return;
        this.post('/products/search',this.formData).then(res => {   
          console.log(res) 
          this.tableData = res.data
          this.totalNum = res.totalNum
        }).catch(res=>{
          return this.$error(`请求失败！${res.message}`);
        }).finally(e=>{
            this.isVisible = false;
            this.$emit('showProduct');
        })
      })
      },
      handleSizeChange (value) {
        this.pageInfo.pageNum = 1
        this.pageInfo.pageSize = value
        this.search()
      },
      handleCurrentChange (value) {
        console.log('当前多少页', value)
        this.pageInfo.pageNum = value
        this.search()
      },
      // handleSelectionChange(rows) {
      //   // console.log('rows', rows)
      //   this.getSelectCommCode = rows
      //   console.log('rows', rows)
      //   if (rows.length!==0) {
      //     this.update = JSON.parse(JSON.stringify(rows[0]))
      //     this.delete = JSON.parse(JSON.stringify(rows))
      //   }
      // },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      dialogBeforeClose () {
        this.$refs.ruleForm.resetFields()
        this.dialogVisible = false
      },
      dialogCancel () {
        this.dialogVisible = false
        this.$refs.ruleForm.resetFields()
      },
      addshop(){
        this.dialogTitle = '新增商品',
        this.dialogType = 'addGoods'
        this.dialogVisible = true
        // this.listClassify()
      },
      updateshop(){
        this.dialogTitle = '修改商品信息'
        this.dialogType = 'changeGoodsInfo'
        this.dialogVisible = true
        this.commCode = this.goodsId
        // this.listClassify()
      },
      deleteshop(){
        this.$confirm('此操作将永久删除该商品，是否继续？').then(() => {
          this.$refs.ruleForm.validate(async valid => {
            if(!valid)return;
            this.commCode = this.goodsId
            this.post('/products/{id}/delete',this.commCode).then(res => {    
              this.fetch()
              this.$message.success("新增成功！")
            }).catch(res=>{
                  return this.$error(`请求失败！${res.$message}`);
            }).finally(e=>{
                this.isVisible = false;
                this.$emit('showProduct');
            })
          })
        })
      },
      // listClassify () {
      //   this.$refs.ruleForm.validate(async valid => {
      //   if(!valid)return;
      //   this.post('/products/{classify}/showProByClassify').then(res => {   
            
      //   }).catch(res=>{
      //     return this.$error(`请求失败！${res.message}`);
      //   }).finally(e=>{
      //       this.isVisible = false;
      //       this.$emit('showProduct');
      //   })
      // })
      // },
      dialogConfirm () {
      this.$refs.ruleForm.validate((valid) => {
        if(!valid)return;
        else if (this.dialogType === 'addGoods') {
          this.post('/products/add',this.dialogFromData).then(res => {    
            this.$message.success("新增成功！")
            this.fetch()
            this.$refs.ruleForm.resetFields()
            this.dialogVisible = false
          }).catch(res=>{
                return this.$error(`请求失败！${res.$message}`);
          }).finally(e=>{
              this.isVisible = false;
              this.$emit('showProduct');
          })
        } 
        else if (this.dialogType === 'changeGoodsInfo'){
          this.post('/products/{id}/change_info',this.dialogFromData).then(res => {    
            this.$message.success("修改成功！")
            this.fetch()
            this.$refs.ruleForm.resetFields()
            this.dialogVisible = false
            console.log(res)
          }).catch(res=>{
                return this.$error(`请求失败！${res.$message}`);
          }).finally(e=>{
              this.isVisible = false;
              this.$emit('showProduct');
          })
        }else {
          return false
        } 
      })
    },
      signOut () {
        this.$router.push({path: 'shopLogin'})
      },
      
    // 表格表头的循环list变量名一定要是一致的(columnList)
      columnFormatter (row, column, cellValue, index) {
      let distName = this.columnList.filter(item => {
        return item.prop === column.property
      })[0].distName
      if (distName) {
        let currentDist = []
        currentDist = this[distName].filter(item => {
          return item.value === row[column.property]
        })
        if (currentDist[0]) {
          return currentDist[0].label
        } else {
          return row[column.property]
        }
      } else {
        return row[column.property]
      }
    }
    }
}
</script>
<style lang="less">
*{
    margin: 0;
    padding: 0;
}
 .el-select{
    width: 100% !important;
  }
.title-wrap{
    width: 100%;
    height: 60px;
    background-color: #545c64;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
  .logo-btn {
    font-size: 25px;
    color: white;
    text-decoration: none;
    margin-left: 50px;
    font-weight: 800;
  }
 
  .user-info {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 20px;
    img {
      margin-right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    span{
      color: white;
    }
    .el-popover__reference {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
.menu-wrap{
    display: flex;
    height: 565px;
    .biaodan{
      // border-left: 1px solid rgb(242,242,242);
      width: 1150px;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
    }
    .biaodan .head{
      display: flex;
      flex-direction: row;
      padding-bottom: 20px;
    }
    .biaodan .head .btn{
      margin-left: 200px;
      margin-top: 25px;
      width: 90px;
      height: 45px;
    }
    .biaodan .head .search-box {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 500px;
      height: 45px;
      background:#409EFF;
      margin-top: 25px;
      margin-left: 120px;
    }

    .biaodan .head .search-box .search-input {
      width: 488px;
      height: 31px;
      border: none;
      padding: 0;
      margin: 0;
      outline: none;
      margin-bottom: 8px;
      margin-left: 2px;
    }

    .biaodan .head .search-box .buttons{
      background: #409EFF;
      border: none;
      color: #ffff;
      display: flex;
      justify-content: center;
      align-items: center;
      // line-height: 31px;
      height: 45px;
      width: 60px;
      outline: none;
    }
    .el-row{
        display: contents;
        .el-col{
          background-color: #545c64;
          .el-menu{
            .el-menu-item{
              width: 171px;
            }
          }
        }
    }
    .el-table{
      tr{
        background-color: red;
      }
    }
}
.img-wrap{
  width: 60px;
  height: 60px;
}
.op{
  width: 40px;
  height: 30px;
}

// 修改输入框的全局样式
.el-form {
  .el-form-item {
    padding-bottom: 20px;
    .el-form-item__content {
      .el-select {
        width: 218px;
      }
      .el-input {
        .el-input__inner {
          border-radius: 0;
        }
      }
    }
  }
}

</style>