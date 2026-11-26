# NESO Coffee Shop

Site estático + API serverless (Vercel) + banco Neon.

## Deploy
1. Suba esta pasta na Vercel (Framework: Other).
2. No projeto Vercel: Storage > Neon (ou crie em neon.tech) e confirme a variável `DATABASE_URL`.
3. Adicione a variável `ADMIN_TOKEN` com uma senha forte (usada na página /api/ e em integrações).
4. Redeploy. A tabela `orders` é criada sozinha no primeiro pedido.

## API
- `POST /api/orders` público. Body: `{cliente, pagamento:"Pix|Débito|Crédito", itens:[{produto:"cafecomleite|cappucino", tipo:"Gelado|Sem Gelo", tam:"Pequeno|Médio|Grande"}]}` (o preço é calculado no servidor)
- `GET /api/orders?status=pago` · `GET /api/orders?id=UUID` · `PATCH /api/orders?id=UUID {"status":"impresso"}` com `Authorization: Bearer ADMIN_TOKEN`.

## Local
A página da API fica em `/api/` na Vercel (reescrita em vercel.json) e em `/painel/` localmente.

Com Live Server (só estático) o site funciona em modo demo, salvando pedidos no navegador. Para testar a API: `npx vercel dev`.
