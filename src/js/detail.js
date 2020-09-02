requirejs.config({
    paths:{
        "jquery":"../lib/jquery-3.4.1.min"
    }
});
define(['jquery','../api/server','./modules/banner'],function($,{getBannerData,getDetailData}
,initBanner){
    var type=location.search.match(/type=([^&]+)/)[1];
    var id =location.search.match(/id=([^&]+)/)[1];
    // console.log(type,id);
    var $detail = $('#detail');
    var $detailGoods =$('#detailGoods');
    getDetailData(type,id).then((res)=>{
        initDeatil(res);
       
    });

    function initDeatil(res){
        var tmp1=`
        <div class="detail_gallery l">
        <div class="detail_gallery_normal">
            <img src="${res.photoNormal}" alt="">
            <span></span>
        </div>
        <div class="detail_gallery_large">
            <img src="${res.photoLarge}" alt="">
        </div>
    </div>
    
    <div class="detail_message l">
        <h2>${res.goodsName}</h2>
        <p>价 格 <span class="detail_message_price">¥${res.goodsPrice}.00</span></p>
        <p>选择颜色
        ${res.chooseColor.map((v,i,a)=>{
            if(i==0){
                return `<span class="detail_message_box active">${v}</span>`;
            }
            else{

            
        return `<span class="detail_message_box">${v}</span>`
            }
        }).join('')}
        
        </p>
    
        </p>
        <div class="detail_message_btn clearfix">
            <div class="detail_message_num l">
                <input type="text" value="1">
                <span>+</span>
                <span>-</span>
            </div>
            <div class="detail_message_cart l"><a href="#">加入购物车</a></div>
            <div class="detail_message_computed l"><a href="#">立即下单</a></div>
        </div>
    </div>
        `;
        var tmp2 =`
         <h3>-- 商品详情 --</h3>
          ${res.goodsInfo.map((v,i,a)=>{
      return`<img src="${v}" alt=""></img>`
          }).join('')}
        `
        $detail.html(tmp1);
        $detailGoods.html(tmp2);
        magifier();
        chooseColorFn();
        changeNumber();
    }
   function magifier(){
       var $detail_gallery_normal = $detail.find('.detail_gallery_normal');
       var $detail_gallery_normal_span = $detail.find('.detail_gallery_normal span');
       var $detail_gallery_large =$detail.find('.detail_gallery_large');
       var $detail_gallery_large_img =$detail.find('.detail_gallery_large img');
       $detail_gallery_normal.hover(function(){
           $detail_gallery_normal_span.show();
           $detail_gallery_large.show();
       },function(){
           $detail_gallery_normal_span.hide();
           $detail_gallery_large.hide();
       }).mousemove(function(ev){
           var L =ev.pageX -$detail_gallery_normal.offset().left
           -$detail_gallery_normal_span.outerWidth()/2;
           var T =ev.pageY -$detail_gallery_normal.offset().top-
           $detail_gallery_normal_span.outerHeight()/2
           if(L<0){
             L=0;
           }
           else if(L>$detail_gallery_normal.outerWidth()-$detail_gallery_normal_span
            .outerWidth()){
                L=$detail_gallery_normal.outerWidth()-$detail_gallery_normal_span
                .outerWidth();
            }
            if(T<0){
                T=0;
              }
              else if(T>$detail_gallery_normal.outerHeight()-$detail_gallery_normal_span
               .outerHeight()){
                   T=$detail_gallery_normal.outerHeight()-$detail_gallery_normal_span
                   .outerHeight();
               }
        $detail_gallery_normal_span.css({
            left:L,
            top:T,
        })
        var scaleX =L/($detail_gallery_normal.outerWidth()-$detail_gallery_normal_span
        .outerWidth());
        var scaleY =T/($detail_gallery_normal.outerHeight()-$detail_gallery_normal_span
        .outerHeight());
        $detail_gallery_large_img.css({
            left: - scaleX * ($detail_gallery_large_img.outerWidth()-$detail_gallery_large.outerWidth()),
            top: - scaleY * ($detail_gallery_large_img.outerHeight()-$detail_gallery_large.outerHeight())
        })
       })
     
   }
   function chooseColorFn(){
       var $detail_message_box =$detail.find('.detail_message_box');
       $detail_message_box.click(function(){
           $(this).addClass('active').siblings().removeClass('active');
       })
   }
   function changeNumber(){
       var $detailnum =$detail.find('.detail_message_num input');
       var $addBtn =$detail.find('.detail_message_num span').eq(0);
       var $reduceBtn =$detail.find('.detail_message_num span').eq(1);
       $addBtn.click(function(){
           var num =Number($detailnum.val())+1;
           $detailnum.val(num);

       })
       $reduceBtn.click(function(){
        var num =Number($detailnum.val())-1;
        if(num<=0){
            return;
        }

        $detailnum.val(num);
    })
        $detailnum.on('input',function(){
            if(!Number($(this).val())){
                $detailnum.val('');
            }
        })
        $detailnum.on('blur',function(){
            if(!Number($(this).val())){
                $detailnum.val(1);
            }
        })

   
   }
})
