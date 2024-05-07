--Criacao de banco de dados
CREATE DATABASE DbAplicacaoClientes;


--criacao de tabelas

CREATE TABLE tb_Clientes(
	IdCliente int NOT NULL  PRIMARY KEY IDENTITY(1,1),
	Nome NVARCHAR(100),
	DataCadastro Datetime,
	Email NVARCHAR(100),
	Sexo CHAR,
	[Status] bit 
)
--Adicionar coluna na tabela
ALTER TABLE tb_Clientes
ADD Nome NVARCHAR(100);

--Remover coluna da tabela
ALTER TABLE tb_Clientes
DROP COLUMN nome;
--Excluir tabela
DROP TABLE tb_Clientes;


--Inserção de dados
INSERT INTO tb_Clientes(Nome, DataCadastro, Email, Sexo, [Status])
VALUES ('Mario', GETDATE(), 'josemario@gmail.com', 'M', 0);

INSERT INTO tb_Clientes(Nome, DataCadastro, Email, Sexo, [Status])
VALUES 
('Mario', DATEADD(day, -RAND() * 365, GETDATE()), 'josemario@gmail.com', 'M', 0),
('Luana', DATEADD(day, -RAND() * 365, GETDATE()), 'luana123@gmail.com', 'F', 1),
('Pedro', DATEADD(day, -RAND() * 365, GETDATE()), 'pedro456@gmail.com', 'M', 0),
('Ana', DATEADD(day, -RAND() * 365, GETDATE()), 'ana789@gmail.com', 'F', 1),
('Carlos', DATEADD(day, -RAND() * 365, GETDATE()), 'carlos1@gmail.com', 'M', 0),
('Mariana', DATEADD(day, -RAND() * 365, GETDATE()), 'mariana2@gmail.com', 'F', 1),
('João', DATEADD(day, -RAND() * 365, GETDATE()), 'joao3@gmail.com', 'M', 0),
('Julia', DATEADD(day, -RAND() * 365, GETDATE()), 'julia4@gmail.com', 'F', 1),
('Fernando', DATEADD(day, -RAND() * 365, GETDATE()), 'fernando5@gmail.com', 'M', 0),
('Laura', DATEADD(day, -RAND() * 365, GETDATE()), 'laura6@gmail.com', 'F', 1),
('Ricardo', DATEADD(day, -RAND() * 365, GETDATE()), 'ricardo7@gmail.com', 'M', 0),
('Camila', DATEADD(day, -RAND() * 365, GETDATE()), 'camila8@gmail.com', 'F', 1),
('Daniel', DATEADD(day, -RAND() * 365, GETDATE()), 'daniel9@gmail.com', 'M', 0),
('Isabela', DATEADD(day, -RAND() * 365, GETDATE()), 'isabela10@gmail.com', 'F', 1),
('Marcos', DATEADD(day, -RAND() * 365, GETDATE()), 'marcos11@gmail.com', 'M', 0),
('Gabriela', DATEADD(day, -RAND() * 365, GETDATE()), 'gabriela12@gmail.com', 'F', 1),
('Roberto', DATEADD(day, -RAND() * 365, GETDATE()), 'roberto13@gmail.com', 'M', 0),
('Aline', DATEADD(day, -RAND() * 365, GETDATE()), 'aline14@gmail.com', 'F', 1),
('Sergio', DATEADD(day, -RAND() * 365, GETDATE()), 'sergio15@gmail.com', 'M', 0),
('Elaine', DATEADD(day, -RAND() * 365, GETDATE()), 'elaine16@gmail.com', 'F', 1);

--selecionando todos os resgistros
SELECT * FROM dbo.tb_Clientes;

CREATE PROCEDURE SelectClientes
AS
BEGIN
    SELECT * FROM dbo.tb_Clientes;
END;

exec SelectClientes



CREATE PROC FI_SP_PesqCliente
	@iniciarEm int,
	@quantidade int,
	@campoOrdenacao varchar(200),
	@crescente bit	
AS
BEGIN
	DECLARE @SCRIPT NVARCHAR(MAX)
	DECLARE @CAMPOS NVARCHAR(MAX)
	DECLARE @ORDER VARCHAR(50)
	
	IF(@campoOrdenacao = 'EMAIL')
		SET @ORDER =  ' EMAIL '
	ELSE
		SET @ORDER = ' NOME '

	IF(@crescente = 0)
		SET @ORDER = @ORDER + ' DESC'
	ELSE
		SET @ORDER = @ORDER + ' ASC'

	SET @CAMPOS = '@iniciarEm int,@quantidade int'
	SET @SCRIPT = 
	'SELECT NOME, EMAIL FROM
		(SELECT ROW_NUMBER() OVER (ORDER BY ' + @ORDER + ') AS Row, NOME, EMAIL, FROM tb_Clientes WITH(NOLOCK))
		AS ClientesWithRowNumbers
	WHERE Row > @iniciarEm AND Row <= (@iniciarEm+@quantidade) ORDER BY'
	
	SET @SCRIPT = @SCRIPT + @ORDER
			
	EXECUTE SP_EXECUTESQL @SCRIPT, @CAMPOS, @iniciarEm, @quantidade

	SELECT COUNT(1) FROM tb_Clientes WITH(NOLOCK)
END

EXEC FI_SP_PesqCliente 0, 10, 'Nome', 1


DECLARE @PageSize INT = 10; -- Número de registros por página
DECLARE @PageNumber INT = 1; -- Número da página desejada

-- Defina o número da página desejada
SET @PageNumber = 1;  

-- Calcule o número de registros a serem pulados com base no número da página e no tamanho da página
DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

-- Consulta paginada
SELECT *
FROM (
    SELECT 
        *,
        ROW_NUMBER() OVER (ORDER BY [Nome]) AS RowNum
    FROM 
        tb_Clientes
) AS SubQuery
WHERE 
    RowNum > @Offset
    AND RowNum <= (@Offset + @PageSize);

CREATE PROCEDURE GetPagedResults
(
    @PageSize INT,
    @PageNumber INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    SELECT *
    FROM (
        SELECT 
            *,
            ROW_NUMBER() OVER (ORDER BY [Nome]) AS RowNum
        FROM 
            tb_Clientes
    ) AS SubQuery
    WHERE 
        RowNum > @Offset
        AND RowNum <= (@Offset + @PageSize);
	DECLARE @TotalRecords INT;
    SELECT @TotalRecords = COUNT(*) FROM tb_Clientes;

END;


CREATE PROCEDURE BuscarClientesPaginado
(
    @PageSize INT,
    @PageNumber INT,
    @SearchTerm NVARCHAR(100) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;
    SELECT *
    FROM (
        SELECT 
            *,
            ROW_NUMBER() OVER (ORDER BY [IdCliente]) AS RowNum
        FROM 
            tb_Clientes
        WHERE 
            (@SearchTerm IS NULL 
            OR Nome LIKE '%' + @SearchTerm + '%' 
            OR Email LIKE '%' + @SearchTerm + '%')
    ) AS SubQuery
    WHERE 
        RowNum > @Offset
        AND RowNum <= (@Offset + @PageSize)
		;
END;
SELECT * FROM dbo.tb_Clientes;
EXEC BuscarClientesPaginado @PageSize = 10, @PageNumber = 1, @SearchTerm = '';

--criacao de procedure com base em uma coluna calculada na propria consulta mas o desempenho dependendo dos dados pode afetar
CREATE PROCEDURE BuscarClientesPaginado
(
    @PageSize INT,
    @PageNumber INT,
    @SearchTerm NVARCHAR(100) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @StartId INT = @PageNumber;
    DECLARE @EndId INT = @StartId + @PageSize - 1;

    WITH OrderedClients AS (
        SELECT 
            *,
            ROW_NUMBER() OVER (ORDER BY Nome) AS RowNum,
			COUNT(*) OVER () AS TotalClientes
        FROM 
            tb_Clientes
        WHERE 
            (@SearchTerm IS NULL 
            OR Nome LIKE '%' + @SearchTerm + '%' 
            OR Email LIKE '%' + @SearchTerm + '%')
    )
    SELECT *,TotalClientes
    FROM OrderedClients
    WHERE RowNum BETWEEN @StartId AND @EndId;
END;

DECLARE @PageSize INT = 10;
DECLARE @PageNumber INT = 0;
DECLARE @SearchTerm NVARCHAR(100) = '';

EXEC BuscarClientesPaginado @PageSize, @PageNumber, @SearchTerm;


--procedure para contagem na tabela
CREATE PROCEDURE QuantidadeClientes
@SearchTerm NVARCHAR(100) = NULL
AS
BEGIN
    SELECT COUNT(*)
FROM dbo.tb_Clientes
WHERE 
 @SearchTerm IS NULL 
  OR Nome LIKE '%' + @SearchTerm + '%' 
            OR Email LIKE '%' + @SearchTerm + '%';
END;
DECLARE @SearchTerm NVARCHAR(100) = 'j';
exec QuantidadeClientes @SearchTerm


--teste com busca em duas consultas

CREATE PROCEDURE BuscarClientesPaginado
(
    @PageSize INT,
    @PageNumber INT,
    @SearchTerm NVARCHAR(100) = NULL,
    @TotalRecords INT OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @StartId INT = @PageNumber;
    DECLARE @EndId INT = @StartId + @PageSize - 1;

    -- Contagem total de registros
    SELECT @TotalRecords = COUNT(*)
    FROM tb_Clientes
    WHERE 
        (@SearchTerm IS NULL 
        OR Nome LIKE '%' + @SearchTerm + '%' 
        OR Email LIKE '%' + @SearchTerm + '%');

    WITH OrderedClients AS (
        SELECT 
            *,
            ROW_NUMBER() OVER (ORDER BY Nome) AS RowNum
        FROM 
            tb_Clientes
        WHERE 
            (@SearchTerm IS NULL 
            OR Nome LIKE '%' + @SearchTerm + '%' 
            OR Email LIKE '%' + @SearchTerm + '%')
    )
    SELECT *
    FROM OrderedClients
    WHERE RowNum BETWEEN @StartId AND @EndId;
END;

DECLARE @PageSize INT = 10;
DECLARE @PageNumber INT = 10;
DECLARE @SearchTerm NVARCHAR(100) = '';
DECLARE @TotalRecords INT;

EXEC BuscarClientesPaginado @PageSize, @PageNumber, @SearchTerm, @TotalRecords OUTPUT;


SELECT @TotalRecords AS TotalRecords;