USE [shop]
GO

CREATE TABLE [dbo].[Costumer](
	[CostumerId] int IDENTITY(1,1),
	[Name] [nvarchar](255) NOT NULL,
	[Phone] int NOT NULL,
	[RegistrationDate] [datetime] NOT NULL
)
GO

ALTER TABLE [dbo].[Costumer]
	ADD  CONSTRAINT [DB_Costumer_RegistrationDate]  DEFAULT (getdate()) FOR [RegistrationDate]
GO

ALTER TABLE [dbo].[Costumer]
	ADD CONSTRAINT DB_labs_Costumer_Phone_Unique UNIQUE (Phone)
GO

ALTER TABLE [dbo].[Costumer]
	ADD CONSTRAINT DB_labs_Costumer_Name_Unique UNIQUE (Name)
GO

ALTER TABLE [dbo].[Costumer]
	ADD CONSTRAINT PK_Costumer_CostumerId PRIMARY KEY CLUSTERED (CostumerId)
GO