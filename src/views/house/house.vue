<template>
  <div>
    <div class="house-input">
      <el-select
          v-model="queryParams.city"
          @change="handleCityChange"
          placeholder="城市">
        <el-option label="北京" value="北京"></el-option>
        <el-option label="上海" value="上海"></el-option>
        <el-option label="广州" value="广州"></el-option>
        <el-option label="深圳" value="深圳"></el-option>
        <el-option label="杭州" value="杭州"></el-option>
        <el-option label="武汉" value="武汉"></el-option>
        <el-option label="长沙" value="长沙"></el-option>
        <el-option label="大连" value="大连"></el-option>
        <el-option label="厦门" value="厦门"></el-option>
        <el-option label="南京" value="南京"></el-option>
      </el-select>
      <el-input style="width: 100%;margin-left: 10px" placeholder="请输入关键字" v-model="queryParams.keyword">
        <template slot="append">
          <el-button
              style="background-color: #2933c2;color: white;border-top-left-radius: 0;border-bottom-left-radius: 0"
              @click="getHousePage">查找
          </el-button>
        </template>
      </el-input>
      <el-button
          style="margin-left: 10px"
          type="info"
          @click="handleReset">重置
      </el-button>
    </div>


    <div style="background-color: #F3F3F3;width: 70%;display: inline-block;border-radius: 1px;">
      <div style="text-align: left;padding-top: 2px;">
        <strong>租金</strong>
        <ul class="house-query-ul">
          <li class="house-query-li">
            <el-radio v-model="queryParams.rentParam" :label="''" @input="getHousePage">
              不限
            </el-radio>
          </li>
          <li v-for="(rent,index) in queryRent" class="house-query-li">
            <el-radio v-model="queryParams.rentParam" :label="index" @input="rentParamChange">
              {{ rent }}
            </el-radio>
          </li>
        </ul>
      </div>
      <div style="text-align: left;padding-top: 2px">
        <strong>租金范围</strong>

        <input v-model="queryParams.minRent" style="margin-left: 10px;width: 70px"/>
        &nbsp;-&nbsp;
        <input v-model="queryParams.maxRent" style="width: 70px"/>

        <el-button @click="rentRangeSubmit"
                   style="background-color: #2933c2;color: white;margin-left: 5px"
                   size="mini">
          确定
        </el-button>

      </div>

      <div style="text-align: left;padding-top: 2px;padding-bottom: 5px;">
        <strong>面积</strong>
        <ul class="house-query-ul">
          <li class="house-query-li">
            <el-radio v-model="queryParams.areaParam" :label="''" @input="getHousePage">
              不限
            </el-radio>
          </li>
          <li v-for="(area,index) in queryArea" class="house-query-li">
            <el-radio v-model="queryParams.areaParam" :label="index" @input="areaParamChange">
              {{ area }}
            </el-radio>
          </li>
        </ul>
      </div>
      <div style="text-align: left;padding-top: 2px">
        <strong>面积范围</strong>

        <input v-model="queryParams.minArea" style="margin-left: 10px;width: 70px"/>
        &nbsp;-&nbsp;
        <input v-model="queryParams.maxArea" style="width: 70px"/>

        <el-button @click="areaRangeSubmit"
                   style="background-color: #2933c2;color: white;margin-left: 5px"
                   size="mini">
          确定
        </el-button>

      </div>
    </div>


    <div v-loading="loading" style="display: inline-block;width: 70%">
      <el-card :body-style="{padding:'0px'}" v-for="(house,index) in houseList" :key="index" class="box-card">
        <div style="float: left;height: 170px;width: 220px">
          <img class="house-img" :src="house.coverUrl">
        </div>
        <div style="height: 170px;margin-left: 230px;text-align: left">
          <span class="house-title" @click="houseInfoRoute(house.id)">{{ house.name }}</span>
          <p></p>
          <span class="house-address"><i class="el-icon-map-location"></i>{{ house.address }}</span><br>
          <ul class="house-ul">
            <i class="el-icon-info"></i>
            <li class="house-li">
              <el-tag type="success">面积:{{ house.area }}m²</el-tag>
            </li>
            <li class="house-li">
              <el-tag type="success">楼层:{{ house.floor }}</el-tag>
            </li>
            <li class="house-li">
              <el-tag type="success">朝向:{{ house.direction }}</el-tag>
            </li>
          </ul>
          <span class="house-address">户型:{{ house.layout }}</span>
          <p></p>
          <span class="house-rent">{{ house.rent }}元/月</span>
          <p></p>
          <span>收藏:{{ house.favorites }}</span>
        </div>
      </el-card>
    </div>
    <div>
      <el-pagination
          style="margin-top: 15px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.page"
          :page-size="queryParams.limit"
          layout="total, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {findHousePage} from "@/api/house";
import {messageCount} from "@/api/support";

export default {
  name: "house-page",
  data() {
    return {
      queryParams: {
        page: 1,
        limit: 10,
        keyword: '',
        city: '',
        minRent: null,
        maxRent: null,
        rentParam: '',
        minArea: null,
        maxArea: null,
        areaParam: '',
      },
      messageCount: 0,
      houseList: [],
      total: 0,
      loading: false,
      queryRent: [
        '1000元以下', '1000~2000元', '2000~3000元', '3000~5000元', '5000~8000元', '8000元以上'
      ],
      queryArea: [
        '20m²以下', '20~40m²', '40~60m²', '60~80m²', '80~100m²', '100~200m²', '200m²以上'
      ],
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.limit = val;
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
    },
    handleCityChange(val) {
      this.getHousePage();
    },
    handleReset() {
      this.queryParams = {
        page: 1,
        limit: 10,
        keyword: '',
        city: '',
        minRent: null,
        maxRent: null,
        rentParam: '',
        minArea: null,
        maxArea: null,
        areaParam: '',
      };
      this.getHousePage();
    },
    getHousePage() {
      this.loading = true;
      findHousePage(this.queryParams).then(resp => {
        console.log(resp);
        this.houseList = resp.data.records;
        this.total = resp.data.total;
        this.loading = false;
      })
    },
    rentParamChange(val) {
      this.queryParams.minRent = null;
      this.queryParams.maxRent = null;
      this.getHousePage();
    },
    areaParamChange(val) {
      this.queryParams.minArea = null;
      this.queryParams.maxArea = null;
      this.getHousePage();
    },
    rentRangeSubmit() {
      this.queryParams.rentParam = '';
      this.getHousePage();
    },
    areaRangeSubmit() {
      this.queryParams.areaParam = '';
      this.getHousePage()
    },
    houseInfoRoute(houseId) {
      this.$router.push({
        name: 'house-info',
        query: {
          houseId: houseId
        }
      })
    }
  },
  mounted() {
    this.getHousePage()
  }
}
</script>

<style scoped>

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
  cursor: pointer;
  font-family: 微軟正黑體;
  font-size: 22px;
  font-weight: bold;
}

.house-title:hover {
  text-decoration: underline;
}

.house-address {
  font-family: 微軟正黑體;
  margin-top: 10px;
}

.house-ul {
  font-family: 微軟正黑體;
  padding: 0 0 0 0;
  margin: 10px 0;
}

.house-li {
  display: inline-block;
  padding-right: 5px;
}

.house-rent {
  float: right;
  font-size: 23px;
  color: red;
  font-weight: 900;
}

.el-tag {
  font-weight: bold;
  font-family: 微軟正黑體;
}

ul {
  list-style: none;
}

.house-query-ul {
  font-family: 微軟正黑體;
  padding: 0 0 0 0;
  display: inline-flex;
}

.house-query-li {
  margin-left: 25px;
}

.house-query-li >>> .el-radio__label {
  color: black;
}


.house-input >>> .el-input__inner {
  border: 1px solid #a7a7b1;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
}

.house-input {
  width: 50%;
  padding-left: 20%;
  margin-top: 10px;
  margin-bottom: 20px;
  display: inline-flex
}

.area >>> .area-selected-trigger {
  display: inline-block;
}

</style>
