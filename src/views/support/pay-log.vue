<template>
  <div>
    <div>
      <el-form
          :model="queryParams"
          :inline="true"
          label-width="68px">
        <el-form-item label="交易号" prop="tradeNo">
          <el-input
              v-model="queryParams.tradeNo"
              placeholder="请输入交易号"
              clearable
          />
        </el-form-item>
        <el-form-item label="交易类型" prop="type">
          <el-select v-model="queryParams.tradeType" placeholder="交易类型" clearable>
            <el-option label="租金账单" :value="0"></el-option>
            <el-option label="房源签约订单" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
          v-loading="loading"
          :data="payLogList"
          style="width: 652px;display: inline-block"
          border>
        <el-table-column
            fixed
            prop="tradeNo"
            label="交易订单号"
            width="170">
        </el-table-column>
        <el-table-column
            prop="tradeType.name"
            label="交易订单类型"
            width="150">
        </el-table-column>
        <el-table-column
            prop="money"
            label="支付金额"
            width="150">
        </el-table-column>
        <el-table-column
            prop="gmtCreate"
            label="支付时间"
            width="180">
        </el-table-column>
      </el-table>
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
import {payLogList} from "@/api/support";

export default {
  name: "pay-log",
  data() {
    return {
      payLogList: [],
      queryParams: {
        page: 1,
        limit: 10,
        tradeNo: '',
        tradeType: null
      },
      total: 0,
      loading: false,
      orderDetailsDialog: false,
      dialogLoading: false,
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.limit = val;
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
    },
    handleQuery() {
      this.getPayLogList();
    },
    resetQuery() {
      this.queryParams = {
        page: 1,
        limit: 10,
        tradeNo: '',
        tradeType: null
      };
      this.getPayLogList()
    },
    getPayLogList() {
      this.loading = true;
      payLogList(this.queryParams).then(resp => {
        this.payLogList = resp.data.records;
        this.total = resp.data.total;
        this.loading = false;
      })
    },
  },
  mounted() {
    this.getPayLogList();
  }
}
</script>

<style scoped>

</style>
