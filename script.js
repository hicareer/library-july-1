document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;

    // 페이지 이동 함수
    const goToPage = (targetId, direction) => {
        const currentPage = document.querySelector('.page:not(.hidden)'); // 현재 보이는 페이지
        const targetPage = document.getElementById(targetId);

        if (!targetPage) {
            console.error('Target page not found:', targetId);
            return;
        }

        // 모든 페이지 숨기기 (초기화)
        pages.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('prev'); // 이전 전환 효과 초기화
        });

        // 애니메이션 방향 설정
        if (currentPage && direction) {
            if (direction === 'next') {
                // 다음 페이지로 넘어갈 때, 현재 페이지는 왼쪽으로 슬라이드 아웃 효과를 위해
                // 클래스를 잠시 유지한 후, 바로 hidden 처리
                // 사실상 이 로직에서는 'next'일 때 prev 클래스를 사용하지 않으므로 큰 의미 없음
            } else if (direction === 'prev') {
                targetPage.classList.add('prev'); // 이전 페이지로 갈 때, 도착할 페이지가 왼쪽에서 들어오도록
            }
        }
        
        targetPage.classList.remove('hidden'); // 목표 페이지 보이게 하기

        // 현재 페이지 인덱스 업데이트
        pages.forEach((page, index) => {
            if (page.id === targetId) {
                currentPageIndex = index;
            }
        });
    };

    // 버튼 클릭 이벤트 리스너 설정
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.target;
            let direction = null;

            if (event.target.classList.contains('next-button')) {
                direction = 'next';
            } else if (event.target.classList.contains('prev-button')) {
                direction = 'prev';
            }
            // Page 2의 섹션 버튼들은 'next', 'prev'가 없으므로 direction은 null이 됨 (바로 이동)
            
            goToPage(targetId, direction);
        });
    });

    // CASVE 모델 사례 3가지 (Page 5)의 아코디언 기능은 HTML에서 일반 div로 변경되었으므로,
    // 관련 JavaScript 코드는 이 파일에서 제거합니다.

    // 직업군 토글 기능 (Page 9)
    document.querySelectorAll('.toggle-occupations-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.target;
            const occupationsList = document.getElementById(targetId);

            if (occupationsList) {
                // 다른 직업군 리스트 닫기
                document.querySelectorAll('.occupations-list.show').forEach(openOccupationsList => {
                    if (openOccupationsList.id !== targetId) {
                        openOccupationsList.classList.remove('show');
                    }
                });
                occupationsList.classList.toggle('show');
            }
        });
    });

    // 초기 페이지 설정
    goToPage('page1', null); // 처음 로드될 때는 애니메이션 없이 바로 page1 표시
});
