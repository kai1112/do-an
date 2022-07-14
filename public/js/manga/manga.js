function editManga(id) {
  window.location.href = `/manga/${id}/editManga`;
}

function viewManga(id) {
  window.location.href = `/manga/${id}/viewdetails`;
}

function deleteManga(id) {
  let data1 = $.ajax({
    url: `/manga/${id}/deleteManga`,
    type: "DELETE",
    data: {
      id,
    },
  });
  console.log(data1);
}
