import React from 'react';
import { Link } from 'react-router-dom';

export default class FrontUtils {
	static renderText(text, changeColor, resetColor) {
		if (text !== undefined && text !== null) {
			text = text.split('§')
			const render = text.map((part, index) => {
				const links_start = part.split('[');
				let res = [links_start[0]];
				links_start.forEach((start, index) => {
					if (index > 0) {
						const end = start.split(']');
						const link = end[0].split(';');
						if (!link[1]) {
							res.push(
								<a
									key={index}
									href={(link[0].includes('@') ? "mailto:" : "") + link[0]}
									target={link[0].includes('@') ? "" : "_blank"}
									rel="noopener noreferrer"
									onMouseDown={changeColor}
									onMouseUp={resetColor}
								>
									<u>{link[0]}</u>↗
								</a>
							)
						} else {
							if (link[1][0] === '/') {
								res.push(
									<Link
										key={index}
										to={link[1]}
										onMouseDown={changeColor}
										onMouseUp={resetColor}
									>
										<u>{link[0]}</u>↗
									</Link>
								);
							} else {
								res.push(
									<a
										key={index}
										href={(link[1].includes('@') ? "mailto:" : "") + link[1]}
										target={link[1].includes('@') ? "" : "_blank"}
										rel="noopener noreferrer"
										onMouseDown={changeColor}
										onMouseUp={resetColor}
									>
										<u>{link[0]}</u>↗
									</a>
								);
							}
						}
						res.push(end[1]);
					}
				})
				if (index === text.length-1) {
					return <span key={index}>{res}</span>
				}
				return <span key={index}>{res}<br/></span>
			})
			return render
		}
		return null
	}

	static renderInline(text) {
		if (text !== undefined && text !== null) {
			return text.split('§').join(' ');
		}
		return null
	}

	static renderLanguage(text) {
		if (text !== undefined && text !== null) {
			const words = text.split('_');
			const last = words[words.length-1];
			const rest = words.slice(0,-1);
			rest.push(` (${last})`);
			return rest;
		}
		return null
	}
	
	static renderTitle(resource) {
		if (resource) {
			return `${resource.name.split('_')
				.map(word => {
					return word.charAt(0).toUpperCase() + word.substr(1,word.length+1)
				})
				.join(" ")}${!resource.params || resource.params.unique ? '' : 's'}`;
		}
		return null
	}

	// date input format : numDay Mmm YYYY (en)
	static orderByDate(array) {
		let i = 0;
		while (i < array.length-1) {
			if (new Date(array[i].date) < new Date(array[i+1].date)) {
				let tmp = array[i];
				array[i] = array[i+1]
				array[i+1] = tmp
				i = 0
			} else i++
		}
		return array
	}
}