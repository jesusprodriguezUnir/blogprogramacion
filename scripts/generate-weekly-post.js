import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error('❌ Error: OPENROUTER_API_KEY no está configurada');
  process.exit(1);
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://github.com/blogprogramacion',
    'X-Title': 'Blog Programación AI News',
  }
});

function getWeekDates() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysToFriday = (5 - dayOfWeek + 7) % 7 || 7;
  
  const friday = new Date(now);
  friday.setDate(now.getDate() - daysToFriday);
  
  const monday = new Date(friday);
  monday.setDate(friday.getDate() - 4);
  
  const formatDate = (d) => d.toISOString().split('T')[0];
  return { monday: formatDate(monday), friday: formatDate(friday) };
}

async function searchAInews(startDate, endDate) {
  const prompt = `Busca las 5 noticias más importantes sobre inteligencia artificial que ocurrieron entre ${startDate} y ${endDate}. 
Para cada noticia proporciona:
1. Título
2. Fecha exacta
3. Resumen de 2-3 oraciones
4. Fuente (URL)
5. Empresa/Open source involucrado

Formato de salida (JSON array):
[
  {
    "title": "...",
    "date": "YYYY-MM-DD",
    "summary": "...",
    "source": "...",
    "company": "..."
  }
]`;

  const completion = await openai.chat.completions.create({
    model: 'google/gemini-2.0-flash-001',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });

  const response = completion.choices[0]?.message?.content || '';
  
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(response);
  } catch (e) {
    console.error('Error parseando noticias:', e);
    return [];
  }
}

async function generateBlogPost(news, startDate, endDate) {
  const prompt = `Eres un editor de tecnología senior especializado en IA. Redacta un post para blog técnico sobre las 5 noticias más importantes de IA del ${startDate} al ${endDate}.

Noticias:
${news.map((n, i) => `${i+1}. ${n.title} - ${n.company}: ${n.summary}`).join('\n')}

Requisitos:
- Título atractivo y en español
- Extensión: 800-1200 palabras
- Estructura: Introducción + 5 secciones (una por noticia) + Conclusión
- Tono: Profesional pero accesible
- Incluir enlaces a fuentes
- SEO: Incluir keywords relevantes sobre IA
- Frontmatter en la primera línea con: title, date (${endDate}), excerpt, category: "IA", slug (slugify del título)

El slug debe ser algo como: "noticias-ia-semana-[AAAAMMDD]"

Formato de salida:
---
title: "..."
date: "..."
excerpt: "..."
category: "IA"
slug: "..."
---

# Título del post

[Contenido del post]`;

  const completion = await openai.chat.completions.create({
    model: 'google/gemini-2.0-flash-001',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });

  return completion.choices[0]?.message?.content || '';
}

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('🤖 Iniciando generación de post semanal de IA...\n');
  
  const { monday, friday } = getWeekDates();
  console.log(`📅 Rango de búsqueda: ${monday} a ${friday}`);
  
  console.log('\n🔍 Buscando noticias de IA...');
  const news = await searchAInews(monday, friday);
  
  if (news.length === 0) {
    console.error('❌ No se encontraron noticias');
    process.exit(1);
  }
  
  console.log(`✅ Encontradas ${news.length} noticias\n`);
  news.forEach((n, i) => console.log(`  ${i+1}. ${n.title}`));
  
  console.log('\n✍️ Generando post del blog...');
  const postContent = await generateBlogPost(news, monday, friday);
  
  let cleanContent = postContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
  
  const slugMatch = cleanContent.match(/slug:\s*"([^"]+)"/);
  const slug = slugMatch ? slugMatch[1] : `noticias-ia-semana-${friday.replace(/-/g, '')}`;
  
  const postsDir = path.join(__dirname, '..', 'src', 'pages', 'posts');
  const postPath = path.join(postsDir, `${slug}.md`);
  
  fs.writeFileSync(postPath, cleanContent);
  console.log(`✅ Post guardado: ${postPath}`);
  
  console.log('\n🖼️ Nota: La generación de imágenes requiere integración adicional con DALL-E/Midjourney');
  console.log('⚠️ Saltando generación de imagen por ahora');
  
  console.log('\n✨¡Post semanal generado exitosamente!');
}

main().catch(console.error);