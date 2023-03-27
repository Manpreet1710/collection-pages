
const form = document.getElementById("form")
const input = document.querySelector(".txtBox")
const startsWith = document.getElementById('startsWith')
const endsWith = document.getElementById('endsWith')
const wordLength = document.querySelector('.wordLength')
const consonants = document.querySelector(".consonants")
const getScript = document.currentScript
const pageLengthValue = getScript.dataset.length
const consonentsLength = getScript.dataset.consonantentlen
const params = new URLSearchParams(window.location.search)
let serachValue = params.get("search")
let prefixValue = params.get('prefix')
let suffixValue = params.get('suffix')
let lengthValue = params.get('length')
let letterlengths = params.get("letterlength")
let consonantsValue = params.get("consonants")
let wordCount = document.querySelector('.wordCount')
let errorMsg = document.querySelector('.errorMsg')
let option

if (pageLengthValue) {
    document.querySelector(".tab_link_wrapper").style.display = "none"
}
for (var i = 0; i < wordLength.options.length; i++) {
    option = wordLength.options[i];
    if (option.value == pageLengthValue) {
        option.setAttribute('selected', true);
    }
}
let option2
for (var i = 0; i < consonants.options.length; i++) {
    option2 = consonants.options[i];
    if (option2.value == consonentsLength) {
        option2.setAttribute('selected', true);
    }
}

if (serachValue || serachValue == "") {
    input.value = serachValue
}
if (prefixValue || prefixValue == "") {
    startsWith.value = prefixValue
}
if (suffixValue || suffixValue == "") {
    endsWith.value = suffixValue
}
if (consonantsValue || consonantsValue == "") {
    consonants.value = consonantsValue
}
if (lengthValue || lengthValue == "") {
    wordLength.value = lengthValue
}
if (letterlengths || letterlengths == "") {
    wordLength.value = letterlengths
}
async function handleSubmit(e) {
    try {
        e.preventDefault()
        let url = `/filterData`
        const response = await fetch(url)
        let Data = await response.json()

        let matchedData = Data.filter((item) => {
            if (startsWith.value && endsWith.value && wordLength.value && consonants.value) {
                return item.length === wordLength.value &&
                    item.startsWith === startsWith.value.toLowerCase() &&
                    item.endsWith === endsWith.value.toLowerCase() &&
                    item.consonatsLength === consonants.value.toLowerCase()
            }
            else if (startsWith.value && endsWith.value && wordLength.value) {
                return item.length === wordLength.value &&
                    item.startsWith === startsWith.value.toLowerCase() &&
                    item.endsWith === endsWith.value.toLowerCase()
            }
            else if (startsWith.value && endsWith.value) {
                return item.startsWith === startsWith.value.toLowerCase() &&
                    item.endsWith === endsWith.value.toLowerCase()
            }
            else if (wordLength.value && startsWith.value) {
                return item.wordLength === wordLength.value &&
                    item.startsWith === startsWith.value.toLowerCase()
            }
            else if (wordLength.value && endsWith.value) {
                return item.wordLength === wordLength.value &&
                    item.endsWith === endsWith.value.toLowerCase()
            }
            else if (wordLength.value && startsWith.value && consonants.value) {
                return item.consonatsLength === consonants.value.toLowerCase() &&
                    item.wordLength === wordLength.value &&
                    item.startsWith === startsWith.value.toLowerCase()
            }
            else if (wordLength.value && endsWith.value && consonants.value) {
                return item.consonatsLength === consonants.value.toLowerCase() &&
                    item.wordLength === wordLength.value &&
                    item.endsWith === endsWith.value.toLowerCase()
            }
            else if (startsWith.value && endsWith.value) {
                return item.startsWith === startsWith.value.toLowerCase() &&
                    item.endsWith === endsWith.value.toLowerCase()
            }
            else if (startsWith.value && wordLength.value) {
                return item.length === wordLength.value &&
                    item.startsWith === startsWith.value.toLowerCase()
            }
            else if (endsWith.value && wordLength.value) {
                return item.length === wordLength.value &&
                    item.endsWith === endsWith.value.toLowerCase()
            }

            else if (consonants.value && startsWith.value) {
                return item.startsWith === startsWith.value.toLowerCase() &&
                    item.consonatsLength === consonants.value
            }
            else if (consonants.value && endsWith.value) {
                return item.endsWith === endsWith.value.toLowerCase() &&
                    item.consonatsLength === consonants.value
            }
            else if (consonants.value && wordLength.value) {
                return item.length === wordLength.value &&
                    item.consonatsLength === consonants.value
            }
            else if (consonants.value && wordLength.value) {
                return item.length === wordLength.value &&
                    item.consonatsLength === consonants.value
            }
            else {
                return item.length === wordLength.value ||
                    item.startsWith === startsWith.value.toLowerCase() ||
                    item.endsWith === endsWith.value.toLowerCase() ||
                    item.consonatsLength === consonants.value
            }
        })
        if (matchedData[0] && !input.value) {
            // notFound.style.display = "none"
            if (startsWith.value && wordLength.value) {
                window.location.href = matchedData[0].url + '?' + 'prefix' + '=' + startsWith.value + '&' + 'length' + '=' + wordLength.value
            }
            else if (endsWith.value && wordLength.value) {
                window.location.href = matchedData[0].url + '?' + 'suffix' + '=' + endsWith.value + '&' + 'length' + '=' + wordLength.value
            }


            else if (consonants.value && wordLength.value) {
                window.location.href = matchedData[0].url + '?' + 'letterlength' + '=' + wordLength.value + "&" + "consonants" + "=" + consonants.value
            }

            else if (startsWith.value) {
                window.location.href = matchedData[0].url + '?' + 'prefix' + '=' + startsWith.value
            }
            else if (endsWith.value) {
                window.location.href = matchedData[0].url + '?' + 'suffix' + '=' + endsWith.value
            }
            else {
                window.location.href = matchedData[0].url + '?' + 'length' + '=' + wordLength.value
            }
        }
        else {
            document.querySelector(".heading").innerHTML = "Set filter to search words"
            if (history.pushState) {
                var newurl = window.location.protocol + "//" + window.location.host +
                    window.location.pathname + '?' + 'filters' + '=' + "true" +
                    '&' + 'search' + "=" + input.value.toLowerCase() +
                    '&' + 'prefix' + '=' + startsWith.value +
                    '&' + 'suffix' + '=' + endsWith.value + '&' + 'length' + '=' + wordLength.value +
                    '&' + 'consonants' + '=' + consonants.value

                if (startsWith.value || endsWith.value || consonants.value || wordLength.value) {
                    document.querySelector(".advanced-toggle-button").classList.add("highlight_filter")
                }
                else {
                    document.querySelector(".advanced-toggle-button").classList.remove("highlight_filter")
                }
                window.history.pushState({ path: newurl }, '', newurl);
            }

            getData()

        }
    }
    catch (error) {
        console.log(error)
    }
}
form.addEventListener('submit', handleSubmit)

if (params.get('filters')) {
    document.querySelector(".heading").innerHTML = "Set filter to search words"
    getData()
}
async function getData() {
    try {
        document.querySelector(".errorMsg").style.display = "none"
        wordCount.innerHTML = ""
        main.innerHTML = `<div class="loader">
            <img src='/assets/images/loading.gif'>
            <div style="font-weight:900;font-size:14px" >Finding words - Powered by wordswithletters.org</div>
            </div>`
        let response

        if (input.value) {
            response = await fetch(`/advancedFilter/getData?name=${input.value.toLowerCase()}`)
        } else {
            response = await fetch(`/advancedFilter/getData`)
        }
        const data = await response.json()
        main.innerHTML = ''
        getWords(data);

    }
    catch (error) {
        console.log(error);
    }
}
function getWords(data) {
    const params = new URLSearchParams(window.location.search)
    serachValue = params.get("search")
    prefixValue = params.get('prefix')
    suffixValue = params.get('suffix')
    lengthValue = params.get('length')
    consonantsValue = params.get("consonants")

    let element = document.querySelector(".advanced-filter");
    element.classList.remove("advanced-toggle");
    main.innerHTML = "";
    tab_container.innerHTML = ""

    if (typeof data === "string") {
        document.querySelector(".tab_link_wrapper").style.display = "none"
        errorMsg.innerHTML = 'Sorry, there are no valid words for your search'
        document.querySelector(".errorMsg").style.display = "block"
        wordCount.innerHTML = ""
    } else {
        let newWordsLength = 0;
        for (let i = 15; i > 0; i--) {
            let newdata = data.filter((item) => item.length === i);
            if (startsWith.value) {
                newdata = newdata.filter((item) =>
                    item.startsWith(startsWith.value.toLowerCase())
                )
            }
            if (endsWith.value) {
                newdata = newdata.filter((item) =>
                    item.endsWith(endsWith.value.toLowerCase())
                )
            }
            if (wordLength.value) {
                newdata = newdata.filter((item) => item.length == wordLength.value)
            }
            function consonantsCounter(str) {
                var countConsonants = 0;
                for (var i = 0; i < str.length; i++) {
                    if (str[i] !== "a" && str[i] !== "e" && str[i] !== "i" &&
                        str[i] !== "o" && str[i] !== "u" && str[i] !== " ") {
                        countConsonants++;
                    }
                }
                return (countConsonants);
            }
            if (consonants.value) {
                newdata = newdata.filter((word) => {
                    if (consonantsCounter(word) === parseInt(consonants.value)) {
                        return word
                    }
                });
            }
            if (newdata.length === 0) {
                main.innerHTML += ''
            } else {
                newWordsLength += newdata.length
                const result = newdata.map((item) => {
                    let itemHtml = ""
                    if (input.value) {
                        var text1 = input.value.toLowerCase().replace("?", "");
                        var text2 = item;
                        var text3 = item;
                        function findIndex(str, char) {
                            const strLength = str.length;
                            const indexes = [];
                            let newStr = str;
                            while (newStr && newStr.indexOf(char) > -1) {
                                indexes.push(newStr.indexOf(char) + strLength - newStr.length);
                                newStr = newStr.substring(newStr.indexOf(char) + 1);
                                newStr = newStr.substring(newStr.indexOf(char) + 1);
                            }
                            return indexes;
                        }
                        let chars = text1.split("");
                        let indexs = [];
                        chars.map((i) => {
                            let findIndexes = findIndex(text3, i);
                            if (findIndexes.length > 0) {
                                text3 = text3.split("");
                                text3[findIndexes] = "$";
                                text3 = text3.join("");

                                indexs = [...indexs, ...findIndexes];
                            }
                        });
                        text2.split("").map((itemValue, index) => {
                            let check = indexs.find((i) => i === index);
                            if (check !== undefined) {
                                itemHtml += `${itemValue}`;
                            } else {
                                itemHtml += `<strong>${itemValue}</strong>`;
                            }
                        });
                    } else {
                        itemHtml = item
                    }
                    let ScrabbleLetterScore = ScrabbleScore();
                    let points = 0;
                    let word = item.toLowerCase()
                    for (let i = 0; i < word.length; i++) {
                        points += ScrabbleLetterScore[word[i]] || 0; // for unknown characters
                    }
                    return `
                    <a class="anchor__style" title="Lookup ${item.replace(/<\/?[^>]+>/gi, '')} in Dictionary" target="_blank"
                    href="/word-meaning?search=${item.replace(/<\/?[^>]+>/gi, '')}">
                    <li class="list_word">
                    ${itemHtml}
                    <span class="points" value="${points}">${points}</span>
                    </li>
                </a>`
                })
                if (result[0] !== undefined) {
                    tab_container.innerHTML += `
                        <input type="button" id="Tab_${i}" onclick="filterLinks(${i})" value="${i} Letter" class="tab_link  cursorPointer"/>
                        `
                    let tabs = document.getElementsByClassName('tab_link')
                    tabs[0] ? tabs[0].classList.add('active-tab') : ''
                    main.innerHTML += `
                    <div class="allGroupWords wordlistContainer m-0" id="alpha_${i}">
                    <div class="wordListHeading">
                    <h3 class="mb-0 lead">${i} Letter Words</h3>
                    </div>
                    <div class="wordList">
                    <ul class="ul list-unstyled">
                      ${result.join('')}
                    </ul>
                    </div>
                    </div>
                    `
                }
            }
        }
        if (newWordsLength === 0) {
            document.querySelector(".tab_link_wrapper").style.display = "none"
            errorMsg.innerHTML = 'Sorry, there are no valid words for your search'
            document.querySelector(".errorMsg").style.display = "block"
            wordCount.innerHTML = ""
        } else {
            if (!wordLength.value) {
                document.querySelector(".tab_link_wrapper").style.display = "flex"
            } else {
                document.querySelector(".tab_link_wrapper").style.display = "none"
            }
            let startwithMsg = ""
            let endwithMsg = ""
            let lengthMsg = ""
            let consonatsMsg = ""
            let inputVal = ""
            if (serachValue) {
                inputVal = `${input.value.split("")}`
            }
            if (prefixValue) {
                startwithMsg = `starting with  ${prefixValue.split("")} `
            }
            if (suffixValue) {
                endwithMsg = `ending with ${suffixValue.split("")} `
            }
            if (consonantsValue) {
                consonatsMsg = `with ${consonantsValue} consonants`
            }

            if (lengthValue) {
                lengthMsg = `${lengthValue} letter words`
            }
            let msg = `<strong> Found ${newWordsLength} words with letters with
            ${lengthMsg} ${inputVal} ${startwithMsg} ${endwithMsg} ${consonatsMsg} </strong>`

            wordCount.innerHTML = `${msg} `

        }
    }
}













