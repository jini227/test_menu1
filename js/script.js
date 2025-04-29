// 질문 및 사용자의 응답 처리
const questions = [
    { q: "매운 음식이 땡기나요?", key: "spicy" },
    { q: "따뜻한 국물이 좋나요?", key: "soup" },
    { q: "고기가 들어간 음식이 좋나요?", key: "meat" },
    { q: "면 요리를 먹고 싶나요?", key: "noodle" },
    { q: "배부르게 먹고 싶나요?", key: "full" },
    { q: "간편한 식사를 원하나요?", key: "easy" },
    { q: "이색적인 메뉴를 먹고 싶나요?", key: "special" },
    { q: "달콤한 음식이 땡기나요?", key: "sweet" },
    { q: "해산물을 좋아하나요?", key: "seafood" },
    { q: "채식 위주의 음식을 원하나요?", key: "vegetarian" },
    { q: "영양가 높은 음식을 선호하나요?", key: "healthy" },
    { q: "빠르게 준비할 수 있는 음식을 원하나요?", key: "quick" }
];

// 메뉴 조건 데이터 (각 메뉴에 대한 특성 정의 + 카테고리 추가)
const menuConditions = {
    // A 카테고리
    "김치찌개정식": { spicy: true, soup: true, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "A" },
    "된장찌개정식": { spicy: false, soup: true, meat: false, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: false, category: "A" },
    "두부김치": { spicy: false, soup: false, meat: false, noodle: false, full: true, easy: false, special: true, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: false, category: "A" },
    "고등어조림": { spicy: true, soup: true, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: false, category: "A" },

    // B 카테고리
    "샐러드볼": { spicy: false, soup: false, meat: false, noodle: false, full: false, easy: true, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: true, category: "B" },
    "그릭요거트": { spicy: false, soup: false, meat: false, noodle: false, full: false, easy: true, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: true, category: "B" },
    "파스타": { spicy: false, soup: false, meat: true, noodle: false, full: false, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: true, quick: true, category: "B" },
    "서브웨이": { spicy: true, soup: false, meat: true, noodle: false, full: false, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: true, quick: true, category: "B" },
    "과일샐러드": { spicy: false, soup: false, meat: false, noodle: false, full: false, easy: true, special: false, sweet: true, seafood: false, vegetarian: true, healthy: true, quick: true, category: "B" },

    // C 카테고리
    "라면": { spicy: true, soup: true, meat: false, noodle: true, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "C" },
    "만두국": { spicy: false, soup: true, meat: true, noodle: true, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "C" },
    "홍합탕": { spicy: false, soup: true, meat: false, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: false, category: "C" },
    "떡국": { spicy: false, soup: true, meat: true, noodle: true, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "C" },
    "조개찜": { spicy: false, soup: true, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: false, category: "C" },
    "무국": { spicy: false, soup: true, meat: false, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: false, category: "C" },

    // D 카테고리
    "떡볶이": { spicy: true, soup: false, meat: false, noodle: false, full: false, easy: true, special: false, sweet: false, seafood: false, vegetarian: true, healthy: false, quick: true, category: "D" },
    "부대찌개": { spicy: true, soup: true, meat: true, noodle: true, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "D" },
    "갈비찜": { spicy: true, soup: true, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "D" },
    "매운갈비찜": { spicy: true, soup: true, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "D" },
    "오징어볶음": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: true, category: "D" },
    "새우튀김": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: true, category: "D" },

    // E 카테고리
    "삼겹살": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "E" },
    "소고기구이": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "E" },
    "불고기": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "E" },
    "찜닭": { spicy: true, soup: true, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "E" },
    "닭갈비": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "E" },
    "동파육": { spicy: false, soup: true, meat: true, noodle: false, full: true, easy: false, special: true, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "E" },
    "수육": { spicy: false, soup: true, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "E" },
    "육회": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "E" },

    // F 카테고리
    "칼국수": { spicy: false, soup: true, meat: false, noodle: true, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: false, category: "F" },
    "파스타": { spicy: false, soup: false, meat: false, noodle: true, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: true, healthy: false, quick: false, category: "F" },
    "비빔국수": { spicy: true, soup: false, meat: false, noodle: true, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: true, healthy: false, quick: true, category: "F" },
    "짜장면": { spicy: false, soup: false, meat: false, noodle: true, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "F" },
    "카레": { spicy: true, soup: false, meat: false, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "F" },
    "해물파전": { spicy: false, soup: false, meat: false, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: true, category: "F" },
    "장어덮밥": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: true, category: "F" },
    "회덮밥": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: true, category: "F" },

    // G 카테고리
    "샌드위치": { spicy: false, soup: false, meat: true, noodle: false, full: false, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "G" },
    "크로와상": { spicy: false, soup: false, meat: false, noodle: false, full: false, easy: true, special: true, sweet: true, seafood: false, vegetarian: true, healthy: false, quick: true, category: "G" },
    "소세지야채볶음": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "G" },

    // H 카테고리
    "김밥": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "H" },
    "부리또": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "H" },
    "새우볶음밥": { spicy: true, soup: false, meat: false, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "H" },
    "묵은지참치김밥": { spicy: false, soup: false, meat: false, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: true, category: "H" },
    "대왕유부초밥": { spicy: false, soup: false, meat: false, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: true, category: "H" },

    // I 카테고리
    "마라탕": { spicy: true, soup: true, meat: true, noodle: true, full: true, easy: false, special: true, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: false, category: "I" },
    "양배추스테이크": { spicy: false, soup: false, meat: false, noodle: false, full: true, easy: false, special: true, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: false, category: "I" },
    "풍팟퐁커리": { spicy: true, soup: true, meat: true, noodle: false, full: true, easy: false, special: true, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: false, category: "I" },

    // J 카테고리
    "항정살덮밥": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "J" },
    "대창덮밥": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "J" },
    "불고기덮밥": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "J" },
    "제육덮밥": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "J" },
    "닭갈비덮밥": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: true, category: "J" },

    // K 카테고리
    "수제비": { spicy: false, soup: true, meat: false, noodle: true, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: false, category: "K" },
    "수제비와파전": { spicy: false, soup: true, meat: false, noodle: true, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: false, category: "K" },
    "떡볶이와수제비": { spicy: true, soup: true, meat: false, noodle: true, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: true, healthy: false, quick: false, category: "K" },
    "해물파전과수제비": { spicy: false, soup: true, meat: false, noodle: true, full: true, easy: false, special: true, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: false, category: "K" },

    // L 카테고리
    "쭈꾸미": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: true, category: "L" },
    "소불고기덮밥": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: true, category: "L" },
    "떡순튀세트": { spicy: true, soup: true, meat: true, noodle: false, full: true, easy: false, special: true, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: false, category: "L" },
    "해물순두부찌개": { spicy: true, soup: true, meat: true, noodle: false, full: true, easy: false, special: true, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: false, category: "L" },
    "새우소금구이": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: true, category: "L" },

    // M 카테고리
    "낙곱새": { spicy: true, soup: true, meat: true, noodle: true, full: true, easy: false, special: true, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: false, category: "M" },
    "고추잡채": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "M" },
    "오징어순대": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: true, vegetarian: false, healthy: false, quick: false, category: "M" },
    "매운닭발": { spicy: true, soup: false, meat: true, noodle: false, full: true, easy: false, special: false, sweet: false, seafood: false, vegetarian: false, healthy: false, quick: false, category: "M" },
    "치즈떡볶이": { spicy: true, soup: false, meat: false, noodle: false, full: true, easy: true, special: false, sweet: true, seafood: false, vegetarian: true, healthy: false, quick: true, category: "M" },

    // N 카테고리
    "유부초밥": { spicy: false, soup: false, meat: false, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: true, category: "N" },
    "와플대학": { spicy: false, soup: false, meat: false, noodle: false, full: true, easy: true, special: true, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: true, category: "N" },
    "명량핫도그": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: true, category: "N" },
    "그릭요거트": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: true, category: "N" },
    "롯데리아": { spicy: false, soup: false, meat: true, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: true, vegetarian: false, healthy: true, quick: true, category: "N" },
    "라볶이": { spicy: false, soup: false, meat: false, noodle: false, full: true, easy: true, special: false, sweet: false, seafood: false, vegetarian: true, healthy: true, quick: true, category: "N" }
};

// 메뉴 이미지 파일명 맵 (수정된 형식: A(1), A(2) 등)
const menuImageMap = {
    // A
    "김치찌개정식": "1",
    "된장찌개정식": "2",
    "두부김치": "3",
    "고등어조림": "4",

    // B
    "샐러드볼": "1",
    "그릭요거트": "2",
    "파스타": "3",
    "서브웨이": "4",
    "과일샐러드": "5",

    // C
    "라면": "1",
    "만두국": "2",
    "홍합탕": "3",
    "떡국": "4",
    "조개찜": "5",
    "무국": "6",

    // D
    "떡볶이": "1",
    "부대찌개": "2",
    "갈비찜": "3",
    "매운갈비찜": "4",
    "오징어볶음": "5",
    "새우튀김": "6",

    // E
    "삼겹살": "1",
    "소고기구이": "2",
    "불고기": "3",
    "찜닭": "4",
    "동파육": "5",
    "닭갈비": "6",
    "수육": "7",
    "육회": "8",

    // F
    "칼국수": "1",
    "파스타": "2",
    "비빔국수": "3",
    "짜장면": "4",
    "카레": "5",
    "해물파전": "6",
    "장어덮밥": "7",
    "회덮밥": "8",

    // G
    "샌드위치": "1",
    "크로와상": "2",
    "소세지야채볶음": "3",

    // H
    "김밥": "1",
    "부리또": "2",
    "새우볶음밥": "3",
    "묵은지참치김밥": "4",
    "대왕유부초밥": "5",

    // I
    "마라탕": "1",
    "양배추스테이크": "2",
    "풍팟퐁커리": "3",

    // J
    "항정살덮밥": "1",
    "대창덮밥": "2",
    "불고기덮밥": "3",
    "제육덮밥": "4",
    "닭갈비덮밥": "5",

    // K
    "수제비": "1",
    "수제비와파전": "2",
    "떡볶이와수제비": "3",
    "해물파전과수제비": "4",

    // L
    "쭈꾸미": "1",
    "소불고기덮밥": "2",
    "떡순튀세트": "3",
    "해물순두부찌개": "4",
    "새우소금구이": "5",

    // M
    "낙곱새": "1",
    "고추잡채": "2",
    "오징어순대": "3",
    "매운닭발": "4",
    "치즈떡볶이": "5",

    // N
    "유부초밥": "1",
    "와플대학": "2",
    "명량핫도그": "3",
    "그릭요거트": "4",
    "롯데리아": "5",
    "라볶이": "6"
};


// 질문과 사용자 응답 처리
let currentQuestion = 0;
let userPreference = {};

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionText').innerText = q.q;
    document.getElementById('answerBtn0').innerText = "네";
    document.getElementById('answerBtn1').innerText = "아니요";
}

function selectAnswer(index) {
    const key = questions[currentQuestion].key;
    userPreference[key] = (index === 0); // '네' 선택 시 true, '아니요' 선택 시 false
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function calculateMenu() {
    let bestMenu = null;
    let bestScore = -1;

    for (const [menu, conditions] of Object.entries(menuConditions)) {
        let score = 0;
        for (const key in userPreference) {
            if (userPreference[key] === conditions[key]) score++;
        }

        if (score > bestScore) {
            bestScore = score;
            bestMenu = menu;
        }
    }

    return bestMenu;
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    const bestMenu = calculateMenu();
    document.getElementById('menuResult').innerText = '🍽️ ' + bestMenu + ' 🍽️';

    const imageName = menuImageMap[bestMenu];
    const category = menuConditions[bestMenu].category;
    const imageElement = document.getElementById('menuImage');
    imageElement.crossOrigin = "anonymous";
    const imageUrl = imageName ? `images/${category}/${imageName}.png` : null;

    if (imageUrl) {
        imageElement.onload = function () {
            getBackgroundColor(imageElement, function (color) {
                document.getElementById('result').style.backgroundColor = color;
            });
        };
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
    } else {
        imageElement.style.display = 'none';
    }
}

function showAnotherMenu() {
    const bestMenu = calculateMenu();
    const category = menuConditions[bestMenu].category;
    const sameCategoryMenus = Object.keys(menuConditions).filter(menu => menuConditions[menu].category === category && menu !== bestMenu);

    let randomMenu = sameCategoryMenus[Math.floor(Math.random() * sameCategoryMenus.length)];

    document.getElementById('menuResult').innerText = '🍽️ ' + randomMenu + ' 🍽️';

    const imageName = menuImageMap[randomMenu];
    const imageElement = document.getElementById('menuImage');
    imageElement.crossOrigin = "anonymous";
    const imageUrl = imageName ? `images/${category}/${imageName}.png` : null;

    if (imageUrl) {
        imageElement.onload = function () {
            getBackgroundColor(imageElement, function (color) {
                document.getElementById('result').style.backgroundColor = color;
            });
        };
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
    } else {
        imageElement.style.display = 'none';
    }
}

function restartTest() {
    currentQuestion = 0;
    userPreference = {};
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.backgroundColor = '#ffffff';
    loadQuestion();
}

function startTest() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

function getBackgroundColor(image, callback) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const colorCount = {};
    let maxCount = 0;
    let backgroundColor = 'rgb(255, 255, 255)'; // fallback

    const width = canvas.width;
    const height = canvas.height;
    const margin = 20; // 주변부 두께 (픽셀 수)

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (x < margin || x > width - margin || y < margin || y > height - margin) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const color = `${r},${g},${b}`;

                colorCount[color] = (colorCount[color] || 0) + 1;

                if (colorCount[color] > maxCount) {
                    maxCount = colorCount[color];
                    backgroundColor = `rgb(${color})`;
                }
            }
        }
    }

    callback(backgroundColor);
}


window.onload = loadQuestion;
