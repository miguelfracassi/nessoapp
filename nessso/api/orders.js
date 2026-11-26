const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);
const PRECO = { Pequeno: 10, Médio: 15, Grande: 20 };
const PROD = { cafecomleite: "Café com Leite", cappucino: "Cappucino" };
const LOJA = "Loja Praça Comidas";
let ready;
const init = () => ready || (ready = sql`create table if not exists orders (
  id uuid primary key default gen_random_uuid(), codigo text not null, cliente text not null,
  loja text not null, pagamento text not null, total numeric(10,2) not null, itens jsonb not null,
  status text not null default 'pago', criado timestamptz not null default now())`);
const admin = (req) => req.headers.authorization === "Bearer " + process.env.ADMIN_TOKEN && !!process.env.ADMIN_TOKEN;

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  try {
    await init();
    if (req.method === "POST") {
      const b = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const cliente = String(b.cliente || "").trim().slice(0, 80);
      const pagamento = ["Débito", "Crédito", "Pix"].includes(b.pagamento) ? b.pagamento : null;
      const itens = (Array.isArray(b.itens) ? b.itens : []).slice(0, 50).map((i) => ({
        produto: i.produto, nome: PROD[i.produto], tipo: i.tipo === "Sem Gelo" ? "Sem Gelo" : "Gelado",
        tam: i.tam, preco: PRECO[i.tam], k: i.produto,
      }));
      if (!cliente || !pagamento || !itens.length || itens.some((i) => !i.nome || !i.preco))
        return res.status(400).json({ error: "pedido inválido" });
      const total = itens.reduce((a, i) => a + i.preco, 0);
      const codigo = String(Math.floor(1000 + Math.random() * 9000));
      const r = await sql`insert into orders (codigo, cliente, loja, pagamento, total, itens)
        values (${codigo}, ${cliente}, ${LOJA}, ${pagamento}, ${total}, ${JSON.stringify(itens)}::jsonb) returning id, codigo, total`;
      return res.status(201).json(r[0]);
    }
    if (!admin(req)) return res.status(401).json({ error: "não autorizado" });
    const { id, status, limit } = req.query;
    if (req.method === "GET") {
      const n = Math.min(parseInt(limit) || 50, 200);
      const r = id ? await sql`select * from orders where id = ${id}`
        : status ? await sql`select * from orders where status = ${status} order by criado desc limit ${n}`
        : await sql`select * from orders order by criado desc limit ${n}`;
      return res.status(200).json(id ? r[0] || null : r);
    }
    if (req.method === "PATCH") {
      const b = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      if (!id || !b.status) return res.status(400).json({ error: "id e status obrigatórios" });
      const r = await sql`update orders set status = ${String(b.status).slice(0, 30)} where id = ${id} returning *`;
      return res.status(200).json(r[0] || null);
    }
    res.status(405).json({ error: "método não permitido" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "erro interno" });
  }
};
