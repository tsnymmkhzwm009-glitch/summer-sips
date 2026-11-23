// بيانات المشروبات الصيفية
const drinksData = [
    {
        id: 1,
        name: "عصير مانجو استوائي",
        ingredients: "مانجو، برتقال، أناناس، عسل، ثلج",
        type: "fruit-juice",
        image: "https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 2,
        name: "موكتيل التوت الأزرق",
        ingredients: "توت أزرق، نعناع، ليمون، ماء ورد، صودا",
        type: "mocktail",
        image: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 3,
        name: "سموثي فراولة موز",
        ingredients: "فراولة، موز، زبادي، حليب لوز",
        type: "smoothie",
        image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        name: "مثلجات الليمون بالنعناع",
        ingredients: "ليمون، نعناع طازج، سكر، ماء، ثلج مجروش",
        type: "ice-cream",
        image: "https://images.pexels.com/photos/933497/pexels-photo-933497.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 5,
        name: "عصير بطيخ منعش",
        ingredients: "بطيخ أحمر، نعناع، ليمون، ثلج",
        type: "fruit-juice",
        image: "https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 6,
        name: "موكتيل جوز الهند والأناناس",
        ingredients: "حليب جوز هند، أناناس، فانيليا",
        type: "mocktail",
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

let currentFilter = "all";

// عرض المشروبات
function renderDrinks(filter = "all") {
    const container = document.getElementById("drinksContainer");
    if (!container) return;

    let filteredDrinks = drinksData;
    if (filter !== "all") {
        filteredDrinks = drinksData.filter(drink => drink.type === filter);
    }

    if (filteredDrinks.length === 0) {
        container.innerHTML = `<div class="no-results">😢 لا توجد مشروبات في هذا التصنيف</div>`;
        return;
    }

    const drinksHTML = filteredDrinks.map(drink => `
        <div class="drink-card" data-id="${drink.id}">
            <img class="drink-img" src="${drink.image}" alt="${drink.name}" loading="lazy">
            <div class="drink-info">
                <h3 class="drink-name">${drink.name}</h3>
                <p class="drink-ingredients"><i class="fas fa-blender"></i> ${drink.ingredients}</p>
                <span class="drink-type">${getTypeName(drink.type)}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = drinksHTML;
}

// تحويل النوع إلى نص عربي
function getTypeName(type) {
    const types = {
        "fruit-juice": "🍹 عصير فواكه",
        "mocktail": "🍸 موكتيل",
        "smoothie": "🥤 Smoothie",
        "ice-cream": "🍧 مثلجات"
    };
    return types[type] || type;
}

// مشروب عشوائي
function randomDrink() {
    const randomIndex = Math.floor(Math.random() * drinksData.length);
    const drink = drinksData[randomIndex];
    alert(`🍹 مشروب اليوم: ${drink.name}\n🥄 المكونات: ${drink.ingredients}`);
}

// فلتر نشط
function setupFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-filter");
            renderDrinks(currentFilter);
        });
    });
}

// وضع مظلم/فاتح
function setupDarkMode() {
    const themeBtn = document.getElementById("themeToggle");
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
        document.body.classList.add("dark-mode");
        themeBtn.innerHTML = '<i class="fas fa-sun"></i> الوضع الفاتح';
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const darkNow = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", darkNow);
        themeBtn.innerHTML = darkNow ? '<i class="fas fa-sun"></i> الوضع الفاتح' : '<i class="fas fa-moon"></i> الوضع المظلم';
    });
}

// تهيئة الصفحة
document.addEventListener("DOMContentLoaded", () => {
    renderDrinks("all");
    setupFilters();
    setupDarkMode();

    const randomBtn = document.getElementById("randomBtn");
    if (randomBtn) randomBtn.addEventListener("click", randomDrink);
});