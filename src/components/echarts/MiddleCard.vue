
<template>
<!--
  author：00497295
  time: 2019/11/25
  pattern：中卡,首页第三个卡片
   -->
  <div class="thirdCardNew">
    <div class="timeCard">{{$store.state.currentDate}}</div>
    <div class="headerCard1">
      <div class="headerCardleft">
        <p class="headerKpi">{{itemData.dailyRatio | formatNull}} </p>
        <p class="headerTitle">日环比</p>
      </div>
      <div class="headerCardcenter">
        <p class="headerKpi">{{itemData.amount | formatNull}} </p>
        <p class="headerTitle">华为主动活跃用户 </p>
      </div>
      <div class="headerCardright">
        <p class="headerKpi">{{itemData.weeklyRatio | formatNull}} </p>
        <p class="headerTitle">周同比</p>
      </div>
    </div>
    <div class="headerCard2">
      <div class="left">
        <p class="number">{{itemData.peak | formatNull}} </p>
        <p class="cardtitle">本月峰值(万人) </p>
      </div>
      <div class="center"><p class="vertical-line"></p></div>
      <div class="right">
        <p class="number">{{itemData.average | formatNull}} </p>
        <p class="cardtitle">本月均值(万人) </p>
      </div>
    </div>
  </div>
</template>

<script>
import { toThousands } from '@/lib/utils';
// import WholeMarket from '@/pages/overall/common/WholeMarket'
// import PieChart from '@/components/common/PieChart'
export default {

  name: 'HeaderCardNew',
  components: {
    // WholeMarket,
    // PieChart
  },
  data() {
    return {
      itemData: {
        amount: '--',
        average: '--',
        peak: '--',
        dailyRatio: '--',
        weeklyRatio: '--'
      }
    };
  },
  props: {
    middleCardData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    middleCardData: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {

    initChart() {
      if (this.middleCardData.dailyActiveNumber == '--') {
        return;
      }
      this.itemData.amount = this.middleCardData.dailyActiveNumber;
      this.itemData.average = this.middleCardData.averageMonthlyUsers;
      this.itemData.peak = this.middleCardData.peakMonthlyUsers;
      this.itemData.dailyRatio = this.middleCardData.dailyRatio;
      this.itemData.weeklyRatio = this.middleCardData.weeklyRatio;
    }
  }

};
</script>
<style lang='scss' scoped>
$height: 3.3rem;
.thirdCardNew {
  position: relative;
  margin-top: 48px;
  margin-bottom: 24px;
  // padding-top: 1rem;
  justify-content: space-around;
  // width: 100%;
  margin-left:72px;
  margin-right: 72px;
  height: 526px;
  border-radius: 24px;
  // background: linear-gradient(to bottom, #5cb4f4 0%, #0493fa 100%);
  background: #4576E9;
  // box-shadow: 0 0.5rem 0.3rem #888888;
  .headerTitle {
    font-size: 36px;
    margin-bottom:0rem;
  }
  .headerKpi {
    font-size: 48px;
    font-weight: medium;
    margin-bottom:0rem;
  }
  .timeCard {
    width: 50%;
    // height: 2rem;
    margin: auto;
    padding: 48px 0 48px 0;
    text-align: center;
    font-size: 36px;
    color: #fff;
  }
  .headerCard1 {
    display: flex;
    .headerCardleft {
      width: 25%;
      color: #fff;
      flex-direction: column;
      text-align: center;
    }
    .headerCardright {
      width: 25%;
      color: #fff;
      flex-direction: column;
      text-align: center;
    }
    .headerCardcenter {
      width: 50%;
      color: #fff;
      flex-direction: column;
      text-align: center;
    }
  }
  .headerCard2 {
    position: absolute;
    display: flex;
    justify-items: center;
    bottom: -3px;
    left: -3px;
    width: 100.5%;
    height: 192px;
    border-radius: 24px;
    background-color: #f2f2f2;
    .center {
      display: flex;
      width: 0.3%;
      justify-content:center;
      flex-direction: column;
      .vertical-line {
        height: 72px;
        width: 100%;
        background: rgba(0,0,0,0.2);
      }
}
    .right, .left {
      display: flex;
      width: 49.3%;
      align-items: center;
      justify-content:center;
      flex-direction: column;

      .number {
        color: #007DFF;
        font-size: 48px;

      }
    }
  }
}
</style>
