<template>
  <div>
    <div
      class="ratioCard"
      v-for="(item, index) in subtypeDailyDetail"
      :key="index"
      :class="{ isNotLastCard: index != subtypeDailyDetail.length - 1 }"
    >
      <div class="ratioCardTop">
        <div class="ratioCardTop-left">
          <span class="color-blue font-w-500">{{
            toThousands(item.amount) | formatNull
          }}</span
          >&nbsp;{{ item.unit }}
        </div>
        <div class="ratioCardTop-center">日环比</div>
        <div class="ratioCardTop-right color-blue">
          {{ addPlustoRate(item.dailyRatio) | formatNull }}
        </div>
      </div>
      <div class="ratioCardBottom">
        <div class="ratioCardTop-left">{{ item.subType | formatNull }}</div>
        <div class="ratioCardTop-center">周同比</div>
        <div class="ratioCardTop-right color-blue">
          {{ addPlustoRate(item.weeklyRatio) | formatNull }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { toThousands, getFloor } from '@/lib/utils';
export default {
  name: 'LineBarNew',
  props: {
    subtypeDailyDetail: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    // subtypeDailyDetail: {
    //   handler(newVal, oldVal) {
    //     this.initChart();
    //   },
    //   deep: true
    // }
  },
  mounted() {
    // this.initChart();
    // console.log(this.subtypeDailyDetail)
    // this.subtypeDailyDetail = JSON.parse(JSON.stringify(this.subtypeDailyDetail))
  },
  methods: {
    toThousands(num) {
      return toThousands(num);
    },
    addPlustoRate(str = '') {
      if (!str) {
        return '--';
      }
      if (str && str.indexOf('-') !== -1) {
        return str;
      } else {
        return '+' + str;
      }
    },
    initChart() {
    }
  }
};
</script>

<style lang="scss" scoped>
.isNotLastCard {
  border-bottom: solid 3px rgba(0, 0, 0, 0.2);
}
.color-blue {
  color: #007dff;
}
.font-w-500 {
  font-weight: 500;
  font-size: 48px;
  font-family: "HWtext 65ST", Helvetica, "Hiragino Sans GB", Tahoma, "Geneva",
    "\5FAE\8F6F\96C5\9ED1", "simhei", Arial, sans-serif;
}
.ratioCardTop {
  margin-top: 18px;
  margin-bottom: 6px;
}
.ratioCardBottom {
  margin-bottom: 36px;
  margin-top: 6px;
}
.ratioCardTop,
.ratioCardBottom {
  display: flex;
  justify-content: space-between;
  // padding: 6px 0;
  .ratioCardTop-left {
    width: 70%;
  }
  .ratioCardTop-center {
    display: flex;
    justify-items: start;
    align-items: center;
  }
  .ratioCardTop-right {
    width: 13%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.ratioCard {
  // width: 100%;
  margin-left:72px;
  margin-right: 72px;
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  // justify-content: center;
}
</style>
