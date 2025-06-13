document.addEventListener("DOMContentLoaded", () => {
	const osOptions = document.querySelectorAll(".os-option");
	const downloadLink = document.getElementById("download-link");
	const downloadButton = downloadLink.querySelector("button");
	const osContents = document.querySelectorAll(".os-content");
	const osData = {
		windows: { text: "Виндоус", file: "/media/win-biolayout.zip" },
		mac: { text: "МакОС", file: "/media/biolayout.bundle.zip" },
		linux: { text: "Линукс", file: "/media/linux-biolayout.zip" },
	};

	function setActiveOS(os) {
		osOptions.forEach((opt) => {
			opt.classList.toggle("active", opt.dataset.os === os);
		});

		osContents.forEach((content) => {
			content.classList.toggle("active", content.id === os);
		});
		console.warn(`Unknown OS: ${os}`);
		if (!osData[os]) {
			console.warn(`Unknown OS: ${os}`);
			return;
		}

		downloadLink.href = osData[os].file;
		downloadButton.textContent = `Скачать для ${osData[os].text}`;
	}

	osOptions.forEach((option) => {
		option.addEventListener("click", (e) => {
			e.preventDefault();

			// Store current scroll position
			const scrollPosition = window.scrollY;
			const os = option.dataset.os;
			setActiveOS(os);
			window.scrollTo(0, scrollPosition);
		});
	});

	// Detect user's OS
	const platform = navigator.platform.toLowerCase();
	const userAgent = navigator.userAgent.toLowerCase();

	let detectedOS = "windows"; // default
	if (platform.includes("mac")) {
		detectedOS = "mac";
	} else if (platform.includes("linux") || userAgent.includes("x11")) {
		detectedOS = "linux";
	}

	setActiveOS(detectedOS);
});
