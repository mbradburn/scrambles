import { wordlist } from './wordlist.js';

const words = new Map();

// For each word in the word list:
//    Skip words with less than 7 letters.
//    Create a hash key, which is the sorted/uniquified letters of the word
//    Add the key+word to the 'words' hashmap.  Subsequent matches get appended
//      to the array of words.
wordlist.forEach((word) => {
    if (word.length < 7) {
        return;
    }

    const k = sortUniq(word.toLowerCase());

    // There must be exactly 7 unique letters for this puzzle.
    if (k.length != 7) {
        return;
    }

    const existing = words.get(k);
    if (existing) {
        existing.push(word);
    } else {
        words.set(k, [word]);
    }
});

// Transfer the map to an array of objects, with { clue, words }.
const results = [];
for (let [k, v] of words) {
    results.push({ clue: k, words: v })
}

// Sort the array by clue.
results.sort((a, b) => {
    if (a.clue < b.clue) {
        return -1;
    }
    if (a.clue > b.clue) {
        return 1;
    }
    return 0;
});

// Print the array.
for (const result of results) {
    // Sort by solutions by length.
    result.words.sort((a, b) => a.length - b.length);

    let str = "";
    for (const e of result.words) {
        str += e + " (" + e.length + ") ";
    }

    console.log(`${result.clue}: ${str}`);
}

// Sort the letters in the input string, and remove duplicates.
function sortUniq(str) {
    const s = new Set();
    for (let i = 0; i < str.length; ++i) {
        s.add(str.substring(i, i+1));
    }
    const result = [];
    for (const v of s) {
        result.push(v);
    }
    return result.sort().join('');
}
