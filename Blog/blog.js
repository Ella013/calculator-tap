// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "How to Use Our Loan Calculator Effectively",
        excerpt: "Learn how to make the most of our loan calculator to plan your finances better.",
        category: "loans",
        date: "2024-04-01",
        image: "images/loan-calculator-guide.jpg",
        featured: true
    },
    {
        id: 2,
        title: "Understanding Mortgage Qualification Requirements",
        excerpt: "A comprehensive guide to understanding what lenders look for in mortgage applications.",
        category: "mortgage",
        date: "2024-03-28",
        image: "images/mortgage-qualification-guide.jpg",
        featured: true
    },
    {
        id: 3,
        title: "Debt Payoff Strategies That Work",
        excerpt: "Discover effective strategies to pay off your debt faster and save on interest.",
        category: "debt",
        date: "2024-03-25",
        image: "images/debt-payoff-strategies.jpg",
        featured: false
    },
    {
        id: 4,
        title: "Understanding Your Paycheck: A Complete Guide",
        excerpt: "Learn how to read and understand your paycheck, including taxes and deductions.",
        category: "paycheck",
        date: "2024-03-20",
        image: "images/paycheck-guide.jpg",
        featured: false
    }
];

// Format date to readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Create blog post card
function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    // URL 생성: 제목을 URL 친화적인 형식으로 변환
    const encodedTitle = encodeURIComponent(post.title.toLowerCase().replace(/ /g, '-'));
    
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" loading="lazy">
        <div class="blog-card-content">
            <div class="blog-meta">
                <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                <span><i class="far fa-folder"></i> ${post.category}</span>
            </div>
            <h2>${post.title}</h2>
            <p>${post.excerpt}</p>
            <a href="posts/${encodedTitle}.html" class="read-more">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}

// Load blog posts
function loadBlogPosts(category = 'all') {
    const blogContent = document.getElementById('blogContent');
    const blogGrid = document.querySelector('.blog-grid');
    
    // 기존 콘텐츠 제거
    blogGrid.innerHTML = '';
    
    // 카테고리 필터링
    const filteredPosts = category === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === category);
    
    if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-posts">
                ${category === 'all' 
                    ? 'No blog posts available yet.' 
                    : `No posts available in the ${category} category.`}
            </div>`;
        return;
    }

    filteredPosts.forEach(post => {
        const card = createBlogCard(post);
        blogGrid.appendChild(card);
    });
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Here you would typically send the email to your server
    console.log('Newsletter subscription:', email);
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
}

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // 카테고리 필터링
    document.querySelectorAll('.category-tag').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 활성 버튼 스타일 변경
            document.querySelectorAll('.category-tag').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 포스트 다시 로드
            loadBlogPosts(category);
        });
    });

    // 초기 포스트 로드
    loadBlogPosts('all');

    // Add newsletter form handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}); 