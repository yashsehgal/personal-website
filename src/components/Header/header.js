const overlay = document.querySelector('.header-component .overlay');
const nav_list = document.querySelectorAll(' .header-option-item-one');

console.log(nav_list);
nav_list.forEach((list) => {
	list.addEventListener('mouseover', () => {
		let position = list.getBoundingClientRect();
		overlay.classList.add('active');
		overlay.style.left = position.x + 'px';
		overlay.style.top = position.y + 'px';
		overlay.style.height = position.height + 'px';
		overlay.style.width = position.width  + 'px';
	});
	list.addEventListener('mouseout', () => {
		overlay.classList.remove('active');
	});
});