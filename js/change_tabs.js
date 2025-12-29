document.addEventListener('DOMContentLoaded', function() {
    const productTab = document.getElementById('product-tab');
    const imagesTab = document.getElementById('images-tab');
    const infoSection = document.getElementById('information-section');
    const imagesSection = document.getElementById('images-section');

    if (!productTab || !imagesTab || !infoSection || !imagesSection) return;

    productTab.addEventListener('click', function() {
        // Show info, hide images
        infoSection.classList.remove('hidden');
        imagesSection.classList.add('hidden');

        // Update tab styles
        productTab.classList.remove('bg-gray-100', 'text-gray-700');
        productTab.classList.add('bg-blue-600', 'text-white');
        
        imagesTab.classList.remove('bg-blue-600', 'text-white');
        imagesTab.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    imagesTab.addEventListener('click', function() {
        // Hide info, show images
        infoSection.classList.add('hidden');
        imagesSection.classList.remove('hidden');

        // Update tab styles
        imagesTab.classList.remove('bg-gray-100', 'text-gray-700');
        imagesTab.classList.add('bg-blue-600', 'text-white');
        
        productTab.classList.remove('bg-blue-600', 'text-white');
        productTab.classList.add('bg-gray-100', 'text-gray-700');
    });
});
