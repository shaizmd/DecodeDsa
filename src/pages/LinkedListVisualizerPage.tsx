"use client";

import React, { useState } from "react";
import { List, Plus, Minus, Edit, RefreshCcw, ArrowLeftRight, ChevronRight, ChevronLeft, Repeat } from "lucide-react";

// Node types
interface ListNode {
  value: number;
  next: ListNode | null;
  prev?: ListNode | null; // For doubly linked list
}

type ListType = "singly" | "doubly" | "circular";

function LinkedListVisualizerPage() {
  const [listType, setListType] = useState<ListType>("singly");
  const [head, setHead] = useState<ListNode | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [position, setPosition] = useState(1);
  const [operationHistory, setOperationHistory] = useState<string[]>([]);
  const [currentCode, setCurrentCode] = useState<string>("");

  // Helper to create a new node
  const createNode = (value: number): ListNode => ({ value, next: null });
  const createDoublyNode = (value: number): ListNode => ({ value, next: null, prev: null });

  // Convert list to array for rendering
  const toArray = (): ListNode[] => {
    const arr: ListNode[] = [];
    let curr = head;
    if (!curr) return arr;
    if (listType === "circular") {
      do {
        arr.push(curr);
        curr = curr.next;
      } while (curr && curr !== head);
    } else {
      while (curr) {
        arr.push(curr);
        curr = curr.next;
      }
    }
    return arr;
  };

  // Operations
  const insertAtBeginning = (value: number) => {
    let newNode: ListNode;
    if (listType === "doubly") {
      newNode = createDoublyNode(value);
      if (head) (head as ListNode).prev = newNode;
      newNode.next = head;
    } else {
      newNode = createNode(value);
      newNode.next = head;
    }
    if (listType === "circular") {
      if (!head) {
        newNode.next = newNode;
      } else {
        let tail = head;
        while (tail.next && tail.next !== head) tail = tail.next;
        tail.next = newNode;
        newNode.next = head;
      }
    }
    setHead(newNode);
    setOperationHistory((h) => [
      `Inserted ${value} at beginning`,
      ...h,
    ]);
    setCurrentCode(`function insertAtBeginning(value) {\n  const newNode = { value, next: head };\n  head = newNode;\n}`);
  };

  const insertAtEnd = (value: number) => {
    let newNode: ListNode;
    if (listType === "doubly") newNode = createDoublyNode(value);
    else newNode = createNode(value);
    if (!head) {
      if (listType === "circular") newNode.next = newNode;
      setHead(newNode);
      setOperationHistory((h) => [
        `Inserted ${value} at end (was empty)`,
        ...h,
      ]);
      setCurrentCode(`function insertAtEnd(value) { ... }`);
      return;
    }
    let curr = head;
    if (listType === "circular") {
      while (curr.next && curr.next !== head) curr = curr.next;
      curr.next = newNode;
      newNode.next = head;
    } else {
      while (curr.next) curr = curr.next;
      curr.next = newNode;
    }
    if (listType === "doubly") newNode.prev = curr;
    setOperationHistory((h) => [
      `Inserted ${value} at end`,
      ...h,
    ]);
    setCurrentCode(`function insertAtEnd(value) { ... }`);
  };

  const insertAtPosition = (value: number, pos: number) => {
    if (pos <= 1) return insertAtBeginning(value);
    let newNode: ListNode;
    if (listType === "doubly") newNode = createDoublyNode(value);
    else newNode = createNode(value);
    let curr: ListNode | null = head;
    let prev: ListNode | null = null;
    let i = 1;
    while (curr && i < pos) {
      prev = curr;
      curr = curr.next;
      i++;
    }
    if (prev) prev.next = newNode;
    newNode.next = curr;
    if (listType === "doubly") {
      newNode.prev = prev;
      if (curr) curr.prev = newNode;
    }
    setOperationHistory((h) => [
      `Inserted ${value} at position ${pos}`,
      ...h,
    ]);
    if (pos === 1) setHead(newNode);
    else setHead(head);
    setCurrentCode(`function insertAtPosition(value, pos) { ... }`);
  };

  const deleteAtBeginning = () => {
    if (!head) return;
    let newHead = head.next;
    if (listType === "circular") {
      if (head.next === head) newHead = null;
      else {
        let tail = head;
        while (tail.next && tail.next !== head) tail = tail.next;
        tail.next = head.next;
        newHead = head.next;
      }
    }
    setOperationHistory((h) => [
      `Deleted node at beginning`,
      ...h,
    ]);
    setHead(newHead);
    setCurrentCode(`function deleteAtBeginning() { ... }`);
  };

  const deleteAtEnd = () => {
    if (!head) return;
    if (!head.next || (listType === "circular" && head.next === head)) {
      setHead(null);
      setOperationHistory((h) => [
        `Deleted last node`,
        ...h,
      ]);
      setCurrentCode(`function deleteAtEnd() { ... }`);
      return;
    }
    let curr = head;
    let prev: ListNode | null = null;
    while (curr.next && curr.next !== head) {
      prev = curr;
      curr = curr.next;
    }
    if (prev) prev.next = listType === "circular" ? head : null;
    setOperationHistory((h) => [
      `Deleted node at end`,
      ...h,
    ]);
    setHead(head);
    setCurrentCode(`function deleteAtEnd() { ... }`);
  };

  const deleteAtPosition = (pos: number) => {
    if (!head) return;
    if (pos <= 1) return deleteAtBeginning();
    let curr: ListNode | null = head;
    let prev: ListNode | null = null;
    let i = 1;
    while (curr && i < pos) {
      prev = curr;
      curr = curr.next;
      i++;
    }
    if (!curr) return;
    if (prev) prev.next = curr.next;
    if (listType === "doubly" && curr.next) (curr.next as ListNode).prev = prev;
    setOperationHistory((h) => [
      `Deleted node at position ${pos}`,
      ...h,
    ]);
    setHead(head);
    setCurrentCode(`function deleteAtPosition(pos) { ... }`);
  };

  const modifyAtPosition = (pos: number, value: number) => {
    let curr = head;
    let i = 1;
    while (curr && i < pos) {
      curr = curr.next;
      i++;
    }
    if (!curr) return;
    curr.value = value;
    setOperationHistory((h) => [
      `Modified node at position ${pos} to ${value}`,
      ...h,
    ]);
    setCurrentCode(`function modifyAtPosition(pos, value) { ... }`);
    setHead({ ...head! }); // force re-render
  };

  const reverseList = () => {
    let prev: ListNode | null = null;
    let curr = head;
    let next: ListNode | null = null;
    if (listType === "circular") {
      if (!head || head.next === head) return;
      let tail = head;
      while (tail.next && tail.next !== head) tail = tail.next;
      tail.next = null;
      // Now treat as singly
    }
    while (curr) {
      next = curr.next;
      curr.next = prev;
      if (listType === "doubly") curr.prev = next;
      prev = curr;
      curr = next;
    }
    if (listType === "circular" && prev) {
      let tail = prev;
      while (tail.next) tail = tail.next;
      tail.next = prev;
    }
    setOperationHistory((h) => [
      `Reversed the list`,
      ...h,
    ]);
    setHead(prev);
    setCurrentCode(`function reverseList() { ... }`);
  };

  // UI Handlers
  const handleInsertBeginning = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) insertAtBeginning(val);
    setInputValue("");
  };
  const handleInsertEnd = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) insertAtEnd(val);
    setInputValue("");
  };
  const handleInsertPosition = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) insertAtPosition(val, position);
    setInputValue("");
  };
  const handleDeleteBeginning = () => deleteAtBeginning();
  const handleDeleteEnd = () => deleteAtEnd();
  const handleDeletePosition = () => deleteAtPosition(position);
  const handleModify = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) modifyAtPosition(position, val);
    setInputValue("");
  };
  const handleReverse = () => reverseList();

  // Render
  const nodes = toArray();

  // Add the fullCodeString variable before the return statement
  const singlyCode = `// Singly Linked List Operations
function insertAtBeginning(value) {
  const newNode = { value, next: head };
  head = newNode;
}
function insertAtEnd(value) {
  const newNode = { value, next: null };
  if (!head) { head = newNode; return; }
  let curr = head;
  while (curr.next) curr = curr.next;
  curr.next = newNode;
}
function insertAtPosition(value, pos) {
  if (pos <= 1) return insertAtBeginning(value);
  let curr = head, prev = null, i = 1;
  while (curr && i < pos) { prev = curr; curr = curr.next; i++; }
  const newNode = { value, next: curr };
  if (prev) prev.next = newNode;
}
function deleteAtBeginning() {
  if (!head) return;
  head = head.next;
}
function deleteAtEnd() {
  if (!head) return;
  if (!head.next) { head = null; return; }
  let curr = head, prev = null;
  while (curr.next) { prev = curr; curr = curr.next; }
  if (prev) prev.next = null;
}
function deleteAtPosition(pos) {
  if (!head) return;
  if (pos <= 1) return deleteAtBeginning();
  let curr = head, prev = null, i = 1;
  while (curr && i < pos) { prev = curr; curr = curr.next; i++; }
  if (prev && curr) prev.next = curr.next;
}
function modifyAtPosition(pos, value) {
  let curr = head, i = 1;
  while (curr && i < pos) { curr = curr.next; i++; }
  if (curr) curr.value = value;
}
function reverseList() {
  let prev = null, curr = head, next = null;
  while (curr) { next = curr.next; curr.next = prev; prev = curr; curr = next; }
  head = prev;
}`;

  const doublyCode = `// Doubly Linked List Operations
function insertAtBeginning(value) {
  const newNode = { value, next: head, prev: null };
  if (head) head.prev = newNode;
  head = newNode;
}
function insertAtEnd(value) {
  const newNode = { value, next: null, prev: null };
  if (!head) { head = newNode; return; }
  let curr = head;
  while (curr.next) curr = curr.next;
  curr.next = newNode;
  newNode.prev = curr;
}
function insertAtPosition(value, pos) {
  if (pos <= 1) return insertAtBeginning(value);
  let curr = head, prev = null, i = 1;
  while (curr && i < pos) { prev = curr; curr = curr.next; i++; }
  const newNode = { value, next: curr, prev: prev };
  if (prev) prev.next = newNode;
  if (curr) curr.prev = newNode;
}
function deleteAtBeginning() {
  if (!head) return;
  head = head.next;
  if (head) head.prev = null;
}
function deleteAtEnd() {
  if (!head) return;
  if (!head.next) { head = null; return; }
  let curr = head;
  while (curr.next) curr = curr.next;
  if (curr.prev) curr.prev.next = null;
}
function deleteAtPosition(pos) {
  if (!head) return;
  if (pos <= 1) return deleteAtBeginning();
  let curr = head, i = 1;
  while (curr && i < pos) { curr = curr.next; i++; }
  if (!curr) return;
  if (curr.prev) curr.prev.next = curr.next;
  if (curr.next) curr.next.prev = curr.prev;
}
function modifyAtPosition(pos, value) {
  let curr = head, i = 1;
  while (curr && i < pos) { curr = curr.next; i++; }
  if (curr) curr.value = value;
}
function reverseList() {
  let curr = head, temp = null;
  while (curr) {
    temp = curr.prev;
    curr.prev = curr.next;
    curr.next = temp;
    curr = curr.prev;
  }
  if (temp) head = temp.prev;
}`;

  const circularCode = `// Circular Linked List Operations
function insertAtBeginning(value) {
  const newNode = { value, next: null };
  if (!head) { newNode.next = newNode; head = newNode; return; }
  let tail = head;
  while (tail.next !== head) tail = tail.next;
  newNode.next = head;
  tail.next = newNode;
  head = newNode;
}
function insertAtEnd(value) {
  const newNode = { value, next: null };
  if (!head) { newNode.next = newNode; head = newNode; return; }
  let tail = head;
  while (tail.next !== head) tail = tail.next;
  tail.next = newNode;
  newNode.next = head;
}
function insertAtPosition(value, pos) {
  if (pos <= 1) return insertAtBeginning(value);
  let curr = head, prev = null, i = 1;
  while (curr && curr.next !== head && i < pos) { prev = curr; curr = curr.next; i++; }
  const newNode = { value, next: curr };
  if (prev) prev.next = newNode;
}
function deleteAtBeginning() {
  if (!head) return;
  if (head.next === head) { head = null; return; }
  let tail = head;
  while (tail.next !== head) tail = tail.next;
  head = head.next;
  tail.next = head;
}
function deleteAtEnd() {
  if (!head) return;
  if (head.next === head) { head = null; return; }
  let curr = head;
  while (curr.next.next !== head) curr = curr.next;
  curr.next = head;
}
function deleteAtPosition(pos) {
  if (!head) return;
  if (pos <= 1) return deleteAtBeginning();
  let curr = head, prev = null, i = 1;
  while (curr && curr.next !== head && i < pos) { prev = curr; curr = curr.next; i++; }
  if (prev && curr) prev.next = curr.next;
}
function modifyAtPosition(pos, value) {
  let curr = head, i = 1;
  while (curr && curr.next !== head && i < pos) { curr = curr.next; i++; }
  if (curr) curr.value = value;
}
function reverseList() {
  if (!head || head.next === head) return;
  let prev = null, curr = head, next = null, tail = head;
  do { tail = tail.next; } while (tail.next !== head);
  do {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  } while (curr !== head);
  head.next = prev;
  head = prev;
}`;

  const fullCodeString =
    listType === "doubly"
      ? doublyCode
      : listType === "circular"
      ? circularCode
      : singlyCode;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <List className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Linked List Visualizer
            </h1>
          </div>
          <p className="mt-2 text-gray-600">Visualize singly, doubly, and circular linked list operations step by step</p>
        </div>
      </header>

      {/* List type selector outside all cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-4 flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${listType === "singly" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-blue-100"}`}
          onClick={() => setListType("singly")}
        >
          Singly
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${listType === "doubly" ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-purple-100"}`}
          onClick={() => setListType("doubly")}
        >
          Doubly
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${listType === "circular" ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-green-100"}`}
          onClick={() => setListType("circular")}
        >
          Circular
        </button>
      </div>

      <main className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Linked List Controls</h2>
            {/* Value and Position Inputs at the top */}
            <div className="flex flex-wrap gap-2 mb-6">
              <input
                type="number"
                className="border px-2 py-1 rounded w-24 focus:ring-2 focus:ring-blue-500"
                placeholder="Value"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
              <input
                type="number"
                className="border px-2 py-1 rounded w-24 focus:ring-2 focus:ring-blue-500"
                placeholder="Position"
                value={position}
                min={1}
                onChange={e => setPosition(Number(e.target.value))}
              />
            </div>
            {/* Insertion Controls */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Insertion</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <button onClick={handleInsertBeginning} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                  <Plus className="w-5 h-5 inline mr-1" /> Beginning
                </button>
                <button onClick={handleInsertEnd} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
                  <Plus className="w-5 h-5 inline mr-1" /> End
                </button>
                <button onClick={handleInsertPosition} className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-semibold">
                  <Plus className="w-5 h-5 inline mr-1" /> At Position
                </button>
              </div>
            </div>

            {/* Deletion Controls */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 mt-4">Deletion</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <button onClick={handleDeleteBeginning} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
                  <Minus className="w-5 h-5 inline mr-1" /> Beginning
                </button>
                <button onClick={handleDeleteEnd} className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 font-semibold">
                  <Minus className="w-5 h-5 inline mr-1" /> End
                </button>
                <button onClick={handleDeletePosition} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold">
                  <Minus className="w-5 h-5 inline mr-1" /> At Position
                </button>
              </div>
            </div>

            {/* Modify & Reverse Controls */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 mt-4">Other Operations</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <button onClick={handleModify} className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold">
                  <Edit className="w-5 h-5 inline mr-1" /> Modify
                </button>
                <button onClick={handleReverse} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
                  <RefreshCcw className="w-5 h-5 inline mr-1" /> Reverse
                </button>
              </div>
            </div>
          </div>

          {/* Right: Visualization & Legend */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Linked List Visualization</h2>
              <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[120px] flex items-center gap-8 mb-8 overflow-x-auto bg-gradient-to-r from-blue-50 to-purple-50">
                {nodes.length === 0 ? (
                  <div className="text-gray-400">List is empty</div>
                ) : (
                  nodes.map((node, idx) => (
                    <div key={idx} className="flex items-center relative">
                      {/* Node box */}
                      <div className={`relative px-6 py-3 rounded-lg font-bold shadow-md border-2 ${
                        listType === "doubly"
                          ? "bg-purple-100 border-purple-400"
                          : listType === "circular"
                          ? "bg-green-100 border-green-400"
                          : "bg-blue-100 border-blue-400"
                      }`}>
                        {/* Doubly: prev arrow */}
                        {listType === "doubly" && idx !== 0 && (
                          <ChevronLeft className="w-4 h-4 text-purple-500 absolute left-[-24px] top-1/2 -translate-y-1/2" />
                        )}
                        {node.value}
                        {/* Singly: next arrow, Doubly: next arrow */}
                        {(listType === "singly" || (listType === "doubly" && idx !== nodes.length - 1)) && (
                          <ChevronRight className={`w-4 h-4 absolute right-[-24px] top-1/2 -translate-y-1/2 ${listType === "doubly" ? "text-purple-500" : "text-blue-500"}`} />
                        )}
                      </div>
                      {/* Arrows between nodes */}
                      {idx !== nodes.length - 1 && (
                        <ArrowLeftRight className={`w-8 h-8 mx-2 ${
                          listType === "doubly"
                            ? "text-purple-400"
                            : listType === "circular"
                            ? "text-green-400"
                            : "text-blue-400"
                        }`} />
                      )}
                      {/* Circular loop arrow */}
                      {listType === "circular" && idx === nodes.length - 1 && (
                        <div className="flex items-center ml-2">
                          <Repeat className="w-8 h-8 text-green-500 animate-spin-slow" />
                          <span className="ml-1 text-green-700 font-semibold">Head</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 text-sm bg-white rounded-lg p-4 shadow-sm border mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded"></div>
                  <span>Node</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                  <span>Next Pointer</span>
                </div>
                {listType === "doubly" && (
                  <>
                    <ChevronLeft className="w-4 h-4 text-purple-500" />
                    <span>Prev Pointer</span>
                  </>
                )}
                {listType === "circular" && (
                  <>
                    <Repeat className="w-4 h-4 text-green-500" />
                    <span>Points to Head</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Operation History: full width below both columns */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col mt-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Operation History</h2>
          <div className="h-[300px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
            {operationHistory.slice(0, 20).map((op, idx) => (
              <div
                key={idx}
                className={`p-2 mb-2 rounded-lg ${
                  op.startsWith("Error")
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {op}
              </div>
            ))}
          </div>
        </div>

        {/* Code Section: full width below everything */}
        <details className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-7xl mx-auto mb-8">
          <summary className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer select-none">Show/Hide Code for Operations</summary>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Code for Current Operation</h3>
            <pre className="bg-gray-100 rounded p-4 text-xs overflow-x-auto mb-4 border border-gray-200 shadow-inner">{currentCode}</pre>
            <h3 className="font-semibold text-gray-900 mb-2">Full Code for All Operations</h3>
            <pre className="bg-gray-100 rounded p-4 text-xs overflow-x-auto border border-gray-200 shadow-inner">{fullCodeString}</pre>
          </div>
        </details>
      </main>
    </div>
  );
}

export default LinkedListVisualizerPage; 