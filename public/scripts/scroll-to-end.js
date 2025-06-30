window.addEventListener("load", function () {
	// Find all elements that should be scrolled to end
	const scrollToEndElements = document.querySelectorAll(".scroll-to-end");

	scrollToEndElements.forEach((el) => {
		// Only scroll if element has overflow content
		if (el.scrollWidth > el.clientWidth) {
			// Scroll to the end
			el.scrollLeft = el.scrollWidth;

			// Update UI indicators if scrollable.js is present
			if (el.classList.contains("js-scrollable")) {
				const GAP = 5;
				const parent = el.parentElement;

				// Update scroll state classes
				parent.classList.toggle("is__scrolled", el.scrollLeft > GAP);
				parent.classList.toggle(
					"is__end",
					el.scrollLeft + el.offsetWidth > el.scrollWidth - GAP,
				);
			}
		}
	});
});
