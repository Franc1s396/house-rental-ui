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
    <div style="display: inline-block;width: 70%">
      <el-card :body-style="{padding:'0px'}" v-for="house in houseList" :key="house" class="box-card">
        <div style="float: left;height: 170px;width: 220px">
          <img class="house-img" :src="house.coverUrl">
        </div>
        <div style="height: 170px;margin-left: 230px;text-align: left">
          <a class="house-title">{{house.name}}</a><p></p>
          <span class="house-address"><i class="el-icon-map-location"></i>{{house.address}}</span><br>
          <ul class="house-ul">
            <i class="el-icon-info"></i>
            <li class="house-li">
              <el-tag type="success">面积:{{house.area}}m²</el-tag>
            </li>
            <li class="house-li">
              <el-tag type="success">楼层:{{house.floor}}</el-tag>
            </li>
            <li class="house-li">
              <el-tag type="success">朝向:{{house.direction}}</el-tag>
            </li>
          </ul>
          <span class="house-address">户型:{{house.layout}}</span>
          <p></p>
          <span class="house-rent">{{house.rent}}元/月</span>
        </div>
      </el-card>
<!--      <el-card :body-style="{padding:'0px'}" v-for="house in houseList" :key="house" class="box-card">

        <div class="left-card">

        </div>

        <div class="right-card">

          <div class="right-content">

          </div>

        </div>
      </el-card>-->
    </div>
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
      loading: false,
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
    },
    handleCurrentChange(val) {
      this.queryParams.pageNo = val;
    },
    getHousePage() {
      this.loading = true;
      findHousePage(this.queryParams).then(resp => {
        console.log(resp);
        this.houseList = resp.data.records;
        this.total = resp.data.total;
        this.loading = false;
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

.box-card {
  margin-top: 10px;
  padding: 20px;
  width: 76%;
  position: relative;
}

.house-img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
}

.house-title {
  font-family: 微軟正黑體;
  font-size: 22px;
  font-weight: bold;
}

.left-card {
  width: 220px;
  height: 100%;
  float: left;
}

.right-card {
  margin-left: 220px;
  height: 100%;
  width: 100%;
}

.right-content{
  margin-left: 15px;
  height: 100%;
  width: 100%;
}

.house-address{
  font-family: 微軟正黑體;
  margin-top: 10px;
}

.house-ul{
  font-family: 微軟正黑體;
  list-style: none;
  padding: 0 0 0 0;
  margin: 10px 0;
}

.house-li{
  display: inline-block;
  padding-right: 5px;
}

.house-rent{
  float: right;
  font-size: 23px;
  color: red;
  font-weight: 900;
}

.el-tag{
  font-weight: bold;
  font-family: 微軟正黑體;
}
</style>
