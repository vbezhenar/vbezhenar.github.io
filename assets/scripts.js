initDivHighlightCopyButton();

function initDivHighlightCopyButton() {
  const divHighlightElements = document.querySelectorAll("div.highlight");
  for (const element of divHighlightElements) {
    element.addEventListener("mouseenter", handleDivHighlightMouseEnter);
    element.addEventListener("mouseleave", handleDivHighlightMouseLeave);
  }
}

function handleDivHighlightMouseEnter(event) {
  const divHighlightElement = event.target;
  let copyButtonElement = divHighlightElement.querySelector("button.copy");
  if (copyButtonElement === null) {
    copyButtonElement = document.createElement("button");
    copyButtonElement.classList.add("copy");
    copyButtonElement.textContent = "\u29c9";
    copyButtonElement.addEventListener("click", handleCopyButtonClick);
    divHighlightElement.appendChild(copyButtonElement);
    forceReflow(copyButtonElement);
  }
  copyButtonElement.classList.add("visible");
}

function handleDivHighlightMouseLeave(event) {
  const divHighlightElement = event.target;
  const copyButtonElement = divHighlightElement.querySelector("button.copy");
  copyButtonElement.classList.remove("visible");
}

async function handleCopyButtonClick(event) {
  const copyButtonElement = event.target;
  const divHighlightElement = copyButtonElement.parentElement;
  const preElement = divHighlightElement.querySelector("pre");
  const text = preElement.textContent;
  await navigator.clipboard.writeText(text);
  copyButtonElement.textContent = "\u2713";
  await new Promise((resolve) => setTimeout(resolve, 2000));
  copyButtonElement.textContent = "\u29c9";
}

function forceReflow(element) {
  element.offsetHeight;
}
