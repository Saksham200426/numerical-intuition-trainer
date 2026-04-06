// ============================================================
// MATH UTILITIES
// ============================================================

export function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function isComposite(n) {
  return n > 1 && !isPrime(n);
}

export function isEven(n) {
  return n % 2 === 0;
}

export function isOdd(n) {
  return n % 2 !== 0;
}

export function getTableData(n) {
  return Array.from({ length: 10 }, (_, i) => ({
    multiplier: i + 1,
    result: n * (i + 1),
  }));
}

export function getSquare(n) {
  return n * n;
}

export function getCube(n) {
  return n * n * n;
}

// ============================================================
// TABLE TRICKS & PATTERNS
// ============================================================

export function getTableTricks(n) {
  const tricks = [];

  if (n === 9) {
    tricks.push({
      title: 'Finger Trick',
      desc: 'Hold up 10 fingers. For 9×n, fold the nth finger. Left digits = left fingers, right digits = right fingers.',
    });
    tricks.push({
      title: 'Digit Sum = 9',
      desc: 'All multiples of 9 have digits that sum to 9: 18→1+8=9, 27→2+7=9, 36→3+6=9…',
    });
  }

  if (n === 11) {
    tricks.push({
      title: '11× Rule (1–9)',
      desc: 'For single digits: just repeat the digit. 11×7 = 77, 11×4 = 44.',
    });
    tricks.push({
      title: '11× Rule (10–99)',
      desc: 'Split the number, add the two digits in the middle. 11×23: 2_(2+3)_3 = 253.',
    });
  }

  if (n === 5) {
    tricks.push({
      title: 'Halve & ×10',
      desc: 'To multiply by 5: halve the number and multiply by 10. 5×14 = (14/2)×10 = 70.',
    });
    tricks.push({
      title: 'Last Digit Pattern',
      desc: 'Multiples of 5 always end in 0 or 5. Alternate: 5, 10, 15, 20...',
    });
  }

  if (n === 25) {
    tricks.push({
      title: '÷4 then ×100',
      desc: 'Multiply by 25 = divide by 4 then ×100. 25×12 = (12/4)×100 = 300.',
    });
  }

  if (n === 125) {
    tricks.push({
      title: '÷8 then ×1000',
      desc: 'Multiply by 125 = divide by 8 then ×1000. 125×16 = (16/8)×1000 = 2000.',
    });
  }

  if (isEven(n)) {
    tricks.push({
      title: 'Even Table Shortcut',
      desc: `${n} is even. You can compute half the table for odd, then double: e.g., ${n}×7 = (${n/2}×7)×2 = ${(n/2)*7*2}.`,
    });
  }

  if (isPrime(n)) {
    tricks.push({
      title: 'Prime Table',
      desc: `${n} is prime — no quick factor trick, but memorise the table by chunking: first 5 multiples, then last 5.`,
    });
  }

  // Last digit pattern
  const lastDigits = Array.from({ length: 10 }, (_, i) => (n * (i + 1)) % 10);
  const cycleLen = findCycleLength(lastDigits);
  if (cycleLen > 0 && cycleLen < 10) {
    tricks.push({
      title: 'Last Digit Cycle',
      desc: `Last digits repeat every ${cycleLen} multiples: ${lastDigits.slice(0, cycleLen).join(', ')}, then repeats.`,
    });
  } else {
    tricks.push({
      title: 'Last Digit Pattern',
      desc: `Last digits of ${n}×1 to ${n}×10: ${lastDigits.join(', ')}`,
    });
  }

  // Nearness trick
  const nearBase = getNearestBase(n);
  if (nearBase && nearBase !== n) {
    const diff = n - nearBase;
    tricks.push({
      title: `Near-${nearBase} Trick`,
      desc: `${n} = ${nearBase} ${diff > 0 ? '+' : ''}${diff}. So ${n}×m = ${nearBase}×m ${diff > 0 ? '+' : '-'} ${Math.abs(diff)}×m. E.g., ${n}×8 = ${nearBase*8} ${diff > 0 ? '+' : '-'} ${Math.abs(diff)*8} = ${n*8}`,
    });
  }

  return tricks;
}

function findCycleLength(arr) {
  for (let len = 1; len <= arr.length / 2; len++) {
    const pattern = arr.slice(0, len);
    let isCycle = true;
    for (let i = len; i < arr.length; i++) {
      if (arr[i] !== pattern[i % len]) { isCycle = false; break; }
    }
    if (isCycle) return len;
  }
  return 0;
}

function getNearestBase(n) {
  const bases = [10, 20, 25, 50, 100];
  let best = null, bestDist = Infinity;
  for (const b of bases) {
    const d = Math.abs(n - b);
    if (d < bestDist && d > 0 && d <= 5) { bestDist = d; best = b; }
  }
  return best;
}

export function getTablePatterns(n) {
  const patterns = [];

  // Divisibility
  if (n % 3 === 0) patterns.push({ label: 'Div by 3', desc: 'Digit sum divisible by 3' });
  if (n % 9 === 0) patterns.push({ label: 'Div by 9', desc: 'Digit sum divisible by 9' });
  if (n % 4 === 0) patterns.push({ label: 'Div by 4', desc: 'Last 2 digits divisible by 4' });
  if (n % 6 === 0) patterns.push({ label: 'Div by 6', desc: 'Even AND digit sum div by 3' });
  if (n % 8 === 0) patterns.push({ label: 'Div by 8', desc: 'Last 3 digits divisible by 8' });

  // Sum of first 10 multiples
  const s = Array.from({ length: 10 }, (_, i) => n * (i + 1)).reduce((a, b) => a + b, 0);
  patterns.push({ label: 'Sum of 1–10 multiples', desc: `${s} (= 55 × ${n})` });

  // Product category
  if (n <= 10) patterns.push({ label: 'Basic Table', desc: 'Core multiplication table — aim for < 2s recall' });
  else if (n <= 20) patterns.push({ label: 'CAT Tier 1', desc: 'High-frequency in DI & QA sections' });
  else if (n <= 30) patterns.push({ label: 'CAT Tier 2', desc: 'Needed for fast mental calculation' });
  else patterns.push({ label: 'Power Table', desc: 'Mastering this gives you significant speed advantage' });

  return patterns;
}

// ============================================================
// SQUARE TRICKS
// ============================================================

export function getSquareTrick(n) {
  const sq = n * n;
  const tricks = [];

  // (a+b)^2 or (a-b)^2 for numbers close to a round number
  const nearRound = getNearestRound(n);
  if (nearRound && nearRound !== n) {
    const diff = n - nearRound;
    const a = nearRound, b = Math.abs(diff);
    if (diff > 0) {
      tricks.push({
        title: `(${a}+${b})² Expansion`,
        desc: `${n}² = (${a}+${b})² = ${a}²+2×${a}×${b}+${b}² = ${a*a}+${2*a*b}+${b*b} = ${sq}`,
      });
    } else {
      tricks.push({
        title: `(${a}-${b})² Expansion`,
        desc: `${n}² = (${a}-${b})² = ${a}²-2×${a}×${b}+${b}² = ${a*a}-${2*a*b}+${b*b} = ${sq}`,
      });
    }
  }

  // Successive odd numbers trick: n² = sum of first n odd numbers
  if (n <= 15) {
    tricks.push({
      title: 'Sum of Odd Numbers',
      desc: `${n}² = sum of first ${n} odd numbers = 1+3+5+…+${2*n-1} = ${sq}`,
    });
  }

  // (n+1)² from n²
  if (n > 1) {
    const prev = (n-1)*(n-1);
    tricks.push({
      title: 'From Previous Square',
      desc: `${n}² = ${n-1}² + (${n-1}+${n}) = ${prev} + ${2*n-1} = ${sq}`,
    });
  }

  // Difference of squares: n² = (n+1)(n-1)+1
  if (n > 1) {
    tricks.push({
      title: 'Difference of Squares',
      desc: `${n}² = (${n}+1)(${n}-1) + 1 = ${n+1}×${n-1}+1 = ${(n+1)*(n-1)}+1 = ${sq}`,
    });
  }

  // Last digit pattern for squares
  const ld = sq % 10;
  const ldGroup = getSquareLastDigitGroup(n % 10);
  tricks.push({
    title: 'Last Digit Rule',
    desc: ldGroup,
  });

  return tricks;
}

function getNearestRound(n) {
  const rounds = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  let best = null, bestDist = Infinity;
  for (const r of rounds) {
    const d = Math.abs(n - r);
    if (d < bestDist && d > 0 && d <= 3) { bestDist = d; best = r; }
  }
  return best;
}

function getSquareLastDigitGroup(d) {
  const map = {
    0: 'Ends in 0: square ends in 0',
    1: 'Ends in 1 or 9: square ends in 1',
    2: 'Ends in 2 or 8: square ends in 4',
    3: 'Ends in 3 or 7: square ends in 9',
    4: 'Ends in 4 or 6: square ends in 6',
    5: 'Ends in 5: square ends in 5 (×25 pattern)',
    6: 'Ends in 4 or 6: square ends in 6',
    7: 'Ends in 3 or 7: square ends in 9',
    8: 'Ends in 2 or 8: square ends in 4',
    9: 'Ends in 1 or 9: square ends in 1',
  };
  return map[d] || '';
}

export function getSquarePattern(n) {
  const sq = n * n;
  const patterns = [];

  if (isEven(n)) patterns.push({ label: 'Even', desc: 'Square of even = always even' });
  else patterns.push({ label: 'Odd', desc: 'Square of odd = always odd' });

  if (n % 5 === 0) patterns.push({ label: 'Multiple of 5', desc: 'Square ends in 25 or 00' });
  if (n % 10 === 0) patterns.push({ label: 'Multiple of 10', desc: 'Square ends in 00' });

  // CAT relevance
  if ([11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].includes(n)) {
    patterns.push({ label: '🎯 CAT Frequent', desc: 'Appears often in approximation & comparison questions' });
  }

  patterns.push({ label: 'Digital Root', desc: `Digital root of ${sq} = ${getDigitalRoot(sq)}` });

  return patterns;
}

// ============================================================
// CUBE TRICKS
// ============================================================

export function getCubeTrick(n) {
  const cube = n * n * n;
  const tricks = [];

  // (a+b)³ expansion for nearby round numbers
  const nearRound = getNearestRound10(n);
  if (nearRound && nearRound !== n) {
    const diff = n - nearRound;
    const a = nearRound, b = Math.abs(diff);
    if (diff > 0) {
      tricks.push({
        title: `(${a}+${b})³ Expansion`,
        desc: `= ${a}³ + 3×${a}²×${b} + 3×${a}×${b}² + ${b}³ = ${a**3} + ${3*a*a*b} + ${3*a*b*b} + ${b**3} = ${cube}`,
      });
    } else {
      tricks.push({
        title: `(${a}-${b})³ Expansion`,
        desc: `= ${a}³ - 3×${a}²×${b} + 3×${a}×${b}² - ${b}³ = ${a**3} - ${3*a*a*b} + ${3*a*b*b} - ${b**3} = ${cube}`,
      });
    }
  }

  // Sum formula: n³ = n × n²
  tricks.push({
    title: 'From Square',
    desc: `${n}³ = ${n} × ${n}² = ${n} × ${n*n} = ${cube}`,
  });

  // Last digit of cube
  const ld = cube % 10;
  tricks.push({
    title: 'Last Digit Rule',
    desc: getCubeLastDigitRule(n % 10),
  });

  // Sum of consecutive odd numbers for cubes
  if (n <= 10) {
    const start = n * (n - 1) + 1;
    const oddNums = Array.from({ length: n }, (_, i) => start + 2 * i);
    tricks.push({
      title: 'Sum of Consecutive Odds',
      desc: `${n}³ = ${oddNums.join(' + ')} = ${cube}`,
    });
  }

  return tricks;
}

function getNearestRound10(n) {
  const rounds = [5, 10, 15, 20];
  let best = null, bestDist = Infinity;
  for (const r of rounds) {
    const d = Math.abs(n - r);
    if (d < bestDist && d > 0 && d <= 3) { bestDist = d; best = r; }
  }
  return best;
}

function getCubeLastDigitRule(d) {
  const map = {
    0: 'Ends in 0: cube ends in 0',
    1: 'Ends in 1: cube ends in 1',
    2: 'Ends in 2: cube ends in 8',
    3: 'Ends in 3: cube ends in 7',
    4: 'Ends in 4: cube ends in 4',
    5: 'Ends in 5: cube ends in 5',
    6: 'Ends in 6: cube ends in 6',
    7: 'Ends in 7: cube ends in 3',
    8: 'Ends in 8: cube ends in 2',
    9: 'Ends in 9: cube ends in 9',
  };
  return map[d] || '';
}

export function getCubePattern(n) {
  const cube = n * n * n;
  const patterns = [];

  if (isPrime(n)) patterns.push({ label: 'Prime Base', desc: 'Cube root identification: cube ends in same last digit as base' });
  if (isEven(n)) patterns.push({ label: 'Even Base', desc: 'Cube of even = always even' });
  else patterns.push({ label: 'Odd Base', desc: 'Cube of odd = always odd' });

  if (n <= 10) patterns.push({ label: '🎯 Must Know', desc: 'Cubes 1–10 are essential for IBPS PO & CAT' });
  else if (n <= 15) patterns.push({ label: '⭐ Important', desc: 'Cubes 11–15 appear in data interpretation' });
  else patterns.push({ label: '📈 Advanced', desc: 'Mastering this sets you apart from competitors' });

  patterns.push({ label: 'Digital Root', desc: `Digital root of ${cube} = ${getDigitalRoot(cube)}` });

  return patterns;
}

// ============================================================
// QUIZ HELPERS
// ============================================================

export function generateTableQuestion(difficulty) {
  let maxN;
  if (difficulty === 'easy') maxN = 10;
  else if (difficulty === 'medium') maxN = 20;
  else maxN = 30;

  const n = randInt(2, maxN);
  const m = randInt(2, 12);
  const answer = n * m;
  const options = generateOptions(answer, difficulty);
  return { question: `${n} × ${m} = ?`, answer, options, type: 'table' };
}

export function generateSquareQuestion(difficulty) {
  let maxN;
  if (difficulty === 'easy') maxN = 15;
  else if (difficulty === 'medium') maxN = 30;
  else maxN = 50;

  const n = randInt(2, maxN);
  const answer = n * n;
  const options = generateOptions(answer, difficulty);
  return { question: `${n}² = ?`, answer, options, type: 'square' };
}

export function generateCubeQuestion(difficulty) {
  let maxN;
  if (difficulty === 'easy') maxN = 8;
  else if (difficulty === 'medium') maxN = 12;
  else maxN = 20;

  const n = randInt(2, maxN);
  const answer = n ** 3;
  const options = generateOptions(answer, difficulty);
  return { question: `${n}³ = ?`, answer, options, type: 'cube' };
}

export function generateMixedQuestion(difficulty) {
  const types = ['table', 'square', 'cube'];
  const type = types[Math.floor(Math.random() * types.length)];
  if (type === 'table') return generateTableQuestion(difficulty);
  if (type === 'square') return generateSquareQuestion(difficulty);
  return generateCubeQuestion(difficulty);
}

function generateOptions(answer, difficulty) {
  const spread = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 30 : 80;
  const opts = new Set([answer]);
  while (opts.size < 4) {
    const delta = randInt(1, spread);
    const sign = Math.random() > 0.5 ? 1 : -1;
    const val = answer + sign * delta;
    if (val > 0 && val !== answer) opts.add(val);
  }
  return shuffle([...opts]);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDigitalRoot(n) {
  if (n === 0) return 0;
  return 1 + (n - 1) % 9;
}

// ============================================================
// FILTER HELPERS
// ============================================================

export function filterNumbers(numbers, filter) {
  switch (filter) {
    case 'odd': return numbers.filter(isOdd);
    case 'even': return numbers.filter(isEven);
    case 'prime': return numbers.filter(isPrime);
    case 'composite': return numbers.filter(isComposite);
    default: return numbers;
  }
}
