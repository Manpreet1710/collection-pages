let letterCloseButton = document.querySelector(".close-button");
let main = document.querySelector(".main");
let tab_container = document.querySelector(".tab_container");
let sortValue;
let sortBool = false;
let theSelect = document.querySelector(".sort-select");
const txtBox = document.querySelector(".txtBox")
let serachBox = document.querySelector(".search-box")
let common_style = document.getElementsByClassName("common_style")
let filtertooltip = document.querySelector(".filter-tooltip")
const formCheckInput = document.querySelectorAll('.form-check-input')

// txtBox.focus()
function showAdvancedToggle() {
  var element = document.querySelector(".advanced-filter");
  element.classList.toggle("advanced-toggle");
  document.querySelector(".results-sidebar-section").style.height = "auto"
}
// if (txtBox.value == "") {
//   document.querySelector(".buttonCommon").disabled = true
//   document.querySelector(".buttonCommon").style.background = "#abb6bc"
// } else {
//   document.querySelector(".buttonCommon").disabled = false
//   document.querySelector(".buttonCommon").style.background = "#b641da"
// }

txtBox.addEventListener("input", ((e) => {
  if (txtBox.value === "") {
    letterCloseButton.classList.remove("ltr-cls-btn-commonPage")
  } else {
    letterCloseButton.classList.add("ltr-cls-btn-commonPage");
  }
  let rangeOfBlankTile = 3
  e.target.value = e.target.value.replace(/[^a-zA-Z? ]/g, "");
  if (rangeOfBlankTile === "") {
    rangeOfBlankTile = 3;
  }
  e.target.value = e.target.value.replace(/ /g, "?");
  let data = [];
  data = e.target.value.split("").filter((i) => i === "?");
  if (data.length > rangeOfBlankTile) {
    e.target.value = e.target.value.replace(/\?$/, "");
  }
}))

Array.from(common_style).forEach((item) => {
  item.addEventListener("input", (e) => {
    if (e.target.value === "") {
      item.nextElementSibling.style.opacity = "0.5"
      item.nextElementSibling.lastElementChild.className = "bi bi-question-circle"
      item.nextElementSibling.setAttribute("data-original-title", item.nextElementSibling.id)
    } else {
      item.nextElementSibling.removeAttribute("data-original-title")
      item.nextElementSibling.style.opacity = "1"
      item.nextElementSibling.lastElementChild.className = "bi bi-x-circle-fill"

      item.nextElementSibling.addEventListener("click", () => {
        e.target.value = ""
        item.nextElementSibling.style.opacity = "0.5"
        item.nextElementSibling.lastElementChild.className = "bi bi-question-circle"
        item.nextElementSibling.setAttribute("data-original-title", item.nextElementSibling.id)
      })
    }
  })
})
letterCloseButton.addEventListener("click", () => {
  txtBox.value = ""
  letterCloseButton.classList.remove("ltr-cls-btn-commonPage")
})

let tabs = document.getElementsByClassName("tab_link");
if (tabs.length > 0) {
  tabs[0] ? tabs[0].classList.add("active-tab") : "";
  // handling of filter on scroll
  window.onscroll = function () {
    var section = document.querySelectorAll(".allGroupWords");
    let new_sections = {};
    Array.prototype.forEach.call(section, function (e) {
      if (document.body.clientWidth > 991) {
        new_sections[e.id] = e.offsetTop - 10;
      } else {
        new_sections[e.id] = e.offsetTop - 10;
      }
    });
    var scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    for (i in new_sections) {
      let sort_val = "alpha";
      if (
        i.split("_")[0] == sort_val &&
        new_sections[i] &&
        new_sections[i] <= scrollPosition
      ) {
        document.querySelector(".active-tab").classList.remove("active-tab");
        var active_now = document.querySelector("#Tab_" + i.split("_")[1]);
        active_now.classList.add("active-tab");
        active_now.scrollIntoView({ block: "nearest" });
      }
    }
  };
}
// Length selector functionlity
let sections = {};
function filterLinks(id) {
  let tabs = document.getElementsByClassName("tab_link");
  tabs[0] ? tabs[0].classList.add("active-tab") : "";

  Array.from(tabs).map((item) => {
    item.classList.remove("active-tab");
  });
  main.innerHTML += ``;
  let activeLetter = event.target;
  activeLetter.classList.add("active-tab");

  var section = document.querySelectorAll(".allGroupWords");
  var sort_val = "alpha";
  Array.prototype.forEach.call(section, function (e) {
    if (document.body.clientWidth > 991) {
      sections[e.id] = e.offsetTop - 10;
    } else {
      sections[e.id] = e.offsetTop - 10;
    }
  });
  document.documentElement.scrollTop = sections[sort_val + "_" + id] + 100;
}
// next && previous functionality
let prev = document.getElementById("prev");
let next = document.getElementById("next");
if (prev) {
  prev.onclick = scroll_Right;
}
if (next) {
  next.onclick = scroll_Left;
}
window.addEventListener("resize", function () {
  scroll_visible();
});
window.addEventListener("scroll", function () {
  scroll_visible();
});
function scroll_visible() {
  let tab_container = document.querySelector("#tab-container");
  if (tab_container) {
    if (tab_container.clientWidth === tab_container.scrollWidth) {
      prev.style.display = "none";
      next.style.display = "none";
    } else {
      prev.style.display = "block";
      next.style.display = "block";
    }
  }
}
scroll_visible();

function scroll_Left() {
  tab_container.scrollLeft += 130;
}
function scroll_Right() {
  tab_container.scrollLeft -= 130;
}

Array.from(formCheckInput).map((item) => {
  item.addEventListener("change", (e) => {
    sortValue = e.target.value
    if (sortValue == "Points") {
      document.getElementsByClassName("checboxSpan")[0].classList.add("checked")
    } else {
      document.getElementsByClassName("checboxSpan")[0].classList.remove("checked")
    }
    if (sortValue == "A-Z") {
      document.getElementsByClassName("checboxSpan")[1].classList.add("checked")
    } else {
      document.getElementsByClassName("checboxSpan")[1].classList.remove("checked")
    }
    if (sortValue == "Z-A") {
      document.getElementsByClassName("checboxSpan")[2].classList.add("checked")
    } else {
      document.getElementsByClassName("checboxSpan")[2].classList.remove("checked")
    }
    let list_word = document.getElementsByClassName("list_word")
    let data = []
    Array.from(list_word).forEach(item => {
      item.removeChild(item.lastElementChild);
      data.push(item.innerHTML.replace(/\s/g, ''))
    })
    if (sortValue == "Z-A") {
      sortBool = "Z-A";
      sortby(sortBool, data);
    } else if (sortValue == "Points") {
      sortBool = "Points";
      sortPointsby(sortBool, data);
    } else {
      sortBool = "A-Z";
      sortby(sortBool, data);
    }
  });
})
theSelect.addEventListener("change", () => {
  sortValue = theSelect[theSelect.selectedIndex].text;
  let list_word = document.getElementsByClassName("list_word")
  let data = []
  Array.from(list_word).forEach(item => {
    item.removeChild(item.lastElementChild);
    data.push(item.innerHTML.replace(/\s/g, ''))
  })
  if (sortValue == "Z-A") {
    sortBool = "Z-A";
    sortby(sortBool, data);
  } else if (sortValue == "Points") {
    sortBool = "Points";
    sortPointsby(sortBool, data);
  } else {
    sortBool = "A-Z";
    sortby(sortBool, data);
  }
});


// sort by aplhabets
function sortby(sortValue, data) {
  if (sortValue === "Z-A") {
    appendData(sortValue, data.reverse())
  }
  else if (sortValue === "A-Z") {
    appendData(sortValue, data.sort())
  }
}
// sorting by points
function sortPointsby(sortValue, data) {
  if (sortValue === "Points") {
    let newArray = [];
    data.map((item) => {
      if (item.length === 1) {
        ok = false;
      } else {
        let ScrabbleLetterScore = ScrabbleScore();
        let points = 0;
        let word = item.replace(/<\/?[^>]+>/gi, '')
        for (let i = 0; i < word.length; i++) {
          points += ScrabbleLetterScore[word[i]] || 0;
        }
        const value = {
          words: item,
          points: points,
        };
        newArray.push(value);
      }
    });
    newArray.sort(function (a, b) {
      return b.points - a.points;
    });
    appendData(sortValue, newArray)
  }
}
function appendData(sortValue, data) {
  main.innerHTML = "";
  let newWordsLength = 0;
  for (let i = 15; i > 0; i--) {
    let newdata
    if (sortValue === "Points") {
      newdata = data.filter((item) => item.words.replace(/<\/?[^>]+>/gi, '').length === i)
    } else {
      newdata = data.filter((item) => item.replace(/<\/?[^>]+>/gi, '').length === i)
    }
    if (newdata.length === 0) {
      main.innerHTML += "";
    } else {
      newWordsLength += newdata.length;
      const result = newdata.map((item) => {
        let ScrabbleLetterScore = ScrabbleScore();
        let points = 0;
        let word
        if (sortValue === "Points") {
          word = item.words.replace(/<\/?[^>]+>/gi, '')
          item = item.words
        } else {
          word = item.replace(/<\/?[^>]+>/gi, '')
        }
        for (let i = 0; i < word.length; i++) {
          points += ScrabbleLetterScore[word[i]] || 0; // for unknown characters
        }
        return `
        <a class="anchor__style" title="Lookup ${item.replace(/<\/?[^>]+>/gi, '')} in Dictionary" target="_blank"
        href="/word-meaning?search=${item.replace(/<\/?[^>]+>/gi, '')}">
        <li class="list_word">
        ${item}
        <span class="points" value="${points}">${points}</span>
        </li>
    </a>
`});
      const params = new URLSearchParams(window.location.search)
      let showmoreHTML = ""
      if (!params.get("filters")) {
        showmoreHTML = `<div class="btn-container">
        <button onclick="showmoreWords(this)" type="button" class="border-0 showmore btn"
          id="${i}">See More Words</button>
      </div>`
      }
      main.innerHTML += `
      <div class="allGroupWords wordlistContainer m-0" id="alpha_${i}">
      <div class="wordListHeading">
      <h3 class="mb-0 lead">${i} Letter Words</h3>
      </div>
      <div class="wordList">
      <ul class="ul list-unstyled">
        ${result.join('')}
        </ul>
        ${showmoreHTML}
      </div>
      </div>
      `
    }
  }
  showMoreLimit()
}
// Scrabble Point Array
const ScrabbleScore = () => {
  let twl06_sowpods = {
    a: 1,
    e: 1,
    i: 1,
    o: 1,
    u: 1,
    l: 1,
    n: 1,
    r: 1,
    s: 1,
    t: 1,
    d: 2,
    g: 2,
    b: 3,
    c: 3,
    m: 3,
    p: 3,
    f: 4,
    h: 4,
    v: 4,
    w: 4,
    y: 4,
    k: 5,
    j: 8,
    x: 8,
    q: 10,
    z: 10,
  };

  let wwfScore = {
    a: 1,
    b: 4,
    c: 4,
    d: 2,
    e: 1,
    f: 4,
    g: 3,
    h: 3,
    i: 1,
    j: 10,
    k: 5,
    l: 2,
    m: 4,
    n: 2,
    o: 1,
    p: 4,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 2,
    v: 5,
    w: 4,
    x: 8,
    y: 3,
    z: 10,
  };

  // if (dictonary === "wwf") {
  //   return wwfScore;
  // } else {
  return twl06_sowpods;
  // }
};

function showMoreLimit() {
  let tableFooter = document.querySelectorAll(".btn-container")
  let showmore = document.querySelectorAll(".showmore");
  for (let i = 0; i < showmore.length; i++) {
    let data_of_button = document.getElementById("alpha_" + showmore[i].getAttribute("id"));
    let final_data = data_of_button.getElementsByClassName("anchor__style");
    if (final_data.length < 50) {
      tableFooter[i].style.display = "none";
    }
  }
}
showMoreLimit()

let data_index = 50;
function showmoreWords(e) {
  let showmore = e.parentElement.children[0];
  let script = document.getElementById("get-value");
  let folderName = script.dataset.foldername;
  let fileName = script.dataset.filename;
  let lang = script.dataset.lang;
  let id = showmore.id;
  document.getElementById(id).innerHTML = `Loading...`;
  let content_area = document
    .getElementById("alpha_" + id)
    .getElementsByClassName("list-unstyled")[0];
  const getSeodata = async () => {
    let URL =
      "/data" + "/" + folderName + "/" + lang + "/" + fileName + ".json";
    const data = await fetch(URL);
    const seoData = await data.json();
    return seoData;
  };
  getSeodata().then((result) => {
    let full_words = [];
    for (let w = 0; w < result.words.length; w++) {
      for (let _i = 0; _i < result.words[w].length; _i++) {
        if (result.words[w][_i].i == id) {
          full_words.push(result.words[w][_i]);
        }
      }
    }
    if (data_index < full_words.length) {
      for (let d = data_index; d < data_index + 50; d++) {
        if (full_words[d] != undefined) {
          $('[data-toggle="tooltip"]').tooltip();
          let li = document.createElement("li");
          li.classList.add("list_word")
          li.innerHTML = `${full_words[d].word}`;

          let div = document.createElement("div");
          div.setAttribute("class", "tool-tip");
          div.setAttribute("data-toggle", "tooltip");
          div.setAttribute("data-placement", "top");
          div.setAttribute("data-original-title", `Lookup ${full_words[d].word.replace(/<\/?[^>]+>/gi, '')} in Dictionary`);

          let span = document.createElement("span");
          span.setAttribute("class", "points");
          span.setAttribute("value", `${full_words[d].points}`);
          span.innerHTML = `${full_words[d].points}`;

          let a = document.createElement("a");
          a.setAttribute("class", "anchor__style");
          a.setAttribute("target", "_blank");
          a.setAttribute(
            "href",
            "/word-meaning?search=" + full_words[d].word.replace(/<\/?[^>]+>/gi, '')
          );

          li.appendChild(span)
          div.appendChild(li)
          a.appendChild(div);
          content_area.appendChild(a);
        }
      }
      document.getElementById(id).innerHTML = `See More Words`;
      data_index += 50;
    } else {
      document.getElementById(id).style.display = "none";
    }
  });
}