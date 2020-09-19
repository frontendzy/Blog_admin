<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}信息</h1>
    <el-form label-width="130px" @submit.native.prevent="submit">
      <el-form-item label="头像">
        <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(data, 'avatar', res.url)">
                <img v-if="data.avatar" :src="data.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
      </el-form-item>

      <el-form-item label="名字">
        <el-input style="width: 200px;" type="text" placeholder="请输入内容" v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="简述">
        <el-input type="textarea" placeholder="请输入内容" v-model="data.signature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="data.contact.push({})"><i class="el-icon-plus"></i>添加</el-button>
      </el-form-item>
      <el-row type="flex" style="flex-wrap: wrap">
          <el-col class="box" :md="12" v-for="(item, i) in data.contact" :key="i">
            <el-form-item label="名称">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="Link">
              <el-input v-model="item.link"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model="item.icon"></el-input>
              <!-- <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'icon', res.url)">
                <img v-if="item.icon" :src="item.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="data.icon.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      data: {
        contact:[]
      }
    }
  },
  components: {

  },
  methods: {
    async submit() {
      let res
      if(this.data !== ''){
        if(this.id){
        res = await this.$http.put(`rest/personal/${this.id}`, this.data)
      }else{
        res = await this.$http.post('rest/personal', this.data)
      }
      this.$router.push('/admin/personal/list')
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      }else{
        this.$message({
          type: 'error',
          message: '提交失败'
        })
      }
    },
    async fetch(){
      const res = await this.$http.get(`rest/personal/${this.id}`)
      this.data = res.data
    }
  },
  created(){
    this.id && this.fetch()
  }
}
</script>

<style scoped lang="css">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .create {
    box-sizing: border-box;
  }
  .box {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
