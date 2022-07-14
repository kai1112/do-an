function editManga() {
  let name = $("#name").val();
  let category = $("#category").val();
  let author = $("#author").val();
  let description = $("#description").val();
  let price = $("#price").val();
  let like = 0;
  const id = window.location.href.split("/")[4];
  let data1 = $.ajax({
    url: `/manga/${id}/editManga`,
    type: "POST",
    data: {
      name,
      category,
      author,
      description,
      price,
      like,
    },
  });
  console.log(data1);
}
