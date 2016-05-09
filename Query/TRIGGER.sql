CREATE TRIGGER OnAddOrder ON [dbo].[Order]
AFTER INSERT
AS
IF @@ROWCOUNT=1
BEGIN
	DECLARE @order_count INT;
	DECLARE @order_id INT;
	DECLARE @product_count INT;
	DECLARE @product_id INT;

	SELECT @order_count = (SELECT [Count] FROM inserted);
	SELECT @order_id  = (SELECT [OrderId] FROM inserted);
	SELECT @product_id = (SELECT [ProductId] FROM inserted);
	SELECT @product_count = (SELECT [Count] FROM Product WHERE ProductId = @product_id);

	IF @order_count <= @product_count
		BEGIN
			UPDATE [Order]
				SET [Success]=1
				WHERE OrderId = @order_id;

			UPDATE Product
				SET [Count]=[Count]-@order_count
				WHERE ProductId = @product_id;
		END
	ELSE
		UPDATE [Order]
			SET [Success]=0
			WHERE OrderId = @order_id;
END