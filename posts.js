// posts.js

// Sample posts data
const posts = [
    {
        title: "Wake Up",
        date: "2023-06-07",
        description: "A song about awakening and embracing a new beginning.",
        thumbnail: "https://img.youtube.com/vi/GdQij7Ujdfk/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=GdQij7Ujdfk&t=1s",
        lyricsFile: "wake-up.txt"
    },
    {
        title: "The Way You Love Me",
        date: "2023-02-14",
        description: "A heartfelt song about the way my wife loves me.",
        thumbnail: "https://img.youtube.com/vi/qFFMeErXhnw/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=qFFMeErXhnw",
        lyricsFile: "the-way-you-love-me.txt"
    },
    {
        title: "Dreams",
        date: "2023-05-18",
        description: "A song reflecting on my hopes and dreams about the future.",
        thumbnail: "https://img.youtube.com/vi/1Xar0OYM0ps/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=1Xar0OYM0ps&t=5s",
        lyricsFile: "dreams.txt"
    },
    {
        title: "Island Fever",
        date: "2023-01-12",
        description: "A song expressing my love for Bohol, Philippines.",
        thumbnail: "https://img.youtube.com/vi/bQtkQZUoduU/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=bQtkQZUoduU",
        lyricsFile: "island-fever.txt"
    },
    {
        title: "What's the Difference",
        date: "2023-04-17",
        description: "A song exploring themes of change and perception.",
        thumbnail: "https://img.youtube.com/vi/kG6ud1-ZEwQ/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=kG6ud1-ZEwQ&t=1s",
        lyricsFile: "whats-the-difference.txt"
    },
    {
        title: "Invest In Me",
        date: "2023-03-17",
        description: "One of my favorite songs with live bass and personal production.",
        thumbnail: "https://img.youtube.com/vi/7INxIoq-YnQ/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=7INxIoq-YnQ&t=29s",
        lyricsFile: "invest-in-me.txt"
    },
    {
        title: "My Pride",
        date: "2023-07-20",
        description: "A funk/hip-hop song with all production and composition by me.",
        thumbnail: "https://img.youtube.com/vi/krnzG84iNCk/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=krnzG84iNCk&t=1s",
        lyricsFile: "my-pride.txt"
    }
];

// Function to render posts
function renderPosts() {
    const postContainer = document.getElementById('post-container');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.thumbnail}" alt="${post.title}" class="post-thumbnail">
                <div class="post-info">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-date">Posted on ${post.date}</p>
                </div>
            </div>
            <div class="post-body">
                <p>${post.description}</p>
                <a href="${post.videoUrl}" target="_blank" class="post-link">Watch on YouTube</a>
                <button class="lyrics-button" data-lyrics-file="${post.lyricsFile}">Show Lyrics</button>
                <button class="hide-lyrics-button" style="display: none;">Hide Lyrics</button>
                <div class="lyrics-container" id="lyrics-${post.title.replace(/\s+/g, '-')}"></div>
            </div>
        `;

        postContainer.appendChild(postElement);
    });

    // Add event listeners for lyrics buttons
    document.querySelectorAll('.lyrics-button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const button = e.target;
            const lyricsFile = button.getAttribute('data-lyrics-file');
            const postElement = button.closest('.post');
            const lyricsContainer = postElement.querySelector('.lyrics-container');
            const hideButton = postElement.querySelector('.hide-lyrics-button');

            try {
                const response = await fetch(`lyrics/${lyricsFile}`);
                
                if (!response.ok) {
                    throw new Error('Lyrics file not found');
                }
                
                const lyrics = await response.text();
                lyricsContainer.innerHTML = `<pre>${lyrics}</pre>`;
                lyricsContainer.style.display = 'block';
                button.style.display = 'none';
                hideButton.style.display = 'block';
            } catch (error) {
                lyricsContainer.innerHTML = '<p>No lyrics have been added yet.</p>';
                lyricsContainer.style.display = 'block';
                button.style.display = 'none';
                hideButton.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.hide-lyrics-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const button = e.target;
            const postElement = button.closest('.post');
            const lyricsContainer = postElement.querySelector('.lyrics-container');
            const showButton = postElement.querySelector('.lyrics-button');

            lyricsContainer.style.display = 'none';
            button.style.display = 'none';
            showButton.style.display = 'block';
        });
    });
}

// Initialize posts rendering on page load
document.addEventListener('DOMContentLoaded', renderPosts);
