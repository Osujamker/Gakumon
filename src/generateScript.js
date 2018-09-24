let _ = require('lodash');
let wanakana = require('wanakana')
let AMOUNT_LIMIT = 10;
exports.Generate = function Generate(system, amount, difficulty) {
  if (system) system = system.toLowerCase();
  else return null;
  if (!amount) amount = 5;
  if (amount > AMOUNT_LIMIT) amount = AMOUNT_LIMIT;
  if (!difficulty) difficulty = 'easy';

  let character;
  let obj = [];
  if(system === "hiragana") {
    for (let i = 0; i < amount; i++) {
      character = GenerateCharacter(difficulty);
        character.forEach(element => {
          element.hiragana = wanakana.toHiragana(element.romaji);
        });
      obj.push(character);
    }
    return obj
  }
  else if (system === "katakana") {
    for (let i = 0; i < amount; i++) {
      character = GenerateCharacter(difficulty);
        character.forEach(element => {
          element.hiragana = wanakana.toKatakana(element.romaji);
        });
      obj.push(character);
    }
    return obj;
  }
  else {
    return null
  }
}
let characters = {
  easy: [{romaji: 'a'}, {romaji: 'i'}, {romaji: 'u'}, {romaji: 'e'}, {romaji: 'o'},
        {romaji: 'ka'}, {romaji: 'ki'}, {romaji: 'ku'}, {romaji: 'ke'}, {romaji: 'ko'},
        {romaji: 'shi'}, {romaji: 'tsu'}, {romaji: 'chi'},
        {romaji: 'sa'}, {romaji: 'su'}, {romaji: 'se'}, {romaji: 'so'},
        {romaji: 'ta'}, {romaji: 'te'}, {romaji: 'to'},],
  normal: [{romaji: 'na'}, {romaji: 'ni'}, {romaji: 'nu'},
          {romaji: 'ha'}, {romaji: 'hi'}, {romaji: 'fu'},
          {romaji: 'he'}, {romaji: 'ho'}, {romaji: 'ma'},
          {romaji: 'mi'}, {romaji: 'mu'}, {romaji: 'me'},
          {romaji: 'mo'}, {romaji: 'ya'}, {romaji: 'yu'},
          {romaji: 'yo'}, {romaji: 'ra'}, {romaji: 'ri'},
          {romaji: 'ru'}, {romaji: 're'}, {romaji: 'ro'},
          {romaji: 'wa'}, {romaji: 'wi'}, {romaji: 'we'},
          {romaji: 'wo'}],
  hard: [
        {romaji: 'kya'}, {romaji: 'kyo'}, {romaji: 'kyu'},
        {romaji: 'sha'}, {romaji: 'shu'}, {romaji: 'sho'},
        {romaji: 'cha'}, {romaji: 'chu'}, {romaji: 'cho'},
        {romaji: 'nya'}, {romaji: 'nyu'}, {romaji: 'nyo'},
        {romaji: 'hya'}, {romaji: 'hyu'}, {romaji: 'hyo'},
        {romaji: 'mya'}, {romaji: 'myu'}, {romaji: 'myo'},
        {romaji: 'rya'}, {romaji: 'ryu'}, {romaji: 'ryo'}
  ]
}
/*let romajiList = {
  easy: [a, i, u, e, o, shi, tsu, chi, ka, ki, ku, ke, ko, sa, su, se, so, ta, te, to, na, ni, nu, ne, no],
  normal: [a, i, u, e, o, shi, tsu, chi, ka, ki, ku, ke, ko, sa, su, se, so, ta, te, to, na, ni, nu, ne, no, ha, hi, fu, he, ho, ma, mi, mu, me, mo, ya, yu, yo, ra, ri, ru, re, ro, wa, wi, we, wo],
  hard: [a, i, u, e, o, shi, tsu, chi, ka, ki, ku, ke, ko, sa, su, se, so, ta, te, to, na, ni, nu, ne, no, ha, hi, fu, he, ho, ma, mi, mu, me, mo, ya, yu, yo, ra, ri, ru, re, ro, wa, wi, we, wo, kya, kyu, kyo, sha, shu, sho, cha, chu, cho, nya, nyu, nyo, hya, hyu, hyo, mya, myu, myo, rya, ryu, ryo]
}*/
function GenerateCharacter(difficulty) {
  switch (difficulty) {
    default:
    case 'easy': {
      let array = _.cloneDeep(_.sampleSize(characters.easy, 4));
      _.sample(array).chosen = true;
      return array;
    };
    case 'normal': {
      let array = _.cloneDeep(_.sampleSize(characters.normal, 4));
      _.sample(array).chosen = true;
      return array;
    };
    case 'hard': {
      let array = _.cloneDeep(_.sampleSize(characters.hard, 4));
      _.sample(array).chosen = true;
      return array;
    };
  }

}