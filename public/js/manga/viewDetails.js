function viewDetailChapter(id) {
  window.location.href = `/chapter/${id}/viewChapter`;
}

function createChapter(id) {
  window.location.href = `/chapter/${id}/createChapter`;
}

function edichapter(id) {
  window.location.href = `/chapter/${id}/editchapter`;
}

async function deleteChapter(id) {
  try {
    let data1 = await $.ajax({
      url: `/chapter/${id}/deleteChapter`,
      type: "DELETE",
      data: {
        id,
      },
    });
    console.log(data1);
  } catch (error) {
    console.log(error);
  }
}
