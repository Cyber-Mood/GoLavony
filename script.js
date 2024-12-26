document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    if (lists.length > 1) {  // Only move if there is more than one item
        document.getElementById('slide').appendChild(lists[0]);
    }
}

document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    if (lists.length > 1) {  // Only move if there is more than one item
        document.getElementById('slide').prepend(lists[lists.length - 1]);
    }
}


