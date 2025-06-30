window.addEventListener("load", function () {
	const themeToggle = document.querySelector(".theme-toggle");
	const themeText = themeToggle.querySelector("p");

	const prefersDarkScheme = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;
	const savedTheme = localStorage.getItem("theme");

	// Function to update UI and save state
	function applyTheme(theme) {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
		themeText.innerHTML = `<i class="theme-icon"></i>${theme === "dark" ? "Лучшая тема" : "Светлая тема"}`;
	}

	// Set initial theme
	if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme)) {
		applyTheme("dark");
	} else {
		applyTheme("light");
	}

	// Toggle on click
	themeToggle.addEventListener("click", function () {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		applyTheme(currentTheme === "dark" ? "light" : "dark");
	});
});
