function editChapter() {
  let title = $("#title").val();
  let content = $("#content").val();
  console.log(title, content);
  let id = window.location.href.split("/")[4];
  console.log(id);
  let data1 = $.ajax({
    url: `/chapter/${id}/editChapter`,
    type: "POST",
    data: {
      title,
      content,
    },
  });
}
