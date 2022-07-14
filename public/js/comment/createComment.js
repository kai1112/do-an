async function addComment(id) {
  let comment = $("#comments").val();
  console.log(comment);
  console.log(id);
  let chapterId = id;
  let data1 = await $.ajax({
    url: "/comment/createComment",
    type: "POST",
    data: {
      comment,
      chapterId,
    },
  });
  // alert("create successful");
  console.log(15, data1);
  if (data1.status == 200) {
    console.log("create successful");
    window.location.href = `/chapter/${id}/viewChapter`;
  } else {
    console.log("create failed");
  }
}
