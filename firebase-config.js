// Configuración de Firebase - REEMPLAZA CON TUS CONFIGURACIONES REALES
const firebaseConfig = {
  apiKey: "AIzaSyCcfk5iRS03VrtxOjItcjG8Cs7M2y2udNQ",
  authDomain: "web-tienda-test.firebaseapp.com",
  projectId: "web-tienda-test",
  storageBucket: "web-tienda-test.firebasestorage.app",
  messagingSenderId: "733341350922",
  appId: "1:733341350922:web:375a72e70a63a5390473f3",
  measurementId: "G-4GQLZYGZGQ"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Habilitar persistencia offline (opcional pero recomendado)
firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Persistencia no disponible, múltiples pestañas abiertas');
    } else if (err.code == 'unimplemented') {
      console.log('El navegador no soporta persistencia');
    }
  });
