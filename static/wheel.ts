const items = ["gift 1", "gift 2", "gift 3", "gift 4", "gift 5", "gift 6"];

const itemsContainer = document.querySelector("#wheel-items") as HTMLDivElement;
for (const item of items) {
  const element = document.createElement("div");
  element.classList.add("wheel-item");
  const textElement = document.createElement("span");
  textElement.classList.add("wheel-item-text");
  textElement.innerText = item;
  element.appendChild(textElement);
  itemsContainer.appendChild(element);
}

const regex = /^01([0-2]|5){1}[0-9]{8}$/;
async function prespin(): Promise<number | null> {
  let phone = prompt("Enter your phone number");
  if (phone?.match(regex)) {
    const res = await fetch("../src/app.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone })
    });
    const obj = JSON.parse(
      new TextDecoder().decode((await res.body?.getReader().read())?.value)
    );
    if (obj.new) {
      return obj.random;
    } else {
      alert(`Your gift is ${obj.item}`);
    }
  } else {
    alert("Invalid Egyptian phone number");
    prespin();
  }
  return null;
}

const btn = document.querySelector("#wheel-btn") as HTMLButtonElement;
btn.onclick = async () => {
  btn.disabled = true;
  let random = await prespin();
  if (random) {
    itemsContainer.style.transform = `rotate(-${
      random * (360 / items.length)
    }deg)`;
    setTimeout(() => {
      alert(
        `Congratulations! Your gift is ${
          items[(random as number) % items.length]
        }`
      );
      itemsContainer.style.transform = "rotate(0deg)";
      btn.disabled = false;
    }, 5000);
  } else {
    btn.disabled = false;
  }
};
