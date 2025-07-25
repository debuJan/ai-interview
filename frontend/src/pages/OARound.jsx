import React, { useState, useEffect } from "react";
import "../styles/oaround.css";

const oaQuestions = [
 {
    title: "1. Two Sum (Array)",
    content: (
      <>
        <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
        <h4>Example:</h4>
        <pre>
{`Input: nums = [2,7,11,15], target = 9
Output: [0,1]`}
        </pre>
        <h4>Approach:</h4>
        <ul>
          <li>Use a HashMap to store number and index.</li>
          <li>Time: O(n)</li>
        </ul>
      </>
    ),
    logic: (
      <>
        <h4>Logic:</h4>
        <p>
          Loop through the array. For each element, calculate the difference
          between the target and current number. If this difference exists in
          the hashmap, we found the pair. Otherwise, store the number with its index.
        </p>
      </>
    ),
  }, // ✅ This comma was likely missing
  {
    title: "2. Longest Substring Without Repeating Characters",
    content: (
      <>
        <p>Given a string s, find the length of the longest substring without repeating characters.</p>
        <h4>Example:</h4>
        <pre>
{`Input: s = "abcabcbb"
Output: 3 ("abc")`}
        </pre>
        <h4>Approach:</h4>
        <ul>
          <li>Use Sliding Window + Set</li>
          <li>Time: O(n)</li>
        </ul>
      </>
    ),
    logic: (
      <>
        <h4>Logic:</h4>
        <p>
          Maintain a sliding window with a set of characters. If a character repeats, shrink the window from the left until no duplicates. Keep track of the max length.
        </p>
      </>
    ),
  },
  {
  title: "3. Kth Largest Element in an Array",
  content: (
    <>
      <p>Find the kth largest element in an unsorted array.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Use Min-Heap of size k or Quickselect algorithm.</li>
        <li>Time: O(n log k) or O(n)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        To find the Kth largest, use a min-heap (priority queue) of size K. 
        Iterate over the array and maintain the heap such that it always contains the K largest elements seen so far. 
        At the end, the top of the min-heap will be the Kth largest element.
      </p>
      <p><b>Alternative:</b> Use Quickselect (a variant of Quicksort) to partition and recursively find the Kth largest in O(n) average time.</p>
    </>
  ),
},

  {
  title: "4. Maximum Subarray (Kadane’s Algorithm)",
  content: (
    <>
      <p>Find the contiguous subarray with the largest sum.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Use Kadane’s algorithm.</li>
        <li>Time: O(n)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Initialize two variables: <code>maxSoFar</code> and <code>maxEndingHere</code> to the first element.
      </p>
      <p>
        Traverse the array from the second element:
        For each element <code>num</code>, set <code>maxEndingHere = max(num, maxEndingHere + num)</code> and update <code>maxSoFar = max(maxSoFar, maxEndingHere)</code>.
      </p>
      <pre>
{`function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}`}
      </pre>
    </>
  ),
},


{
  title: "5. Valid Parentheses",
  content: (
    <>
      <p>
        Given a string containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
      </p>
      <h4>Example:</h4>
      <pre>
{`Input: s = "()[]{}"
Output: true`}
      </pre>
     
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Use a stack to track open brackets. Push when you see <code>(</code>, <code>{'{'}</code>, <code>[</code>, and for closing brackets, pop and check if they match.
      </p>
      <p>
        If any mismatch occurs or the stack is not empty at the end, return false. Else, return true.
      </p>
      <pre>
{`function isValid(s) {
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
}`}
      </pre>
    </>
  ),
},



 {
  title: "6. Merge Intervals",
  content: (
    <>
      <p>Given an array of intervals, merge all overlapping intervals.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Sort intervals by start time.</li>
        <li>Iterate and merge overlapping intervals.</li>
        <li>Time: O(n log n), Space: O(n)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Sort the intervals based on start time. Initialize a result array with the first interval.
        For each interval, compare it with the last interval in the result:
        if they overlap, merge them; otherwise, push the current interval.
      </p>
      <pre>
{`function merge(intervals) {
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
}`}
      </pre>
    </>
  ),
},
{
  title: "7. Two Sum",
  content: (
    <>
      <p>Find indices of two numbers in an array that sum up to a target.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Use a hashmap to track seen values.</li>
        <li>Time: O(n), Space: O(n)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Iterate through the array, for each element check if the complement (target - current)
        exists in a hashmap. If it does, return indices. Otherwise, store the number and its index.
      </p>
      <pre>
{`function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.hasOwnProperty(complement)) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
}`}
      </pre>
    </>
  ),
},

 {
  title: "8. Koko Eating Bananas",
  content: (
    <>
      <p>Given piles of bananas and hours h, find minimum eating speed K so Koko can finish all in h hours.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Binary Search from 1 to max(pile).</li>
        <li>Check if current speed can finish in h hours.</li>
        <li>Time: O(n log m)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Use binary search between 1 and max(piles). For each mid value, calculate total hours needed.
        If total hours &gt; h, increase speed. Else, try lower speeds.
      </p>
      <pre>
{`function minEatingSpeed(piles, h) {
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
}`}
      </pre>
    </>
  ),
},
{
  title: "9. Search in Rotated Sorted Array",
  content: (
    <>
      <p>Search for a target in a rotated sorted array.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Binary Search with conditionals for rotation.</li>
        <li>Time: O(log n)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Use binary search. At each step, determine whether left or right part is sorted.
        Then decide which side to search based on where target can lie.
      </p>
      <pre>
{`function search(nums, target) {
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
}`}
      </pre>
    </>
  ),
},
{
  title: "10. Detect a Cycle in Linked List",
  content: (
    <>
      <p>Check if a linked list has a cycle.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Use Floyd’s Tortoise and Hare (slow & fast pointers).</li>
        <li>Time: O(n), Space: O(1)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Use two pointers, slow and fast. Move slow by 1 and fast by 2 steps.
        If they meet, a cycle exists. If fast reaches null, there's no cycle.
      </p>
      <pre>
{`function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}`}
      </pre>
    </>
  ),
},

  {
  title: "11. Trapping Rainwater",
  content: (
    <>
      <p>Compute how much water can be trapped between elevation bars.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Two pointer method with leftMax and rightMax.</li>
        <li>Time: O(n), Space: O(1)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Initialize two pointers at both ends of the array. Track leftMax and rightMax.
        At each step, move the pointer with the smaller height inward and accumulate water.
      </p>
      <pre>
{`function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= leftMax ? (leftMax = height[left]) : (water += leftMax - height[left]);
      left++;
    } else {
      height[right] >= rightMax ? (rightMax = height[right]) : (water += rightMax - height[right]);
      right--;
    }
  }

  return water;
}`}
      </pre>
    </>
  ),
},
{
  title: "12. Sliding Window Maximum",
  content: (
    <>
      <p>Find max in each sliding window of size k in an array.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Use Deque to store useful elements' indices.</li>
        <li>Time: O(n), Space: O(k)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Maintain a deque that stores indices of useful elements for the current window.
        Remove indices out of the window and maintain decreasing order.
      </p>
      <pre>
{`function maxSlidingWindow(nums, k) {
  const deque = [], result = [];

  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] === i - k) deque.shift();
    while (deque.length && nums[i] > nums[deque[deque.length - 1]]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }

  return result;
}`}
      </pre>
    </>
  ),
},
{
  title: "13. Sudoku Solver",
  content: (
    <>
      <p>Fill a 9x9 Sudoku board using backtracking.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Backtrack: Place a valid number and recurse.</li>
        <li>Time: O(9⁸¹), practical much faster.</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Traverse board. For empty cell, try digits 1–9. If placing a digit is valid (row, col, box),
        place it and recurse. If it fails later, undo and try next.
      </p>
      <pre>
{`function solveSudoku(board) {
  function isValid(r, c, ch) {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === ch || board[i][c] === ch || 
          board[3 * Math.floor(r / 3) + Math.floor(i / 3)][3 * Math.floor(c / 3) + i % 3] === ch) {
        return false;
      }
    }
    return true;
  }

  function backtrack() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') {
          for (let ch = '1'; ch <= '9'; ch++) {
            if (isValid(r, c, ch)) {
              board[r][c] = ch;
              if (backtrack()) return true;
              board[r][c] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  backtrack();
}`}
      </pre>
    </>
  ),
},

  {
  title: "14. Binary Tree Maximum Path Sum",
  content: (
    <>
      <p>Find the max sum of any path in a binary tree.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Post-order DFS, track max left + right + node value.</li>
        <li>Time: O(n)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Use post-order DFS to explore left and right subtree gains. For each node,
        compute the maximum path sum as <code>node.val + left + right</code>.
        Track global max.
      </p>
      <pre>
{`function maxPathSum(root) {
  let maxSum = -Infinity;

  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(dfs(node.left), 0);
    const right = Math.max(dfs(node.right), 0);
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
  }

  dfs(root);
  return maxSum;
}`}
      </pre>
    </>
  ),
},
{
  title: "15. Top K Frequent Elements",
  content: (
    <>
      <p>Return the k most frequent elements in an array.</p>
      <h4>Approach:</h4>
      <ul>
        <li>Use hashmap + min-heap (or bucket sort).</li>
        <li>Time: O(n log k)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Count frequency using hashmap. Use a min-heap of size k to track top frequent elements.
        Alternatively, use bucket sort from highest to lowest frequency.
      </p>
      <pre>
{`function topKFrequent(nums, k) {
  const map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  const bucket = Array(nums.length + 1).fill().map(() => []);
  for (let [num, freq] of map.entries()) {
    bucket[freq].push(num);
  }

  const result = [];
  for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...bucket[i]);
  }

  return result.slice(0, k);
}`}
      </pre>
    </>
  ),
},
{
  title: "16. Course Schedule II",
  content: (
    <>
      <p>Return course ordering if possible (topological sort).</p>
      <h4>Approach:</h4>
      <ul>
        <li>Use BFS with indegree array (Kahn’s Algorithm).</li>
        <li>Time: O(V + E)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Build adjacency list and indegree array. Start with nodes having 0 indegree.
        Use BFS to process and reduce indegree. Track the topological order.
      </p>
      <pre>
{`function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indegree = Array(numCourses).fill(0);
  const res = [];

  for (let [c, p] of prerequisites) {
    adj[p].push(c);
    indegree[c]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const curr = queue.shift();
    res.push(curr);
    for (let neighbor of adj[curr]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return res.length === numCourses ? res : [];
}`}
      </pre>
    </>
  ),
},
{
  title: "17. Pacific Atlantic Water Flow",
  content: (
    <>
      <p>Water can flow from Pacific to Atlantic if path is non-decreasing.</p>
      <h4>Approach:</h4>
      <ul>
        <li>DFS/BFS from both oceans, take intersection.</li>
        <li>Time: O(mn)</li>
      </ul>
    </>
  ),
 logic: (
  <>
    <h4>Logic:</h4>
    <p>
      Do DFS from all cells adjacent to Pacific and Atlantic. Track reachable cells and return their intersection.
    </p>
    <pre>
      <code>
        {String.raw`function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0].length;
  const pac = Array.from({ length: rows }, () => Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => Array(cols).fill(false));

  const dfs = (r, c, visited, prev) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || visited[r][c] || heights[r][c] < prev) return;
    visited[r][c] = true;
    dfs(r+1, c, visited, heights[r][c]);
    dfs(r-1, c, visited, heights[r][c]);
    dfs(r, c+1, visited, heights[r][c]);
    dfs(r, c-1, visited, heights[r][c]);
  };

  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, heights[0][c]);
    dfs(rows-1, c, atl, heights[rows-1][c]);
  }

  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, heights[r][0]);
    dfs(r, cols-1, atl, heights[r][cols-1]);
  }

  const res = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
    }
  }

  return res;
}`}
      </code>
    </pre>
  </>
),


},

  {
    title: "18. Cheapest Flights Within K Stops",
    content: (
      <>
        <p>Find cheapest flight with at most K stops.</p>
        <h4>Approach:</h4>
        <ul>
          <li>Dijkstra’s or Bellman-Ford with (city, cost, stops).</li>
          <li>Time: O(E⋅K)</li>
        </ul>
      </>
    ),
  },
  {
    title: "19. Min Cost to Connect All Points",
    content: (
      <>
        <p>Connect all points with minimal total cost (MST).</p>
        <h4>Approach:</h4>
        <ul>
          <li>Use Prim’s algorithm with priority queue.</li>
          <li>Time: O(n² log n)</li>
        </ul>
      </>
    ),
  },
 {
  title: "20. Gas Station",
  content: (
    <>
      <p>Can you complete a circuit given gas and cost?</p>
      <h4>Approach:</h4>
      <ul>
        <li>If total gas is less than total cost, return -1.</li>
        <li>Track total tank and current tank. If current tank &lt; 0, reset start index.</li>
        <li>Time: O(n), Space: O(1)</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Traverse the gas and cost arrays. At each station:
        <ul>
          <li>Add <code>gas[i] - cost[i]</code> to currentTank and totalTank.</li>
          <li>If currentTank &lt; 0, reset currentTank and move start index to i+1.</li>
        </ul>
        If totalTank &lt; 0, return -1, else return start index.
      </p>
      <pre>
        <code>
{String.raw`function canCompleteCircuit(gas, cost) {
  let totalTank = 0, currTank = 0, start = 0;
  
  for (let i = 0; i < gas.length; i++) {
    totalTank += gas[i] - cost[i];
    currTank += gas[i] - cost[i];
    
    if (currTank < 0) {
      start = i + 1;
      currTank = 0;
    }
  }
  
  return totalTank >= 0 ? start : -1;
}`}
        </code>
      </pre>
    </>
  ),
},

  {
  title: "21. Coin Change",
  content: (
    <>
      <p>Fewest coins needed to make a given amount.</p>
      <h4>Approach:</h4>
      <ul>
        <li>{`DP: dp[i] = min(dp[i - coin]) + 1`}</li>
        <li>{`Time: O(amount * coins.length)`}</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Use dynamic programming where <code>dp[i]</code> stores the minimum number of coins needed to make amount <code>i</code>.
        Initialize <code>dp[0] = 0</code> and the rest to <code>Infinity</code>.
        Iterate over each coin and update <code>dp[i]</code> if <code>dp[i - coin]</code> is known.
      </p>
      <pre>
        <code>
{String.raw`function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`}
        </code>
      </pre>
    </>
  ),
},

 {
  title: "22. Word Break",
  content: (
    <>
      <p>Check if string <code>s</code> can be segmented into space-separated words from a dictionary.</p>
      <h4>Approach:</h4>
      <ul>
        <li>{`DP: dp[i] = true if s[0:i] is breakable.`}</li>
        <li>{`Time: O(n^2), Space: O(n)`}</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Use dynamic programming where <code>dp[i]</code> means whether <code>s[0:i]</code> can be broken into valid words.
      </p>
      <p>
        Initialize <code>dp[0] = true</code> (empty string is breakable). Then for every index <code>i</code>,
        check all substrings <code>s[j:i]</code> where <code>dp[j]</code> is true and <code>s[j:i]</code> is in the wordDict.
      </p>
      <pre>
        <code>
{String.raw`function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}`}
        </code>
      </pre>
    </>
  ),
},

 {
  title: "23. Edit Distance",
  content: (
    <>
      <p>Find the minimum number of operations to convert <code>word1</code> to <code>word2</code>.</p>
      <h4>Approach:</h4>
      <ul>
        <li>{`DP: Use 2D table to track insert/delete/replace operations.`}</li>
        <li>{`Time: O(m * n), Space: O(m * n)`}</li>
      </ul>
    </>
  ),
  logic: (
    <>
      <h4>Logic:</h4>
      <p>
        Create a 2D DP table <code>dp</code> where <code>dp[i][j]</code> represents the minimum operations to convert
        <code>word1[0..i]</code> to <code>word2[0..j]</code>.
      </p>
      <p>
        Recurrence:
        <ul>
          <li>If chars match: <code>dp[i][j] = dp[i-1][j-1]</code></li>
          <li>Else: <code>dp[i][j] = 1 + min(insert, delete, replace)</code></li>
        </ul>
      </p>
      <pre>
        <code>
{String.raw`function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // delete
          dp[i][j - 1],     // insert
          dp[i - 1][j - 1]  // replace
        );
      }
    }
  }

  return dp[m][n];
}`}
        </code>
      </pre>
    </>
  ),
},

];

  export default function OARound() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showLogic, setShowLogic] = useState(false);
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const handleStartAnswer = () => {
    setShowAnswerBox(true);
    setTimeLeft(600); // 10 minutes
    setTimerActive(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [selectedQuestion]: e.target.value });
  };

  return (
    <div className="oa-layout">
      <aside className="sidebar">
        <h2>OA Questions</h2>
        <ul>
          {oaQuestions.map((q, index) => (
            <li
              key={index}
              className={selectedQuestion === index ? "active" : ""}
              onClick={() => {
                setSelectedQuestion(index);
                setShowLogic(false);
                setShowAnswerBox(false);
                setTimerActive(false);
                setTimeLeft(0);
              }}
            >
              {q.title}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        {selectedQuestion !== null ? (
          <div className="question-display">
            <h2>{oaQuestions[selectedQuestion].title}</h2>
            <div className="question-content">{oaQuestions[selectedQuestion].content}</div>

            <button
              className="show-logic-btn"
              onClick={() => setShowLogic((prev) => !prev)}
            >
              {showLogic ? "Hide Logic" : "Show Logic"}
            </button>

            {showLogic && oaQuestions[selectedQuestion].logic && (
              <div className="logic-content">{oaQuestions[selectedQuestion].logic}</div>
            )}

            {!showAnswerBox && (
              <button className="answer-start-btn" onClick={handleStartAnswer}>
                Write Your Logic
              </button>
            )}

            {showAnswerBox && (
              <div className="answer-box">
                <div className="timer">Time Left: {formatTime(timeLeft)}</div>
                <textarea
                  rows="8"
                  placeholder="Write your answer or logic here..."
                  value={answers[selectedQuestion] || ""}
                  onChange={handleAnswerChange}
                ></textarea>
              </div>
            )}
          </div>
        ) : (
          <p className="placeholder">Select a question to view its details.</p>
        )}
      </main>
    </div>
  );
}
