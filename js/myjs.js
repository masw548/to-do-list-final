'use strict'
let input = document.getElementById('noteInput')
let btnSave = document.getElementById('addNoteBtn')
let seartchInput = document.getElementById('searchInput')
let output = document.getElementById('notesList')
// get arr from storage and create it if it exist

let x = localStorage.getItem('notes') || "[]";
let parseNote = JSON.parse(x);
let arr = parseNote; 
// array of colors
let colors = ['#f9ddfd','#a6b8f2','#d0f4ea','#f9f07d','#308c5f','#edb5ea','#d0f4ea']
showout()
btnSave.addEventListener('click',save)
function save() {
    let note = input.value.trim();
    if(note){
        arr.push({text : note, date : new Date().toLocaleString() , complete : false })
        localStorage.setItem('notes',JSON.stringify(arr))
        // input.style.height = '50px'
        showout()
    }
    input.value = '';
    
}
function showout() {
    output.innerHTML=''
    arr.forEach((obj,index) => {
        if (!obj.text || !obj.text.includes(searchInput.value)) return;
        // the note
        let p = document.createElement('p')
        p.textContent = obj.text;        
        p.classList.add('note','d-inline-block','mx-2')
        
        // del button
        let delBtn = document.createElement('button')        
        delBtn.textContent = 'delete'
        delBtn.classList.add('delbtn')
        delBtn.addEventListener('click',()=>deletenote(index))
        
        // edit button
        let editBtn = document.createElement('button')
        editBtn.innerHTML ="edit"
        editBtn.classList.add('editbtn')    
        editBtn.addEventListener('click',()=>edit(obj))   
        // date
        let date = document.createElement('small')
        date.textContent = 'Last Update : '+obj.date;
        date.classList.add('lastupdate')
        // statue btn
        let statuBtn = document.createElement('button')
        statuBtn.innerHTML = obj.complete? "<i class='fa fa-check'></i>" : "<i class='fa fa-refresh'></i>";  
        statuBtn.classList.add('statebtn')    
        statuBtn.addEventListener('click',()=>togglestatue(obj))  
        // btn box
        let btnBox = document.createElement('div')        
        btnBox.append(editBtn, delBtn)
        btnBox.classList.add()
        // bottomBox
        let bottomBox = document.createElement('div')
        bottomBox.append(date,btnBox)
        bottomBox.classList.add('btnbox','d-flex','justify-content-between','align-items-center')
        
        // body of note
        let bodyOfNote = document.createElement('div')
        bodyOfNote.classList.add('bodyofnote')
        bodyOfNote.append(statuBtn, p)

        
        let fullNote = document.createElement('div') 
        fullNote.classList.add('newnote')
        fullNote.appendChild(bodyOfNote)
        fullNote.append(bottomBox)

        fullNote.style.backgroundColor = colors[index %(colors.length)] 

        output.appendChild(fullNote) 
      
    });    
}

// del note
function deletenote(index){    
    arr.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(arr))
    showout()
}
// edit note
function edit(obj) {
    let newnote = prompt('enter your new note',obj.text)
    if(newnote === null || newnote.trim() === "") return
    obj.text = newnote;
    obj.date = new Date().toLocaleString() ;
    localStorage.setItem('notes',JSON.stringify(arr))
    showout()
}
// toggle complete
function togglestatue(obj){
    obj.complete=!obj.complete
    localStorage.setItem('notes', JSON.stringify(arr));
    showout()
}
// enter pressing
input.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
    this.style.height = "auto"; 
    this.style.height = this.scrollHeight + "px"; 
    this.style.height = '50px';
    save()
    }
})
// seartch note
seartchInput.addEventListener('input',showout)

// let text erea on mobile screen beeing taller when user enter a long text
input.addEventListener('input',function(){
    this.style.height = 'auto'
    this.style.height = this.scrollHeight + 'px';
})

