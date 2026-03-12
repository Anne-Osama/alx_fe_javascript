let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal.", category: "Success" }
];

function populateCategories() {

  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  // استخراج الفئات باستخدام map
  const categories = [...new Set(quotes.map(quote => quote.category))];

  categories.forEach(category => {

    const option = document.createElement("option");

    option.value = category;

    option.textContent = category;

    categoryFilter.appendChild(option);

  });

}

function displayQuotes(quotesToShow) {

  const container = document.getElementById("quotesContainer");

  container.innerHTML = "";

  quotesToShow.forEach(quote => {

    const div = document.createElement("div");

    div.textContent = `"${quote.text}" - ${quote.category}`;

    container.appendChild(div);

  });

}

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

function addQuote() {

  const text = document.getElementById("newQuoteText").value;

  const category = document.getElementById("newQuoteCategory").value;

  if (!text || !category) return;

  const newQuote = { text, category };

  quotes.push(newQuote);

  localStorage.setItem("quotes", JSON.stringify(quotes));

  populateCategories();

  filterQuotes();

}

document.addEventListener("DOMContentLoaded", () => {

  populateCategories();

  const savedCategory = localStorage.getItem("selectedCategory");

  if (savedCategory) {

    document.getElementById("categoryFilter").value = savedCategory;

  }

  filterQuotes();

});