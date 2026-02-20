const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((res) => displayData(res.data));
};
const wordLoadLesson = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res=>res.json())
    .then(data => displayWord(data.data))
}
const displayWord = (words)=>{
const wordLevelContainer = document.getElementById("word-container")
wordLevelContainer.innerHTML = ""

if(words.length == 0){
 wordLevelContainer.innerHTML = `
 <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla ">
 <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl ">নেক্সট Lesson এ যান</h2>
       </div>
 ` 
}
words.forEach((word)=>{
   
    const card = document.createElement("div")
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-1">
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p class="font-semibold text-xl">${word.pronunciation}</p>
          <div class="text-xl font-medium font-bangla">${word.meaning}</div>
           <div class="flex justify-between items-center">
        <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn "><i class="fa-solid fa-volume-high"></i></button>
        </div>
        </div>
    `
    wordLevelContainer.append(card)
})
}
const displayData = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick = "wordLoadLesson(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book"></i> Lesson - ${lesson.level_no}</button>
        `;

        levelContainer.append(btnDiv)
  }
  console.log(lessons);
};

loadLessons();
