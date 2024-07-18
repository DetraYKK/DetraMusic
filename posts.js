// posts.js

document.addEventListener('DOMContentLoaded', function() {
    const posts = [
        {
            title: "Welcome to DetraMusic",
            date: "18/07/2024",
            description: "Welcome to DetraMusic - your source for the latest music trends and hits. Stay tuned for updates!",
            image: "images/DetraMusic_37.png",
            lyricsFile: null
        },
        {
            title: "What's the Difference",
            date: "2023-04-17",
            description: "The song 'What's the Difference' explores the nuances of everyday choices and their impacts. Everything produced and composed by me.",
            image: "https://img.youtube.com/vi/kG6ud1-ZEwQ/maxresdefault.jpg",
            lyricsFile: "lyrics/whats_the_difference.txt",
            link: "https://www.youtube.com/watch?v=kG6ud1-ZEwQ"
        },
        {
            title: "Invest In Me",
            date: "2023-03-17",
            description: "One of my favorite songs, 'Invest In Me' was entirely produced and composed by me, with live bass performance.",
            image: "https://img.youtube.com/vi/7INxIoq-YnQ/maxresdefault.jpg",
            lyricsFile: "lyrics/invest_in_me.txt",
            link: "https://www.youtube.com/watch?v=7INxIoq-YnQ"
        },
        {
            title: "My Pride",
            date: "2023-07-20",
            description: "A funk/hip hop track, 'My Pride' showcases my production and compositional skills.",
            image: "https://img.youtube.com/vi/krnzG84iNCk/maxresdefault.jpg",
            lyricsFile: "lyrics/my_pride.txt",
            link: "https://www.youtube.com/watch?v=krnzG84iNCk"
        },
        {
            title: "Island Fever",
            date: "2023-01-12",
            description: "This song expresses my love for Bohol, Philippines.",
            image: "https://img.youtube.com/vi/bQtkQZUoduU/maxresdefault.jpg",
            lyricsFile: "lyrics/island_fever.txt",
            link: "https://www.youtube.com/watch?v=bQtkQZUoduU"
        },
        {
            title: "Wake Up",
            date: "2023-06-07",
            description: "The song 'Wake Up' aims to inspire and energize listeners. Everything produced and composed by me.",
            image: "https://img.youtube.com/vi/GdQij7Ujdfk/maxresdefault.jpg",
            lyricsFile: "lyrics/wake_up.txt",
            link: "https://www.youtube.com/watch?v=GdQij7Ujdfk"
        },
        {
            title: "The Way You Love Me",
            date: "2023-02-14",
            description: "A heartfelt song about the way my wife loves me. Everything produced and composed by me.",
            image: "https://img.youtube.com/vi/qFFMeErXhnw/maxresdefault.jpg",
            lyricsFile: "lyrics/the_way_you_love_me.txt",
            link: "https://www.youtube.com/watch?v=qFFMeErXhnw"
        },
        {
            title: "Dreams",
            date: "2023-05-18",
            description: "A reflective song about wishing to see into the future and whether I'll make it.",
            image: "https://img.youtube.com/vi/1Xar0OYM0ps/maxresdefault.jpg",
            lyricsFile: "lyrics/dreams.txt",
            link: "https://www.youtube.com/watch?v=1Xar0OYM0ps"
        }
    ];

    const postContainer = document.getElementById('post-container');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.image}" alt="${post.title}" class="post-thumbnail" />
                <div class="post-info">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-date">Posted on ${post.date}</p>
                </div>
            </div>
            <div class="post-body">
                <p>${post.description}</p>
                ${post.lyricsFile ? `<button class="lyrics-button" data-file="${post.lyricsFile}">Show Lyrics</button>` : ''}
                ${post.link ? `<a href="${post.link}" class="post-link" target="_blank">Listen on YouTube</a>` : ''}
                <div class="lyrics-container" id="lyrics-${post.title.replace(/ /g, '_')}"></div>
            </div>
        `;

        postContainer.appendChild(postElement);

        // Event listener for showing lyrics
        const lyricsButton = postElement.querySelector('.lyrics-button');
        if (lyricsButton) {
            lyricsButton.addEventListener('click', function() {
                const file = this.getAttribute('data-file');
                const lyricsContainer = this.nextElementSibling;
                if (lyricsContainer.innerHTML === '') {
                    loadLyrics(file, lyricsContainer);
                } else {
                    lyricsContainer.innerHTML = ''; // Toggle off
                }
            });
        }
    });
});

async function loadLyrics(file, container) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Network response was not ok');
        const lyrics = await response.text();
        container.innerHTML = `<pre>${lyrics}</pre>`;
    } catch (error) {
        container.innerHTML = `<p>Error loading lyrics: ${error.message}</p>`;
    }
}
