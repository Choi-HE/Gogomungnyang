document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // 폼의 기본 제출 동작을 막습니다. (실제 서버로 보내는 것을 막음)

      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");

      // 임시로 가입시켜놓은 회원정보들
      const members = [
        { username: "aaa", password: "1111" },
        { username: "bbb", password: "2222" },
        { username: "ccc", password: "3333" },
      ];

      const inputUsername = usernameInput.value.trim();
      const inputPassword = passwordInput.value.trim();

      let idLogin = false;
      let pwLogin = false;
      for (const member of members) {
        for (const element in member) {
          if (inputUsername === member[element]) {
            idLogin = true;
          }
          if (inputPassword === member[element]) {
            pwLogin = true;
          }
        }
        if (idLogin === true && pwLogin === true) {
          alert("로그인 성공");
          break;
        }
      }
      if (!(idLogin === true && pwLogin === true)) {
        alert("로그인 실패");
      }
      // 실제 로그인을 위해서는 여기에 서버로 데이터를 보내는 코드가 필요합니다.
      // 예를 들어 fetch API나 XMLHttpRequest를 사용할 수 있습니다.
      //   alert(`아이디: ${username}\n비밀번호: ******\n(실제 로그인 처리는 백엔드에서!)`);

      // 로그인 시도 후 입력 필드 초기화 (선택 사항)
      // loginForm.reset();
    });
  }
});
