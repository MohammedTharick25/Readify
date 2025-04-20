// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize cart
    let cart = [];
    const cartBtn = document.getElementById('cart-btn');
    const authBtn = document.getElementById('auth-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.getElementById('close-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const cartCount = document.querySelector('.cart-count');

    // Book data
    const books = [
        { id: 1, title: 'The Silent Patient', author: 'Alex Michaelides', price: 9.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Atomic Habits', author: 'James Clear', price: 12.99, originalPrice: 16.99, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', price: 14.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'The Midnight Library', author: 'Matt Haig', price: 10.99, originalPrice: 13.99, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 5, title: 'Dune', author: 'Frank Herbert', price: 7.99, originalPrice: 12.99, image: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 6, title: 'Educated: A Memoir', author: 'Tara Westover', price: 11.99, originalPrice: 15.99, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 7, title: 'The House in the Cerulean Sea', author: 'TJ Klune', price: 13.99, originalPrice: 13.99, image: 'https://images.unsplash.com/photo-1584824486539-53bb4646bdbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 8, title: 'Klara and the Sun', author: 'Kazuo Ishiguro', price: 14.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 9, title: 'The Four Winds', author: 'Kristin Hannah', price: 12.99, originalPrice: 12.99, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 10, title: 'No One Is Talking About This', author: 'Patricia Lockwood', price: 11.99, originalPrice: 11.99, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 11, title: 'The Push', author: 'Ashley Audrain', price: 12.99, originalPrice: 12.99, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 12, title: 'The Sanatorium', author: 'Sarah Pearse', price: 13.99, originalPrice: 13.99, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
        { id: 13, title: 'The Vanishing Half', author: 'Brit Bennett', price: 8.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
    ];

    // Page navigation
    const pages = {
        'home': document.getElementById('home-page'),
        'browse': document.getElementById('browse-page'),
        'new-releases': document.getElementById('new-releases-page'),
        'best-sellers': document.getElementById('best-sellers-page'),
        'deals': document.getElementById('deals-page'),
        'about': document.getElementById('about-page')
    };

    const navLinks = document.querySelectorAll('.nav-link');
    const footerNavLinks = document.querySelectorAll('.footer-nav-link');
    const homeLink = document.getElementById('home-link');
    const footerHomeLink = document.getElementById('footer-home-link');

    function navigateToPage(pageId) {
        // Hide all pages
        Object.values(pages).forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        pages[pageId].classList.add('active');
        
        // Update active nav link
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Add event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            navigateToPage(pageId);
        });
    });

    // Add event listeners to footer navigation links
    footerNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            navigateToPage(pageId);
        });
    });

    // Add event listeners to home links
    homeLink.addEventListener('click', function() {
        navigateToPage('home');
    });

    footerHomeLink.addEventListener('click', function() {
        navigateToPage('home');
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            const book = books.find(b => b.id === bookId);
            
            // Check if book already in cart
            const existingItem = cart.find(item => item.id === bookId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    image: book.image,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Add animation to button
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.backgroundColor = 'var(--success)';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                this.style.backgroundColor = 'var(--primary)';
            }, 1000);
        });
    });

    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartSummary.style.display = 'none';
        } else {
            cartItemsContainer.innerHTML = '';
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-cover">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-author">${item.author}</p>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-actions">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            <button class="remove-item" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Calculate totals
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            totalEl.textContent = `$${subtotal.toFixed(2)}`;
            
            cartSummary.style.display = 'block';
        }
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.id === id);
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.id === id);
                item.quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }

    // Cart modal toggle
    cartBtn.addEventListener('click', function() {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Auth button click
    authBtn.addEventListener('click', function() {
        window.location.href = 'login.html';
    });

    closeModal.addEventListener('click', function() {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Genre filter
    const genreBtns = document.querySelectorAll('.genre-btn');
    genreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            genreBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would filter books here
            // For demo, we'll just animate the book cards
            document.querySelectorAll('.book-card').forEach((card, index) => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s forwards`;
                }, 10);
            });
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.transform = `translateX(-${index * 100}%)`;
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showTestimonial(slideIndex);
        });
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Back to top button
    const fab = document.querySelector('.fab');
    fab.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide fab based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            fab.style.opacity = '1';
            fab.style.pointerEvents = 'auto';
        } else {
            fab.style.opacity = '0';
            fab.style.pointerEvents = 'none';
        }
    });

    // Wishlist button animation
    document.querySelectorAll('.wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = 'var(--danger)';
                this.style.borderColor = 'var(--danger)';
                
                // Add floating heart animation
                const heart = document.createElement('div');
                heart.innerHTML = '<i class="fas fa-heart"></i>';
                heart.style.position = 'absolute';
                heart.style.color = 'var(--danger)';
                heart.style.fontSize = '1.5rem';
                heart.style.pointerEvents = 'none';
                heart.style.animation = 'float 1.5s ease-in-out forwards';
                
                const rect = this.getBoundingClientRect();
                heart.style.left = `${rect.left + rect.width/2 - 12}px`;
                heart.style.top = `${rect.top - 20}px`;
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    document.body.removeChild(heart);
                }, 1500);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = 'var(--primary)';
                this.style.borderColor = 'var(--primary)';
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            // In a real app, you would send this to your backend
            this.innerHTML = `
                <div style="padding: 1rem; text-align: center;">
                    <i class="fas fa-check-circle" style="font-size: 2rem; color: var(--success); margin-bottom: 1rem;"></i>
                    <p>Thank you for subscribing!</p>
                </div>
            `;
            
            setTimeout(() => {
                this.innerHTML = `
                    <input type="email" placeholder="Your email address" required>
                    <button type="submit">Subscribe</button>
                `;
            }, 3000);
        });
    }
});