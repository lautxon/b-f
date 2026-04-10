-- Barro & Fuego: Blog / Articulos
-- Run in Supabase SQL Editor

-- ============================================
-- 1. TABLE: articulos
-- ============================================

CREATE TABLE IF NOT EXISTS articulos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  slug text NOT NULL UNIQUE,
  extracto text,
  contenido text NOT NULL,
  imagen_portada text,
  publicado boolean DEFAULT false,
  fecha_publicacion timestamptz DEFAULT now(),
  creado_en timestamptz DEFAULT now(),
  actualizado_en timestamptz DEFAULT now()
);

-- ============================================
-- 2. RLS POLICIES
-- ============================================

ALTER TABLE articulos ENABLE ROW LEVEL SECURITY;

-- Public read for published articles
DROP POLICY IF EXISTS "articulos public read" ON articulos;
CREATE POLICY "articulos public read"
  ON articulos FOR SELECT
  USING (publicado = true);

-- Authenticated users can manage articles
DROP POLICY IF EXISTS "articulos authenticated insert" ON articulos;
CREATE POLICY "articulos authenticated insert"
  ON articulos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "articulos authenticated update" ON articulos;
CREATE POLICY "articulos authenticated update"
  ON articulos FOR UPDATE
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "articulos authenticated delete" ON articulos;
CREATE POLICY "articulos authenticated delete"
  ON articulos FOR DELETE
  USING (auth.role() = 'authenticated');

-- ============================================
-- 3. SEED DATA: Sample articles
-- ============================================

INSERT INTO articulos (titulo, slug, extracto, contenido, imagen_portada, publicado) VALUES
  (
    'La arcilla de Iruya: un tesoro de la quebrada',
    'arcilla-de-iruya',
    'Donde nace el barro que da forma a cada pieza de Barro & Fuego.',
    'La arcilla que Aurelia usa para sus obras viene de una cantera en la quebrada de Iruya, a mas de 2700 metros de altura. No es una arcilla cualquiera: tiene ese color rojizo que la distingue, resultado de siglos de erosion y minerales acumulados en la tierra de los Valles Calchaquies.

Aurelia conoce la cantera de memoria. Sabe cual veta da la arcilla mas fina para las piezas pequenas y cual es mejor para las ollas grandes. "La arcilla te habla", dice. Y tiene razon: cuando la apretas, te dice si esta demasiado seca, si tiene piedras, si esta lista para trabajar.

El proceso de extraccion es manual. Aurelia va con palas y bolsos, saca lo que necesita, y siempre deja suficiente para que la cantera no se agote. Es un pacto con la tierra que viene de generaciones.',
    'https://picsum.photos/seed/blog-arcilla/1200/600',
    true
  ),
  (
    'El horno de lena: donde ocurre la magia',
    'el-horno-de-lena',
    'Un ritual de fuego, cenizas y paciencia que transforma el barro en ceramica.',
    'El horno de Aurelia es de obra, construido con ladrillos refractarios por su esposo hace mas de veinte anos. Tiene camara de combustion inferior y tiro natural, lo que significa que el fuego va subiendo solo, sin ventiladores ni controles electronicos.

Cada coccion empieza al atardecer. Aurelia apila las piezas crudas dentro del horno, dejando espacio entre ellas para que el calor circule parejo. Luego enciende la lena: algarrobo, quebracho, lo que hay en la zona. El fuego arde toda la noche, y la temperatura sube lentamente hasta los 900 grados o mas.

Lo que pasa ahi adentro es impredecible. Las cenizas que vuelan dentro del horno pueden crear vidriados naturales en las piezas. El viento de la montana puede cambiar el tiro y hacer que una zona quede mas caliente que otra. Por eso dos piezas iguales pueden salir con colores distintos.

A la manana siguiente, cuando el horno se enfria lo suficiente, Aurelia lo abre. Ese momento es el mas emocionante: ahi, entre las cenizas y el calor residual, nacen las piezas de Barro & Fuego.',
    'https://picsum.photos/seed/blog-horno/1200/600',
    true
  ),
  (
    'Del barro al objeto: el proceso completo',
    'del-barro-al-objeto',
    'Ocho pasos desde la tierra hasta la pieza terminada.',
    'El proceso de crear una pieza de ceramica artesanal tiene ocho etapas, y cada una requiere tiempo y paciencia.

Primero viene la extraccion de la arcilla de la cantera. Luego el amasado, donde se limpia y se mezcla con agua hasta lograr una pasta homogenea. Despues el modelado, donde las manos le dan forma al barro sobre la rueda o a mano libre.

Las piezas moldeadas se secan a la sombra durante una o tres semanas, segun el grosor. Una vez secas, entran al horno para la primera coccion (bizcocho) a unos 900 grados. Despues del bizcocho se aplica el vidriado, una capa de esmalte que vitrifica en la segunda coccion.

La segunda coccion sube a 1000-1100 grados. El vidriado se funde y crea una capa vitrea, brillante o mate segun la formula. Y finalmente, cuando el horno se abre, cada pieza es unica.',
    'https://picsum.photos/seed/blog-proceso/1200/600',
    true
  );

-- ============================================
-- 4. VERIFY
-- ============================================

SELECT count(*) as articulos FROM articulos;
