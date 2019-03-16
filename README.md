# vuejs-pagination-simple

> A Pagination Plugins of Vue.js

# 安装
```
cnpm i vuejs-pagination-simple -S
```

# 使用
```
import pagination from 'vuejs-pagination-simple';
Vue.use(pagination);
<pagination ref="pagination" totalPage='20' :options='options' />
```
# 配置
```
totalPage:总页数

options:{
    maxLength:10//最多展示多少个页码标签（默认10）
    pageNo：10//初始化页码位置（默认1）
}

父元素声明一个methods:changePage，每次页数改变时调用
methods: {
    changePage(pageNum) {
        console.log(pageNum);
    }
}
```
# 方法
```
this.$refs.pagination.init();//初始化分页，并调至第一页触发第一页选中事件
```
