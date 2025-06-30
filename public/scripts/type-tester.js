window.addEventListener("load", function () {
	fontSizeSlider.addEventListener("input", () => {
		const fontSize = fontSizeSlider.value + "px";
		testerInput.style.fontSize = fontSize;
	});
});
