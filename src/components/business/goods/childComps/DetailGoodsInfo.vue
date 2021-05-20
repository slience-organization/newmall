<template>
  <div id="goodsInfo" v-if="Object.keys(detailGoodsInfo).length!=0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailGoodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailGoodsInfo.detailImage[0].key}}</div>
    <div id="info-list" class="info-list" v-for="(item, index) in detailGoodsInfo.detailImage[0].list" :key="index">
      <img v-lazy="item"  alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailGoodsInfo: {
        type: Object,
        default () {
          return { }
        }
      }
    },
    data () {
      return {
        ImgsArr: [],
      }
    },
    updated() {
      if(this.detailGoodsInfo){
        this.imgs = this.detailGoodsInfo.detailImage[0].list
        let imgH = []
        for (let i of this.imgs) {
            let images = new Image()
            images.src = i
            images.onload = function() {
              imgH.push(images.height/2)
            }
        }
        this.preloadImgH = imgH
      }
    },
    methods: {
      preLoadImg () {
        this.$nextTick(()=> {
          this.infoChildWrap = document.getElementsByClassName("info-list")[0]
          console.log(this.infoChildWrap)
          this.imgsArr = this.detailGoodsInfo.detailImage[0].list
          //console.log(this.imgsArr)
          
          let preloadImgH = []
          var that = this
          let images = new Image()
          this.imgsArr.forEach((i) => {
            //console.log(i)
            images.src = i
            
            images.addEventListener("load", (e)=>{
              that.preloadImgH.push(images.height/2)
              if(this.preloadImgH.length === this.imgsArr.length) {
                that.infoChildWrap.appendChild(images)
                this.childrenArr = that.infoChildWrap.children
                for (let i = 0; i < this.childrenArr.length; i++) {
                  this.imgWrapHeight.push(this.childrenArr[i].offsetHeight);
                }
                console.log(this.imgWrapHeight)
                console.log(document.getElementById('info-list').clientHeight)
              }else{

              }
            })
          })
          //console.log(this.preloadImgH)
        })
      }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
