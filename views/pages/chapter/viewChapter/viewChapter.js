async function addComment(id) {
  let comment = $("#comments").val();
  // console.log(comment);

  // console.log(id);
  let chapterId = id;
  let data1 = await $.ajax({
    url: "/comment/createComment",
    type: "POST",
    data: {
      comment,
      chapterId,
    },
  });
  // console.log(15, data1);
  if (data1.status == 200) {
    console.log("create successful");
    window.location.href = `/chapter/${id}/viewChapter`;
  } else {
    console.log("create failed");
  }
}

async function addReaction(commentID) {
  // console.log(id);
  let chapterID = window.location.href.split("/")[4];
  // if (userID == "") {
  try {
    let data1 = await $.ajax({
      url: "/chapter/createReaction",
      type: "POST",
      data: {
        commentID,
      },
    });
    console.log(data1);
    console.log("create successful");
    window.location.href = `/chapter/${chapterID}/viewChapter`;
  } catch (error) {
    console.log(error);
    console.log("create failed");
  }
}

async function paginationChapter(page, limit, id) {
  try {
    const data = await $.ajax({
      url: `/chapter/${id}/paginationChapter?page=${page}&limit=${limit}`,
      type: "GET",
    });
    window.location.href = `/chapter/${id}/viewChapter`;
  } catch (error) {
    console.log(error);
  }
}

// socket io cos thoi gian se lam them
// const socket = io();

// socket.on("socket-test", function (data) {
//   console.log(data);
// });
