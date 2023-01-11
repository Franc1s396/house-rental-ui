<template>
  <div>
    <div style="background-color: #F3F3F3;">
      <el-form class="houseQueryForm" ref="queryParam" size="small" :model="queryParams" label-width="80px">
        <el-form-item>
          <el-input placeholder="请输入关键字" v-model="queryParams.keyword">
            <template slot="append">
              <el-button type="primary" size="small" @click="getHousePage">查找</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>{{ houseList }}</div>
    <div>
      <el-pagination
          style="margin-top: 15px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.pageNo"
          :page-size="queryParams.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {findHousePage} from "@/api/house";

export default {
  name: "house-page",
  data() {
    return {
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        keyword: '',
        city: '',
        district: '',
        minRent: null,
        rentParam: null,
        minArea: null,
        maxArea: null,
        areaParam: null,
        depositType: null,
      },
      houseList: [],
      total: 0,
      loading:false,
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.pageSize=val;
    },
    handleCurrentChange(val) {
      this.queryParams.pageNo=val;
    },
    getHousePage() {
      this.loading=true;
      findHousePage(this.queryParams).then(resp => {
        console.log(resp);
        this.houseList = resp.data.records;
        this.total = resp.data.total;
        this.loading=false;
      })
    }
  },
  mounted() {
    this.getHousePage()
  }
}
</script>

<style scoped>
.houseQueryForm {
  width: 400px;
  margin-left: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
