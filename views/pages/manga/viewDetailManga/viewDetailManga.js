function viewDetailChapter(id) {
  window.location.href = `/chapter/${id}/viewChapter`;
}

function createChapter(id) {
  window.location.href = `/chapter/${id}/createChapter`;
}

function edichapter(id) {
  window.location.href = `/chapter/${id}/editchapter`;
}

async function addFollow(id) {
  console.log(id);
  let MangaId = window.location.href.split("/")[4];
  if (id === "") {
    try {
      let data1 = await $.ajax({
        url: "/library/createLibrary",
        type: "POST",
        data: {
          MangaId,
        },
      });
      console.log(data1);
      console.log("create successful");
      window.location.href = `/manga/${MangaId}/viewdetails`;
    } catch (error) {
      console.log(error);
      console.log("create failed");
    }
  } else {
    try {
      let data1 = await $.ajax({
        url: "/library/deleteLibrary",
        type: "Delete",
        data: {
          id,
        },
      });
      console.log(data1);
      console.log("deleteLibrary successful");
      window.location.href = `/manga/${MangaId}/viewdetails`;
    } catch (error) {
      console.log(error);
      console.log("deleteLibrary failed");
    }
  }

  // alert("create successful");
  // console.log(15, data1);
}

async function deleteChapter(id) {
  let mangaId = window.location.href.split("/")[4];
  try {
    let data1 = await $.ajax({
      url: `/chapter/${id}/deleteChapter`,
      type: "DELETE",
      data: {
        id,
      },
    });
    // console.log(data1);
    window.location.href = `/manga/${mangaId}/viewdetails`;
  } catch (error) {
    console.log(error);
  }
}
