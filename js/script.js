// menuImageMap 데이터를 자바스크립트 내에 정의
const menuImageMap = {
    "김치찌개정식": "A_1",
    "된장찌개정식": "A_2",
    "김치찜": "A_3",
    "백반": "A_4",
    "순두부찌개": "B_1",
    "샐러드볼": "B_2",
    "토스트": "B_3",
    "죽": "B_4",
    "과일": "B_5",
    "설렁탕": "C_1",
    "곰탕": "C_2",
    "삼계탕": "C_3",
    "만두국": "C_4",
    "라면": "C_5",
    "쌀국수": "C_6",
    "짬뽕": "D_1",
    "부대찌개": "D_2",
    "매운갈비찜": "D_3",
    "닭볶음탕": "D_4",
    "떡볶이": "D_5",
    "삼겹살": "E_1",
    "닭갈비": "E_2",
    "소고기구이": "E_3",
    "불고기": "E_4",
    "찜닭": "E_5",
    "비빔국수": "F_1",
    "칼국수": "F_2",
    "라멘": "F_3",
    "파스타": "F_4",
    "쫄면": "F_5",
    "샌드위치": "G_1",
    "크로와상": "G_2",
    "스무디": "G_3",
    "요거트볼": "G_4",
    "샐러드": "G_5",
    "금식": "G_6",
    "즉석밥": "H_1",
    "컵라면": "H_2",
    "김밥": "H_3",
    "브리또": "H_4",
    "서브웨이": "H_5",
    "풍팟퐁커리": "I_1",
    "마라탕/샹궈": "I_2",
    "양배추스테이크": "I_3",
    "야끼소바": "I_4",
    "분짜": "I_5"
};

const questions = [
    { q: "매운게 땡기나요?", answers: [{ text: "네", type: "A" }, { text: "아니요", type: "B" }] },
    { q: "따뜻한 국물이 먹고 싶나요?", answers: [{ text: "네", type: "C" }, { text: "아니요", type: "D" }] },
    { q: "고기가 먹고 싶나요?", answers: [{ text: "네", type: "E" }, { text: "아니요", type: "F" }] },
    { q: "배부르게 먹고 싶나요?", answers: [{ text: "네", type: "B" }, { text: "아니요", type: "C" }] },
    { q: "얼큰한 게 좋나요?", answers: [{ text: "네", type: "D" }, { text: "아니요", type: "E" }] },
    { q: "면 요리를 먹고 싶나요?", answers: [{ text: "네", type: "F" }, { text: "아니요", type: "G" }] },
    { q: "오늘은 특별한 음식을 먹고 싶나요?", answers: [{ text: "네", type: "I" }, { text: "아니요", type: "A" }] },
    { q: "간편하게 먹고 싶나요?", answers: [{ text: "네", type: "H" }, { text: "아니요", type: "I" }] }
];

const menuOptions = {
    A: ['김치찌개정식', '된장찌개정식', '김치찜', '백반'],
    B: ['순두부찌개', '샐러드볼', '토스트', '죽', '과일'],
    C: ['설렁탕', '곰탕', '삼계탕', '만두국', '라면', '쌀국수'],
    D: ['짬뽕', '부대찌개', '매운갈비찜', '닭볶음탕', '떡볶이'],
    E: ['삼겹살', '닭갈비', '소고기구이', '불고기', '찜닭'],
    F: ['비빔국수', '칼국수', '라멘', '파스타', '쫄면'],
    G: ['샌드위치', '크로와상', '스무디', '요거트볼', '샐러드', '금식'],
    H: ['즉석밥', '컵라면', '샌드위치', '김밥', '떡볶이', '브리또', '서브웨이'],
    I: ['풍팟퐁커리', '마라탕/샹궈', '양배추스테이크', '야끼소바', '분짜']
};

let currentQuestion = 0;
let typeCount = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0 };
let finalType = "";

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionText').innerText = q.q;
    const buttons = document.querySelectorAll('.button-group button');
    buttons[0].innerText = q.answers[0].text;
    buttons[1].innerText = q.answers[1].text;
}

function selectAnswer(index) {
    const selected = questions[currentQuestion].answers[index].type;
    typeCount[selected]++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    const maxScore = Math.max(...Object.values(typeCount));
    const topTypes = Object.keys(typeCount).filter(type => typeCount[type] === maxScore);
    finalType = topTypes[Math.floor(Math.random() * topTypes.length)];

    showMenu();
}

function showMenu() {
    const menuList = menuOptions[finalType];
    const randomMenu = menuList[Math.floor(Math.random() * menuList.length)];
    document.getElementById('menuResult').innerText = randomMenu;

    // 이미지 보여주기
    const imageName = menuImageMap[randomMenu];  // 이미지 파일명 (예: A_1)
    const imageElement = document.getElementById('menuImage');

    // 이미지 경로 설정 (예: images/A_1.jpg)
    const imageUrl = imageName ? `images/${imageName}.png` : null;

    if (imageUrl) {
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
    } else {
        imageElement.style.display = 'none'; // 이미지가 없으면 숨김
    }
}

function showAnotherMenu() {
    showMenu();
}

function restartTest() {
    currentQuestion = 0;
    typeCount = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0 };
    finalType = "";

    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    loadQuestion();
}

async function startTest() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

window.onload = function () {
    loadQuestion();
};
