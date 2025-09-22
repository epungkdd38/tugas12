<?php
/**
 * Functions for handling JSON data operations
 */

/**
 * Load data from JSON file
 */
function loadData($filename = 'data.json') {
    if (!file_exists($filename)) {
        return [];
    }
    
    $jsonData = file_get_contents($filename);
    return json_decode($jsonData, true) ?: [];
}

/**
 * Search products by name or category
 */
function searchProducts($query, $category = '', $data = null) {
    if ($data === null) {
        $data = loadData();
    }
    
    if (empty($query) && empty($category)) {
        return $data;
    }
    
    $results = [];
    
    foreach ($data as $product) {
        $matchName = empty($query) || stripos($product['name'], $query) !== false;
        $matchDescription = empty($query) || stripos($product['description'], $query) !== false;
        $matchBrand = empty($query) || stripos($product['brand'], $query) !== false;
        $matchCategory = empty($category) || strcasecmp($product['category'], $category) === 0;
        
        if (($matchName || $matchDescription || $matchBrand) && $matchCategory) {
            $results[] = $product;
        }
    }
    
    return $results;
}

/**
 * Get all unique categories
 */
function getCategories($data = null) {
    if ($data === null) {
        $data = loadData();
    }
    
    $categories = [];
    foreach ($data as $product) {
        if (!in_array($product['category'], $categories)) {
            $categories[] = $product['category'];
        }
    }
    
    sort($categories);
    return $categories;
}

/**
 * Format price in Indonesian Rupiah
 */
function formatPrice($price) {
    return 'Rp ' . number_format($price, 0, ',', '.');
}

/**
 * Sanitize input data
 */
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}
?>