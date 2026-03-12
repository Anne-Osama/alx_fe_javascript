/*const quotes = [
  {
    text: "The journey of a thousand miles begins with one step.",
    category: "Motivation",
  },
  {
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    category: "Individuality",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  { text: "The will of man is his happiness.", category: "happiness" },
  {
    text: "All improv turns into anger. All comedy improv basically turns into anger, because that's all people know how to do when they're improvising. If you notice shows that are improvising are generally people yelling at each other.",
    category: "anger",
  },
  {
    text: "Reason is an action of the mind knowledge is a possession of the mind but faith is an attitude of the person. It means you are prepared to stake yourself on something being so.",
    category: "attitude",
  },
];*/

/*function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>${quote.text}</p><p>category: ${quote.category}</p>`;
}
function createAddQuoteForm(quoteText, quoteCategory) {
  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode("Hi there and greetings!");
    newDiv.appendChild(newContent);
    alert("New quote added !");
  } else {
    alert("please add a quote.");
  }
}

function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  createAddQuoteForm(quoteText, quoteCategory);
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
});*/

let container = document.getElementById("quoteDisplay");
let btn = document.getElementById("newQuote");

let quoteArray = [
  {
    text: "The journey of a thousand miles begins with one step.",
    category: "Motivation",
  },
  {
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    category: "Individuality",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  { text: "The will of man is his happiness.", category: "happiness" },
  {
    text: "All improv turns into anger. All comedy improv basically turns into anger, because that's all people know how to do when they're improvising. If you notice shows that are improvising are generally people yelling at each other.",
    category: "anger",
  },
  {
    text: "Reason is an action of the mind knowledge is a possession of the mind but faith is an attitude of the person. It means you are prepared to stake yourself on something being so.",
    category: "attitude",
  },
];

// Function to show a random quote from the array
function showRandomQuote() {
  let randomNum = Math.floor(Math.random() * quoteArray.length);
  container.innerHTML = `"${quoteArray[randomNum].text}" - ${quoteArray[randomNum].category}`;
}

// Ensure event listener is added
btn.addEventListener("click", showRandomQuote);

// Function to show a random quote
function showRandomQuote() {
  const randomNum = Math.floor(Math.random() * quoteArray.length);
  container.innerHTML = `'${quoteArray[randomNum].text}' '${quoteArray[randomNum].category}'`;
}

// Creating the Add Quote Form
function createAddQuoteForm() {
  let container = document.createElement("div");
  container.id = "quoteForm";

  let inputText = document.createElement("input");
  inputText.id = "newQuoteText";
  inputText.type = "text";
  inputText.placeholder = "Enter a new quote";

  let inputCategory = document.createElement("input");
  inputCategory.id = "newQuoteCategory";
  inputCategory.type = "text";
  inputCategory.placeholder = "Enter quote category";

  let addQBtn = document.createElement("button");
  addQBtn.id = "addQuoteButton";
  addQBtn.textContent = "Add Quote";

  container.appendChild(inputText);
  container.appendChild(inputCategory);
  container.appendChild(addQBtn);
  document.body.appendChild(container);

  // Applying the addFunction to the Button
  addQBtn.addEventListener("click", addQuote);
}

// Save Quotes in Local Storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quoteArray));
}

// Load Quotes from Local Storage
function loadQuotes() {
  let savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quoteArray = JSON.parse(savedQuotes);
  }
}

// Function to add a Quote to the array
function addQuote() {
  let inQuote = document.getElementById("newQuoteText").value;
  let inCategory = document.getElementById("newQuoteCategory").value;

  if (inQuote && inCategory) {
    // Add the new quote to the array
    quoteArray.push({ text: inQuote, category: inCategory });

    // Save the updated quotes to local storage
    saveQuotes();

    // Clear the input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Alert the user
    alert("You successfully added a new quote!");

    // Update the category dropdown with the new category
    populateCategories();
  } else {
    alert("You must fill in both the Quote and Category fields.");
  }
}

// Function to export quotes as JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quoteArray, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Add file input for importing JSON
const importInput = document.getElementById("importFile");

importInput?.addEventListener("change", function (event) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    try {
      const importQuotes = JSON.parse(event.target.result);
      quoteArray.push(...importQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Error importing quotes: Invalid JSON format.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
});

// Populate the category filter dropdown with unique categories
function populateCategories() {
  let categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = ""; // Clear existing options

  const uniqueCategories = [
    ...new Set(quoteArray.map((quote) => quote.category)),
  ];

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes by category and display them
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");

  const filteredQuotes =
    selectedCategory === "all"
      ? quoteArray
      : quoteArray.filter((quote) => quote.category === selectedCategory);

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;

    // Save last selected category filter and last displayed quote
    localStorage.setItem("lastFilter", selectedCategory);
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
  } else {
    quoteDisplay.innerHTML = "No quotes available for this category.";
  }
}

// Load last selected category filter from local storage
function loadLastFilter() {
  const lastFilter = localStorage.getItem("lastFilter");
  if (lastFilter) {
    document.getElementById("categoryFilter").value = lastFilter;
    filterQuotes(); // Apply the last selected filter
  }
}

// Initialize
loadQuotes();
populateCategories();
loadLastFilter();
createAddQuoteForm();

if (btn) {
  btn.addEventListener("click", showRandomQuote);
} else {
  console.error("Button with id 'newQuote' not found!");
}
