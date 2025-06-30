document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    let currentPageIndex = 0;

    // 페이지 이동 함수
    const goToPage = (targetId, direction) => {
        const currentPage = pages[currentPageIndex];
        const targetPage = document.getElementById(targetId);

        if (!targetPage) {
            console.error('Target page not found:', targetId);
            return;
        }

        // Determine the animation direction
        if (direction === 'next') {
            currentPage.classList.add('hidden'); // Current page slides out to right
            currentPage.classList.remove('prev'); // Ensure no prev class
        } else if (direction === 'prev') {
            currentPage.classList.add('hidden');
            currentPage.classList.add('prev'); // Current page slides out to left
        } else { // Direct jump (e.g., from page 2 buttons)
            pages.forEach(page => page.classList.add('hidden'));
        }

        targetPage.classList.remove('hidden');
        targetPage.classList.remove('prev'); // Ensure target page is not marked for prev transition

        // Update current page index
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

            goToPage(targetId, direction);
        });
    });

    // 아코디언 기능 (Page 5)
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            // 다른 아코디언 닫기
            document.querySelectorAll('.accordion-content.show').forEach(openContent => {
                if (openContent !== content) {
                    openContent.classList.remove('show');
                }
            });
            content.classList.toggle('show');
        });
    });

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
    goToPage('page1', null);
});
