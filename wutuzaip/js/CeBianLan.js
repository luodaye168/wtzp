
	var box = document.getElementById("test")
	var btn = document.getElementById("btn")
	btn.onclick = function () {
		if (box.offsetLeft == -200) {
			box.style['margin-left'] = 200 + "px";
			// move.style['margin-left'] = 200 + "px";
			
		} else {
			box.style['margin-left'] = 0 + "px"
			// move.style['margin-left'] = 0 + "px";
		}
	}
