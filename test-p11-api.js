// Simple test script to validate P11 API endpoints
const API_BASE = 'http://localhost:3000';

async function testP11API() {
  console.log('🧪 Testing P11 API Endpoints...\n');
  
  try {
    // Test 1: Product API
    console.log('1️⃣ Testing Product API...');
    const productResponse = await fetch(`${API_BASE}/api/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (productResponse.ok) {
      const products = await productResponse.json();
      const p11Product = products.find(p => p.code === 'P11');
      console.log('✅ P11 Product found:', p11Product ? p11Product.title : 'Not found');
      console.log(`   Price: ₹${p11Product?.price / 100 || 'N/A'}`);
      console.log(`   Features: ${p11Product?.features?.length || 0} listed`);
    } else {
      console.log('❌ Product API failed');
    }
    
    console.log('');
    
    // Test 2: Database Connection Test
    console.log('2️⃣ Testing Database Connection...');
    const healthResponse = await fetch(`${API_BASE}/api/health`, {
      method: 'GET'
    });
    
    if (healthResponse.ok) {
      const health = await healthResponse.json();
      console.log('✅ Database connection:', health.database ? 'Connected' : 'Failed');
    } else {
      console.log('❌ Health check failed');
    }
    
  } catch (error) {
    console.log('❌ API Test failed:', error.message);
    console.log('💡 Make sure the development server is running: npm run dev');
  }
}

// Check if running in Node.js environment
if (typeof window === 'undefined') {
  // Node.js environment - use node-fetch or similar
  console.log('🚀 Run this test by starting your dev server and opening:');
  console.log('   http://localhost:3000');
  console.log('   Then check the browser console for API test results');
} else {
  // Browser environment
  testP11API();
}