<template>
      <div class="create">
        <el-form label-width="130px" @submit.native.prevent="submit">
          <el-form-item label="名称">
            <el-input v-model="data.name" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="logo:">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(data, 'logo', res.url)">
              <img v-if="data.logo" :src="data.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="data.icon.push({})"><i class="el-icon-plus"></i>添加</el-button>
          </el-form-item>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col class="box" :md="12" v-for="(item, i) in data.icon" :key="i">
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
  props:{
    id: ''
  },
  data() {
    return {
      data: {
        name: '',
        logo: '',
        icon:[
          {name: '', link: '', icon: ''}
        ]
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
        res = await this.$http.put(`rest/blog/${this.id}`, this.data)
      }else{
        res = await this.$http.post('rest/blog', this.data)
      }
      this.$router.push('/admin/blog/list')
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
      const res = await this.$http.get(`rest/blog/${this.id}`)
        this.data = res.data
    },
  },
  created() {
    this.id && this.fetch()
  },
    
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
