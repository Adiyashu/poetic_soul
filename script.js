/* ============================================
   SCRIPT — Poetic Soul
   ============================================ */

// ===== CONFIG =====
const ADMIN_PASSWORD = 'poet2026'; // Change this to your desired password
const AUTHOR_NAME = 'Poetic Soul'; // The admin/author name

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyCfnzbeDuxGFtb9g8tF6i2sYFbv8BwhbzU",
  authDomain: "poetic-soul.firebaseapp.com",
  databaseURL: "https://poetic-soul-default-rtdb.firebaseio.com",
  projectId: "poetic-soul",
  storageBucket: "poetic-soul.firebasestorage.app",
  messagingSenderId: "831461327472",
  appId: "1:831461327472:web:82f50a344c6bb7f1d1aab5",
  measurementId: "G-923282GKTS"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ===== SAMPLE DATA =====
const SAMPLE_POSTS = [
    {
        id: 'p1',
        title: 'The Silent Moon',
        category: 'poetry',
        content: `The moon hangs low, a silver tear,\nAbove the earth so still and dear.\nIt whispers tales of love once known,\nOf seeds that time has gently sown.\n\nBeneath its glow the rivers sigh,\nAnd carry dreams as clouds drift by.\nEach ripple tells a story old,\nOf hearts once warm, now turning cold.\n\nBut still the moon, with gentle grace,\nIlluminates each hidden place.\nAnd in its light, I find my way—\nThrough darkest night to brightest day.`,
        image: 'https://images.unsplash.com/photo-1532693322450-2f6e1100f625?w=600&h=400&fit=crop',
        date: '2026-03-18',
        likes: 12,
        likedBy: [],
        comments: [
            { id: 'c1', name: 'Riya', text: 'This touched my soul! Beautiful words ✨', time: '2 hours ago', likes: 3, likedBy: [], replies: [{ id: 'r1', name: AUTHOR_NAME, text: 'Thank you so much, Riya! Your words mean a lot 💫', time: '1 hour ago', isAuthor: true }] },
            { id: 'c2', name: 'Arjun', text: 'The imagery is so vivid. I could see the moonlit river.', time: '1 hour ago', likes: 1, likedBy: [], replies: [] }
        ]
    },
    {
        id: 'p2',
        title: 'Dil Ki Baat',
        category: 'shayaris',
        content: `कभी हम भी मुस्कुराते थे ग़मों में,\nअब तो आँसू भी रुक जाते हैं लम्हों में।\n\nतुम्हारी याद का दरिया बहता है सीने में,\nहर लहर एक ख़्वाब लेके आती है आँखों में।\n\nना जाने क्यूँ ये दिल मचलता है,\nतेरे बिना हर पल ये तड़पता है।`,
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
        date: '2026-03-17',
        likes: 24,
        likedBy: [],
        comments: [
            { id: 'c3', name: 'Simran', text: 'Bahut khoobsurat shayari! ❤️', time: '5 hours ago', likes: 5, likedBy: [], replies: [] }
        ]
    },
    {
        id: 'p3',
        title: 'The Last Letter',
        category: 'stories',
        content: `She found the letter tucked between the pages of a book she hadn't opened in years — "The Catcher in the Rye." The paper had yellowed, the ink faded, but the handwriting was unmistakable.\n\n"If you're reading this," it began, "then you've finally decided to revisit the past."\n\nHer fingers trembled as she sank into the old armchair by the window. Rain pattered against the glass, a rhythm so familiar it ached.\n\nThe letter continued: "I never said goodbye, because I never believed we'd end. But some stories don't need endings — they just need someone brave enough to start reading them again."\n\nA tear fell on the paper, blurring the last line. But she already knew what it said. She had written it.`,
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
        date: '2026-03-15',
        likes: 18,
        likedBy: [],
        comments: []
    },
    {
        id: 'p4',
        title: 'Echoes of Forever — Chapter 1',
        category: 'novels',
        content: `The village of Aramore sat at the edge of the world — or so its people believed. Beyond the western cliffs, where the sea met the sky in an endless embrace of blue and silver, nothing existed. No ships returned from that horizon. No birds flew past it.\n\nArav stood at the cliff's edge, his bare feet gripping the cold stone, the wind tugging at his threadbare coat. He was seventeen, with eyes the color of storm clouds and a mind restless as the ocean below.\n\n"You'll fall," came a voice from behind.\n\nHe didn't turn. He knew that voice — warm, teasing, impossibly steady. Meera.\n\n"Maybe I want to," he said.\n\n"Liar." She appeared beside him, her dark hair whipping in the wind.`,
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
        date: '2026-03-14',
        likes: 31,
        likedBy: [],
        comments: [
            { id: 'c4', name: 'Priya', text: 'I need the next chapter right now! 🔥', time: '2 days ago', likes: 8, likedBy: [], replies: [{ id: 'r2', name: AUTHOR_NAME, text: 'Coming soon, Priya! Stay tuned 😊', time: '1 day ago', isAuthor: true }] }
        ]
    },
    {
        id: 'p5',
        title: 'Whispers in the Rain',
        category: 'poetry',
        content: `Rain on rooftops, whispers low,\nTelling tales from long ago.\nEach drop a memory, each puddle a dream,\nNothing is ever quite what it seems.\n\nThe petrichor wraps around my soul,\nMaking broken pieces feel whole.\nIn the downpour I find my peace—\nA quiet, a calm, a sweet release.`,
        image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&h=400&fit=crop',
        date: '2026-03-12',
        likes: 15,
        likedBy: [],
        comments: []
    },
    {
        id: 'p6',
        title: 'Mohabbat Ka Safar',
        category: 'shayaris',
        content: `इश्क़ का रास्ता तन्हा नहीं होता,\nहर मोड़ पर कोई अपना नहीं होता।\n\nपर तेरी यादों का काफ़िला साथ है,\nइस सफ़र में कभी अँधेरा नहीं होता।\n\nतेरी मुस्कान है मेरी मंज़िल,\nतेरे बिना कोई सवेरा नहीं होता।`,
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop',
        date: '2026-03-10',
        likes: 42,
        likedBy: [],
        comments: [
            { id: 'c5', name: 'Zara', text: 'Dil ko chhu gayi ye shayari 💕', time: '3 days ago', likes: 6, likedBy: [], replies: [] }
        ]
    }
];


// ===== STATE =====
let posts = [];
let currentCategory = 'all';
let isAdmin = false;
let readerName = '';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initNavbar();
    initCategoryTabs();
    initAdmin();
    initModal();
    initScrollReveal();
    loadData(); // Starts Firebase listener, which calls renderPosts() and updateStats()
});

// ===== DATA PERSISTENCE (Firebase) =====
function loadData() {
    db.ref('posts').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Firebase removes empty arrays, so ensure they exist
            posts = data.map(p => {
                p.likedBy = p.likedBy || [];
                p.comments = p.comments || [];
                p.comments.forEach(c => {
                    c.likedBy = c.likedBy || [];
                    c.replies = c.replies || [];
                });
                return p;
            });
        } else {
            posts = JSON.parse(JSON.stringify(SAMPLE_POSTS));
            saveData();
        }
        renderPosts();
        updateStats();
    });
}

function saveData() {
    db.ref('posts').set(posts).then(() => {
        const indicator = document.getElementById('autosaveIndicator');
        if (indicator && isAdmin) {
            indicator.style.display = 'flex';
            indicator.style.opacity = '1';
            setTimeout(() => { indicator.style.opacity = '0.7'; }, 1500);
        }
    }).catch(err => console.error("Firebase save failed:", err));
}

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    });
}

// ===== CATEGORY TABS =====
function initCategoryTabs() {
    const tabs = document.getElementById('categoryTabs');
    tabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;

        tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentCategory = btn.dataset.category;
        renderPosts();
    });
}

// ===== RENDER POSTS =====
function renderPosts() {
    const grid = document.getElementById('postsGrid');
    const emptyState = document.getElementById('emptyState');

    const filtered = currentCategory === 'all'
        ? posts
        : posts.filter(p => p.category === currentCategory);

    if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    grid.innerHTML = filtered.map((post, index) => createPostCard(post, index)).join('');

    // Attach event listeners
    attachPostListeners();
}

function createPostCard(post, index) {
    const categoryLabels = {
        poetry: 'Poetry',
        stories: 'Short Story',
        novels: 'Novel',
        shayaris: 'Shayari'
    };

    const commentsHTML = post.comments.map(c => createCommentHTML(post.id, c)).join('');
    const hasLiked = post.likedBy.includes(getReaderId());

    return `
    <div class="post-card" data-id="${post.id}" style="animation-delay: ${index * 0.1}s;">
        <div class="post-card-image" style="position:relative;">
            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text-muted);"><i class="fas fa-image" style="font-size:3rem;"></i></div>'}
            <span class="post-category-badge">${categoryLabels[post.category] || post.category}</span>
            ${isAdmin ? `
                <button class="change-image-btn" onclick="changePostImage('${post.id}')">
                    <i class="fas fa-camera"></i> Change Image
                </button>
                <button class="post-delete-btn" onclick="deletePost('${post.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            ` : ''}
        </div>
        <div class="post-card-body">
            <p class="post-date"><i class="far fa-calendar-alt"></i> ${formatDate(post.date)}</p>
            <h3 class="post-card-title">${escapeHtml(post.title)}</h3>
            <div class="post-card-content" id="content-${post.id}">${escapeHtml(post.content)}</div>
            <button class="read-more-btn" onclick="toggleReadMore('${post.id}')">
                Read more <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        <div class="post-card-footer">
            <div class="post-actions">
                <button class="action-btn ${hasLiked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
                    <i class="${hasLiked ? 'fas' : 'far'} fa-heart"></i>
                    <span class="like-count">${post.likes}</span>
                </button>
                <button class="action-btn" onclick="focusCommentInput('${post.id}')">
                    <i class="far fa-comment"></i>
                    <span class="comment-count">${post.comments.length}</span>
                </button>
                <button class="action-btn" onclick="sharePost('${post.id}')">
                    <i class="far fa-share-square"></i>
                </button>
            </div>
            <div class="comments-section" id="comments-${post.id}">
                ${commentsHTML}
            </div>
            <div class="comment-input-wrapper">
                <input type="text" id="comment-input-${post.id}" placeholder="Write a comment..." onkeypress="if(event.key==='Enter') addComment('${post.id}')">
                <button class="comment-submit-btn" onclick="addComment('${post.id}')">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>`;
}

function createCommentHTML(postId, comment) {
    const hasLiked = comment.likedBy.includes(getReaderId());
    const repliesHTML = (comment.replies || []).map(r => `
        <div class="reply-item">
            <div class="reply-avatar">${r.isAuthor ? '✦' : r.name.charAt(0).toUpperCase()}</div>
            <div class="reply-body">
                <div class="reply-name">${r.isAuthor ? AUTHOR_NAME + ' ✦' : escapeHtml(r.name)}</div>
                <div class="reply-text">${escapeHtml(r.text)}</div>
                <div class="reply-time">${r.time}</div>
            </div>
        </div>
    `).join('');

    const isOwnerComment = comment.isAuthor === true;

    return `
    <div class="comment-item ${isOwnerComment ? 'owner-comment' : ''}" data-comment-id="${comment.id}">
        <div class="comment-avatar ${isOwnerComment ? 'owner-avatar' : ''}">${isOwnerComment ? '✦' : comment.name.charAt(0).toUpperCase()}</div>
        <div class="comment-body">
            <div class="comment-name ${isOwnerComment ? 'owner-name' : ''}">${isOwnerComment ? AUTHOR_NAME + ' ✦' : escapeHtml(comment.name)}</div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
            <div class="comment-meta">
                <span class="comment-time">${comment.time}</span>
                <button class="comment-like-btn ${hasLiked ? 'liked' : ''}" onclick="toggleCommentLike('${postId}', '${comment.id}')">
                    <i class="${hasLiked ? 'fas' : 'far'} fa-heart"></i>
                    <span>${comment.likes}</span>
                </button>
                <button class="comment-reply-btn" onclick="showReplyInput('${postId}', '${comment.id}')">Reply</button>
            </div>
        </div>
    </div>
    ${repliesHTML ? `<div class="comment-replies">${repliesHTML}</div>` : ''}
    <div id="reply-area-${comment.id}"></div>`;
}

function attachPostListeners() {
    // Nothing extra needed — using inline onclick for simplicity
}

// ===== LIKES =====
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const readerId = getReaderId();
    const idx = post.likedBy.indexOf(readerId);

    if (idx === -1) {
        post.likedBy.push(readerId);
        post.likes++;
    } else {
        post.likedBy.splice(idx, 1);
        post.likes--;
    }

    saveData();
    renderPosts();
    updateStats();
}

function toggleCommentLike(postId, commentId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const comment = post.comments.find(c => c.id === commentId);
    if (!comment) return;

    const readerId = getReaderId();
    const idx = comment.likedBy.indexOf(readerId);

    if (idx === -1) {
        comment.likedBy.push(readerId);
        comment.likes++;
    } else {
        comment.likedBy.splice(idx, 1);
        comment.likes--;
    }

    saveData();
    renderPosts();
}

// ===== COMMENTS =====
function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    if (!text) return;

    const name = getReaderName();
    if (!name) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    post.comments.push({
        id: 'c' + Date.now(),
        name: name,
        text: text,
        time: 'Just now',
        likes: 0,
        likedBy: [],
        replies: [],
        isAuthor: isAdmin
    });

    saveData();
    renderPosts();
    updateStats();
    showToast('Comment added!', 'success');

    // Scroll to comments
    setTimeout(() => {
        const commentsSection = document.getElementById(`comments-${postId}`);
        if (commentsSection) {
            commentsSection.scrollTop = commentsSection.scrollHeight;
        }
    }, 200);
}

function showReplyInput(postId, commentId) {
    const replyArea = document.getElementById(`reply-area-${commentId}`);
    if (!replyArea) return;

    // Toggle
    if (replyArea.innerHTML.trim()) {
        replyArea.innerHTML = '';
        return;
    }

    replyArea.innerHTML = `
    <div class="reply-input-wrapper">
        <input type="text" id="reply-input-${commentId}" placeholder="Write a reply..." onkeypress="if(event.key==='Enter') addReply('${postId}', '${commentId}')">
        <button class="reply-submit-btn" onclick="addReply('${postId}', '${commentId}')">
            <i class="fas fa-paper-plane"></i>
        </button>
    </div>`;

    document.getElementById(`reply-input-${commentId}`).focus();
}

function addReply(postId, commentId) {
    const input = document.getElementById(`reply-input-${commentId}`);
    const text = input.value.trim();
    if (!text) return;

    let name;
    if (isAdmin) {
        name = AUTHOR_NAME;
    } else {
        name = getReaderName();
        if (!name) return;
    }

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const comment = post.comments.find(c => c.id === commentId);
    if (!comment) return;

    comment.replies.push({
        id: 'r' + Date.now(),
        name: name,
        text: text,
        time: 'Just now',
        isAuthor: isAdmin
    });

    saveData();
    renderPosts();
    showToast('Reply added!', 'success');
}

function focusCommentInput(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    if (input) input.focus();
}

// ===== READER IDENTITY =====
function getReaderId() {
    let id = localStorage.getItem('poeticSoulReaderId');
    if (!id) {
        id = 'reader_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        localStorage.setItem('poeticSoulReaderId', id);
    }
    return id;
}

function getReaderName() {
    if (isAdmin) return AUTHOR_NAME;

    let name = localStorage.getItem('poeticSoulReaderName');
    if (!name) {
        name = prompt('What is your name?');
        if (name && name.trim()) {
            name = name.trim();
            localStorage.setItem('poeticSoulReaderName', name);
        } else {
            return null;
        }
    }
    return name;
}

// ===== READ MORE =====
function toggleReadMore(postId) {
    const content = document.getElementById(`content-${postId}`);
    const card = content.closest('.post-card');
    const btn = card.querySelector('.read-more-btn');

    content.classList.toggle('expanded');

    if (content.classList.contains('expanded')) {
        btn.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
    } else {
        btn.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
    }
}

// ===== SHARE =====
function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (navigator.share) {
        navigator.share({
            title: post.title,
            text: post.content.substring(0, 200) + '...',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copied to clipboard!', 'success');
        });
    }
}

// ===== ADMIN =====
function initAdmin() {
    const trigger = document.getElementById('adminTrigger');
    const loginModal = document.getElementById('adminLoginModal');
    const loginClose = document.getElementById('adminLoginClose');
    const loginForm = document.getElementById('adminLoginForm');
    const fabComposeBtn = document.getElementById('fabComposeBtn');
    const logoutBtn = document.getElementById('adminLogoutBtn');

    // Check if admin session exists
    if (sessionStorage.getItem('poeticSoulAdmin') === 'true') {
        activateAdminMode();
    }

    trigger.addEventListener('click', () => {
        loginModal.classList.add('active');
    });

    loginClose.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = document.getElementById('adminPassword').value;
        if (pwd === ADMIN_PASSWORD) {
            isAdmin = true;
            sessionStorage.setItem('poeticSoulAdmin', 'true');
            loginModal.classList.remove('active');
            activateAdminMode();
            renderPosts();
            showToast('Welcome back, Writer! ✦ You can now write & publish!', 'success');
        } else {
            showToast('Incorrect password.', 'error');
        }
    });

    // Floating compose button opens the post modal
    fabComposeBtn.addEventListener('click', () => {
        document.getElementById('postModal').classList.add('active');
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        isAdmin = false;
        sessionStorage.removeItem('poeticSoulAdmin');
        deactivateAdminMode();
        renderPosts();
        showToast('Logged out successfully.', 'success');
    });
}

function activateAdminMode() {
    isAdmin = true;
    const trigger = document.getElementById('adminTrigger');
    const fabComposeBtn = document.getElementById('fabComposeBtn');
    const adminBar = document.getElementById('adminBar');
    const autosaveIndicator = document.getElementById('autosaveIndicator');

    trigger.style.display = 'none';
    fabComposeBtn.style.display = 'flex';
    adminBar.style.display = 'flex';
    autosaveIndicator.style.display = 'flex';
}

function deactivateAdminMode() {
    const trigger = document.getElementById('adminTrigger');
    const fabComposeBtn = document.getElementById('fabComposeBtn');
    const adminBar = document.getElementById('adminBar');
    const autosaveIndicator = document.getElementById('autosaveIndicator');

    trigger.style.display = 'flex';
    fabComposeBtn.style.display = 'none';
    adminBar.style.display = 'none';
    autosaveIndicator.style.display = 'none';
}

// ===== MODAL (Add Post) =====
function initModal() {
    const addBtn = document.getElementById('addPostBtn');
    const modal = document.getElementById('postModal');
    const closeBtn = document.getElementById('modalClose');
    const form = document.getElementById('postForm');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageInput = document.getElementById('postImage');
    const imagePreview = document.getElementById('imagePreview');

    addBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        form.reset();
        imagePreview.style.display = 'none';
        imagePreview.src = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            form.reset();
            imagePreview.style.display = 'none';
        }
    });

    // Image upload
    imageUploadArea.addEventListener('click', () => imageInput.click());
    imageUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = 'var(--accent-primary)';
    });
    imageUploadArea.addEventListener('dragleave', () => {
        imageUploadArea.style.borderColor = '';
    });
    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = '';
        if (e.dataTransfer.files.length) {
            imageInput.files = e.dataTransfer.files;
            previewImage(e.dataTransfer.files[0]);
        }
    });

    imageInput.addEventListener('change', () => {
        if (imageInput.files.length) {
            previewImage(imageInput.files[0]);
        }
    });

    function previewImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            imageUploadArea.querySelector('i').style.display = 'none';
            imageUploadArea.querySelector('p').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('postTitle').value.trim();
        const category = document.getElementById('postCategory').value;
        const content = document.getElementById('postContent').value.trim();
        const imageData = imagePreview.src || '';

        if (!title || !category || !content) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        const newPost = {
            id: 'p' + Date.now(),
            title: title,
            category: category,
            content: content,
            image: imageData,
            date: new Date().toISOString().split('T')[0],
            likes: 0,
            likedBy: [],
            comments: []
        };

        posts.unshift(newPost);
        saveData();
        renderPosts();
        updateStats();

        modal.classList.remove('active');
        form.reset();
        imagePreview.style.display = 'none';
        imagePreview.src = '';
        imageUploadArea.querySelector('i').style.display = '';
        imageUploadArea.querySelector('p').style.display = '';

        showToast('Post published! ✨', 'success');
    });
}

// ===== CHANGE POST IMAGE =====
function changePostImage(postId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', () => {
        if (input.files.length) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const post = posts.find(p => p.id === postId);
                if (post) {
                    post.image = e.target.result;
                    saveData();
                    renderPosts();
                    showToast('Image updated!', 'success');
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    });

    input.click();
}

// ===== DELETE POST =====
function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    posts = posts.filter(p => p.id !== postId);
    saveData();
    renderPosts();
    updateStats();
    showToast('Post deleted.', 'success');
}

// ===== STATS =====
function updateStats() {
    const totalPostsEl = document.getElementById('totalPosts');
    const totalLikesEl = document.getElementById('totalLikes');
    const totalCommentsEl = document.getElementById('totalComments');

    const totalPosts = posts.length;
    const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
    const totalComments = posts.reduce((sum, p) => sum + p.comments.length, 0);

    animateNumber(totalPostsEl, totalPosts);
    animateNumber(totalLikesEl, totalLikes);
    animateNumber(totalCommentsEl, totalComments);
}

function animateNumber(el, target) {
    const duration = 1000;
    const start = parseInt(el.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;

    function step() {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            el.textContent = target;
            return;
        }
        el.textContent = Math.round(current);
        requestAnimationFrame(step);
    }

    step();
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.about-section, .works-section, .contact-section');
    reveals.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

// ===== HELPERS =====
function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-IN', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}
