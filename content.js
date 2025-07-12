const badWords = [
  "fuck", "fucker", "fucking", "fucked", "fucks",
  "shit", "bullshit", "shithead", "shitfaced",
  "bitch", "bitches", "bitchy",
  "ass", "asshole", "asshat", "jackass", "asslicker",
  "dick", "dicks", "dickhead", "dicking",
  "piss", "pissed", "pissing",
  "bastard", "bastards",
  "slut", "sluts", "slutty",
  "whore", "whores", "whoring",
  "cock", "cockface", "cockhead",
  "pussy", "cunt", "twat", "twatwaffle",
  "damn", "darn", "crap", "bloody", "bugger", "bollocks",
  "douche", "douchebag",
  "wanker", "prick", "knob", "nutsack", "ballbag",
  "suckmydick", "cum", "cumshot", "dildo", "tit", "screw", "twit"
];

const censoredMap = {};
badWords.forEach(word => {
  if (word.length > 2) {
    censoredMap[word] = word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
  } else {
    censoredMap[word] = word[0] + '*';
  }
});

const badWordsRegex = new RegExp(`\\b(${badWords.join("|")})\\b`, "gi");

function censorText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent.replace(badWordsRegex, (match) => {
      const lower = match.toLowerCase();
      const censored = censoredMap[lower] || match;
      return match[0] === match[0].toUpperCase()
        ? censored[0].toUpperCase() + censored.slice(1)
        : censored;
    });
  } else {
    node.childNodes.forEach(censorText);
  }
}

// Only run censoring if enabled
chrome.storage.sync.get("enabled", (data) => {
  if (data.enabled !== false) {
    censorText(document.body);
  }
});
