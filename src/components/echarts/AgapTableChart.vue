<template>
  <!--
  author：00497295
  time: 2019/11/23
  pattern：联运，表格
   -->
  <div class="myTableChart">
    <div class="titleText">
      {{ tableData.title }} <span class="date">{{ tableData.datetime }}</span>
    </div>
    <div class="myTabel">
      <v-data-table
        :headers="tableData.headers"
        :items="tableData.items"
        :items-per-page="5"
        hide-default-footer
        disable-sort
        :mobile-breakpoint="300"
        item-key="index"
      >
        <template v-slot:item.amount="{ item }">
          <div style="" class="text-xs-center">
            {{ toThousands(item.amount) }}
            <agap-bar-chart
              :barData="item.amount"
              :barDataMax="barDataMax"
              :colorType="tableData.type"
            >
            </agap-bar-chart>
          </div>
        </template>
        <template v-slot:item.category="{ item }">
          <div style="white-space: nowrap">{{ item.category }}</div>
        </template>
        <template v-slot:item.rate="{ item }">
          <div
            :style="
              tableData.type == 1
                ? 'color:#00BFC9'
                : tableData.type == 2
                ? 'color:#FB2B2D'
                : 'color:#47CC47'
            "
          >
            {{ item.rate }}
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import { toThousands } from '@/lib/utils';
import AgapBarChart from '@/pages/overall/common/AgapBarChart';
export default {
  name: 'AgapTableChart',
  components: {
    AgapBarChart
  },
  data() {
    return {
    };
  },
  props: {
    tableData: {
      type: Object,
      default: () => {
        return {};
      },
      require: true
    }
  },
  computed: {
    barDataMax() {
      return this.tableData.items[0] ? this.tableData.items[0].amount : 500;
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    toThousands(num) {
      return toThousands(num);
    },
    initChart() {
    },
    chartResize() {
      this.initChart();
    }
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.myTabel >>> .v-data-table th {
  white-space: nowrap;
  font-size: 42px;
  padding-right: 48px;
  padding-left: 0;
  padding-top: 42px;
  padding-bottom: 42px;
  color: #000000;
  font-weight: normal;
}
.myTabel >>> .v-data-table th:first-of-type {
  padding-left: 0;
}
.myTabel >>> .v-data-table th:last-of-type {
  padding-right: 0;
}
.myTabel >>> .text-xs-center {
  padding-top: 20px;
}
.myTabel >>> .v-data-table td {
  /* white-space: nowrap; */
  font-size: 36px;
  padding: 3px 48px 3px 0px;
  color: rgba(0, 0, 0, 0.6);
}
.myTabel >>> .v-data-table td:first-of-type {
  padding-left: 0px;
}
</style>
<style lang="scss" scoped>
.myTableChart {
  padding-bottom: 24px;
  // width: 100%;
  margin-right: 72px;
  margin-left: 72px;
  .titleText {
      font-family: "HWtext 65ST";
      font-weight: 500;
      padding: 39px 0 24px 0;
      font-size: 54px;
      // height: 144px;
      line-height: 80px;
      color: rgba(0, 0, 0, 0.9);
      .date {
        font-family: "HWtext 55ST";
        font-size: 42px;
        font-weight: normal;
        float: right;
        color: rgba(0, 0, 0, 0.6);
        position:  relative;
        bottom: -7px;
      }
    }
  .myTabel {
    width: 100%;
  }
}
</style>
