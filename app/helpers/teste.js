const { Client } = require("pg"); // Para conexão com PostgreSQL
const sql = require("mssql"); // Para conexão com SQL Server

// Configuração do SQL Server (Protheus)
const sqlServerConfig = {
  user: "Carlos",
  password: "acf1234",
  server: "200.165.58.194:1400",
  database: "Producao",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Configuração do PostgreSQL
const pgConfig = {
  user: "postgres",
  host: "localhost",
  database: "woocommerce",
  password: "123456",
  port: 5433,
};

// Query para buscar produtos do Protheus
const querySqlServer = `
SELECT rtrim(ltrim(SG1.G1_COMP)) AS COD_PRODUTO,
       (SELECT B1B.B1_DESC
        FROM SB1010 B1B With (NoLock)
        WHERE G1_COMP = B1B.B1_COD
          AND B1B.D_E_L_E_T_='') AS DESC_PRODUCO,
       rtrim(ltrim(B1_COD)) COD_EQUIPAMENTO,
       B1_YSUBGRU AS marca_id,
       B1_DESC DESC_EQUIPAMENTO, 1 AS QTD
FROM SG1010 SG1 With (NoLock)
INNER JOIN SB1010 SB1 With (NoLock)
  On SB1.B1_TIPO = 'EQ'
 AND SB1.B1_COD = SG1.G1_COD
 AND SB1.D_E_L_E_T_ = ' '
WHERE SG1.D_E_L_E_T_ = ' '
ORDER BY G1_COMP, B1_COD
`;

// Função para associar produtos no PostgreSQL
async function associarProdutos(client, fromSku, toSku) {
  try {
    // Buscar produto_from
    const fromProdutoRes = await client.query(
      "SELECT id, nome FROM produtos_produto WHERE sku = $1",
      [fromSku.trim()],
    );
    const fromProduto = fromProdutoRes.rows[0];

    // Buscar produto_to
    const toProdutoRes = await client.query(
      "SELECT id, nome FROM produtos_produto WHERE sku = $1",
      [toSku.trim()],
    );
    const toProduto = toProdutoRes.rows[0];

    if (fromProduto && toProduto) {
      // Verificar se a associação já existe
      const associacaoExistenteRes = await client.query(
        `
                SELECT 1 FROM produtos_produto_produtos_associados
                WHERE from_produto_id = $1 AND to_produto_id = $2
                `,
        [fromProduto.id, toProduto.id],
      );

      if (associacaoExistenteRes.rowCount > 0) {
        console.log(
          `A associação entre ${fromProduto.nome} e ${toProduto.nome} já existe.`,
        );
      } else {
        // Associar produtos - inserir apenas se não existir
        await client.query(
          `
                    INSERT INTO produtos_produto_produtos_associados (from_produto_id, to_produto_id)
                    VALUES ($1, $2)
                    `,
          [fromProduto.id, toProduto.id],
        );
        console.log(
          `Produtos associados: ${fromProduto.nome} -> ${toProduto.nome}`,
        );
      }
    } else {
      console.log(`Produto com SKU ${fromSku} ou ${toSku} não encontrado.`);
    }
  } catch (err) {
    console.error(`Erro ao associar ${fromSku} -> ${toSku}:`, err.message);
  }
}

// Função principal
(async () => {
  let sqlServerPool;
  let pgClient;

  try {
    // Conectar ao SQL Server
    sqlServerPool = await sql.connect(sqlServerConfig);
    const result = await sqlServerPool.request().query(querySqlServer);

    // Extrair dados
    const rows = result.recordset;

    // Conectar ao PostgreSQL
    pgClient = new Client(pgConfig);
    await pgClient.connect();

    // Processar cada linha do resultado
    for (const row of rows) {
      await associarProdutos(pgClient, row.COD_EQUIPAMENTO, row.COD_PRODUTO);
      await associarProdutos(pgClient, row.COD_PRODUTO, row.COD_EQUIPAMENTO);
    }

    console.log(`Registros processados: ${rows.length}`);
  } catch (err) {
    console.error("Ocorreu um erro geral:", err.message);
  } finally {
    // Fechar conexões
    if (sqlServerPool) await sqlServerPool.close();
    if (pgClient) await pgClient.end();
  }
})();
