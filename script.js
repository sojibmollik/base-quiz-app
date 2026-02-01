const quiz = [
 {q:"What is Base primarily known as?",o:["Layer 1 blockchain","Ethereum Layer 2","Centralized exchange","Hardware wallet"],a:1},
 {q:"Base is built on which blockchain?",o:["Bitcoin","Solana","Ethereum","Avalanche"],a:2},
 {q:"Who developed Base?",o:["Binance","Coinbase","Meta","Google"],a:1},
 {q:"Base uses which rollup technology?",o:["ZK Rollup","Optimistic Rollup","Sidechain","Plasma"],a:1},
 {q:"Base is built using?",o:["Polygon Stack","OP Stack","Cosmos SDK","Substrate"],a:1},
 {q:"Main benefit of Base?",o:["Higher fees","Lower gas fees","Private chain","Mining"],a:1},
 {q:"Final settlement happens on?",o:["Base","Coinbase","Ethereum","Bitcoin"],a:2},
 {q:"Does Base have a native token?",o:["Yes","No"],a:1},
 {q:"Which wallet supports Base?",o:["MetaMask","Coinbase Wallet","Trust Wallet","All"],a:3},
 {q:"Gas fees on Base are paid in?",o:["USDC","ETH","BASE","OP"],a:1},
 {q:"Smart contracts on Base use?",o:["Python","Rust","Solidity","Move"],a:2},
 {q:"Base supports which apps?",o:["DeFi","NFTs","Games","All"],a:3},
 {q:"Base improves Ethereum by?",o:["Mining","Scaling","Forking","Replacing"],a:1},
 {q:"Official bridge name?",o:["Base Bridge","ETH Bridge","Coinbase Bridge","Base Portal"],a:0},
 {q:"Base is best described as?",o:["Ethereum killer","Ethereum scaler","Private chain","Sidechain"],a:1},
 {q:"Base smart contracts are?",o:["Incompatible","Compatible with Ethereum","Written in Rust","Centralized"],a:1},
 {q:"Base consensus relies on?",o:["PoW","Ethereum PoS","PoA","DPoS"],a:1},
 {q:"Base focuses on?",o:["Developers","Users","Adoption","All"],a:3},
 {q:"Base was launched by?",o:["Google","Binance","Coinbase","Meta"],a:2},
 {q:"You love base?",o:["yes","yes","yes","no"],a:2}
];

let index = 0;
let score = 0;
let userAnswers = [];
let locked = false;

function loadQuestion() {
  locked = false;
  document.getElementById("question").innerText = quiz[index].q;
  document.getElementById("counter").innerText = `Question ${index + 1}/20`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  quiz[index].o.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = option;

    btn.onclick = () => selectAnswer(btn, i);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(button, selectedIndex) {
  if (locked) return;
  locked = true;

  userAnswers[index] = selectedIndex;

  const buttons = document.querySelectorAll(".option");

  buttons.forEach((btn, i) => {
    if (i === quiz[index].a) btn.classList.add("correct");
    if (i === selectedIndex && i !== quiz[index].a)
      btn.classList.add("wrong");
  });

  if (selectedIndex === quiz[index].a) score += 10;

  setTimeout(() => {
    index++;
    index < quiz.length ? loadQuestion() : showResult();
  }, 1000);
}

function showResult() {
  document.getElementById("quizBox").style.display = "none";
  document.getElementById("resultBox").style.display = "block";

  document.getElementById("finalPoints").innerText =
    `🏆 Your Final Score: ${score} / 200`;

  const details = document.getElementById("details");
  details.innerHTML = "";

  quiz.forEach((q, i) => {
    details.innerHTML += `
      <p><b>Q${i + 1}: ${q.q}</b></p>
      <p class="${userAnswers[i] === q.a ? 'correct' : 'wrong'}">
        Your Answer: ${q.o[userAnswers[i]]}
      </p>
      <p class="correct">
        Correct Answer: ${q.o[q.a]}
      </p>
      <hr>
    `;
  });
}

loadQuestion();