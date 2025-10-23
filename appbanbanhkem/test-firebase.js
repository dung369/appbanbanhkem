// Test Firebase connection
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyA-VTY7Bp1vi6GToMccVa8DM3Zv48R-o14",
  authDomain: "webbanhoa-26a60.firebaseapp.com",
  projectId: "webbanhoa-26a60",
  storageBucket: "webbanhoa-26a60.firebasestorage.app",
  messagingSenderId: "690656269794",
  appId: "1:690656269794:web:38949e1a8531264c90d5bb",
  measurementId: "G-D2NTZDNTMY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  console.log('Testing Firebase connection...');
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    console.log('✅ Connection successful!');
    console.log(`Found ${querySnapshot.docs.length} products`);
    
    if (querySnapshot.docs.length === 0) {
      console.log('⚠️  Products collection is empty');
    } else {
      querySnapshot.docs.forEach((doc) => {
        console.log('- Product:', doc.id, doc.data().name);
      });
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
  process.exit(0);
}

testConnection();
