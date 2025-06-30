function showTypoPopup(message = "Typo sent!") {
	let popup = document.getElementById("typo-popup");
	if (!popup) {
		popup = document.createElement("div");
		popup.id = "typo-popup";
		document.body.appendChild(popup);
	}

	popup.textContent = message;
	popup.classList.add("show");

	setTimeout(() => {
		popup.classList.remove("show");
		setTimeout(() => (popup.style.display = "none"), 400); // match transition time
	}, 2000);
	popup.style.display = "block"; // visible for 2 seconds
}

document.addEventListener("keydown", function (e) {
	if (e.ctrlKey && e.key === "Enter") {
		const sel = window.getSelection();
		if (!sel || sel.toString().trim().length === 0) return;

		const selected = sel.toString().trim();
		const range = sel.getRangeAt(0);
		const context = range.startContainer.textContent || "";
		const snippet =
			context.slice(Math.max(0, range.startOffset - 30), range.startOffset) +
			" **" +
			selected +
			"** " +
			context.slice(range.endOffset, range.endOffset + 30);

		const formUrl =
			"https://docs.google.com/forms/d/e/1FAIpQLSfiy61JI38j3Hxf1bIX9j_0itTMFg59Q2a4TahdzjBFwNH7Hw/formResponse";
		const entry = "entry.850156191"; // Replace with your actual entry ID

		const formData = new FormData();
		formData.append(entry, snippet + "\n\nURL: " + location.href);

		fetch(formUrl, {
			method: "POST",
			mode: "no-cors",
			body: formData,
		}).then(() => {
			showTypoPopup("Вижу опечатку, спасибо!");
		});
	}
});
