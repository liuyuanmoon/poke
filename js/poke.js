$(function(){
    let poke=[];
    let colorarr=[`s`,`h`,`d`,`c`];
    let flag={};
    for(let i =0;i<52;i++){
       let number = Math.round(Math.random()*12+1);
       let index = Math.floor(Math.random()*colorarr.length);
        let color = colorarr[index];
        if(flag[color+`_`+number]){
             number = Math.round(Math.random()*12+1);
             index = Math.floor(Math.random()*colorarr.length);
             color = colorarr[index];
        }
        poke.push({color,number});
        flag[color+`_`+ number]=true;
    }
    console.log(poke);
   ////////////////////////////////////////发牌////////////////////////////////////////////////
    let index = -1;
    for(let i = 0;i<7;i++){
        for(let j = 0;j<=i;j++){
            index++;
            let obj=poke[index];
            let lefts=350-50*i+100*j,tops=50*i;
            $(`<div>`)
                .addClass(`poke`)
                .css({backgroundImage: `url(./imgs/${obj.number}${obj.color}.jpg`})
                .data(`number`,obj.number)
                .appendTo('.box')
                .attr(`id`,i+`_`+j)
                .delay(index*100)
                .animate({left:lefts,top:tops,opacity:1})
        }
    }
    for(;index<52;index++){
        let obj=poke[index];
        $(`<div>`)
            .addClass(`poke left`)
            .css({backgroundImage: `url(./imgs/${obj.number}${obj.color}.jpg`})
            .attr(`id`,`-2_-2`)
            .data(`number`,obj.number)
            .appendTo('.box')
            .delay(index*100)
            .animate({left:10,top: 470,opacity:1})
    }
    let first=null;
    $(`.box`).on(`click`,`.poke`,function(){
        let _this=$(this);
        let [i,j]=_this.attr('id').split('_');
        let id1=i*1+1+`_`+j*1,id2=i*1+1+`_`+j*1+1;
        if($(`#`+id1).length||$(`#`+id2).length){
            return ;
        }

        if(_this.hasClass(`active`)){
            _this.removeClass(`active`).animate({top:`+=30px`})
        }else{
            _this.addClass(`active`).animate({top:`-=30px`})
        }


        if(!first){
            first=_this;
        }else{
            let number1=first.data(`number`),number2=_this.data(`number`);
            if(number1+number2===14){
                $(`.active`).animate({top:0,left:710,opacity:1},function () {
                    $(this).remove();
                })

            }else{
                $(`.active`).animate({top:`+=30px`},function () {
                    $(this).removeClass(`active`);
                })
            }
            first=null;
        }
    });
let n=0;
$(`.rightbtn`).on(`click`,function(){
    $(`.left`).last().css(`zIndex`,n++).animate({left:700},function(){
        $(this).removeClass(`left`).addClass(`right`)
    })
});
$(`.leftbtn`).on(`click`,function(){
        $(`.right`).last().css(`zIndex`,n--).animate({left:10},function(){
            $(this).removeClass(`right`).addClass(`left`)
        })
    })
});