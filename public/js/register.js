function submit() {
  let username = $("#username").val();
  let password = $("#password").val();
  let name = $("#name").val();
  let dateOfBirth = $("#dateOfBirth").val();
  let email = $("#email").val();
  console.log(username, password);
  let data = $.ajax({
    url: "user/registers",
    type: "POST",
    data: {
      username,
      password,
      name,
      dateOfBirth,
      email,
    },
  })
    .then((data) => {
      console.log(20, data.status);
      if (data.status == 200) {
        console.log("create successful");
        window.location.href = `/login`;
      }
    })
    .catch((err) => {
      res.json({ err });
    });
}
