// تحميل الاقتباسات من localStorage أو استخدام بيانات افتراضية
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success usually comes to those who are too busy to be looking for it.", category: "Success" }
];

// دالة إنشاء الفئات للقائمة
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// عرض الاقتباسات
function displayQuotes(quotesToShow) {
  const container = document.getElementById("quotesContainer");
  container.innerHTML = "";

  quotesToShow.forEach(quote => {
    const div = document.createElement("div");
    div.className = "quote";
    div.textContent = `"${quote.text}" - ${quote.category}`;
    container.appendChild(div);
  });
}

// فلترة الاقتباسات حسب الفئة
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;

  localStorage.setItem("selectedCategory", selectedCategory);

  if (selectedCategory === "all") {
    displayQuotes(quotes);
  } else {
    const filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    displayQuotes(filteredQuotes);
  }
}

// إضافة اقتباس جديد
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (!text || !category) return;

  const newQuote = { text, category };
  quotes.push(newQuote);

  localStorage.setItem("quotes", JSON.stringify(quotes));

  populateCategories();
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}
// دالة افتراضية لمحاكاة جلب الاقتباسات من السيرفر
function fetchQuotesFromServer() {
  // في الواقع، نحن نستخدم localStorage أو بيانات افتراضية
  return quotes;
}
document.addEventListener("DOMContentLoaded", () => {
  quotes = fetchQuotesFromServer(); // جلب الاقتباسات "من السيرفر"
  populateCategories();

  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    document.getElementById("categoryFilter").value = savedCategory;
  }

  filterQuotes();
});

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();

  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    document.getElementById("categoryFilter").value = savedCategory;
  }

  filterQuotes();
});