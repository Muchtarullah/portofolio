const form = document.querySelector("form");
const statusTxt = form.querySelector(".button-area span");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sedang Mengirim";
  form.classList.add("disabled");

  try {
    const response = await fetch("message.php", {
      method: "POST",
      body: new FormData(form),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text();

    if (
      result.includes("required") ||
      result.includes("valid") ||
      result.includes("failed")
    ) {
      statusTxt.style.color = "red";
    } else {
      form.reset();
      setTimeout(() => {
        statusTxt.style.display = "none";
      }, 3000);
    }

    statusTxt.innerText = result;
    form.classList.remove("disabled");
  } catch (error) {
    console.error("Error:", error);
    // Handle the error as needed
  }
});
