const form = document.getElementById("form")
const input = document.querySelector(".txtBox")
const startsWith = document.getElementById('startsWith')
const endsWith = document.getElementById('endsWith')
const wordLength = document.querySelector('.wordLength')
const vowels = document.querySelector(".vowels")
const getScript = document.currentScript
const pageLengthValue = getScript.dataset.length
const pageVowelValue = getScript.dataset.vowelength
const params = new URLSearchParams(window.location.search)
let serachValue = params.get("search")
let prefixValue = params.get('prefix')
let suffixValue = params.get('suffix')
let lengthValue = params.get('length')
let vowelsValue = params.get("vowels")
let letterlengths = params.get("letterlength")
let wordCount = document.querySelector('.wordCount')
let errorMsg = document.querySelector('.errorMsg')
let h2 = document.getElementsByTagName("h2")

if (pageLengthValue) {
    document.querySelector(".tab_link_wrapper").style.display = "none"
}

let option
for (var i = 0; i < wordLength.options.length; i++) {
    option = wordLength.options[i];
    if (option.value == pageLengthValue) {
        option.setAttribute('selected', true);
    }
}
let option2
for (var i = 0; i < vowels.options.length; i++) {
    option2 = vowels.options[i];
    if (option2.value == pageVowelValue) {
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
if (lengthValue || lengthValue == "") {
    wordLength.value = lengthValue
}
if (letterlengths || letterlengths == "") {
    wordLength.value = letterlengths
}
if (vowelsValue || vowelsValue == "") {
    vowels.value = vowelsValue
}

async function handleSubmit(e) {
    try {
        e.preventDefault()
        let url = `/filterData`
        main.innerHTML = `<div class="loader">
        <img src='/assets/images/loading.gif'>
        <div style="font-weight:900;font-size:14px" >Finding words - Powered by wordswithletters.org</div>
        </div>`
        const response = await fetch(url)
        let Data = await response.json()
        main.innerHTML = ''

        let matchedData = Data.filter((item) => {
            if (startsWith.value && endsWith.value && wordLength.value) {
                return item.length === wordLength.value &&
                    item.startsWith === startsWith.value.toLowerCase() &&
                    item.endsWith === endsWith.value.toLowerCase()
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
            else if (wordLength.value && startsWith.value && vowels.value) {
                return item.vowelLength === vowels.value.toLowerCase() &&
                    item.wordLength === wordLength.value &&
                    item.startsWith === startsWith.value.toLowerCase()
            }
            else if (wordLength.value && endsWith.value && vowels.value) {
                return item.vowelLength === vowels.value.toLowerCase() &&
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

            else if (vowels.value && startsWith.value) {
                return item.startsWith === startsWith.value.toLowerCase() &&
                    item.vowelLength === vowels.value
            }
            else if (vowels.value && endsWith.value) {
                return item.endsWith === endsWith.value.toLowerCase() &&
                    item.vowelLength === vowels.value
            }
            else if (vowels.value && wordLength.value) {
                return item.length === wordLength.value &&
                    item.vowelLength === vowels.value
            }
            else {
                return item.length === wordLength.value ||
                    item.startsWith === startsWith.value.toLowerCase() ||
                    item.endsWith === endsWith.value.toLowerCase()
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
            else if (vowels.value && wordLength.value) {
                window.location.href = matchedData[0].url + '?' + 'letterlength' + '=' + wordLength.value + "&" + "vowels" + "=" + vowels.value
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
            h2[0].innerHTML = ""
            document.querySelector(".heading").innerHTML = "Set filter to search words"
            if (history.pushState) {
                var newurl = window.location.protocol + "//" + window.location.host +
                    window.location.pathname + '?' + 'filters' + '=' + "true" +
                    '&' + 'search' + "=" + input.value.toLowerCase() +
                    '&' + 'prefix' + '=' + startsWith.value +
                    '&' + 'suffix' + '=' + endsWith.value + '&' + 'length' + '=' + wordLength.value +
                    '&' + 'vowels' + '=' + vowels.value
                if (startsWith.value || endsWith.value || vowels.value || wordLength.value) {
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
    h2[0].innerHTML = ""
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
    console.log(data);
    const params = new URLSearchParams(window.location.search)
    serachValue = params.get("search")
    prefixValue = params.get('prefix')
    containsValue = params.get('contains')
    suffixValue = params.get('suffix')
    lengthValue = params.get('length')
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
            function getVowels(str) {
                var vowelsCount = 0;
                var string = str.toString();
                for (var i = 0; i <= string.length - 1; i++) {
                    if (
                        string.charAt(i) == "a" ||
                        string.charAt(i) == "e" ||
                        string.charAt(i) == "i" ||
                        string.charAt(i) == "o" ||
                        string.charAt(i) == "u"
                    ) {
                        vowelsCount += 1;
                    }
                }
                return vowelsCount;
            }
            if (vowels.value) {
                newdata = newdata.filter((word) => {
                    if (getVowels(word) === parseInt(vowels.value)) {
                        return word.toLowerCase()
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
            let vowelMsg = ""
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
            if (lengthValue) {
                lengthMsg = `${lengthValue} letter words`
            }
            if (vowelsValue) {
                vowelMsg = `with ${vowelsValue} vowels`
            }
            let msg = `<strong> Found ${newWordsLength} words with letters with
            ${lengthMsg} ${inputVal} ${startwithMsg} ${endwithMsg} ${vowelMsg} </strong>`

            wordCount.innerHTML = `${msg}`
        }
    }
}













