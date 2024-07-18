document.addEventListener('DOMContentLoaded', function () {
    renderPosts();
});

function renderPosts() {
    const postsContainer = document.getElementById('post-container');

    // Define all posts data, sorted by release date (newest first)
    const posts = [
        {
            title: "My Pride - Funk / Hip Hop Release",
            date: "20/07/2023",
            content: "Released on 20th July 2023, 'My Pride' is a funk/hip hop track produced and composed by me. Enjoy the groove and rhythm of this track!",
            image: "https://img.youtube.com/vi/krnzG84iNCk/hqdefault.jpg",
            youtubeLink: "https://www.youtube.com/watch?v=krnzG84iNCk",
            lyricsFile: "my_pride.txt"
        },
        {
            title: "Wake Up",
            date: "07/06/2023",
            content: "Released on 7th June 2023, 'Wake Up' is a powerful track that aims to energize and motivate. Check out the video on YouTube!",
            image: "https://img.youtube.com/vi/GdQij7Ujdfk/hqdefault.jpg",
            youtubeLink: "https://www.youtube.com/watch?v=GdQij7Ujdfk",
            lyricsFile: "wake_up.txt"
        },
        {
            title: "Dreams",
            date: "18/05/2023",
            content: "Released on 18th May 2023, 'Dreams' reflects my thoughts and wishes about the future. Dive into the music and enjoy the journey!",
            image: "https://img.youtube.com/vi/1Xar0OYM0ps/hqdefault.jpg",
            youtubeLink: "https://www.youtube.com/watch?v=1Xar0OYM0ps",
            lyricsFile: "dreams.txt"
        },
        {
            title: "The Way You Love Me",
            date: "14/02/2023",
            content: "Released on 14th February 2023, 'The Way You Love Me' is a heartfelt song about how my wife loves me. Everything produced and composed by me.",
            image: "https://img.youtube.com/vi/qFFMeErXhnw/hqdefault.jpg",
            youtubeLink: "https://www.youtube.com/watch?v=qFFMeErXhnw",
            lyricsFile: "the_way_you_love_me.txt"
        },
        {
            title: "Island Fever",
            date: "12/01/2023",
            content: "Released on 12th January 2023, 'Island Fever' is a tribute to my love for Bohol, Philippines. Let the tropical vibes take you away!",
            image: "https://img.youtube.com/vi/bQtkQZUoduU/hqdefault.jpg",
            youtubeLink: "https://www.youtube.com/watch?v=bQtkQZUoduU",
            lyricsFile: "island_fever.txt"
        },
        {
            title: "What's the Difference",
            date: "17/04/2023",
            content: "Released on 17th April 2023, 'What's the Difference' explores different perspectives through music. Enjoy the track and see the difference for yourself!",
            image: "https://img.youtube.com/vi/kG6ud1-ZEwQ/hqdefault.jpg",
            youtubeLink: "https://www.youtube.com/watch?v=kG6ud1-ZEwQ",
            lyricsFile: "whats_the_difference.txt"
        }
    ];

    // Generate HTML for each post
    let postsHTML = posts.map(post => `
        <div class="post ${post.highlight ? 'post-highlight' : ''}" data-lyrics="${post.lyricsFile}">
            <div class="post-header">
                <div>
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                </div>
                <img class="youtube-thumbnail" src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-date">Posted on ${post.date}</div>
            ${post.youtubeLink ? `<a href="${post.youtubeLink}" target="_blank">Watch on YouTube</a>` : ''}
        </div>
    `).join('');

    // Append posts to the posts container
    postsContainer.innerHTML = postsHTML;

    // Add click event listeners to load lyrics on post click
    document.querySelectorAll('.post').forEach(post => {
        post.addEventListener('click', function () {
            loadLyrics(this);
        });
    });
}

// Function to load lyrics for a post
function loadLyrics(postElement) {
    const lyricsFile = postElement.getAttribute('data-lyrics');
    if (lyricsFile) {
        fetch(`lyrics/${lyricsFile}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(lyrics => {
                // Check if the post already has lyrics to remove the existing ones
                const existingLyrics = postElement.querySelector('.lyrics');
                if (existingLyrics) {
                    existingLyrics.remove();
                }

                // Create and append lyrics container
                const lyricsContainer = document.createElement('div');
                lyricsContainer.className = 'lyrics';
                lyricsContainer.innerHTML = `<h3>Lyrics</h3><pre>${lyrics}</pre>`;
                postElement.appendChild(lyricsContainer);
            })
            .catch(err => {
                console.error('Error loading lyrics:', err);
            });
    }
}
