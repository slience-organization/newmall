<template>

  <div class="bottom-bar">
    <div class="select-all">
      <check-button class="button" :selected="selectAll"
        @click.native="allClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total" v-show="isTotal">
      合计：{{totalPrice}}
    </div>
    <div class="accounts" @click="accountClick" v-if="!isDelete">
      <span>去结算{{selectedLength}}</span>
    </div>
    <div class="accounts" @click="deleteClick" v-else>
      <span>删除</span>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import CheckButton from './CheckButton.vue'
  import { MessageBox, Toast } from "mint-ui";
  export default {
    name: 'CartBottom',
    components:{
      CheckButton, 
      Toast,
      MessageBox
    },
    data () {
      return {
        isDelete: false,
        isTotal: true
      }
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice () { //计算选中商品的总价
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      selectedLength () { //选中的商品的数量
        return this.cartList.filter(item => item.checked).length
      },
      selectedProduct () { //选中的商品的iid
        let products = this.cartList.filter(item=> item.checked)
        let iidArr = []
        for (const p of products) {
          iidArr.push(p.iid)
        }
        return iidArr
      },
      selectAll () { //全选
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      allClick () {
        //console.log('全选')
        if (this.selectAll) {
          this.cartList.forEach(element => element.checked = false);
        } else {
          this.cartList.forEach(element => element.checked = true)
        }
      },
      accountClick () {
        if (!this.selectAll && this.selectedLength === 0) {
          Toast({message:'请选择商品', duration:800})
        } else {
          Toast({message:'飞到外星去了?', duration:800})
        }
      },
      deleteClick () {
        console.log('点击删除')
        if (this.selectedLength) {
          MessageBox.confirm('',{
            title: '警告',
            message: '确认删除选中的商品吗'
          }).then((res)=> {
            //console.log(res)
            //console.log(this.selectedProduct)
            this.$store.dispatch({
              type: '_deleteProduct',
              iids: this.selectedProduct
            }).then((res)=> {
              console.log(res)
            })
          }).catch((res)=> {
            //console.log(res)
          })
        }else {
          Toast({message:'请选择商品', duration:800})
        }
      }
    }
  }
</script>
  
<style lang="css" scoped>
  .bottom-bar {
    height: 40px;
    width: 100%;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .select-all {
    display: flex;
    width: 25%;
    align-items: center;
  }
  .button {
    margin: 0 5px;
  }
  
  .accounts {
    display: flex;
    justify-content: center;
    width: 25%;
    height: 100%;
    align-items: center;
    background-color: orangered;
    color: #fff;
  }
  
</style>