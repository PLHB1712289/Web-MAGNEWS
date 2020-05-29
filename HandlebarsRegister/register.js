const registerItem = (handlebars) => {
  handlebars.registerHelper("item", function (item, block) {
    return new handlebars.SafeString(
      '<div class="m-b-30">' +
        `<a href="${item.link}" class="wrap-pic-w hov1 trans-03">` +
        `<img class="lazy" data-src="${item.img}" alt="IMG">` +
        "</a>" +
        '<div class="p-t-20">' +
        '<h5 class="p-b-5">' +
        `<a href="${item.link}" class="f1-m-3 cl2 hov-cl10 trans-03">` +
        `${item.title}` +
        "</a>" +
        "</h5>" +
        '<span class="cl8">' +
        '<a class="f1-s-4 cl8 hov-cl10 trans-03">' +
        item.category +
        "</a>" +
        '<span class="f1-s-3 m-rl-3">' +
        "-" +
        "</span>" +
        '<span class="f1-s-3">' +
        item.time +
        "</span>" +
        "</span>" +
        "</div>" +
        "</div>"
    );
  });
};

const registerItems = (handlebars) => {
  handlebars.registerHelper("items", function (items, block) {
    let str = "";

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      str +=
        '<div class="flex-wr-sb-s m-b-30">' +
        `<a href="${item.link}" class="size-w-1 wrap-pic-w hov1 trans-03">` +
        `<img class="lazy" data-src="${item.img}" alt="IMG">` +
        "</a>" +
        '<div class="size-w-2">' +
        '<h5 class="p-b-5">' +
        `<a href="${item.link}" class="f1-s-5 cl3 hov-cl10 trans-03">` +
        item.title +
        "</a>" +
        "</h5>" +
        '<span class="cl8">' +
        '<a class="f1-s-6 cl8 hov-cl10 trans-03">' +
        item.category +
        "</a>" +
        '<span class="f1-s-3 m-rl-3">' +
        "-" +
        "</span>" +
        '<span class="f1-s-3">' +
        item.time +
        "</span>" +
        "</span>" +
        "</div>" +
        "</div>";
    }

    return new handlebars.SafeString(str);
  });
};

const registerIsDefined = (handlebars) => {
  handlebars.registerHelper("isUnDefined", function (value) {
    return typeof value === "undefined";
  });
};

const registerPageNumber = (handlebars) => {
  handlebars.registerHelper("page", function (items, block) {
    //item = {pageNumber, link, isActive:true or false};
    let str = "";

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.isActive) {
        str += `<a href="${item.link}" class="flex-c-c pagi-item hov-btn1 trans-03 m-all-7 pagi-active">${item.pageNumber}</a>`;
      } else {
        str += `<a href="${item.link}" class="flex-c-c pagi-item hov-btn1 trans-03 m-all-7">${item.pageNumber}</a>`;
      }
    }

    return new handlebars.SafeString(str);
  });
};

const registerComment = (handlebars) => {
  handlebars.registerHelper("comment", function (items, block) {
    //item = {pageNumber, link, isActive:true or false};
    let str = "";
    if (typeof items == "undefined" || items.length == 0) {
      str = "";
    } else {
      str += `<div style="border: 2px groove; border-radius: 3px; padding: 2px; background-color:#dcdcdc">`;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const time = new Date(item.time);
        const timeString = `${time.getHours()}:${time.getMinutes()} - ${time.getDate()}/${
          time.getMonth() + 1
        }/${time.getFullYear()}`;
        str += `<div
								style="margin-bottom: 10px; color: black; border-radius: 2px">
								<span style=" width: 100px">${item.userName}: </span>
								<span style="width: auto; padding">
									${item.msg}
								</span>
								<div style="font-size: 10px;">
									${timeString}
								</div>
							</div>`;
      }

      str += `</div>`;
    }
    return new handlebars.SafeString(str);
  });
};

const registerAll = (handlebars) => {
  registerItem(handlebars);
  registerItems(handlebars);
  registerPageNumber(handlebars);
  registerIsDefined(handlebars);
  registerComment(handlebars);
};

module.exports = registerAll;
