// @zachleat’s heading-anchors.js
// Thank you to https://github.com/daviddarnes/heading-anchors
// Thank you to https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/

let globalInstanceIndex = 0;

class HeadingAnchors {
	constructor(selector = "h2,h3,h4,h5,h6") {
		this.selector = selector;
		this.headingStyles = {};
		this.instanceIndex = globalInstanceIndex++;
	}

	get supports() {
		return "replaceSync" in CSSStyleSheet.prototype;
	}

	get supportsAnchorPosition() {
		return CSS.supports("anchor-name: none");
	}

	init() {
		if (!this.supports) {
			return;
		}

		let sheet = new CSSStyleSheet();
		sheet.replaceSync(this.css);
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

		this.headings.forEach((heading, index) => {
			if (!heading.hasAttribute("data-ha-exclude")) {
				let anchor = this.getAnchorElement(heading);
				let placeholder = this.getPlaceholderElement();

				// Prefers anchor position approach for better accessibility
				// https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
				if (this.supportsAnchorPosition) {
					let anchorName = `--ha_${this.instanceIndex}_${index}`;
					placeholder.style.setProperty("anchor-name", anchorName);
					anchor.style.positionAnchor = anchorName;
				}

				heading.appendChild(placeholder);
				heading.after(anchor);
			}
		});
	}

	// Polyfill-only
	positionAnchorFromPlaceholder(placeholder) {
		if (!placeholder) {
			return;
		}

		let heading = placeholder.closest("h1,h2,h3,h4,h5,h6");
		if (!heading.nextElementSibling) {
			return;
		}

		// TODO next element could be more defensive
		this.positionAnchor(heading.nextElementSibling);
	}

	// Polyfill-only
	positionAnchor(anchor) {
		if (!anchor || !anchor.previousElementSibling) {
			return;
		}

		// TODO previous element could be more defensive
		let heading = anchor.previousElementSibling;
		this.setFontProp(heading, anchor);

		if (this.supportsAnchorPosition) {
			// quit early
			return;
		}

		let placeholder = heading.querySelector(`.${this.classes.placeholder}`);
		if (placeholder) {
			anchor.style.setProperty("--ha_offsetx", `${placeholder.offsetLeft}px`);
			anchor.style.setProperty("--ha_offsety", `${placeholder.offsetTop}px`);
		}
	}

	setFontProp(heading, anchor) {
		let placeholder = heading.querySelector(`.${this.classes.placeholder}`);
		if (placeholder) {
			let style = getComputedStyle(placeholder);
			let props = ["font-weight", "font-size", "line-height", "font-family"];
			let font = props.map((name) => style.getPropertyValue(name));
			anchor.style.setProperty(
				"font",
				`${font[0]} ${font[1]}/${font[2]} ${font[3]}`,
			);
		}
	}

	getAccessibleTextPrefix() {
		// Useful for i18n
		return "Jump to section titled";
	}

	getContent() {
		return "#";
	}

	// Placeholder nests inside of heading
	getPlaceholderElement() {
		let ph = document.createElement("span");
		ph.setAttribute("aria-hidden", true);
		ph.classList.add(this.classes.placeholder);
		let content = this.getContent();
		if (content) {
			ph.textContent = content;
		}

		ph.addEventListener("mouseover", (e) => {
			let placeholder = e.target.closest(`.${this.classes.placeholder}`);
			if (placeholder) {
				this.positionAnchorFromPlaceholder(placeholder);
			}
		});

		return ph;
	}

	getAnchorElement(heading) {
		let anchor = document.createElement("a");
		anchor.href = `#${heading.id}`;
		anchor.classList.add(this.classes.anchor);

		let content = this.getContent();
		anchor.innerHTML = `<span class="${this.classes.srOnly}">${this.getAccessibleTextPrefix()}: ${heading.textContent}</span>${content ? `<span aria-hidden="true">${content}</span>` : ""}`;

		anchor.addEventListener("focus", (e) => {
			let anchor = e.target.closest(`.${this.classes.anchor}`);
			if (anchor) {
				this.positionAnchor(anchor);
			}
		});

		anchor.addEventListener("mouseover", (e) => {
			// when CSS anchor positioning is supported, this is only used to set the font
			let anchor = e.target.closest(`.${this.classes.anchor}`);
			this.positionAnchor(anchor);
		});

		return anchor;
	}

	get headings() {
		return document.querySelectorAll(
			this.selector.split(",").map((entry) => `${entry.trim()}[id]`),
		);
	}

	get classes() {
		return {
			anchor: "ha",
			placeholder: "ha-placeholder",
			srOnly: "ha-visualhide",
		};
	}

	get css() {
		return `
.${this.classes.srOnly} {
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}
.${this.classes.anchor} {
  position: absolute;
  left: var(--ha_offsetx);
  top: var(--ha_offsety);
  text-decoration: none;
  opacity: 0;
}
.${this.classes.placeholder} {
  opacity: 0.3;
}
.${this.classes.anchor}:is(:focus-within, :hover) {
  opacity: 1;
}
.${this.classes.anchor},
.${this.classes.placeholder} {
  display: inline-block;
  padding: 0 0.25em;

  /* Disable selection of visually hidden label */
  -webkit-user-select: none;
  user-select: none;
}

@supports (anchor-name: none) {
  .${this.classes.anchor} {
    position: absolute;
    left: anchor(left);
    top: anchor(top);
  }
}
`;
	}
}

window.addEventListener("load", function () {
	const anchors = new HeadingAnchors();
	anchors.init();
});
