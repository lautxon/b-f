import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Detalle from './pages/Detalle'
import Bio from './pages/Bio'
import Proceso from './pages/Proceso'
import Testimonios from './pages/Testimonios'
import Contacto from './pages/Contacto'
import Blog from './pages/Blog'
import BlogArticulo from './pages/BlogArticulo'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin routes without header/footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />

        {/* Public routes */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/catalogo/:slug" element={<Detalle />} />
                <Route path="/bio" element={<Bio />} />
                <Route path="/proceso" element={<Proceso />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticulo />} />
                <Route path="/testimonios" element={<Testimonios />} />
                <Route path="/contacto" element={<Contacto />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App
