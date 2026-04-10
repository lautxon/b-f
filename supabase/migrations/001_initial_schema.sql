-- Barro & Fuego: Complete Schema + Seed Data
-- Copy ALL of this and paste in Supabase SQL Editor
-- Safe to re-run (idempotent)

-- ============================================
-- 1. TABLES
-- ============================================

CREATE TABLE IF NOT EXISTS categorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  descripcion text,
  creado_en timestamptz DEFAULT now()
);

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
-- 3. SEED DATA - CATEGORIAS
-- ============================================

INSERT INTO categorias (nombre, slug, descripcion)
VALUES
  ('Objetos utilitarios', 'objetos-utilitarios', 'Ollas, vasijas, botellas, fuentes, platos, tazas, vasos'),
  ('Objetos varios', 'objetos-varios', 'Adornos, abalorios, marcos para fotos, esculturas, macetas')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. SEED DATA - OBRAS
-- Using DO blocks to avoid subquery + ON CONFLICT issues
-- ============================================

DO $$
DECLARE
  util_id uuid;
  varios_id uuid;
BEGIN
  SELECT id INTO util_id FROM categorias WHERE slug = 'objetos-utilitarios' LIMIT 1;
  SELECT id INTO varios_id FROM categorias WHERE slug = 'objetos-varios' LIMIT 1;

  -- Objetos utilitarios (10)
  INSERT INTO obras (nombre, slug, categoria_id, ano_creacion, tecnica, descripcion, precio_ars, imagen_url) VALUES
    ('Olla de Barro Grande', 'olla-de-barro-grande', util_id, 2024, 'Modelado a mano, coccion en horno de lena', 'Olla de gran formato para guisos y preparaciones tradicionales. Arcilla roja de la quebrada, vidriado natural con ceniza.', 45000, 'https://picsum.photos/seed/ceramica1/800/600'),
    ('Vasija Calchaqui', 'vasija-calchaqui', util_id, 2023, 'Torneado, engobe natural, coccion oxidante', 'Vasija decorativa inspirada en las formas precolombinas de los Valles Calchaquies. Tonos terracota y ocre.', 38000, 'https://picsum.photos/seed/ceramica2/800/600'),
    ('Botella de Arcilla', 'botella-de-arcilla', util_id, 2024, 'Modelado a mano, vidriado alcala', 'Botella de cuello largo con vidriado verde cobre. Pieza funcional para conservacion de liquidos.', 32000, 'https://picsum.photos/seed/ceramica3/800/600'),
    ('Fuente Ovalada Iruya', 'fuente-ovalada-iruya', util_id, 2024, 'Plancha, coccion reductora', 'Fuente ovalada de 40cm con tonos ahumados. Borde irregular que celebra la imperfeccion artesanal.', 28000, 'https://picsum.photos/seed/ceramica4/800/600'),
    ('Plato Llano Terracota', 'plato-llano-terracota', util_id, 2024, 'Torneado, vidriado transparente', 'Plato llano de 25cm con vidriado transparente sobre pasta roja. Apto para alimentos.', 12000, 'https://picsum.photos/seed/ceramica5/800/600'),
    ('Taza de Desayuno', 'taza-de-desayuno', util_id, 2024, 'Torneado, engobe blanco, coccion oxidante', 'Taza de 300ml con asa ergonomica. Interior vidriado blanco, exterior en tono hueso natural.', 9500, 'https://picsum.photos/seed/ceramica6/800/600'),
    ('Vaso Corto Arena', 'vaso-corto-arena', util_id, 2023, 'Torneado, pasta con chamota', 'Vaso bajo de textura arenosa natural. La chamota le da una superficie tactil unica. 250ml.', 8500, 'https://picsum.photos/seed/ceramica7/800/600'),
    ('Cuenco de Barro', 'cuenco-de-barro', util_id, 2024, 'Modelado a mano, vidriado reactivo', 'Cuenco amplio de 20cm con vidriado reactivo en tonos tierra. Ideal para ensaladas.', 14000, 'https://picsum.photos/seed/ceramica8/800/600'),
    ('Jarra Artesanal', 'jarra-artesanal', util_id, 2024, 'Torneado, asa acoplada, coccion oxidante', 'Jarra de 1 litro con asa ergonomica y pico vertedor. Tonos calidos naturales.', 22000, 'https://picsum.photos/seed/ceramica9/800/600'),
    ('Juego de Tazas x4', 'juego-de-tazas-x4', util_id, 2024, 'Torneado, vidriado reactivo', 'Set de cuatro tazas con vidriado reactivo. Cada una con patron unico. 250ml c/u.', 42000, 'https://picsum.photos/seed/ceramica10/800/600')
  ON CONFLICT (slug) DO NOTHING;

  -- Objetos varios (10)
  INSERT INTO obras (nombre, slug, categoria_id, ano_creacion, tecnica, descripcion, precio_ars, imagen_url) VALUES
    ('Adorno Geometrico Andino', 'adorno-geometrico-andino', varios_id, 2024, 'Modelado a mano, pintura con oxidos', 'Pieza decorativa con motivos geometricos inspirados en textiles andinos.', 22000, 'https://picsum.photos/seed/ceramica11/800/600'),
    ('Marco para Fotos Quebrada', 'marco-para-fotos-quebrada', varios_id, 2024, 'Plancha, coccion en horno de lena', 'Marco para foto de 15x20cm con textura rustica. Soporte integrado.', 15000, 'https://picsum.photos/seed/ceramica12/800/600'),
    ('Collar de Cuentas Ceramica', 'collar-cuentas-ceramica', varios_id, 2024, 'Cuentas torneadas, vidriado variado, ensamble', 'Collar artesanal con 24 cuentas de ceramica vidriada en tonos tierra. Largo ajustable.', 18000, 'https://picsum.photos/seed/ceramica13/800/600'),
    ('Escultura Viento Norte', 'escultura-viento-norte', varios_id, 2023, 'Modelado a mano, ahumado', 'Pieza escultorica abstracta inspirada en el viento de los valles. 35cm de alto.', 55000, 'https://picsum.photos/seed/ceramica14/800/600'),
    ('Figurilla de Arcilla', 'figurilla-de-arcilla', varios_id, 2024, 'Modelado a mano, coccion oxidante', 'Pequena figurilla abstracta de 15cm. Arcilla natural sin vidriar.', 12000, 'https://picsum.photos/seed/ceramica15/800/600'),
    ('Florero Ceramica', 'florero-ceramica', varios_id, 2024, 'Torneado, vidriado interior', 'Florero alto de 30cm con cuello estrecho. Interior vidriado para retener agua.', 28000, 'https://picsum.photos/seed/ceramica16/800/600'),
    ('Porta Velas Andino', 'porta-velas-andino', varios_id, 2024, 'Modelado a mano, calados', 'Porta velas con calados geometricos que proyectan sombras. Diametro 12cm.', 16000, 'https://picsum.photos/seed/ceramica17/800/600'),
    ('Maceta Artistica', 'maceta-artistica', varios_id, 2024, 'Modelado a mano, drenaje integrado', 'Maceta decorativa de 18cm con orificio de drenaje. Vidriado exterior en tonos ocre.', 20000, 'https://picsum.photos/seed/ceramica18/800/600'),
    ('Campana de Viento', 'campana-de-viento', varios_id, 2023, 'Piezas torneadas, ensamble con cuerda', 'Campana de viento con 5 tubos de ceramica afinados. Sonido suave y profundo.', 25000, 'https://picsum.photos/seed/ceramica19/800/600'),
    ('Plato Decorativo Valles', 'plato-decorativo-valles', varios_id, 2024, 'Plancha, pintura con engobes', 'Plato decorativo de pared con paisaje abstracto de los Valles Calchaquies. 30cm.', 35000, 'https://picsum.photos/seed/ceramica20/800/600')
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- ============================================
-- 5. CONFIGURACION
-- ============================================

INSERT INTO configuracion (clave, valor) VALUES
  ('exchange_rate_api_url', '{"url": "https://api.exchangerate-api.com/v4/latest/"}'),
  ('mercado_pago_alias', '{"alias": "Barro&Fuego"}'),
  ('paypal_email', '{"email": "aureliadiaz@gmail.com"}')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- 6. VERIFY
-- ============================================

SELECT count(*) as categorias FROM categorias;
SELECT count(*) as obras FROM obras;
SELECT count(*) as configuracion FROM configuracion;
