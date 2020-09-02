requirejs.config({
    paths:{
        "jquery":"../lib/jquery-3.4.1.min"
    }
});


define(['jquery','../api/server','./modules/banner'],function(
    $,{getBannerData,getPhoneData,getPadData,getBookData},initBanner
    ){
    // console.log($)
    getBannerData().then((res)=>{
        initBanner(res)
    });
    getPhoneData().then((res)=>{
       initGoods('#phone',res);
    });
    getPadData().then((res)=>{
        initGoods('#book',res);
     });
     getBookData().then((res)=>{
        initGoods('#pad',res);
     });
    function initGoods(id,res){
         var $elem=$(id);
         var tmp=`
        
        <h2 class="goods_title">${res.title}</h2>
        <ul class="goods_list clearfix">
            ${
                res.goods_list.map((v,i,a)=> {
                    return`
                    <li>
                <a href="/view/detail.html?type=${res.type}&id=${v.goodsId}">
                    <div><img src="${v.goodsImg}" alt=""></div>
                    <h3>${v.goodsName}</h3>
                    <p>${v.goodsPrice}</p>
                </a>
            </li>
                    `
                }).join('').repeat(3)
            }
            </ul>
         `;
         $elem.html(tmp);
    }

})
