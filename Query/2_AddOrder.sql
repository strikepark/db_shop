USE [shop]
GO

CREATE TABLE [dbo].[Order](
	[OrderId] int IDENTITY(1,1),
	[Name] [nvarchar](50) NOT NULL,
	[CostumerId] int NOT NULL,
	[ProductId] int NOT NULL,
	[Count] int NOT NULL,
	[Success] int NOT NULL,
	[RegistrationDate] [datetime] NOT NULL
)
GO

ALTER TABLE [dbo].[Order]
	ADD  CONSTRAINT [DB_Order_RegistrationDate]  DEFAULT (getdate()) FOR [RegistrationDate]
GO

ALTER TABLE [dbo].[Order]
	ADD CONSTRAINT PK_Order_OrderId PRIMARY KEY CLUSTERED (OrderId)
GO

ALTER TABLE [dbo].[Order]
	ADD CONSTRAINT [DB_Order_Count] DEFAULT 0 FOR [Count]
GO

ALTER TABLE [dbo].[Order]
	ADD CONSTRAINT [DB_Order_Count] DEFAULT 0 FOR [Success]
GO

-- Relation with Costumer
ALTER TABLE [dbo].[Order]
	WITH CHECK ADD CONSTRAINT FK_Order_Costumer FOREIGN KEY(CostumerId)
	REFERENCES Costumer (CostumerId)
	ON UPDATE CASCADE
	ON DELETE CASCADE
GO

-- Relation with Product
ALTER TABLE [dbo].[Order]
	WITH CHECK ADD CONSTRAINT FK_Order_Product FOREIGN KEY(ProductId)
	REFERENCES Product (ProductId)
	ON UPDATE CASCADE
	ON DELETE CASCADE
GO