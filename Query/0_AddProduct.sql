USE [shop]
GO

CREATE TABLE [dbo].[Product](
	[ProductId] int IDENTITY(1,1),
	[Name] [nvarchar](50) NOT NULL,
	[Price] int NOT NULL,
	[Count] int NOT NULL
)
GO

ALTER TABLE [dbo].[Product]
	ADD CONSTRAINT DB_labs_Product_Name_Unique UNIQUE (Name)
GO

ALTER TABLE [dbo].[Product]
	ADD CONSTRAINT PK_Product_ProductId PRIMARY KEY CLUSTERED (ProductId)
GO

ALTER TABLE [dbo].[Product]
	ADD CONSTRAINT [DB_Product_Count] DEFAULT 0 FOR [Count]
GO