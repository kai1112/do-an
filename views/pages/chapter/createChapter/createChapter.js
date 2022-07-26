async function createChapter() {
  let title = $("#title").val();
  let content = $("#content").val();
  let id = window.location.href.split("/")[4];
  // console.log(id);
  let data1 = await $.ajax({
    url: `/chapter/${id}/createChapter`,
    type: "POST",
    data: {
      title,
      content,
    },
  });
  console.log(15, data1);
  if (data1.status == 200) {
    console.log("create successful");
    window.location.href = `/manga/${id}/viewdetails`;
  } else {
    console.log("create failed");
  }
}
