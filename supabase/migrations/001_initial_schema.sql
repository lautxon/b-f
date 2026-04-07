-- Barro & Fuego: Initial Schema
-- Supabase PostgreSQL Migration

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

-- RLS Policies: lectura publica
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categorias public read" ON categorias FOR SELECT USING (true);

ALTER TABLE obras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "obras public read" ON obras FOR SELECT USING (disponible = true);

ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
CREATE POLICY "config public read" ON configuracion FOR SELECT USING (true);

-- Seed data: categorias
INSERT INTO categorias (nombre, slug, descripcion) VALUES
  ('Objetos utilitarios', 'objetos-utilitarios', 'Ollas, vasijas, botellas, fuentes, platos, tazas, vasos'),
  ('Objetos varios', 'objetos-varios', 'Adornos, abalorios, marcos para fotos, esculturas')
ON CONFLICT (slug) DO NOTHING;
