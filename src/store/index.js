import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseInfoH: 0,
    shopInfoH: 0,
    goodsInfoH: 0,
    paramInfoH: 0,
    commentInfoH: 0,
    cartList: []
  },
  getters: {
    cartList (state) {
      return state.cartList
    },
    cartLength (state) {
      return state.cartList.length
    }
  },
  mutations: { 
    //mutations唯一的目的就是修改state中状态
    //且mutations的每个方法的功能尽可能要单一

    upBaseInfoH (s,h) {
      s.baseInfoH = h
      //console.log(s.baseInfoH)
    },
    upShopInfoH (s,h) {
      s.shopInfoH = h
      //console.log(s.shopInfoH)
    },
    upGoodsInfoH (s,h) {
      s.goodsInfoH = h
      //console.log(s.goodsInfoH)
    },
    upParamInfoH (s,h) {
      s.paramInfoH = h
      //console.log(s.paramInfoH)
    },
    upCommentInfoH (s,h) {
      s.commentInfoH = h
      //console.log(s.commentInfoH)
    },

    addCounter (state, oldProduct) {
      oldProduct.count ++ 
    },
    addToCart (state, product) {
      product.checked = true
      state.cartList.push(product)
    },
    increase (state, product) {
      product.count ++
    },
    decrease (state, product) {
      product.count --
    },
    deleteProduct (state, iids) {
      let cartlist = state.cartList
      while (iids.length!=0) {
        let idx = cartlist.findIndex(item=> item.iid === iids[0])
        cartlist.splice(idx,1)
        iids.splice(0, 1)
      }
    }
  },
  actions: {
    _addCart (context, product) {
      return new Promise((resolve, reject) => {
        //1.查找cartList中有没有被添加的商品
        let oldProduct = context.state.cartList.find((item) => {
          return item.iid === product.iid
        })
        if(oldProduct){ //有就把数量加1
          context.commit('addCounter', oldProduct)
          resolve('又加了1件哦')
        }else{ //没有就添加到购物车，并且新添加一个count把数量设为1
          product.count = 1
          context.commit('addToCart', product)
          resolve('添加了新的商品')
        }
      })
    },
    _decrement (context, payload) {
      return new Promise((resolve, reject)=> {
        let product = context.state.cartList.find((item) => {
          return item.iid === payload.iid
        })
        if (product.count > 1) {
          context.commit('decrease', product)
          resolve(product.count)
        } else {
          reject(product.count)
        }
      })
    },
    _increment (context, payload) {
      return new Promise((resolve, reject)=> {
        let product = context.state.cartList.find((item) => {
          return payload.iid === item.iid
        })
        if (product) {
          context.commit('increase', product)
          resolve(product.count)
        } else {
          reject(product.count)
        }
      })
    },
    _deleteProduct (context, payload) {
      return new Promise((resolve, reject)=> {
        context.commit('deleteProduct',payload.iids)
        resolve('删除成功')
        reject('删除失败')
      })
    }
  },
  modules: {
  }
})
