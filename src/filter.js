import Vue from 'vue';
import { toThousands, toThousandsInt, percentMax } from '@/utils';

let filters = {
  toThousands,
  toThousandsInt,
  percentMax
};

// 引入过滤器值全局
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
