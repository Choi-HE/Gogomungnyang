document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // 폼의 기본 제출 동작을 막습니다. (실제 서버로 보내는 것을 막음)

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (username === '') {
                alert('아이디를 입력해주세요.');
                usernameInput.focus();
                return;
            }

            if (password === '') {
                alert('비밀번호를 입력해주세요.');
                passwordInput.focus();
                return;
            }

            // 실제 로그인을 위해서는 여기에 서버로 데이터를 보내는 코드가 필요합니다.
            // 예를 들어 fetch API나 XMLHttpRequest를 사용할 수 있습니다.
            alert(`아이디: ${username}\n비밀번호: ******\n(실제 로그인 처리는 백엔드에서!)`);

            // 로그인 시도 후 입력 필드 초기화 (선택 사항)
            // loginForm.reset();
        });
    }
});