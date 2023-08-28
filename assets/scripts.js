addDivHighlightCopyButtons();

function addDivHighlightCopyButtons() {
  const divHighlightElements = document.querySelectorAll("div.highlight");
  for (const divHighlightElement of divHighlightElements) {
    const copyButtonElement = document.createElement("button");
    copyButtonElement.classList.add("copy");
    const image = document.createElement("img");
    image.src = "/assets/copy.svg?230802";
    image.width = 16;
    image.height = 16;
    image.alt = "Copy";
    copyButtonElement.appendChild(image);
    copyButtonElement.addEventListener("click", handleCopyButtonClick);
    divHighlightElement.appendChild(copyButtonElement);
  }
}

function handleCopyButtonClick(event) {
  const copyButtonElement = event.currentTarget;
  const divHighlightElement = copyButtonElement.parentElement;
  const preElement = divHighlightElement.querySelector("pre");
  const text = preElement.textContent;
  navigator.clipboard.writeText(text);
}
