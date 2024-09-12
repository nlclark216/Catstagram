let currentScore = 0;


const header = async () => {
    
    const header = document.createElement('header')
    document.body.appendChild(header);

    const h1 = document.createElement('h1');
    h1.id = 'title';
    h1.innerText = "Most Adorable Cat Contest";
    h1.style.textAlign = "center";
    h1.style.padding = "20px";
    h1.style.fontFamily = "Playwrite AU TAS", 'cursive';
    header.appendChild(h1);

    const img = document.createElement("img");
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    const url = data[0].url;

    img.src = url;
    img.className = 'cat';
    img.style.display = "block";
    img.style.margin = "10px auto";
    img.style.maxHeight = "400px";
    img.style.maxWidth = "400px";
    img.style.borderRadius = '4px';
    header.appendChild(img);

    if(!localStorage.getItem('url')) localStorage.setItem('url', url);
    if(localStorage.getItem('url')) img.src = localStorage.getItem('url');

    

    const changePic = document.createElement('button');
    changePic.id = 'change-pic';
    changePic.innerText = "Change Picture";
    changePic.style.display = "block";
    changePic.style.margin = "10px auto";

    changePic.style.backgroundColor = '#0FA3B1';
    changePic.style.borderRadius = '8px';
    changePic.style.padding = '5px 10px';
    changePic.style.fontWeight = 'bold';
    changePic.style.color = 'white';
    changePic.style.border = 'thin'
    header.appendChild(changePic);
    
    changePic.onclick = async () => {
        const img = document.querySelector('img');
    
        const res = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await res.json();
        const url = data[0].url;

        img.setAttribute('src', url);

        const h4 = document.querySelector('h4');
        console.log(h4)
        currentScore = 0;
        h4.innerText = `Popularity Score: ${currentScore}`;

        localStorage.setItem('url', url);
        localStorage.setItem('score', `${currentScore}`);

        const ul = document.getElementById('comments');
        [...ul.children].forEach(c => ul.removeChild(c));
        localStorage.removeItem('comments');
    }
}


const main = () => {
    const main = document.createElement('main');
    document.body.appendChild(main);

    const popularity = document.createElement('h4');
    
    popularity.innerText = `Popularity Score: ${currentScore}`;
    popularity.style.textAlign = "center";
    popularity.style.fontWeight= "normal";
    popularity.style.margin = '20px 0 10px';
    main.appendChild(popularity);


    const voteButtons = document.createElement('div');
    voteButtons.style.display = "flex";
    voteButtons.style.justifyContent = "center";
    main.appendChild(voteButtons);

    const upvote = document.createElement('button');
    upvote.style.margin = '0 5px';
    upvote.class = 'voting-buttons';
    upvote.innerText = 'Upvote';
    voteButtons.appendChild(upvote);
    
    upvote.onclick = () => {
        currentScore++;
        popularity.innerText = `Popularity Score: ${currentScore}`;
        localStorage.setItem('score', currentScore);
    }
    
    const downvote = document.createElement('button');
    downvote.style.margin = '0 5px'
    downvote.class = 'voting-buttons';
    downvote.innerText = 'Downvote';
    voteButtons.appendChild(downvote);

    downvote.onclick = () => {
        if(currentScore > 0) currentScore--;
        popularity.innerText = `Popularity Score: ${currentScore}`;
        localStorage.setItem('score', currentScore);
    }

    const submitComment = document.createElement('div');
    submitComment.style.display = 'flex';
    submitComment.style.justifyContent = 'center';
    submitComment.style.margin = '20px 0';
    main.appendChild(submitComment);

    const label = document.createElement('label');
    label.for = 'comment';
    label.innerText = 'Comment:'
    label.style.padding = '0 5px';
    submitComment.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'comment';
    input.id = 'comment';
    input.size = '20';
    input.placeholder = "Add a comment..."
    submitComment.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.style.margin = '0 5px';
    submitButton.innerText = 'Submit';
    submitComment.appendChild(submitButton);

    const submittedComments = document.createElement('div');
    submittedComments.id = 'box'
    submittedComments.style.border = 'thick double #EF798A'
    submittedComments.style.borderRadius = '8px'
    submittedComments.style.height = '300px';
    submittedComments.style.maxWidth = '600px';
    submittedComments.style.margin = '20px auto 40px';
    submittedComments.style.padding = '20px';
    main.appendChild(submittedComments);

    const commentUl = document.createElement('ul');
    commentUl.id = 'comments';
    submittedComments.appendChild(commentUl);

    submitButton.onclick = e => {
        const input = document.getElementById('comment');
        const ul = document.getElementById('comments')
        const comment = document.createElement('li');
        comment.innerText = input.value;
    
        if(!localStorage.getItem(`comments`)) localStorage.setItem(`comments`, input.value)
        
        commentUl.appendChild(comment);

        input.value = '';
    }

}

const body = () => {
    
    document.body.style.background = '#FFFAFB';
    document.body.style.fontFamily = 'Roboto';
    const body = document.querySelector('body');
    body.style.border = 'dashed gray';
    body.style.borderRadius = '16px';
    document.body.style.color = '#374B4A'

    const buttons = document.querySelectorAll('button');
    const changePic = document.querySelector('#change-pic')
    buttons.forEach(el => {
        el.style.backgroundColor = '#0FA3B1';
        el.style.borderRadius = '8px';
        el.style.padding = '5px 10px';
        el.style.fontWeight = 'bold';
        el.style.color = 'white';
        el.style.border = 'thin'
    })

    const label = document.querySelector('label');
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    console.log(changePic)
}




window.addEventListener("DOMContentLoaded", () => {
    header();
    main();
    body();
})
    
window.onload = () => {
   const h4 = document.querySelector('h4');
   const score = localStorage.getItem('score');
   if(score) h4.innerText = `Popularity Score: ${score}`;

   const ul = document.querySelector('ul');
   const li = document.createElement('li');
   const comment = localStorage.getItem('comments');

   if(comment){
    li.innerText = comment;
    ul.appendChild(li);
   }
}

