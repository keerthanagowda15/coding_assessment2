// Fetch product data from API
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
  .then(response => response.json())
  .then(data => {
    // Populate product details
    document.getElementById('product-image').src = data.image;
    document.getElementById('product-title').textContent = data.title;
    document.getElementById('product-vendor').textContent = data.vendor;
    document.getElementById('price').textContent = `Price: $${data.price}`;
    document.getElementById('compare-at-price').textContent = `Compare at: $${data.compareAtPrice}`;
    // Calculate discount percentage
    const discountPercentage = Math.round((1 - (data.price / data.compareAtPrice)) * 100);
    document.getElementById('discount').textContent = `${discountPercentage}% off`;

    // Populate color selector
    const colorSelector = document.getElementById('color-selector');
    data.colors.forEach(color => {
      const option = document.createElement('option');
      option.textContent = color;
      colorSelector.appendChild(option);
    });

    // Populate size selector
    const sizeSelector = document.getElementById('size-selector');
    data.sizes.forEach(size => {
      const option = document.createElement('option');
      option.textContent = size;
      sizeSelector.appendChild(option);
    });

    // Add event listener to Add to Cart button
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
      const selectedColor = colorSelector.value;
      const selectedSize = sizeSelector.value;
      const quantity = document.getElementById('quantity-selector').value;
      const cartMessage = `Added to cart: ${quantity} ${selectedColor} - ${selectedSize}`;
      document.getElementById('cart-message').textContent = cartMessage;
      document.getElementById('cart-message').style.display = 'block';
    });

    // Populate thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-container');
    data.thumbnails.forEach(thumbnail => {
      const img = document.createElement('img');
      img.src = thumbnail;
      img.alt = 'Thumbnail';
      thumbnailContainer.appendChild(img);
    });

    // Populate description
    document.getElementById('description').textContent = data.description;
  })
  .catch(error => console.error('Error fetching product data:', error));
