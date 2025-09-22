<?php
require_once 'functions.php';

// Handle search request
$searchQuery = '';
$selectedCategory = '';
$products = [];
$showResults = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $searchQuery = sanitizeInput($_POST['search'] ?? '');
    $selectedCategory = sanitizeInput($_POST['category'] ?? '');
    $products = searchProducts($searchQuery, $selectedCategory);
    $showResults = true;
} else {
    // Load all products by default
    $products = loadData();
}

// Get all categories for dropdown
$categories = getCategories();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Katalog - Pencarian Produk</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>E-Katalog</h1>
            <p>Sistem Pencarian Produk</p>
        </div>
    </header>

    <div class="container">
        <!-- Search Form -->
        <div class="search-form">
            <form method="POST" action="">
                <div class="form-row">
                    <div class="form-group">
                        <label for="search">Cari Produk:</label>
                        <input 
                            type="text" 
                            id="search" 
                            name="search" 
                            placeholder="Masukkan nama produk, merek, atau deskripsi..."
                            value="<?php echo htmlspecialchars($searchQuery); ?>"
                        >
                    </div>
                    <div class="form-group">
                        <label for="category">Kategori:</label>
                        <select id="category" name="category">
                            <option value="">Semua Kategori</option>
                            <?php foreach ($categories as $category): ?>
                                <option value="<?php echo htmlspecialchars($category); ?>" 
                                    <?php echo ($selectedCategory === $category) ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($category); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn">Cari Produk</button>
                </div>
            </form>
        </div>

        <!-- Results Section -->
        <?php if ($showResults): ?>
            <div class="results">
                <div class="results-header">
                    <h2>Hasil Pencarian</h2>
                    <p>
                        <?php if (!empty($searchQuery) || !empty($selectedCategory)): ?>
                            Menampilkan <?php echo count($products); ?> produk 
                            <?php if (!empty($searchQuery)): ?>
                                untuk "<strong><?php echo htmlspecialchars($searchQuery); ?></strong>"
                            <?php endif; ?>
                            <?php if (!empty($selectedCategory)): ?>
                                dalam kategori "<strong><?php echo htmlspecialchars($selectedCategory); ?></strong>"
                            <?php endif; ?>
                        <?php else: ?>
                            Menampilkan semua <?php echo count($products); ?> produk
                        <?php endif; ?>
                    </p>
                </div>

                <?php if (empty($products)): ?>
                    <div class="no-results">
                        <h3>Tidak ada produk ditemukan</h3>
                        <p>Coba gunakan kata kunci yang berbeda atau pilih kategori lain.</p>
                    </div>
                <?php else: ?>
                    <div class="products-grid">
                        <?php foreach ($products as $product): ?>
                            <div class="product-card">
                                <div class="product-name"><?php echo htmlspecialchars($product['name']); ?></div>
                                <div class="product-category"><?php echo htmlspecialchars($product['category']); ?></div>
                                <div class="product-price"><?php echo formatPrice($product['price']); ?></div>
                                <div class="product-description"><?php echo htmlspecialchars($product['description']); ?></div>
                                <div class="product-details">
                                    <span class="product-brand"><?php echo htmlspecialchars($product['brand']); ?></span>
                                    <span class="product-stock">Stok: <?php echo $product['stock']; ?></span>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php else: ?>
            <!-- Show all products by default -->
            <div class="results">
                <div class="results-header">
                    <h2>Semua Produk</h2>
                    <p>Menampilkan <?php echo count($products); ?> produk tersedia</p>
                </div>
                
                <div class="products-grid">
                    <?php foreach ($products as $product): ?>
                        <div class="product-card">
                            <div class="product-name"><?php echo htmlspecialchars($product['name']); ?></div>
                            <div class="product-category"><?php echo htmlspecialchars($product['category']); ?></div>
                            <div class="product-price"><?php echo formatPrice($product['price']); ?></div>
                            <div class="product-description"><?php echo htmlspecialchars($product['description']); ?></div>
                            <div class="product-details">
                                <span class="product-brand"><?php echo htmlspecialchars($product['brand']); ?></span>
                                <span class="product-stock">Stok: <?php echo $product['stock']; ?></span>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>