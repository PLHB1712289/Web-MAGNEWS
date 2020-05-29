// document.getElementById("share-button").addEventListener("click", function () {
//   FB.ui(
//     {
//       method: "feed",
//       link: "https://developers.facebook.com/docs/",
//     },
//     function (response) {}
//   );
// });

document.getElementById("status-button").addEventListener("click", function () {
  FB.getLoginStatus(function (response) {
    //statusChangeCallback(response);
    console.log(response);
  });
});
