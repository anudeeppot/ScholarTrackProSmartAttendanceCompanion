/**
 * ScholarTrack Pro — dsa/dsa.js
 * Standalone console demo of all DSA concepts used in the app.
 * Run: node dsa/dsa.js
 *
 * Course Outcome Coverage:
 * ─────────────────────────────────────────────────────────────────
 * DSA CO1 — Searching & sorting algorithms with Big-O analysis:
 *           Linear Search O(n), Binary Search O(log n),
 *           Bubble Sort O(n²), Selection Sort O(n²),
 *           Array ops: reduce, filter, map — all O(n)
 *
 * DSA CO2 — Abstract Data Types using arrays:
 *           Stack (array-based), Queue (array-based),
 *           insert / delete / traverse / search operations
 *
 * DSA CO3 — Stacks and Queues for real-world workflows:
 *           Stack → subject add-history (LIFO)
 *           Queue → auth activity log (FIFO)
 *
 * DSA CO4 — Hash-based fast lookup:
 *           Object key-value pairs, Array.find() as hash-style lookup
 * ─────────────────────────────────────────────────────────────────
 */

'use strict';

const SEP = () => console.log('─'.repeat(52));

/* ----------------------------------------------------------------
   Sample data — mirrors the shape stored in localStorage by the app
   DSA CO2 — Array-based ADT: each array is an ADT with typed records
   DSA CO4 — Key-value shape { n, a, t } mirrors hash-map entry style
---------------------------------------------------------------- */
const SUBS = [
    // DSA CO2 — ADT record: { n: name, a: attended, t: total }
    { n: 'Mathematics',      a: 38, t: 45 },
    { n: 'Physics',          a: 22, t: 40 },
    { n: 'Computer Science', a: 44, t: 48 },
    { n: 'English',          a: 18, t: 35 },
    { n: 'Chemistry',        a: 30, t: 42 },
];
const RES = [
    // DSA CO2 — ADT record: { n: exam name, v: score }
    { n: 'Sem 1 Mid',   v: 78 },
    { n: 'Sem 1 Final', v: 84 },
    { n: 'Sem 2 Mid',   v: 71 },
    { n: 'Sem 2 Final', v: 91 },
    { n: 'Practical',   v: 88 },
];

// DSA CO1 — constant used by filter to identify at-risk subjects
const TARGET = 75;

// DSA CO1 — helper: compute attendance % for a subject record
const pct = s => s.t ? (s.a / s.t) * 100 : 0;


/* ================================================================
   1. STACK  (LIFO)
   ─────────────────────────────────────────────────────────────────
   DSA CO2 — Implements Stack ADT using a plain JS array:
             push()  → insert at top       (O(1))
             pop()   → delete from top     (O(1))
             peek()  → traverse top item   (O(1))

   DSA CO3 — Real-world workflow: models the subject add-history.
             Every time a student adds a subject in the UI, it is
             pushed. The most recently added subject sits on top,
             enabling an undo-style retrieval (LIFO order).

   App usage: addSubject() in index.html calls SubjectStack.push()
================================================================ */
SEP();
console.log('1. STACK — Subject add history  (LIFO)');
console.log('   DSA CO2: Array-based ADT | DSA CO3: Real-world workflow');
SEP();

// DSA CO2 — Array as Stack ADT: declare the underlying storage
const stack = [];

// DSA CO2 — insert operation: push each subject onto the stack
// DSA CO3 — simulates addSubject() being called 5 times in the UI
SUBS.forEach(s => {
    stack.push(s);                                                      // DSA CO2 — insert (push)
    console.log(`  PUSH → "${s.n}" | size: ${stack.length}`);
});

// DSA CO2 — delete operation: pop removes the top (most recent) item
const popped = stack.pop();                                             // DSA CO2 — delete (pop)
console.log(`  POP  ← "${popped.n}" | size: ${stack.length}`);

// DSA CO2 — traverse: peek reads top without removing it
console.log(`  PEEK → "${stack[stack.length - 1].n}"`);                // DSA CO2 — traverse (peek)


/* ================================================================
   2. QUEUE  (FIFO)
   ─────────────────────────────────────────────────────────────────
   DSA CO2 — Implements Queue ADT using a plain JS array:
             push()  → enqueue at rear     (O(1))
             shift() → dequeue from front  (O(n) for array, O(1) for linked)

   DSA CO3 — Real-world workflow: models the auth activity log.
             Events arrive in order (SIGNUP → LOGIN → LOGOUT) and
             are processed front-first (FIFO), exactly like a task
             queue or request buffer.

   App usage: signup(), login(), logout() call ActivityQueue.enqueue()
================================================================ */
SEP();
console.log('2. QUEUE — Auth activity log  (FIFO)');
console.log('   DSA CO2: Array-based ADT | DSA CO3: Real-world workflow');
SEP();

// DSA CO2 — Array as Queue ADT: declare the underlying storage
const queue = [];

// DSA CO3 — auth events arrive in chronological order
const events = [
    { type: 'SIGNUP', user: 'alice' },  // DSA CO3 — first event enqueued
    { type: 'LOGIN',  user: 'alice' },
    { type: 'LOGIN',  user: 'bob'   },
    { type: 'LOGOUT', user: 'alice' },  // DSA CO3 — last event enqueued
];

// DSA CO2 — insert operation: enqueue each event at the rear
events.forEach(e => {
    queue.push(e);                                                      // DSA CO2 — insert (enqueue)
    console.log(`  ENQUEUE → ${e.type.padEnd(8)} by "${e.user}" | queue: ${queue.length}`);
});

// DSA CO2 — delete operation: dequeue removes from the front (FIFO)
const dq = queue.shift();                                               // DSA CO2 — delete (dequeue)
console.log(`  DEQUEUE ← ${dq.type} | remaining: ${queue.length}`);


/* ================================================================
   3. BUBBLE SORT   O(n²)
   ─────────────────────────────────────────────────────────────────
   DSA CO1 — Classical sorting algorithm.
             Compares adjacent elements and swaps if out of order.
             Repeats n-1 passes; each pass bubbles the largest
             remaining element to its correct position.

             Time complexity:  O(n²) — nested loops
             Space complexity: O(n)  — copy of input array

             Justification for use here: result sets are small
             (< 20 entries), so O(n²) is perfectly acceptable and
             the algorithm is straightforward to demonstrate.

   App usage: renderResults() and showSummary() in index.html
================================================================ */
SEP();
console.log('3. BUBBLE SORT — Results by score descending  O(n²)');
console.log('   DSA CO1: Classical sorting | Time: O(n²) | Space: O(n)');
SEP();

// DSA CO1 — work on a copy so original RES is not mutated
const resArr = RES.map(r => ({ ...r }));
let swaps = 0;

console.log(`  Input:  [${resArr.map(r => r.v).join(', ')}]`);

// DSA CO1 — outer loop: n-1 passes over the array
for (let i = 0; i < resArr.length - 1; i++) {
    // DSA CO1 — inner loop: compare adjacent pairs in unsorted portion
    for (let j = 0; j < resArr.length - 1 - i; j++) {
        // DSA CO1 — swap condition: sort descending (larger value first)
        if (resArr[j].v < resArr[j + 1].v) {
            [resArr[j], resArr[j + 1]] = [resArr[j + 1], resArr[j]];  // DSA CO1 — swap
            swaps++;
        }
    }
}

console.log(`  Sorted: [${resArr.map(r => r.v).join(', ')}] | swaps: ${swaps}`);
// DSA CO1 — traverse sorted result to display ranked output
resArr.forEach((r, i) => console.log(`  #${i + 1}  ${r.n.padEnd(15)} ${r.v}`));


/* ================================================================
   4. SELECTION SORT   O(n²)
   ─────────────────────────────────────────────────────────────────
   DSA CO1 — Classical sorting algorithm.
             Each pass scans the unsorted portion to find the
             maximum element and places it at the front.

             Time complexity:  O(n²) — nested loops
             Space complexity: O(n)  — copy of input array

             Justification vs Bubble Sort: Selection Sort makes at
             most n-1 swaps (vs up to n²/2 for Bubble), making it
             preferable when write operations are costlier than reads.
             Appropriate here for the subjects list (small, infrequent).

   App usage: renderSubs() in index.html
================================================================ */
SEP();
console.log('4. SELECTION SORT — Subjects by attendance % desc  O(n²)');
console.log('   DSA CO1: Classical sorting | Time: O(n²) | Space: O(n)');
SEP();

// DSA CO1 — work on a copy so original SUBS is not mutated
const subsArr = SUBS.map(s => ({ ...s }));

console.log(`  Input:  [${subsArr.map(s => pct(s).toFixed(1) + '%').join(', ')}]`);

// DSA CO1 — outer loop: position to fill (0 → n-2)
for (let i = 0; i < subsArr.length - 1; i++) {
    // DSA CO1 — assume current position holds the maximum
    let maxIdx = i;

    // DSA CO1 — inner loop: scan remaining unsorted portion for larger %
    for (let j = i + 1; j < subsArr.length; j++) {
        if (pct(subsArr[j]) > pct(subsArr[maxIdx])) maxIdx = j;        // DSA CO1 — track max index
    }

    // DSA CO1 — swap only if a larger element was found elsewhere
    if (maxIdx !== i) [subsArr[i], subsArr[maxIdx]] = [subsArr[maxIdx], subsArr[i]]; // DSA CO1 — swap
}

console.log(`  Sorted: [${subsArr.map(s => pct(s).toFixed(1) + '%').join(', ')}]`);
// DSA CO1 — traverse sorted subjects to display ranked output
subsArr.forEach((s, i) => console.log(`  #${i + 1}  ${s.n.padEnd(22)} ${pct(s).toFixed(1)}%`));


/* ================================================================
   5. LINEAR SEARCH   O(n)
   ─────────────────────────────────────────────────────────────────
   DSA CO1 — Classical searching algorithm.
             Scans every element from index 0 until a match is found
             or the array is exhausted.

             Time complexity: O(n) — single loop, worst case full scan
             Space complexity: O(1) — no extra storage needed

             Justification: SUBS array is unsorted (subjects are added
             in arbitrary order by the user), so Binary Search cannot
             be applied. Linear Search is the correct choice here.

   App usage: showSummary() in index.html — finds first at-risk subject
================================================================ */
SEP();
console.log('5. LINEAR SEARCH — Find subject by name  O(n)');
console.log('   DSA CO1: Classical searching | Time: O(n) | Space: O(1)');
SEP();

// DSA CO1 — search target
const query = 'Physics';
console.log(`  Searching for "${query}"...`);

// DSA CO1 — single loop: check each element in sequence
for (let i = 0; i < SUBS.length; i++) {
    console.log(`  [${i}] checking "${SUBS[i].n}"`);                   // DSA CO1 — traverse each element

    // DSA CO1 — comparison: case-insensitive substring match
    if (SUBS[i].n.toLowerCase().includes(query.toLowerCase())) {
        console.log(`  ✔ Found at index ${i} → "${SUBS[i].n}"  ${pct(SUBS[i]).toFixed(1)}%`);
        break;                                                          // DSA CO1 — early exit on match
    }
}


/* ================================================================
   6. BINARY SEARCH   O(log n)
   ─────────────────────────────────────────────────────────────────
   DSA CO1 — Classical searching algorithm.
             Requires a sorted array. Repeatedly halves the search
             space by comparing the target to the middle element.

             Time complexity: O(log n) — search space halved each step
             Space complexity: O(1)    — only lo, hi, mid pointers

             Justification: RES array is sorted ascending by score
             before this call, so the pre-condition is satisfied and
             O(log n) is achievable — far better than Linear Search
             for larger datasets.

   App usage: renderResults() in index.html — finds median score
================================================================ */
SEP();
console.log('6. BINARY SEARCH — Find score in sorted array  O(log n)');
console.log('   DSA CO1: Classical searching | Time: O(log n) | Space: O(1)');
SEP();

// DSA CO1 — pre-condition: array MUST be sorted ascending
const sortedAsc = [...RES].sort((a, b) => a.v - b.v);                  // DSA CO1 — sort ascending first
const findScore = 84;

console.log(`  Sorted array: [${sortedAsc.map(r => r.v).join(', ')}]`);
console.log(`  Searching for score = ${findScore}`);

// DSA CO1 — initialise low and high boundary pointers
let lo = 0, hi = sortedAsc.length - 1;                                 // DSA CO1 — search boundaries

// DSA CO1 — loop: continue while search space is valid
while (lo <= hi) {
    // DSA CO1 — compute midpoint to halve the search space
    const mid = Math.floor((lo + hi) / 2);                             // DSA CO1 — midpoint calculation
    console.log(`  step → lo=${lo} mid=${mid} hi=${hi} | value=${sortedAsc[mid].v}`);

    if (sortedAsc[mid].v === findScore) {
        // DSA CO1 — match found: report index and exit
        console.log(`  ✔ Found "${sortedAsc[mid].n}" at index ${mid}`);
        break;
    } else if (sortedAsc[mid].v < findScore) {
        lo = mid + 1;                                                   // DSA CO1 — discard left half
    } else {
        hi = mid - 1;                                                   // DSA CO1 — discard right half
    }
}


/* ================================================================
   7. ARRAY OPERATIONS — reduce / filter / map   O(n) each
   ─────────────────────────────────────────────────────────────────
   DSA CO1 — Algorithmic analysis of built-in array higher-order
             functions, each making a single O(n) pass:

             reduce : accumulate a single value from all elements
             filter : select elements matching a condition
             map    : transform each element into a new shape

             Combined time complexity: O(3n) = O(n)

   App usage: computeStats() in index.html — called on every save,
              dashboard update, and summary generation
================================================================ */
SEP();
console.log('7. ARRAY OPS — reduce / filter / map   O(n) each');
console.log('   DSA CO1: Algorithmic analysis | Combined Time: O(n)');
SEP();

// DSA CO1 — reduce: single O(n) pass to accumulate totals
// Accumulator pattern: starts at { a:0, t:0 }, adds each subject's values
const totals  = SUBS.reduce(
    (acc, s) => { acc.a += s.a; acc.t += s.t; return acc; },           // DSA CO1 — accumulator function
    { a: 0, t: 0 }                                                      // DSA CO1 — initial value
);
const overall = totals.t ? ((totals.a / totals.t) * 100).toFixed(1) : 0;
console.log(`  reduce → overall: ${totals.a}/${totals.t} = ${overall}%`);

// DSA CO1 — filter: single O(n) pass to select at-risk subjects
// Predicate: attendance % strictly below TARGET threshold
const atRisk = SUBS.filter(
    s => s.t && pct(s) < TARGET                                         // DSA CO1 — filter predicate
);
console.log(`  filter → at-risk (below ${TARGET}%): [${atRisk.map(s => s.n).join(', ') || 'none'}]`);

// DSA CO1 — map: single O(n) pass to transform records into display strings
// Produces a new array without mutating SUBS (pure transformation)
const pctList = SUBS.map(
    s => `${s.n}: ${pct(s).toFixed(1)}%`                               // DSA CO1 — transform function
);
console.log(`  map    → %: [${pctList.join(' | ')}]`);


SEP();
console.log('✅  DSA console demo complete.');
SEP();
