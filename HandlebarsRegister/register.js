const registerItem = (handlebars) =>{
    handlebars.registerHelper('item', function(item, block) {
        return new handlebars.SafeString(
            '<div class="m-b-30">' +
				`<a href="${item.link}" class="wrap-pic-w hov1 trans-03">`+
					`<img class="photo-lazy" data-src="${item.img}" alt="IMG">`+
				'</a>'
                +
				'<div class="p-t-20">'+
					'<h5 class="p-b-5">'+
						`<a href="${item.link}" class="f1-m-3 cl2 hov-cl10 trans-03">`+
							`${item.title}`+
						'</a>'+
					'</h5>'+

					'<span class="cl8">'+
						'<a href="#" class="f1-s-4 cl8 hov-cl10 trans-03">'+
							'Music'+
						'</a>'+

						'<span class="f1-s-3 m-rl-3">'+
							'-'+
						'</span>'+

						'<span class="f1-s-3">'+
							'Feb 18'+
						'</span>'+
					'</span>'+
				'</div>'+
			'</div>'
            );
      });
}

const registerItems = (handlebars)=>{
    

    handlebars.registerHelper('items', function(items, block){
        let str = '';

        for(let i = 0; i < items.length; i++){
            const item = items[i];
            str +=
            '<div class="flex-wr-sb-s m-b-30">'
            +
            `<a href="${item.link}" class="size-w-1 wrap-pic-w hov1 trans-03">`
            +
                `<img class="photo-lazy" data-src="${item.img}" alt="IMG">`
            +
            '</a>'
            +
            '<div class="size-w-2">'
            +
                '<h5 class="p-b-5">'
            +
                    `<a href="${item.link}" class="f1-s-5 cl3 hov-cl10 trans-03">`
            +
                        item.title
            +
                    '</a>'
            +
                '</h5>'
            +
                '<span class="cl8">'
            +
                    '<a href="#" class="f1-s-6 cl8 hov-cl10 trans-03">'
            +
                        'Celebrity'
            +
                    '</a>'
            +
                    '<span class="f1-s-3 m-rl-3">'
            +
                        '-'
            +
                    '</span>'
            +
                    '<span class="f1-s-3">'
            +
                        'Feb 12'
            +
                    '</span>'
            +
                '</span>'
            +
            '</div>'
            +
            '</div>';
        }

        return new handlebars.SafeString(str);
    });
}



module.exports = {registerItem, registerItems};


