<template>
  <div>
    <div style="float: left;margin-bottom: 20px">
      <el-form
          :model="queryParams"
          :inline="true"
          label-width="68px">
        <el-form-item label="订单号" prop="orderNo">
          <el-input
              v-model="queryParams.orderNo"
              placeholder="请输入订单号"
              clearable
          />
        </el-form-item>
        <el-form-item label="支付状态" prop="paymentStatus">
          <el-select v-model="queryParams.paymentStatus" placeholder="支付状态" clearable>
            <el-option label="未支付" :value="0"></el-option>
            <el-option label="已支付" :value="1"></el-option>
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
          :data="billList"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="billNo"
            label="账单号"
            width="170">
        </el-table-column>
        <el-table-column
            prop="orderNo"
            label="订单号"
            width="170">
        </el-table-column>
        <el-table-column
            prop="tenantName"
            label="租客"
            width="110">
        </el-table-column>
        <el-table-column
            prop="landlordName"
            label="房东"
            width="110">
        </el-table-column>
        <el-table-column
            label="上期电表读数"
            width="110">
          <template slot-scope="scope">
            {{scope.row.lastElectricNumber}}度
          </template>
        </el-table-column>
        <el-table-column
            label="本期电表读数"
            width="110">
          <template slot-scope="scope">
            {{scope.row.nowElectricNumber}}度
          </template>
        </el-table-column>
        <el-table-column
            prop="electricBill"
            label="电费"
            width="100">
          <template slot-scope="scope">
            {{scope.row.electricBill}}元
          </template>
        </el-table-column>
        <el-table-column
            prop="lastWaterNumber"
            label="上期水表读数"
            width="110">
          <template slot-scope="scope">
            {{scope.row.lastWaterNumber}}吨
          </template>
        </el-table-column>
        <el-table-column
            prop="nowWaterNumber"
            label="本期水表读度"
            width="110">
          <template slot-scope="scope">
            {{scope.row.nowWaterNumber}}吨
          </template>
        </el-table-column>
        <el-table-column
            prop="waterBill"
            label="水费"
            width="100">
          <template slot-scope="scope">
            {{scope.row.waterBill}}元
          </template>
        </el-table-column>
        <el-table-column
            prop="totalAmount"
            label="总金额"
            width="100">
          <template slot-scope="scope">
            {{scope.row.totalAmount}}元
          </template>
        </el-table-column>
        <el-table-column
            prop="payStatus.name"
            label="支付状态"
            width="120">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.payStatus.name === '已支付' ? 'success' : 'danger'"
                disable-transitions>{{ scope.row.payStatus.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="150">
          <template slot-scope="scope">
            <el-button
                v-if="scope.row.payStatus.name==='未支付'"
                @click="payBill(scope.row.billNo)"
                type="text"
                size="small">
              支付
            </el-button>
          </template>
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
import {tenantBillList} from "@/api/bill";
import {billPay} from "@/api/alipay";

export default {
  name: "tenant-bill",
  data() {
    return {
      queryParams: {
        page: 1,
        limit: 10,
        orderNo: '',
        paymentStatus: null
      },
      billList: [],
      total: 0,
      loading: false
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.limit = val;
      this.getBillList()
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getBillList()
    },
    handleQuery() {
      this.getBillList();
    },
    resetQuery() {
      this.queryParams = {
        page: 1,
        limit: 10,
        orderNo: '',
        paymentStatus: null
      };
      this.getBillList()
    },
    getBillList() {
      this.loading=true;
      tenantBillList(this.queryParams).then(resp => {
        this.loading=false;
        this.billList = resp.data.records;
        this.total = resp.data.total;
      })
    },
    payBill(billNo) {
      billPay(billNo).then(resp => {
        document.write(resp);
      })
    }
  },
  mounted() {
    this.getBillList();
  }
}
</script>

<style scoped>

</style>
