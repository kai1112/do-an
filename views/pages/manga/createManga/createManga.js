async function createManga() {
  let name = $("#name").val();
  let category = $("#category").val();
  let author = $("#author").val();
  let description = $("#description").val();
  let price = $("#price").val();
  let like = 0;
  const form = $("form")[0];
  const formData = new FormData(form);
  // console.log(form);
  // console.log(name, category, author, description, price);
  if (name.length > 5) {
    let data1 = await $.ajax({
      url: "/manga/createManga",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
    });
    console.log(20, data1);
    if (data1.status == 200) {
      console.log("create successful");
      window.location.href = `/manga/viewAllManga`;
    }
  } else {
    alert("nhap name lon hon 5");
  }
  // console.log(data1);
}
