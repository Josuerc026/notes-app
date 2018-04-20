var addBtn = document.querySelector('#add'),
	deleteAll = document.querySelector('#trash-all'),
	noteInput = document.querySelector('#main-input'),
	noteContainer = document.querySelector('.notes-list');

if(localStorage.hasOwnProperty('notes')){
	noteContainer.innerHTML = localStorage.getItem('notes');
}
var getNoteTime = function(){
	var currentTime = new Date();
	var localTime = currentTime.toLocaleTimeString('en-US', {
		hour: "numeric",
		minute: "numeric"
	});
	var currentDate = currentTime.toLocaleString('en-US',{
		weekday: 'long', year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return currentDate + ', ' + localTime;
};

var updateItems = function(){
	localStorage.setItem('notes', document.querySelector('.notes-list').innerHTML);
};
var deleteNote = function(note){
	note.remove();
	updateItems();
};
var editNote = function(note){
	var editInput = note.querySelector('.val-input'),
		editTime = note.querySelector('.note-time'),
		editBtn = note.querySelector('.edit-btn'),
		editState = editBtn.dataset.state;

	editInput.focus();

	if(editState === 'save'){

		editTime.innerText = getNoteTime();

		editInput.innerHTML = editInput.value;

		editBtn.setAttribute('data-state','edit');
		editInput.readOnly = true;
		editBtn.innerHTML = '&#9998;';

		noteContainer.prepend(note);

		updateItems();
	}else{
		editBtn.setAttribute('data-state','save');
		editInput.readOnly = false;
		editBtn.innerText = 'save';
	}
};

var constructNote = function (val) {
	var listItem = document.createElement('li'),
		noteTime = document.createElement('small'),
		valInput = document.createElement('textarea'),
		btnContainer = document.createElement('div'),
		editBtn = document.createElement('button'),
		deleteBtn = document.createElement('button')

	listItem.classList.add('note');

	noteTime.classList.add('note-time'); noteTime.innerText = getNoteTime();

	valInput.classList.add('val-input');
	valInput.value = val;
	valInput.innerHTML = val;
	valInput.readOnly = true;

	editBtn.classList.add('edit-btn');
	editBtn.setAttribute('data-state','edit');
	editBtn.innerHTML = '&#9998;';

	deleteBtn.classList.add('delete-btn');
	deleteBtn.innerHTML = '&#10005;';

	btnContainer.classList.add('btn-container');

	btnContainer.append(editBtn);
	btnContainer.append(deleteBtn);

	listItem.appendChild(valInput);
	listItem.appendChild(noteTime);
	listItem.appendChild(btnContainer);

	console.log(listItem);

	noteContainer.prepend(listItem);

	updateItems();

};
noteContainer.addEventListener('click', function (e) {
	if(e.target.parentNode.parentNode.matches('li.note')){
		if(e.target.matches('.delete-btn')){
			console.log(e.target.parentNode.parentNode)
			deleteNote(e.target.parentNode.parentNode);
		}
		if(e.target.matches('.edit-btn')){
			editNote(e.target.parentNode.parentNode);
		}
	}
});
addBtn.addEventListener('click', function () {
		var currentVal = noteInput.value;

		if(!currentVal) return;
		constructNote(currentVal);
});
var checkTwice = 0;
deleteAll.addEventListener('click', function () {
	if(checkTwice > 0){
		localStorage.removeItem('notes');
		var deleteAllBtn = this;
		this.innerHTML = 'trash all';
		noteContainer.innerHTML = '';
		checkTwice = 0;
	}else{
		this.innerHTML = '<strong>are you sure?</strong>';
		checkTwice++;
	}
});