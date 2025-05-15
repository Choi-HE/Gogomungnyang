document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("PersonalForm");
  const searchPostcodeBtn = document.getElementById("searchPostcodeBtn"); // 우편번호 찾기 버튼

  // 우편번호 찾기 버튼 이벤트 리스너
  if (searchPostcodeBtn) {
    searchPostcodeBtn.addEventListener("click", function () {
      new daum.Postcode({
        oncomplete: function (data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let addr = ""; // 주소 변수
          let extraAddr = ""; // 참고항목 변수

          // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraAddr !== "") {
              extraAddr = " (" + extraAddr + ")";
            }
            // 조합된 참고항목을 주소 필드 뒤에 넣을 수도 있고, 여기서는 일단 변수에만 저장.
            // document.getElementById("address").value += extraAddr;
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById("postcode").value = data.zonecode; // 우편번호 (5자리)
          document.getElementById("address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("detailAddress").focus();
        },
      }).open();
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const usernameInput = document.getElementById("username");
      const nicknameInput = document.getElementById("nickname");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("Confirmationpassword");
      const emailInput = document.getElementById("email");
      const birthdateInput = document.getElementById("birthdate");
      // 주소 관련 필드 가져오기
      const postcode = document.getElementById("postcode").value.trim();
      const address = document.getElementById("address").value.trim();
      const detailAddress = document.getElementById("detailAddress").value.trim();
      // ---
      const nameInput = document.getElementById("name");
      const agreeTermsCheckbox = document.getElementById("agreeTerms");

      const username = usernameInput.value.trim();
      const nickname = nicknameInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();
      const email = emailInput.value.trim();
      const name = nameInput.value.trim();
      const birthdate = birthdateInput.value.trim();
      const agreedToTerms = agreeTermsCheckbox.checked;

      // --- 기본 유효성 검사 ---
      // 주소 필드도 필수 항목으로 간주한다면 검사에 추가
      if (
        username === "" ||
        password === "" ||
        confirmPassword === "" ||
        email === "" ||
        name === "" ||
        birthdate === "" ||
        postcode === "" ||
        address === ""
      ) {
        alert("우편번호와 주소를 포함한 모든 필수 항목을 입력해주세요.");
        return;
      }

      // (기존 아이디, 비밀번호, 이메일, 약관 동의 유효성 검사 로직은 동일하게 유지)
      if (username.length < 4 || username.length > 15) {
        alert("아이디는 4자 이상 15자 이하로 입력해주세요.");
        usernameInput.focus();
        return;
      }
      if (nickname.length < 4 || nickname.length > 12) {
        alert("닉네임은 4자 이상 12자 이하로 입력해주세요.");
        nicknameInput.focus();
        return;
      }

      if (password.length < 8) {
        alert("비밀번호는 8자 이상으로 입력해주세요.");
        passwordInput.focus();
        return;
      }

      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
        confirmPasswordInput.value = "";
        confirmPasswordInput.focus();
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("유효한 이메일 주소를 입력해주세요.");
        emailInput.focus();
        return;
      }

      if (!agreedToTerms) {
        alert("이용약관에 동의해주세요.");
        return;
      }
      // --- 유효성 검사 통과 ---

      console.log("회원가입 정보:");
      console.log("아이디:", username);
      console.log("닉네임:", nickname);
      console.log("비밀번호:", password);
      console.log("이메일:", email);
      console.log("이름:", name);
      console.log("생년월일:", birthdate);
      console.log("우편번호:", postcode);
      console.log("주소:", address);
      console.log("상세주소:", detailAddress);
      console.log("약관동의:", agreedToTerms);

      const userData = {
        username: username,
        nickname: nickname,
        password: password,
        email: email,
        name: name,
        birthdate: birthdate,
        postcode: postcode,
        address: address,
        detailAddress: detailAddress,
        agreedToTerms: agreedToTerms,
      };

      const userJson = JSON.stringify(userData);
      console.log("회원정보 JSON: " + userJson);

      //   alert(`회원가입 시도: 아이디 - ${username}, 주소: ${address} ${detailAddress}`);

      // 여기에 백엔드 API로 회원가입 정보를 보내는 코드가 들어갑니다.
      // 주소 정보도 함께 전송
      // 예: fetch('/api/signup', {
      //         method: 'POST',
      //         body: JSON.stringify({ username, password, email, name, postcode, address, detailAddress }),
      //         headers: {'Content-Type': 'application/json'}
      //     })
      //     .then(response => response.json())
      //     // ... (이후 로직은 이전과 동일)
    });
  }
});
