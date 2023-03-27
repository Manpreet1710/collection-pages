const fs = require("fs")

const lower = require("./functions/Dictonary/twl06.js");
const twl06 = lower.map(element => {
  return element.toLowerCase();
  });

let letter = [
  // { word: { 2: "two" } },
  // { word: { 3: "three" } },
  // { word: { 4: "four" } },
  // { word: { 5: "five" } },
  { word: { 6: "six" } },
  // { word: { 7: "seven" } },
  // { word: { 8: "eight" } },
  // { word: { 9: "nine" } },
  // { word: { 10: "ten" } },
  // { word: { 11: "eleven" } },
  // { word: { 12: "twelve" } },
  // { word: { 13: "thirteen" } },
  // { word: { 14: "fourteen" } },
  // { word: { 15: "fifteen" } },
];
console.log('hello')
var links_array = [];
for (let i = 0; i < letter.length; i++) {
  const element = Object.entries(letter[i].word)[0];
  var data = element[1]
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  const dataToGenerate = {
    name: `${data} letter words`,
    url: `/${element[1]}-letter-words`,
  };
  links_array.push(dataToGenerate);
}
for (let i = 0; i < letter.length; i++) {
  //  console.log(links)
  var newarr = [];
  var main_array = [];
  const element = Object.entries(letter[i].word)[0];
  let newdata = twl06.filter((item) => item.length == element[0]);
  var aary = [];
  newdata.map((letter) => {
    aary.push({ word: letter, points: 9, i: letter.length });
  });

  if (aary.length != 0) {
    main_array.push(aary);
  }
  newarr.push(newdata);
  var word_count = 0;
  for (let y = 0; y < main_array.length; y++) {
    const element = main_array[y].length;
    word_count += parseInt(element);
  }
  var new_array = element[1].split("");
  const dataToGenerate = {
    h1: `All ${element[1]} letters words in english`,
    h2: `Even the most difficult ${element[1]}-lettered words you can think of are generated.`,
    title: `${element[1]} letter words-Use this finder to find ${element[1]} letter words`,
    meta: `Are you still trying to figure out how many words there are in the English language? With our free ${element[1]}-lettered word creator, you can generate high-scoring ${element[1]}-lettered words.`,
    words: main_array,
    wordLength:`Found ${word_count} words with ${element[1]} letters`,   
    words: main_array,
    feature_title:"Features",
    blogNo:"03",
    blog_title:"Blog",
    FaqNo:"04",
    Faq_title:"FAQ",
    aboutNo:"05",
    about_title:"About",
    megaMenu: {
      "nav-link-name": "Tools",
      dropdown: [
        {
          categoryName: "Recommended Pages",
          links: [
            { "name": "Two letter words", "url": "/words-collections/two-letter-words" },
            { "name": "Three letter words", "url": "/words-collections/three-letter-words" },
            { "name": "Four letter words", "url": "/words-collections/four-letter-words" },
            { "name": "Five letter words", "url": "/words-collections/five-letter-words" },
            { "name": "Six letter words", "url": "/words-collections/six-letter-words" },
          ],
        },
        {
          categoryName: "Recommended Pages",
          links: [
            { "name": "Seven letter words", "url": "/words-collections/seven-letter-words" },
            { "name": "Eight letter words", "url": "/words-collections/eight-letter-words" },
            { "name": "Nine letter words", "url": "/words-collections/nine-letter-words" },
            { "name": "Ten letter words", "url": "/words-collections/ten-letter-words" },
            { "name": "Eleven letter words", "url": "/words-collections/eleven-letter-words" },
          ],
        },
        {
          categoryName: "Recommended Pages",
          links: [
            { "name": "Twelve letter words", "url": "/words-collections/twelve-letter-words" },
            { "name": "Thirteen letter words", "url": "/words-collections/thirteen-letter-words" },
            { "name": "Fourteen letter words", "url": "/words-collections/fourteen-letter-words" },
            { "name": "Fifteen letter words", "url": "/words-collections/fifteen-letter-words" }
          ],
        },
      ],
    },
    featureList: [
      {
        feature_heading: `It's completely free.`,
        feature_text: `No fee or subscription is charged for using ${element[1]}-letter words, and no registration or login is required. There are no limitations to usage. This application is free to use.`,
        fa_class: "../assets/images/star.svg",
      },
      {
        feature_heading: `Totaly safe`,
        feature_text: `When you use ${element[1]}-letter words online tool, the databases that store the information you enter do not save or send it to any other source. Another benefit of using this application is that your data is kept confidential and your work quality is not jeopardised. It is secured and removed from the system by the tool. This allows us to provide comprehensive protection to all of our consumers, ensuring that our product is completely reliable and risk-free to use in any situation, at any time of day or night.`,
        fa_class: "../assets/images/star.svg",
      },
      {
        feature_heading: `Simple to operate`,
        feature_text: `${element[1]}-letter words is very user-friendly tools. Everything is in one place, so there's no need to think about where to begin. Our online tool is also ad-free, resulting in a superior user experience. The letter can be used to look up your words so that you can complete the online application as directed. These tools are designed to be basic enough for anyone to use.`,
        fa_class: "../assets/images/star.svg",
      },
      {
        feature_heading: `There are almost no extra resources required.`,
        feature_text: `${element[1]}-letter words is web-based and works in the cloud. It can be accessed with any device's browser. You are not need to install or download any other tools or software in order to use this application. This tool is extremely user-friendly.`,
        fa_class: "../assets/images/star.svg",
      },
      {
        feature_heading: `Use without login`,
        feature_text: `${element[1]}-letter words is absolutely free, and you don't have to give us any personal information like your email address or password to use it. Our service is unrestricted. There is no need to download software or register for a service because the online tool is saved locally in your internet browser.`,
        fa_class: "../assets/images/star.svg",
      },
      {
        feature_heading: `There are no issues with compatibility.`,
        feature_text: `${element[1]}-letter words is compatible with all browsers and OS systems. This website's online tool is a web-based service that may be accessed from any computer or mobile device that has access to the internet. Chrome, Safari, Firefox, Microsoft Edge, and a variety of other wel${element[1]}-known browsers are all supported. As a result, depending on your preference, you can use this online tool to find the words on a desktop computer, an iPad, a tablet, or a mobile phone. If you use our web service, you will not be needed to purchase or install any additional software or plugins on your computer.`,
        fa_class: "../assets/images/star.svg",
      },
    ],
    faqList: [
      {
        Question: `What is the short words that ${element[1]}-letter words?`,
        Answer: ` Make all possible words whose length is small.This tools will help you find high-scoring words ${element[1]}-letter words.`,
      },
      {
        Question: `How to use ${element[1]}-letter words?`,
        Answer: `Make  all possible words using this online tools.Enter any letter that the word must start with. All ${element[1]}-letter words are valid words.`,
      },
      {
        Question: `If I want to make a complaint about the quality of '${element[1]}-letter words', what should I do?`,
        Answer: `Please contact us with the specifics of the problem you've encountered. A member of our staff will get out to you to assist you with your problem.`,
      },
      {
        Question: `Can I use the '${element[1]}-letter words' on my android device?`,
        Answer: `Yes, you can ${element[1]}-letter words on an android device easily because they are internet-based tools.`,
      },
      {
        Question: `Can I use the '${element[1]}-letter words containing X and Y' without downloading?`,
        Answer: `Yes, you can use these tools without downloading because they are internet-based tools.`,
      },
      {
        Question: `Can I use this tool ( ${element[1]}-letter words) in all brouwser ?`,
        Answer: `Yes, you can use this tool in all browser because this is free  online utility. this tools are compatible with all browsers and OS system. This tool is a web -based service that may be accessed from any computer or mobile device that has access to the internet. Chrome, Safari, Firefox, Microsoft Edge, and a variety of other well-know browsers are all supported.`,
      },
      {
        Question: `How do I communicate if I face any issues or if I want to give any suggestions for '${element[1]}-letter words'?`,
        Answer: `If you have any issues using the application '${element[1]}-letter words', you can read the FAQ and give suggestions in the contact option and fill in the form.`,
      },
      {
        Question: `Do we need to sign up for an account '${element[1]}-letter words'?`,
        Answer: `No need to be sign up. Our online tool '${element[1]}-letter words' is absolutely free, and you don't have to give us any personal information like your email address or password to use it. Our service is unrestricted. There is no need to download software or register for a service because the online tool is saved locally in your internet browser.`,
      },
      {
        Question: `How do I choose a 6-letter word finder that will be right for me?`,
        Answer: `Wordswithletters.org's 6 letter word finder is best 6 letter word finder for most use cases !`,
      },
      {
        Question: `What are some 6-letter words containing D.`,
        Answer: `Some 6-letter words containing D are abonds,abased, bedral, and bedrid.`,
      },
      {
        Question: `How many 6-letter words are there in the English language?`,
        Answer: `There are approximately 909,000 six-letter words in the English language.`,
      },
      {
        Question: `What are some examples of six-letter words with letters?`,
        Answer: `There are many six-letter words with letters, but some examples include:Abrade, Accept, Adjust etc.`,
      },
      {
        Question: `How can I find words that are six letters long using word finder 6 letter?`,
        Answer: `You can find words that are six letters long by looking by using our 6 letter word finder tool`,
      },
      {
        Question: `What are some six letter words that start with vowel?`,
        Answer: `Some six letter words that start with a vowel are aegis, aeons, agape, agers, agism, agist, aglee, aglet, agloe, agone`,
      },
      {
        Question: `How can I use the six-letter word unscrambler to improve my word game skills?`,
        Answer: `The six-letter word unscrambler can help you improve your word game skills by unscrambling words to find the hidden message.`,
      },
      {
        Question: `What are some six letter word, where containig E that are easy to unscramble?`,
        Answer: `There are many six-letter words that are easy to unscramble. Some examples include words like "solved","easier" and "resort."`,
      }
    ],
  };
  // console.log(newarr);
  const htmlfile = `${element[1]}-letter-words` + ".json";
  fs.writeFileSync(
    "./_data/l-letter-collection/en/" + htmlfile,
    JSON.stringify(dataToGenerate),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}
