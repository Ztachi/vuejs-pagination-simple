/*
 * @Author: 詹真琦(legendryztachi@gmail.com) 
 * @Date: 2018-09-03 10:12:05 
 * @Description: 分页组件
 * @Last Modified by: 詹真琦(legendryztachi@gmail.com)
 * @Last Modified time: 2019-03-15 17:27:22
 */
 /*
 *接收参数：
    totalPage:总页数
  */
  /*
  父级需设置此方法以根据页数重新获取数据
  changePage(pageNum){
                
   }
  */
<template>
    <ul id="pagination" v-show="totalPage">
        <li class="arrow prevPage" :class="{invalid:currentPage===1}" @click="currentPage>1&&currentPage--">
            {{options.btns&&options.btns[0]||'上一页'}}
        </li>
        <li v-for="(item, index) in currentPageList" :key="index" :class="{current:item==currentPage}" @click="currentPage=item">{{item}}</li>
        <li class="arrow nextPage" :class="{invalid:currentPage==totalPage}" @click="currentPage<totalPage&&currentPage++">
            {{options.btns&&options.btns[1]||'下一页'}}
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'pagination',
        props: ['totalPage', 'options'],
        data() {
            return {
                listMaxLength: this.options.maxLength == 0 ? 0 : (Math.ceil(this.options.maxLength) || 10), //分页器的一页最多显示多少页码
                currentPage: this.options.pageNo && this.options.pageNo > 0 && Math.ceil(this.options.pageNo) || 1,
                half: this.options.maxLength ? Math.ceil(this.options.maxLength / 2) : 5
            }
        },
        watch: {
            currentPage(pageNo) { //页数改变，重新加载数据
                this.$parent.changePage(pageNo);
            }
        },
        computed: {
            currentPageList() { //当前分页器显示的页码列表
                let list = [], //最终列表
                    leftPage = 1, //最左侧页码
                    min = Math.min(...[this.listMaxLength, this.totalPage]);
                if (this.listMaxLength < 1) {
                    return [];
                } else if (this.listMaxLength === 1) {
                    leftPage = this.currentPage;
                } else if (this.currentPage < this.half + 1) {
                    leftPage = 1;
                } else if (this.currentPage > this.half && this.totalPage - this.currentPage > this.half - 1) { //大于第一页“页码一半值”并且距离最后一页“页码一半值”以上
                    leftPage = this.currentPage - (this.half - 1);
                } else { //最后5页
                    leftPage = Math.max(...[this.totalPage - this.listMaxLength + 1, 1]);
                }
                for (let i = 0; i < min; i++) { //生成当前页码列表
                    list.push(leftPage + i);
                }
                return list;
            }
        },
        methods: {
            init() {
                if (this.currentPage === 1) {
                    this.$parent.changePage();
                } else {
                    this.currentPage = 1;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $baseColorB:#4CB2FF;
    @mixin equalWH($num, $circle:true, $center:false) {
        width: $num + px;
        height: $num + px;
        @if($circle) {
            border-radius: 50%;
        }
        @if($center) {
            line-height: $num + px;
            text-align: center;
        }
    }
    #pagination {
        display: flex;
        justify-content: center;
        font-size: 16px;
        >li {
            &.arrow {
                width: auto;
                padding: 0 5px;
            }
            list-style-type: none;
            @include equalWH(40, false, 1);
            border: 1px solid#DCDEE2;
            margin-right: 10px;
            cursor: pointer;
            user-select: none;
            &:hover {
                background-color: #0F65C2;
                color: rgba(255, 255, 255, 0.65);
                border-color: #0F65C2;
                &.arrow {
                    >svg {
                        fill: rgba(255, 255, 255, 0.65);
                    }
                }
            }
            &.current {
                background-color: $baseColorB;
                color: #fff;
                border-color: $baseColorB;
            }
            &.invalid {
                display: none;
            }
        }
    }
</style>

