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
    const image = document.createElement("img");
    image.src = "/assets/copy.svg?230802";
    image.width = 16;
    image.height = 16;
    image.alt = "Copy";
    copyButtonElement.appendChild(image);
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
  const copyButtonElement = event.currentTarget;
  const divHighlightElement = copyButtonElement.parentElement;
  const preElement = divHighlightElement.querySelector("pre");
  const text = preElement.textContent;
  navigator.clipboard.writeText(text);
}

function forceReflow(element) {
  element.offsetHeight;
}
