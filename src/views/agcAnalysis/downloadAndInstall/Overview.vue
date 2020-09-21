<template>
    <div class="overview" v-loading="loading">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>下载数据总览</span>
        </div>
        <div class="dataOverview">
          <div class="content">
            <div class="lable">总下载成功</div>
            <div class="value">{{ currentOverviewData[0] && currentOverviewData[0].downCnt }}</div>
          </div>
          <div class="dashedLine"></div>
          <div class="content">
            <div class="lable">更新下载成功</div>
            <div class="value">{{ currentOverviewData[0] && currentOverviewData[0].updateDownCnt }}</div>
          </div>
          <div class="dashedLine"></div>
          <div class="content">
            <div class="lable">新下载成功</div>
            <div class="value">{{ currentOverviewData[0] && currentOverviewData[0].nonUpdateDownCnt }}</div>
          </div>
          <div class="dashedLine"></div>
          <div class="content">
            <div class="lable">详情页转化率</div>
            <div class="value">{{ currentOverviewData[0] && currentOverviewData[0].detailPageConversionRate }}</div>
          </div>
        </div>
      </el-card>
    </div>
</template>
<script>
import { toThousandsInt, percentMax } from '@/utils/agcReportIndex';
import { appoverallanalysistotal } from '@/api/url';
export default {
  name: 'Overview',
  components: {
  },
  data() {
    return {
      currentOverviewData: [],
      overviewData: [],
      loading: false,
    };
  },
  props: {
    params: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
  },
  watch: {
    params: {
      handler(val, oldVal) {
        this.queryDatas(val);
      },
      deep: true,
    }
  },
  methods: {
    queryDatas() {
      // 请求接口-概览数据
      this.loading = true;
      this.$requestApi.post(appoverallanalysistotal, this.params, false).then(res => {
        this.loading = false;
        let data = res.data || [];
        this.analysisDats(data);
      }).catch(() => {
        this.currentOverviewData = [];
        this.loading = false;
      });
    },
    analysisDats(res) {
      this.currentOverviewData = JSON.parse(JSON.stringify(res));
      if (this.currentOverviewData.length > 0) {
        // 千分位取整处理
        this.currentOverviewData = this.currentOverviewData.map(item => {
          item.downCnt = toThousandsInt(item.downCnt); // 总下载:千分位整数
          item.updateDownCnt = toThousandsInt(item.updateDownCnt); // 更新下载:千分位整数
          item.nonUpdateDownCnt = toThousandsInt(item.nonUpdateDownCnt); // 非更新下载:千分位整数
          item.detailPageConversionRate = percentMax(item.detailPageConversionRate); // 详情页转化率:百分比,千分位2位小数
          return item;
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.overview ::v-deep {
  .el-card {
    .el-card__header {
      font-size: 15px;
      color: rgb(102, 102, 102);
    }
    .dataOverview {
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      .content {
        width: 25%;
        text-align: center;
      }
      .dashedLine {
        display: inline-block;
        border: 1px dashed #ccc;
      }
      .lable, .value {
        padding: 10px 0;
        font-size: 15px;
      }
      .lable {
        color: rgb(102, 102, 102);
      }
      .value {
        font-weight: 700;
        color: rgb(30, 30, 30);
      }
    }
  }
}
</style>>
