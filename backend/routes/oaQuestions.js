// routes/oaQuestions.js
import express from "express";
const router = express.Router();

const oaQuestions = [
  {
    id: 1,
    title: "Two Sum (Array)",
    content: "Given an array of integers nums and a target, return indices of two numbers that add up to target.",
    approach: "Use a HashMap to store number and index. Time: O(n).",
    logic: "Loop through array, check if (target - num) exists in map, else store num."
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    content: "Find the length of the longest substring without repeating characters.",
    approach: "Use Sliding Window + Set. Time: O(n).",
    logic: "Maintain window with set of chars. If duplicate, shrink left until no duplicate."
  },
    {
    id: 3,
    title: "Kth Largest Element in an Array",
    content: "Find the kth largest element in an unsorted array.",
    approach: [
      "Use Min-Heap of size k or Quickselect algorithm.",
      "Time: O(n log k) or O(n)",
    ],
    logic: `To find the Kth largest, use a min-heap (priority queue) of size K. 
Iterate over the array and maintain the heap such that it always contains the K largest elements seen so far. 
At the end, the top of the min-heap will be the Kth largest element.

Alternative: Use Quickselect (a variant of Quicksort) to partition and recursively find the Kth largest in O(n) average time.`
  },
  {
    id: 4,
    title: "Maximum Subarray (Kadane’s Algorithm)",
    content: "Find the contiguous subarray with the largest sum.",
    approach: [
      "Use Kadane’s algorithm.",
      "Time: O(n)"
    ],
    logic: `Initialize two variables: maxSoFar and maxEndingHere to the first element.
Traverse the array from the second element:
For each element num, set maxEndingHere = max(num, maxEndingHere + num)
and update maxSoFar = max(maxSoFar, maxEndingHere).

Code:
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}`
  },
   {
    id: 5,
    title: "Valid Parentheses",
    content: "Given a string containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    example: `Input: s = "()[]{}"\nOutput: true`,
    logic: `Use a stack to track open brackets. 
Push when you see (, {, [, and for closing brackets, pop and check if they match. 
If any mismatch occurs or the stack is not empty at the end, return false. Else, return true.

Code:
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (let ch of s) {
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.pop() !== map[ch]) return false;
    }
  }

  return stack.length === 0;
}`
  },


  {
    id: 6,
    title: "Merge Intervals",
    content: "Given an array of intervals, merge all overlapping intervals.",
    approach: [
      "Sort intervals by start time.",
      "Iterate and merge overlapping intervals.",
      "Time: O(n log n), Space: O(n)"
    ],
    logic: `Sort the intervals based on start time. 
Initialize a result array with the first interval. 
For each interval, compare it with the last interval in the result: 
if they overlap, merge them; otherwise, push the current interval.

Code:
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }

  return merged;
}`
  },


   {
    id: 7,
    title: "Two Sum",
    content: "Find indices of two numbers in an array that sum up to a target.",
    approach: [
      "Use a hashmap to track seen values.",
      "Time: O(n), Space: O(n)"
    ],
    logic: `Iterate through the array, for each element check if the complement (target - current) exists in a hashmap. 
If it does, return indices. Otherwise, store the number and its index.

Code:
function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.hasOwnProperty(complement)) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
}`
  },

    {
    id: 8,
    title: "Koko Eating Bananas",
    content: "Given piles of bananas and hours h, find minimum eating speed K so Koko can finish all in h hours.",
    approach: [
      "Binary Search from 1 to max(pile).",
      "Check if current speed can finish in h hours.",
      "Time: O(n log m)"
    ],
    logic: `Use binary search between 1 and max(piles). 
For each mid value, calculate total hours needed. 
If total hours > h, increase speed. Else, try lower speeds.

Code:
function minEatingSpeed(piles, h) {
  let left = 1, right = Math.max(...piles);
  let result = right;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let hours = 0;
    for (let pile of piles) {
      hours += Math.ceil(pile / mid);
    }
    if (hours <= h) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}`
  },

{
    id: 9,
    title: "Search in Rotated Sorted Array",
    content: "Search for a target in a rotated sorted array.",
    approach: [
      "Binary Search with conditionals for rotation.",
      "Time: O(log n)"
    ],
    logic: `Use binary search. At each step, determine whether left or right part is sorted. 
Then decide which side to search based on where target can lie.

Code:
function search(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } 
    // Right half is sorted
    else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}`
  },
   {
    id: 10,
    title: "Detect a Cycle in Linked List",
    content: "Check if a linked list has a cycle.",
    approach: [
      "Use Floyd’s Tortoise and Hare (slow & fast pointers).",
      "Time: O(n), Space: O(1)"
    ],
    logic: `Use two pointers, slow and fast. Move slow by 1 and fast by 2 steps. 
If they meet, a cycle exists. If fast reaches null, there's no cycle.

Code:
function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}`
  }

];

router.get("/", (req, res) => {
  res.json(oaQuestions);
});

export default router;
