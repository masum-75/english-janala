// =======================
// Create Synonym Elements
// =======================
const createElement = (arr) => {
  if (!arr || arr.length === 0) {
    return `<span class="text-gray-400">No synonyms found</span>`;
  }
  return arr.map(el => `<span class="btn">${el}</span>`).join(" ");
};


// =======================
// Load All Lessons
// =======================
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(res => displayData(res.data));
};


// =======================
// Spinner Control (FIXED)
// =======================
const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const wordContainer = document.getElementById("word-container");

  if (status === true) {
    spinner.classList.remove("hidden");
    wordContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    wordContainer.classList.remove("hidden");
  }
};


// =======================
// Remove Active Button
// =======================
const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach(btn => btn.classList.remove("active"));
};


// =======================
// Load Words By Lesson
// =======================
const wordLoadLesson = (id) => {
  manageSpinner(true);

  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(data => {
      removeActive();

      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      if (clickBtn) clickBtn.classList.add("active");

      displayWord(data.data);
    });
};


// =======================
// Load Word Details (Modal)
// =======================
const loadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};


// =======================
// Show Word Details
// =======================
const displayWordDetails = (word) => {

  const wordDetails = document.getElementById("details-container");

  wordDetails.innerHTML = `
    <div>
      <h2 class="font-bold text-2xl">
        ${word.word} 
        (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation || "N/A"})
      </h2>
    </div>

    <div>
      <h2 class="font-bold">Meaning</h2>
      <p class="text-xl font-bangla">${word.meaning || "No meaning found"}</p>
    </div>

    <div>
      <h2 class="font-bold">Sentence</h2>
      <p class="text-medium">${word.sentence || "No sentence available"}</p>
    </div>

    <div>
      <h2 class="font-bold">Synonyms</h2>
      <div>${createElement(word.synonyms)}</div>
    </div>
  `;

  document.getElementById("word_modal").showModal();
};


// =======================
// Display Word Cards
// =======================
const displayWord = (words) => {

  const wordLevelContainer = document.getElementById("word-container");
  wordLevelContainer.innerHTML = "";

  if (!words || words.length === 0) {
    wordLevelContainer.innerHTML = `
      <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach(word => {

    const card = document.createElement("div");

    card.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-2">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold text-xl">${word.pronunciation || ""}</p>
        <div class="text-xl font-medium font-bangla">${word.meaning || ""}</div>

        <div class="flex justify-between items-center mt-4">
          <button onclick="loadDetails(${word.id})" class="btn">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <button class="btn">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;

    wordLevelContainer.append(card);
  });

  manageSpinner(false);
};


// =======================
// Display Lesson Buttons
// =======================
const displayData = (lessons) => {

  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach(lesson => {

    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
      <button 
        id="lesson-btn-${lesson.level_no}" 
        onclick="wordLoadLesson(${lesson.level_no})" 
        class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book"></i> 
        Lesson - ${lesson.level_no}
      </button>
    `;

    levelContainer.append(btnDiv);
  });
};


// =======================
// Initial Call
// =======================
loadLessons();