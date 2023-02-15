<template>
  <div>
    <div>
      <div v-for="(message,index) in messageList">
        <el-card style="text-align: left" :style="handleStyle(message.status)" class="box-card" :key="index">
          <span class="message" @click="handleRouter(message.type)">{{ message.message }}</span>
          <el-button
              v-if="message.status===0"
              style="float: right; padding: 3px 0" type="text"
              @click="handleReadMessage(message.id)"
          >已读
          </el-button>
          <br/>
          <span style="font-size: 8px;color: #8c939d">{{ message.gmtCreate }}</span>
        </el-card>
      </div>
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
import {messageList, readMessage, readAllMessage} from "@/api/support";

export default {
  name: "home-message",
  data() {
    return {
      loading: false,
      messageList: [],
      queryParams: {
        page: 1,
        limit: 20,
      },
      total: 0,
      unreadStyle: 'background-color: white',
      readStyle: 'background-color: rgba(243, 243, 243, 0.99)'
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryParams.limit = val;
      this.getMessageList()
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getMessageList()
    },
    handleReadMessage(messageId) {
      readMessage(messageId).then(resp => {
        this.$router.go(0);
      })
    },
    handleStyle(status) {
      if (status === 0) {
        return this.unreadStyle;
      } else {
        return this.readStyle;
      }
    },
    handleRouter(type) {
      switch (type) {
        case 0:
          this.$router.push('/home/bill/tenant');
          break;
        case 1:
          this.$router.push('/home/order/tenant');
          break;
        case 2:
          this.$router.push('/home/bill/landlord');
          break;
        case 3:
          this.$router.push('/home/order/landlord');
      }
    },
    getMessageList() {
      messageList(this.queryParams).then(resp => {
        this.messageList = resp.data.records;
        this.total = resp.data.total;
      })
    }
  },
  mounted() {
    this.getMessageList();
  }
}
</script>

<style scoped>
.message {
  cursor: pointer;
  font-weight: bold;
}

.message:hover {
  text-decoration: underline;
}
</style>
