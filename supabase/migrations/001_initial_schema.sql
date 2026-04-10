-- Barro & Fuego: Complete Schema + Seed Data
-- Apply this entire script in Supabase SQL Editor
-- Run once. Idempotent (safe to re-run).

-- ============================================
-- 1. TABLES
-- ============================================

-- Categorias
CREATE TABLE IF NOT EXISTS categorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  descripcion text,
  creado_en timestamptz DEFAULT now()
);

-- Obras / Piezas del catalogo
CREATE TABLE IF NOT EXISTS obras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  slug text NOT NULL UNIQUE,
  categoria_id uuid REFERENCES categorias(id) ON DELETE SET NULL,
  ano_creacion integer,
  tecnica text,
  descripcion text,
  precio_ars numeric(10, 2) NOT NULL,
  imagen_url text,
  disponible boolean DEFAULT true,
  creado_en timestamptz DEFAULT now(),
  actualizado_en timestamptz DEFAULT now()
);

-- Configuracion general (tipo de cambio, links de pago, etc.)
CREATE TABLE IF NOT EXISTS configuracion (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clave text NOT NULL UNIQUE,
  valor jsonb NOT NULL,
  actualizado_en timestamptz DEFAULT now()
);

-- ============================================
-- 2. RLS POLICIES
-- ============================================

ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "categorias public read" ON categorias;
CREATE POLICY "categorias public read" ON categorias FOR SELECT USING (true);

ALTER TABLE obras ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "obras public read" ON obras;
CREATE POLICY "obras public read" ON obras FOR SELECT USING (disponible = true);

ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "config public read" ON configuracion;
CREATE POLICY "config public read" ON configuracion FOR SELECT USING (true);

-- ============================================
-- 3. SEED DATA
-- ============================================

-- Categorias
INSERT INTO categorias (nombre, slug, descripcion) VALUES
  ('Objetos utilitarios', 'objetos-utilitarios', 'Ollas, vasijas, botellas, fuentes, platos, tazas, vasos'),
  ('Objetos varios', 'objetos-varios', 'Adornos, abalorios, marcos para fotos, esculturas, macetas')
ON CONFLICT (slug) DO NOTHING;

-- Obras (20 piezas)
-- Note: categoria_id will be set via subquery
INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Olla de Barro Grande',
  'olla-de-barro-grande',
  2024,
  'Modelado a mano, coccion en horno de lena',
  'Olla de gran formato para guisos y preparaciones tradicionales. Arcilla roja de la quebrada, vidriado natural con ceniza.',
  45000,
  'https://picsum.photos/seed/ceramica1/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Vasija Calchaqui',
  'vasija-calchaqui',
  2023,
  'Torneado, engobe natural, coccion oxidante',
  'Vasija decorativa inspirada en las formas precolombinas de los Valles Calchaquies. Tonos terracota y ocre.',
  38000,
  'https://picsum.photos/seed/ceramica2/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Botella de Arcilla',
  'botella-de-arcilla',
  2024,
  'Modelado a mano, vidriado alcala',
  'Botella de cuello largo con vidriado verde cobre. Pieza funcional para conservacion de liquidos.',
  32000,
  'https://picsum.photos/seed/ceramica3/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Fuente Ovalada Iruya',
  'fuente-ovalada-iruya',
  2024,
  'Plancha, coccion reductora',
  'Fuente ovalada de 40cm con tonos ahumados. Borde irregular que celebra la imperfeccion artesanal.',
  28000,
  'https://picsum.photos/seed/ceramica4/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Plato Llano Terracota',
  'plato-llano-terracota',
  2024,
  'Torneado, vidriado transparente',
  'Plato llano de 25cm con vidriado transparente sobre pasta roja. Apto para alimentos.',
  12000,
  'https://picsum.photos/seed/ceramica5/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Taza de Desayuno',
  'taza-de-desayuno',
  2024,
  'Torneado, engobe blanco, coccion oxidante',
  'Taza de 300ml con asa ergonomica. Interior vidriado blanco, exterior en tono hueso natural.',
  9500,
  'https://picsum.photos/seed/ceramica6/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Vaso Corto Arena',
  'vaso-corto-arena',
  2023,
  'Torneado, pasta con chamota',
  'Vaso bajo de textura arenosa natural. La chamota le da una superficie tactil unica. 250ml.',
  8500,
  'https://picsum.photos/seed/ceramica7/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Cuenco de Barro',
  'cuenco-de-barro',
  2024,
  'Modelado a mano, vidriado reactivo',
  'Cuenco amplio de 20cm con vidriado reactivo en tonos tierra. Ideal para ensaladas.',
  14000,
  'https://picsum.photos/seed/ceramica8/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Jarra Artesanal',
  'jarra-artesanal',
  2024,
  'Torneado, asa acoplada, coccion oxidante',
  'Jarra de 1 litro con asa ergonomica y pico vertedor. Tonos calidos naturales.',
  22000,
  'https://picsum.photos/seed/ceramica9/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Juego de Tazas x4',
  'juego-de-tazas-x4',
  2024,
  'Torneado, vidriado reactivo',
  'Set de cuatro tazas con vidriado reactivo. Cada una con patron unico. 250ml c/u.',
  42000,
  'https://picsum.photos/seed/ceramica10/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-utilitarios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Adorno Geometrico Andino',
  'adorno-geometrico-andino',
  2024,
  'Modelado a mano, pintura con oxidos',
  'Pieza decorativa con motivos geometricos inspirados en textiles andinos.',
  22000,
  'https://picsum.photos/seed/ceramica11/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Marco para Fotos Quebrada',
  'marco-para-fotos-quebrada',
  2024,
  'Plancha, coccion en horno de lena',
  'Marco para foto de 15x20cm con textura rustica. Soporte integrado.',
  15000,
  'https://picsum.photos/seed/ceramica12/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Collar de Cuentas Ceramica',
  'collar-cuentas-ceramica',
  2024,
  'Cuentas torneadas, vidriado variado, ensamble',
  'Collar artesanal con 24 cuentas de ceramica vidriada en tonos tierra. Largo ajustable.',
  18000,
  'https://picsum.photos/seed/ceramica13/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Escultura Viento Norte',
  'escultura-viento-norte',
  2023,
  'Modelado a mano, ahumado',
  'Pieza escultorica abstracta inspirada en el viento de los valles. 35cm de alto.',
  55000,
  'https://picsum.photos/seed/ceramica14/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Figurilla de Arcilla',
  'figurilla-de-arcilla',
  2024,
  'Modelado a mano, coccion oxidante',
  'Pequena figurilla abstracta de 15cm. Arcilla natural sin vidriar.',
  12000,
  'https://picsum.photos/seed/ceramica15/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Florero Ceramica',
  'florero-ceramica',
  2024,
  'Torneado, vidriado interior',
  'Florero alto de 30cm con cuello estrecho. Interior vidriado para retener agua.',
  28000,
  'https://picsum.photos/seed/ceramica16/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Porta Velas Andino',
  'porta-velas-andino',
  2024,
  'Modelado a mano, calados',
  'Porta velas con calados geometricos que proyectan sombras. Diametro 12cm.',
  16000,
  'https://picsum.photos/seed/ceramica17/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Maceta Artistica',
  'maceta-artistica',
  2024,
  'Modelado a mano, drenaje integrado',
  'Maceta decorativa de 18cm con orificio de drenaje. Vidriado exterior en tonos ocre.',
  20000,
  'https://picsum.photos/seed/ceramica18/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Campana de Viento',
  'campana-de-viento',
  2023,
  'Piezas torneadas, ensamble con cuerda',
  'Campana de viento con 5 tubos de ceramica afinados. Sonido suave y profundo.',
  25000,
  'https://picsum.photos/seed/ceramica19/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO obras (nombre, slug, ano_creacion, tecnica, descripcion, precio_ars, imagen_url, disponible, categoria_id)
SELECT
  'Plato Decorativo Valles',
  'plato-decorativo-valles',
  2024,
  'Plancha, pintura con engobes',
  'Plato decorativo de pared con paisaje abstracto de los Valles Calchaquies. 30cm.',
  35000,
  'https://picsum.photos/seed/ceramica20/800/600',
  true,
  (SELECT id FROM categorias WHERE slug = 'objetos-varios')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. CONFIGURACION
-- ============================================

INSERT INTO configuracion (clave, valor) VALUES
  ('exchange_rate_api_url', '{"url": "https://api.exchangerate-api.com/v4/latest/"}'),
  ('mercado_pago_alias', '{"alias": "Barro&Fuego"}'),
  ('paypal_email', '{"email": "aureliadiaz@gmail.com"}')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- Verify
-- ============================================
SELECT 'Categorias: ' || count(*) FROM categorias;
SELECT 'Obras: ' || count(*) FROM obras;
SELECT 'Config: ' || count(*) FROM configuracion;
