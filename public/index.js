const buttonElement = document.querySelector("#btn");
const outputElement = document.querySelector("#output");

buttonElement.addEventListener('click', async () => {
  const response = await fetch('/api/hello');
  const text = await response.text();
  outputElement.textContent = text;
});