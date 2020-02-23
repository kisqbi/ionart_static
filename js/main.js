var iso;
var selectedItem = null;

function menu_item_click(event) {
	let items = document.querySelectorAll(".grid-menu-item.selected");
	for (let i = 0; i < items.length; i++) {
		items[i].classList.remove("selected");
	}
	event.target.classList.toggle("selected");
	let value = event.target.getAttribute("data-filter");
	event.target.classList.contains("selected") ? (selectedItem = value) : (selectedItem = null);
	iso.arrange({ filter: value });
}

document.addEventListener("DOMContentLoaded", function() {

    /* Init Materialize stuffs */
	M.AutoInit();
	var elems = document.querySelectorAll(".sidenav");
	var instances = M.Sidenav.init(elems, { edge: "right" });

	let grid = document.querySelector(".grid");

    iso = new Isotope(grid, {
		itemSelector: ".grid-item",
		layoutMode: "fitRows"
	});
	
    let imgLoad = imagesLoaded(grid, function(instance) {
		iso.arrange(".grid-item");
	});

	imgLoad.on("progress", function(instance, image) {
		iso.arrange(".grid-item");
	});
	
    let i = 0;
	const menu_item = document.querySelectorAll(".grid-menu-item");
	for (i = 0; i < menu_item.length; i++) {
		menu_item[i].addEventListener("click", menu_item_click);
	}

	const grid_items = document.querySelectorAll(".grid-item");
	for (i = 0; i < grid_items.length; i++) {
		grid_items[i].addEventListener("mouseover", grid_item_mouseover);
		grid_items[i].addEventListener("mouseout", grid_item_mouseout);
	}

	setTimeout(handleYoutubeVideos, 5000);
});

function grid_item_mouseover(event) {
   
    let caption = event.currentTarget.querySelector(".caption");
    caption.classList.remove("scale-out");
    caption.classList.add("scale-in");
}
function grid_item_mouseout(event) {
    let caption = event.currentTarget.querySelector(".caption");
    caption.classList.remove("scale-in");
    caption.classList.add("scale-out");
}

function iso_arrange() {
	iso.arrange(".grid-item");
}

function handleYoutubeVideos2() {
	let div, n, v;
	v = document.getElementsByClassName("youtube-player");
	for (n = 0; n < v.length; n++) {
		div = document.createElement("div");
		div.setAttribute("data-id", v[n].dataset.id);
		div.innerHTML = labnolThumb(v[n].dataset.id);
		div.onclick = labnolIframe;
		v[n].appendChild(div);
	}
}

function handleYoutubeVideos() {
	let div, n, v;
	v = document.getElementsByClassName("youtube-player");
	for (n = 0; n < v.length; n++) {
		div = document.createElement("div");
		div.setAttribute("data-id", v[n].dataset.id);
		div.innerHTML = labnolThumb(v[n].dataset.id);
		//div.classList.add('videoWrapper')
		v[n].appendChild(div);
		labnolIframe();
	}
}

function labnolThumb(id) {
	var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
		play = '<div class="play"></div>';
	return thumb.replace("ID", id) + play;
}

function labnolIframe() {
	v = document.getElementsByClassName("youtube-player");
	for (n = 0; n < v.length; n++) {
		let iframe = document.createElement("iframe");
	//	iframe.classList.add('videoWrapper');
		let embed = "https://www.youtube.com/embed/ID?autoplay=1&controls=0&fs=0&loop=1";
		iframe.setAttribute("src", embed.replace("ID", v[n].dataset.id));
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "0");
	/*	iframe.setAttribute("autoplay", "1");
		iframe.setAttribute("controls", "0");
		iframe.setAttribute("fs", "0");*/
		
		
		v[n].parentNode.replaceChild(iframe, v[n]);
	}
}
