function login() {
  let username = $("#username").val();
  let password = $("#password").val();
  // console.log(username, password);
  $.ajax({
    url: "/user/login",
    type: "POST",
    data: {
      username,
      password,
    },
  })
    .then((data) => {
      if (data.status == 200) {
        window.localStorage.setItem("userid", data.userid);
        window.location.href = "user/viewAllUsers";
      }
    })
    .catch((err) => {
      res.json({ err });
    });
}
